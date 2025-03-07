package com.spring.jpa.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.spring.jpa.dto.HouseStat;
import com.spring.jpa.dto.UserReq;
import com.spring.jpa.entity.House;
import com.spring.jpa.entity.Place;
import com.spring.jpa.entity.User;
import com.spring.jpa.service.HouseService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.OPTIONS}, maxAge = 6000)
@RestController
@RequiredArgsConstructor
@Tag(name = "게스트 하우스", description = "게스트하우스 관련 API")
public class HouseController {

	final HouseService houseService;
	
	@GetMapping("/houses/stat")
	@Operation(summary = "게하 통계자료", description = "특정 날짜에 머무는 사용자들의 통계자료를 반환")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Success",
					content = {@Content(schema = @Schema(implementation = HouseStat.class))})
	})
	public ResponseEntity<?> getHouseStat(@RequestParam Long houseId, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
		return ResponseEntity.status(200).body(houseService.getHouseStat(houseId, date.atStartOfDay()));
	}
	
	@GetMapping("houses/user")
	@Operation(summary = "게하 유저 리스트", description = "특정 날짜에 머무는 사용자들의 리스트를 반환")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Success",
					content = {@Content(array = @ArraySchema(schema = @Schema(implementation = User.class)))})
	})
	public ResponseEntity<?> getStayingUser(@RequestParam Long houseId, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
		return ResponseEntity.status(200).body(houseService.getStayingUser(houseId, date.atStartOfDay()));
	}
	
	@GetMapping("/houses")
	@Operation(summary = "게하 리스트", description = "필터로 정렬된 게하 리스트를 반환")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Success",
					content = {@Content(array = @ArraySchema(schema = @Schema(implementation = House.class)))})
	})
	public ResponseEntity<?> getHouseList(@RequestParam Place filter) {
		return ResponseEntity.status(200).body(houseService.getHouseByFiltering(filter));
	}
	
	@PostMapping("/houses/ai")
	@Operation(summary = "AI 기반 게하 리스트", description = "AI로 추천된 게하 리스트를 반환")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Success",
					content = {@Content(array = @ArraySchema(schema = @Schema(implementation = House.class)))})
	})
	public ResponseEntity<?> getHouseListByAI(@RequestBody UserReq userReq) {
		return ResponseEntity.status(200).body(houseService.getHouseByAi(userReq));
	}
}
