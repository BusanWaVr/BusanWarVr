package com.example.backend.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    INVALID_INPUT_VALUE("400", "C001", " Invalid Input Value"),
    METHOD_NOT_ALLOWED("405", "C002", " Invalid Input Value"),
    ENTITY_NOT_FOUND("400", "C003", " Entity Not Found"),
    INTERNAL_SERVER_ERROR("500", "C004", "Server Error"),
    INVALID_TYPE_VALUE("400", "C005", " Invalid Type Value"),
    HANDLE_ACCESS_DENIED("403", "C006", "Access is Denied"),
    ENUM_MISS_MATCH("501", "C007", "enum miss match"),
    DUPLICATE_DB_VALUE("409", "C008", "duplicated input value"),
    NOT_SAME_DATA_VALUE("400","C009","Not Same Data Input Value From DB"),
    JWT_TOKEN_INVALID_VALUE("401", "C010", "Jwt Invalid Value"),
    JWT_TOKEN_EXPIRED("401", "C011", "Jwt Token Expired"),
    FORM_LOGIN_BAD_REQUEST("401", "C012", "Login form Bad Request"),
    FORM_LOGIN_INVALID("401", "C013", "Form login invalid Valuie");

    private final String status;
    private final String code;
    private final String message;

}
