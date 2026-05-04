package com.app.ems.config;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.app.ems.filters.JWTRequestFilter;


@Configuration
@EnableWebSecurity //to enable custom security and disable the default sec
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
	
	@Autowired
    private JWTRequestFilter filter;
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) {
		return http
					.csrf(customizer -> customizer.disable())
					 .cors(Customizer.withDefaults()) 
					.authorizeHttpRequests(request -> request
							 .requestMatchers("/auth/**", "/swagger*/**", "/v*/api-docs/**").permitAll()
							 .anyRequest().authenticated())
					.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
					//Add JWT filter before the UsernamePasswordAuthenticationFilter here needed
			         .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class)
					 .build();
					//.httpBasic(Customizer.withDefaults()) //to enable for postman client
					//.formLogin(Customizer.withDefaults())//to enable spring security form login
	}
	
	@Bean
    PasswordEncoder encoder() {
       return new BCryptPasswordEncoder();
   }

	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration config) {
		return config.getAuthenticationManager();
	}
	
	// Optional: CORS configuration
    @Bean
     CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("*")); // Use specific domains in prod
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

}
