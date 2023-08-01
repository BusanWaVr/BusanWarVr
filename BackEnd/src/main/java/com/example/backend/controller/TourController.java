package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.TourDetailDto;
import com.example.backend.dto.TourRegistDto;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.TourService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TourController {

    private final TourService tourService;

    @PostMapping("/tour")
    public Response<TourRegistDto> tourRegistApi(@ModelAttribute TourRegistDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails)
            throws IllegalAccessException, IOException {
        if (request.getCourses().size() > 3) {
            throw new IllegalArgumentException("코스 개수는 4개 미만이여야 합니다.");
        }
        tourService.tourRegist(request, userDetails.getUser());
        return new Response<>("200", "성공적으로 투어 등록 되었습니다!", null);
    }

    @GetMapping("/tour/{tourId}")
    public Response<TourDetailDto.Response> tourDetailApi(@PathVariable Long tourId){
        TourDetailDto.Response response = tourService.tourDetail(tourId);
        return new Response<>("200", "성공적으로 투어 상세 정보를 가져 왔습니다!", response);
    }

    @PostMapping("/tour/reservation/{tourId}")
    public Response tourReservationApi(@PathVariable Long tourId, @AuthenticationPrincipal UserDetailsImpl userDetails){
        tourService.tourReservation(tourId, userDetails.getUser());
        return new Response("200", "성공적으로 투어를 예약 하였습니다!", null);
    }

    @PostMapping("/tour/wish/{tourId}")
    public Response tourWishApi(@PathVariable Long tourId, @AuthenticationPrincipal UserDetailsImpl userDetails){
        tourService.tourWish(tourId, userDetails.getUser());
        return new Response("200", "성공적으로 투어를 찜 하였습니다!", null);
    }

    @DeleteMapping("/tour/reservation/{tourId}")
    public Response tourReservationCancelApi(@PathVariable Long tourId, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        tourService.tourReservationCancel(tourId, userDetails.getUser());
        return new Response("200", "성공적으로 투어 예약을 취소 하였습니다!", null);
    }

    @DeleteMapping("/tour/wish/{tourId}")
    public Response tourCancelApi(@PathVariable Long tourId, @AuthenticationPrincipal UserDetailsImpl userDetails)
            throws IllegalAccessException {
        tourService.tourCancel(tourId, userDetails.getUser());

        return new Response("200", "성공적으로 투어 예약을 취소 하였습니다!", null);
    }

//    @GetMapping("tour")
//    public Response<List<TourListDto.Response>> getALLTourApi(){
//        List<TourListDto.Response> tourList = tourService.getALLTour();
//        return new Response("200", "성공적으로 투어를 취소 하였습니다!", tourList);
//    }
}
