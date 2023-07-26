package com.example.backend.security.filter;

import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.ErrorResponse;
import com.example.backend.exception.security.FromLoginBadRequestException;
import com.example.backend.exception.security.FromLoginInvalidException;
import com.example.backend.exception.security.JwtTokenExpiredException;
import com.example.backend.exception.security.JwtTokenInvalidException;
import com.example.backend.util.mattermost.NotificationManager;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Enumeration;
import java.util.NoSuchElementException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@Order(2)
@RequiredArgsConstructor
public class ExceptionHandlerFilter extends OncePerRequestFilter {

    private ObjectMapper objectMapper;
    private final NotificationManager notificationManager;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);
        } catch (JwtTokenInvalidException e){
            objectMapper = new ObjectMapper();
            ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.JWT_TOKEN_INVALID_VALUE);
            response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
            response.setContentType("application/json");
            notificationManager.sendNotification(e, request.getRequestURI(),getParams(request));
        } catch (JwtTokenExpiredException e){
            objectMapper = new ObjectMapper();
            ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.JWT_TOKEN_EXPIRED);
            response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
            response.setContentType("application/json");
            notificationManager.sendNotification(e, request.getRequestURI(),getParams(request));
        } catch (FromLoginBadRequestException e){
            objectMapper = new ObjectMapper();
            ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.FORM_LOGIN_BAD_REQUEST);
            response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
            response.setContentType("application/json");
            notificationManager.sendNotification(e, request.getRequestURI(),getParams(request));
        } catch (FromLoginInvalidException e){
            objectMapper = new ObjectMapper();
            ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.FORM_LOGIN_INVALID);
            response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
            response.setContentType("application/json");
            notificationManager.sendNotification(e, request.getRequestURI(),getParams(request));
        } catch (NoSuchElementException e){
            objectMapper = new ObjectMapper();
            ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.NOT_SAME_DATA_VALUE);
            response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
            response.setContentType("application/json");
            notificationManager.sendNotification(e, request.getRequestURI(),getParams(request));
        }
    }

    private String getParams(HttpServletRequest req) {
        StringBuilder params = new StringBuilder();
        Enumeration<String> keys = req.getParameterNames();
        while (keys.hasMoreElements()) {
            String key = keys.nextElement();
            params.append("- ").append(key).append(" : ").append(req.getParameter(key)).append("\n");
        }

        return params.toString();
    }
}
