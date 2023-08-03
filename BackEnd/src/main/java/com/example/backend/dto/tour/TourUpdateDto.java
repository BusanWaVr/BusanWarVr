package com.example.backend.dto.tour;

import com.example.backend.dto.course.CourseDto;
import com.example.backend.model.tour.Tour;
import java.util.Date;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.web.multipart.MultipartFile;

@Data
public class TourUpdateDto {

    @Data
    @NoArgsConstructor
    public static class Request {

        private String region;
        private List<String> category;
        private String title;
        private String subTitle;
        private String content;
        private List<MultipartFile> tourImgs;
        @DateTimeFormat(iso = ISO.DATE_TIME)
        private Date startDate;
        @DateTimeFormat(iso = ISO.DATE_TIME)
        private Date endDate;
        private int minMember;
        private int maxMember;
        private List<CourseDto.Request> courses;

        public Tour toUpdate(Tour tour) {
            tour.setRegion(this.region);
            tour.setTitle(this.title);
            tour.setSubTitle(this.subTitle);
            tour.setContent(this.content);
            tour.setStartDate(this.startDate);
            tour.setEndDate(this.endDate);
            tour.setMinMember(this.minMember);
            tour.setMaxMember(this.maxMember);

            return tour;
        }
    }

    @Data
    @NoArgsConstructor
    public static class Response {

        private String region;
        private List<String> category;
        private String title;
        private String subTitle;
        private String content;
        private List<String> tourImgs;
        @DateTimeFormat(iso = ISO.DATE_TIME)
        private Date startDate;
        @DateTimeFormat(iso = ISO.DATE_TIME)
        private Date endDate;
        private int minMember;
        private int maxMember;
        private List<CourseDto.Response> courses;

        public Response(Tour tour, List<String> tourCategories, List<String> tourImageUrls,
                List<CourseDto.Response> courseDtos) {
            this.region = tour.getRegion();
            this.category = tourCategories;
            this.title = tour.getTitle();
            this.subTitle = tour.getSubTitle();
            this.content = tour.getContent();
            this.startDate = tour.getStartDate();
            this.endDate = tour.getEndDate();
            this.minMember = tour.getMinMember();
            this.maxMember = tour.getMaxMember();
            this.tourImgs = tourImageUrls;
            this.courses = courseDtos;
        }
    }
}
