package com.example.backend.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageResponseDto <T>{

    private String roomUid;
    private SenderResponseDto sender;
    private String type;
    private T body;
}
