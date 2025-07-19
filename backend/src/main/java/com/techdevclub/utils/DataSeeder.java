package com.techdevclub.utils;

import com.techdevclub.model.Event;
import com.techdevclub.model.User;
import com.techdevclub.repository.EventRepository;
import com.techdevclub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        seedUsers();
        seedEvents();
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            // Create admin user
            User admin = new User();
            admin.setName("Admin User");
            admin.setEmail("admin@techdevclub.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole("ADMIN");
            admin.setActive(true);
            admin.setBio("Administrator of Tech Dev Club");
            userRepository.save(admin);

            // Create sample user
            User user = new User();
            user.setName("John Doe");
            user.setEmail("john@example.com");
            user.setPassword(passwordEncoder.encode("password123"));
            user.setRole("USER");
            user.setActive(true);
            user.setBio("Full-stack developer passionate about React and Node.js");
            user.setSkills(Arrays.asList("JavaScript", "React", "Node.js", "MongoDB"));
            user.setGithub("https://github.com/johndoe");
            user.setLinkedin("https://linkedin.com/in/johndoe");
            userRepository.save(user);

            System.out.println("✅ Sample users created");
        }
    }

    private void seedEvents() {
        if (eventRepository.count() == 0) {
            // Create sample events
            Event event1 = new Event();
            event1.setTitle("React 18 Deep Dive Workshop");
            event1.setDescription("Learn about the latest features in React 18 including concurrent features, automatic batching, and Suspense improvements. This hands-on workshop will cover practical examples and real-world use cases.");
            event1.setShortDescription("Learn React 18 features with hands-on examples");
            event1.setDate(LocalDateTime.now().plusDays(30));
            event1.setTime("14:00");
            event1.setLocation("Virtual (Zoom)");
            event1.setImageUrls(Arrays.asList(
                "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
            ));
            event1.setFormUrl("https://forms.google.com/react-workshop");
            event1.setCategory("Workshop");
            event1.setMaxAttendees(100);
            event1.setTags(Arrays.asList("React", "JavaScript", "Frontend"));
            event1.setFeatured(true);
            event1.setActive(true);
            
            Event.Speaker speaker1 = new Event.Speaker();
            speaker1.setName("Sarah Chen");
            speaker1.setTitle("Senior React Developer at Meta");
            speaker1.setAvatar("https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150");
            speaker1.setBio("Sarah is a senior React developer with 8+ years of experience building scalable web applications.");
            event1.setSpeaker(speaker1);
            
            eventRepository.save(event1);

            Event event2 = new Event();
            event2.setTitle("AI/ML Bootcamp for Beginners");
            event2.setDescription("A comprehensive introduction to Machine Learning using Python. Perfect for developers looking to get started with AI. We'll cover fundamental concepts, popular libraries, and build practical projects.");
            event2.setShortDescription("Introduction to Machine Learning with Python");
            event2.setDate(LocalDateTime.now().plusDays(35));
            event2.setTime("10:00");
            event2.setLocation("Virtual (Discord)");
            event2.setImageUrls(Arrays.asList(
                "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
            ));
            event2.setFormUrl("https://forms.google.com/ai-bootcamp");
            event2.setCategory("Bootcamp");
            event2.setMaxAttendees(150);
            event2.setTags(Arrays.asList("AI", "Machine Learning", "Python"));
            event2.setFeatured(true);
            event2.setActive(true);
            
            Event.Speaker speaker2 = new Event.Speaker();
            speaker2.setName("Dr. Marcus Johnson");
            speaker2.setTitle("ML Research Scientist");
            speaker2.setAvatar("https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150");
            speaker2.setBio("Dr. Johnson is a machine learning expert with a PhD in Computer Science and 10+ years of research experience.");
            event2.setSpeaker(speaker2);
            
            eventRepository.save(event2);

            Event event3 = new Event();
            event3.setTitle("Web3 Developer Summit");
            event3.setDescription("Explore the future of web development with blockchain, smart contracts, and decentralized applications. Join industry experts as they share insights into the Web3 ecosystem.");
            event3.setShortDescription("Explore blockchain and decentralized applications");
            event3.setDate(LocalDateTime.now().plusDays(45));
            event3.setTime("09:00");
            event3.setLocation("San Francisco, CA");
            event3.setImageUrls(Arrays.asList(
                "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800"
            ));
            event3.setFormUrl("https://forms.google.com/web3-summit");
            event3.setCategory("Conference");
            event3.setMaxAttendees(200);
            event3.setTags(Arrays.asList("Web3", "Blockchain", "Smart Contracts"));
            event3.setFeatured(false);
            event3.setActive(true);
            
            eventRepository.save(event3);

            System.out.println("✅ Sample events created");
        }
    }
}