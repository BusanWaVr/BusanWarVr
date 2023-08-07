package com.example.backend.model.tour.qdto;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.Generated;

/**
 * com.example.backend.model.tour.qdto.QSearchTourGuideInfo is a Querydsl Projection type for SearchTourGuideInfo
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QSearchTourGuideInfo extends ConstructorExpression<SearchTourGuideInfo> {

    private static final long serialVersionUID = 883757392L;

    public QSearchTourGuideInfo(com.querydsl.core.types.Expression<? extends com.example.backend.model.user.User> user) {
        super(SearchTourGuideInfo.class, new Class<?>[]{com.example.backend.model.user.User.class}, user);
    }

}

