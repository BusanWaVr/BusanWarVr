package com.example.backend.dto.userinfo;

import com.example.backend.model.user.User;
import lombok.Data;

@Data
public class GuideInfoForUserTourDto {

    private Long id;
    private String name;
    private String profileImg;

    public GuideInfoForUserTourDto(User guide) {
        this.id = guide.getId();
        this.name = guide.getNickname();
        this.profileImg = guide.getProfileImg();;
    }

}
