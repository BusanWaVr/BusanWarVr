package com.example.backend.service.tour;

import com.example.backend.dto.course.CourseDto;
import com.example.backend.dto.tour.TourUpdateDto;
import com.example.backend.model.category.CategoryRepository;
import com.example.backend.model.course.Course;
import com.example.backend.model.course.CourseRepository;
import com.example.backend.model.courseimage.CourseImage;
import com.example.backend.model.courseimage.CourseImageRepository;
import com.example.backend.model.enums.AuthType;
import com.example.backend.model.image.Image;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.tour.TourRepository;
import com.example.backend.model.tourcategory.TourCategory;
import com.example.backend.model.tourcategory.TourCategoryRepository;
import com.example.backend.model.tourimage.TourImage;
import com.example.backend.model.tourimage.TourImageRepository;
import com.example.backend.model.user.User;
import com.example.backend.util.category.CategoryUtil;
import com.example.backend.util.course.CourseUtil;
import com.example.backend.util.image.ImageUtil;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class TourUpdateService {

    private final TourRepository tourRepository;
    private final TourCategoryRepository tourCategoryRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryUtil categoryUtil;
    private final TourImageRepository tourImageRepository;
    private final ImageUtil imageUtil;
    private final CourseRepository courseRepository;
    private final CourseImageRepository courseImageRepository;
    private final CourseUtil courseUtil;

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
                categoryUtil.tourCategoryCreate(tour, categoryRepository.findByName(categoryName));
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
                Image image = imageUtil.saveImage(file);
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
                    courseRepository.delete(course);
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
                Image image = imageUtil.saveImage(courseDto.getImage());

                // CourseImage 객체 생성 및 저장
                CourseImage courseImage = new CourseImage();
                courseImage.setCourse(course);
                courseImage.setImage(image);
                courseImageRepository.save(courseImage);
            }
        }

        List<String> tourCategories = new ArrayList<>();
        categoryUtil.tourCategoryList(tourId, tourCategories);

        List<String> tourImageUrls = new ArrayList<>();
        imageUtil.tourImageUrlList(tourId, tourImageUrls);

        List<CourseDto.Response> courseDtos = new ArrayList<>();
        courseUtil.courseDtoList(tourId, courseDtos);

        TourUpdateDto.Response response = new TourUpdateDto.Response(tour, tourCategories,
                tourImageUrls, courseDtos);

        return response;
    }
}
