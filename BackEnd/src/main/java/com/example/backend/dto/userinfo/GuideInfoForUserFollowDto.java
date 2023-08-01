package com.example.backend.dto.userinfo;

import lombok.Data;

@Data
public class GuideInfoForUserFollowDto {

    private Long id;
    private String nickname;
    private int follower;
    private int tourNumbers;

}
