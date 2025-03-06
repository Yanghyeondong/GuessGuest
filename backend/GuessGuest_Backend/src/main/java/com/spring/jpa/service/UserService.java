package com.spring.jpa.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.stereotype.Service;

import com.spring.jpa.dto.UserInfoReq;
import com.spring.jpa.dto.UserRegReq;
import com.spring.jpa.entity.User;
import com.spring.jpa.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	
	private final UserRepository userRepository;
	
	public User signUp(UserRegReq userRegReq) {
		User user = new User();
		
		user.setAge(LocalDateTime.now().getYear() - userRegReq.getBirthDate().getYear());
		user.setFood(userRegReq.getFood());
		user.setGender(userRegReq.getGender());
		user.setIsSolo(userRegReq.getIsSolo());
		user.setNickName(userRegReq.getNickName());
		user.setMbti(userRegReq.getMbti());
		
		return userRepository.save(user);
	}
	
	public User getUser(Long userId) {
		return userRepository.findById(userId).get();
	}
	
	public User updateUser(UserInfoReq userInfoReq) {
		User user = userRepository.findById(userInfoReq.getUserId()).get();
		user.setNickName(userInfoReq.getNickName());
		user.setGender(userInfoReq.getGender());
		user.setFood(userInfoReq.getFood());
		user.setIsSolo(userInfoReq.getIsSolo());
		user.setMbti(userInfoReq.getMbti());
		user.setAge(LocalDateTime.now().getYear() - userInfoReq.getBirthDate().getYear());
		userRepository.save(user);
		
		return user;
	}
	
	public void hateUser(Long targetUserId) {
		User targetUser = userRepository.findById(targetUserId).get();
		targetUser.setHate(targetUser.getHate() + 1);
		userRepository.save(targetUser);
	}
}
