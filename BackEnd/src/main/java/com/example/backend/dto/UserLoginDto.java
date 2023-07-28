package com.example.backend.dto;

import com.example.backend.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserLoginDto {

    private long userId;
    private String email;
    private String nickname;
    private String profileImg;
    private String Access_Token;
    private String Refresh_Token;

    public UserLoginDto(User user, String access, String refresh){
        this.userId = user.getId();
        this.email = user.getEmail();
        this.nickname = user.getNickname();
        this.profileImg = user.getProfileImg();
        this.Access_Token = access;
        this.Refresh_Token = refresh;
    }
}
