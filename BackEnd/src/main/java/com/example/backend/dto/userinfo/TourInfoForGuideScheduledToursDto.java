package com.example.backend.dto.userinfo;

import com.example.backend.model.image.Image;
import lombok.Data;

@Data
public class TourInfoForGuideScheduledToursDto {

    private Long tourId;
    private String uid;
    private String title;
    private String image;

}