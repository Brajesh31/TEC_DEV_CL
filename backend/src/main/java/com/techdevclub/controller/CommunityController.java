package com.techdevclub.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/community")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"})
public class CommunityController {

    @GetMapping("/links")
    public ResponseEntity<?> getCommunityLinks() {
        Map<String, Object> response = new HashMap<>();
        Map<String, String> links = new HashMap<>();
        
        links.put("whatsapp", "https://chat.whatsapp.com/your-group-link");
        links.put("discord", "https://discord.gg/your-invite");
        
        response.put("success", true);
        response.put("data", Map.of("links", links));
        
        return ResponseEntity.ok(response);
    }

    @PutMapping("/links")
    public ResponseEntity<?> updateCommunityLinks(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        
        // In a real application, you would save these to a database
        response.put("success", true);
        response.put("message", "Community links updated successfully");
        response.put("data", Map.of("links", request.get("links")));
        
        return ResponseEntity.ok(response);
    }
}