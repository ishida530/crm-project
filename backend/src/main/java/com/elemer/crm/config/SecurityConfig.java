package com.elemer.crm.config;

import com.elemer.crm.service.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JWTAuthFilter jWTAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Dodajemy CORS
                .authorizeHttpRequests(request -> request
                        .requestMatchers("/api/**").permitAll()
                        .requestMatchers("/auth/login", "/auth/reset-password", "/public/**").permitAll()
                        .requestMatchers("/change-password/**").hasAnyAuthority("ADMIN", "MANAGER", "EMPLOYEE", "INVOICE_CLERK", "DESIGNER", "ENGINEER")
                        .requestMatchers("/users/**").hasAuthority("ADMIN")
                        .requestMatchers("/tokenfcm/**").hasAnyAuthority("ADMIN", "MANAGER", "EMPLOYEE", "INVOICE_CLERK", "DESIGNER", "ENGINEER")
                        .requestMatchers("/clients/**").hasAnyAuthority("ADMIN", "INVOICE_CLERK")
                        .requestMatchers("/warehouses/**").hasAnyAuthority("ADMIN", "MANAGER")
                        .requestMatchers("/sales/**").hasAnyAuthority("ADMIN", "INVOICE_CLERK")
                        .requestMatchers("/projects/**", "/projects/tasks/**").hasAnyAuthority("ADMIN", "MANAGER", "EMPLOYEE")
                        .requestMatchers("/products/**").hasAuthority("ADMIN")
                        .requestMatchers("/investments/**").hasAuthority("ADMIN")
                        .anyRequest().authenticated())
                .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jWTAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:5173"); // Określenie dopuszczalnego origin (Twój frontend)
        configuration.addAllowedMethod("*"); // Zezwól na wszystkie metody
        configuration.addAllowedHeader("*"); // Zezwól na wszystkie nagłówki
        configuration.setAllowCredentials(true); // Zezwól na przesyłanie ciasteczek (jeśli to wymagane)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Zastosuj CORS do wszystkich endpointów
        return source;
    }
}
