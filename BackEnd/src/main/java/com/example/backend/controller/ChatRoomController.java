package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.chat.ChatRoomRegistDto;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.chat.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    @PostMapping("/chatroom")
    public Response createdChatRoom(@AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody ChatRoomRegistDto.Request request) {
        chatRoomService.createChatRoom(userDetails.getUser(), request);

        return new Response("200", "정상적으로 채팅방이 생성되었습니다.", null);
    }

    @PostMapping("/chatroom/start")
    public Response startedChatRoom(@AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody ChatRoomRegistDto.Request request) {
        chatRoomService.startChatRoom(userDetails.getUser(), request);

        return new Response("200", "정상적으로 채팅방이 시작되었습니다.", null);
    }

    @DeleteMapping("/chatroom")
    public Response deleteChatRoom(@AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody ChatRoomRegistDto.Request request) {
        chatRoomService.deleteChatRoom(userDetails.getUser(), request);

        return new Response("200", "정상적으로 채팅방이 삭제되었습니다.", null);
    }

    @PostMapping("/chatroom/rejoin")
    public Response rejoinChatRoom(@AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody ChatRoomRegistDto.Request request) {
        chatRoomService.rejoinChatRoom(userDetails.getUser(), request);

        return new Response("200", "정상적으로 채팅방에 재참여되었습니다.", null);
    }

}
