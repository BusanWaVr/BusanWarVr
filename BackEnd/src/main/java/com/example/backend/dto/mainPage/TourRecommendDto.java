package com.example.backend.dto.mainPage;

import com.example.backend.model.tour.Tour;
import java.util.Date;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

@Data
@NoArgsConstructor
public class TourRecommendDto {

    private Long tourId;
    private String title;
    private List<String> category;
    private List<String> tourImgs;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z")
    private Date startDate;
    private int currentMember;
    private int maxMember;

    public TourRecommendDto(Tour tour, List<String> category, List<String> tourImgs) {
        this.tourId = tour.getId();
        this.title = tour.getTitle();
        this.category = category;
        this.tourImgs = tourImgs;
        this.startDate = tour.getStartDate();
        this.currentMember = tour.getCurrentMember();
        this.maxMember = tour.getMaxMember();

    }
}
