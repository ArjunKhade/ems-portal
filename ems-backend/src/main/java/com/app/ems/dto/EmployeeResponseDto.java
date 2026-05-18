package com.app.ems.dto;

import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class EmployeeResponseDto extends BaseDto {
	
	private String name;
	
	private String email;
	
	private String phone;
	
	
}
