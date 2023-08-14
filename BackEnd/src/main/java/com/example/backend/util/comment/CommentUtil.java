package com.example.backend.util.comment;

import com.example.backend.dto.comment.CommentDto;
import com.example.backend.dto.comment.ReCommentDto;
import com.example.backend.model.comment.Comment;
import com.example.backend.model.comment.CommentRepository;
import com.example.backend.model.joiner.Joiner;
import com.example.backend.model.joiner.JoinerRepository;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.tour.TourRepository;
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
    private final TourRepository tourRepository;
    private final JoinerRepository joinerRepository;

    public void commentDtoList(Long tourId, List<CommentDto> commentDtos) {
        Tour tour = tourRepository.findById(tourId).get();
        List<Comment> commentList = commentRepository.findAllByTourId(tourId);
        for (Comment comment : commentList) {
            User user = userRepository.findById(comment.getUserId()).get();
            List<Joiner> joinerList = joinerRepository.findAllByTourId(tourId);
            if (comment.getParentId() == null && joinerList.contains(user)) {
                List<ReCommentDto> reCommentList = new ArrayList<>();
                reCommentDtoList(comment, reCommentList);
                CommentDto rootComment = new CommentDto(user, comment, true, reCommentList);
                commentDtos.add(rootComment);
                continue;
            }
            List<ReCommentDto> reCommentList = new ArrayList<>();
            reCommentDtoList(comment, reCommentList);
            CommentDto rootComment = new CommentDto(user, comment, false, reCommentList);
            commentDtos.add(rootComment);
        }
    }

    public void reCommentDtoList(Comment comment, List<ReCommentDto> reCommentList){
        List<Comment> reComments = commentRepository.findAllByParentId(comment.getId());
        for (Comment reComment : reComments){
            List<Joiner> joinerList = joinerRepository.findAllByTourId(reComment.getTourId());
            User user = userRepository.findById(reComment.getUserId()).get();
            if(joinerList.contains(user)){
                ReCommentDto reCommentDto = new ReCommentDto(user, true, reComment);
                reCommentList.add(reCommentDto);
                continue;
            }
            ReCommentDto reCommentDto = new ReCommentDto(user, false, reComment);
            reCommentList.add(reCommentDto);
        }
    }
}
