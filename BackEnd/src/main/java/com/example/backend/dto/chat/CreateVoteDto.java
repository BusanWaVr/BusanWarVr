package com.example.backend.dto.chat;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class CreateVoteDto {

    @Data
    @NoArgsConstructor
    public static class Request {
        private String roomUid;
        private String column1;
        private String column2;
    }

    @Data
    @NoArgsConstructor
    public static class Response {
        private String RoomUid;
        private String column1;
        private String column2;

        public Response(Request request){
            this.RoomUid = request.getRoomUid();
            this.column1 = request.getColumn1();
            this.column2 = request.getColumn2();
        }
    }
}
