package com.example.backend.security.provider;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.security.jwt.JwtDecoder;
import com.example.backend.security.jwt.JwtPreProcessingToken;
import com.example.backend.security.jwt.JwtTokenUtils;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

public class JWTAuthProvider implements AuthenticationProvider {

    private final UserRepository userRepository;
    private final JwtTokenUtils jwtTokenUtils;
    private final JwtDecoder jwtDecoder;

    public JWTAuthProvider(UserRepository userRepository,
            JwtTokenUtils jwtTokenUtils) {
        this.userRepository = userRepository;
        this.jwtTokenUtils = jwtTokenUtils;
        this.jwtDecoder = new JwtDecoder(jwtTokenUtils);
    }

    @Override
    public Authentication authenticate(Authentication authentication)
            throws AuthenticationException {
        String token = (String) authentication.getPrincipal();
        String username = jwtDecoder.decodeUsername(token);

        User user = userRepository.findByEmail(username);
        UserDetailsImpl userDetails = new UserDetailsImpl(user);

        return new UsernamePasswordAuthenticationToken(userDetails, null,
                userDetails.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.isAssignableFrom(JwtPreProcessingToken.class);
    }
}
