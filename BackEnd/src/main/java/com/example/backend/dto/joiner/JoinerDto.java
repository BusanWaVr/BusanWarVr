package com.example.backend.dto.joiner;

import java.util.Date;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class JoinerDto {

    private String profileImage;
    private String nickname;
    private Date joinDate;

    public JoinerDto(String profileImage, String nickname, Date joinDate) {
        this.profileImage = profileImage;
        this.nickname = nickname;
        this.joinDate = joinDate;
    }
}
