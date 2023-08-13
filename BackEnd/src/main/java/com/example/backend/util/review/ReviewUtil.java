package com.example.backend.util.review;

import com.example.backend.dto.joiner.JoinerDto;
import com.example.backend.dto.review.ReviewDto;
import com.example.backend.model.joiner.Joiner;
import com.example.backend.model.review.Review;
import com.example.backend.model.review.ReviewRepository;
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

    public void reviewDtoList(Long tourId, List<ReviewDto> ReviewDtos) {
        List<Review> ReviewList = reviewRepository.findAllByTourId(tourId);
        for (Review review : ReviewList) {
            User user = userRepository.findById(review.getUserId()).get();
            ReviewDto reviewDto = new ReviewDto(user, review);
            ReviewDtos.add(reviewDto);
        }
    }
}
