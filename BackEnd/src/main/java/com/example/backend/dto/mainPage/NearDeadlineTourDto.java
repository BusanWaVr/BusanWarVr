package com.example.backend.dto.mainPage;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class NearDeadlineTourDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {

        private List<DeadlineTourDto> nearDeadlineTours;

    }

}
