package com.example.backend.dto.chat;

import com.example.backend.model.user.User;
import lombok.Data;

@Data
public class ChatMessageRequestDto {
    private long roomId;
    private String token;
    private String message;

    public ChatMessageResponseDto toChatMessageResponseDto(User user){
        return new ChatMessageResponseDto(this.roomId, new SenderResponseDto(user), this.message);
    }
}
