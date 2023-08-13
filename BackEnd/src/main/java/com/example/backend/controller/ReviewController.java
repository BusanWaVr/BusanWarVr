package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.review.ReviewDetailDto;
import com.example.backend.dto.review.ReviewRegistDto;
import com.example.backend.dto.review.ReviewUpdateDto;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.review.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/tour/review")
    public Response registReview(@AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody ReviewRegistDto.Request request) throws IllegalAccessException {
        reviewService.tourReviewRegist(request, userDetails.getUser());
        return new Response("200", "성공적으로 후기를 등록했습니다.", null);
    }

    @PutMapping("/tour/review/{reviewId}")
    public Response<ReviewUpdateDto.Request> reviewUpdateApi(
            @RequestBody ReviewUpdateDto.Request request, @PathVariable Long reviewId,
            @AuthenticationPrincipal UserDetailsImpl userDetails)
            throws IllegalAccessException {
        reviewService.reviewUpdate(request, reviewId, userDetails.getUser());
        return new Response("200", "성공적으로 후기를 수정했습니다.", null);
    }

    @GetMapping("/tour/review/{reviewId}")
    public Response<ReviewDetailDto.Response> reviewDetailApi(@PathVariable Long reviewId) {
        ReviewDetailDto.Response response = reviewService.reviewDetail(reviewId);
        return new Response<>("200", "성공적으로 후기 상세 정보를 가져왔습니다.", response);
    }

    @DeleteMapping("/tour/review/{reviewId}")
    public Response reviewDeleteApi(@PathVariable Long reviewId,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        reviewService.reviewDelete(reviewId, userDetails.getUser());
        return new Response<>("200", "성공적으로 후기를 삭제했습니다.", null);
    }
}
