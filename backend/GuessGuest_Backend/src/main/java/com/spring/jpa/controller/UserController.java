package com.spring.jpa.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.jpa.dto.HateUserReq;
import com.spring.jpa.dto.UserInfoReq;
import com.spring.jpa.dto.UserReq;
import com.spring.jpa.entity.User;
import com.spring.jpa.service.HouseService;
import com.spring.jpa.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@RequiredArgsConstructor
@Tag(name = "유저", description = "유저 관련 API")
public class UserController {
	
	final UserService userService;
	
	@PostMapping("/users")
	@Operation(summary = "유저 정보 반환", description = "ID값을 바탕으로 해당 유저의 정보를 반환합니다.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Success",
					content = {@Content(schema = @Schema(implementation = User.class))})
	})
	public ResponseEntity<?> getUser(@RequestBody UserReq userReq) {
		return ResponseEntity.status(200).body(userService.getUser(userReq.getUserId()));
	}
	
	@PutMapping("/users")
	@Operation(summary = "유저 정보 업데이트", description = "ID값을 바탕으로 해당 유저의 정보를 업데이트합니다.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Success",
					content = {@Content(schema = @Schema(implementation = User.class))})
	})
	public ResponseEntity<?> updateUser(@RequestBody UserInfoReq userInfoReq) {
		return ResponseEntity.status(200).body(userService.updateUser(userInfoReq));
	}
	
	@PostMapping("/users/hate")
	@Operation(summary = "싫어요 버튼", description = "Body에 담긴 target User에게 싫어요 값을 1 추가합니다.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Success",
					content = {@Content(schema = @Schema(implementation = String.class))})
	})
	public ResponseEntity<?> postHate(@RequestBody HateUserReq hateUserReq) {
		userService.hateUser(hateUserReq.getTargetId());
		return ResponseEntity.status(200).body("Success!");
	}
}
