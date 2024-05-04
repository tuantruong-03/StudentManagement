package student.mangement.code.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfiguration {
	
	@Bean 
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http.csrf(csrf -> csrf.disable())
				// .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))	
				.authorizeHttpRequests(auth ->{
					// auth.requestMatchers("/admin/**").hasAuthority("ROLE_ADMIN");
					// auth.requestMatchers("/auth/login").permitAll();
					// auth.anyRequest().authenticated();

					auth.anyRequest().permitAll();
				})
				// .addFilterBefore(new JwtTokenFilter(), UsernamePasswordAuthenticationFilter.class)
				.build();
	}
	
	
}
