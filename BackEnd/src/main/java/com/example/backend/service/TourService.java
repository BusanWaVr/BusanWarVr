package com.example.backend.service;

import com.example.backend.dto.course.CourseDto;
import com.example.backend.dto.joiner.JoinerDto;
import com.example.backend.dto.tour.ReviewRegistDto;
import com.example.backend.dto.tour.ReviewUpdateDto;
import com.example.backend.dto.tour.TourDetailDto;
import com.example.backend.dto.tour.TourDto;
import com.example.backend.dto.tour.TourListDto;
import com.example.backend.dto.tour.TourRegistDto;
import com.example.backend.dto.tour.TourReservationCancelDto;
import com.example.backend.dto.tour.TourReservationDto;
import com.example.backend.dto.tour.TourUpdateDto;
import com.example.backend.dto.tour.TourUpdateDto.Request;
import com.example.backend.dto.tour.TourUpdateDto.Response;
import com.example.backend.model.category.Category;
import com.example.backend.model.category.CategoryRepository;
import com.example.backend.model.course.Course;
import com.example.backend.model.course.CourseRepository;
import com.example.backend.model.courseimage.CourseImage;
import com.example.backend.model.courseimage.CourseImageRepository;
import com.example.backend.model.enums.AuthType;
import com.example.backend.model.image.Image;
import com.example.backend.model.image.ImageRepository;
import com.example.backend.model.joiner.Joiner;
import com.example.backend.model.joiner.JoinerRepository;
import com.example.backend.model.review.Review;
import com.example.backend.model.review.ReviewRepository;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.tour.TourRepository;
import com.example.backend.model.tourcategory.TourCategory;
import com.example.backend.model.tourcategory.TourCategoryRepository;
import com.example.backend.model.tourimage.TourImage;
import com.example.backend.model.tourimage.TourImageRepository;
import com.example.backend.model.user.User;
import com.example.backend.model.user.UserRepository;
import com.example.backend.model.wish.Wish;
import com.example.backend.model.wish.WishRepository;
import com.example.backend.util.awsS3.S3Uploader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@AllArgsConstructor
public class TourService {

    private final UserRepository userRepository;
    private final TourRepository tourRepository;
    private final CourseRepository courseRepository;
    private final CategoryRepository categoryRepository;
    private final TourCategoryRepository tourCategoryRepository;
    private final TourImageRepository tourImageRepository;
    private final ImageRepository imageRepository;
    private final CourseImageRepository courseImageRepository;
    private final JoinerRepository joinerRepository;
    private final WishRepository wishRepository;
    private final ReviewRepository reviewRepository;
    private final S3Uploader s3Uploader;

    @Transactional
    public TourRegistDto.Response tourRegist(TourRegistDto.Request request, User user)
            throws IOException, IllegalAccessException {

        if (user.getType() != AuthType.GUIDE) {
            throw new IllegalAccessException("가이드만 투어 등록이 가능합니다.");
        }

        Tour tour = request.toTour(user);
        tourRepository.save(tour);
        TourRegistDto.Response response = new TourRegistDto.Response(tour);

        // 이미지 등록 부분 조건적으로 처리
        if (request.getTourImgs() != null && !request.getTourImgs().isEmpty()) {
            // 투어 이미지 저장해 url 가져와서 Image 객체 생성 및 저장
            List<Image> tourImages = new ArrayList<>();
            for (MultipartFile file : request.getTourImgs()) {
                Image image = saveImage(file);
                tourImages.add(image);
            }

            // TourImage 객체 생성 및 저장
            for (Image image : tourImages) {
                TourImage tourImage = new TourImage();
                tourImage.setTour(tour);
                tourImage.setImage(image);
                tourImageRepository.save(tourImage);
            }
        }

        // 가이드가 선택한 카테고리 이름들을 TourCategory 객체로 변환하고 저장
        for (String categoryName : request.getCategory()) {
            if (categoryRepository.findByName(categoryName) != null) {
                tourCategoryCreate(tour, categoryRepository.findByName(categoryName));
            } else {
                throw new IllegalAccessException("등록된 카테고리만 추가 가능합니다.");
            }
        }

        // Course 객체 생성 및 저장
        for (CourseDto.Request courseDto : request.getCourses()) {
            Course course = new Course(courseDto.getLon(), courseDto.getLat(),
                    courseDto.getTitle(),
                    courseDto.getContent(), tour.getId());
            courseRepository.save(course);

            // 이미지 등록 부분 조건적으로 처리
            if (courseDto.getImage() != null) {
                Image image = saveImage(courseDto.getImage());

                // CourseImage 객체 생성 및 저장
                CourseImage courseImage = new CourseImage();
                courseImage.setCourse(course);
                courseImage.setImage(image);
                courseImageRepository.save(courseImage);
            }
        }
        return response;
    }

