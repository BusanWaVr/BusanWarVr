package com.example.backend.dto;

import com.example.backend.model.course.Course;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CourseDto {

    @Data
    @NoArgsConstructor
    public static class Request {

        private double lon;
        private double lat;
        private String title;
        private String content;
        private Long tourId;
        private MultipartFile image;
    }

    @Data
    @AllArgsConstructor
    public static class Response {

        private double lon;
        private double lat;
        private String title;
        private String content;
        private Long tourId;
        private String image;

        public Response(Course course, String image) {
            this.lon = course.getLon();
            this.lat = course.getLat();
            this.title = course.getTitle();
            this.content = course.getContent();
            this.tourId = course.getTourId();
            this.image = image;
        }
    }
}
