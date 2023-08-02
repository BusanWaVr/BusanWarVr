package com.example.backend.dto.userinfo;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class GuideHomeDto {


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private String introduction;
        private List<TourInfoForGuideScheduledToursDto> scheduledTours;
        private List<TourInfoForGuideEndedTours> endedTours;
        private List<ReviewInfoForGuideReviewDto> reviews;
    }

}
