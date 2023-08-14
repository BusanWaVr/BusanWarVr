package com.example.backend.model.tourimage;

import static com.example.backend.model.tourimage.QTourImage.tourImage;

import com.example.backend.model.tour.QTour;
import com.example.backend.model.user.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class TourImageCustomRepoistory extends QuerydslRepositorySupport {

    private final JPAQueryFactory queryFactory;

    public TourImageCustomRepoistory(JPAQueryFactory queryFactory) {
        super(TourImage.class);
        this.queryFactory = queryFactory;
    }

    public List<TourImage> findTourImagesByGuide(User guide) {

        return (List<TourImage>) queryFactory
                .selectFrom(tourImage)
                .join(tourImage.tour, QTour.tour).fetchJoin()
                .where(QTour.tour.userId.eq(guide.getId()))
                .fetch();
    }
}
