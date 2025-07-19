package com.techdevclub.repository;

import com.techdevclub.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findByIsActiveTrue();
    List<Event> findByIsActiveTrueOrderByDateAsc();
    List<Event> findByIsActiveTrueOrderByDateDesc();
    
    @Query("{'isActive': true, 'date': {$gt: ?0}}")
    List<Event> findUpcomingEvents(LocalDateTime now);
    
    @Query("{'isActive': true, 'date': {$lt: ?0}}")
    List<Event> findPastEvents(LocalDateTime now);
    
    List<Event> findByIsActiveTrueAndIsFeaturedTrue();
    List<Event> findByIsActiveTrueAndCategory(String category);
    
    Optional<Event> findByIdAndIsActiveTrue(String id);
}