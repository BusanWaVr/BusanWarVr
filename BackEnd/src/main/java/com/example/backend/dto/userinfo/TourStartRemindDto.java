package com.example.backend.dto.userinfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class TourStartRemindDto {


    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {

        private RemindTourDto remindTour;
    }
}
