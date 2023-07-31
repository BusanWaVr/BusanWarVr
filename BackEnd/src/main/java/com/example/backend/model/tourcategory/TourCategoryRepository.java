package com.example.backend.model.tourcategory;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TourCategoryRepository extends JpaRepository<TourCategory, Long> {
    List<TourCategory> findAllByTourId(Long tourId);
}
