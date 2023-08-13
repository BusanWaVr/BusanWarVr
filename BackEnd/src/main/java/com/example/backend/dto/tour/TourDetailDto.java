package com.example.backend.dto.tour;

import com.example.backend.dto.comment.CommentDto;
import com.example.backend.dto.course.CourseDto;
import com.example.backend.dto.joiner.JoinerDto;
import com.example.backend.dto.review.ReviewDto;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.user.User;
import java.util.Date;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

@Data
public class TourDetailDto {

    @Data
    @NoArgsConstructor
    public static class Response {

        private String uid;
        private String region;
        private List<String> category;
        private String title;
        private String subTitle;
        private String content;
        private List<String> tourImgs;
        @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z")
        private Date startDate;
        @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z")
        private Date endDate;
        private int minMember;
        private int maxMember;
        private List<CourseDto.Response> courses;
        private List<JoinerDto> joiners;
        private Long userId;
        private String nickname;
        private String profileImg;
        private boolean isCanceled;
        private boolean isEnded;
        private List<ReviewDto> reviews;
        private List<CommentDto> comments;

        public Response(Tour tour, User user, List<String> category, List<String> tourImgs,
                List<CourseDto.Response> courses, List<JoinerDto> joiners, List<ReviewDto> reviewDtos, List<CommentDto> commentDtos) {
            this.uid = tour.getUid();
            this.region = tour.getRegion();
            this.category = category;
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
            this.userId = user.getId();
            this.nickname = user.getNickname();
            this.profileImg = user.getProfileImg();
            this.isCanceled = tour.isCanceled();
            this.isEnded = tour.isEnded();
            this.reviews = reviewDtos;
            this.comments = commentDtos;
        }
    }
}
