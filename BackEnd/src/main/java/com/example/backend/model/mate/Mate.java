package com.example.backend.model.mate;

import com.example.backend.dto.MateRegistDto;
import com.example.backend.dto.MateUpdateDto;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.user.User;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class Mate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long tourId;

    @Column
    private String title;

    @Column
    private String content;

    @Column
    private int minMember;

    @Column
    private int maxMember;

    @Column
    private int joinMember;

    @Column
    private long userId;

    public Mate(MateRegistDto.Request request, Tour tour, User user, int joinMember) {
        this.tourId = request.getTourId();
        this.title = request.getTitle();
        this.content = request.getContent();
        this.minMember = tour.getMinMember();
        this.maxMember = tour.getMaxMember();
        this.joinMember = joinMember;
        this.userId = user.getId();
    }

    public void updateMate(MateUpdateDto.Request request){
        this.title = request.getTitle();
        this.content = request.getContent();
    }
}
