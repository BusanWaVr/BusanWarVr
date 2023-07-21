package com.example.backend.dto;

import lombok.Data;

@Data
public class AuthNicknameDto {

    @Data
    public static class Request{
        private String nickname;
    }
}
