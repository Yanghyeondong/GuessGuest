package com.spring.jpa.dto;

import java.time.LocalDate;
import java.util.Date;

import com.spring.jpa.entity.Food;
import com.spring.jpa.entity.Mbti;

import lombok.Data;

@Data
public class UserRegReq {
	private String nickName;
	private LocalDate birthDate;
	private Boolean gender;
	private Boolean isSolo;
	private Mbti mbti;
	private Food food; 
}
