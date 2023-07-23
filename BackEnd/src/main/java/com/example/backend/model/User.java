package com.example.backend.model;

import com.example.backend.model.enums.AuthType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
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

    public User(String email, String nickname, String password, String profileImg) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.profileImg = profileImg;
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
