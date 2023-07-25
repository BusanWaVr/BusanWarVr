package com.example.backend.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class AuthPasswordDto {

    @Data
    public static class Request {

        @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
        @Pattern(regexp = "^(?=(?:[^a-zA-Z]*[a-zA-Z])(?:[^\\d]*\\d|\\d*[^\\d]|[^\\w]*\\w|\\w*[^\\w]))[\\w\\W]*$", message = "비밀번호는 영문, 숫자, 특수문자 중 2종류 이상을 조합하여 설정해주세요.")
        @Size(min = 10, message = "비밀번호는 10자 이상여야합니다.")
        private String password;
    }

}
