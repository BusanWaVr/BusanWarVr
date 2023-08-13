package com.example.backend.service.comment;

import com.example.backend.dto.comment.CommentCreateDto;
import com.example.backend.dto.comment.CommentDetailDto;
import com.example.backend.dto.comment.CommentUpdateDto;
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

    public CommentCreateDto.Response commentCreate(User user, CommentCreateDto.Request request,
            Long tourId) {

        Tour tour = tourRepository.findById(tourId).get();
        // 부모 댓글 x, 본인이 루트 댓글
        if (request.getParentId() == null) {
            Comment comment = request.toComment(user, tour);
            commentRepository.save(comment);
            CommentCreateDto.Response response = new CommentCreateDto.Response(comment.getId());

            return response;
        }
        // 부모 댓글 o : 대댓글이란 의미
        Comment parent = commentRepository.findById(request.getParentId()).get();
        // 부모가 대댓글 : 루트 댓글의 번호 저장
        if (parent.getParentId() != null) {
            Comment comment = request.toCommentAboutRoot(user, tour, parent.getParentId());
            commentRepository.save(comment);
            CommentCreateDto.Response response = new CommentCreateDto.Response(comment.getId());

            return response;
        }
        // 부모가 루트 댓글 : 부모의 번호 저장
        Comment comment = request.toReComment(user, tour, parent.getId());
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

    public CommentUpdateDto.Response commentUpdate(CommentUpdateDto.Request request, Long commentId,
            User user) {

        Comment comment = commentRepository.findById(commentId).get();
        if (comment.getUserId() != user.getId()) {
            throw new IllegalArgumentException("댓글 작성자만 수정 가능합니다");
        }
        comment = request.toUpdate(comment);
        commentRepository.save(comment);
        CommentUpdateDto.Response response = new CommentUpdateDto.Response(user, comment);

        return response;
    }

    public void commentDelete(Long commentId, User user) {

        Comment comment = commentRepository.findById(commentId).get();
        if (comment.getUserId() != user.getId()) {
            throw new IllegalArgumentException("댓글 작성자만 삭제 가능합니다");
        }
        commentRepository.deleteById(commentId);
    }

}
