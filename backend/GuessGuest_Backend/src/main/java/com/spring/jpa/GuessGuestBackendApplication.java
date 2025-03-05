package com.spring.jpa;

import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.spring.jpa.dto.UserInfoReq;
import com.spring.jpa.entity.Food;
import com.spring.jpa.entity.Mbti;
import com.spring.jpa.repository.HouseRepository;
import com.spring.jpa.service.UserService;

@SpringBootApplication
public class GuessGuestBackendApplication implements CommandLineRunner{

	@Autowired
	private HouseRepository houseRepository;
	
	@Autowired
	private UserService userService;
	
	public static void main(String[] args) {
		SpringApplication.run(GuessGuestBackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub

	}
}
