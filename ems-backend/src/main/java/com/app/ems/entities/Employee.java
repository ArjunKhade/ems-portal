package com.app.ems.entities;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Employee extends BaseEntity {

	private String name;

    private String email;

    private String phone;

    private String department;

    private String position;

    private String location;

    private LocalDate joiningDate;

    private LocalDate dob;

    private double salary;

    private int age;
	
	
}
