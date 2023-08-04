package com.example.backend.model.tour.qdto;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.Generated;

/**
 * com.example.backend.model.tour.qdto.QSearchTourDto is a Querydsl Projection type for SearchTourDto
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QSearchTourDto extends ConstructorExpression<SearchTourDto> {

    private static final long serialVersionUID = 1187773925L;

    public QSearchTourDto(com.querydsl.core.types.Expression<? extends com.example.backend.model.tour.Tour> tour, com.querydsl.core.types.Expression<? extends com.example.backend.model.user.User> user) {
        super(SearchTourDto.class, new Class<?>[]{com.example.backend.model.tour.Tour.class, com.example.backend.model.user.User.class}, tour, user);
    }

}

