package com.spring.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.jpa.entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long>{

}
