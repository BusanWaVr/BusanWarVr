package com.example.backend.dto.tour;

import com.example.backend.dto.course.CourseDto;
import com.example.backend.dto.joiner.JoinerDto;
import com.example.backend.model.tour.Tour;
import java.util.Date;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

@Data
@NoArgsConstructor
public class CanceledTourDto {
    private Long tourId;
    private String region;
    private List<String> category;
    private String title;
    private String subTitle;
    private String content;
    private List<String> image;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z")
    private Date startDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z")
    private Date endDate;
    private int minMember;
    private int maxMember;
    private List<CourseDto.Response> courses;
    private List<JoinerDto> joiners;
    private boolean isCanceled;
    private boolean isEnded;

    public CanceledTourDto(Tour tour, List<String> category, List<String> image,
            List<CourseDto.Response> courses, List<JoinerDto> joiners) {
        this.tourId = tour.getId();
        this.region = tour.getRegion();
        this.category = category;
        this.title = tour.getTitle();
        this.subTitle = tour.getSubTitle();
        this.content = tour.getContent();
        this.startDate = tour.getStartDate();
        this.endDate = tour.getEndDate();
        this.minMember = tour.getMinMember();
        this.maxMember = tour.getMaxMember();
        this.image = image;
        this.courses = courses;
        this.joiners = joiners;
        this.isCanceled = tour.isCanceled();
        this.isEnded = tour.isEnded();
    }
}
