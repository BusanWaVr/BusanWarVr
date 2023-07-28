package com.example.backend.controller;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import com.example.backend.dto.LoginRequestDto;
import com.example.backend.dto.Response;
import com.example.backend.exception.ErrorResponse;
import com.example.backend.model.user.UserRepository;
import com.example.backend.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@DisplayName("비밀번호 변경 API 테스트")
@SpringBootTest
@AutoConfigureMockMvc
class UpdatePasswordTest {

    @MockBean
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    private String accessToken;

    @BeforeEach
    public void settingUser() throws Exception {

        LoginRequestDto requestDto = new LoginRequestDto("azxc123@gmail.com", "azxc123!@#$");
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDto)))
                .andReturn();

        accessToken = mvcResult.getResponse().getHeader("Access_Token");
    }

    @Test
    @DisplayName("비밀번호 변경 성공")
    void UpdatePasswordSuccessTest() throws Exception {

        String jsonData = "{\"password\": \"azxc123!@#$%\"}";

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.put("/user/password")
                        .header("Authorization", accessToken)
                        .content(jsonData)
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        String content = mvcResult.getResponse().getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        Response response = mapper.readValue(content, Response.class);

        assertThat(response.getCode()).isEqualTo("200");
    }

    @Test
    @DisplayName("비밀번호 변경 실패 - 올바르지 않은 비밀번호 형식(짧은 비밀번호)")
    void UpdatePasswordFailTest1() throws Exception {

        String jsonData = "{\"password\": \"a1!\"}";

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/auth/password")
                        .header("Authorization", accessToken)
                        .content(jsonData)
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        String content = mvcResult.getResponse().getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        ErrorResponse response = mapper.readValue(content, ErrorResponse.class);

        assertThat(response.getStatus()).isEqualTo("400");
        assertThat(response.getErrors().get(0).getField()).isEqualTo("password");
        assertThat(response.getErrors().size()).isEqualTo(1);
    }

    @Test
    @DisplayName("비밀번호 변경 실패 - 올바르지 않은 비밀번호 형식(영/숫/특문 중 두 가지 이상 사용하지 않은 비밀번호)")
    void UpdatePasswordFailTest2() throws Exception {

        String jsonData = "{\"password\": \"1234567890\"}";

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/auth/password")
                        .header("Authorization", accessToken)
                        .content(jsonData)
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        String content = mvcResult.getResponse().getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        ErrorResponse response = mapper.readValue(content, ErrorResponse.class);

        assertThat(response.getStatus()).isEqualTo("400");
        assertThat(response.getErrors().get(0).getField()).isEqualTo("password");
        assertThat(response.getErrors().size()).isEqualTo(1);
    }
}