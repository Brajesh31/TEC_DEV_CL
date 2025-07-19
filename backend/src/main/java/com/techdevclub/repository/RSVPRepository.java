package com.techdevclub.repository;

import com.techdevclub.model.RSVP;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RSVPRepository extends MongoRepository<RSVP, String> {
    Optional<RSVP> findByEventIdAndUserEmail(String eventId, String userEmail);
    List<RSVP> findByEventId(String eventId);
    List<RSVP> findByUserEmail(String userEmail);
    List<RSVP> findByEventIdAndStatus(String eventId, String status);
    long countByEventIdAndStatusIn(String eventId, List<String> statuses);
}