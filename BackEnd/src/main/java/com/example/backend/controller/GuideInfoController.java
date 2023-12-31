package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.userinfo.GuideCanceledToursDto;
import com.example.backend.dto.userinfo.GuideEndedToursDto;
import com.example.backend.dto.userinfo.GuideFollowerDto;
import com.example.backend.dto.userinfo.GuideHomeDto;
import com.example.backend.dto.userinfo.GuideInfoDto;
import com.example.backend.dto.userinfo.GuideReviewsDto;
import com.example.backend.dto.userinfo.GuideScheduledToursDto;
import com.example.backend.service.user.GuideInfoGetService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class GuideInfoController {

    private final GuideInfoGetService guideInfoGetService;

    @GetMapping("/guide/{guideId}/tour/schedule")
    public Response<GuideScheduledToursDto.Response> getGuidesScheduledTours(
            @PathVariable Long guideId) throws IllegalAccessException {
        GuideScheduledToursDto.Response response = guideInfoGetService.guideScheduledToursService(
                guideId);
        return new Response<>("200", "성공적으로 가이드의 예정된 투어 목록을 가져왔습니다.", response);
    }

    @GetMapping("/guide/{guideId}/tour/end")
    public Response<GuideEndedToursDto.Response> getGuidesEndedTours(@PathVariable Long guideId)
            throws IllegalAccessException {
        GuideEndedToursDto.Response response = guideInfoGetService.guideEndedToursService(guideId);
        return new Response<>("200", "성공적으로 가이드의 종료된 투어 목록을 가져왔습니다.", response);
    }

    @GetMapping("/guide/guideInfo/{guideId}")
    public Response<GuideInfoDto.Response> getGuideInfo(@PathVariable Long guideId)
            throws IllegalAccessException {
        GuideInfoDto.Response response = guideInfoGetService.getGuideInfo(guideId);
        return new Response<>("200", "성공적으로 가이드 정보를 가져왔습니다.", response);
    }

    @GetMapping("/guide/{guideId}/tour/review")
    public Response<GuideReviewsDto.Response> getGuidesReviews(@PathVariable Long guideId)
            throws IllegalAccessException {
        GuideReviewsDto.Response response = guideInfoGetService.guideReviewsService(guideId);
        return new Response<>("200", "성공적으로 가이드의 리뷰 목록을 가져왔습니다.", response);
    }

    @GetMapping("/guide/{guideId}/home")
    public Response<GuideHomeDto.Response> getGuideHome(@PathVariable Long guideId)
            throws IllegalAccessException {
        GuideHomeDto.Response response = guideInfoGetService.guideHome(guideId);
        return new Response<>("200", "성공적으로 가이드 홈 정보를 불러왔습니다", response);
    }

    @GetMapping("/guide/follower/{guideId}")
    public Response<List<GuideFollowerDto>> getGuideFollower(@PathVariable Long guideId) {
        List<GuideFollowerDto> response = guideInfoGetService.getGuideFollowerList(guideId);
        return new Response<>("200", "성공적으로 가이드의 팔로워 정보를 불러왔습니다", response);
    }

    @GetMapping("/guide/{guideId}/tour/canceled")
    public Response<GuideCanceledToursDto.Response> getGuideCanceledTours(
            @PathVariable Long guideId) {
        GuideCanceledToursDto.Response response = guideInfoGetService.getGuideCanceledTourList(
                guideId);
        return new Response<>("200", "성공적으로 가이드의 취소된 투어 목록을 가져왔습니다.", response);
    }

}
