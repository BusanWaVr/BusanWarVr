package com.example.backend.model.user;

import com.example.backend.model.enums.AuthType;
import com.example.backend.model.user.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

    boolean existsByNickname(String nickname);

    boolean existsByEmail(String email);

    User findByNickname(String name);

    List<User> findAllByNicknameContaining(String name);

    List<User> findAllByType(AuthType authType);
}
