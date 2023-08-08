package com.example.backend.dto.mainPage;

import com.example.backend.model.tour.Tour;
import java.util.Date;
import java.util.List;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

@Data
public class DeadlineTourDto {

    private Long tourId;
    private String title;
    private String image;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z")
    private Date startDate;
    private int currentMember;
    private int maxMember;
    private List<String> category;

    public DeadlineTourDto(Tour tour, String image, List<String> category) {
        this.tourId = tour.getId();
        this.title = tour.getTitle();
        this.image = image;
        this.startDate = tour.getStartDate();
        this.currentMember = tour.getCurrentMember();
        this.maxMember = tour.getMaxMember();
        this.category = category;
    }

}
