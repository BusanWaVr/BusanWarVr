package com.example.backend.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CourseDto {

    @Data
    public static class Request{
        private double lon;
        private double lat;
        private String title;
        private String content;
        private Long tourId;
        private MultipartFile image;
    }
}
