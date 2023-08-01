package com.example.backend.controller;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;

import com.example.backend.dto.user.LoginRequestDto;
import com.example.backend.dto.Response;
import com.example.backend.service.TourService;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.io.InputStream;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@DisplayName("투어 등록 Api 테스트")
@SpringBootTest
@AutoConfigureMockMvc
class TourRegistApiTest {

    @MockBean
    TourService tourService;

    @Autowired
    MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

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
    @DisplayName("투어 등록 성공 테스트")
    public void tourRegistSuccessTest() throws Exception {

        // 테스트용 이미지 파일 생성
        MockMultipartFile tourImg1 = createMockMultipartFile("test-image1.jpg");
        MockMultipartFile tourImg2 = createMockMultipartFile("test-image2.jpg");
        MockMultipartFile courseImg1 = createMockMultipartFile("test-image3.jpg");
        MockMultipartFile courseImg2 = createMockMultipartFile("test-image4.jpg");
        MockMultipartFile courseImg3 = createMockMultipartFile("test-image5.jpg");

        MvcResult mvcResult = mockMvc.perform(multipart("/tour")
                        .file("tourImgs[0]", tourImg1.getBytes())
                        .file("tourImgs[1]", tourImg2.getBytes())
                        .file("courses[0].image", courseImg1.getBytes())
                        .file("courses[1].image", courseImg2.getBytes())
                        .file("courses[2].image", courseImg3.getBytes())
                        .param("region", "부산")
                        .param("category", "힐링, 여행, 체험")
                        .param("title", "부산 가쟈")
                        .param("subTitle", "나이트런?")
                        .param("startDate", "2023-07-25 11:25:50")
                        .param("endDate", "2023-07-25 11:25:50")
                        .param("minMember", "2")
                        .param("maxMember", "6")
                        .param("courses[0].lon", "1")
                        .param("courses[0].lat", "1")
                        .param("courses[0].title", "test1")
                        .param("courses[0].content", "test1")
                        .param("courses[1].lon", "2")
                        .param("courses[1].lat", "2")
                        .param("courses[1].title", "test2")
                        .param("courses[1].content", "test2")
                        .param("courses[2].lon", "3")
                        .param("courses[2].lat", "3")
                        .param("courses[2].title", "test3")
                        .param("courses[2].content", "test3")
                        .header("Authorization", accessToken))
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();
        objectMapper = new ObjectMapper();
        Response response = objectMapper.readValue(content, Response.class);

        assertThat(response.getCode()).isEqualTo("200");

    }

    // 테스트용 MockMultipartFile 객체 생성
    private MockMultipartFile createMockMultipartFile(String fileName)
            throws IOException {
        String contentType = "image/jpeg"; // 이미지 파일의 Content-Type에 맞게 변경
        InputStream resourceStream = getClass().getResourceAsStream("/" + fileName);
        return new MockMultipartFile("tourImgs", fileName, contentType, resourceStream);
    }
}