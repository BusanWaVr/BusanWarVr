package com.example.backend.service;

import com.example.backend.dto.CourseDto;
import com.example.backend.dto.Response;
import com.example.backend.dto.TourDetailDto;
import com.example.backend.dto.TourRegistDto;
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
import com.example.backend.model.tour.Tour;
import com.example.backend.model.tour.TourRepository;
import com.example.backend.model.tourcategory.TourCategory;
import com.example.backend.model.tourcategory.TourCategoryRepository;
import com.example.backend.model.tourimage.TourImage;
import com.example.backend.model.tourimage.TourImageRepository;
import com.example.backend.model.user.User;
import com.example.backend.util.awsS3.S3Uploader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@AllArgsConstructor
public class TourService {

    private final TourRepository tourResitory;
    private final CourseRepository courseRepository;
    private final CategoryRepository categoryRepository;
    private final TourCategoryRepository tourCategoryRepository;
    private final TourImageRepository tourImageRepository;
    private final ImageRepository imageRepository;
    private final CourseImageRepository courseImageRepository;
    private final JoinerRepository joinerRepository;
    private final S3Uploader s3Uploader;

    @Transactional
    public void tourRegist(TourRegistDto.Request request, User user)
            throws IOException, IllegalAccessException {
        System.out.println(user.getType());
        System.out.println(AuthType.GUIDE);
        if(user.getType() == AuthType.GUIDE){
            Tour tour = request.toTour(user);
            tourResitory.save(tour);

            // 투어 이미지 저장해 url 가져와서 Image 객체 생성 및 저장
            List<Image> tourImages = new ArrayList<>();
            for (int i = 0; i < request.getTourImgs().size(); i++) {
                MultipartFile file = request.getTourImgs().get(i);
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

            // 가이드가 선택한 카테고리 이름들을 Category 객체로 변환하고 저장
            for (String categoryName : request.getCategory()) {
                if (categoryRepository.findByName(categoryName) != null) {
                    tourCategoryCreate(tour, categoryRepository.findByName(categoryName));
                }
                else {
                    throw new IllegalAccessException("등록된 카테고리만 추가 가능합니다.");
                }
            }

            // Course 객체 생성 및 저장
            for (CourseDto.Request courseDto : request.getCourses()) {
                Course course = new Course(courseDto.getLon(), courseDto.getLat(), courseDto.getTitle(),
                        courseDto.getContent(), tour.getId());
                courseRepository.save(course);

                Image image = saveImage(courseDto.getImage());

                // CourseImage 객체 생성 및 저장
                CourseImage courseImage = new CourseImage();
                courseImage.setCourse(course);
                courseImage.setImage(image);
                courseImageRepository.save(courseImage);

            }
        }
        else{
            throw new IllegalAccessException("가이드만 투어 등록이 가능합니다.");
        }
    }

    // 이미지 저장해 url 가져와서 Image 객체 생성 및 저장
    public Image saveImage(MultipartFile imageFile) throws IOException, IllegalAccessException {
        String fileUrl = s3Uploader.upload(imageFile);
        Image image = new Image(fileUrl);
        imageRepository.save(image);
        return image;
    }

    public void tourCategoryCreate(Tour tour, Category category) {
        TourCategory tourCategory = new TourCategory();
        tourCategory.setTour(tour);
        tourCategory.setCategory(category);
        tourCategory.setDate(new Date());
        tourCategoryRepository.save(tourCategory);
    }

    public TourDetailDto.Response tourDetail(Long tourId) {
        Tour tour = tourResitory.findById(tourId).get();
        List<TourCategory> categories = tourCategoryRepository.findAllByTourId(tourId);
        List<String> tourCategories = new ArrayList<>();
        for (TourCategory tourCategory : categories) {
            Category category = tourCategory.getCategory();
            tourCategories.add(category.getName());
        }
        List<TourImage> tourImages = tourImageRepository.findAllByTourId(tourId);
        List<String> tourImageUrls = new ArrayList<>();
        for (TourImage tourImage : tourImages) {
            tourImageUrls.add(tourImage.getImage().getUrl());
        }
        List<Course> courses = courseRepository.findAllByTourId(tourId);
        List<CourseDto.Response> courseDtos = new ArrayList<>();
        for (Course course : courses) {
            CourseImage courseImage = courseImageRepository.findByCourseId(course.getId());
            String imageUrl = courseImage.getImage().getUrl();
            CourseDto.Response courseDto = new CourseDto.Response(course, imageUrl);
            courseDtos.add(courseDto);
        }
        List<Joiner> joinerList = joinerRepository.findAllByTourId(tourId);

        return new TourDetailDto.Response(tour, tourCategories, tourImageUrls, courseDtos, joinerList);
    }
}


