package com.example.backend.util.comment;

import com.example.backend.dto.comment.CommentDto;
import com.example.backend.dto.comment.ReCommentDto;
import com.example.backend.model.comment.Comment;
import com.example.backend.model.comment.CommentRepository;
import com.example.backend.model.user.User;
import com.example.backend.model.user.UserRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CommentUtil {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    public void commentDtoList(Long tourId, List<CommentDto> commentDtos) {
        List<Comment> commentList = commentRepository.findAllByTourId(tourId);
        for (Comment comment : commentList) {
            if (comment.getParentId() == null) {
                User user = userRepository.findById(comment.getUserId()).get();

                List<ReCommentDto> reCommentList = new ArrayList<>();
                reCommentDtoList(comment, reCommentList);
                CommentDto rootComment = new CommentDto(user, comment, reCommentList);
                commentDtos.add(rootComment);
            }
        }
    }

    public void reCommentDtoList(Comment comment, List<ReCommentDto> reCommentList){
        List<Comment> reComments = commentRepository.findAllByParentId(comment.getId());
        for (Comment reComment : reComments){
            User user = userRepository.findById(reComment.getUserId()).get();
            ReCommentDto reCommentDto = new ReCommentDto(user, reComment);
            reCommentList.add(reCommentDto);
        }
    }
}