    // 이미지 저장해 url 가져와서 Image 객체 생성 및 저장
    public Image saveImage(MultipartFile imageFile) throws IOException, IllegalAccessException {
        String fileUrl = s3Uploader.upload(imageFile);
        Image image = new Image(fileUrl);
        imageRepository.save(image);
        return image;
    }

    // 투어 카테고리 등록
    public void tourCategoryCreate(Tour tour, Category category) {
        TourCategory tourCategory = new TourCategory();
        tourCategory.setTour(tour);
        tourCategory.setCategory(category);
        tourCategory.setDate(new Date());
        tourCategoryRepository.save(tourCategory);
    }

    public TourDetailDto.Response tourDetail(Long tourId) {
        Tour tour = tourRepository.findById(tourId).get();

        User user = userRepository.findById(tour.getUserId()).get();

        List<String> tourCategories = new ArrayList<>();
        tourCategoryList(tourId, tourCategories);

        List<String> tourImageUrls = new ArrayList<>();
        tourImageUrlList(tourId, tourImageUrls);

        List<CourseDto.Response> courseDtos = new ArrayList<>();
        courseDtoList(tourId, courseDtos);

        List<JoinerDto> joinerDtos = new ArrayList<>();
        joinerDtoList(tourId, joinerDtos);

        return new TourDetailDto.Response(tour, user, tourCategories, tourImageUrls, courseDtos,
                joinerDtos);
    }

    public void tourReservation(Long tourId, User user) {
        Tour tour = tourRepository.findById(tourId).get();
        TourReservationDto tourReservationDto = new TourReservationDto(tour);
        if (tour.getMaxMember() <= tour.getCurrentMember()) {
            throw new IllegalArgumentException("인원이 모두 모여 예약이 불가능 합니다.");
        }
        List<Joiner> joiners = joinerRepository.findAllByTourId(tourId);
        for (Joiner joiner : joiners) {
            if (joiner.getUser().getId() == user.getId()) {
                throw new IllegalArgumentException("이미 예약된 고객입니다");
            }
        }
        Joiner newJoiner = new Joiner(tour, user, new Date());
        joinerRepository.save(newJoiner);
        tour = tourReservationDto.upCurrentMember(tour);
        tourRepository.save(tour);
    }

    public boolean tourWish(Long tourId, User user) {
        List<Wish> wishList = wishRepository.findAllByUserId(user.getId());
        boolean isUnWished = true;
        for (Wish wish : wishList) {
            // 이미 찜 되어있으면 찜 취소
            if(wish.getTour().getId() == tourId){
                wishRepository.delete(wish);
                isUnWished = false;
                return false;
            }
        }
        // 찜하기 안 되어 있으면 찜
        if(isUnWished){
            Tour tour = tourRepository.findById(tourId).get();
            Wish wish = new Wish(tour, user.getId());
            wishRepository.save(wish);
        }
        return true;
    }

    public void tourReservationCancel(Long tourId, User user) throws IllegalArgumentException {
        Tour tour = tourRepository.findById(tourId).get();
        TourReservationCancelDto tourReservationCancelDto = new TourReservationCancelDto(tour);
        List<Joiner> joiners = joinerRepository.findAllByTourId(tourId);
        boolean isNotExist = true;
        for (Joiner joiner : joiners) {
            if (joiner.getUser().getId() == user.getId()) {
                joinerRepository.deleteById(joiner.getId());
                tour = tourReservationCancelDto.downCurrentMember(tour);
                tourRepository.save(tour);
                isNotExist = false;
            }
        }
        if (isNotExist) {
            throw new IllegalArgumentException("예약 고객만 예약 취소가 가능합니다.");
        }
    }

    public void tourCancel(Long tourId, User user)
            throws IllegalAccessException {
        Tour tour = tourRepository.findById(tourId).get();
        if ((user.getType() == AuthType.GUIDE) && (tour.getUserId() == user.getId())) {
            tour.setCanceled(true);
            tourRepository.save(tour);
        } else if (user.getType() == AuthType.USER) {
            throw new IllegalAccessException("가이드만 투어 취소 가능합니다.");
        } else {
            throw new IllegalAccessException("해당 투어의 작성자 가이드만 투어 취소 가능합니다.");
        }
    }

