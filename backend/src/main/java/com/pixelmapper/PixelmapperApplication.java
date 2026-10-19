package com.pixelmapper;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling 
public class PixelmapperApplication {

	public static void main(String[] args) {
		SpringApplication.run(PixelmapperApplication.class, args);
	}

}
