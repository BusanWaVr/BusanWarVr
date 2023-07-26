package com.example.backend.dto;

import java.util.Date;
import java.util.List;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class TourRegistDto {

    @Data
    public static class Request{
        private String region;
        private List<String> category;
        private String title;
        private String subTitle;
        private String content;
        private List<MultipartFile> tourImgs;
        private Date startDate;
        private Date endDate;
        private int minMember;
        private int maxMember;

    }
}
