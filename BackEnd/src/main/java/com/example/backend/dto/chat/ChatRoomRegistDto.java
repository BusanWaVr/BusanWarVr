package com.example.backend.dto.chat;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class ChatRoomRegistDto {

    @Data
    @NoArgsConstructor
    public static class Request {
        private Long tourId;
    }
}
