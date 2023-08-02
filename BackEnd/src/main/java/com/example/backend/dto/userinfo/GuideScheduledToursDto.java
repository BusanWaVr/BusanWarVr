package com.example.backend.dto.userinfo;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class GuideScheduledToursDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {

        private List<TourInfoForGuideScheduledToursDto> wishTours;

    }

}