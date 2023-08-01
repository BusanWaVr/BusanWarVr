package com.example.backend.service;

import com.example.backend.dto.chat.ChatRoomRegistDto;
import com.example.backend.model.chat.ChatParticipantsInfo;
import com.example.backend.model.chat.ChatParticipantsInfoRepository;
import com.example.backend.model.chat.ChatRoom;
import com.example.backend.model.chat.ChatRoomRepository;
import com.example.backend.model.joiner.Joiner;
import com.example.backend.model.joiner.JoinerRepository;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.tour.TourRepository;
import com.example.backend.model.user.User;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatParticipantsInfoRepository chatParticipantsInfoRepository;
    private final TourRepository tourRepository;
    private final JoinerRepository joinerRepository;

    public void createChatRoom(User user, ChatRoomRegistDto.Request request) {
        Tour tour = tourRepository.findById(request.getTourId()).get();
        ChatRoom chatRoom = new ChatRoom(user, tour);
        chatRoomRepository.save(chatRoom);
    }

    public void startChatRoom(User user, ChatRoomRegistDto.Request request) {
        if (user.getType().toString() != "GUIDE") {
            throw new IllegalArgumentException("가이드만 채팅방을 시작할 수 있습니다.");
        }

        Tour tour = tourRepository.findById(request.getTourId()).get();

        if (user.getId() != tour.getUserId()) {
            throw new IllegalArgumentException("투어 설립자가 아닙니다.");
        }

        ChatRoom chatRoom = chatRoomRepository.findByTour(tour);
        List<Joiner> joiners = joinerRepository.findAllByTourId(request.getTourId());

        for (Joiner joiner : joiners) {
            ChatParticipantsInfo chatParticipantsInfo = new ChatParticipantsInfo(joiner.getUser(),
                    chatRoom);
            chatParticipantsInfoRepository.save(chatParticipantsInfo);
        }
    }
}