    public void tourTerminate(Long tourId, User user) throws IllegalAccessException {
        Tour tour = tourRepository.findById(tourId).get();
        if ((user.getType() == AuthType.GUIDE) && (tour.getUserId() == user.getId())) {
            tour.setEnded(true);
            tourRepository.save(tour);
        } else if (user.getType() == AuthType.USER) {
            throw new IllegalAccessException("가이드만 투어 취소 가능합니다.");
        } else {
            throw new IllegalAccessException("해당 투어의 작성자 가이드만 투어 취소 가능합니다.");
        }
    }

    public TourListDto.Response getALLTour(Pageable pageable) {
        List<Tour> tours = tourRepository.findByIsEndedFalseOrderByStartDateDesc(pageable);
        List<TourDto> tourDtoList = new ArrayList<>();

        for (Tour tour : tours) {
            if (tour.isEnded()) {
                continue;
            }
            User user = userRepository.findById(tour.getUserId()).get();
            Long tourId = tour.getId();

            List<String> tourCategories = new ArrayList<>();
            tourCategoryList(tourId, tourCategories);

            List<String> tourImageUrls = new ArrayList<>();
            tourImageUrlList(tourId, tourImageUrls);

            List<CourseDto.Response> courseDtos = new ArrayList<>();
            courseDtoList(tourId, courseDtos);

            List<JoinerDto> joinerDtos = new ArrayList<>();
            joinerDtoList(tourId, joinerDtos);

            tourDtoList.add(
                    new TourDto(tour, user, tourCategories, tourImageUrls, courseDtos, joinerDtos));
        }

        return new TourListDto.Response(tourDtoList);
    }

    // 투어 카테고리 목록 가져오기
    public void tourCategoryList(Long tourId, List<String> tourCategories) {
        List<TourCategory> categories = tourCategoryRepository.findAllByTourId(tourId);
        for (TourCategory tourCategory : categories) {
            Category category = tourCategory.getCategory();
            tourCategories.add(category.getName());
        }
    }

    // 투어 이미지 목록 가져오기
    public void tourImageUrlList(Long tourId, List<String> tourImageUrls) {
        List<TourImage> tourImages = tourImageRepository.findAllByTourId(tourId);
        if (tourImages != null) {
            for (TourImage tourImage : tourImages) {
                tourImageUrls.add(tourImage.getImage().getUrl());
            }
        }
    }

    // 투어 코스, 코스 이미지 목록 가져오기
    public void courseDtoList(Long tourId, List<CourseDto.Response> courseDtos) {
        List<Course> courses = courseRepository.findAllByTourId(tourId);
        for (Course course : courses) {
            CourseImage courseImage = courseImageRepository.findByCourseId(course.getId());
            String imageUrl = "";
            if (courseImage != null) {
                imageUrl = courseImage.getImage().getUrl();
            }
            CourseDto.Response courseDto = new CourseDto.Response(course, imageUrl);
            courseDtos.add(courseDto);
        }
    }

    // 투어 예약자 목록 가져오기
    public void joinerDtoList(Long tourId, List<JoinerDto> joinerDtos) {
        List<Joiner> joinerList = joinerRepository.findAllByTourId(tourId);
        for (Joiner joiner : joinerList) {
            JoinerDto joinerDto = new JoinerDto(joiner.getUser().getProfileImg(),
                    joiner.getUser().getNickname(), joiner.getJoinDate());
            joinerDtos.add(joinerDto);
        }
    }

    public boolean hasUserJoinedTour(Long userId, Long tourId) {
        return joinerRepository.existsByTourIdAndUserId(tourId, userId);
    }

    public boolean isRegistedReview(Long tourId, Long userId) {
        return reviewRepository.existsByTourIdAndUserId(tourId, userId);
    }

    public void tourReviewRegist(ReviewRegistDto.Request request, User user)
            throws IllegalAccessException {
        Tour tour = tourRepository.findById(request.getTourId()).get();

        Date now = new Date();

        if (user.getType() != AuthType.USER) {
            throw new IllegalAccessException("가이드는 리뷰를 등록할 수 없습니다.");
        }

        if (tour.getEndDate().after(now)) {
            throw new IllegalAccessException("아직 끝나지 않은 투어에 리뷰를 등록할 수 없습니다.");
        }

        if (!hasUserJoinedTour(user.getId(), request.getTourId())) {
            throw new IllegalAccessException("참가하지 않은 투어에 리뷰를 등록할 수 없습니다.");
        }

        if (isRegistedReview(request.getTourId(), user.getId())) {
            throw new IllegalAccessException("이미 리뷰를 작성한 투어입니다.");
        }

        Review review = request.toReview(now, user.getId());

        reviewRepository.save(review);
    }

