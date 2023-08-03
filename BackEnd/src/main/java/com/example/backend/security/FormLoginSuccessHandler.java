package com.example.backend.security;

import com.example.backend.dto.Response;
import com.example.backend.dto.user.GuideLoginDto;
import com.example.backend.dto.user.UserLoginDto;
import com.example.backend.model.user.User;
import com.example.backend.model.user.UserCustomRepository;
import com.example.backend.security.jwt.JwtTokenUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

public class FormLoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    private final JwtTokenUtils jwtTokenUtils;
    private final UserCustomRepository userCustomRepository;

    String ACCESS_TOKEN_HEADER = "Access_Token";
    String REFRESH_TOKEN_HEADER = "Refresh_Token";
    String TOKEN_TYPE = "BEARER";
    ObjectMapper objectMapper = new ObjectMapper();

    public FormLoginSuccessHandler(JwtTokenUtils jwtTokenUtils, UserCustomRepository userCustomRepository) {
        this.jwtTokenUtils = jwtTokenUtils;
        this.userCustomRepository = userCustomRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws ServletException, IOException {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Map<String, String> tokens = jwtTokenUtils.generateJwtToken(userDetails);
        String access = TOKEN_TYPE + " " + tokens.get("ACCESS_TOKEN");
        String refresh = TOKEN_TYPE + " " + tokens.get("REFRESH_TOKEN");

        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");

        User user = userDetails.getUser();
        Response responseDto = null;

        if(user.getType().toString().equals("GUIDE")){
            responseDto = new Response<>("200", "success", new GuideLoginDto(userDetails.getUser(), access, refresh));
        }
        else {
            List<String> categorys = userCustomRepository.getUserCategory(userDetails.getUser().getId());
            responseDto = new Response<>("200", "success", new UserLoginDto(userDetails.getUser(), access, refresh, categorys));
        }

        response.getWriter().write(objectMapper.writeValueAsString(responseDto));
    }
}
