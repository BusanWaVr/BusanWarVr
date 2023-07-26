package com.example.backend.controller;

import com.example.backend.dto.chat.ChatMessageRequestDto;
import com.example.backend.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatController {
    private final ChatMessageService chatMessageService;

    @MessageMapping("/chat/message")
    public void chatMessage(@RequestBody ChatMessageRequestDto requestDto){
        chatMessageService.sendChatMessage(requestDto);
    }
}
