package com.example.backend.dto.userinfo;

import com.example.backend.model.tour.Tour;
import java.util.Date;
import java.util.List;
import lombok.Data;

@Data
public class TourInfoForUserTourDto {

    private Long tourId;
    private List<String> tourImageUrls;
    private String uid;
    private String title;
    private Date startDate;
    private Date endDate;
    private int currentMember;
    private int maxMember;
    private GuideInfoForUserTourDto guide;
    private String link;

    public TourInfoForUserTourDto(Tour tour, List<String> tourImageUrls, GuideInfoForUserTourDto guide) {
        this.tourId = tour.getId();
        this.tourImageUrls = tourImageUrls;
        this.uid = tour.getUid();
        this.title = tour.getTitle();
        this.startDate = tour.getStartDate();
        this.endDate = tour.getEndDate();
        this.currentMember = tour.getCurrentMember();
        this.maxMember = tour.getMaxMember();
        this.guide = guide;
        this.link = tour.getLink();
    }

}
