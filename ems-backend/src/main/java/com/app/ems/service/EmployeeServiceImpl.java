package com.app.ems.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.ems.dto.ApiResponse;
import com.app.ems.dto.EmployeeRequestDto;
import com.app.ems.dto.EmployeeResponseDto;
import com.app.ems.entities.Employee;
import com.app.ems.exceptions.EmployeeHandlingException;
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
		Employee employee = empRepo.findById(empId)
				.orElseThrow(()-> new EmployeeHandlingException("Employee with Id "+empId+" Not found!"));
		return  empMapper.toDto(employee);
	}

	@Override
	public EmployeeResponseDto updateEmployee(Long empId, EmployeeRequestDto request) {
		// find employee by id
		Employee employee = empRepo.findById(empId)
				.orElseThrow(()-> new EmployeeHandlingException("Employee with Id "+empId+" Not found!"));
		//update employee details
		employee.setAge(request.getAge());
		employee.setDepartment(request.getDepartment());
		employee.setDob(request.getDob());
		employee.setEmail(request.getEmail());
		employee.setJoiningDate(request.getJoiningDate());
		employee.setLocation(request.getLocation());
		employee.setName(request.getName());
		employee.setPhone(request.getPhone());
		employee.setPosition(request.getPosition());
		employee.setSalary(request.getSalary());
		//save employee
		Employee savedEmployee = empRepo.save(employee);
		
		return empMapper.toDto(savedEmployee);
	}

	@Override
	public ApiResponse deleteEmployee(Long empId) {
		Employee employee = empRepo.findById(empId)
		         .orElseThrow(()-> new EmployeeHandlingException("Employee with Id "+empId+" Not found!"));
		empRepo.delete(employee);
		return new ApiResponse("Employee with id "+empId+" deleted successfully!");
	}

}
