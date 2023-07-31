package com.example.backend.model.mate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MateRepository extends JpaRepository<Mate, Long> {
    Page<Mate> findAllByOrderById(Pageable pageable);
}
