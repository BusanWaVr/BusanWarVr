package com.example.backend.dto;

import com.example.backend.model.tour.Tour;
import java.util.Date;
import java.util.List;
import lombok.Data;

@Data
public class TourListDto {

    @Data
    public static class Response {

        private Long tourId;
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
        private List<CourseDto.Response> courses;

        public Response(Tour tour, List<CourseDto.Response> courses){

        }
    }
}
