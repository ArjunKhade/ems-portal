package com.app.ems.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmployeeResponseDto extends BaseDto {
	
	private String name;
	
	private String email;
	
	private String phone;
	
	
}
