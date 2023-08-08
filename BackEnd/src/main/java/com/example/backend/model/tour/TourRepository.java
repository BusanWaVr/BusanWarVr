package com.example.backend.model.tour;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TourRepository extends JpaRepository<Tour, Long> {

    List<Tour> findAllByUserId(Long userId);

    List<Tour> findAllByUserId(Long userId, Pageable pageable);

    List<Tour> findByIsEndedFalseOrderByStartDateDesc(Pageable pageable);

    Tour findByUid(String uid);

    List<Tour> findByIsEndedFalseOrderByStartDate();
}
