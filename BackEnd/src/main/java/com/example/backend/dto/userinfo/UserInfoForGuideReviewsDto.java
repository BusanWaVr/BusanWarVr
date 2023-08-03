package com.example.backend.dto.userinfo;

import com.example.backend.model.user.User;
import lombok.Data;

@Data
public class UserInfoForGuideReviewsDto {

    private Long id;
    private String name;

    public UserInfoForGuideReviewsDto(User user) {
        this.id = user.getId();
        this.name = user.getNickname();
    }

}
