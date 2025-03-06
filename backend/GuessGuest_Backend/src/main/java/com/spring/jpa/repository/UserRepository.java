package com.spring.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.jpa.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{

}
