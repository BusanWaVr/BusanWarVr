package com.example.backend.model.wish;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface WishRepository extends JpaRepository<Wish, Long> {

    List<Wish> findAllByUserId(Long userId, Pageable pageable);
}
