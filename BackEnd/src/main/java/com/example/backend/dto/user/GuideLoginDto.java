package com.example.backend.dto.user;

import com.example.backend.model.user.User;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GuideLoginDto {
    private long userId;
    private String email;
    private String nickname;
    private String profileImg;
    private String introduce;
    private String type;
    private String Access_Token;
    private String Refresh_Token;

    public GuideLoginDto(User user, String access, String refresh){
        this.userId = user.getId();
        this.email = user.getEmail();
        this.nickname = user.getNickname();
        this.profileImg = user.getProfileImg();
        this.introduce = user.getIntroduction();
        this.type = user.getType().toString();
        this.Access_Token = access;
        this.Refresh_Token = refresh;
    }
}
