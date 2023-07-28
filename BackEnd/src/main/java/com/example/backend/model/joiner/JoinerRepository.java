package com.example.backend.model.joiner;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JoinerRepository extends JpaRepository<Joiner, Long> {

    List<Joiner> findAllByTourId(Long id);
}
