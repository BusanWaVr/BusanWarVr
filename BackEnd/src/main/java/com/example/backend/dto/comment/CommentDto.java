package com.example.backend.dto.comment;

import com.example.backend.model.comment.Comment;
import com.example.backend.model.user.User;
import java.util.Date;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CommentDto {

    private String nickname;
    private String profileImg;
    private Date writeDate;
    private String content;
    private List<ReCommentDto> reComments;

    public CommentDto(User user, Comment comment, List<ReCommentDto> reComments) {
        this.nickname = user.getNickname();
        this.profileImg = user.getProfileImg();
        this.writeDate = comment.getWriteDate();
        this.content = comment.getContent();
        this.reComments = reComments;
    }
}
