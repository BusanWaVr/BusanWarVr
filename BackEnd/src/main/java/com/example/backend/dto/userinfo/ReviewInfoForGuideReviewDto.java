package com.example.backend.dto.userinfo;

import java.util.Date;
import lombok.Data;

@Data
public class ReviewInfoForGuideReviewDto {

    private Long tourId;
    private String tourTitle;
    private Date date;
    private String content;
    private double score;
    private UserInfoForGuideReviewsDto user;


}
