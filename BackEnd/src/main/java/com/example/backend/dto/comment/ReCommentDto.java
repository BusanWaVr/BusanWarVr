package com.example.backend.dto.comment;

import com.example.backend.model.comment.Comment;
import com.example.backend.model.user.User;
import java.util.Date;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReCommentDto {

    private Long commentId;
    private Long userId;
    private String nickname;
    private String profileImg;
    private Date writeDate;
    private boolean isOwner;
    private Long parentId;
    private String content;

    public ReCommentDto(User user, boolean isOwner, Comment comment) {
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
