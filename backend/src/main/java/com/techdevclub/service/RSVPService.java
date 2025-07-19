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
public class RSVPService {

    @Autowired
    private RSVPRepository rsvpRepository;

    @Autowired
    private EventRepository eventRepository;

    public RSVP createRSVP(String eventId, String userEmail, String userName, String notes) {
        // Check if event exists and is active
        Event event = eventRepository.findByIdAndIsActiveTrue(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        // Check if event is in the future
        if (!event.isUpcoming()) {
            throw new RuntimeException("Cannot RSVP to past events");
        }

        // Check if user already RSVPed
        Optional<RSVP> existingRSVP = rsvpRepository.findByEventIdAndUserEmail(eventId, userEmail.toLowerCase());
        if (existingRSVP.isPresent()) {
            throw new RuntimeException("You have already RSVPed to this event");
        }

        // Check if event is full
        if (event.getMaxAttendees() != null) {
            long currentRSVPs = rsvpRepository.countByEventIdAndStatusIn(
                    eventId, 
                    Arrays.asList("PENDING", "CONFIRMED")
            );
            
            if (currentRSVPs >= event.getMaxAttendees()) {
                throw new RuntimeException("Event is full");
            }
        }

        // Create RSVP
        RSVP rsvp = new RSVP();
        rsvp.setEventId(eventId);
        rsvp.setUserEmail(userEmail.toLowerCase());
        rsvp.setUserName(userName);
        rsvp.setNotes(notes);
        rsvp.setStatus("PENDING");

        return rsvpRepository.save(rsvp);
    }

    public List<RSVP> getUserRSVPs(String userEmail) {
        return rsvpRepository.findByUserEmail(userEmail.toLowerCase());
    }

    public List<RSVP> getEventRSVPs(String eventId) {
        return rsvpRepository.findByEventId(eventId);
    }

    public List<RSVP> getEventRSVPsByStatus(String eventId, String status) {
        return rsvpRepository.findByEventIdAndStatus(eventId, status);
    }

    public RSVP updateRSVPStatus(String rsvpId, String status) {
        RSVP rsvp = rsvpRepository.findById(rsvpId)
                .orElseThrow(() -> new RuntimeException("RSVP not found"));

        if (!Arrays.asList("PENDING", "CONFIRMED", "CANCELLED").contains(status)) {
            throw new RuntimeException("Invalid status");
        }

        rsvp.setStatus(status);
        return rsvpRepository.save(rsvp);
    }

    public void deleteRSVP(String rsvpId) {
        RSVP rsvp = rsvpRepository.findById(rsvpId)
                .orElseThrow(() -> new RuntimeException("RSVP not found"));
        
        rsvpRepository.delete(rsvp);
    }

    public Optional<RSVP> findUserRSVPForEvent(String eventId, String userEmail) {
        return rsvpRepository.findByEventIdAndUserEmail(eventId, userEmail.toLowerCase());
    }
}