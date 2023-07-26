package com.example.backend.dto;

import lombok.Data;

@Data
public class CourseDto {

    @Data
    public static class Request{
        private double lon;
        private double lat;
        private String title;
        private String content;
        private String image;
        private Long tourId;
    }

}
