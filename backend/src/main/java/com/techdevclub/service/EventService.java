package com.techdevclub.service;

import com.techdevclub.model.Event;
import com.techdevclub.model.RSVP;
import com.techdevclub.repository.EventRepository;
import com.techdevclub.repository.RSVPRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private RSVPRepository rsvpRepository;

    public List<Event> getAllActiveEvents() {
        List<Event> events = eventRepository.findByIsActiveTrueOrderByDateAsc();
        return updateEventAttendeeCount(events);
    }

    public List<Event> getUpcomingEvents() {
        List<Event> events = eventRepository.findUpcomingEvents(LocalDateTime.now());
        return updateEventAttendeeCount(events);
    }

    public List<Event> getPastEvents() {
        List<Event> events = eventRepository.findPastEvents(LocalDateTime.now());
        return updateEventAttendeeCount(events);
    }

    public List<Event> getFeaturedEvents() {
        List<Event> events = eventRepository.findByIsActiveTrueAndIsFeaturedTrue();
        return updateEventAttendeeCount(events);
    }

    public List<Event> getEventsByCategory(String category) {
        List<Event> events = eventRepository.findByIsActiveTrueAndCategory(category);
        return updateEventAttendeeCount(events);
    }

    public Optional<Event> getEventById(String id) {
        Optional<Event> eventOpt = eventRepository.findByIdAndIsActiveTrue(id);
        if (eventOpt.isPresent()) {
            Event event = eventOpt.get();
            updateSingleEventAttendeeCount(event);
            return Optional.of(event);
        }
        return Optional.empty();
    }

    public Event createEvent(Event event, String createdBy) {
        event.setCreatedBy(createdBy);
        event.setActive(true);
        event.setCurrentAttendees(0);
        return eventRepository.save(event);
    }

    public Event updateEvent(String id, Event updatedEvent) {
        Event event = eventRepository.findByIdAndIsActiveTrue(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        // Update allowed fields
        if (updatedEvent.getTitle() != null) {
            event.setTitle(updatedEvent.getTitle());
        }
        if (updatedEvent.getDescription() != null) {
            event.setDescription(updatedEvent.getDescription());
        }
        if (updatedEvent.getShortDescription() != null) {
            event.setShortDescription(updatedEvent.getShortDescription());
        }
        if (updatedEvent.getDate() != null) {
            event.setDate(updatedEvent.getDate());
        }
        if (updatedEvent.getTime() != null) {
            event.setTime(updatedEvent.getTime());
        }
        if (updatedEvent.getLocation() != null) {
            event.setLocation(updatedEvent.getLocation());
        }
        if (updatedEvent.getImageUrls() != null) {
            event.setImageUrls(updatedEvent.getImageUrls());
        }
        if (updatedEvent.getFormUrl() != null) {
            event.setFormUrl(updatedEvent.getFormUrl());
        }
        if (updatedEvent.getCategory() != null) {
            event.setCategory(updatedEvent.getCategory());
        }
        if (updatedEvent.getMaxAttendees() != null) {
            event.setMaxAttendees(updatedEvent.getMaxAttendees());
        }
        if (updatedEvent.getTags() != null) {
            event.setTags(updatedEvent.getTags());
        }
        if (updatedEvent.getSpeaker() != null) {
            event.setSpeaker(updatedEvent.getSpeaker());
        }
        event.setFeatured(updatedEvent.isFeatured());

        return eventRepository.save(event);
    }

    public void deleteEvent(String id) {
        Event event = eventRepository.findByIdAndIsActiveTrue(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        
        event.setActive(false);
        eventRepository.save(event);
    }

    private List<Event> updateEventAttendeeCount(List<Event> events) {
        for (Event event : events) {
            updateSingleEventAttendeeCount(event);
        }
        return events;
    }

    private void updateSingleEventAttendeeCount(Event event) {
        long attendeeCount = rsvpRepository.countByEventIdAndStatusIn(
                event.getId(), 
                Arrays.asList("PENDING", "CONFIRMED")
        );
        event.setCurrentAttendees((int) attendeeCount);
    }
}