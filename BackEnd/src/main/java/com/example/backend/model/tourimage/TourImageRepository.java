package com.example.backend.model.tourimage;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TourImageRepository extends JpaRepository<TourImage, Long> {

    List<TourImage> findAllByTourId(Long tourId);

    TourImage findByTourId(Long tourId);
}
