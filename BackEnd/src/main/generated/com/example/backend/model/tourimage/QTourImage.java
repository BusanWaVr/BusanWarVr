package com.example.backend.model.tourimage;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTourImage is a Querydsl query type for TourImage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTourImage extends EntityPathBase<TourImage> {

    private static final long serialVersionUID = 318607048L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTourImage tourImage = new QTourImage("tourImage");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.example.backend.model.image.QImage image;

    public final com.example.backend.model.tour.QTour tour;

    public QTourImage(String variable) {
        this(TourImage.class, forVariable(variable), INITS);
    }

    public QTourImage(Path<? extends TourImage> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTourImage(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTourImage(PathMetadata metadata, PathInits inits) {
        this(TourImage.class, metadata, inits);
    }

    public QTourImage(Class<? extends TourImage> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.image = inits.isInitialized("image") ? new com.example.backend.model.image.QImage(forProperty("image")) : null;
        this.tour = inits.isInitialized("tour") ? new com.example.backend.model.tour.QTour(forProperty("tour")) : null;
    }

}

