package com.techdevclub.controller;

import com.techdevclub.model.RSVP;
import com.techdevclub.service.RSVPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/rsvp")
@CrossOrigin(origins = "*")
public class RSVPController {

    @Autowired
    private RSVPService rsvpService;

    @PostMapping
    public ResponseEntity<?> createRSVP(@Valid @RequestBody RSVPRequest request) {
        try {
            RSVP rsvp = rsvpService.createRSVP(
                    request.getEventId(),
                    request.getUserEmail(),
                    request.getUserName(),
                    request.getNotes()
            );

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "RSVP created successfully");
            response.put("rsvp", rsvp);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<?> getUserRSVPs(@PathVariable String email) {
        try {
            List<RSVP> rsvps = rsvpService.getUserRSVPs(email);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("rsvps", rsvps);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<?> getEventRSVPs(
            @PathVariable String eventId,
            @RequestParam(required = false) String status) {
        try {
            List<RSVP> rsvps;
            if (status != null && !status.isEmpty()) {
                rsvps = rsvpService.getEventRSVPsByStatus(eventId, status);
            } else {
                rsvps = rsvpService.getEventRSVPs(eventId);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("rsvps", rsvps);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateRSVPStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> request) {
        try {
            String status = request.get("status");
            RSVP rsvp = rsvpService.updateRSVPStatus(id, status);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "RSVP status updated successfully");
            response.put("rsvp", rsvp);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRSVP(@PathVariable String id) {
        try {
            rsvpService.deleteRSVP(id);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "RSVP deleted successfully");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    // Request DTO
    public static class RSVPRequest {
        private String eventId;
        private String userEmail;
        private String userName;
        private String notes;

        // Getters and setters
        public String getEventId() { return eventId; }
        public void setEventId(String eventId) { this.eventId = eventId; }

        public String getUserEmail() { return userEmail; }
        public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

        public String getUserName() { return userName; }
        public void setUserName(String userName) { this.userName = userName; }

        public String getNotes() { return notes; }
        public void setNotes(String notes) { this.notes = notes; }
    }
}