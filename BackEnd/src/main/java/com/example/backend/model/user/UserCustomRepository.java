package com.example.backend.model.user;

import com.example.backend.model.category.QCategory;
import com.example.backend.model.usercategory.QUserCategory;
import com.example.backend.model.usercategory.UserCategory;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class UserCustomRepository extends QuerydslRepositorySupport {

    private final JPAQueryFactory queryFactory;
    public UserCustomRepository(JPAQueryFactory queryFactory) {
        super(User.class);
        this.queryFactory = queryFactory;
    }

    public List<String> getUserCategory(Long userId){

        QUserCategory userCategory = QUserCategory.userCategory;
        QCategory category = QCategory.category;

        JPQLQuery<UserCategory> jpqlQuery = from(userCategory);
        jpqlQuery.leftJoin(category).on(userCategory.category.eq(category));

        JPQLQuery<String> tuple = jpqlQuery.select(category.name);
        tuple.where(userCategory.user.id.eq(userId));
        List<String> result = tuple.fetch();

        return result;
    }
}
