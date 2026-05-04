package com.app.ems.service;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.ems.dto.UserSignupRequest;
import com.app.ems.entities.Role;
import com.app.ems.entities.User;
import com.app.ems.entities.UserRole;
import com.app.ems.exceptions.UserHandlingException;
import com.app.ems.repo.RoleRepository;
import com.app.ems.repo.UserRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements IUserService {
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
	RoleRepository roleRepo;

	@Override
	public User addUser(UserSignupRequest request) {
		User user= new User();
		user.setName(request.getName());
		user.setEmail(request.getEmail());

		String roleStr = request.getRole(); // e.g., "ADMIN"
		
		 // Convert String to Enum
		UserRole roleEnum = UserRole.valueOf(roleStr.toUpperCase());
		
		  // Fetch Role entity from DB
        Role roleEntity = roleRepo.findByRole(roleEnum)
                .orElseThrow(() -> new RuntimeException("Role not found: " + roleEnum));
		
		 // Set role to user
        Set<Role> roles = new HashSet<>();
        roles.add(roleEntity);
        user.setRoles(roles);
		
		user.setActive(true);
		user.setPassword(encoder.encode(request.getPassword()));
		return  userRepo.save(user);
	}

	@Override
	public boolean findUserByEmail(String email) {
		Optional<User> user = userRepo.findByEmail(email);
		return user.isPresent();
	}

	@Override
	public User getUserByEmail(String email) {
		User user = userRepo.findByEmail(email)
				.orElseThrow(()-> new UserHandlingException("Use with : "+email+" Not Exist"));
		
		return user;
	}

}
