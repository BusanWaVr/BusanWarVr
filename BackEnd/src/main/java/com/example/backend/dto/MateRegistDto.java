package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class MateRegistDto {

    @Data
    @NoArgsConstructor
    public static class Request{
        private long tourId;
        private String title;
        private String content;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response{
        private long mateId;
    }
}
