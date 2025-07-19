package com.techdevclub.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.CompoundIndex;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Document(collection = "rsvps")
@CompoundIndex(def = "{'eventId': 1, 'userEmail': 1}", unique = true)
public class RSVP {
    @Id
    private String id;
    
    @NotBlank(message = "Event ID is required")
    private String eventId;
    
    @Email(message = "Please provide a valid email")
    @NotBlank(message = "Email is required")
    private String userEmail;
    
    @NotBlank(message = "Name is required")
    private String userName;
    
    private String status = "PENDING"; // PENDING, CONFIRMED, CANCELLED
    
    @CreatedDate
    private LocalDateTime submittedAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    @Size(max = 500, message = "Notes cannot exceed 500 characters")
    private String notes;
    
    // Constructors
    public RSVP() {}
    
    public RSVP(String eventId, String userEmail, String userName) {
        this.eventId = eventId;
        this.userEmail = userEmail;
        this.userName = userName;
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getEventId() { return eventId; }
    public void setEventId(String eventId) { this.eventId = eventId; }
    
    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}