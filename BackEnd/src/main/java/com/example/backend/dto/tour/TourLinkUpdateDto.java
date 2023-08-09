package com.example.backend.dto.tour;

import java.util.Stack;
import lombok.Data;

@Data
public class TourLinkUpdateDto {

    @Data
    public static class Request {

        private String link;
    }
}
