package com.app.ems.dto;
import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class EmployeeRequestDto {

	@NotBlank(message = "Name is required")
	private String name;
	
	@Email(message = "Invalid email format")
	@NotBlank(message = "Email is required")
	private String email;
	
	@Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digit")
	private String phone;
	
	@NotBlank(message = "Department is required")
	private String department;
	
	@NotBlank(message = "Position is required")
	private String position;
	
	@NotBlank(message = "Location is required")
	private String location;
	
	@NotNull(message = "Joining Date is required")
	@PastOrPresent(message = "Joining date cannot be in future")
	private LocalDate joiningDate;
	
	@Past(message = "DOB must be past date")
	@NotNull(message = "Date of birth is required")
	private LocalDate dob;
	
	@Positive(message = "Salary must be greater than 0")
	private double salary;
	
	@Min(value = 18, message = "Age must be atleast 18")
	private int age;
	
	
}
