package com.example.backend.model.review;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    boolean existsByTourIdAndUserId(Long tourId, Long userId);
}
