package com.yurii.rentalserver.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                //disable csrf
                .csrf(AbstractHttpConfigurer::disable)
                //protect /api/<type>/secure
                .authorizeHttpRequests(request -> request
                        .requestMatchers(
                                "api/items/secure/**",
                                "api/reviews/secure/**",
                                "api/messages/secure/**",
                                "api/admin/secure/**"
                        ).authenticated()

                        .anyRequest().permitAll())
                .oauth2ResourceServer(oauth -> oauth.jwt(Customizer.withDefaults()))
                // add cors filters
                .cors(Customizer.withDefaults());

        http.setSharedObject(ContentNegotiationStrategy.class, new HeaderContentNegotiationStrategy());

        // force a non-empty response body for 401's to make response friendly
        Okta.configureResourceServer401ResponseBody(http);

        return http.build();
    }
}
