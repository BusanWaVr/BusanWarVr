package com.example.backend.dto.tour;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class TourListDto {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {

        private List<TourDto> tourDtoList;
    }
}
