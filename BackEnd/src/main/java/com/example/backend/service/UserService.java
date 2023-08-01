package com.example.backend.service;

import com.example.backend.dto.user.AuthCodeDto;
import com.example.backend.dto.user.GuideSignUpDto;
import com.example.backend.dto.user.GuideUpdateDto;
import com.example.backend.dto.user.UserSignUpDto;
import com.example.backend.dto.user.UserUpdateDto;
import com.example.backend.exception.type.DuplicatedValueException;
import com.example.backend.model.category.Category;
import com.example.backend.model.category.CategoryRepository;
import com.example.backend.model.user.User;
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
    private final RedisTemplate<String, String> redisTemplate;

    private final static String DEFAULT_PROFILE_IMAGE = "https://newsimg.sedaily.com/2023/04/26/29OGB49IKR_1.jpg";
    private final S3Uploader s3Uploader;

    @Transactional
    public void signup(UserSignUpDto.Request request, String encodedPassword)
            throws DuplicatedValueException, IllegalArgumentException {
        emailExistValidCheck(request.getEmail());
        nicknameExistValidCheck(request.getNickname());

        boolean isUnRegistered = false;

        // 사용자가 선택한 카테고리 이름들이 모두 등록 가능한지 체크
        for (String categoryName : request.getCategory()) {
            if (categoryRepository.findByName(categoryName) == null) {
                isUnRegistered = true;
            }
        }

        if (isUnRegistered) {
            throw new IllegalArgumentException("등록된 카테고리만 추가 가능합니다.");
        }
        User user = request.toUser(DEFAULT_PROFILE_IMAGE, encodedPassword);
        userRepository.save(user);
        // 사용자가 선택한 카테고리 이름들을 UserCategory 객체로 변환하고 저장
        for (String categoryName : request.getCategory()) {
            userCategoryCreate(user, categoryRepository.findByName(categoryName));
        }
    }

    @Transactional
    public void guideSignUp(GuideSignUpDto.Request request, String encodedPassword) {
        emailExistValidCheck(request.getEmail());
        nicknameExistValidCheck(request.getNickname());
        User user = request.toGuide(DEFAULT_PROFILE_IMAGE, encodedPassword);
        userRepository.save(user);
    }

    @Transactional
    public void updatePassword(Long id, String encodedPassword) {
        User user = userRepository.findById(id).get();
        user.setPassword(encodedPassword);
        userRepository.save(user);
    }

    public void saveEmailAuth(String email, String code) throws IllegalAccessException {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(email, code);
        redisTemplate.expire(email, 5, TimeUnit.MINUTES);
    }

    public void emailExistValidCheck(String email) throws DuplicatedValueException {
        if (userRepository.findByEmail(email) != null) {
            throw new DuplicatedValueException("이메일이 중복되어 이메일 인증이 불가합니다.");
        }
    }

    public void nicknameExistValidCheck(String nickname) {
        if (userRepository.existsByNickname(nickname)) {
            throw new DuplicatedValueException("닉네임 중복입니다. 다시 확인하세요.");
        }
    }

    public boolean isCodeAuth(AuthCodeDto.Request request) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        String auth = valueOperations.get(request.getEmail());
        return auth.equals(request.getCode());
    }

    @Transactional
    public void guideUpdate(User user, GuideUpdateDto.Request request)
            throws IOException, IllegalAccessException {

        String newNickname = request.getNickname();
        String fileUrl;

        // 파일이 없을 경우 기본 프로필 이미지 URL을 지정
        if (request.getProfileImg().isEmpty()) {
            fileUrl = DEFAULT_PROFILE_IMAGE;
        } else {
            fileUrl = s3Uploader.upload(request.getProfileImg());
        }

        // 닉네임을 변경했을 때만 닉네임 유효성 검사
        if (!user.getNickname().equals(newNickname)) {
            nicknameExistValidCheck(newNickname);
            user.setNickname(newNickname);
        }

        user.setProfileImg(fileUrl);
        user.setIntroduction(request.getIntroduction());
        userRepository.save(user);
    }

    public void userCategoryCreate(User user, Category category) {
        UserCategory userCategory = new UserCategory();
        userCategory.setUser(user);
        userCategory.setCategory(category);
        userCategory.setDate(new Date());
        userCategoryRepository.save(userCategory);
    }

    public void userCategoryDelete(User user) {
        List<UserCategory> userCategories = userCategoryRepository.findAllByUser(user);

        for (UserCategory userCategory : userCategories) {
            userCategoryRepository.delete(userCategory);
        }
    }

    @Transactional
    public void userUpdate(User user, UserUpdateDto.Request request)
            throws IOException, IllegalAccessException {

        String newNickname = request.getNickname();
        String fileUrl;

        // 파일이 없을 경우 기본 프로필 이미지 URL을 지정
        if (request.getProfileImg().isEmpty()) {
            fileUrl = DEFAULT_PROFILE_IMAGE;
        } else {
            fileUrl = s3Uploader.upload(request.getProfileImg());
        }

        // 닉네임을 변경했을 때만 닉네임 유효성 검사
        if (!user.getNickname().equals(newNickname)) {
            nicknameExistValidCheck(newNickname);
            user.setNickname(newNickname);
        }

        user.setProfileImg(fileUrl);
        userRepository.save(user);

        userCategoryDelete(user);

        List<Category> categories = new ArrayList<>();
        for (String categoryName : request.getCategory()) {
            if (categoryRepository.findByName(categoryName) == null) {
                Category category = request.toCategory(categoryName);
                categories.add(category);
                categoryRepository.save(category);
                userCategoryCreate(user, category);
            } else {
                userCategoryCreate(user, categoryRepository.findByName(categoryName));
            }
        }
    }
}
