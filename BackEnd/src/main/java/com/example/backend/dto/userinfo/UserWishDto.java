package com.example.backend.dto.userinfo;

import com.example.backend.dto.userinfo.GuideInfoForUserWishDto;
import com.example.backend.model.tour.Tour;
import java.util.Date;
import java.util.List;
import lombok.Data;

@Data
public class UserWishDto {

    @Data
    public static class Response {

        private long tourId;
        private String title;
        private Date startDate;
        private int currentMember;
        private int maxMember;
        private List<String> category;
        private GuideInfoForUserWishDto guide;

        public Response(Tour tour, List<String> category, GuideInfoForUserWishDto guide) {
            this.tourId = tour.getId();
            this.title = tour.getTitle();
            this.startDate = tour.getStartDate();
            this.currentMember = tour.getCurrentMember();
            this.maxMember = tour.getMaxMember();
            this.category = category;
            this.guide = guide;
        }

    }

}