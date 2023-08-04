package com.example.backend.model.tour.qdto;

import com.example.backend.model.user.User;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SearchTourGuideInfo {
    private Long userId;
    private String email;
    private String nickname;
    private String profileImg;
    private String introduction;

    @QueryProjection
    public SearchTourGuideInfo (User user){
        this.userId = user.getId();
        this.email = user.getEmail();
        this.nickname = user.getNickname();
        this.profileImg = user.getProfileImg();
        this.introduction = user.getIntroduction();
    }
}
