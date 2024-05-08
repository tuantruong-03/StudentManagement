package student.mangement.code.configuration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Config cors
@Configuration
public class WebConfiguration implements WebMvcConfigurer {
    private static final Logger logger = LoggerFactory.getLogger(WebConfiguration.class);
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // or use "*" for all origins
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Explicitly allow DELETE
                .allowedHeaders("*")
                .allowCredentials(true);
         logger.info("CORS Configuration Applied: {}", registry.toString());
        
    }
}