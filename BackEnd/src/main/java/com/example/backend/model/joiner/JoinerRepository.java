package com.example.backend.model.joiner;

import com.example.backend.model.tour.Tour;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JoinerRepository extends JpaRepository<Joiner, Long> {

    List<Joiner> findAllByTourId(Long tourId);

    Long countByTour(Tour tour);
}
