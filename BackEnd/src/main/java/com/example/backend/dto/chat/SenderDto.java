package com.example.backend.dto.chat;

import com.example.backend.model.user.User;
import lombok.Data;

@Data
public class SenderDto {

    private Long id;
    private String email;
    private String nickname;
    private String type;

    public SenderDto(User user){
        this.id = user.getId();
        this.email = user.getEmail();
        this.nickname = user.getNickname();
        this.type = user.getType().toString();
    }
}
