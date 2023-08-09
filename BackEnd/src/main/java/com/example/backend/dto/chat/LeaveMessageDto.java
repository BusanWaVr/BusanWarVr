package com.example.backend.dto.chat;

import com.example.backend.document.Message;
import com.example.backend.model.user.User;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LeaveMessageDto {

    private String roomUid;
    private String token;

    public ChatMessageResponseDto toChatMessageResponseDto(User user) {
        return new ChatMessageResponseDto<>(this.roomUid, new SenderDto(user), "LEAVE", null);
    }

    public Message toMessage(User user, String type) {
        SenderDto senderDto = new SenderDto(user);
        return new Message(this.roomUid, senderDto, type, null);
    }
}
