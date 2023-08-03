package com.example.backend.model.follower;

import com.example.backend.model.user.User;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowerRepository extends JpaRepository<Follower, Long> {
    void deleteByUserAndGuide(User user, User guide);
    boolean existsByUserAndGuide(User user, User guide);
    List<Follower> findAllByUser(User user, Pageable pageable);
    List<Follower> findAllByGuide(User guide);

    List<Follower> findAllByUserId(Long userId);

    List<Follower> findAllByGuideId(Long guideId);
}
