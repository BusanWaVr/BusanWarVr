package com.example.backend.model.tour;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Tour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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
}
