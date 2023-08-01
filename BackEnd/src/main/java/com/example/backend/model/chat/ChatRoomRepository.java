package com.example.backend.model.chat;

import com.example.backend.model.tour.Tour;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    ChatRoom findByTour(Tour tour);
}
