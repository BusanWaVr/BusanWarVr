package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.comment.CommentCreateDto;
import com.example.backend.dto.comment.CommentDetailDto;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.comment.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/comment/{tourId}")
    public Response<CommentCreateDto.Response> commentCreateApi(@AuthenticationPrincipal
            UserDetailsImpl userDetails, @RequestBody CommentCreateDto.Request request, @PathVariable  Long tourId){

        CommentCreateDto.Response response = commentService.commentCreate(userDetails.getUser(), request, tourId);

        return new Response<>("200", "성공적으로 댓글을 작성하였습니다.", response);
    }

    @GetMapping("/comment/{commentId}")
    public Response<CommentDetailDto.Response> commentDetail(@PathVariable Long commentId){
        CommentDetailDto.Response response = commentService.commentDetail(commentId);

        return new Response<>("200", "성공적으로 댓글 상세 정보를 불러왔습니다.", response);
    }

}
