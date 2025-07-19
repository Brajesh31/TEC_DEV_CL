package com.techdevclub.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
@CrossOrigin(origins = "*")
public class HealthController {

    @GetMapping
    public ResponseEntity<?> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("message", "Tech Dev Club API is running");
        response.put("timestamp", LocalDateTime.now());
        response.put("service", "tech-dev-club-backend");
        response.put("version", "1.0.0");
        response.put("environment", "production");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/detailed")
    public ResponseEntity<?> detailedHealthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("timestamp", LocalDateTime.now());
        response.put("service", "tech-dev-club-backend");
        response.put("version", "1.0.0");
        
        // Add system information
        Runtime runtime = Runtime.getRuntime();
        Map<String, Object> system = new HashMap<>();
        system.put("totalMemory", runtime.totalMemory() / 1024 / 1024 + " MB");
        system.put("freeMemory", runtime.freeMemory() / 1024 / 1024 + " MB");
        system.put("maxMemory", runtime.maxMemory() / 1024 / 1024 + " MB");
        system.put("processors", runtime.availableProcessors());
        
        response.put("system", system);
        
        // Add available endpoints
        Map<String, String> endpoints = new HashMap<>();
        endpoints.put("health", "/api/health");
        endpoints.put("auth", "/api/auth/*");
        endpoints.put("events", "/api/events");
        endpoints.put("rsvp", "/api/rsvp");
        endpoints.put("users", "/api/users/*");
        
        response.put("endpoints", endpoints);

        return ResponseEntity.ok(response);
    }
}