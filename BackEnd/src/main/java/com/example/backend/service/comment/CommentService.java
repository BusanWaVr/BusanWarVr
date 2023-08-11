package com.example.backend.service.comment;

import com.example.backend.dto.comment.CommentCreateDto;
import com.example.backend.dto.comment.CommentCreateDto.Request;
import com.example.backend.dto.comment.CommentDetailDto;
import com.example.backend.model.comment.Comment;
import com.example.backend.model.comment.CommentRepository;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.tour.TourRepository;
import com.example.backend.model.user.User;
import com.example.backend.model.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final TourRepository tourRepository;
    private final UserRepository userRepository;

    public CommentCreateDto.Response commentCreate(User user, Request request, Long tourId) {

        Tour tour = tourRepository.findById(tourId).get();
        Comment comment = request.toComment(user, tour);
        commentRepository.save(comment);
        CommentCreateDto.Response response = new CommentCreateDto.Response(comment.getId());

        return response;
    }

    public CommentDetailDto.Response commentDetail(Long commentId) {

        Comment comment = commentRepository.findById(commentId).get();
        User user = userRepository.findById(comment.getUserId()).get();

        CommentDetailDto.Response response = new CommentDetailDto.Response(user, comment);

        return response;
    }
}
