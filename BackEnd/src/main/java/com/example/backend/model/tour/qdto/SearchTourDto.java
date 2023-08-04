package com.example.backend.model.tour.qdto;

import com.example.backend.model.course.qdto.CourseCustomDto;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.user.User;
import com.querydsl.core.annotations.QueryProjection;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SearchTourDto {
    private Long id;
    private String uid;
    private String region;
    private String title;
    private String subTitle;
    private String content;
    private Date startDate;
    private Date endDate;
    private int minMember;
    private int maxMember;
    private int currentMember;
    private long userId;
    private boolean isCanceled;
    private boolean isEnded;
    private SearchTourGuideInfo guide;
    private List<String> images = new ArrayList<>();
    private List<String> categorys = new ArrayList<>();
    private List<CourseCustomDto> courses = new ArrayList<>();

    @QueryProjection
    public SearchTourDto(Tour tour, User user) {
        this.id = tour.getId();
        this.uid = tour.getUid();
        this.region = tour.getRegion();
        this.title = tour.getTitle();
        this.subTitle = tour.getSubTitle();
        this.content = tour.getContent();
        this.startDate = tour.getStartDate();
        this.endDate = tour.getEndDate();
        this.minMember = tour.getMinMember();
        this.maxMember = tour.getMaxMember();
        this.currentMember = tour.getCurrentMember();
        this.userId = tour.getUserId();
        this.isCanceled = tour.isCanceled();
        this.isEnded = tour.isEnded();
        this.guide = new SearchTourGuideInfo(user);
    }
}
