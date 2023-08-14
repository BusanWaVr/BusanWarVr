package com.example.backend.dto.userinfo;

import java.util.Date;
import javax.persistence.Column;
import lombok.Data;

@Data
public class TourInfoForGuideScheduledToursDto {

    private Long tourId;
    private String uid;
    private String title;
    private String image;
    private Date startDate;
    private Date endDate;
    private int maxMember;
    private int currentMember;

}