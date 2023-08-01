package com.example.backend.model.follower;

import com.example.backend.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowerRepository extends JpaRepository<Follower, Long> {
    void deleteByUserAndGuide(User user, User guide);
    boolean existsByUserAndGuide(User user, User guide);
}
