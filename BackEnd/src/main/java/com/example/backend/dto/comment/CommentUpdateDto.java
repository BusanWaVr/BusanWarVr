package com.example.backend.dto.comment;

import com.example.backend.model.comment.Comment;
import com.example.backend.model.user.User;
import java.util.Date;
import lombok.Data;

@Data
public class CommentUpdateDto {

    @Data
    public static class Request {

        private String content;

        public Comment toUpdate(Comment comment) {
            comment.setContent(this.content);
            comment.setWriteDate(new Date());
            return comment;
        }
    }

    @Data
    public static class Response {

        private Long commentId;
        private Long userId;
        private String nickname;
        private String profileImg;
        private Date writeDate;
        private boolean isOwner;
        private Long parentId;
        private String content;
        private boolean isDeleted;

        public Response(User user, Comment comment, boolean isOwner) {
            this.commentId = comment.getId();
            this.userId = user.getId();
            this.nickname = user.getNickname();
            this.profileImg = user.getProfileImg();
            this.writeDate = comment.getWriteDate();
            this.isOwner = isOwner;
            this.parentId = comment.getParentId();
            this.content = comment.getContent();
            this.isDeleted = comment.isDeleted();
        }

    }
}
