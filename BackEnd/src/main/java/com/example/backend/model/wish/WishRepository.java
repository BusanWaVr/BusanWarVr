package com.example.backend.model.wish;

import com.example.backend.model.user.User;
import com.example.backend.model.usercategory.UserCategory;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishRepository extends JpaRepository<Wish, Long> {
    List<Wish> findAllByUserId(Long userId);
}
