package com.example.MM;

import com.example.MM.config.properties.AppProperties;
import com.example.MM.config.properties.CorsProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableConfigurationProperties({
        CorsProperties.class,
        AppProperties.class
})
@EnableJpaAuditing
@SpringBootApplication()
public class PuzzleApplication {

    public static void main(String[] args) {
        SpringApplication.run(PuzzleApplication.class, args);
    }

}
