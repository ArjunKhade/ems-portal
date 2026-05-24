package com.app.ems.dto;

import java.time.LocalDate;

import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class EmployeeResponseDto extends BaseDto {
	
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
    
    private String status;
	
}
