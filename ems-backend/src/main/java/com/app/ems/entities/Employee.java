package com.app.ems.entities;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class Employee extends BaseEntity {

	private String name;
	
	private String email;
	
	private String phone;
	
	
}
