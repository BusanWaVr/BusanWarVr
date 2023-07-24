package com.example.backend.model.usercategory;

import com.example.backend.model.category.Category;
import com.example.backend.model.user.User;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class UserCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Category category;
    @ManyToOne
    private User user;
    @Column
    private Date date;
}
