package com.example.backend.dto.userinfo;

import com.example.backend.model.user.User;
import lombok.Data;

@Data
public class GuideInfoForUserWishDto {

    private Long id;
    private String name;

    public GuideInfoForUserWishDto(User guide) {
        this.id = guide.getId();
        this.name = guide.getNickname();
    }
}
