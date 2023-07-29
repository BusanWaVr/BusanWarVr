package com.example.backend.dto;

import com.example.backend.model.category.Category;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.user.User;
import java.util.Date;
import java.util.List;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

@Data
public class TourRegistDto {

    @Data
    public static class Request {

        private String region;
        private List<String> category;
        private String title;
        private String subTitle;
        private String content;
        private List<MultipartFile> tourImgs;
        @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private Date startDate;
        @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private Date endDate;
        private int minMember;
        private int maxMember;
        private List<CourseDto.Request> courses;

        public Tour toTour(User user) {
            return new Tour(this.region, this.title, this.subTitle, this.content,
                    this.startDate, this.endDate, this.minMember, this.maxMember, user.getId());
        }

        public Category toCategory(String categoryName) {
            return new Category(categoryName);
        }
    }
}