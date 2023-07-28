package com.example.backend.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class GuideUpdateDto {

    @Data
    public static class Request {

        @NotBlank(message = "닉네임을 입력해주세요.")
        @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$", message = "닉네임은 숫자, 한글, 영어만 가능합니다.")
        @Size(min = 2, max = 8, message = "닉네임은 2자 이상 8자 이하여야합니다.")
        private String nickname;

        private MultipartFile profileImg;

        private String introduction;

    }

}
