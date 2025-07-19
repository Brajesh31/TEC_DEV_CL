package com.techdevclub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class TechDevClubApplication {
    public static void main(String[] args) {
        SpringApplication.run(TechDevClubApplication.class, args);
    }
}