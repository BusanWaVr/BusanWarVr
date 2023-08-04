package com.example.backend.dto.tour;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TourSearchInfoDto {

    @Data
    @NoArgsConstructor
    public static class Request {
        private String keyword;
        private String type;
    }
}
