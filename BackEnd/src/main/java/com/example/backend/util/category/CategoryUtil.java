package com.example.backend.util.category;

import com.example.backend.model.category.Category;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.tourcategory.TourCategory;
import com.example.backend.model.tourcategory.TourCategoryRepository;
import com.example.backend.model.user.User;
import com.example.backend.model.usercategory.UserCategory;
import com.example.backend.model.usercategory.UserCategoryRepository;
import java.util.Date;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CategoryUtil {

    private final TourCategoryRepository tourCategoryRepository;
    private final UserCategoryRepository userCategoryRepository;

    public void tourCategoryCreate(Tour tour, Category category) {
        TourCategory tourCategory = new TourCategory();
        tourCategory.setTour(tour);
        tourCategory.setCategory(category);
        tourCategory.setDate(new Date());
        tourCategoryRepository.save(tourCategory);
    }

    public void tourCategoryList(Long tourId, List<String> tourCategories) {
        List<TourCategory> categories = tourCategoryRepository.findAllByTourId(tourId);
        for (TourCategory tourCategory : categories) {
            Category category = tourCategory.getCategory();
            tourCategories.add(category.getName());
        }
    }

    public boolean isContainCategory(List<UserCategory> userCategoryList,
            List<String> tourCategories) {
        for (UserCategory userCategory : userCategoryList) {
            if (tourCategories.contains(userCategory.getCategory().getName())) {
                System.out.println("true");
                return true;
            }
        }
        return false;
    }

    public void userCategoryList(User user, List<String> userCategories) {
        List<UserCategory> categories = userCategoryRepository.findAllByUser(user);
        for (UserCategory userCategory : categories) {
            Category category = userCategory.getCategory();
            userCategories.add(category.getName());
        }
    }
}
