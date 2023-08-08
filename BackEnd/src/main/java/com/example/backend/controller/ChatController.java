package com.example.backend.controller;

import com.example.backend.document.EventRepository;
import com.example.backend.dto.chat.LeaveMessageDto;
import com.example.backend.dto.chat.NormalMessageDto;
import com.example.backend.service.chat.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatMessageService chatMessageService;
    private final EventRepository eventRepository;

    @MessageMapping("/chat/message/normal")
    public void normal(@RequestBody NormalMessageDto requestDto) {
        chatMessageService.sendNormalMessage(requestDto);
    }

    @MessageMapping("/chat/message/leave")
    public void leave(@RequestBody LeaveMessageDto requestDto){
        chatMessageService.sendLeaveMessage(requestDto);
    }
}
