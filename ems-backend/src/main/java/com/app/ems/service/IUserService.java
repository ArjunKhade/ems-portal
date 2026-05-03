package com.app.ems.service;

import com.app.ems.dto.UserSignupRequest;
import com.app.ems.entities.User;

public interface IUserService {
	
	User addUser(UserSignupRequest user);
	
    boolean findUserByEmail(String email);
    
    User getUserByEmail(String email);
    
    
    
}
