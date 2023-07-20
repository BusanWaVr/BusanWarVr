package com.example.backend.controller;

import com.example.backend.dto.AuthEmailDto;
import com.example.backend.dto.Response;
import com.example.backend.dto.SignUpDto;
import com.example.backend.dto.TestDto;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.security.jwt.HeaderTokenExtractor;
import com.example.backend.security.jwt.JwtDecoder;
import com.example.backend.security.jwt.JwtTokenUtils;
import com.example.backend.service.UserService;
import com.example.backend.service.RefreshTokenService;
import com.example.backend.util.emailsender.EmailSender;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final RefreshTokenService refreshTokenService;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private final UserService userService;
    private final EmailSender emailSender;

    String ACCESS_TOKEN_HEADER = "Access_Token";
    String REFRESH_TOKEN_HEADER = "Refresh_Token";
    String TOKEN_TYPE = "BEARER";


    @PostMapping("/user")
    public Response<SignUpDto> userSignupApi(@ModelAttribute SignUpDto.Reqeust reqeust) throws IOException, IllegalAccessException {
        String encodedPassword = passwordEncoder.encode(reqeust.getPassword());
//        System.out.println(reqeust);


        userService.signup(reqeust, encodedPassword);
        //TODO : 이미지 저장 부분 잘보기
//        System.out.println(reqeust.getProfileImg());
        //TODO : validation 적용

        // TODO : 사용자 저장
        return new Response<>("200", "성공적으로 회원가입 되었습니다!", null);
    }

    //TODO : 가이드 회원가입 만들기

    @GetMapping("/refresh")
    public Response refresh(HttpServletRequest request, HttpServletResponse response){
        String tokenPayLoad = request.getHeader("Authorization");
        Map<String, String> accessTokenResponseMap = refreshTokenService.refresh(tokenPayLoad, request);

        if (accessTokenResponseMap.containsKey(REFRESH_TOKEN_HEADER)) {
            String refreshToken = accessTokenResponseMap.get(REFRESH_TOKEN_HEADER);
            response.addHeader(REFRESH_TOKEN_HEADER, TOKEN_TYPE + " " + refreshToken);
        }

        String accessToken = accessTokenResponseMap.get(ACCESS_TOKEN_HEADER);
        response.addHeader(ACCESS_TOKEN_HEADER,  TOKEN_TYPE + " " + accessToken);

        if(accessTokenResponseMap.size() == 2){
            return new Response("200", "성공적으로 Access-Token과 만료될 예정인 Refresh-Token을 재발급 하였습니다.", null);
        }
        else{
            return new Response("200", "성공적으로 Access-Token을 재발급 하였습니다.", null);
        }
    }

    @PostMapping("/test")
    public Response<TestDto.Response> test(@AuthenticationPrincipal UserDetailsImpl userDetails){
        User user = userDetails.getUser();
        return new Response<>("200", "정상적으로 처리되었습니다.", new TestDto.Response(user));
    }

    @PostMapping("/email")
    public String emailAuth(@RequestBody AuthEmailDto.Request request) throws Exception {
        String confirm = emailSender.sendSimpleMessage(request.getEmail());

        return confirm;
    }
}
