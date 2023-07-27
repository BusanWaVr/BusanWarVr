package com.example.backend.dto.chat;

import com.example.backend.model.user.User;
import lombok.Data;

@Data
public class SenderResponseDto {
    private long userId;
    private String email;
    private String nickname;
    private String profileImg;

    public SenderResponseDto(User user){
        this.userId = user.getId();
        this.email = user.getEmail();
        this.nickname = user.getNickname();
        this.profileImg = user.getProfileImg();
    }
}
