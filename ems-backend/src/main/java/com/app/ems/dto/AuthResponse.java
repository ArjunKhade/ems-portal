package com.app.ems.dto;
import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {

	private String token;
	
	private long id;
	
	private String name;
	
//	private Collection<? extends GrantedAuthority> roles;
}
