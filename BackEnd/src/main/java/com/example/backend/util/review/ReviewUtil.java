package com.example.backend.util.review;

import com.example.backend.dto.review.ReviewDto;
import com.example.backend.model.review.Review;
import com.example.backend.model.review.ReviewRepository;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.tour.TourRepository;
import com.example.backend.model.user.User;
import com.example.backend.model.user.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ReviewUtil {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final TourRepository tourRepository;

    public void reviewDtoList(Long tourId, List<ReviewDto> ReviewDtos) {
        Tour tour = tourRepository.findById(tourId).get();
        User user = userRepository.findById(tour.getUserId()).get();
        List<Tour> tourList = tourRepository.findAllByUserId(user.getId());
        for (Tour tours : tourList) {
            List<Review> ReviewList = reviewRepository.findAllByTourId(tours.getId());
            for (Review review : ReviewList) {
                User reviewer = userRepository.findById(review.getUserId()).get();
                ReviewDto reviewDto = new ReviewDto(reviewer, review);
                ReviewDtos.add(reviewDto);
            }
        }
    }
}
