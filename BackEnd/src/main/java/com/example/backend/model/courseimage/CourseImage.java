package com.example.backend.model.courseimage;

import com.example.backend.model.course.Course;
import com.example.backend.model.image.Image;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class CourseImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Image image;

    @ManyToOne
    private Course course;
}
