package com.example.backend.service.tour;

import com.example.backend.dto.tour.TourSearchInfoDto;
import com.example.backend.model.course.CourseCustomRepository;
import com.example.backend.model.course.qdto.CourseCustomDto;
import com.example.backend.model.tour.TourCustomRepository;
import com.example.backend.model.tour.qdto.SearchTourDto;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TourSearchService {

    private final TourCustomRepository tourCustomRepository;
    private final CourseCustomRepository courseCustomRepository;

    public List<SearchTourDto> searchTour(TourSearchInfoDto.Request request, Pageable pageable) {
        String type = request.getType();

        if (type.equals("CATEGORY")) {
            return getSearchCategoryRelative(request, pageable);
        } else if (type.equals("COURSE")) {
            return getSearchCourseRelative(request, pageable);
        } else {
            return getSearchTourRelative(request, pageable);
        }
    }

    public List<SearchTourDto> getSearchTourRelative(TourSearchInfoDto.Request request,
            Pageable pageable) {
        Map<Long, SearchTourDto> tours = tourCustomRepository.findBySearchTourColumn(
                request.getType(), request.getKeyword(), pageable);
        List<Long> tourIds = new ArrayList<>();

        for (Long tourId : tours.keySet()) {
            tourIds.add(tourId);
        }

        Map<Long, List<String>> images = tourCustomRepository.getRelativeImage(tourIds);
        Map<Long, List<String>> categorys = tourCustomRepository.getRelativeCategory(tourIds);

        for (Long tourId : images.keySet()) {
            if (tours.containsKey(tourId)) {
                SearchTourDto searchTourDto = tours.get(tourId);
                searchTourDto.setImages(images.get(tourId));
                tours.put(tourId, searchTourDto);
            }
        }

        for (Long tourId : categorys.keySet()) {
            if (tours.containsKey(tourId)) {
                SearchTourDto searchTourDto = tours.get(tourId);
                searchTourDto.setCategorys(categorys.get(tourId));
                tours.put(tourId, searchTourDto);
            }
        }

        Map<Long, List<CourseCustomDto>> courses = courseCustomRepository.findByTourIdToCourse(
                tourIds);

        System.out.println(courses);

        for (Long tourId : courses.keySet()) {
            if (tours.containsKey(tourId)) {
                SearchTourDto searchTourDto = tours.get(tourId);
                searchTourDto.setCourses(courses.get(tourId));
                tours.put(tourId, searchTourDto);
            }
        }

        System.out.println(tours);

        return tours.values().stream()
                .collect(Collectors.toCollection(ArrayList::new));
    }

    public List<SearchTourDto> getSearchCategoryRelative(TourSearchInfoDto.Request request,
            Pageable pageable) {
        List<Long> tourIds = tourCustomRepository.getTourIdToTourCategory(request.getKeyword());

        Map<Long, List<String>> images = tourCustomRepository.getRelativeImage(tourIds);
        Map<Long, List<String>> categorys = tourCustomRepository.getRelativeCategory(tourIds);
        Map<Long, SearchTourDto> tours = tourCustomRepository.findAllSearchByTourWithCategory(
                tourIds, pageable);

        for (Long tourId : images.keySet()) {
            if (tours.containsKey(tourId)) {
                SearchTourDto searchTourDto = tours.get(tourId);
                searchTourDto.setImages(images.get(tourId));
                tours.put(tourId, searchTourDto);
            }
        }

        for (Long tourId : categorys.keySet()) {
            if (tours.containsKey(tourId)) {
                SearchTourDto searchTourDto = tours.get(tourId);
                searchTourDto.setCategorys(categorys.get(tourId));
                tours.put(tourId, searchTourDto);
            }
        }

        // course 붙히기
        Map<Long, List<CourseCustomDto>> courses = courseCustomRepository.findByTourIdToCourse(
                tourIds);

        for (Long tourId : courses.keySet()) {
            if (tours.containsKey(tourId)) {
                SearchTourDto searchTourDto = tours.get(tourId);
                searchTourDto.setCourses(courses.get(tourId));
                tours.put(tourId, searchTourDto);
            }
        }

        System.out.println(tours);
        return tours.values().stream()
                .collect(Collectors.toCollection(ArrayList::new));
    }

    public List<SearchTourDto> getSearchCourseRelative(TourSearchInfoDto.Request request,
            Pageable pageable) {
        List<Long> tourIds = courseCustomRepository.getTourIdToTourCourseTitle(
                request.getKeyword());

        Map<Long, List<String>> images = tourCustomRepository.getRelativeImage(tourIds);
        Map<Long, List<String>> categorys = tourCustomRepository.getRelativeCategory(tourIds);
        Map<Long, SearchTourDto> tours = tourCustomRepository.findAllSearchByTourWithCategory(
                tourIds, pageable);

        for (Long tourId : images.keySet()) {
            if (tours.containsKey(tourId)) {
                SearchTourDto searchTourDto = tours.get(tourId);
                searchTourDto.setImages(images.get(tourId));
                tours.put(tourId, searchTourDto);
            }
        }

        for (Long tourId : categorys.keySet()) {
            if (tours.containsKey(tourId)) {
                SearchTourDto searchTourDto = tours.get(tourId);
                searchTourDto.setCategorys(categorys.get(tourId));
                tours.put(tourId, searchTourDto);
            }
        }

        // course 붙히기
        Map<Long, List<CourseCustomDto>> courses = courseCustomRepository.findByTourIdToCourse(
                tourIds);

        for (Long tourId : courses.keySet()) {
            if (tours.containsKey(tourId)) {
                SearchTourDto searchTourDto = tours.get(tourId);
                searchTourDto.setCourses(courses.get(tourId));
                tours.put(tourId, searchTourDto);
            }
        }

        System.out.println(tours);
        return tours.values().stream()
                .collect(Collectors.toCollection(ArrayList::new));
    }
}
