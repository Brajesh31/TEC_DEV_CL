import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Event from '../models/Event.js';
import connectDB from '../config/database.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await User.deleteMany({});
    await Event.deleteMany({});
    
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@techdevclub.com',
      passwordHash: 'admin123',
      role: 'admin'
    });
    await adminUser.save();
    console.log('Created admin user');

    // Create sample event
    const sampleEvents = [
      {
        title: 'React 18 Deep Dive Workshop',
        description: 'Learn about the latest features in React 18 including concurrent features, automatic batching, and Suspense improvements. This hands-on workshop will cover practical examples and real-world use cases.',
        shortDescription: 'Learn React 18 features with hands-on examples',
        date: new Date('2024-12-20T14:00:00Z'),
        time: '14:00',
        location: 'Virtual (Zoom)',
        images: [
          {
            url: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
            alt: 'React Workshop'
          },
          {
            url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
            alt: 'Coding Session'
          }
        ],
        formUrl: 'https://forms.google.com/react-workshop',
        category: 'Workshop',
        maxAttendees: 100,
        tags: ['React', 'JavaScript', 'Frontend'],
        speaker: {
          name: 'Sarah Chen',
          title: 'Senior React Developer at Meta',
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
          bio: 'Sarah is a senior React developer with 8+ years of experience building scalable web applications.'
        },
        isFeatured: true,
        createdBy: adminUser._id
      },
      {
        title: 'AI/ML Bootcamp for Beginners',
        description: 'A comprehensive introduction to Machine Learning using Python. Perfect for developers looking to get started with AI. We\'ll cover fundamental concepts, popular libraries, and build practical projects.',
        shortDescription: 'Introduction to Machine Learning with Python',
        date: new Date('2024-12-25T10:00:00Z'),
        time: '10:00',
        location: 'Virtual (Discord)',
        images: [
          {
            url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
            alt: 'AI Workshop'
          }
        ],
        formUrl: 'https://forms.google.com/ai-bootcamp',
        category: 'Bootcamp',
        maxAttendees: 150,
        tags: ['AI', 'Machine Learning', 'Python'],
        speaker: {
          name: 'Dr. Marcus Johnson',
          title: 'ML Research Scientist',
          avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
          bio: 'Dr. Johnson is a machine learning expert with a PhD in Computer Science and 10+ years of research experience.'
        },
        isFeatured: true,
        createdBy: adminUser._id
      },
      {
        title: 'Web3 Developer Summit',
        description: 'Explore the future of web development with blockchain, smart contracts, and decentralized applications. Join industry experts as they share insights into the Web3 ecosystem.',
        shortDescription: 'Explore blockchain and decentralized applications',
        date: new Date('2025-01-05T09:00:00Z'),
        time: '09:00',
        location: 'San Francisco, CA',
        images: [
          {
            url: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
            alt: 'Web3 Summit'
          }
        ],
        formUrl: 'https://forms.google.com/web3-summit',
        category: 'Conference',
        maxAttendees: 200,
        tags: ['Web3', 'Blockchain', 'Smart Contracts'],
        isFeatured: false,
        createdBy: adminUser._id
      }
    ];

    for (const eventData of sampleEvents) {
      const event = new Event(eventData);
      await event.save();
    }

    console.log('Created sample event');
    console.log('Seed data created successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();