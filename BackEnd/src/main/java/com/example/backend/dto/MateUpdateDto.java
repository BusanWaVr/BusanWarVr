package com.example.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class MateUpdateDto {

    @Data
    @NoArgsConstructor
    public static class Request {
        private String title;
        private String content;
    }
}
