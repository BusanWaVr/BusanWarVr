package com.example.backend.dto.mate;

import com.example.backend.model.joiner.Joiner;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MateJoinerDto {
    private String profileImg;
    private String nickname;
    private Date joinDate;

    public MateJoinerDto(Joiner joiner){
        this.profileImg = joiner.getUser().getProfileImg();
        this.nickname = joiner.getUser().getNickname();
        this.joinDate = joiner.getJoinDate();
    }
}
