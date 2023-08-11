package com.example.backend.dto.comment;

import com.example.backend.model.comment.Comment;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.user.User;
import lombok.Data;

@Data
public class CommentCreateDto {

    @Data
    public static class Request {

        private String content;
        private Long parentId;

        public Comment toComment(User user, Tour tour) {
            return new Comment(this.content, user, tour, this.parentId);
        }
    }

    @Data
    public static class Response{

        private Long commentId;
    }

}
