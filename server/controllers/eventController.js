import Event from '../models/Event.js';
import RSVP from '../models/RSVP.js';

export const getAllEvents = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      upcoming, 
      featured 
    } = req.query;

    const filter = { isActive: true };
    
    if (category) filter.category = category;
    if (upcoming === 'true') filter.date = { $gt: new Date() };
    if (featured === 'true') filter.isFeatured = true;

    const events = await Event.find(filter)
      .populate('createdBy', 'name email')
      .sort({ date: upcoming === 'true' ? 1 : -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Event.countDocuments(filter);

    // Add virtual fields
    const eventsWithVirtuals = events.map(event => ({
      ...event,
      isUpcoming: event.date > new Date()
    }));

    res.json({
      success: true,
      data: {
        events: eventsWithVirtuals,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findOne({ _id: id, isActive: true })
      .populate('createdBy', 'name email profile.avatar')
      .lean();

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Add virtual fields
    event.isUpcoming = event.date > new Date();

    // Get RSVP count
    const rsvpCount = await RSVP.countDocuments({ 
      eventId: id, 
      status: { $in: ['pending', 'confirmed'] } 
    });

    res.json({
      success: true,
      data: {
        event: {
          ...event,
          currentAttendees: rsvpCount
        }
      }
    });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const createEvent = async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      createdBy: req.user._id
    };

    // Process images if provided
    if (req.body.images && Array.isArray(req.body.images)) {
      eventData.images = req.body.images.map(img => ({
        url: img.url || img,
        alt: img.alt || ''
      }));
    }

    const event = new Event(eventData);
    await event.save();

    const populatedEvent = await Event.findById(event._id)
      .populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: { event: populatedEvent }
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Process images if provided
    if (updateData.images && Array.isArray(updateData.images)) {
      updateData.images = updateData.images.map(img => ({
        url: img.url || img,
        alt: img.alt || ''
      }));
    }

    const event = await Event.findOneAndUpdate(
      { _id: id, isActive: true },
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      message: 'Event updated successfully',
      data: { event }
    });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findOneAndUpdate(
      { _id: id, isActive: true },
      { isActive: false },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getEventCategories = async (req, res) => {
  try {
    const categories = await Event.distinct('category', { isActive: true });
    
    res.json({
      success: true,
      data: { categories }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};