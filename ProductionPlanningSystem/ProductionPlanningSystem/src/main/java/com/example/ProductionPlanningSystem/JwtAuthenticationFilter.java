package com.example.ProductionPlanningSystem;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println("\n========== JWT FILTER ==========");

        String authHeader = request.getHeader("Authorization");

        System.out.println("Request URI : " + request.getRequestURI());
        System.out.println("Authorization Header : " + authHeader);

        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            String token = authHeader.substring(7);

            System.out.println("JWT Token : " + token);

            if (JwtUtil.validateToken(token)) {

                System.out.println("Token is VALID");

                String username = JwtUtil.extractUsername(token);
                String role = JwtUtil.extractRole(token);

                System.out.println("Username : " + username);
                System.out.println("Role : " + role);

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                username,
                                null,
                                Collections.singletonList(
                                        new SimpleGrantedAuthority("ROLE_" + role)
                                )
                        );

                SecurityContextHolder.getContext().setAuthentication(authentication);

                System.out.println("Authentication successfully stored in SecurityContext");

            } else {

                System.out.println("Token Validation FAILED");
            }

        } else {

            System.out.println("Authorization header missing or invalid");

        }

        filterChain.doFilter(request, response);

        System.out.println("========== END FILTER ==========\n");
    }
}