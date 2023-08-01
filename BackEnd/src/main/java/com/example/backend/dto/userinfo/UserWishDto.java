package com.example.backend.dto.userinfo;

import com.example.backend.model.tour.Tour;
import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class UserWishDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {

        private List<UserWishTourDto> wishTours;

    }

}