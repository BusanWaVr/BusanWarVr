package com.example.backend.model.tour;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TourRepository extends JpaRepository<Tour, Long> {
    List<Tour> findAllByUserId(Long userId);
    Tour findByUid(String uid);
}
