package com.app.ems.service;
import java.util.List;

import com.app.ems.dto.ApiResponse;
import com.app.ems.dto.EmployeeRequestDto;
import com.app.ems.dto.EmployeeResponseDto;


public interface IEmployeeService {

	 List<EmployeeResponseDto> getAllEmployees();
	
	 EmployeeResponseDto registerEmployee(EmployeeRequestDto request);
	 
	 EmployeeResponseDto getEmployeeById(Long empId);
	 
	 EmployeeResponseDto updateEmployee(Long empId, EmployeeRequestDto request);
	 
	 ApiResponse deleteEmployee(Long empId);
	
}
