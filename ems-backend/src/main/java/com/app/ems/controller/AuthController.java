package com.app.ems.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.ems.dto.ApiResponse;
import com.app.ems.dto.UserSignupRequest;
import com.app.ems.dto.AuthResponse;
import com.app.ems.dto.UserLoginRequest;
import com.app.ems.entities.User;
import com.app.ems.service.IUserService;
import com.app.ems.utils.JWTUtils;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
	
	private final JWTUtils jwtUtils;
	private final IUserService userService;
	private final AuthenticationManager authenticationManager;
	
	
	// register new user 
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody UserSignupRequest request){
		boolean findUserByEmail = userService.findUserByEmail(request.getEmail());
		if(!findUserByEmail) {
			return ResponseEntity.status(HttpStatus.CREATED).body(userService.addUser(request));
		}else {
			return new ResponseEntity<ApiResponse>(new ApiResponse("Duplicate User Entry Email Id Already Exist!!!!"),
					HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> validateUserCreateToken(@Valid @RequestBody UserLoginRequest request) {
	
		try {
			// authenticate the credentials
			Authentication authenticatedDetails = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),
					request.getPassword()));
			// => auth succcess
			User user = userService.getUserByEmail(request.getEmail());
			return ResponseEntity
					.ok(new AuthResponse(jwtUtils.generateJwtToken(authenticatedDetails), user.getId(), user.getName()));
		} catch (BadCredentialsException e) { // lab work : replace this by a method in global exc handler
			// send back err resp code
			System.out.println("err " + e);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
		}
	}
	

}
