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
	
	public void calculateStat(List<User> userList) {
		this.totalUser = userList.size();
		this.age20 = 0;
		this.age30 = 0;
		this.age40 = 0;
		this.chinese = 0;
		this.female = 0;
		this.japanese = 0;
		this.korean = 0;
		this.male = 0;
		this.mbtiE = 0;
		this.mbtiI = 0;
		this.notSolo = 0;
		this.solo = 0;
		
		for(User user : userList) {
			
			if(user.getGender()) this.male++;
			else this.female++;
			
			if(user.getFood().equals(Food.Korean)) this.korean++;
			else if(user.getFood().equals(Food.Chinese)) this.chinese++;
			else this.japanese++;
			
			if(user.getMbti().equals(Mbti.E)) this.mbtiE++;
			else this.mbtiI++;
			
			if(user.getAge() >= 20 && user.getAge() < 30) this.age20++;
			else if(user.getAge() < 40) this.age30++;
			else if(user.getAge() < 50) this.age40++;
			
			if(user.getIsSolo()) this.solo++;
			else this.notSolo++;
		}
	}
	
//	@OneToMany(mappedBy = "House")
//	private List<Reservation> reservations = new ArrayList<>();
}
