package com.skillsync.controllers;

import com.skillsync.models.User;
import com.skillsync.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userRepository.findFirstByEmail(request.getEmail());
        
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(request.getPassword())) {
            User user = userOpt.get();
            user.setPassword(null); // Prevent sending password back in JSON
            return ResponseEntity.ok(user);
        }
        
        return ResponseEntity.status(401).body("Invalid email or password");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userRepository.findFirstByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email is already registered");
        }
        
        User newUser = new User(
            null, // ID (auto-generated)
            request.getEmail(),
            request.getPassword(),
            null, // No profile pic yet
            0,    // 0 Projects completed
            request.getName(),
            request.getRole() == null ? "Student" : request.getRole(),
            "https://i.pravatar.cc/150?img=" + (int)(Math.random() * 70), // Random avatar
            1,    // Starting Level 1
            new java.util.ArrayList<>(List.of("HTML/CSS", "Teamwork")) // Default starter skills
        );
        userRepository.save(newUser);
        newUser.setPassword(null); // Don't return password string
        
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/social-login")
    public ResponseEntity<?> socialLogin(@RequestBody SocialLoginRequest request) {
        Optional<User> userOpt = userRepository.findFirstByEmail(request.getEmail());
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setPassword(null);
            return ResponseEntity.ok(user);
        }
        
        // If user doesn't exist, auto-register them using their social profile
        User newUser = new User(
            null,
            request.getEmail(),
            null, // No password for social login
            null,
            0,
            request.getName(),
            "Student", // Default role
            request.getPhotoUrl() != null ? request.getPhotoUrl() : "https://i.pravatar.cc/150?img=" + (int)(Math.random() * 70),
            1,
            new java.util.ArrayList<>(List.of("HTML/CSS", "Teamwork"))
        );
        userRepository.save(newUser);
        
        return ResponseEntity.ok(newUser);
    }

    // DTOs for Request Mapping
    public static class LoginRequest {
        private String email;
        private String password;
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class RegisterRequest {
        private String name;
        private String email;
        private String password;
        private String role;
        
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
    }

    public static class SocialLoginRequest {
        private String email;
        private String name;
        private String photoUrl;
        private String provider;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getPhotoUrl() { return photoUrl; }
        public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }
        public String getProvider() { return provider; }
        public void setProvider(String provider) { this.provider = provider; }
    }
}
