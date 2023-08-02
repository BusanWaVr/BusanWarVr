package com.example.backend.model.joiner;

import static com.example.backend.model.joiner.QJoiner.joiner;

import com.example.backend.model.user.QUser;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class JoinerCustomRepository extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;
    public JoinerCustomRepository(JPAQueryFactory queryFactory) {
        super(Joiner.class);
        this.queryFactory = queryFactory;
    }

    public List<Joiner> findByTourId(Long joinerId){
        return queryFactory
                .selectFrom(joiner)
                .where(joiner.id.eq(joinerId))
                .fetch();
    }

    public List<Joiner> findAllByQuerydsl(Long joinerId){
        return (List<Joiner>) queryFactory
                .from(joiner)
                .leftJoin(joiner.user, QUser.user)
                .fetchJoin()
                .where(joiner.id.eq(joinerId))
                .distinct()
                .fetch();
    }
}
