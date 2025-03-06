package com.spring.jpa.dto;

import java.time.LocalDate;
import java.util.Date;

import com.spring.jpa.entity.Food;
import com.spring.jpa.entity.Mbti;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserInfoReq {
	private Long userId;
	private String nickName;
	private LocalDate birthDate;
	private Boolean gender;
	private Boolean isSolo;
	private Mbti mbti;
	private Food food;
}
