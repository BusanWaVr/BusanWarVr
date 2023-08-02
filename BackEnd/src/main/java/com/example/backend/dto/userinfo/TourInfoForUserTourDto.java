package com.example.backend.dto.userinfo;

import java.util.Date;
import lombok.Data;

@Data
public class TourInfoForUserTourDto {

    private Long tourId;
    private String title;
    private Date startDate;
    private int currentMember;
    private int maxMember;
    private GuideInfoForUserTourDto guide;

}
