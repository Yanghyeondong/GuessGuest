package com.spring.jpa.service;

import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.stereotype.Service;

import com.spring.jpa.dto.UserInfoReq;
import com.spring.jpa.entity.User;
import com.spring.jpa.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	
	private final UserRepository userRepository;
	
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
