package com.example.backend.model.tour;

import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;

import com.example.backend.model.category.QCategory;
import com.example.backend.model.image.QImage;
import com.example.backend.model.tour.qdto.QSearchTourDto;
import com.example.backend.model.tour.qdto.SearchTourDto;
import com.example.backend.model.tourcategory.QTourCategory;
import com.example.backend.model.tourimage.QTourImage;
import com.example.backend.model.user.QUser;
import com.example.backend.model.user.User;
import com.example.backend.model.user.UserRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class TourCustomRepository extends QuerydslRepositorySupport {

    private final JPAQueryFactory queryFactory;
    private final UserRepository userRepository;

    public TourCustomRepository(JPAQueryFactory queryFactory, UserRepository userRepository) {
        super(Tour.class);
        this.queryFactory = queryFactory;
        this.userRepository = userRepository;
    }

    public Map<Long, SearchTourDto> findBySearchTourColumn(String type, String keyword, Pageable pageable) {
        switch (type){
            case "TITLE" :
                return findByTitleToTour(keyword, pageable);
            case "REGION" :
                return findByRegionToTour(keyword, pageable);
            case "GUIDE" :
                List<User> findUsers = userRepository.findAllByNicknameContaining(keyword);

                if(findUsers.isEmpty()){
                    Map<Long, SearchTourDto> map = new HashMap<>();
                    return map;
                }

                List<Long> userIds = new ArrayList<>();

                for(User user : findUsers){
                    userIds.add(user.getId());
                }

                return findByGuideNameToTour(userIds, pageable);
        }

        throw new IllegalArgumentException("타입을 잘못 설정하였습니다.");
    }

    public Map<Long, SearchTourDto> findByTitleToTour(String keyword, Pageable pageable){
        QTour tour = QTour.tour;
        QUser user = QUser.user;

        return queryFactory
                .from(tour)
                .leftJoin(user)
                .on(tour.userId.eq(user.id))
                .fetchJoin()
                .where(tour.title.contains(keyword))
                .orderBy(tour.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .transform(groupBy(tour.id).as(new QSearchTourDto(tour, user)));
    }

    public Map<Long, SearchTourDto> findByRegionToTour(String keyword, Pageable pageable){
        QTour tour = QTour.tour;
        QUser user = QUser.user;

        return queryFactory
                .from(tour)
                .leftJoin(user)
                .on(tour.userId.eq(user.id))
                .fetchJoin()
                .where(tour.region.contains(keyword))
                .orderBy(tour.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .transform(groupBy(tour.id).as(new QSearchTourDto(tour, user)));
    }

    public Map<Long, SearchTourDto> findByGuideNameToTour(List<Long> userIds, Pageable pageable){
        QTour tour = QTour.tour;
        QUser user = QUser.user;

        return queryFactory
                .from(tour)
                .leftJoin(user)
                .on(tour.userId.eq(user.id))
                .fetchJoin()
                .where(tour.userId.in(userIds))
                .orderBy(tour.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .transform(groupBy(tour.id).as(new QSearchTourDto(tour, user)));
    }

    public Map<Long, SearchTourDto> findAllSearchByTourWithCategory(List<Long> tourIds, Pageable pageable){
        QTour tour = QTour.tour;
        QUser user = QUser.user;

        return queryFactory
                .from(tour)
                .leftJoin(user)
                .on(tour.userId.eq(user.id))
                .fetchJoin()
                .where(tour.id.in(tourIds))
                .orderBy(tour.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .transform(groupBy(tour.id).as(new QSearchTourDto(tour, user)));
    }

    public List<Long> getTourIdToTourCategory(String keyword){
        QCategory category = QCategory.category;
        QTourCategory tourCategory = QTourCategory.tourCategory;

        return queryFactory
                .select(tourCategory.tour.id)
                .from(tourCategory)
                .leftJoin(category)
                .on(tourCategory.category.id.eq(category.id))
                .fetchJoin()
                .where(category.name.contains(keyword))
                .fetch();
    }

    public Map<Long, List<String>> getRelativeImage(List<Long> tourIds) {
        QTourImage tourImage = QTourImage.tourImage;
        QImage image = QImage.image;

        return queryFactory
                .from(tourImage)
                .leftJoin(image)
                .on(tourImage.image.id.eq(image.id))
                .fetchJoin()
                .where(tourImage.tour.id.in(tourIds))
                .transform(groupBy(tourImage.tour.id).as(list(image.url)));
    }

    public Map<Long, List<String>> getRelativeCategory(List<Long> tourIds) {
        QCategory category = QCategory.category;
        QTourCategory tourCategory = QTourCategory.tourCategory;

        return queryFactory
                .from(tourCategory)
                .leftJoin(category)
                .on(tourCategory.category.id.eq(category.id))
                .fetchJoin()
                .where(tourCategory.tour.id.in(tourIds))
                .transform(groupBy(tourCategory.tour.id).as(list(category.name)));
    }
}
