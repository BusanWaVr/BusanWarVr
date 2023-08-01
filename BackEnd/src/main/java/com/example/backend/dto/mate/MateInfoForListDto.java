package com.example.backend.dto.mate;

import com.example.backend.model.mate.Mate;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MateInfoForListDto {
    private Long mateId;
    private Long tourId;
    private String title;
    private String content;
    private int minMember;
    private int maxMember;
    private int joinMember;

    public MateInfoForListDto(Mate mate){
        this.mateId = mate.getId();
        this.tourId = mate.getTourId();
        this.title = mate.getTitle();
        this.content = mate.getContent();
        this.minMember = mate.getMinMember();
        this.maxMember = mate.getMaxMember();
        this.joinMember = mate.getJoinMember();
    }
}
