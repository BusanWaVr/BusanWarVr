package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.mainPage.TourRecommendDto;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.mainPage.MainPageService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MainPageController {

    private final MainPageService mainPageService;

    @GetMapping("/main/recommend")
    public Response<List<TourRecommendDto>> tourRecommendApi(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PageableDefault(size = 4) Pageable pageable) {
        Page<TourRecommendDto> responsePage = mainPageService.tourRecommend(userDetails.getUser(),
                pageable);

        List<TourRecommendDto> response = responsePage.getContent();
        return new Response<>("200", "성공적으로 추천 투어 목록을 불러왔습니다.", response);
    }

}
