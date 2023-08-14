package com.example.backend.dto.userinfo;

import com.example.backend.model.tour.Tour;
import java.util.Date;
import java.util.List;
import lombok.Data;

@Data
public class UserWishTourDto {

    private long tourId;
    private String tourImage;
    private String title;
    private Date startDate;
    private int currentMember;
    private int maxMember;
    private List<String> category;
    private GuideInfoForUserWishDto guide;

    public UserWishTourDto(Tour tour, String tourImage, List<String> category, GuideInfoForUserWishDto guide) {
        this.tourId = tour.getId();
        this.tourImage = tourImage;
        this.title = tour.getTitle();
        this.startDate = tour.getStartDate();
        this.currentMember = tour.getCurrentMember();
        this.maxMember = tour.getMaxMember();
        this.category = category;
        this.guide = guide;
    }
}
