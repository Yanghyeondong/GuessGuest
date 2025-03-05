package com.spring.jpa.dto;

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
	private Date birthDate;
	private Boolean gender;
	private Boolean isSolo;
	private Mbti mbti;
	private Food food;
}
