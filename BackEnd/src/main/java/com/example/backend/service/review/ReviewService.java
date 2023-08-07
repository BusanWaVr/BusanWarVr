package com.example.backend.service.review;

import com.example.backend.dto.tour.ReviewDetailDto;
import com.example.backend.dto.tour.ReviewRegistDto;
import com.example.backend.dto.tour.ReviewUpdateDto;
import com.example.backend.model.enums.AuthType;
import com.example.backend.model.joiner.JoinerRepository;
import com.example.backend.model.review.Review;
import com.example.backend.model.review.ReviewRepository;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.tour.TourRepository;
import com.example.backend.model.user.User;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final TourRepository tourRepository;
    private final JoinerRepository joinerRepository;

    public ReviewDetailDto.Response reviewDetail(Long reviewId) {
        Review review = reviewRepository.findById(reviewId).get();
        ReviewDetailDto.Response response = new ReviewDetailDto.Response(review);
        return response;
    }

    public void reviewDelete(Long reviewId, User user) {
        Review review = reviewRepository.findById(reviewId).get();
        if (review.getUserId() != user.getId()) {
            throw new IllegalArgumentException("해당 리뷰의 작성자만 삭제 가능합니다");
        }
        reviewRepository.deleteById(reviewId);
    }

    public void reviewUpdate(ReviewUpdateDto.Request request, Long reviewId, User user)
            throws IllegalAccessException {
        Review review = reviewRepository.findById(reviewId).get();

        Date now = new Date();

        if (user.getType() != AuthType.USER) {
            throw new IllegalAccessException("가이드는 리뷰를 등록할 수 없습니다.");
        }

        if (review.getUserId() != user.getId()) {
            throw new IllegalAccessException("해당 리뷰의 작성자만 수정 가능합니다");
        }

        review = request.toUpdate(review, now);
        reviewRepository.save(review);
    }

    public void tourReviewRegist(ReviewRegistDto.Request request, User user)
            throws IllegalAccessException {
        Tour tour = tourRepository.findById(request.getTourId()).get();

        Date now = new Date();

        if (user.getType() != AuthType.USER) {
            throw new IllegalAccessException("가이드는 리뷰를 등록할 수 없습니다.");
        }

        if (tour.getEndDate().after(now)) {
            throw new IllegalAccessException("아직 끝나지 않은 투어에 리뷰를 등록할 수 없습니다.");
        }

        if (!hasUserJoinedTour(user.getId(), request.getTourId())) {
            throw new IllegalAccessException("참가하지 않은 투어에 리뷰를 등록할 수 없습니다.");
        }

        if (isRegistedReview(request.getTourId(), user.getId())) {
            throw new IllegalAccessException("이미 리뷰를 작성한 투어입니다.");
        }

        Review review = request.toReview(now, user.getId());

        reviewRepository.save(review);
    }

    public boolean hasUserJoinedTour(Long userId, Long tourId) {
        return joinerRepository.existsByTourIdAndUserId(tourId, userId);
    }

    public boolean isRegistedReview(Long tourId, Long userId) {
        return reviewRepository.existsByTourIdAndUserId(tourId, userId);
    }
}
