package com.example.backend.model.chat;

import com.example.backend.model.tour.Tour;
import com.example.backend.model.user.User;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Date createTime = new Date();

    @Column
    private Long hostId;

    @ManyToOne
    private Tour tour;

    public ChatRoom(User user, Tour tour) {
        this.hostId = user.getId();
        this.tour = tour;
    }
}
