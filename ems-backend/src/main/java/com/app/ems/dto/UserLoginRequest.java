package com.app.ems.dto;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserLoginRequest {
	
	@NotBlank(message = "Email can't be blank or null")
     private String email;
	
	@NotBlank(message = "password can't be blank or null")
     private String password;
	
}
