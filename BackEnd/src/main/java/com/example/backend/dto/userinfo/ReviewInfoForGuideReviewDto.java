package com.example.backend.dto.userinfo;

import com.example.backend.model.review.Review;
import com.example.backend.model.tour.Tour;
import java.util.Date;
import lombok.Data;

@Data
public class ReviewInfoForGuideReviewDto {

    private Long tourId;
    private String tourTitle;
    private Date date;
    private String content;
    private String title;
    private double score;
    private UserInfoForGuideReviewsDto user;

    public ReviewInfoForGuideReviewDto(Tour tour, Review review, UserInfoForGuideReviewsDto user) {
        this.tourId = tour.getId();
        this.tourTitle = tour.getTitle();
        this.date = review.getDate();
        this.content = review.getContent();
        this.title = review.getTitle();
        this.score = review.getScore();
        this.user = user;
    }


}
