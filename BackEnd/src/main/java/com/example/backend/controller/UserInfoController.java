package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.UserWishDto;
import com.example.backend.model.user.User;
import com.example.backend.model.user.UserRepository;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.UserInfoService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserInfoController {

    private final UserInfoService userInfoService;

    @GetMapping("/user/wish")
    public Response getUserWishList(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        List<UserWishDto.Response> responseList = userInfoService.getUserWishList(
                userDetails.getUser().getId());
        return new Response<>("200", "성공적으로 위시리스트를 가져왔습니다.", responseList);
    }

    @PostMapping("/user/{guideId}")
    public Response followGuide(@AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long guideId) {

        boolean isFollowed = userInfoService.userFollow(userDetails.getUser().getId(), guideId);

        if (isFollowed) {
            return new Response<>("200", "성공적으로 가이드를 팔로우했습니다.", null);
        } else {
            return new Response<>("200", "성공적으로 가이드를 언팔로우했습니다.", null);
        }
    }

}
