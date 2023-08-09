package com.example.backend.model.tour;

import java.util.Date;
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
public class Tour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String uid;

    @Column
    private String region;

    @Column
    private String title;

    @Column
    private String subTitle;

    @Column
    private String content;

    @Column
    private Date startDate;

    @Column
    private Date endDate;

    @Column
    private int minMember;

    @Column
    private int maxMember;

    @Column
    private int currentMember;

    @Column
    private long userId;

    @Column
    private boolean isCanceled;

    @Column
    private boolean isEnded;

    @Column
    private String link;

    public Tour(String region, String title, String subTitle, String content, Date startDate,
            Date endDate, int minMember, int maxMember, long userId) {
        this.region = region;
        this.title = title;
        this.subTitle = subTitle;
        this.content = content;
        this.startDate = startDate;
        this.endDate = endDate;
        this.minMember = minMember;
        this.maxMember = maxMember;
        this.userId = userId;
    }

    public Tour(String uid, String region, String title, String subTitle, String content, Date startDate,
            Date endDate, int minMember, int maxMember, long userId) {
        this.uid = uid;
        this.region = region;
        this.title = title;
        this.subTitle = subTitle;
        this.content = content;
        this.startDate = startDate;
        this.endDate = endDate;
        this.minMember = minMember;
        this.maxMember = maxMember;
        this.userId = userId;
    }
}
