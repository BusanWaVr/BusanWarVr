package com.example.backend.dto;

import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class MateListDto {

    @Data
    @NoArgsConstructor
    public static class Response {

        private List<MateInfoForListDto> mateList;

        public Response(List<MateInfoForListDto> mateList) {
            this.mateList = mateList;
        }
    }
}