    public TourUpdateDto.Response tourUpdate(TourUpdateDto.Request request, Long tourId, User user)
            throws IllegalAccessException, IOException {
        Tour tour = tourRepository.findById(tourId).get();

        if (user.getType() != AuthType.GUIDE || tour.getUserId() != user.getId()) {
            throw new IllegalAccessException("투어 정보를 수정할 권한이 없습니다.");
        }

        tour = request.toUpdate(tour);
        tourRepository.save(tour);

        // 기존 투어 카테고리 삭제
        List<TourCategory> tourCategoryToDelete = tourCategoryRepository.findAllByTourId(tourId);
        for (TourCategory tourCategory : tourCategoryToDelete) {
            tourCategoryRepository.delete(tourCategory);
        }

        // 가이드가 수정한 카테고리 이름들을 TourCategory 객체로 변환하고 저장
        for (String categoryName : request.getCategory()) {
            if (categoryRepository.findByName(categoryName) != null) {
                tourCategoryCreate(tour, categoryRepository.findByName(categoryName));
            } else {
                throw new IllegalAccessException("등록된 카테고리만 추가 가능합니다.");
            }
        }

        // 기존 투어 이미지 삭제
        List<TourImage> tourImagesToDelete = tourImageRepository.findAllByTourId(tourId);
        if (tourImagesToDelete != null && !tourImagesToDelete.isEmpty()) {
            for (TourImage image : tourImagesToDelete) {
                tourImageRepository.delete(image);
            }
        }

        // 이미지 등록 부분 조건적으로 처리
        if (request.getTourImgs() != null && !request.getTourImgs().isEmpty()) {
            // 투어 이미지 저장해 url 가져와서 Image 객체 생성 및 저장
            List<Image> tourImages = new ArrayList<>();
            for (MultipartFile file : request.getTourImgs()) {
                Image image = saveImage(file);
                tourImages.add(image);
            }

            // TourImage 객체 생성 및 저장
            for (Image image : tourImages) {
                TourImage tourImage = new TourImage();
                tourImage.setTour(tour);
                tourImage.setImage(image);
                tourImageRepository.save(tourImage);
            }
        }

        // 기존 코스 이미지, 코스 삭제
        List<Course> CourseToDelete = courseRepository.findAllByTourId(tourId);
        if (CourseToDelete != null && !CourseToDelete.isEmpty()) {
            for (Course course : CourseToDelete) {
                CourseImage courseImage = courseImageRepository.findByCourseId(course.getId());
                if (courseImage != null) {
                    courseImageRepository.delete(courseImage);
                    continue;
                }
                courseRepository.delete(course);
            }
        }

        // Course 객체 생성 및 저장
        for (CourseDto.Request courseDto : request.getCourses()) {
            Course course = new Course(courseDto, tour);
            courseRepository.save(course);

            // 이미지 등록 부분 조건적으로 처리
            if (courseDto.getImage() != null) {
                Image image = saveImage(courseDto.getImage());

                // CourseImage 객체 생성 및 저장
                CourseImage courseImage = new CourseImage();
                courseImage.setCourse(course);
                courseImage.setImage(image);
                courseImageRepository.save(courseImage);
            }
        }

        List<String> tourCategories = new ArrayList<>();
        tourCategoryList(tourId, tourCategories);

        List<String> tourImageUrls = new ArrayList<>();
        tourImageUrlList(tourId, tourImageUrls);

        List<CourseDto.Response> courseDtos = new ArrayList<>();
        courseDtoList(tourId, courseDtos);

        TourUpdateDto.Response response = new TourUpdateDto.Response(tour, tourCategories,
                tourImageUrls, courseDtos);

        return response;
    }

    public void reviewUpdate(ReviewUpdateDto.Request request, Long reviewId, User user)
            throws IllegalAccessException {
        Review review = reviewRepository.findById(reviewId).get();

        Date now = new Date();

        if (user.getType() != AuthType.USER) {
            throw new IllegalAccessException("가이드는 리뷰를 등록할 수 없습니다.");
        }

        if (review.getUserId() != user.getId()) {
            throw new IllegalAccessException("해당 리뷰의 작성자만 수정 가능합니다");
        }

        review = request.toUpdate(review, now);
        reviewRepository.save(review);
    }
}
