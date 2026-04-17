package com.skillsync.repositories;

import com.skillsync.models.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InvitationRepository extends JpaRepository<Invitation, Long> {
    List<Invitation> findByReceiverIdAndStatus(Long receiverId, String status);
    long countByReceiverIdAndStatus(Long receiverId, String status);
}
