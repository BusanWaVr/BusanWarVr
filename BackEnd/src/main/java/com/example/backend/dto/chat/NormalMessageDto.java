package com.example.backend.dto.chat;

import com.example.backend.document.Message;
import com.example.backend.model.user.User;
import lombok.Data;

@Data
public class NormalMessageDto {

    private String roomUid;
    private String token;
    private String message;

    public ChatMessageResponseDto<String> toChatMessageResponseDto(User user) {
        return new ChatMessageResponseDto<>(this.roomUid, new SenderDto(user), "NORMAL",
                this.message);
    }

    public Message toMessage(User user, String type) {
        SenderDto senderDto = new SenderDto(user);
        return new Message(this.roomUid, senderDto, type, message);
    }
}
