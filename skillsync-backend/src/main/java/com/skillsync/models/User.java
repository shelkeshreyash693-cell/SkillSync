package com.skillsync.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String password;
    private String profilePicPath;
    private Integer projectsCompleted = 0;
    private String name;
    private String role;
    
    @Lob
    @Column(columnDefinition = "TEXT")
    private String avatar = "https://i.pravatar.cc/150?img=11";
    
    private int level;

    @ElementCollection
    @CollectionTable(name = "user_skills", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "skill")
    private List<String> skills;
}
