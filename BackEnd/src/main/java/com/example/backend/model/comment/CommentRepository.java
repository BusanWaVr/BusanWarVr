package com.example.backend.model.comment;

import com.example.backend.dto.comment.CommentDto;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findAllByTourId(Long tourId);

    List<Comment> findAllByParentId(Long id);
}
