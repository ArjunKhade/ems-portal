package com.app.ems.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.app.ems.dto.EmployeeRequestDto;
import com.app.ems.dto.EmployeeResponseDto;
import com.app.ems.entities.Employee;

@Mapper(componentModel = "spring")
public interface EmployeeMapper {
	
	Employee toEntity(EmployeeRequestDto dto);
	
	EmployeeResponseDto toDto(Employee employee);
	
	List<EmployeeResponseDto> toDtoList(List<Employee> employees);

}
