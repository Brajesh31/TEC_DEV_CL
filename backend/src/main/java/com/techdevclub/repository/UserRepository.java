package com.techdevclub.repository;

import com.techdevclub.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndIsActive(String email, boolean isActive);
    boolean existsByEmail(String email);
}