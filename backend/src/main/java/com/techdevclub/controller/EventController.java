package com.techdevclub.controller;

import com.techdevclub.model.Event;
import com.techdevclub.service.EventService;
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
@RequestMapping("/events")
@CrossOrigin(origins = "*")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping
    public ResponseEntity<?> getAllEvents(
            @RequestParam(required = false) String filter,
            @RequestParam(required = false) String category) {
        try {
            List<Event> events;

            if ("upcoming".equals(filter)) {
                events = eventService.getUpcomingEvents();
            } else if ("past".equals(filter)) {
                events = eventService.getPastEvents();
            } else if ("featured".equals(filter)) {
                events = eventService.getFeaturedEvents();
            } else if (category != null && !category.isEmpty()) {
                events = eventService.getEventsByCategory(category);
            } else {
                events = eventService.getAllActiveEvents();
            }

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("events", events);
            response.put("total", events.size());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEventById(@PathVariable String id) {
        try {
            Event event = eventService.getEventById(id)
                    .orElseThrow(() -> new RuntimeException("Event not found"));

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("event", event);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createEvent(@Valid @RequestBody Event event) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String createdBy = "api-user"; // Since this uses API key authentication
            
            Event createdEvent = eventService.createEvent(event, createdBy);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Event created successfully");
            response.put("event", createdEvent);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable String id, @Valid @RequestBody Event event) {
        try {
            Event updatedEvent = eventService.updateEvent(id, event);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Event updated successfully");
            response.put("event", updatedEvent);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable String id) {
        try {
            eventService.deleteEvent(id);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Event deleted successfully");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}