
package com._team9.backend.config;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Controls which CyberSense backend endpoints
 * are public and which require authentication.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
            .authorizeHttpRequests(auth -> auth
// Allow the frontend to request a CSRF token.
.requestMatchers(HttpMethod.GET, "/api/csrf").permitAll()
                // Allow visitors to view training scenarios.
                .requestMatchers(
                    HttpMethod.GET, "/api/scenarios"
                ).permitAll()

                // Registration and answer evaluation are public.
                .requestMatchers(
                    HttpMethod.POST,
                    "/api/users/register",
                    "/api/scenarios/*/submit"
                ).permitAll()

                // Personal analytics require authentication.
                .requestMatchers(
                    "/api/analytics/**"
                ).authenticated()

                // Other endpoints require authentication by default.
                .anyRequest().authenticated()
            )

.formLogin(form -> form
    // React will submit login credentials to this endpoint.
    .loginProcessingUrl("/api/auth/login")

    // Use the email field to find the registered account.
    .usernameParameter("email")

    // Return success instead of redirecting automatically.
    .successHandler((request, response, authentication) -> {
        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json");
        response.getWriter().write(
            "{\"message\":\"Login successful\"}"
        );
    })

    // Incorrect credentials must not grant access.
    .failureHandler((request, response, exception) -> {
        response.sendError(
            HttpServletResponse.SC_UNAUTHORIZED,
            "Invalid email or password"
        );
    })

    .permitAll()
)
.logout(logout -> logout
    // End the user's session when they log out.
    .logoutUrl("/api/auth/logout")
    .invalidateHttpSession(true)
    .clearAuthentication(true)
    .deleteCookies("JSESSIONID")

    // Return success without redirecting.
    .logoutSuccessHandler((request, response, authentication) -> {
        response.setStatus(HttpServletResponse.SC_NO_CONTENT);
    })

    .permitAll()
)

            // Return 401 when authentication is required.
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint(
                    (request, response, error) ->
                        response.sendError(
                            HttpServletResponse.SC_UNAUTHORIZED
                        )
                )
            );

        return http.build();
    }
}