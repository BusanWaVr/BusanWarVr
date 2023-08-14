package com.example.backend.service.user;

import com.example.backend.dto.course.CourseDto;
import com.example.backend.dto.joiner.JoinerDto;
import com.example.backend.dto.tour.CanceledTourDto;
import com.example.backend.dto.userinfo.GuideCanceledToursDto;
import com.example.backend.dto.userinfo.GuideEndedToursDto;
import com.example.backend.dto.userinfo.GuideFollowerDto;
import com.example.backend.dto.userinfo.GuideHomeDto;
import com.example.backend.dto.userinfo.GuideInfoDto;
import com.example.backend.dto.userinfo.GuideReviewsDto;
import com.example.backend.dto.userinfo.GuideScheduledToursDto;
import com.example.backend.dto.userinfo.ReviewInfoForGuideReviewDto;
import com.example.backend.dto.userinfo.TourInfoForGuideEndedTours;
import com.example.backend.dto.userinfo.TourInfoForGuideScheduledToursDto;
import com.example.backend.dto.userinfo.UserInfoForGuideReviewsDto;
import com.example.backend.model.follower.Follower;
import com.example.backend.model.follower.FollowerRepository;
import com.example.backend.model.review.Review;
import com.example.backend.model.review.ReviewRepository;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.tour.TourRepository;
import com.example.backend.model.tourimage.TourImage;
import com.example.backend.model.tourimage.TourImageCustomRepoistory;
import com.example.backend.model.user.User;
import com.example.backend.model.user.UserRepository;
import com.example.backend.util.category.CategoryUtil;
import com.example.backend.util.course.CourseUtil;
import com.example.backend.util.image.ImageUtil;
import com.example.backend.util.joiner.JoinerUtil;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GuideInfoGetService {

    private final UserRepository userRepository;
    private final FollowerRepository followerRepository;
    private final TourRepository tourRepository;
    private final ReviewRepository reviewRepository;
    private final TourImageCustomRepoistory tourImageCustomRepoistory;
    private final CategoryUtil categoryUtil;
    private final ImageUtil imageUtil;
    private final CourseUtil courseUtil;
    private final JoinerUtil joinerUtil;

    public GuideScheduledToursDto.Response guideScheduledToursService(Long guideId,
            Pageable pageable) throws IllegalAccessException {
        User guide = userRepository.findById(guideId).get();
        if (guide.getType().toString() == "USER") {
            throw new IllegalAccessException("가이드가 아닙니다!");
        }
        return getGuideScheduledTours(guide, pageable);
    }

    public GuideEndedToursDto.Response guideEndedToursService(Long guideId, Pageable pageable)
            throws IllegalAccessException {
        User guide = userRepository.findById(guideId).get();
        if (guide.getType().toString() == "USER") {
            throw new IllegalAccessException("가이드가 아닙니다!");
        }
        return getGuideEndedTours(guide, pageable);
    }

    public GuideScheduledToursDto.Response getGuideScheduledTours(User guide, Pageable pageable) {
        List<Tour> tourLists = tourRepository.findAllByUserId(guide.getId());
        List<TourInfoForGuideScheduledToursDto> responseList = new ArrayList<>();
        List<TourImage> tourImages = tourImageCustomRepoistory.findTourImagesByGuide(guide);

        Date now = new Date();

        Map<Long, TourImage> tourIdToImageMap = new HashMap<>();
        tourIdToImage(tourImages, tourIdToImageMap);

        for (Tour tour : tourLists) {

            boolean isCanceled = tour.isCanceled();

            Date startDate = tour.getStartDate();
            TourInfoForGuideScheduledToursDto scheduledToursDto = new TourInfoForGuideScheduledToursDto();

            if (!isCanceled && startDate.after(now)) {
                scheduledToursDto.setTourId(tour.getId());
                scheduledToursDto.setUid(tour.getUid());
                scheduledToursDto.setTitle(tour.getTitle());
                scheduledToursDto.setStartDate(tour.getStartDate());
                scheduledToursDto.setEndDate(tour.getEndDate());

                TourImage tourImage = tourIdToImageMap.get(tour.getId());
                if (tourImage != null) {
                    scheduledToursDto.setImage(tourImage.getImage().getUrl());
                } else {
                    scheduledToursDto.setImage(null);
                }
                responseList.add(scheduledToursDto);
            }
        }
        // 페이징 적용
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), responseList.size());
        Page<TourInfoForGuideScheduledToursDto> page = new PageImpl<>(
                responseList.subList(start, end), pageable, responseList.size());
        return new GuideScheduledToursDto.Response(page.getContent());
    }

    public GuideEndedToursDto.Response getGuideEndedTours(User guide, Pageable pageable) {
        List<Tour> tourLists = tourRepository.findAllByUserId(guide.getId());
        List<TourInfoForGuideEndedTours> responseList = new ArrayList<>();
        List<TourImage> tourImages = tourImageCustomRepoistory.findTourImagesByGuide(guide);

        Map<Long, TourImage> tourIdToImageMap = new HashMap<>();
        tourIdToImage(tourImages, tourIdToImageMap);

        for (Tour tour : tourLists) {
            boolean isEnded = tour.isEnded();
            TourInfoForGuideEndedTours endedToursDto = new TourInfoForGuideEndedTours();

            if (isEnded) {
                endedToursDto.setTourId(tour.getId());
                endedToursDto.setTitle(tour.getTitle());

                TourImage tourImage = tourIdToImageMap.get(tour.getId());
                if (tourImage != null) {
                    endedToursDto.setImage(tourImage.getImage().getUrl());
                    responseList.add(endedToursDto);
                }
                endedToursDto.setImage(null);
                responseList.add(endedToursDto);
            }
        }

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), responseList.size());
        Page<TourInfoForGuideEndedTours> page = new PageImpl<>(responseList.subList(start, end),
                pageable, responseList.size());
        return new GuideEndedToursDto.Response(page.getContent());
    }

    public void tourIdToImage(List<TourImage> tourImages, Map<Long, TourImage> tourIdToImageMap) {
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
    }

    public GuideInfoDto.Response getGuideInfo(Long guideId) throws IllegalAccessException {
        User user = userRepository.findById(guideId).get();
        if (user.getType().toString() == "USER") {
            throw new IllegalAccessException("가이드가 아닙니다!");
        }
        List<Follower> followers = followerRepository.findAllByGuideId(guideId);
        int followerNum = followers.size();
        List<Tour> tours = tourRepository.findAllByUserId(guideId);
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

        GuideInfoDto.Response response = new GuideInfoDto.Response(user, followerNum, tourNumbers,
                averageScore);
        return response;
    }

    public GuideReviewsDto.Response guideReviewsService(Long guideId, Pageable pageable)
            throws IllegalAccessException {
        User guide = userRepository.findById(guideId).get();
        if (guide.getType().toString() == "USER") {
            throw new IllegalAccessException("가이드가 아닙니다!");
        }
        return getGuideReviews(guide, pageable);
    }

    public GuideReviewsDto.Response getGuideReviews(User guide, Pageable pageable) {
        List<Tour> tourList = tourRepository.findAllByUserId(guide.getId());
        List<ReviewInfoForGuideReviewDto> responseList = new ArrayList<>();

        for (Tour tour : tourList) {
            List<Review> reviewsList = reviewRepository.findAllByTourId(tour.getId(), pageable);
            for (Review review : reviewsList) {

                User user = userRepository.findById(review.getUserId()).get();

                UserInfoForGuideReviewsDto userInfo = new UserInfoForGuideReviewsDto(user);

                ReviewInfoForGuideReviewDto reviewInfo = new ReviewInfoForGuideReviewDto(tour,
                        review, userInfo);

                responseList.add(reviewInfo);
            }
        }
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), responseList.size());
        Page<ReviewInfoForGuideReviewDto> page = new PageImpl<>(responseList.subList(start, end),
                pageable, responseList.size());
        return new GuideReviewsDto.Response(page.getContent());
    }

    public GuideHomeDto.Response guideHome(Long guideId, Pageable pageable)
            throws IllegalAccessException {
        GuideHomeDto.Response response = new GuideHomeDto.Response();
        User guide = userRepository.findById(guideId).get();
        if (guide.getType().toString() == "USER") {
            throw new IllegalAccessException("가이드가 아닙니다!");
        }
        response.setIntroduction(guide.getIntroduction());

        GuideScheduledToursDto.Response scheduledToursResponse = getGuideScheduledTours(guide,
                pageable);
        response.setScheduledTours(scheduledToursResponse.getScheduledTours());

        GuideEndedToursDto.Response endedToursResponse = getGuideEndedTours(guide, pageable);
        response.setEndedTours(endedToursResponse.getEndedTours());

        GuideReviewsDto.Response reviewsResponse = getGuideReviews(guide, pageable);
        response.setReviews(reviewsResponse.getReviews());

        return response;
    }

    public List<GuideFollowerDto> getGuideFollowerList(Long guideId) {
        List<Follower> followers = followerRepository.findAllByGuideId(guideId);
        List<GuideFollowerDto> response = new ArrayList<>();
        for (Follower follower : followers) {
            GuideFollowerDto guideFollower = new GuideFollowerDto(follower);
            response.add(guideFollower);
        }
        return response;
    }

    public GuideCanceledToursDto.Response getGuideCanceledTourList(Long guideId,
            Pageable pageable) {
        List<Tour> tours = tourRepository.findAllByUserId(guideId, pageable);
        List<CanceledTourDto> tourDtoList = new ArrayList<>();

        for (Tour tour : tours) {
            if (!tour.isCanceled() || tour.isEnded()) {
                continue;
            }
            Long tourId = tour.getId();

            List<String> tourCategories = new ArrayList<>();
            categoryUtil.tourCategoryList(tourId, tourCategories);

            List<String> tourImageUrls = new ArrayList<>();
            imageUtil.tourImageUrlList(tourId, tourImageUrls);

            List<CourseDto.Response> courseDtos = new ArrayList<>();
            courseUtil.courseDtoList(tourId, courseDtos);

            List<JoinerDto> joinerDtos = new ArrayList<>();
            joinerUtil.joinerDtoList(tourId, joinerDtos);

            tourDtoList.add(
                    new CanceledTourDto(tour, tourCategories, tourImageUrls, courseDtos,
                            joinerDtos));
        }

        return new GuideCanceledToursDto.Response(tourDtoList);
    }

}
