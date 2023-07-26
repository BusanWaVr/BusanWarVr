package com.example.backend.config.pubsub;

import com.example.backend.dto.chat.ChatMessageResponseDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RedisSubscriber {
    private final SimpMessageSendingOperations messagingTemplate;

    public void sendMessage(String publishMessage) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        ChatMessageResponseDto messageResponseDto = objectMapper.readValue(publishMessage, ChatMessageResponseDto.class);
        messagingTemplate.convertAndSend("/sub/chat/room/" + messageResponseDto.getRoomId(), messageResponseDto);
    }
}
