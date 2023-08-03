package com.example.backend.model.tourcategory;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTourCategory is a Querydsl query type for TourCategory
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTourCategory extends EntityPathBase<TourCategory> {

    private static final long serialVersionUID = -484679074L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTourCategory tourCategory = new QTourCategory("tourCategory");

    public final com.example.backend.model.category.QCategory category;

    public final DateTimePath<java.util.Date> date = createDateTime("date", java.util.Date.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.example.backend.model.tour.QTour tour;

    public QTourCategory(String variable) {
        this(TourCategory.class, forVariable(variable), INITS);
    }

    public QTourCategory(Path<? extends TourCategory> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTourCategory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTourCategory(PathMetadata metadata, PathInits inits) {
        this(TourCategory.class, metadata, inits);
    }

    public QTourCategory(Class<? extends TourCategory> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.category = inits.isInitialized("category") ? new com.example.backend.model.category.QCategory(forProperty("category")) : null;
        this.tour = inits.isInitialized("tour") ? new com.example.backend.model.tour.QTour(forProperty("tour")) : null;
    }

}

