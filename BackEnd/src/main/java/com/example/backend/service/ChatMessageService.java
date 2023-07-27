package com.example.backend.service;

import com.example.backend.config.pubsub.RedisPublisher;
import com.example.backend.dto.chat.ChatMessageRequestDto;
import com.example.backend.dto.chat.ChatMessageResponseDto;
import com.example.backend.model.chat.ChatRoom;
import com.example.backend.model.chat.ChatRoomRepository;
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
    private final ChatRoomRepository chatRoomRepository;
    private final JwtDecoder jwtDecoder;

    public void sendChatMessage(ChatMessageRequestDto chatMessageRequestDto ){
        ChatRoom chatRoom = (ChatRoom) chatRoomRepository.findById(chatMessageRequestDto.getRoomId()).get();
        if(chatRoom == null){
            throw new IllegalArgumentException("채팅방이 존재하지 않습니다.");
        }

        String token = chatMessageRequestDto.getToken();
        token = token.substring(7);
        String email = jwtDecoder.decodeUsername(token);
        User user = userRepository.findByEmail(email);

        redisPublisher.chatMessagePublish(chatMessageRequestDto.toChatMessageResponseDto(user));
    }
}
