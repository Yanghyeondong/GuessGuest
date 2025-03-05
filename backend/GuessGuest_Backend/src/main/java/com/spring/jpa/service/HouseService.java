package com.spring.jpa.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.spring.jpa.dto.HouseStat;
import com.spring.jpa.dto.UserReq;
import com.spring.jpa.entity.Food;
import com.spring.jpa.entity.House;
import com.spring.jpa.entity.Mbti;
import com.spring.jpa.entity.Place;
import com.spring.jpa.entity.Reservation;
import com.spring.jpa.entity.User;
import com.spring.jpa.repository.HouseRepository;
import com.spring.jpa.repository.ReservationRepository;
import com.spring.jpa.repository.UserRepository;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@EnableScheduling
public class HouseService {
	
	private final HouseRepository houseRepository;
	private final ReservationRepository reservationRepository;
	private final UserRepository userRepository;
    private final CosineSimilarityService cosineSimilarity;
    private final DataNormalizationService dataNormalization;
	
	@PostConstruct()
	@Scheduled(cron = "0 0 0 * * ?")
	public void updateTotalData() {
		List<House> houseList = houseRepository.findAll();
		
		for(House house : houseList) {
			
			List<User> userList = new ArrayList<>();
					
			reservationRepository.findByHouse(house.getHouseId())
				.forEach(r -> {
					userList.add(r.getUser());
				});
			
			house.calculateStat(userList);
			houseRepository.save(house);
		}
	}
	
	

    
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
	public List<House> getHouseByAi(UserReq userReq) {

		List<House> houses = houseRepository.findAll();
		List<Long> houseIds = new ArrayList<>();
		List<List<Integer>> houseData = new ArrayList<>();

	    for (House house : houses) {
	        List<Integer> houseValues = new ArrayList<>();
	        
	        houseValues.add( 
	        		((house.getAge20()*25)+(house.getAge30()*35)+(house.getAge40()*45))
	        		/(house.getAge20()+house.getAge30()+house.getAge40()) 
	        );
	        
	        int max = Math.max(house.getChinese(),  Math.max(house.getJapanese(), house.getKorean()));
	        houseValues.addAll(Arrays.asList(
	        	house.getKorean() == max ? 1 : 0,
        	    house.getChinese() == max ? 1 : 0,
        	    house.getJapanese() == max ? 1 : 0
        	));
	        
	        houseValues.add(house.getMbtiE() > house.getMbtiI() ? 1 : 0);
	        houseValues.add(house.getSolo() >= house.getNotSolo() ? 1 : 0);
	        
	        houseIds.add(house.getHouseId());
	        houseData.add(houseValues);
	    }
	    
//	    System.out.println("HouseId: " + houseIds);
//	    System.out.println("houseData: " + houseData);
	    
        List<List<Double>> normalizedHouseData = houseData.stream()
        	    .map(i -> dataNormalization.logTransform(i))
        	 .collect(Collectors.toList());
        
//        System.out.println("normalizedHouseData: " + normalizedHouseData);

        User user = userRepository.findById(userReq.getUserId()).get();
        List<Integer> userData = new ArrayList<>();
        
        userData.add(user.getAge());
        userData.add(user.getFood() == Food.Korean ? 1 : 0);
        userData.add(user.getFood() == Food.Chinese ? 1 : 0);
        userData.add(user.getFood() == Food.Japanese ? 1 : 0);
        userData.add(user.getMbti() == Mbti.E ? 1 : 0);
        userData.add(user.getIsSolo() ? 1 : 0);
        
//	    System.out.println("userData: " + userData);
	    
        List<Double> normalizedUserData = dataNormalization.logTransform(userData);
//        System.out.println("normalizedUserData: " + normalizedUserData);
        
        cosineSimilarity.train(houseIds, normalizedHouseData);
        List<Long> recommendedHouseIds = cosineSimilarity.classify(normalizedUserData);
//        System.out.println("추천된 집 ID: " + recommendedHouseIds);
        
        List<House> recommendedHouses = recommendedHouseIds.stream()
                .map(houseId -> houses.stream().filter(h -> h.getHouseId().equals(houseId)).findFirst().orElse(null))
                .collect(Collectors.toList());
        
        return recommendedHouses;
	}
}
