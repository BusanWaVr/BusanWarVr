package com.example.backend.model.joiner;

import com.example.backend.model.tour.Tour;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JoinerRepository extends JpaRepository<Joiner, Long> {
    Long countByTour(Tour tour);
}
