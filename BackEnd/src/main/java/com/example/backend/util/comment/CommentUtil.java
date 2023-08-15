package com.example.backend.util.comment;

import com.example.backend.dto.comment.CommentDto;
import com.example.backend.dto.comment.ReCommentDto;
import com.example.backend.model.comment.Comment;
import com.example.backend.model.comment.CommentRepository;
import com.example.backend.model.joiner.Joiner;
import com.example.backend.model.joiner.JoinerRepository;
import com.example.backend.model.user.User;
import com.example.backend.model.user.UserRepository;
import com.example.backend.util.joiner.JoinerUtil;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CommentUtil {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final JoinerRepository joinerRepository;
    private final JoinerUtil joinerUtil;

    public void commentDtoList(Long tourId, List<CommentDto> commentDtos) {
        // tour 라인 삭제
        List<Comment> commentList = commentRepository.findAllByTourId(tourId);

        for (Comment comment : commentList) {
            User user = userRepository.findById(comment.getUserId()).get();
            List<Joiner> joinerList = joinerRepository.findAllByTourId(tourId);
            boolean isExist = joinerUtil.isExistJoinerList(user, joinerList);
            if (comment.getParentId() == null) {
                List<ReCommentDto> reCommentList = new ArrayList<>();
                reCommentDtoList(comment, reCommentList);
                CommentDto rootComment = new CommentDto(user, comment, isExist, reCommentList);
                commentDtos.add(rootComment);
                continue;
            }
            List<ReCommentDto> reCommentList = new ArrayList<>();
            reCommentDtoList(comment, reCommentList);
            CommentDto rootComment = new CommentDto(user, comment, isExist, reCommentList);
            commentDtos.add(rootComment);
        }
    }

    public void reCommentDtoList(Comment comment, List<ReCommentDto> reCommentList) {
        List<Comment> reComments = commentRepository.findAllByParentId(comment.getId());
        for (Comment reComment : reComments) {
            List<Joiner> joinerList = joinerRepository.findAllByTourId(reComment.getTourId());
            User user = userRepository.findById(reComment.getUserId()).get();
            boolean isExist = joinerUtil.isExistJoinerList(user, joinerList);
            ReCommentDto reCommentDto = new ReCommentDto(user, isExist, reComment);
            reCommentList.add(reCommentDto);
        }
    }
}
