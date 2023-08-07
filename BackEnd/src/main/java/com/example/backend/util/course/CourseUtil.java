package com.example.backend.util.course;

import com.example.backend.dto.course.CourseDto;
import com.example.backend.dto.course.CourseDto.Response;
import com.example.backend.model.course.Course;
import com.example.backend.model.course.CourseRepository;
import com.example.backend.model.courseimage.CourseImage;
import com.example.backend.model.courseimage.CourseImageRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CourseUtil {
    private final CourseRepository courseRepository;
    private final CourseImageRepository courseImageRepository;
    public void courseDtoList(Long tourId, List<Response> courseDtos) {
        List<Course> courses = courseRepository.findAllByTourId(tourId);
        for (Course course : courses) {
            CourseImage courseImage = courseImageRepository.findByCourseId(course.getId());
            String imageUrl = "";
            if (courseImage != null) {
                imageUrl = courseImage.getImage().getUrl();
            }
            CourseDto.Response courseDto = new CourseDto.Response(course, imageUrl);
            courseDtos.add(courseDto);
        }
    }
}
