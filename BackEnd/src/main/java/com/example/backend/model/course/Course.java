package com.example.backend.model.course;

import com.example.backend.dto.course.CourseDto;
import com.example.backend.model.tour.Tour;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private double lon;

    @Column
    private double lat;

    @Column
    private String title;

    @Column
    private String content;

    @Column
    private Long tourId;

    public Course(double lon, double lat, String title, String content, Long tourId){
        this.lon = lon;
        this.lat = lat;
        this.title = title;
        this.content = content;
        this.tourId = tourId;
    }

    public Course(CourseDto.Request request, Tour tour){
        this.lon = request.getLon();
        this.lat = request.getLat();
        this.title = request.getTitle();
        this.content = request.getContent();
        this.tourId = tour.getId();
    }
}
