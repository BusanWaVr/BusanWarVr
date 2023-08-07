package com.example.backend.service.user;

import com.example.backend.model.user.User;
import com.example.backend.model.user.UserRepository;
import com.example.backend.security.jwt.HeaderTokenExtractor;
import com.example.backend.security.jwt.JwtDecoder;
import com.example.backend.security.jwt.JwtTokenUtils;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final HeaderTokenExtractor extractor;
    private final JwtDecoder jwtDecoder;
    private final JwtTokenUtils jwtTokenUtils;
    private final UserRepository userRepository;

    String ACCESS_TOKEN_HEADER = "Access_Token";
    String REFRESH_TOKEN_HEADER = "Refresh_Token";

    public Map<String, String> refresh(String tokenPayLoad, HttpServletRequest request) {
        String refreshToken = extractor.extract(tokenPayLoad, request);
        String username = jwtDecoder.decodeUsername(refreshToken);
        String accessToken = jwtTokenUtils.reissuanceAccessToken(username);

        Map<String, String> accessTokenResponseMap = new HashMap<>();

        long now = System.currentTimeMillis();
        long refreshExpireTime = jwtDecoder.getExpireTime(refreshToken);
        long diffDays = (refreshExpireTime - now) / 1000 / (24 * 3600);
        long diffMin = (refreshExpireTime - now) / 1000 / 60;

        if (diffMin < 5) {
            String newRefreshToken = jwtTokenUtils.reissuanceRefreshToken(username);
            User user = userRepository.findByEmail(username);
            user.setRefreshToken(newRefreshToken);
            userRepository.save(user);

            accessTokenResponseMap.put(REFRESH_TOKEN_HEADER, newRefreshToken);
        }

        accessTokenResponseMap.put(ACCESS_TOKEN_HEADER, accessToken);

        return accessTokenResponseMap;
    }
}
