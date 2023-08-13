package com.example.backend.dto.chat;

import com.example.backend.model.user.User;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class VoteMessageDto {
    @Data
    @NoArgsConstructor
    public static class Request{
        private String roomUid;
        private int selectType;
    }

    @Data
    @NoArgsConstructor
    public static class Response{
        private SenderDto sender;
        private int selectType;

        public Response(VoteMessageDto.Request request, User user){
            this.sender = new SenderDto(user);
            this.selectType = request.getSelectType();
        }
    }
}
