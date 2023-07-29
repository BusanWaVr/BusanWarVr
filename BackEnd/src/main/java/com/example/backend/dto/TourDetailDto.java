package com.example.backend.dto;

import com.example.backend.model.course.Course;
import com.example.backend.model.courseimage.CourseImage;
import com.example.backend.model.joiner.Joiner;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.tourimage.TourImage;
import java.util.Date;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

@Data
public class TourDetailDto {

    @Data
    @NoArgsConstructor
    public static class Response{
        private Long tourId;
        private String region;
        private List<String> category;
        private String title;
        private String subTitle;
        private String content;
        private List<String> tourImgs;
        @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private Date startDate;
        @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private Date endDate;
        private int minMember;
        private int maxMember;
        private List<CourseDto.Response> courses;
        private List<Joiner> joiners;

        public Response(Tour tour, List<String> tourImgs, List<CourseDto.Response> courses, List<Joiner> joiners){
            this.region = tour.getRegion();
            this.title = tour.getTitle();
            this.subTitle = tour.getSubTitle();
            this.content = tour.getContent();
            this.startDate = tour.getStartDate();
            this.endDate = tour.getEndDate();
            this.minMember = tour.getMinMember();
            this.maxMember = tour.getMaxMember();
            this.tourImgs = tourImgs;
            this.courses = courses;
            this.joiners = joiners;
        }
    }
}
