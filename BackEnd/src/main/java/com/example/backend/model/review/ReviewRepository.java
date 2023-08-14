package com.example.backend.model.review;

import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    boolean existsByTourIdAndUserId(Long tourId, Long userId);

    List<Review> findAllByTourId(Long tourId, Pageable pageable);

    List<Review> findAllByTourId(Long tourId);

    List<Review> findAllByUserId(Long userId);

}
