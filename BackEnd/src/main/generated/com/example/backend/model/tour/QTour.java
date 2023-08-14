package com.example.backend.model.tour;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QTour is a Querydsl query type for Tour
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTour extends EntityPathBase<Tour> {

    private static final long serialVersionUID = 1546921854L;

    public static final QTour tour = new QTour("tour");

    public final StringPath content = createString("content");

    public final NumberPath<Integer> currentMember = createNumber("currentMember", Integer.class);

    public final DateTimePath<java.util.Date> endDate = createDateTime("endDate", java.util.Date.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isCanceled = createBoolean("isCanceled");

    public final BooleanPath isEnded = createBoolean("isEnded");

    public final StringPath link = createString("link");

    public final NumberPath<Integer> maxMember = createNumber("maxMember", Integer.class);

    public final NumberPath<Integer> minMember = createNumber("minMember", Integer.class);

    public final StringPath region = createString("region");

    public final DateTimePath<java.util.Date> startDate = createDateTime("startDate", java.util.Date.class);

    public final StringPath subTitle = createString("subTitle");

    public final StringPath title = createString("title");

    public final StringPath uid = createString("uid");

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public QTour(String variable) {
        super(Tour.class, forVariable(variable));
    }

    public QTour(Path<? extends Tour> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTour(PathMetadata metadata) {
        super(Tour.class, metadata);
    }

}

