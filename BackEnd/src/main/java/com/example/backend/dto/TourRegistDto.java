package com.example.backend.dto;

import com.example.backend.model.category.Category;
import com.example.backend.model.course.Course;
import com.example.backend.model.tour.Tour;
import java.util.Date;
import java.util.List;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class TourRegistDto {

    @Data
    public static class Request {

        private String region;
        private List<String> category;      //
        private String title;
        private String subTitle;
        private String content;
        private List<MultipartFile> tourImgs;   //
        private Date startDate;
        private Date endDate;
        private int minMember;
        private int maxMember;
        // 코스 개수는 3개가 최대
        private List<Course> courses;       //private List<CourseDto> courses;

        public Tour toTour() {
            return new Tour(this.region, this.title, this.subTitle, this.content,
                    this.startDate, this.endDate, this.minMember, this.maxMember);
        }

        public Category toCategory(String categoryName) {
            return new Category(categoryName);
        }
    }
}
