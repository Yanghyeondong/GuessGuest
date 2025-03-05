package com.spring.jpa.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.spring.jpa.dto.HouseStat;
import com.spring.jpa.dto.UserReq;
import com.spring.jpa.entity.Food;
import com.spring.jpa.entity.House;
import com.spring.jpa.entity.Mbti;
import com.spring.jpa.entity.Place;
import com.spring.jpa.entity.User;
import com.spring.jpa.repository.HouseRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HouseService {
	
	private final HouseRepository houseRepository;
	
	// 모든 게스트하우스 조회 (사용 안함)
	public List<House> getHouses() {
		return houseRepository.findAll();
	}
	
	// 날짜별 게스트하우스 통계
	public HouseStat getHouseStat(Long houseId, LocalDateTime date) {
		
		List<User> userList = houseRepository.getUserByhouseIdAndDate(houseId, date);
		
		HouseStat houseStat = new HouseStat();
		houseStat.calculateStat(userList);
		
		return houseStat;
	}
	
	// 날짜별 게스트 하우스 투숙객 목록
	public List<User> getStayingUser(Long houseId, LocalDateTime date) {
		return houseRepository.getUserByhouseIdAndDate(houseId, date);
	}
	
	// 필터 옵션 기반 게스트 하우스 리스트
	public List<House> getHouseByFiltering(String filter) {
		if(filter.equals("해운대")) 
			return houseRepository.findByPlaceOrderByTotalUserDesc(Place.해운대);
		
		if(filter.equals("애월")) 
			return houseRepository.findByPlaceOrderByTotalUserDesc(Place.애월);
		
		if(filter.equals("경포대")) 
			return houseRepository.findByPlaceOrderByTotalUserDesc(Place.경포대);
		
		if(filter.equals("양양")) 
			return houseRepository.findByPlaceOrderByTotalUserDesc(Place.양양);

		if(filter.equals("E"))
			return houseRepository.OrderByMbtiEDesc();
		
		if(filter.equals("I"))
			return houseRepository.OrderByMbtiIDesc();
		
		if(filter.equals("20"))
			return houseRepository.OrderByAge20Desc();
		
		if(filter.equals("30"))
			return houseRepository.OrderByAge30Desc();
		
		if(filter.equals("40"))
			return houseRepository.OrderByAge40Desc();
		
		if(filter.equals("solo"))
			return houseRepository.OrderBySoloDesc();
		
		if(filter.equals("notSolo"))
			return houseRepository.OrderByNotSoloDesc();
		
		if(filter.equals("male"))
			return houseRepository.OrderByMaleRatio();
		
		return houseRepository.OrderByFemaleRatio();
	}
	
	//AI 추천 게스트 하우스 리스트
//	public List<House> getHouseByAi(UserReq userReq) {
//		
//	}
}
