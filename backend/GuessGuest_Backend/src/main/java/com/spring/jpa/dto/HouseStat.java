package com.spring.jpa.dto;

import java.util.List;

import com.spring.jpa.entity.Food;
import com.spring.jpa.entity.Mbti;
import com.spring.jpa.entity.User;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class HouseStat {
	private Integer totalUser;
	private Integer male;
	private Integer female;
	private Integer korean;
	private Integer japanese;
	private Integer chinese;

	private Integer mbtiE;
	private Integer mbtiI;
	private Integer age20;
	private Integer age30;
	private Integer age40;
	
	private Integer solo;

	private Integer notSolo;
	
	public HouseStat() {
		totalUser = 0;
		male = 0;
		female = 0;
		korean = 0;
		japanese = 0;
		chinese = 0;
		mbtiE = 0;
		mbtiI = 0;
		age20 = 0;
		age30 = 0;
		age40 = 0;
		solo = 0;
		notSolo = 0;
	}
	
	public void calculateStat(List<User> userList) {
		this.totalUser = userList.size();
		
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
}
