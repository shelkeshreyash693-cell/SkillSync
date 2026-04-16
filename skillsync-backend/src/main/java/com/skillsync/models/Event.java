package com.skillsync.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String date;
    private String mode;
    private String type;
    
    @Column(length = 2000)
    private String description;

    @ElementCollection
    @CollectionTable(name = "event_skills", joinColumns = @JoinColumn(name = "event_id"))
    @Column(name = "skill")
    private List<String> requiredSkills;

    public Event() {}

    public Event(String title, String date, String mode, String type, String description, List<String> requiredSkills) {
        this.title = title;
        this.date = date;
        this.mode = mode;
        this.type = type;
        this.description = description;
        this.requiredSkills = requiredSkills;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public List<String> getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(List<String> requiredSkills) { this.requiredSkills = requiredSkills; }
}
