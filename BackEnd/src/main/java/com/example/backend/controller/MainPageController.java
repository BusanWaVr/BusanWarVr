package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.mainPage.NearDeadlineTourDto;
import com.example.backend.service.mainPage.MainPageService;
import com.example.backend.service.mate.MateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MainPageController {

    private final MainPageService mainPageService;

    @GetMapping("/main/deadline")
    public Response getDeadlineTour() {
        NearDeadlineTourDto.Response response = mainPageService.getNearDeadlineTourList();
        return new Response<>("200", "성공적으로 마감 임박 투어 정보를 가져왔습니다.", response);
    }
}
