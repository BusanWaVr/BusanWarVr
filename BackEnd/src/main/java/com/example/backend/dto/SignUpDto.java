package com.example.backend.dto;

import com.example.backend.model.Category;
import com.example.backend.model.User;
import static com.example.backend.validation.ValidationGroups.*;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.List;

@Data
public class SignUpDto {

    @Data
    public static class Reqeust{

        @NotBlank(message = "이메일 주소를 입력해 주세요")
        @Email(message = "올바른 이메일 주소를 입력해 주세요")
        private String email;

        @NotBlank(message = "닉네임을 입력해주세요.", groups = NotBlankGroup.class)
        @Pattern(regexp = "^[a-zA-Z0-9가-힣]+$", message = "닉네임은 숫자, 한글, 영어만 가능합니다.",
                groups = PatternGroup.class)
        @Size(min = 2, max = 8, message = "닉네임은 2자 이상 8자 이하여야합니다.",groups = SizeGroup.class)
        private String nickname;

        @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{10,16}", message = "비밀번호는 10~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
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

        public User toUser(String profileImg, String encodedPassword) {
            return new User(this.email, this.nickname, encodedPassword, profileImg);
        }

        public Category toCategory(String category, User user) {
            return  new Category(category, user);
        }
    }
}
