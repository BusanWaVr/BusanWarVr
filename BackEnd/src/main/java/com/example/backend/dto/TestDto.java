package com.example.backend.dto;

import com.example.backend.model.user.User;
import com.example.backend.model.enums.AuthType;
import lombok.Data;

@Data
public class TestDto {

    @Data
    public static class Response {

        private String userId;
        private String refreshToken;
        private AuthType type;

        public Response(User user) {
            this.userId = user.getEmail();
            this.refreshToken = user.getRefreshToken();
            this.type = user.getType();
        }
    }
}
