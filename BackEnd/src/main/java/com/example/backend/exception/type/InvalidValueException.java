package com.example.backend.exception.type;


import com.example.backend.exception.ErrorCode;

public class InvalidValueException extends CustomException {

    public InvalidValueException(String value) {
        super(value, ErrorCode.INVALID_INPUT_VALUE);
    }

    public InvalidValueException(String value, ErrorCode errorCode) {
        super(value, errorCode);
    }
}
