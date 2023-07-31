package com.example.backend.controller;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import com.example.backend.dto.Response;
import com.example.backend.exception.ErrorResponse;
import com.example.backend.model.user.UserRepository;
import com.example.backend.service.UserService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


@DisplayName("가이드 회원정보 변경 API 테스트")
@SpringBootTest
@AutoConfigureMockMvc
class UpdateGuideTest {

    @MockBean
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Value("${test.email}")
    private String email;

    @Value("${test.password}")
    private String password;

    private String accessToken;

    @BeforeEach
    public void settingUser() throws Exception {

        LoginRequestDto requestDto = new LoginRequestDto(email, password);
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDto)))
                .andReturn();

        accessToken = mvcResult.getResponse().getHeader("Access_Token");
    }

    @Test
    @DisplayName("가이드 회원정보 변경 성공 - 닉네임 변경하지 않았을 때")
    void UpdateGuideSuccessTest1() throws Exception {

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.put("/guide")
                        .header("Authorization", accessToken)
                        .param("nickname", "azxc123")
                        .param("introduction", "테스트"))
                .andReturn();
        String content = mvcResult.getResponse().getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        Response response = mapper.readValue(content, Response.class);

        assertThat(response.getCode()).isEqualTo("200");
    }

    @Test
    @DisplayName("가이드 회원정보 변경 성공 - 닉네임 변경했을 때")
    void UpdateGuideSuccessTest2() throws Exception {

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.put("/guide")
                        .header("Authorization", accessToken)
                        .param("nickname", "test121")
                        .param("introduction", "테스트"))
                .andReturn();
        String content = mvcResult.getResponse().getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        Response response = mapper.readValue(content, Response.class);

        assertThat(response.getCode()).isEqualTo("200");
    }

    @Test
    @DisplayName("가이드 회원정보 변경 실패 테스트 - 2글자 미만인 닉네임")
    void UpdateGuideFailTest1() throws Exception {

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.put("/guide")
                        .header("Authorization", accessToken)
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
    @DisplayName("가이드 회원정보 변경 실패 테스트 - 8글자 초과하는 닉네임")
    void UpdateGuideFailTest2() throws Exception {

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.put("/guide")
                        .header("Authorization", accessToken)
                        .param("nickname", "test12345"))
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        ErrorResponse response = mapper.readValue(content, ErrorResponse.class);

        assertThat(response.getStatus()).isEqualTo("400");
        assertThat(response.getErrors().get(0).getField()).isEqualTo("nickname");
        assertThat(response.getErrors().size()).isEqualTo(1);
    }

    @Test
    @DisplayName("가이드 회원정보 변경 실패 테스트 - 지원하지 않는 형식의 파일 입력")
    void UpdateGuideFailTest3() throws Exception {

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.put("/guide")
                        .header("Authorization", accessToken)
                        .param("nickname", "test121")
                        .param("profileImg", ""))
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        ErrorResponse response = mapper.readValue(content, ErrorResponse.class);

        assertThat(response.getStatus()).isEqualTo("400");
        assertThat(response.getErrors().get(0).getField()).isEqualTo("profileImg");
        assertThat(response.getErrors().size()).isEqualTo(1);
    }

}