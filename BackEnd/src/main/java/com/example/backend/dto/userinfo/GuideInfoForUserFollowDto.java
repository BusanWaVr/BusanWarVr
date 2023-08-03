package com.example.backend.dto.userinfo;

import com.example.backend.model.user.User;
import lombok.Data;

@Data
public class GuideInfoForUserFollowDto {

    private Long id;
    private String nickname;
    private int follower;
    private int tourNumbers;
    private String imageUrl;
    private double averageScore;

    public GuideInfoForUserFollowDto(User guide, int follower, int tourNumbers, double averageScore) {
        this.id = guide.getId();
        this.nickname = guide.getNickname();
        this.follower = follower;
        this.tourNumbers = tourNumbers;
        this.imageUrl = guide.getProfileImg();
        this.averageScore = averageScore;
    }

}
