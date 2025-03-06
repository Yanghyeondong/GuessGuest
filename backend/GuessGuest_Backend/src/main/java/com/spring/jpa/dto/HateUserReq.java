package com.spring.jpa.dto;

import lombok.Data;

@Data
public class HateUserReq {
	private Long userId;
	private Long targetId;
}
