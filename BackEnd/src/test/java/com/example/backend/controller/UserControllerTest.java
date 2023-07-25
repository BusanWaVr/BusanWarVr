package com.example.backend.controller;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import com.example.backend.exception.ErrorResponse;
import com.example.backend.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@DisplayName("사용자 컨트롤러 테스트")
@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @MockBean
    UserService userService;

    @Autowired
    MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("사용자 회원가입 성공 테스트")
    public void signUpSuccessTest() throws Exception {
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/user")
                        .param("email", "test1@naver.com")
                        .param("password", "test12345!")
                        .param("nickname", "jae"))
                .andReturn();

        // 회원가입이 성공적으로 이루어졌는지 확인
        assertThat(mvcResult.getResponse().getStatus()).isEqualTo(200);

    }

    @Test
    @DisplayName("사용자 회원가입 실패 테스트 - 비밀번호 ")
    void signUpFailTestPassword() throws Exception {

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/user")
                        .param("email", "test1@naver.com")
                        .param("password", "test12345")
                        .param("nickname", "jae"))
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();

        objectMapper = new ObjectMapper();
        ErrorResponse response = objectMapper.readValue(content, ErrorResponse.class);
        // status 400
        assertThat(response.getStatus()).isEqualTo("400");
        // FieldError 안의 field가 password가 존재하는지
        assertThat(response.getErrors().get(0).getField()).isEqualTo("password");
        // 비밀번호 길이, 유효성 모두 걸렸기때문에 errors의 길이가 2인지.
        assertThat(response.getErrors().size()).isEqualTo(2);
    }

    @Test
    @DisplayName("사용자 회원가입 실패 테스트 - 닉네임")
    void signUpFailTestNickname() throws Exception {

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/user")
                        .param("email", "test2@naver.com")
                        .param("password", "test12345!")
                        .param("nickname", "!"))
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();

        objectMapper = new ObjectMapper();
        ErrorResponse response = objectMapper.readValue(content, ErrorResponse.class);

        assertThat(response.getStatus()).isEqualTo("400");
        assertThat(response.getErrors().get(0).getField()).isEqualTo("nickname");
        // 닉네임의 유효성, 길이 걸렸기때문에 errors의 길이가 2
        assertThat(response.getErrors().size()).isEqualTo(2);
    }

    @Test
    @DisplayName("사용자 회원가입 실패 테스트 - 이메일")
    public void signUpFailTestEmail() throws Exception {

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/user")
                        .param("email", "test1@") // 이메일 형식 벗어남
                        .param("password", "test12345!")
                        .param("nickname", "jae2"))
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();

        objectMapper = new ObjectMapper();
        ErrorResponse response = objectMapper.readValue(content, ErrorResponse.class);

        assertThat(response.getStatus()).isEqualTo("400");
        assertThat(response.getErrors().get(0).getField()).isEqualTo("email");
        // 이메일의 형식만 걸렸기때문에 errors의 길이가 1
        assertThat(response.getErrors().size()).isEqualTo(1);
    }
}