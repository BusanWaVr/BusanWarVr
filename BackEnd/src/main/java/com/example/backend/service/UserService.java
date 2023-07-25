package com.example.backend.service;

import com.example.backend.dto.AuthCodeDto;
import com.example.backend.dto.SignUpDto;
import com.example.backend.model.category.Category;
import com.example.backend.model.user.User;
import com.example.backend.model.category.CategoryRepository;
import com.example.backend.model.user.UserRepository;
import com.example.backend.util.awsS3.S3Uploader;
import java.io.IOException;
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
    private final S3Uploader s3Uploader;
    private final RedisTemplate<String, String> redisTemplate;
    private final static String DEFAULT_PROFILE_IMAGE = "https://newsimg.sedaily.com/2023/04/26/29OGB49IKR_1.jpg";

    @Transactional
    public void signup(SignUpDto.Reqeust reqeust, String encodedPassword) {
        User user = reqeust.toUser(DEFAULT_PROFILE_IMAGE, encodedPassword);
        userRepository.save(user);

        for (String categoryName : reqeust.getCategory()) {
            Category category = reqeust.toCategory(categoryName, user);
            categoryRepository.save(category);
        }
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
