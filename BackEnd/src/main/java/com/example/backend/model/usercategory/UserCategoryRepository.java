package com.example.backend.model.usercategory;

import com.example.backend.model.user.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCategoryRepository extends JpaRepository<UserCategory, Long> {

}
