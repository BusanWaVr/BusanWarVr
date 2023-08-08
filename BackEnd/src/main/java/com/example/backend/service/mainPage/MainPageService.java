package com.example.backend.service.mainPage;

import com.example.backend.dto.mainPage.DeadlineTourDto;
import com.example.backend.dto.mainPage.GuideRecommendDto;
import com.example.backend.dto.mainPage.NearDeadlineTourDto;
import com.example.backend.dto.mainPage.TourRecommendDto;
import com.example.backend.model.enums.AuthType;
import com.example.backend.model.follower.Follower;
import com.example.backend.model.follower.FollowerRepository;
import com.example.backend.model.review.Review;
import com.example.backend.model.review.ReviewRepository;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.tour.TourRepository;
import com.example.backend.model.tourimage.TourImage;
import com.example.backend.model.tourimage.TourImageRepository;
import com.example.backend.model.user.User;
import com.example.backend.model.user.UserRepository;
import com.example.backend.model.usercategory.UserCategory;
import com.example.backend.model.usercategory.UserCategoryRepository;
import com.example.backend.util.category.CategoryUtil;
import com.example.backend.util.image.ImageUtil;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MainPageService {

    private final TourRepository tourRepository;
    private final UserCategoryRepository userCategoryRepository;
    private final TourImageRepository tourImageRepository;
    private final UserRepository userRepository;
    private final FollowerRepository followerRepository;
    private final ReviewRepository reviewRepository;
    private final CategoryUtil categoryUtil;
    private final ImageUtil imageUtil;

    public Page<TourRecommendDto> tourRecommend(User user, Pageable pageable) {
        List<Tour> tours = tourRepository.findByIsEndedFalseOrderByStartDate();
        List<TourRecommendDto> tourRecommendDtoList = new ArrayList<>();
        List<UserCategory> userCategoryList = userCategoryRepository.findAllByUser(user);

        for (Tour tour : tours) {
            Long tourId = tour.getId();

            List<String> tourCategories = new ArrayList<>();
            categoryUtil.tourCategoryList(tourId, tourCategories);

            if (tour.isEnded() || tour.isCanceled()
                    || tour.getCurrentMember() >= tour.getMaxMember()) {
                continue;
            }

            if (!categoryUtil.isContainCategory(userCategoryList, tourCategories)) {
                continue;
            }

            List<String> tourImageUrls = new ArrayList<>();
            imageUtil.tourImageUrlList(tourId, tourImageUrls);

            tourRecommendDtoList.add(
                    new TourRecommendDto(tour, tourCategories, tourImageUrls));
        }

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), tourRecommendDtoList.size());

        return new PageImpl<>(tourRecommendDtoList.subList(start, end), pageable,
                tourRecommendDtoList.size());
    }

    public NearDeadlineTourDto.Response getNearDeadlineTourList() {
        List<Tour> tours = tourRepository.findAll();
        List<DeadlineTourDto> tourDtoList = new ArrayList<>();

        Date now = new Date();

        for (Tour tour : tours) {
            List<TourImage> tourImages = tourImageRepository.findAllByTourId(tour.getId());

            TourImage firstImage = tourImages.isEmpty() ? null : tourImages.get(0);

            boolean isCanceled = tour.isCanceled();
            long timeDifference = tour.getStartDate().getTime() - now.getTime();

            List<String> tourCategories = new ArrayList<>();
            categoryUtil.tourCategoryList(tour.getId(), tourCategories);

            if (!isCanceled && timeDifference > 0 && timeDifference < 86400000) {
                DeadlineTourDto deadlineTourDto = new DeadlineTourDto(
                        tour,
                        firstImage != null ? firstImage.getImage().getUrl() : null,
                        tourCategories
                );

                tourDtoList.add(deadlineTourDto);
            }
        }
        return new NearDeadlineTourDto.Response(tourDtoList);
    }

    public Page<GuideRecommendDto> guideRecommend(Pageable pageable) {
        List<User> guideList = userRepository.findAllByType(AuthType.GUIDE);
        List<GuideRecommendDto> guideRecommendDtoList = new ArrayList<>();

        for (User user : guideList) {
            List<Follower> followers = followerRepository.findAllByGuideId(user.getId());
            int followerNum = followers.size();
            List<Tour> tours = tourRepository.findAllByUserId(user.getId());
            int tourNumbers = tours.size();

            double totalScore = 0;
            int reviewSize = 0;
            for (Tour tour : tours) {
                List<Review> reviewList = reviewRepository.findAllByTourId(tour.getId());
                for (Review review : reviewList) {
                    totalScore += review.getScore();
                    reviewSize++;
                }
            }
            double averageScore = totalScore / reviewSize;

            LocalDate latestTourDate = calculateLatestTourDate(tours); // 최근 투어 날짜 계산

            if (tourNumbers != 0) {
                guideRecommendDtoList.add(
                        new GuideRecommendDto(user, followerNum, tourNumbers, averageScore,
                                latestTourDate));

                Comparator<GuideRecommendDto> GuideComparator = Comparator.comparing(
                        GuideRecommendDto::getLatestTourDate);
                Collections.sort(guideRecommendDtoList, Collections.reverseOrder(GuideComparator));
            }

        }

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), guideRecommendDtoList.size());

        return new PageImpl<>(guideRecommendDtoList.subList(start, end), pageable,
                guideRecommendDtoList.size());

    }

    public LocalDate calculateLatestTourDate(List<Tour> tours) {

        LocalDate latestDate = LocalDate.MIN; // 날짜 비교를 위해 가장 작은 값으로 초기화

        for (Tour tour : tours) {
            LocalDate tourDate = tour.getStartDate().toInstant().atZone(ZoneId.systemDefault())
                    .toLocalDate();
            if (tourDate.isAfter(latestDate)) {
                latestDate = tourDate;
            }
        }

        return latestDate;
    }
}
