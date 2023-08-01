package com.example.backend.dto.user;

import lombok.Data;

@Data
public class AuthCodeDto {

    @Data
    public static class Request {

        private String email;
        private String code;
    }
}
