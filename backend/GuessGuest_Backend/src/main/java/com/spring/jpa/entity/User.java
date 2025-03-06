package com.spring.jpa.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
public class User {
	@Id
	@Column(name="user_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userId;
	
	@Column(name="nickname")
	private String nickName;
	
	@Column(name="phone_number")
	private String phoneNumber;
	
	private Boolean gender;
	
	private Integer age;
	
	@Column(name="is_solo")
	private Boolean isSolo;
	
	private Integer hate;
	
	@Enumerated(EnumType.STRING)
	private Food food;
	@Enumerated(EnumType.STRING)
	private Mbti mbti;
	
	@Column(name="visit_place")
	private String visitPlace;
	
	private String description;
	
//	@OneToMany(mappedBy = "user")
//	private List<Reservation> reservations = new ArrayList<>();
}
