package com.example.backend.service;

import com.example.backend.dto.userinfo.GuideEndedToursDto;
import com.example.backend.dto.userinfo.GuideInfoDto;
import com.example.backend.dto.userinfo.GuideHomeDto;
import com.example.backend.dto.userinfo.GuideInfoForUserFollowDto;
import com.example.backend.dto.userinfo.GuideInfoForUserTourDto;
import com.example.backend.dto.userinfo.GuideInfoForUserWishDto;
import com.example.backend.dto.userinfo.GuideReviewsDto;
import com.example.backend.dto.userinfo.GuideScheduledToursDto;
import com.example.backend.dto.userinfo.ReviewInfoForGuideReviewDto;
import com.example.backend.dto.userinfo.TourInfoForGuideEndedTours;
import com.example.backend.dto.userinfo.TourInfoForGuideScheduledToursDto;
import com.example.backend.dto.userinfo.TourInfoForUserTourDto;
import com.example.backend.dto.userinfo.UserFollowDto;
import com.example.backend.dto.userinfo.UserInfoDto;
import com.example.backend.dto.userinfo.UserInfoDto.Response;
import com.example.backend.dto.userinfo.UserInfoForGuideReviewsDto;
import com.example.backend.dto.userinfo.UserTourDto;
import com.example.backend.dto.userinfo.UserWishDto;
import com.example.backend.dto.userinfo.UserWishTourDto;
import com.example.backend.model.follower.Follower;
import com.example.backend.model.follower.FollowerRepository;
import com.example.backend.model.joiner.Joiner;
import com.example.backend.model.joiner.JoinerRepository;
import com.example.backend.model.review.Review;
import com.example.backend.model.review.ReviewRepository;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.tour.TourRepository;
import com.example.backend.model.tourcategory.TourCategory;
import com.example.backend.model.tourcategory.TourCategoryRepository;
import com.example.backend.model.tourimage.TourImage;
import com.example.backend.model.tourimage.TourImageCustomRepoistory;
import com.example.backend.model.tourimage.TourImageRepository;
import com.example.backend.model.user.User;
import com.example.backend.model.user.UserRepository;
import com.example.backend.model.wish.Wish;
import com.example.backend.model.wish.WishRepository;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserInfoService {

    private final UserRepository userRepository;
    private final TourRepository tourRepository;
    private final TourCategoryRepository tourCategoryRepository;
    private final TourImageRepository tourImageRepository;
    private final TourImageCustomRepoistory tourImageCustomRepoistory;
    private final WishRepository wishRepository;
    private final FollowerRepository followerRepository;
    private final ReviewRepository reviewRepository;
    private final JoinerRepository joinerRepository;


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

            GuideInfoForUserWishDto guide = new GuideInfoForUserWishDto();
            guide.setId(tourGuide.getId());
            guide.setName(tourGuide.getNickname());

            wishList.add(new UserWishTourDto(tour, categoryList, guide));
        }
        return new UserWishDto.Response(wishList);
    }

    @Transactional
    public boolean userFollow(Long userId, Long guideId) {

        User user = userRepository.findById(userId).get();
        User guide = userRepository.findById(guideId).get();

        if (user.getType().toString() == "GUIDE") {
            throw new IllegalArgumentException("가이드는 팔로잉할 수 없습니다.");
        }

        if (guide.getType().toString() == "USER") {
            throw new IllegalArgumentException("유저를 팔로우할 수 없습니다.");
        }

        if (followerRepository.existsByUserAndGuide(user, guide)) {
            followerDelete(user, guide);
            return false;
        } else {
            followerCreate(user, guide);
            return true;
        }
    }

    public void followerCreate(User user, User guide) {
        Follower follower = new Follower();
        follower.setUser(user);
        follower.setGuide(guide);
        followerRepository.save(follower);
    }

    public void followerDelete(User user, User guide) {
        followerRepository.deleteByUserAndGuide(user, guide);
    }

    public UserFollowDto.Response getFollowingGuideList(User user, Pageable pageable) {
        List<Follower> followingGuideList = followerRepository.findAllByUser(user, pageable);
        List<GuideInfoForUserFollowDto> responseList = new ArrayList<>();

        for (Follower followingGuide : followingGuideList) {

            User guide = followingGuide.getGuide();

            List<Follower> followedGuideList = followerRepository.findAllByGuide(
                    guide);
            List<Tour> guideTourList = tourRepository.findAllByUserId(
                    guide.getId());
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

            GuideInfoForUserFollowDto guideInfo = new GuideInfoForUserFollowDto(
                    guide,
                    followedGuideList.size(),
                    guideTourList.size(),
                    averageScore
            );

            responseList.add(guideInfo);
        }

        return new UserFollowDto.Response(responseList);
    }

    public GuideScheduledToursDto.Response getGuideScheduledTours(User guide, Pageable pageable) {
        List<Tour> tourLists = tourRepository.findAllByUserId(guide.getId(), pageable);
        List<TourInfoForGuideScheduledToursDto> responseList = new ArrayList<>();
        List<TourImage> tourImages = tourImageCustomRepoistory.findTourImagesByGuide(guide,
                pageable);

        Date now = new Date();

        Map<Long, TourImage> tourIdToImageMap = new HashMap<>();
        for (TourImage tourImage : tourImages) {
            Long tourId = tourImage.getTour().getId();
            if (!tourIdToImageMap.containsKey(tourId)) {
                tourIdToImageMap.put(tourId, tourImage);
            } else {
                Long existingImageId = tourIdToImageMap.get(tourId).getImage().getId();
                if (tourImage.getImage().getId() < existingImageId) {
                    tourIdToImageMap.put(tourId, tourImage);
                }
            }
        }

        for (Tour tour : tourLists) {

            Date startDate = tour.getStartDate();
            TourInfoForGuideScheduledToursDto scheduledToursDto = new TourInfoForGuideScheduledToursDto();

            if (startDate.after(now)) {
                scheduledToursDto.setTourId(tour.getId());
                scheduledToursDto.setTitle(tour.getTitle());

                TourImage tourImage = tourIdToImageMap.get(tour.getId());
                if (tourImage != null) {
                    scheduledToursDto.setImage(tourImage.getImage().getUrl());
                } else {
                    scheduledToursDto.setImage(null);
                }
                responseList.add(scheduledToursDto);
            }
        }
        return new GuideScheduledToursDto.Response(responseList);
    }

    public GuideEndedToursDto.Response getGuideEndedTours(User guide, Pageable pageable) {
        List<Tour> tourLists = tourRepository.findAllByUserId(guide.getId(), pageable);
        List<TourInfoForGuideEndedTours> responseList = new ArrayList<>();
        List<TourImage> tourImages = tourImageCustomRepoistory.findTourImagesByGuide(guide,
                pageable);

        Map<Long, TourImage> tourIdToImageMap = new HashMap<>();
        for (TourImage tourImage : tourImages) {
            Long tourId = tourImage.getTour().getId();
            if (!tourIdToImageMap.containsKey(tourId)) {
                tourIdToImageMap.put(tourId, tourImage);
            } else {
                Long existingImageId = tourIdToImageMap.get(tourId).getImage().getId();
                if (tourImage.getImage().getId() < existingImageId) {
                    tourIdToImageMap.put(tourId, tourImage);
                }
            }
        }

        for (Tour tour : tourLists) {

            boolean isEnded = tour.isEnded();
            TourInfoForGuideEndedTours endedToursDto = new TourInfoForGuideEndedTours();

            if (isEnded) {
                endedToursDto.setTourId(tour.getId());
                endedToursDto.setTitle(tour.getTitle());

                TourImage tourImage = tourIdToImageMap.get(tour.getId());
                if (tourImage != null) {
                    endedToursDto.setImage(tourImage.getImage().getUrl());
                } else {
                    endedToursDto.setImage(null);
                }
                responseList.add(endedToursDto);
            }
        }
        return new GuideEndedToursDto.Response(responseList);
    }

    public UserInfoDto.Response getUserInfo(Long userId) {
        User user = userRepository.findById(userId).get();
        List<Follower> followings = followerRepository.findAllByUserId(userId);
        int followingNum = followings.size();
        UserInfoDto.Response response = new UserInfoDto.Response(user, followingNum);
        return response;
    }

    public GuideInfoDto.Response getGuideInfo(Long guideId) {
        User user = userRepository.findById(guideId).get();
        List<Follower> followers = followerRepository.findAllByGuideId(guideId);
        int followerNum = followers.size();
        List<Tour> tours = tourRepository.findAllByUserId(guideId);
        int tourNumbers = tours.size();
        GuideInfoDto.Response response = new GuideInfoDto.Response(user, followerNum, tourNumbers);
        return response;
    }

    public GuideReviewsDto.Response getGuideReviews(User guide, Pageable pageable) {
        List<Tour> tourList = tourRepository.findAllByUserId(guide.getId());
        List<ReviewInfoForGuideReviewDto> responseList = new ArrayList<>();

        for (Tour tour : tourList) {
            List<Review> reviewsList = reviewRepository.findAllByTourId(tour.getId(), pageable);
            for (Review review : reviewsList) {

                User user = userRepository.findById(review.getUserId()).get();

                UserInfoForGuideReviewsDto userInfo = new UserInfoForGuideReviewsDto(user);

                ReviewInfoForGuideReviewDto reviewInfo = new ReviewInfoForGuideReviewDto(tour, review, userInfo);

                responseList.add(reviewInfo);
            }
        }
        return new GuideReviewsDto.Response(responseList);
    }

    public GuideHomeDto.Response guideHome(User guide, Pageable pageable) {
        GuideHomeDto.Response response = new GuideHomeDto.Response();
        response.setIntroduction(guide.getIntroduction());

        GuideScheduledToursDto.Response scheduledToursResponse = getGuideScheduledTours(guide, pageable);
        response.setScheduledTours(scheduledToursResponse.getScheduledTours());

        GuideEndedToursDto.Response endedToursResponse = getGuideEndedTours(guide, pageable);
        response.setEndedTours(endedToursResponse.getEndedTours());

        GuideReviewsDto.Response reviewsResponse = getGuideReviews(guide, pageable);
        response.setReviews(reviewsResponse.getReviews());

        return response;
    }

    public UserTourDto.Response getUserTour(User user) {
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

            if (startDate.after(now)) {
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

        GuideInfoForUserTourDto guideInfo = new GuideInfoForUserTourDto(guide);
        TourInfoForUserTourDto tourInfo = new TourInfoForUserTourDto(tour, guideInfo);

        return tourInfo;
    }
}
