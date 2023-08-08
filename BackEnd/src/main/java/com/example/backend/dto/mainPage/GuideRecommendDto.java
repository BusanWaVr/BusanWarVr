package com.example.backend.dto.mainPage;

import com.example.backend.model.user.User;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GuideRecommendDto {

    private Long userId;
    private String nickname;
    private String profileImg;
    private int followerNum;
    private int tourNumbers;;
    private double averageScore;

    public GuideRecommendDto(User user, int followerNum, int tourNumbers, double averageScore) {
        double roundedScore = Math.max(0.0, Math.min(5.0, Math.round(averageScore * 10) / 10.0));
        this.userId = user.getId();
        this.nickname = user.getNickname();
        this.profileImg = user.getProfileImg();
        this.followerNum = followerNum;
        this.tourNumbers = tourNumbers;
        this.averageScore = roundedScore;
    }
}
