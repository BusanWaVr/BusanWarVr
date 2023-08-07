package com.example.backend.model.mate;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QMate is a Querydsl query type for Mate
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMate extends EntityPathBase<Mate> {

    private static final long serialVersionUID = 1424755614L;

    public static final QMate mate = new QMate("mate");

    public final StringPath content = createString("content");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> joinMember = createNumber("joinMember", Integer.class);

    public final NumberPath<Integer> maxMember = createNumber("maxMember", Integer.class);

    public final NumberPath<Integer> minMember = createNumber("minMember", Integer.class);

    public final StringPath title = createString("title");

    public final NumberPath<Long> tourId = createNumber("tourId", Long.class);

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public QMate(String variable) {
        super(Mate.class, forVariable(variable));
    }

    public QMate(Path<? extends Mate> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMate(PathMetadata metadata) {
        super(Mate.class, metadata);
    }

}

