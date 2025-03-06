package com.spring.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.spring.jpa.entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long>{
	
	@Query("SELECT r FROM Reservation r WHERE r.house.houseId = :houseId")
	public List<Reservation> findByHouse(Long houseId);
}
