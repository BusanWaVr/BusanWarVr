package com.example.backend.model.mate;

import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MateRepository extends JpaRepository<Mate, Long> {
    List<Mate> findAllByOrderByIdDesc(Pageable pageable);
}
