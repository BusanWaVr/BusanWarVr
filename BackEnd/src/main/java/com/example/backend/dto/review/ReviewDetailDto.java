package com.example.backend.dto.review;

import com.example.backend.model.review.Review;
import java.util.Date;
import lombok.Data;

@Data
public class ReviewDetailDto {

    @Data
    public static class Response {

        private Long tourId;
        private Long userId;
        private String title;
        private String content;
        private double score;
        private Date date;

        public Response(Review review) {
            this.tourId = review.getTourId();
            this.userId = review.getUserId();
            this.title = review.getTitle();
            this.content = review.getContent();
            this.score = review.getScore();
            this.date = review.getDate();
        }
    }
}
