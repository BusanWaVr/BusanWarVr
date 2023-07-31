package com.example.backend.model.joiner;

import com.example.backend.model.tour.Tour;
import com.example.backend.model.user.User;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Joiner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Tour tour;

    @ManyToOne
    private User user;

    @Column
    private Date joinDate;

    public Joiner(Tour tour, User user, Date date) {
        this.tour = tour;
        this.user = user;
        this.joinDate = date;
    }
}
