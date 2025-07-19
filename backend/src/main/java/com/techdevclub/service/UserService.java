package com.techdevclub.service;

import com.techdevclub.model.User;
import com.techdevclub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmailAndIsActive(email, true)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole())))
                .build();
    }

    public User createUser(String name, String email, String password) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("User with email " + email + " already exists");
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email.toLowerCase());
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("USER");
        user.setActive(true);

        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmailAndIsActive(email.toLowerCase(), true);
    }

    public User updateLastLogin(String email) {
        User user = findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setLastLogin(LocalDateTime.now());
        return userRepository.save(user);
    }

    public User updateLastVisitedPage(String email, String page) {
        User user = findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setLastVisitedPage(page);
        return userRepository.save(user);
    }

    public User updateProfile(String email, User updatedUser) {
        User user = findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update allowed fields
        if (updatedUser.getName() != null) {
            user.setName(updatedUser.getName());
        }
        if (updatedUser.getBio() != null) {
            user.setBio(updatedUser.getBio());
        }
        if (updatedUser.getSkills() != null) {
            user.setSkills(updatedUser.getSkills());
        }
        if (updatedUser.getGithub() != null) {
            user.setGithub(updatedUser.getGithub());
        }
        if (updatedUser.getLinkedin() != null) {
            user.setLinkedin(updatedUser.getLinkedin());
        }
        if (updatedUser.getWebsite() != null) {
            user.setWebsite(updatedUser.getWebsite());
        }
        if (updatedUser.getAvatar() != null) {
            user.setAvatar(updatedUser.getAvatar());
        }

        return userRepository.save(user);
    }

    public boolean validatePassword(String email, String password) {
        User user = findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return passwordEncoder.matches(password, user.getPassword());
    }
}