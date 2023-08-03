package com.example.backend.model.review;

import com.example.backend.model.tour.Tour;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String title;
    @Column
    private String content;
    @Column
    private Date date;
    @Column
    private double score;
    @Column
    private long userId;

    @Column
    private long tourId;

    public Review(long tourId, String title, String content, Date date, double score, long userId) {
        this.tourId = tourId;
        this.title = title;
        this.content = content;
        this.date = date;
        this.score = score;
        this.userId = userId;
    }
}
