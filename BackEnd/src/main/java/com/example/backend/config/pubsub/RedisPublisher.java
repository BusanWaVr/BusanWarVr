package com.example.backend.config.pubsub;

import com.example.backend.dto.chat.ChatMessageResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RedisPublisher {
    private final RedisTemplate<String, Object> redisTemplate;
    private final ChannelTopic channelTopic;
    private final SimpMessageSendingOperations messagingTemplate;

    public void chatMessagePublish(ChatMessageResponseDto messageDto){
        messagingTemplate.convertAndSend("/sub/chat/message/room/" + messageDto.getRoomUid(), messageDto);
    }
}
