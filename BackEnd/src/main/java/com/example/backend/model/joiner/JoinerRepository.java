package com.example.backend.model.joiner;

import com.example.backend.model.tour.Tour;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JoinerRepository extends JpaRepository<Joiner, Long> {

    List<Joiner> findAllByTourId(Long tourId);

    List<Joiner> findAllByUserId(Long userId);

    Long countByTour(Tour tour);

    void deleteAllByTourId(Long tourId);

    boolean existsByTourIdAndUserId(Long tourId, Long userId);
}
