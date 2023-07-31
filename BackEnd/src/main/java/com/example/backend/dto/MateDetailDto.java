package com.example.backend.dto;

import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class MateDetailDto {

    @Data
    @NoArgsConstructor
    public static class Response {
        private MateInfoDetailDto mate;
        private List<MateJoinerDto> joiners;
    }
}
