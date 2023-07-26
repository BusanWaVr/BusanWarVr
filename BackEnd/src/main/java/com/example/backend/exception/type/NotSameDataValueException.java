package com.example.backend.exception.type;

import com.example.backend.exception.ErrorCode;

public class NotSameDataValueException extends CustomException {

    public NotSameDataValueException(String message, ErrorCode errorCode) {
        super(message, errorCode);
    }

    public NotSameDataValueException(String message) {
        super(message, ErrorCode.NOT_SAME_DATA_VALUE);
    }
}
