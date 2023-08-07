package com.example.backend.service.chat;

import com.example.backend.config.pubsub.RedisPublisher;
import com.example.backend.document.MessageRepository;
import com.example.backend.dto.chat.LeaveMessageDto;
import com.example.backend.dto.chat.NormalMessageDto;
import com.example.backend.dto.tour.TourRegistDto;
import com.example.backend.model.chat.ChatParticipantsInfoRepository;
import com.example.backend.model.chat.ChatRoom;
import com.example.backend.model.chat.ChatRoomRepository;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.tour.TourRepository;
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
    private final ChatParticipantsInfoRepository chatParticipantsInfoRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final TourRepository tourRepository;
    private final JwtDecoder jwtDecoder;

    public void sendNormalMessage(NormalMessageDto normalMessageDto) {
        String token = normalMessageDto.getToken();
        User user = getUserFromToken(token);

        messageRepository.save(normalMessageDto.toMessage(user, "NORMAL"));
        redisPublisher.chatMessagePublish(normalMessageDto.toChatMessageResponseDto(user));
    }

    public void sendLeaveMessage(LeaveMessageDto leaveMessageDto){
        String token = leaveMessageDto.getToken();
        User user = getUserFromToken(token);

        messageRepository.save(leaveMessageDto.toMessage(user, "LEAVE"));
        redisPublisher.chatMessagePublish(leaveMessageDto.toChatMessageResponseDto(user));
        // mysql에서 참가자에서 제외
        Tour tour = tourRepository.findByUid(leaveMessageDto.getRoomUid());
        ChatRoom chatRoom = chatRoomRepository.findByTour(tour);
        chatParticipantsInfoRepository.deleteByUserAndChatRoom(user, chatRoom);
    }

    public User getUserFromToken(String token){
        token = token.substring(7);
        String email = jwtDecoder.decodeUsername(token);
        return userRepository.findByEmail(email);
    }
}
