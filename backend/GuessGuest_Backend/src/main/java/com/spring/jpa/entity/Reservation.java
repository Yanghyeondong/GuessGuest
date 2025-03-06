package com.spring.jpa.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
public class Reservation {
	@Id
	@Column(name="reservation_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long reservationId;

	@Column(name="start_date")
	private LocalDateTime startDate;
	
	@Column(name="end_date")
	private LocalDateTime endDate;
	
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_Id")
    private User user;
	
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "house_Id")
    private House house;
}
