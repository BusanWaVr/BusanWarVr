package com.example.backend.exception;

import com.example.backend.exception.type.CustomException;
import com.example.backend.util.mattermost.NotificationManager;
import java.nio.file.AccessDeniedException;
import java.util.Enumeration;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@ControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    private final NotificationManager notificationManager;

    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException e) {
        final ErrorResponse response = ErrorResponse.of(ErrorCode.INVALID_INPUT_VALUE,
                e.getBindingResult());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BindException.class)
    protected ResponseEntity<ErrorResponse> handleBindException(BindException e) {
        final ErrorResponse response = ErrorResponse.of(ErrorCode.INVALID_INPUT_VALUE,
                e.getBindingResult());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    protected ResponseEntity<ErrorResponse> handleMethodArgumentTypeMismatchException(
            MethodArgumentTypeMismatchException e) {
        final ErrorResponse response = ErrorResponse.of(ErrorCode.ENUM_MISS_MATCH);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    protected ResponseEntity<ErrorResponse> handleHttpRequestMethodNotSupportedException(
            HttpRequestMethodNotSupportedException e) {
        final ErrorResponse response = ErrorResponse.of(ErrorCode.METHOD_NOT_ALLOWED);
        return new ResponseEntity<>(response, HttpStatus.METHOD_NOT_ALLOWED);
    }

    @ExceptionHandler(AccessDeniedException.class)
    protected ResponseEntity<ErrorResponse> handleAccessDeniedException(AccessDeniedException e) {
        final ErrorResponse response = ErrorResponse.of(ErrorCode.HANDLE_ACCESS_DENIED);
        response.setMessage(e.getMessage());
        return new ResponseEntity<>(response,
                HttpStatus.valueOf(ErrorCode.HANDLE_ACCESS_DENIED.getStatus()));
    }

    @ExceptionHandler(CustomException.class)
    protected ResponseEntity<ErrorResponse> handleBusinessException(final CustomException e,
            HttpServletRequest req) {
        final ErrorCode errorCode = e.getErrorCode();
        final ErrorResponse response = ErrorResponse.of(errorCode);
        response.setMessage(e.getMessage());
        notificationManager.sendNotification(e, req.getRequestURI(), getParams(req));
        return new ResponseEntity<>(response,
                HttpStatus.valueOf(Integer.parseInt(errorCode.getStatus())));
    }

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ErrorResponse> handleException(Exception e, HttpServletRequest req) {
        final ErrorResponse response = ErrorResponse.of(ErrorCode.INTERNAL_SERVER_ERROR);
        response.setMessage(e.getMessage());
        notificationManager.sendNotification(e, req.getRequestURI(), getParams(req));
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private String getParams(HttpServletRequest req) {
        StringBuilder params = new StringBuilder();
        Enumeration<String> keys = req.getParameterNames();
        while (keys.hasMoreElements()) {
            String key = keys.nextElement();
            params.append("- ").append(key).append(" : ").append(req.getParameter(key))
                    .append("\n");
        }

        return params.toString();
    }

}
