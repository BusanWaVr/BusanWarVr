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

@DisplayName("가이드 회원가입 API 테스트")
@SpringBootTest
@AutoConfigureMockMvc
class GuideSignUpApiTest {

    @MockBean
    UserService userService;

    @Autowired
    MockMvc mockMvc;

    @Test
    @DisplayName("가이드 회원가입 성공 테스트")
    void signUpSuccessTest() throws Exception {

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/guide")
                        .param("email", "test123@naver.com")
                        .param("password", "test12345@!")
                        .param("nickname", "test121"))
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        Response response = mapper.readValue(content, Response.class);

        assertThat(response.getCode()).isEqualTo("200");
    }

    @Test
    @DisplayName("가이드 회원가입 실패 테스트 - 올바르지 않은 이메일 형식")
    void signUpFailTest1() throws Exception {

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/guide")
                        .param("email", "test123")
                        .param("password", "test12345!@")
                        .param("nickname", "test1234"))
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        ErrorResponse response = mapper.readValue(content, ErrorResponse.class);

        //1. status 400
        assertThat(response.getStatus()).isEqualTo("400");
        //2. FieldError 안의 field가 email이 존재하는지
        assertThat(response.getErrors().get(0).getField()).isEqualTo("email");
        //3. 이메일 유효성 검사만 걸렸기때문에 errors의 길이가 1인지.
        assertThat(response.getErrors().size()).isEqualTo(1);
    }

    @Test
    @DisplayName("가이드 회원가입 실패 테스트 - 올바르지 않은 비밀번호 형식(짧은 비밀번호)")
    void signUpFailTest2() throws Exception {

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/guide")
                        .param("email", "test123@gmail.com")
                        .param("password", "a1!")
                        .param("nickname", "test1234"))
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        ErrorResponse response = mapper.readValue(content, ErrorResponse.class);

        assertThat(response.getStatus()).isEqualTo("400");
        assertThat(response.getErrors().get(0).getField()).isEqualTo("password");
        assertThat(response.getErrors().size()).isEqualTo(1);
    }

    @Test
    @DisplayName("가이드 회원가입 실패 테스트 - 올바르지 않은 비밀번호 형식(영/숫/특문 중 두 가지 이상 사용하지 않은 비밀번호)")
    void signUpFailTest3() throws Exception {

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/guide")
                        .param("email", "test123@gmail.com")
                        .param("password", "1234567890")
                        .param("nickname", "test1234"))
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        ErrorResponse response = mapper.readValue(content, ErrorResponse.class);

        assertThat(response.getStatus()).isEqualTo("400");
        assertThat(response.getErrors().get(0).getField()).isEqualTo("password");
        assertThat(response.getErrors().size()).isEqualTo(1);
    }

    @Test
    @DisplayName("가이드 회원가입 실패 테스트 - 2글자 미만인 닉네임")
    void signUpFailTest4() throws Exception {

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/guide")
                        .param("email", "test123@gmail.com")
                        .param("password", "test1234!@")
                        .param("nickname", "t"))
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        ErrorResponse response = mapper.readValue(content, ErrorResponse.class);

        assertThat(response.getStatus()).isEqualTo("400");
        assertThat(response.getErrors().get(0).getField()).isEqualTo("nickname");
        assertThat(response.getErrors().size()).isEqualTo(1);
    }

    @Test
    @DisplayName("가이드 회원가입 실패 테스트 - 8글자 초과하는 닉네임")
    void signUpFailTest5() throws Exception {

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/guide")
                        .param("email", "test123@gmail.com")
                        .param("password", "test1234!@")
                        .param("nickname", "test12345"))
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        ErrorResponse response = mapper.readValue(content, ErrorResponse.class);

        assertThat(response.getStatus()).isEqualTo("400");
        assertThat(response.getErrors().get(0).getField()).isEqualTo("nickname");
        assertThat(response.getErrors().size()).isEqualTo(1);
    }
}