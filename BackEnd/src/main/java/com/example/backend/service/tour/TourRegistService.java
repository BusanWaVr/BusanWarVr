package com.example.backend.service.tour;

import com.example.backend.dto.course.CourseDto;
import com.example.backend.dto.tour.TourRegistDto;
import com.example.backend.model.category.CategoryRepository;
import com.example.backend.model.course.Course;
import com.example.backend.model.course.CourseRepository;
import com.example.backend.model.courseimage.CourseImage;
import com.example.backend.model.courseimage.CourseImageRepository;
import com.example.backend.model.enums.AuthType;
import com.example.backend.model.image.Image;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.tour.TourRepository;
import com.example.backend.model.tourimage.TourImage;
import com.example.backend.model.tourimage.TourImageRepository;
import com.example.backend.model.user.User;
import com.example.backend.util.category.CategoryUtil;
import com.example.backend.util.image.ImageUtil;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class TourRegistService {

    private final TourRepository tourRepository;
    private final TourImageRepository tourImageRepository;
    private final CategoryRepository categoryRepository;
    private final CourseRepository courseRepository;
    private final CourseImageRepository courseImageRepository;
    private final ImageUtil imageUtil;
    private final CategoryUtil categoryUtil;

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

        // 가이드가 선택한 카테고리 이름들을 TourCategory 객체로 변환하고 저장
        for (String categoryName : request.getCategory()) {
            if (categoryRepository.findByName(categoryName) != null) {
                categoryUtil.tourCategoryCreate(tour, categoryRepository.findByName(categoryName));
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
                Image image = imageUtil.saveImage(courseDto.getImage());

                // CourseImage 객체 생성 및 저장
                CourseImage courseImage = new CourseImage();
                courseImage.setCourse(course);
                courseImage.setImage(image);
                courseImageRepository.save(courseImage);
            }
        }
        return response;
    }

}
