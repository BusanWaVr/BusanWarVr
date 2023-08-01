package com.example.backend.dto.mate;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class MateListDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {

        private Long totalCount;
        private List<MateInfoForListDto> mateList;
    }
}
