package com.example.backend.dto.userinfo;

import com.example.backend.model.enums.AuthType;
import com.example.backend.model.user.User;
import lombok.Data;

@Data
public class UserInfoDto {

    @Data
    public static class Response {

        private Long userId;
        private String nickname;
        private String profileImg;
        private AuthType type;
        private String introduction;
        private int followingNum;

        public Response(User user, int followingNum) {
            this.userId = user.getId();
            this.nickname = user.getNickname();
            this.profileImg = user.getProfileImg();
            this.type = user.getType();
            this.introduction = user.getIntroduction();
            this.followingNum = followingNum;
        }
    }

}
