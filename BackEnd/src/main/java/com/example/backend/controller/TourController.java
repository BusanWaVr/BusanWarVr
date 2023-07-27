package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.TourRegistDto;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.TourService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TourController {

    private final TourService tourService;

    // , @AuthenticationPrincipal UserDetailsImpl userDetails
    @PostMapping("/tour")
    public Response<TourRegistDto> tourRegistApi(@RequestPart TourRegistDto.Request request, @AuthenticationPrincipal UserDetailsImpl userDetails)
            throws IOException, IllegalAccessException {
        tourService.tourRegist(request, userDetails.getUser());
        return new Response<>("200", "성공적으로 투어 등록 되었습니다!", null);
    }
}
