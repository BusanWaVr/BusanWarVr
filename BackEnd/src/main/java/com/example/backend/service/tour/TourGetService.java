package com.example.backend.service.tour;

import com.example.backend.dto.course.CourseDto;
import com.example.backend.dto.joiner.JoinerDto;
import com.example.backend.dto.review.ReviewDto;
import com.example.backend.dto.tour.TourDetailDto;
import com.example.backend.dto.tour.TourDto;
import com.example.backend.dto.tour.TourListDto;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.tour.TourRepository;
import com.example.backend.model.user.User;
import com.example.backend.model.user.UserRepository;
import com.example.backend.util.category.CategoryUtil;
import com.example.backend.util.course.CourseUtil;
import com.example.backend.util.image.ImageUtil;
import com.example.backend.util.joiner.JoinerUtil;
import com.example.backend.util.review.ReviewUtil;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TourGetService {

    private final TourRepository tourRepository;
    private final UserRepository userRepository;
    private final CategoryUtil categoryUtil;
    private final ImageUtil imageUtil;
    private final CourseUtil courseUtil;
    private final JoinerUtil joinerUtil;
    private final ReviewUtil reviewUtil;

    public TourDetailDto.Response tourDetail(Long tourId) {
        Tour tour = tourRepository.findById(tourId).get();

        User user = userRepository.findById(tour.getUserId()).get();

        List<String> tourCategories = new ArrayList<>();
        categoryUtil.tourCategoryList(tourId, tourCategories);

        List<String> tourImageUrls = new ArrayList<>();
        imageUtil.tourImageUrlList(tourId, tourImageUrls);

        List<CourseDto.Response> courseDtos = new ArrayList<>();
        courseUtil.courseDtoList(tourId, courseDtos);

        List<JoinerDto> joinerDtos = new ArrayList<>();
        joinerUtil.joinerDtoList(tourId, joinerDtos);

        List<ReviewDto> reviewDtos = new ArrayList<>();
        reviewUtil.reviewDtoList(tourId, reviewDtos);

        List<ReviewDto> reviewFive;
        if (reviewDtos.size() >= 5) {
            reviewFive = reviewDtos.subList(0, 5);
            return new TourDetailDto.Response(tour, user, tourCategories, tourImageUrls, courseDtos,
                    joinerDtos, reviewFive);
        }
        reviewFive = reviewDtos.subList(0, reviewDtos.size());
        return new TourDetailDto.Response(tour, user, tourCategories, tourImageUrls, courseDtos,
                joinerDtos, reviewFive);
    }

    public TourListDto.Response getALLTour(Pageable pageable) {
        List<Tour> tours = tourRepository.findAllByIsEndedFalseOrderByStartDateDesc();
        List<TourDto> tourDtoList = new ArrayList<>();

        for (Tour tour : tours) {
            if (tour.isCanceled()) {
                continue;
            }
            User user = userRepository.findById(tour.getUserId()).get();
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
                    new TourDto(tour, user, tourCategories, tourImageUrls, courseDtos, joinerDtos));
        }

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), tourDtoList.size());

        return new TourListDto.Response(tourDtoList.subList(start, end));

    }
}
