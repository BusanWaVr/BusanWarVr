package com.example.backend.dto.userinfo;

import com.example.backend.dto.userinfo.GuideInfoForUserFollowDto;
import lombok.Data;

@Data
public class UserFollowDto {

    public static class Response {

        private Long id;
        private String nickname;
        private int follower;
        private int tourNumbers;

        public Response(GuideInfoForUserFollowDto guide) {
            this.id = guide.getId();
            this.nickname = guide.getNickname();
            this.follower = guide.getFollower();
            this.tourNumbers = guide.getTourNumbers();

        }
    }

}
