package com.example.backend.dto;

import com.example.backend.model.User;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class SignUpDto {

    @Data
    public static class Reqeust{
        private String email;
        private String nickname;
        private String password;
        private List<String> category;
        private MultipartFile profileImg;

        @Override
        public String toString() {
            return "Reqeust{" +
                    "email='" + email + '\'' +
                    ", nickname='" + nickname + '\'' +
                    ", password='" + password + '\'' +
                    ", category=" + category +
                    ", profileImg=" + profileImg +
                    '}';
        }

//        public User toUser() {
//            return new User(this.email, this.nickname, this.password, this.category);
//        }
    }
}
