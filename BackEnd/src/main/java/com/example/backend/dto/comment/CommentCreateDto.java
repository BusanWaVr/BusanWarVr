package com.example.backend.dto.comment;

import com.example.backend.model.comment.Comment;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.user.User;
import java.util.Date;
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
        private Long userId;
        private String nickname;
        private String profileImg;
        private Date writeDate;
        private boolean isOwner;
        private Long parentId;
        private String content;

        public Response(User user, Comment comment, boolean isOwner) {
            this.commentId = comment.getId();
            this.userId = user.getId();
            this.nickname = user.getNickname();
            this.profileImg = user.getProfileImg();
            this.writeDate = comment.getWriteDate();
            this.isOwner = isOwner;
            this.parentId = comment.getParentId();
            this.content = comment.getContent();
        }
    }

}
