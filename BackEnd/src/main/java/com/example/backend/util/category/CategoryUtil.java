package com.example.backend.util.category;

import com.example.backend.model.category.Category;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.tourcategory.TourCategory;
import com.example.backend.model.tourcategory.TourCategoryRepository;
import com.example.backend.model.usercategory.UserCategory;
import java.util.Date;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CategoryUtil {

    private final TourCategoryRepository tourCategoryRepository;

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

//    public Page<TourRecommendDto> tourRecommend(User user, Pageable pageable) {
//        List<Tour> tours = tourRepository.findByIsEndedFalseOrderByStartDate();
//        List<TourRecommendDto> tourRecommendDtoList = new ArrayList<>();
//        List<UserCategory> userCategoryList = userCategoryRepository.findAllByUser(user);
//
//        for (Tour tour : tours) {
//            Long tourId = tour.getId();
//
//            List<String> tourCategories = new ArrayList<>();
//            categoryUtil.tourCategoryList(tourId, tourCategories);
//
//            if (tour.isEnded() || tour.isCanceled()
//                    || tour.getCurrentMember() >= tour.getMaxMember()) {
//                continue;
//            }
//
//            if (!categoryUtil.isContainCategory(userCategoryList, tourCategories)) {
//                continue;
//            }
//
//            List<String> tourImageUrls = new ArrayList<>();
//            imageUtil.tourImageUrlList(tourId, tourImageUrls);
//
//            tourRecommendDtoList.add(
//                    new TourRecommendDto(tour, tourCategories, tourImageUrls));
//        }
//
//        int start = (int) pageable.getOffset();
//        int end = Math.min((start + pageable.getPageSize()), tourRecommendDtoList.size());
//
//        return new PageImpl<>(tourRecommendDtoList.subList(start, end), pageable, tourRecommendDtoList.size());
//    }
}
