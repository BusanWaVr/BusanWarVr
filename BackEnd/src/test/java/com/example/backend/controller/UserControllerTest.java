package com.example.backend.controller;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.example.backend.exception.ErrorResponse;
import com.example.backend.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.Map;
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

//    @Autowired
//    private ObjectMapper objectMapper;

//    @Test
//    @DisplayName("사용자 회원가입 성공 테스트")
//    void signUpSuccessTest() throws Exception {
////        Map<String, String> request = new HashMap<>();
////        request.put("email", "test1@naver.com");
////        request.put("password", "test12345@!");
////        request.put("nickname", "jae");
////
////        String content = objectMapper.writeValueAsString(request);
//        mockMvc.perform(MockMvcRequestBuilders.post("/user")
//                        .param("email", "test1@naver.com")
//                        .param("password", "test12345@!")
//                        .param("nickname", "jae")
//                        .param("category", "힐링, 액티비티, 체험"))
//                .andExpect(status().isOk())
//                .andDo(print());
//    }

//    @Test
//    @DisplayName("사용자 회원가입 비밀번호 조건 테스트")
//    void signUpPasswordConditionTest() throws Exception {
//        mockMvc.perform(MockMvcRequestBuilders.post("/user")
//                        .param("email", "test1@naver.com")
//                        .param("password", "test1234")
//                        .param("nickname", "jae")
//                        .param("category", "힐링, 액티비티, 체험"))
//                .andExpect(status().is(400))
//                .andDo(print());
//    }

    @Test
    @DisplayName("사용자 회원가입 실패 테스트 - 비밀번호 ")
    void signUpFailTest1() throws Exception {

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/user")
                        .param("email", "test1@naver.com")
                        .param("password", "test12345")
                        .param("nickname", "jae"))
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        ErrorResponse response = mapper.readValue(content, ErrorResponse.class);
        //1. status 200
        assertThat(response.getStatus()).isEqualTo("400");
//        //2. FieldError 안의 field가 email이 존재하는지
        assertThat(response.getErrors().get(0).getField()).isEqualTo("password");
        //3. 이메일 유효성 검사만 걸렸기때문에 errors의 길이가 0인지.
        assertThat(response.getErrors().size()).isEqualTo(2);
    }
}