package com.example.backend.dto;

import com.example.backend.model.mate.Mate;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MateInfoDetailDto {
    private Long tourId;
    private String tourTitle;
    private String title;
    private String content;
    private int minMember;
    private int maxMember;

    public MateInfoDetailDto(Mate mate, String tourTitle){
        this.tourId = mate.getTourId();
        this.tourTitle = tourTitle;
        this.title = mate.getTitle();
        this.content = mate.getContent();
        this.minMember = mate.getMinMember();
        this.maxMember = mate.getMaxMember();
    }
}
