package com.example.backend.model;

import com.example.backend.model.enums.AuthType;
import com.example.backend.model.enums.Category;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String email;

    @Column
    private String nickname;

    @Column
    private String password;

    @Column
    private String profileImg;

    @Column
    private String refreshToken;

    @Column
    @Enumerated(EnumType.STRING)
    private AuthType type = AuthType.USER;

    public User(String email, String password, String nickname, String profileImg){
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.profileImg = profileImg;
    }

    public User() {

    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", nickname='" + nickname + '\'' +
                ", password='" + password + '\'' +
                ", profileImg='" + profileImg + '\'' +
                ", refreshToken='" + refreshToken + '\'' +
                ", type=" + type +
                '}';
    }
}
