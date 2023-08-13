package com.example.backend.dto.review;

import com.example.backend.model.review.Review;
import com.example.backend.model.user.User;
import java.util.Date;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReviewDto {

    private String nickname;
    private String profileImg;
    private String title;
    private String content;
    private double score;
    private Date date;

    public ReviewDto(User user, Review review) {
        this.nickname = user.getNickname();
        this.profileImg = user.getProfileImg();
        this.title = review.getTitle();
        this.content = review.getContent();
        this.score = review.getScore();
        this.date = review.getDate();
    }
}
