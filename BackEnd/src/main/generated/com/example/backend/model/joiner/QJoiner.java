package com.example.backend.model.joiner;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QJoiner is a Querydsl query type for Joiner
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QJoiner extends EntityPathBase<Joiner> {

    private static final long serialVersionUID = -2130404066L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QJoiner joiner = new QJoiner("joiner");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final DateTimePath<java.util.Date> joinDate = createDateTime("joinDate", java.util.Date.class);

    public final com.example.backend.model.tour.QTour tour;

    public final com.example.backend.model.user.QUser user;

    public QJoiner(String variable) {
        this(Joiner.class, forVariable(variable), INITS);
    }

    public QJoiner(Path<? extends Joiner> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QJoiner(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QJoiner(PathMetadata metadata, PathInits inits) {
        this(Joiner.class, metadata, inits);
    }

    public QJoiner(Class<? extends Joiner> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.tour = inits.isInitialized("tour") ? new com.example.backend.model.tour.QTour(forProperty("tour")) : null;
        this.user = inits.isInitialized("user") ? new com.example.backend.model.user.QUser(forProperty("user")) : null;
    }

}

