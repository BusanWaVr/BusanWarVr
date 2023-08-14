package com.example.backend.service.user;

import com.example.backend.dto.userinfo.GuideInfoForUserFollowDto;
import com.example.backend.dto.userinfo.GuideInfoForUserTourDto;
import com.example.backend.dto.userinfo.GuideInfoForUserWishDto;
import com.example.backend.dto.userinfo.RemindTourDto;
import com.example.backend.dto.userinfo.TourInfoForUserTourDto;
import com.example.backend.dto.userinfo.TourStartRemindDto;
import com.example.backend.dto.userinfo.UserFollowDto;
import com.example.backend.dto.userinfo.UserInfoDto;
import com.example.backend.dto.userinfo.UserTourDto;
import com.example.backend.dto.userinfo.UserWishDto;
import com.example.backend.dto.userinfo.UserWishTourDto;
import com.example.backend.model.follower.Follower;
import com.example.backend.model.follower.FollowerRepository;
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
import com.example.backend.util.category.CategoryUtil;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserInfoGetService {

    private final WishRepository wishRepository;
    private final TourCategoryRepository tourCategoryRepository;
    private final UserRepository userRepository;
    private final FollowerRepository followerRepository;
    private final TourRepository tourRepository;
    private final ReviewRepository reviewRepository;
    private final JoinerRepository joinerRepository;
    private final TourImageRepository tourImageRepository;
    private final CategoryUtil categoryUtil;
    private final ImageRepository imageRepository;

    public UserWishDto.Response getUserWishList(Long userId, Pageable pageable) {
        List<Wish> userWishLists = wishRepository.findAllByUserId(userId, pageable);
        List<UserWishTourDto> wishList = new ArrayList<>();

        for (Wish wish : userWishLists) {
            Tour tour = wish.getTour();
            List<TourCategory> tourCategories = tourCategoryRepository.findAllByTourId(
                    tour.getId());
            List<String> categoryList = new ArrayList<>();

            for (TourCategory tourCategory : tourCategories) {
                categoryList.add(tourCategory.getCategory().getName());
            }

            User tourGuide = userRepository.findById(tour.getUserId()).get();

            GuideInfoForUserWishDto guide = new GuideInfoForUserWishDto(tourGuide);

            wishList.add(new UserWishTourDto(tour, categoryList, guide));
        }
        return new UserWishDto.Response(wishList);
    }

    public UserFollowDto.Response getFollowingGuideList(Long userId, Pageable pageable) {
        User user = userRepository.findById(userId).get();
        List<Follower> followingGuideList = followerRepository.findAllByUser(user, pageable);
        List<GuideInfoForUserFollowDto> responseList = new ArrayList<>();

        for (Follower followingGuide : followingGuideList) {

            User guide = followingGuide.getGuide();

            List<Follower> followedGuideList = followerRepository.findAllByGuide(guide);
            List<Tour> guideTourList = tourRepository.findAllByUserId(guide.getId());
            double totalScore = 0;
            int reviewSize = 0;
            for (Tour tour : guideTourList) {
                List<Review> reviewList = reviewRepository.findAllByTourId(tour.getId());
                for (Review review : reviewList) {
                    totalScore += review.getScore();
                    reviewSize++;
                }
            }
            double averageScore = totalScore / reviewSize;

            GuideInfoForUserFollowDto guideInfo = new GuideInfoForUserFollowDto(guide,
                    followedGuideList.size(), guideTourList.size(), averageScore);

            responseList.add(guideInfo);
        }

        return new UserFollowDto.Response(responseList);
    }

    public UserInfoDto.Response getUserInfo(Long userId) {
        User user = userRepository.findById(userId).get();
        List<String> categories = new ArrayList<>();
        categoryUtil.userCategoryList(user, categories);
        List<Follower> followings = followerRepository.findAllByUserId(userId);
        int followingNum = followings.size();
        List<Review> reviews = reviewRepository.findAllByUserId(userId);
        UserInfoDto.Response response = new UserInfoDto.Response(user, categories, followingNum, reviews);
        return response;
    }

    public UserTourDto.Response getUserTour(Long userId) {
        User user = userRepository.findById(userId).get();
        UserTourDto.Response response = new UserTourDto.Response();
        List<TourInfoForUserTourDto> scheduledTours = new ArrayList<>();
        List<TourInfoForUserTourDto> endedTours = new ArrayList<>();
        List<TourInfoForUserTourDto> canceledTours = new ArrayList<>();
        List<Joiner> joiners = joinerRepository.findAllByUserId(user.getId());
        Date now = new Date();

        for (Joiner joiner : joiners) {
            Tour tour = joiner.getTour();
            TourInfoForUserTourDto tourInfo = createTourInfoForUserTourDto(tour);

            Date startDate = tour.getStartDate();
            boolean isEnded = tour.isEnded();
            boolean isCanceled = tour.isCanceled();

            if (!isCanceled && startDate.after(now)) {
                scheduledTours.add(tourInfo);
            }

            if (isEnded) {
                endedTours.add(tourInfo);
            }

            if (isCanceled) {
                canceledTours.add(tourInfo);
            }
        }

        response.setScheduledTours(scheduledTours);
        response.setEndedTours(endedTours);
        response.setCanceledTours(canceledTours);

        return response;
    }

    private TourInfoForUserTourDto createTourInfoForUserTourDto(Tour tour) {

        User guide = userRepository.findById(tour.getUserId()).get();
        TourImage tourImage = tourImageRepository.findByTourId(tour.getId());
        GuideInfoForUserTourDto guideInfo = new GuideInfoForUserTourDto(guide);
        String tourImageUrl;
        if(tourImage == null){
            TourInfoForUserTourDto tourInfo = new TourInfoForUserTourDto(tour, null, guideInfo);
            return tourInfo;
        }
        tourImageUrl = tourImage.getImage().getUrl();
        TourInfoForUserTourDto tourInfo = new TourInfoForUserTourDto(tour, tourImageUrl, guideInfo);

        return tourInfo;
    }

    public TourStartRemindDto.Response getTourStartRemind(User user) {
        RemindTourDto remindTourDto = null;
        List<Joiner> joiners = joinerRepository.findAllByUserId(user.getId());
        Date now = new Date();

        for (Joiner joiner : joiners) {
            Tour tour = joiner.getTour();
            long timeDifference = tour.getStartDate().getTime() - now.getTime();
            List<TourImage> tourImages = tourImageRepository.findAllByTourId(tour.getId());
            TourImage firstImage = tourImages.isEmpty() ? null : tourImages.get(0);

            boolean isCanceled = tour.isCanceled();

            if (!isCanceled && timeDifference > 0 && timeDifference < 1800000) {
                remindTourDto = new RemindTourDto(tour,
                        firstImage != null ? firstImage.getImage().getUrl() : null
                );
                break;
            }
        }
        return new TourStartRemindDto.Response(remindTourDto);
    }
}