package com.example.backend.model.user;

import com.example.backend.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

    boolean existsByNickname(String nickname);

    boolean existsByEmail(String email);

    User findByNickname(String name);
}
