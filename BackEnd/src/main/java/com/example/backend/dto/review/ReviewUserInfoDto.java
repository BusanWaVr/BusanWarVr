package com.example.backend.dto.review;

import com.example.backend.model.review.Review;
import com.example.backend.model.tour.Tour;
import java.util.Date;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReviewUserInfoDto {
    private Long id;
    private String title;
    private String content;
    private Date date;
    private double score;
    private long userId;
    private long tourId;
    private String tourTitle;

    public ReviewUserInfoDto(Review review, Tour tour){
        this.id = review.getId();
        this.title = review.getTitle();
        this.content = review.getContent();
        this.date = review.getDate();
        this.userId = review.getUserId();
        this.tourId = review.getTourId();
        this.tourTitle = tour.getTitle();
    }
}
