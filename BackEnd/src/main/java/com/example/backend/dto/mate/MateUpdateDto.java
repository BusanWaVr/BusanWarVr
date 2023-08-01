package com.example.backend.dto.mate;

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
