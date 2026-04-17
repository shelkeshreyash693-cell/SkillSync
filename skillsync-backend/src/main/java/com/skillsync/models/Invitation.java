package com.skillsync.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "invitations")
@Data
public class Invitation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long senderId;
    private Long receiverId;
    private Long eventId;
    private String status; // PENDING, ACCEPTED, REJECTED
}
