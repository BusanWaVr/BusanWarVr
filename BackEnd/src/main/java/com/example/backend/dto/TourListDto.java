//package com.example.backend.dto;
//
//import com.example.backend.model.tour.Tour;
//import java.util.Date;
//import java.util.List;
//import lombok.Data;
//import org.springframework.format.annotation.DateTimeFormat;
//
//@Data
//public class TourListDto {
//
//    @Data
//    public static class Response {
//
//        private Long tourId;
//        private String region;
//        private String title;
//        private String subTitle;
//        private String content;
//        private Date startDate;
//        private Date endDate;
//        private int minMember;
//        private int maxMember;
//        private int currentMember;
//        private long userId;
//
//        private String region;
//        private List<String> category;
//        private String title;
//        private String subTitle;
//        private String content;
//        private List<String> tourImgs;
//        @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
//        private Date startDate;
//        @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
//        private Date endDate;
//        private int minMember;
//        private int maxMember;
//        private List<CourseDto.Response> courses;
//        private List<JoinerDto> joiners;
//        public Response(Tour tour){
//            this.tourId = tour.getId();
//            this.region = tour.getRegion();
//            this.title = tour.getTitle();
//            this.subTitle = tour.getSubTitle();
//            this.content = tour.getContent();
//            this.startDate = tour.getStartDate();
//            this.endDate = tour.getEndDate();
//            this.minMember = tour.getMinMember();;
//            this.maxMember =
//        }
//    }
//}
