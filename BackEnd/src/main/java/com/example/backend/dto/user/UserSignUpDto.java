package com.example.backend.dto.user;

import com.example.backend.model.category.Category;
import com.example.backend.model.user.User;
import java.util.List;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UserSignUpDto {

    @Data
    @NoArgsConstructor
    public static class Request {

        @NotBlank(message = "이메일 주소를 입력해 주세요")
        @Email(message = "올바른 이메일 주소를 입력해 주세요")
        private String email;

        @NotBlank(message = "닉네임을 입력해주세요.")
        @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$", message = "닉네임은 숫자, 한글, 영어만 가능합니다.")
        @Size(min = 2, max = 8, message = "닉네임은 2자 이상 8자 이하여야합니다.")
        private String nickname;

        @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%])[A-Za-z\\d!@#$%]*$", message = "비밀번호는 영문, 숫자, 특수문자(!@#$%)를 모두 포함하여 설정해주세요.")
        @Size(min = 10, message = "비밀번호는 10자 이상여야합니다.")
        private String password;

        private List<String> category;
        private MultipartFile profileImg;

        @Override
        public String toString() {
            return "Reqeust{" +
                    "email='" + email + '\'' +
                    ", nickname='" + nickname + '\'' +
                    ", password='" + password + '\'' +
                    ", usercategory=" + category +
                    ", profileImg=" + profileImg +
                    '}';
        }

        public User toUser(String profileImg, String encodedPassword) {
            return new User(this.email, this.nickname, encodedPassword, profileImg);
        }

        public Category toCategory(String categoryName) {
            return new Category(categoryName);
        }
    }
}
