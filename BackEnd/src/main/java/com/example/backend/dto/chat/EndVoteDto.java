package com.example.backend.dto.chat;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class EndVoteDto {

    @Data
    @NoArgsConstructor
    public static class Request {
        private String roomUid;
    }
}
