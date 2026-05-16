package com.skillsync.controllers;

import com.skillsync.models.User;
import com.skillsync.repositories.UserRepository;
import com.skillsync.repositories.InvitationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InvitationRepository invitationRepository;

    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getUserProfile(@PathVariable Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();

        User user = userOpt.get();
        long pendingInvites = invitationRepository.countByReceiverIdAndStatus(userId, "PENDING");

        Map<String, Object> stats = new HashMap<>();
        stats.put("user", user);
        stats.put("pendingInvites", pendingInvites);
        stats.put("projectsCompleted", user.getProjectsCompleted());
        
        return ResponseEntity.ok(stats);
    }

    @PostMapping("/setup")
    public ResponseEntity<?> completeOnboarding(@RequestBody Map<String, Object> data) {
        Long userId = Long.valueOf(data.get("userId").toString());
        Integer projects = Integer.valueOf(data.get("projects").toString());
        String skillsStr = data.get("skills").toString();
        List<String> skillsList = new java.util.ArrayList<>(java.util.Arrays.asList(skillsStr.split(",\\s*")));

        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();

        User user = userOpt.get();
        user.setProjectsCompleted(projects);
        user.setSkills(skillsList);
        userRepository.save(user);

        return ResponseEntity.ok(user);
    }

    @PostMapping("/upload-pic")
    public ResponseEntity<?> uploadProfilePic(@RequestParam("userId") Long userId, 
                                            @RequestParam("file") MultipartFile file) {
        try {
            Optional<User> userOpt = userRepository.findById(userId);
            if (userOpt.isEmpty()) return ResponseEntity.notFound().build();

            // Convert file to Base64 String
            byte[] bytes = file.getBytes();
            String base64String = Base64.getEncoder().encodeToString(bytes);
            String dataUri = "data:" + file.getContentType() + ";base64," + base64String;

            // Update user avatar
            User user = userOpt.get();
            user.setAvatar(dataUri);
            userRepository.save(user);

            return ResponseEntity.ok(user);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Could not upload file: " + e.getMessage());
        }
    }
}
