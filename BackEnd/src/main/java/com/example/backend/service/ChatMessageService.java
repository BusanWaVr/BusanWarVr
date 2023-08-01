package com.example.backend.service;

import com.example.backend.config.pubsub.RedisPublisher;
import com.example.backend.document.MessageRepository;
import com.example.backend.dto.chat.NormalMessageDto;
import com.example.backend.model.user.User;
import com.example.backend.model.user.UserRepository;
import com.example.backend.security.jwt.JwtDecoder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatMessageService {

    private final RedisPublisher redisPublisher;
    private final UserRepository userRepository;
    private final MessageRepository messageRepository;
    private final JwtDecoder jwtDecoder;

    public void sendNormalMessage(NormalMessageDto normalMessageDto) {
        String token = normalMessageDto.getToken();
        token = token.substring(7);
        String email = jwtDecoder.decodeUsername(token);
        User user = userRepository.findByEmail(email);

        messageRepository.save(normalMessageDto.toMessage(user, "NORMAL"));
        redisPublisher.chatMessagePublish(normalMessageDto.toChatMessageResponseDto(user));
    }
}
