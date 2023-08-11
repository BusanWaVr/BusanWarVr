package com.example.backend.dto.comment;

import com.example.backend.model.comment.Comment;
import com.example.backend.model.user.User;
import java.util.Date;
import lombok.Data;

@Data
public class CommentDetailDto {

    @Data
    public static class Response {

        private String content;
        private String nickname;
        private String profileImg;
        private Date writeDate;

        public Response(User user, Comment comment) {
            this.content = comment.getContent();
            this.nickname = user.getNickname();
            this.profileImg = user.getProfileImg();
            this.writeDate = comment.getWriteDate();
        }
    }
}
