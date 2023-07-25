package com.example.backend.controller;

import com.example.backend.dto.AuthCodeDto;
import com.example.backend.dto.AuthEmailDto;
import com.example.backend.dto.AuthNicknameDto;
import com.example.backend.dto.GuideSignUpDto;
import com.example.backend.dto.Response;
import com.example.backend.dto.SignUpDto;
import com.example.backend.dto.TestDto;
import com.example.backend.model.user.User;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.RefreshTokenService;
import com.example.backend.service.UserService;
import com.example.backend.util.emailsender.EmailSender;
import java.io.IOException;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
    public Response<SignUpDto> userSignupApi(@ModelAttribute @Valid SignUpDto.Reqeust reqeust,
            BindingResult bindingResult) throws BindException, IOException, IllegalAccessException {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }

        String encodedPassword = passwordEncoder.encode(reqeust.getPassword());
        System.out.println(reqeust);

        //TODO : validation 적용

        // TODO : 사용자 저장
        userService.signup(reqeust, encodedPassword);
        return new Response<>("200", "성공적으로 회원가입 되었습니다!", null);
    }

    @PostMapping("/auth/nickname")
    public Response<AuthNicknameDto> userAuthNicknameApi(
            @RequestBody AuthNicknameDto.Request request) throws IllegalAccessException {
        if (userService.checkNicknameDuplicate(request.getNickname())) {
            throw new IllegalAccessException("중복된 닉네임 입니다.");
        } else {
            return new Response<>("200", "사용 가능한 닉네임 입니다.", null);
        }
    }

    //TODO : 가이드 회원가입 만들기
    @PostMapping("/guide")
    public Response<GuideSignUpDto> guideSignUpApi(
            @ModelAttribute @Valid GuideSignUpDto.Request request,
            BindingResult bindingResult) throws BindException, IOException, IllegalAccessException {

        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        userService.guideSignUp(request, encodedPassword);

        return new Response<>("200", "성공적으로 회원가입 되었습니다.", null);

    }

    @GetMapping("/refresh")
    public Response refresh(HttpServletRequest request, HttpServletResponse response) {
        String tokenPayLoad = request.getHeader("Authorization");
        Map<String, String> accessTokenResponseMap = refreshTokenService.refresh(tokenPayLoad,
                request);

        if (accessTokenResponseMap.containsKey(REFRESH_TOKEN_HEADER)) {
            String refreshToken = accessTokenResponseMap.get(REFRESH_TOKEN_HEADER);
            response.addHeader(REFRESH_TOKEN_HEADER, TOKEN_TYPE + " " + refreshToken);
        }

        String accessToken = accessTokenResponseMap.get(ACCESS_TOKEN_HEADER);
        response.addHeader(ACCESS_TOKEN_HEADER, TOKEN_TYPE + " " + accessToken);

        if (accessTokenResponseMap.size() == 2) {
            return new Response("200", "성공적으로 Access-Token과 만료될 예정인 Refresh-Token을 재발급 하였습니다.",
                    null);
        } else {
            return new Response("200", "성공적으로 Access-Token을 재발급 하였습니다.", null);
        }
    }

    @PostMapping("/test")
    public Response<TestDto.Response> test(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userDetails.getUser();
        return new Response<>("200", "CICD 테스트가 정상적으로 이루어졌습니다.", new TestDto.Response(user));
    }

    @PostMapping("/auth/email")
    public Response emailAuth(@RequestBody AuthEmailDto.Request request) throws Exception {
        String email = request.getEmail();
        userService.emailExistValidCheck(email);
        String confirm = emailSender.sendSimpleMessage(email);
        userService.saveEmailAuth(email, confirm);
        return new Response<>("200", "정상적으로 처리되었습니다.", null);
    }

    @PostMapping("/auth/code")
    public Response codeAuth(@RequestBody AuthCodeDto.Request request)
            throws IllegalAccessException {
        boolean isAuth = userService.isCodeAuth(request);

        if (!isAuth) {
            throw new IllegalAccessException("이메일 인증에 실패했습니다.");
        }
        return new Response<>("200", "정상적으로 처리되었습니다.", null);
    }
}
