package com.example.backend.service.mainPage;

import com.example.backend.dto.mainPage.DeadlineTourDto;
import com.example.backend.dto.mainPage.NearDeadlineTourDto;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.tour.TourRepository;
import com.example.backend.model.tourimage.TourImage;
import com.example.backend.model.tourimage.TourImageRepository;
import com.example.backend.util.category.CategoryUtil;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MainPageService {

    private final TourRepository tourRepository;
    private final TourImageRepository tourImageRepository;
    private final CategoryUtil categoryUtil;

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
}
