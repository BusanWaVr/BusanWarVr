package com.example.backend.dto.user;

import lombok.Data;

@Data
public class AuthNicknameDto {

    @Data
    public static class Request {

        private String nickname;
    }
}
