package com.skillsync.controllers;

import com.skillsync.models.Event;
import com.skillsync.models.User;
import com.skillsync.repositories.EventRepository;
import com.skillsync.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/matches")
public class MatchController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    // A simple DTO to send to the frontend containing a user and their match score
    public static class MatchedUserDTO {
        public User user;
        public int matchScore;

        public MatchedUserDTO(User user, int matchScore) {
            this.user = user;
            this.matchScore = matchScore;
        }
    }

    @GetMapping("/{eventId}")
    public List<MatchedUserDTO> getMatchesForEvent(@PathVariable Long eventId) {
        Optional<Event> eventOpt = eventRepository.findById(eventId);
        if (eventOpt.isEmpty()) {
            return new ArrayList<>();
        }
        
        Event event = eventOpt.get();
        List<String> requiredSkills = event.getRequiredSkills() != null ? event.getRequiredSkills() : new ArrayList<>();
        
        List<User> allUsers = userRepository.findAll();
        List<MatchedUserDTO> matchedUsers = new ArrayList<>();

        // Calculate overlap (Simple Matching Algorithm mimicking a strict DAG approach for PBL purposes)
        for (User user : allUsers) {
            int score = calculateMatchScore(requiredSkills, user.getSkills());
            
            // Only add users if they have some relevance or randomly fuzz the score for demo purposes if list is empty
            if(requiredSkills.isEmpty() || user.getSkills() == null || user.getSkills().isEmpty()) {
                matchedUsers.add(new MatchedUserDTO(user, 50)); 
            } else {
                matchedUsers.add(new MatchedUserDTO(user, score));
            }
        }

        // Sort by match score descending
        matchedUsers.sort((m1, m2) -> Integer.compare(m2.matchScore, m1.matchScore));
        
        return matchedUsers;
    }

    private int calculateMatchScore(List<String> required, List<String> provided) {
        if(required.isEmpty()) return 100;

        int matches = 0;
        for (String reqSkill : required) {
            for (String provSkill : provided) {
                if (reqSkill.equalsIgnoreCase(provSkill)) {
                    matches++;
                    break;
                }
            }
        }

        double percentage = ((double) matches / required.size()) * 100;
        return (int) Math.round(percentage);
    }
}
