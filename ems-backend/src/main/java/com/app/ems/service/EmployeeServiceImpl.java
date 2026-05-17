package com.app.ems.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.ems.dto.EmployeeRequestDto;
import com.app.ems.dto.EmployeeResponseDto;
import com.app.ems.entities.Employee;
import com.app.ems.mapper.EmployeeMapper;
import com.app.ems.repo.EmployeeRepo;

@Service
public class EmployeeServiceImpl implements IEmployeeService {
	
	@Autowired
	private EmployeeRepo empRepo;
	
	@Autowired
	private EmployeeMapper empMapper;

	@Override
	public List<EmployeeResponseDto> getAllEmployees() {
		
		List<Employee> employees  = empRepo.findAll();
		
		return empMapper.toDtoList(employees);
		                   	
	}

	@Override
	public EmployeeResponseDto registerEmployee(EmployeeRequestDto request) {
		//map dto to entity
		Employee entity = empMapper.toEntity(request);
		//save entity
		Employee savedEmp = empRepo.save(entity);
		//return dto
		return empMapper.toDto(savedEmp);
	}

	@Override
	public EmployeeResponseDto getEmployeeById(Long empId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public EmployeeResponseDto updateEmployee(Long empId, EmployeeRequestDto request) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deteteEmployee(Long empId) {
		// TODO Auto-generated method stub
		
	}

}
