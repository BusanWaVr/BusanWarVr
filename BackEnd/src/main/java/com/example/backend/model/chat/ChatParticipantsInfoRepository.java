package com.example.backend.model.chat;

import com.example.backend.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatParticipantsInfoRepository extends JpaRepository<ChatParticipantsInfo, Long> {
    void deleteByUserAndChatRoom(User user, ChatRoom chatRoom);
}
