package com.example.backend.model.mate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Mate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String url;

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
}
