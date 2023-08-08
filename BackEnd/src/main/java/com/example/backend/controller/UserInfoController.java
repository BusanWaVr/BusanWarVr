package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.userinfo.TourStartRemindDto;
import com.example.backend.dto.userinfo.UserFollowDto;
import com.example.backend.dto.userinfo.UserInfoDto;
import com.example.backend.dto.userinfo.UserTourDto;
import com.example.backend.dto.userinfo.UserWishDto;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.user.UserInfoGetService;
import com.example.backend.service.user.UserInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserInfoController {

    private final UserInfoService userInfoService;
    private final UserInfoGetService userInfoGetService;

    @GetMapping("/user/wish/{userId}")
    public Response getUserWishList(@PathVariable Long userId,
            @PageableDefault(size = 6) Pageable pageable) {
        UserWishDto.Response response = userInfoGetService.getUserWishList(
                userId, pageable);

        return new Response<>("200", "성공적으로 위시리스트를 가져왔습니다.", response);
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

    @GetMapping("/user/following/{userId}")
    public Response<UserFollowDto.Response> getFollowingGuides(
            @PathVariable Long userId,
            @PageableDefault(size = 6) Pageable pageable) {
        UserFollowDto.Response response = userInfoGetService.getFollowingGuideList(
                userId, pageable);

        return new Response<>("200", "성공적으로 팔로잉하는 가이드의 목록을 가져왔습니다.", response);
    }

    @GetMapping("/user/userInfo/{userId}")
    public Response<UserInfoDto.Response> getUserInfo(@PathVariable Long userId) {
        UserInfoDto.Response response = userInfoGetService.getUserInfo(userId);
        return new Response<>("200", "성공적으로 사용자 정보를 가져왔습니다.", response);
    }

    @GetMapping("/user/tour/{userId}")
    public Response<UserTourDto.Response> getUserTours(@PathVariable Long userId) {
        UserTourDto.Response response = userInfoGetService.getUserTour(userId);
        return new Response<>("200", "성공적으로 유저의 투어 정보를 불러왔습니다", response);
    }

    @GetMapping("/user/{guideId}/follow")
    public Response<Boolean> checkIsFollowed(@AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long guideId) {
        boolean response = userInfoService.checkIsFollowed(userDetails.getUser(), guideId);
        return new Response("200", "성공적으로 해당 가이드 팔로우 여부를 확인했습니다.", response);
    }

    @GetMapping("/user/tourRemind")
    public Response getTourRemind(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        TourStartRemindDto.Response response = userInfoGetService.getTourStartRemind(userDetails.getUser());
        return new Response("200", "성공적으로 시작 임박한 예약된 투어 목록을 가져왔습니다.", response);
    }
}
