package com.example.backend.dto.userinfo;

import com.example.backend.model.enums.AuthType;
import com.example.backend.model.user.User;
import lombok.Data;

@Data
public class GuideInfoDto {

    @Data
    public static class Response {

        private Long userId;
        private String nickname;
        private String profileImg;
        private AuthType type;
        private String introduction;
        private int followerNum;
        private int tourNumbers;;

        public Response(User user, int followerNum, int tourNumbers) {
            this.userId = user.getId();
            this.nickname = user.getNickname();
            this.profileImg = user.getProfileImg();
            this.type = user.getType();
            this.introduction = user.getIntroduction();
            this.followerNum = followerNum;
            this.tourNumbers = tourNumbers;
        }
    }
}
