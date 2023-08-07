package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.TestDto;
import com.example.backend.dto.user.AuthCodeDto;
import com.example.backend.dto.user.AuthEmailDto;
import com.example.backend.dto.user.AuthNicknameDto;
import com.example.backend.dto.user.AuthPasswordDto;
import com.example.backend.dto.user.GuideSignUpDto;
import com.example.backend.dto.user.GuideUpdateDto;
import com.example.backend.dto.user.UserSignUpDto;
import com.example.backend.dto.user.UserUpdateDto;
import com.example.backend.exception.type.DuplicatedValueException;
import com.example.backend.exception.type.NotSameDataValueException;
import com.example.backend.model.user.User;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.user.RefreshTokenService;
import com.example.backend.service.user.UserService;
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
import org.springframework.web.bind.annotation.PutMapping;
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
    public Response<UserSignUpDto> userSignupApi(
            @ModelAttribute @Valid UserSignUpDto.Request request,
            BindingResult bindingResult)
            throws BindException, DuplicatedValueException, IllegalArgumentException, IllegalAccessException {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        if (!(request.getCategory().size() >= 3 && request.getCategory().size() <= 5)) {
            throw new IllegalArgumentException("카테고리 개수는 3개에서 5개 사이여야 합니다.");
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());
        userService.signup(request, encodedPassword);

        return new Response<>("200", "성공적으로 회원가입 되었습니다!", null);
    }

    @PostMapping("/auth/nickname")
    public Response<AuthNicknameDto> userAuthNicknameApi(
            @RequestBody AuthNicknameDto.Request request) throws DuplicatedValueException {
        userService.nicknameExistValidCheck(request.getNickname());
        return new Response<>("200", "사용 가능한 닉네임 입니다.", null);
    }

    @PostMapping("/guide")
    public Response<GuideSignUpDto> guideSignUpApi(
            @ModelAttribute @Valid GuideSignUpDto.Request request,
            BindingResult bindingResult) throws BindException {
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
        return new Response<>("200", "CICD 테스트6가 정상적으로 이루어졌습니다.", new TestDto.Response(user));
    }

    @PostMapping("/auth/password")
    public Response authPassword(@AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody @Valid AuthPasswordDto.Request request) throws NotSameDataValueException {
        String password = userDetails.getPassword();
        boolean checkPassword = passwordEncoder.matches(request.getPassword(), password);

        if (!checkPassword) {
            throw new NotSameDataValueException("비밀번호가 일치하지 않습니다.");
        }

        return new Response<>("200", "비밀번호가 일치합니다.", null);
    }

    @PutMapping("/user/password")
    public Response updatePassword(@AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody @Valid AuthPasswordDto.Request request,
            BindingResult bindingResult) throws BindException {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }

        userService.updatePassword(userDetails.getUser(), request);

        return new Response<>("200", "비밀번호를 변경했습니다.", null);
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

    @PutMapping("/guide")
    public Response updateGuide(@AuthenticationPrincipal UserDetailsImpl userDetails,
            @ModelAttribute @Valid GuideUpdateDto.Request request,
            BindingResult bindingResult) throws BindException, IOException, IllegalAccessException {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }

        if (userDetails.getUser().getType().toString() == "USER") {
            throw new IllegalArgumentException("권한이 없는 사용자의 접근입니다.");
        }

        userService.guideUpdate(userDetails.getUser(), request);

        return new Response<>("200", "성공적으로 회원정보를 변경했습니다.", null);
    }

    @PutMapping("/user")
    public Response updateGuide(@AuthenticationPrincipal UserDetailsImpl userDetails,
            @ModelAttribute @Valid UserUpdateDto.Request request,
            BindingResult bindingResult) throws BindException, IOException, IllegalAccessException {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }

        if (!(request.getCategory().size() >= 3 && request.getCategory().size() <= 5)) {
            throw new IllegalArgumentException("카테고리 개수는 3개에서 5개 사이여야 합니다.");
        }

        if (userDetails.getUser().getType().toString() == "GUIDE") {
            throw new IllegalArgumentException("권한이 없는 사용자의 접근입니다.");
        }

        userService.userUpdate(userDetails.getUser(), request);

        return new Response<>("200", "성공적으로 회원정보를 변경했습니다.", null);
    }
}