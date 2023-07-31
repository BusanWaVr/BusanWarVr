package com.example.backend.dto;

import com.example.backend.model.mate.Mate;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MateInfoDetailDto {
    private Long tourId;
    private String title;
    private String content;
    private int minMember;
    private int maxMember;

    public MateInfoDetailDto(Mate mate){
        this.tourId = mate.getTourId();
        this.title = mate.getTitle();
        this.content = mate.getContent();
        this.minMember = mate.getMinMember();
        this.maxMember = mate.getMaxMember();
    }
}
