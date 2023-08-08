package com.example.backend.dto.userinfo;

import com.example.backend.model.tour.Tour;
import java.util.Date;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

@Data
public class RemindTourDto {

    private Long tourId;
    private String uid;
    private String title;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z")
    private Date startDate;
    private Long userId;
    private String image;

    public RemindTourDto(Tour tour, String image) {
        this.tourId = tour.getId();
        this.title = tour.getTitle();
        this.image = image;
        this.startDate = tour.getStartDate();
        this.userId = tour.getUserId();
        this.uid = tour.getUid();
    }
}
