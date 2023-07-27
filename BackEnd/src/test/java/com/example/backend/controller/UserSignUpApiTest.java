package com.example.backend.controller;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import com.example.backend.dto.Response;
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

@DisplayName("사용자 회원가입 Api 테스트")
@SpringBootTest
@AutoConfigureMockMvc
class UserSignUpApiTest {

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
                        .param("nickname", "jae")
                        .param("category", "힐링, 여행, 체험"))
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();
        objectMapper = new ObjectMapper();
        Response response = objectMapper.readValue(content, Response.class);

        assertThat(response.getCode()).isEqualTo("200");

    }

    @Test
    @DisplayName("사용자 회원가입 실패 테스트 - 닉네임(숫자,한글,영어 외 포함)")
    void signUpFailTestNickname1() throws Exception {

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/user")
                        .param("email", "test2@naver.com")
                        .param("password", "test12345!")
                        .param("nickname", "!!")
                        .param("category", "힐링, 여행, 체험"))
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();

        objectMapper = new ObjectMapper();
        ErrorResponse response = objectMapper.readValue(content, ErrorResponse.class);

        assertThat(response.getStatus()).isEqualTo("400");
        assertThat(response.getErrors().get(0).getField()).isEqualTo("nickname");
        assertThat(response.getErrors().size()).isEqualTo(1);
    }

    @Test
    @DisplayName("사용자 회원가입 실패 테스트 - 닉네임(길이 부족)")
    void signUpFailTestNickname2() throws Exception {

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/user")
                        .param("email", "test2@naver.com")
                        .param("password", "test12345!")
                        .param("nickname", "f")
                        .param("category", "힐링, 여행, 체험"))
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();

        objectMapper = new ObjectMapper();
        ErrorResponse response = objectMapper.readValue(content, ErrorResponse.class);

        assertThat(response.getStatus()).isEqualTo("400");
        assertThat(response.getErrors().get(0).getField()).isEqualTo("nickname");
        assertThat(response.getErrors().size()).isEqualTo(1);
    }

    @Test
    @DisplayName("사용자 회원가입 실패 테스트 - 닉네임(길이 초과)")
    void signUpFailTestNickname3() throws Exception {

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/user")
                        .param("email", "test2@naver.com")
                        .param("password", "test12345!")
                        .param("nickname", "fdddddddddddddddddddddd")
                        .param("category", "힐링, 여행, 체험"))
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();

        objectMapper = new ObjectMapper();
        ErrorResponse response = objectMapper.readValue(content, ErrorResponse.class);

        assertThat(response.getStatus()).isEqualTo("400");
        assertThat(response.getErrors().get(0).getField()).isEqualTo("nickname");
        assertThat(response.getErrors().size()).isEqualTo(1);
    }

    @Test
    @DisplayName("사용자 회원가입 실패 테스트 - 비밀번호(영문자,숫자,특수문자 중 하나 미포함)")
    void signUpFailTestPassword1() throws Exception {

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/user")
                        .param("email", "test1@naver.com")
                        .param("password", "test123456")
                        .param("nickname", "jae")
                        .param("category", "힐링, 여행, 체험"))
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();

        objectMapper = new ObjectMapper();
        ErrorResponse response = objectMapper.readValue(content, ErrorResponse.class);
        assertThat(response.getStatus()).isEqualTo("400");
        assertThat(response.getErrors().get(0).getField()).isEqualTo("password");
        assertThat(response.getErrors().size()).isEqualTo(1);
    }

    @Test
    @DisplayName("사용자 회원가입 실패 테스트 - 비밀번호(길이 부족)")
    void signUpFailTestPassword2() throws Exception {

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/user")
                        .param("email", "test1@naver.com")
                        .param("password", "abc12345!")
                        .param("nickname", "jae")
                        .param("category", "힐링, 여행, 체험"))
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();

        objectMapper = new ObjectMapper();
        ErrorResponse response = objectMapper.readValue(content, ErrorResponse.class);
        assertThat(response.getStatus()).isEqualTo("400");
        assertThat(response.getErrors().get(0).getField()).isEqualTo("password");
        assertThat(response.getErrors().size()).isEqualTo(1);
    }

    @Test
    @DisplayName("사용자 회원가입 실패 테스트 - 이메일")
    public void signUpFailTestEmail() throws Exception {

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/user")
                        .param("email", "test1@") // 이메일 형식 벗어남
                        .param("password", "test12345!")
                        .param("nickname", "jae2")
                        .param("category", "힐링, 여행, 체험"))
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();

        objectMapper = new ObjectMapper();
        ErrorResponse response = objectMapper.readValue(content, ErrorResponse.class);

        assertThat(response.getStatus()).isEqualTo("400");
        assertThat(response.getErrors().get(0).getField()).isEqualTo("email");
        assertThat(response.getErrors().size()).isEqualTo(1);
    }
}