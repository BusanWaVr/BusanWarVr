package com.example.backend.model.course;

import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;

import com.example.backend.model.category.QCategory;
import com.example.backend.model.course.qdto.CourseCustomDto;
import com.example.backend.model.course.qdto.QCourseCustomDto;
import com.example.backend.model.courseimage.QCourseImage;
import com.example.backend.model.image.QImage;
import com.example.backend.model.tour.QTour;
import com.example.backend.model.tourcategory.QTourCategory;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.util.Map;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class CourseCustomRepository extends QuerydslRepositorySupport {

    private final JPAQueryFactory queryFactory;
    public CourseCustomRepository(JPAQueryFactory queryFactory) {
        super(Course.class);
        this.queryFactory = queryFactory;
    }

    public Map<Long, List<CourseCustomDto>> findByTourIdToCourse(List<Long> tourIds){
        QCourse course = QCourse.course;
        QCourseImage courseImage = QCourseImage.courseImage;
        QImage image = QImage.image;

        System.out.println(tourIds);
        return queryFactory
                .from(course)
                .leftJoin(courseImage)
                .on(course.id.eq(courseImage.course.id))
                .fetchJoin()
                .leftJoin(image)
                .on(courseImage.image.id.eq(image.id))
                .fetchJoin()
                .where(course.tourId.in(tourIds))
                .transform(groupBy(course.tourId).as(list(new QCourseCustomDto(course, image.url))));
    }

    public List<Long> getTourIdToTourCourseTitle(String keyword){
        QCourse course = QCourse.course;

        return queryFactory
                .selectDistinct(course.tourId)
                .from(course)
                .where(course.title.contains(keyword))
                .fetch();
    }
}
