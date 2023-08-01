package com.example.backend.dto.mate;

import com.example.backend.model.mate.Mate;
import com.example.backend.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MateInfoDetailDto {

    private Long tourId;
    private String tourTitle;
    private Long writerId;
    private String writerNickname;
    private String title;
    private String content;
    private int minMember;
    private int maxMember;

    public MateInfoDetailDto(Mate mate, String tourTitle, User user) {
        this.tourId = mate.getTourId();
        this.tourTitle = tourTitle;
        this.writerId = user.getId();
        this.writerNickname = user.getNickname();
        this.title = mate.getTitle();
        this.content = mate.getContent();
        this.minMember = mate.getMinMember();
        this.maxMember = mate.getMaxMember();
    }
}
