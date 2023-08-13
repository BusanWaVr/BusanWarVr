package com.example.backend.controller;

import com.example.backend.document.EventRepository;
import com.example.backend.dto.chat.CreateVoteDto;
import com.example.backend.dto.chat.EndVoteDto;
import com.example.backend.dto.chat.JoinMessageDto;
import com.example.backend.dto.chat.LeaveMessageDto;
import com.example.backend.dto.chat.NormalMessageDto;
import com.example.backend.dto.chat.VoteMessageDto;
import com.example.backend.model.user.User;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.chat.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatMessageService chatMessageService;
    private final EventRepository eventRepository;

    @MessageMapping("/chat/message/normal")
    public void normal(@RequestBody NormalMessageDto requestDto) {
        chatMessageService.sendNormalMessage(requestDto);
    }

    @MessageMapping("/chat/message/leave")
    public void leave(@RequestBody LeaveMessageDto requestDto) {
        chatMessageService.sendLeaveMessage(requestDto);
    }

    @MessageMapping("/chat/message/join")
    public void join(@RequestBody JoinMessageDto requestDto){

        chatMessageService.sendJoinMessage(requestDto);
    }

    @PostMapping("/chat/vote/create")
    public void createVote(@RequestBody CreateVoteDto.Request request){
        chatMessageService.sendCreateVoteMessage(request);
    }

    @PostMapping("/chat/vote")
    public void vote(@RequestBody VoteMessageDto.Request request, @AuthenticationPrincipal UserDetailsImpl userDetails){
        User user = userDetails.getUser();
        chatMessageService.sendVoteMessage(request, user);
    }

    @PostMapping("/chat/vote/end")
    public void end(@RequestBody EndVoteDto.Request request, @AuthenticationPrincipal UserDetailsImpl userDetails){
        User user = userDetails.getUser();
        if(!user.getType().toString().equals("GUIDE")){
            throw new IllegalArgumentException("가이드가 아닙니다. 다시 확인해주세요.");
        }

        chatMessageService.endVote(request);
    }
}
