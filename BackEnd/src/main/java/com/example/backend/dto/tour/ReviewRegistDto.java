package com.example.backend.dto.tour;

import com.example.backend.model.review.Review;
import java.util.Date;
import lombok.Data;

@Data
public class ReviewRegistDto {

    @Data
    public static class Request {

        private Long tourId;
        private String title;
        private String content;
        private double score;

        public Review toReview(Date date, Long userId) {
            double roundedScore = Math.max(0.0, Math.min(5.0, Math.round(this.score * 2) / 2.0));
            return new Review(this.tourId, this.title, this.content, date, roundedScore, userId);
        }
    }

}
