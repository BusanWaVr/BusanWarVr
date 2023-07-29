package com.example.backend.model.course;

import com.example.backend.dto.CourseDto;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findAllByTourId(Long id);
}
