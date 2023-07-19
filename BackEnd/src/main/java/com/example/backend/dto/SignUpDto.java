package com.example.backend.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class SignUpDto {

    @Data
    public static class Reqeust{
        private String email;
        private String password;
        private List<String> category;
        private MultipartFile profileImg;
    }
}
