package com.example.backend.service.tour;

import com.example.backend.dto.course.CourseDto;
import com.example.backend.dto.joiner.JoinerDto;
import com.example.backend.dto.tour.ReviewDetailDto;
import com.example.backend.dto.tour.ReviewRegistDto;
import com.example.backend.dto.tour.ReviewUpdateDto;
import com.example.backend.dto.tour.TourDetailDto;
import com.example.backend.dto.tour.TourDto;
import com.example.backend.dto.tour.TourListDto;
import com.example.backend.dto.tour.TourRegistDto;
import com.example.backend.dto.tour.TourReservationCancelDto;
import com.example.backend.dto.tour.TourReservationDto;
import com.example.backend.dto.tour.TourSearchInfoDto;
import com.example.backend.dto.tour.TourUpdateDto;
import com.example.backend.model.category.Category;
import com.example.backend.model.category.CategoryRepository;
import com.example.backend.model.course.Course;
import com.example.backend.model.course.CourseCustomRepository;
import com.example.backend.model.course.CourseRepository;
import com.example.backend.model.course.qdto.CourseCustomDto;
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
import com.example.backend.model.tour.TourCustomRepository;
import com.example.backend.model.tour.TourRepository;
import com.example.backend.model.tour.qdto.SearchTourDto;
import com.example.backend.model.tourcategory.TourCategory;
import com.example.backend.model.tourcategory.TourCategoryRepository;
import com.example.backend.model.tourimage.TourImage;
import com.example.backend.model.tourimage.TourImageRepository;
import com.example.backend.model.user.User;
import com.example.backend.model.user.UserRepository;
import com.example.backend.model.wish.Wish;
import com.example.backend.model.wish.WishRepository;
import com.example.backend.util.awsS3.S3Uploader;
import com.example.backend.util.category.CategoryUtil;
import com.example.backend.util.course.CourseUtil;
import com.example.backend.util.image.ImageUtil;
import com.example.backend.util.joiner.JoinerUtil;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@AllArgsConstructor
public class TourService {

    private final TourRepository tourRepository;
    private final JoinerRepository joinerRepository;
    private final WishRepository wishRepository;


    public void tourReservation(Long tourId, User user) {
        Tour tour = tourRepository.findById(tourId).get();
        TourReservationDto tourReservationDto = new TourReservationDto(tour);
        if(tour.isCanceled() || tour.isEnded()){
            throw new IllegalArgumentException("이미 종료되었거나 취소된 투어입니다.");
        }
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

    public boolean tourWish(Long tourId, User user) throws IllegalAccessException {
        List<Wish> wishList = wishRepository.findAllByUserId(user.getId());
        if (user.getType() != AuthType.USER) {
            throw new IllegalAccessException("가이드는 찜하기를 할 수 없습니다.");
        }
        boolean isUnWished = true;
        for (Wish wish : wishList) {
            // 이미 찜 되어있으면 찜 취소
            if (wish.getTour().getId() == tourId) {
                wishRepository.delete(wish);
                isUnWished = false;
                return false;
            }
        }
        // 찜하기 안 되어 있으면 찜
        if (isUnWished) {
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
            throw new IllegalAccessException("가이드만 투어 종료 가능합니다.");
        } else {
            throw new IllegalAccessException("해당 투어의 작성자 가이드만 투어 종료 가능합니다.");
        }
    }
}
