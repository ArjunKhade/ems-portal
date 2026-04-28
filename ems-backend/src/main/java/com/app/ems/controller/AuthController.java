package com.app.ems.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.app.ems.dto.AuthRequest;
import com.app.ems.dto.AuthResponse;
import com.app.ems.service.UserService;
import com.app.ems.utils.JWTUtils;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
	
	private final AuthenticationManager authenticationManager;
	private final JWTUtils jwtUtils;
	private final UserService userService;
	
	@PostMapping("/login")
	ResponseEntity<AuthResponse> login (@Valid @RequestBody AuthRequest request){
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(
							request.getEmail(), request.getPassword())
					);
		}
		
		
		
	}

}
