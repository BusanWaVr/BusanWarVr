package com.example.backend.dto.comment;

import com.example.backend.model.comment.Comment;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.user.User;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class CommentCreateDto {

    @Data
    public static class Request {

        private String content;
        private Long parentId;

        public Comment toComment(User user, Tour tour) {
            return new Comment(this.content, user, tour, this.parentId);
        }

        public Comment toCommentAboutRoot(User user, Tour tour, Long parentId) {
            return new Comment(this.content, user, tour, parentId);
        }

        public Comment toReComment(User user, Tour tour, Long rootId) {
            return new Comment(this.content, user, tour, rootId);
        }
    }

    @Data
    @NoArgsConstructor
    public static class Response {

        private Long commentId;

        public Response(Long commentId) {
            this.commentId = commentId;
        }
    }

}
