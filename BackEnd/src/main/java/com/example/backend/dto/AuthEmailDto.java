package com.example.backend.dto;

import lombok.Data;

@Data
public class AuthEmailDto {

    @Data
    public static class Request {

        private String email;
    }
}
