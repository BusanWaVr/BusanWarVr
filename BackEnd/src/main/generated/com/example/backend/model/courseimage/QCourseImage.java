package com.example.backend.model.courseimage;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCourseImage is a Querydsl query type for CourseImage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCourseImage extends EntityPathBase<CourseImage> {

    private static final long serialVersionUID = -122817982L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCourseImage courseImage = new QCourseImage("courseImage");

    public final com.example.backend.model.course.QCourse course;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.example.backend.model.image.QImage image;

    public QCourseImage(String variable) {
        this(CourseImage.class, forVariable(variable), INITS);
    }

    public QCourseImage(Path<? extends CourseImage> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCourseImage(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCourseImage(PathMetadata metadata, PathInits inits) {
        this(CourseImage.class, metadata, inits);
    }

    public QCourseImage(Class<? extends CourseImage> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.course = inits.isInitialized("course") ? new com.example.backend.model.course.QCourse(forProperty("course")) : null;
        this.image = inits.isInitialized("image") ? new com.example.backend.model.image.QImage(forProperty("image")) : null;
    }

}

