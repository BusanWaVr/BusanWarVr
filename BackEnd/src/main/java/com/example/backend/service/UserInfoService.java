package com.example.backend.service;

import com.example.backend.dto.GuideInfoForUserWishDto;
import com.example.backend.dto.UserWishDto;
import com.example.backend.dto.UserWishDto.Response;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.tourcategory.TourCategory;
import com.example.backend.model.tourcategory.TourCategoryRepository;
import com.example.backend.model.user.User;
import com.example.backend.model.user.UserRepository;
import com.example.backend.model.wish.Wish;
import com.example.backend.model.wish.WishRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserInfoService {

    private final UserRepository userRepository;
    private final TourCategoryRepository tourCategoryRepository;
    private final WishRepository wishRepository;


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

}
