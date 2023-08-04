package com.example.backend.model.course.qdto;

import com.example.backend.model.course.Course;
import com.example.backend.model.image.Image;
import com.querydsl.core.annotations.QueryProjection;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CourseCustomDto {

    private Long id;
    private double lon;
    private double lat;
    private String title;
    private String content;
    private String imageUrl;

    @QueryProjection
    public CourseCustomDto(Course course, String url) {
        this.id = course.getId();
        this.lon = course.getLon();
        this.lat = course.getLat();
        this.title = course.getTitle();
        this.content = course.getContent();
        this.imageUrl = url;
    }
}
