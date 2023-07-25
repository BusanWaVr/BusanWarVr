package com.example.backend.service;

import com.example.backend.dto.AuthCodeDto;
import com.example.backend.dto.GuideSignUpDto;
import com.example.backend.dto.SignUpDto;
import com.example.backend.model.category.Category;
import com.example.backend.model.user.User;
import com.example.backend.model.category.CategoryRepository;
import com.example.backend.model.user.UserRepository;
import com.example.backend.model.usercategory.UserCategory;
import com.example.backend.model.usercategory.UserCategoryRepository;
import com.example.backend.util.awsS3.S3Uploader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;
import javax.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final UserCategoryRepository userCategoryRepository;
    private final S3Uploader s3Uploader;
    private final RedisTemplate<String, String> redisTemplate;
    private final static String DEFAULT_PROFILE_IMAGE = "https://newsimg.sedaily.com/2023/04/26/29OGB49IKR_1.jpg";

    @Transactional
    public void signup(SignUpDto.Reqeust reqeust, String encodedPassword) {
        User user = reqeust.toUser(DEFAULT_PROFILE_IMAGE, encodedPassword);
        userRepository.save(user);

        // 사용자가 선택한 카테고리 이름들을 Category 객체로 변환하고 저장
        List<Category> categories = new ArrayList<>();
        for (String categoryName : reqeust.getUserCategory()) {
            Category category = reqeust.toCategory(categoryName);
            categories.add(category);
            categoryRepository.save(category);
        }

        // UserCategory 객체 생성 및 저장
        for (Category category : categories) {
            UserCategory userCategory = new UserCategory();
            userCategory.setUser(user);
            userCategory.setCategory(category);
            userCategory.setDate(new Date());
            userCategoryRepository.save(userCategory);
        }
    }

    @Transactional
    public void guideSignUp(GuideSignUpDto.Request request, String encodedPassword)
            throws IOException, IllegalAccessException {
        String fileUrl = "https://modo-phinf.pstatic.net/20220706_248/1657095680803mnUC9_JPEG/mosatoJVQz.jpeg?type=w1100";
        User user = request.toGuide(fileUrl, encodedPassword);
        userRepository.save(user);
    }


    public void saveEmailAuth(String email, String code) throws IllegalAccessException {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(email, code);
        redisTemplate.expire(email, 5, TimeUnit.MINUTES);
    }

    public void emailExistValidCheck(String email) throws IllegalAccessException {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            throw new IllegalAccessException("이메일이 중복되어 이메일 인증이 불가합니다.");
        }
    }

    public boolean checkNicknameDuplicate(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    public boolean isCodeAuth(AuthCodeDto.Request request) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        String auth = valueOperations.get(request.getEmail());
        return auth.equals(request.getCode());
    }

}
