package com.example.backend.dto.userinfo;

import com.example.backend.model.tour.Tour;
import java.util.Date;
import lombok.Data;

@Data
public class TourInfoForUserTourDto {

    private Long tourId;
    private String uid;
    private String title;
    private Date startDate;
    private int currentMember;
    private int maxMember;
    private GuideInfoForUserTourDto guide;

    public TourInfoForUserTourDto(Tour tour, GuideInfoForUserTourDto guide) {
        this.tourId = tour.getId();
        this.uid = tour.getUid();
        this.title = tour.getTitle();
        this.startDate = tour.getStartDate();
        this.currentMember = tour.getCurrentMember();
        this.maxMember = tour.getMaxMember();
        this.guide = guide;
    }

}
