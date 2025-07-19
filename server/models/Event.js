import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    trim: true,
    maxlength: [300, 'Short description cannot exceed 300 characters']
  },
  date: {
    type: Date,
    required: [true, 'Event date is required']
  },
  time: {
    type: String,
    required: [true, 'Event time is required']
  },
  location: {
    type: String,
    required: [true, 'Event location is required'],
    trim: true
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    }
  }],
  formUrl: {
    type: String,
    required: [true, 'RSVP form URL is required'],
    match: [/^https?:\/\/.+/, 'Please enter a valid URL']
  },
  category: {
    type: String,
    enum: ['Workshop', 'Bootcamp', 'Conference', 'Meetup', 'Hackathon', 'Webinar'],
    required: true
  },
  maxAttendees: {
    type: Number,
    min: [1, 'Max attendees must be at least 1']
  },
  currentAttendees: {
    type: Number,
    default: 0,
    min: 0
  },
  tags: [String],
  speaker: {
    name: String,
    title: String,
    avatar: String,
    bio: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Virtual for checking if event is upcoming
eventSchema.virtual('isUpcoming').get(function() {
  return this.date > new Date();
});

// Index for better query performance
eventSchema.index({ date: 1, isActive: 1 });
eventSchema.index({ category: 1, isActive: 1 });

export default mongoose.model('Event', eventSchema);