package com.example.backend.dto.mate;

import com.example.backend.model.mate.Mate;
import com.example.backend.model.tour.Tour;
import java.util.Date;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MateInfoForListDto {

    private Long mateId;
    private Long tourId;
    private String tourTitle;
    private List<String> tourImageUrls;
    private Date startDate;
    private String title;
    private String content;
    private int minMember;
    private int maxMember;
    private int joinMember;

    public MateInfoForListDto(Mate mate, Tour tour, List<String> tourImageUrls) {
        this.mateId = mate.getId();
        this.tourId = mate.getTourId();
        this.tourTitle = tour.getTitle();
        this.tourImageUrls = tourImageUrls;
        this.startDate = tour.getStartDate();
        this.title = mate.getTitle();
        this.content = mate.getContent();
        this.minMember = mate.getMinMember();
        this.maxMember = mate.getMaxMember();
        this.joinMember = mate.getJoinMember();
    }
}
