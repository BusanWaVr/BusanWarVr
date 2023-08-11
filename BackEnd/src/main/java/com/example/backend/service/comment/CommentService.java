package com.example.backend.service.comment;

import com.example.backend.dto.comment.CommentCreateDto.Request;
import com.example.backend.model.comment.Comment;
import com.example.backend.model.comment.CommentRepository;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.tour.TourRepository;
import com.example.backend.model.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final TourRepository tourRepository;

    public void commentCreate(User user, Request request, Long tourId) {
        Tour tour = tourRepository.findById(tourId).get();
        Comment comment = request.toComment(user, tour);
        commentRepository.save(comment);
    }
}
