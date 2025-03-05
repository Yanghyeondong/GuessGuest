package com.spring.jpa.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
public class House {
	@Id
	@Column(name="house_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long houseId;
	
	private String name;
	
	@Column(name="reserve_url")
	private String reserveUrl;
	@Column(name="total_user")
	private Integer totalUser;
	private Integer male;
	private Integer female;
	private Integer korean;
	private Integer japanese;
	private Integer chinese;
	
	@Column(name="mbti_e")
	private Integer mbtiE;
	
	@Column(name="mbti_i")
	private Integer mbtiI;
	
	@Column(name="age_20")
	private Integer age20;
	@Column(name="age_30")
	private Integer age30;
	@Column(name="age_40")
	private Integer age40;
	
	private Integer solo;
	@Column(name="not_solo")
	private Integer notSolo;
	
	@Enumerated(EnumType.STRING)
	private Place place;
	
	private String address;
	
	private String description;
	
//	@OneToMany(mappedBy = "House")
//	private List<Reservation> reservations = new ArrayList<>();
}
