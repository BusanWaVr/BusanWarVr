package com.example.backend.model.comment;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QComment is a Querydsl query type for Comment
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QComment extends EntityPathBase<Comment> {

    private static final long serialVersionUID = -549694240L;

    public static final QComment comment = new QComment("comment");

    public final StringPath content = createString("content");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Long> parentId = createNumber("parentId", Long.class);

    public final NumberPath<Long> tourId = createNumber("tourId", Long.class);

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public final DateTimePath<java.util.Date> writeDate = createDateTime("writeDate", java.util.Date.class);

    public QComment(String variable) {
        super(Comment.class, forVariable(variable));
    }

    public QComment(Path<? extends Comment> path) {
        super(path.getType(), path.getMetadata());
    }

    public QComment(PathMetadata metadata) {
        super(Comment.class, metadata);
    }

}

