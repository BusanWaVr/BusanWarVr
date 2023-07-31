package com.example.backend.model.tourcategory;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TourCategoryRepository extends JpaRepository<TourCategory, Long> {

    List<TourCategory> findAllByTourId(Long tourId);
}
