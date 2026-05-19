package com.app.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.ems.dto.EmployeeRequestDto;
import com.app.ems.dto.EmployeeResponseDto;
import com.app.ems.entities.Employee;
import com.app.ems.service.IEmployeeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("api/employees")
@Tag(name = "Employee Management", description = "APIs for managing employees")
public class EmployeeController {
	
	@Autowired
	private IEmployeeService empService;
	
	@Operation(summary = "Get all employee list")
	@GetMapping("")
	ResponseEntity<List<EmployeeResponseDto>> getAllEmployees(){
	    //get all employee from service 
		return new ResponseEntity<>(empService.getAllEmployees(), HttpStatus.OK) ;
	}
	
	@Operation(summary = "Add a new employee")
	@PostMapping
	ResponseEntity<?> addEmployee(@Valid @RequestBody EmployeeRequestDto request){
		EmployeeResponseDto registeredEmployee = empService.registerEmployee(request);
		return new ResponseEntity<>(registeredEmployee, HttpStatus.CREATED);
	}
	
	@Operation(summary = "Get employee details by empId")
	@GetMapping("/{empId}")
	ResponseEntity<?> getEmployee(@PathVariable long empId){
		return new ResponseEntity<>(empService.getEmployeeById(empId), HttpStatus.OK);
	}
	
	@Operation(summary = "Delete a employee details by empId")
	@DeleteMapping("/{empId}")
	@PreAuthorize("hasRole('ADMIN')")
	ResponseEntity<?> deleteEmployee(@PathVariable long empId){
		return new ResponseEntity<>(empService.deleteEmployee(empId), HttpStatus.OK);
	}
	
	@Operation(summary = "Update a employee details")
	@PutMapping("/{empId}")
	ResponseEntity<?> updateEmployee(@Valid @RequestBody EmployeeRequestDto emp, @PathVariable long empId){
		
		return new ResponseEntity<>(empService.updateEmployee(empId, emp), HttpStatus.OK);
	}

}
