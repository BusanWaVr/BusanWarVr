package com.example.backend.security;

import com.example.backend.model.user.UserCustomRepository;
import com.example.backend.model.user.UserRepository;
import com.example.backend.security.filter.ExceptionHandlerFilter;
import com.example.backend.security.filter.FormLoginFilter;
import com.example.backend.security.filter.JwtAuthFilter;
import com.example.backend.security.jwt.HeaderTokenExtractor;
import com.example.backend.security.jwt.JwtTokenUtils;
import com.example.backend.security.provider.FormLoginAuthProvider;
import com.example.backend.security.provider.JWTAuthProvider;
import com.example.backend.util.mattermost.NotificationManager;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserRepository userRepository;
    private final UserDetailServiceImpl userDetailService;
    private final JwtTokenUtils jwtTokenUtils;
    private final HeaderTokenExtractor extractor;
    private final NotificationManager notificationManager;
    private final UserCustomRepository userCustomRepository;

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .apply(new MyCustomDsl()) // 커스텀 필터 등록
                .and()
                .authorizeRequests().anyRequest().permitAll()
                .and()
                .exceptionHandling()
                .and()
                .build();
    }

    @Bean
    public BCryptPasswordEncoder encodePassword() {
        return new BCryptPasswordEncoder();
    }

//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer(){
//        return (web) -> web.ignoring().antMatchers("/h2-console/**");
//    }

    @Autowired
    void registerProvider(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(new FormLoginAuthProvider(userDetailService, encodePassword()));
        auth.authenticationProvider(new JWTAuthProvider(userRepository, jwtTokenUtils));
    }

    FormLoginFilter formLoginFilter(AuthenticationManager authenticationManager) {
        FormLoginFilter formLoginFilter = new FormLoginFilter(authenticationManager);
        formLoginFilter.setFilterProcessesUrl("/user/login");
        formLoginFilter.setAuthenticationSuccessHandler(new FormLoginSuccessHandler(jwtTokenUtils, userCustomRepository));
        formLoginFilter.afterPropertiesSet();
        return formLoginFilter;
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:5173"); // local 테스트 시
        configuration.setAllowCredentials(true);
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.addExposedHeader("*");
        configuration.addExposedHeader("Access_Token");
        configuration.addExposedHeader("Refresh_Token");
        configuration.addAllowedOriginPattern("*"); // 배포 전 모두 허용
        val source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }


    JwtAuthFilter jwtAuthFilter(AuthenticationManager authenticationManager) {
        List<Path> skipPathList = new ArrayList<>();

        skipPathList.add(new Path(HttpMethod.POST, "/user/login"));
        skipPathList.add(new Path(HttpMethod.POST, "/user"));
        skipPathList.add(new Path(HttpMethod.GET, "/docs/**"));
        skipPathList.add(new Path(HttpMethod.GET, "/v3/**"));
        skipPathList.add(new Path(HttpMethod.GET, "/profile"));
        skipPathList.add(new Path(HttpMethod.GET, "/actuator/health"));
        skipPathList.add(new Path(HttpMethod.POST, "/auth/nickname"));
        skipPathList.add(new Path(HttpMethod.POST, "/auth/email"));
        skipPathList.add(new Path(HttpMethod.POST, "/auth/code"));
        skipPathList.add(new Path(HttpMethod.POST, "/guide"));
        skipPathList.add(new Path(HttpMethod.POST, "/.git/config"));

        // Tour
        skipPathList.add(new Path(HttpMethod.GET, "/tour/{tourId}"));
        skipPathList.add(new Path(HttpMethod.GET, "/tour"));
        skipPathList.add(new Path(HttpMethod.GET, "/tour/review/{reviewId}"));

        // Chatting
        skipPathList.add(new Path(HttpMethod.GET, "/ws-stomp/**"));
        skipPathList.add(new Path(HttpMethod.POST, "/ws-stomp/**"));
        skipPathList.add(new Path(HttpMethod.GET, "/ws/**"));

        // Mate
        skipPathList.add(new Path(HttpMethod.GET, "/mate/**"));

        // QueryDsl Test
        skipPathList.add(new Path(HttpMethod.GET, "/testQueryDsl"));

        // userInfo
        skipPathList.add(new Path(HttpMethod.GET, "/user/userInfo/{userId}"));
        skipPathList.add(new Path(HttpMethod.GET, "/guide/guideInfo/{guideId}"));
        skipPathList.add(new Path(HttpMethod.GET, "/guide/follower/{guideId}"));

        FilterSkipMatcher matcher = new FilterSkipMatcher(skipPathList, "/**");
        JwtAuthFilter filter = new JwtAuthFilter(matcher, extractor);
        filter.setAuthenticationManager(authenticationManager);
        return filter;
    }

    public class MyCustomDsl extends AbstractHttpConfigurer<MyCustomDsl, HttpSecurity> {

        @Override
        public void configure(HttpSecurity http) throws Exception {
            AuthenticationManager authenticationManager = http.getSharedObject(
                    AuthenticationManager.class);
            http
                    .addFilterBefore(formLoginFilter(authenticationManager),
                            UsernamePasswordAuthenticationFilter.class)
                    .addFilterBefore(jwtAuthFilter(authenticationManager),
                            UsernamePasswordAuthenticationFilter.class)
                    .addFilterBefore(new ExceptionHandlerFilter(notificationManager),
                            JwtAuthFilter.class)
                    .addFilterBefore(new ExceptionHandlerFilter(notificationManager),
                            FormLoginFilter.class);
        }
    }
}