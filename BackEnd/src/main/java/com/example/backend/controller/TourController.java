package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.TourRegistDto;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.TourService;
import java.io.IOException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class TourController {

    private final TourService tourService;

    @PostMapping("/tour")
    public Response<TourRegistDto> tourRegistApi(@RequestBody TourRegistDto.Request request, @AuthenticationPrincipal UserDetailsImpl userDetails)
            throws IOException, IllegalAccessException {
        tourService.tourRegist(request);
        return new Response<>("200", "성공적으로 투어 등록 되었습니다!", null);
    }
}
