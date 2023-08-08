package com.example.backend.service.mainPage;

import com.example.backend.dto.mainPage.TourRecommendDto;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.tour.TourRepository;
import com.example.backend.model.user.User;
import com.example.backend.model.usercategory.UserCategory;
import com.example.backend.model.usercategory.UserCategoryRepository;
import com.example.backend.util.category.CategoryUtil;
import com.example.backend.util.image.ImageUtil;
import java.util.ArrayList;
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

        return new PageImpl<>(tourRecommendDtoList.subList(start, end), pageable, tourRecommendDtoList.size());
    }


}
