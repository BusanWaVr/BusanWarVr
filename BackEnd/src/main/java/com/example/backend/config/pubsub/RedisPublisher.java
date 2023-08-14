package com.example.backend.config.pubsub;

import com.example.backend.dto.chat.ChatMessageResponseDto;
import com.example.backend.dto.chat.CreateVoteDto;
import com.example.backend.dto.chat.EndVoteDto;
import com.example.backend.dto.chat.VoteMessageDto;
import com.example.backend.model.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RedisPublisher {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ChannelTopic channelTopic;
    private final SimpMessageSendingOperations messagingTemplate;

    public void chatMessagePublish(ChatMessageResponseDto messageDto) {
        messagingTemplate.convertAndSend("/sub/chat/message/room/" + messageDto.getRoomUid(),
                messageDto);
    }

    // 가이드가 투표를 만들면 칼럼명들을 보내준다.
    public void chatCreateVotePublish(CreateVoteDto.Response response) {
        messagingTemplate.convertAndSend("/sub/chat/vote/create/room/" + response.getRoomUid(),
                response);
    }

    // 사용자들의 투표내용들을 가이드와 사용자들에게 전부 보내준다.
    public void chatVotePublish(VoteMessageDto.Request request, User user) {
        messagingTemplate.convertAndSend("/sub/chat/vote/room/" + request.getRoomUid(),
                new VoteMessageDto.Response(request, user));
    }

    //가이드가 투표를 종료한다.
    public void chatVoteEndPublish(EndVoteDto.Request request) {
        messagingTemplate.convertAndSend("/sub/chat/vote/end/" + request.getRoomUid(), true);
    }
}
