package com.example.backend.controller;

import com.example.backend.dto.MateRegistDto;
import com.example.backend.dto.Response;
import com.example.backend.model.user.User;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.MateService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MateController {

    private final MateService mateService;

    @PostMapping("/mate")
    public Response registMate(@AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody MateRegistDto.Request request) {
        User user = userDetails.getUser();

        if(user.getType().toString() == "GUIDE"){
            throw new IllegalArgumentException("가이드는 mate 등록을 할 수 없습니다.");
        }

        mateService.registMateService(request, userDetails.getUser());
        return new Response<>("200", "성공적으로 메이트 등록 되었습니다!", null);
    }
}
