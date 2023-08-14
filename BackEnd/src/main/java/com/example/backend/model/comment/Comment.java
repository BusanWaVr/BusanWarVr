package com.example.backend.model.comment;

import com.example.backend.model.tour.Tour;
import com.example.backend.model.user.User;
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
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String content;

    @Column
    private Date writeDate = new Date();

    @Column
    private Long tourId;

    @Column
    private Long userId;

    @Column
    private Long parentId;

    public Comment(String content, User user, Tour tour, Long parentId) {
        this.content = content;
        this.tourId = tour.getId();
        this.userId = user.getId();
        this.parentId = parentId;
    }
}
