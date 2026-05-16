package com.app.ems.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.ems.entities.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {
	
	

}
