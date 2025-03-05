package com.spring.jpa.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.spring.jpa.entity.House;
import com.spring.jpa.entity.Place;
import com.spring.jpa.entity.User;

public interface HouseRepository extends JpaRepository<House, Long>{
//	@Query(value = "SELECT u from User u")
	@Query("SELECT r.user FROM Reservation r WHERE r.house.houseId = :houseId AND (:date BETWEEN r.startDate AND r.endDate)")
	public List<User> getUserByhouseIdAndDate(Long houseId, LocalDateTime date);
	
	public List<House> findByPlaceOrderByTotalUserDesc(Place place);
	
	public List<House> OrderByMbtiEDesc();
	
	public List<House> OrderByMbtiIDesc();
	
	public List<House> OrderByAge20Desc();
	
	public List<House> OrderByAge30Desc();
	
	public List<House> OrderByAge40Desc();
	
	public List<House> OrderBySoloDesc();
	
	public List<House> OrderByNotSoloDesc();
	
	@Query("SELECT h FROM House h ORDER BY (h.male/h.totalUser)")
	public List<House> OrderByMaleRatio();
	
	@Query("SELECT h FROM House h ORDER BY (h.female/h.totalUser)")
	public List<House> OrderByFemaleRatio();
}
