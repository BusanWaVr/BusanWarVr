package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CourseRegistDto {

    @Data
    @AllArgsConstructor
    public static class Response{
        private double lon;
        private double lat;
        private String title;
        private String content;
        private Long tourId;
        private String image;
    }
}
