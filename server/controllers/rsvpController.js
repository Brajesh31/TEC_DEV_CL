import RSVP from '../models/RSVP.js';
import Event from '../models/Event.js';

export const createRSVP = async (req, res) => {
  try {
    const { eventId, userEmail, userName, notes } = req.body;

    // Check if event exists and is active
    const event = await Event.findOne({ _id: eventId, isActive: true });
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if event is in the future
    if (event.date <= new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot RSVP to past event'
      });
    }

    // Check if user already RSVPed
    const existingRSVP = await RSVP.findOne({ eventId, userEmail });
    if (existingRSVP) {
      return res.status(400).json({
        success: false,
        message: 'You have already RSVPed to this event'
      });
    }

    // Check if event is full
    if (event.maxAttendees) {
      const currentRSVPs = await RSVP.countDocuments({ 
        eventId, 
        status: { $in: ['pending', 'confirmed'] } 
      });
      
      if (currentRSVPs >= event.maxAttendees) {
        return res.status(400).json({
          success: false,
          message: 'Event is full'
        });
      }
    }

    // Create RSVP
    const rsvp = new RSVP({
      eventId,
      userEmail: userEmail.toLowerCase(),
      userName,
      notes
    });

    await rsvp.save();

    res.status(201).json({
      success: true,
      message: 'RSVP created successfully',
      data: { rsvp }
    });
  } catch (error) {
    console.error('Create RSVP error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getUserRSVPs = async (req, res) => {
  try {
    const { userEmail } = req.params;
    const { status, upcoming } = req.query;

    const filter = { userEmail: userEmail.toLowerCase() };
    if (status) filter.status = status;

    const rsvps = await RSVP.find(filter)
      .populate({
        path: 'eventId',
        match: { isActive: true },
        select: 'title description date time location category images'
      })
      .sort({ submittedAt: -1 });

    // Filter out RSVPs where event was deleted
    let filteredRSVPs = rsvps.filter(rsvp => rsvp.eventId);

    // Filter for upcoming event if requested
    if (upcoming === 'true') {
      filteredRSVPs = filteredRSVPs.filter(rsvp => 
        rsvp.eventId.date > new Date()
      );
    }

    res.json({
      success: true,
      data: { rsvps: filteredRSVPs }
    });
  } catch (error) {
    console.error('Get user RSVPs error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const updateRSVPStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const rsvp = await RSVP.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('eventId', 'title date');

    if (!rsvp) {
      return res.status(404).json({
        success: false,
        message: 'RSVP not found'
      });
    }

    res.json({
      success: true,
      message: 'RSVP status updated successfully',
      data: { rsvp }
    });
  } catch (error) {
    console.error('Update RSVP status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getEventRSVPs = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { status } = req.query;

    const filter = { eventId };
    if (status) filter.status = status;

    const rsvps = await RSVP.find(filter)
      .sort({ submittedAt: -1 });

    const stats = await RSVP.aggregate([
      { $match: { eventId: mongoose.Types.ObjectId(eventId) } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: { 
        rsvps,
        stats: stats.reduce((acc, stat) => {
          acc[stat._id] = stat.count;
          return acc;
        }, {})
      }
    });
  } catch (error) {
    console.error('Get event RSVPs error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};