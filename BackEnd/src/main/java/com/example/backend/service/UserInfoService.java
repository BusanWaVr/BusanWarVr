package com.example.backend.service;

import com.example.backend.dto.userinfo.GuideInfoForUserWishDto;
import com.example.backend.dto.userinfo.UserWishDto;
import com.example.backend.dto.userinfo.UserWishDto.Response;
import com.example.backend.model.follower.Follower;
import com.example.backend.model.follower.FollowerRepository;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.tourcategory.TourCategory;
import com.example.backend.model.tourcategory.TourCategoryRepository;
import com.example.backend.model.user.User;
import com.example.backend.model.user.UserRepository;
import com.example.backend.model.wish.Wish;
import com.example.backend.model.wish.WishRepository;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserInfoService {

    private final UserRepository userRepository;
    private final TourCategoryRepository tourCategoryRepository;
    private final WishRepository wishRepository;
    private final FollowerRepository followerRepository;


    public List<Response> getUserWishList(Long userId) {
        List<Wish> userWishLists = wishRepository.findAllByUserId(userId);
        List<UserWishDto.Response> responseList = new ArrayList<>();

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
            UserWishDto.Response response = new UserWishDto.Response(tour, categoryList, guide);
            responseList.add(response);
        }

        return responseList;

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
}
