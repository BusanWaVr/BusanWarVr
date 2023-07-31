package com.example.backend.controller;

import com.example.backend.document.EventDoc;
import com.example.backend.document.EventRepository;
import com.example.backend.dto.chat.ChatMessageRequestDto;
import com.example.backend.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatController {
    private final ChatMessageService chatMessageService;
    private final EventRepository eventRepository;

    @MessageMapping("/chat/message")
    public void chatMessage(@RequestBody ChatMessageRequestDto requestDto){
        chatMessageService.sendChatMessage(requestDto);
    }

    @GetMapping("/mongoTest")
    public void mongoTest(){
        EventDoc eventDoc = new EventDoc();
        eventDoc.setImage("asdasd");
        eventDoc.setTitle("asdasdasd");

        eventRepository.save(eventDoc);
    }
}
