package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.chat.ChatRoomRegistDto;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
}
