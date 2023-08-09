package com.example.backend.dto.userinfo;

import com.example.backend.model.follower.Follower;
import com.example.backend.model.user.User;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GuideFollowerDto {

    private Long userId;
    private String nickname;
    private String profileImg;

    public GuideFollowerDto(Follower follower) {
        User user = follower.getUser();
        this.userId = user.getId();
        this.nickname = user.getNickname();
        this.profileImg = user.getProfileImg();
    }
}
