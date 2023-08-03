package com.example.backend.dto.tour;

import com.example.backend.model.review.Review;
import java.util.Date;
import lombok.Data;

@Data
public class ReviewUpdateDto {

    @Data
    public static class Request {

        private String title;
        private String content;
        private double score;

        public Review toUpdate(Review review, Date date) {
            double roundedScore = Math.max(0.0, Math.min(5.0, Math.round(this.score * 2) / 2.0));
            review.setTitle(this.title);
            review.setContent(this.content);
            review.setScore(roundedScore);
            review.setDate(date);
            return review;
        }

    }
}
