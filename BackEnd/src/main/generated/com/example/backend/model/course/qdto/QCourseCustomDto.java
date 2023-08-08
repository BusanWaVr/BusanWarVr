package com.example.backend.model.course.qdto;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.example.backend.model.course.qdto.QCourseCustomDto is a Querydsl Projection type for CourseCustomDto
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QCourseCustomDto extends ConstructorExpression<CourseCustomDto> {

    private static final long serialVersionUID = 115707830L;

    public QCourseCustomDto(com.querydsl.core.types.Expression<? extends com.example.backend.model.course.Course> course, com.querydsl.core.types.Expression<String> url) {
        super(CourseCustomDto.class, new Class<?>[]{com.example.backend.model.course.Course.class, String.class}, course, url);
    }

}

