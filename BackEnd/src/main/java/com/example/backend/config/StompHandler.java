package com.example.backend.config;

import com.example.backend.security.jwt.JwtDecoder;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@Component
@Transactional
@RequiredArgsConstructor
public class StompHandler implements ChannelInterceptor {
    private final JwtDecoder jwtDecoder;
}
