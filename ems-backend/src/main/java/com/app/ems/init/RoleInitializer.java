package com.app.ems.init;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.app.ems.entities.Role;
import com.app.ems.entities.UserRole;
import com.app.ems.repo.RoleRepository;


@Component
public class RoleInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepo;

    @Override
    public void run(String... args) {
        if (roleRepo.findByRole(UserRole.ROLE_ADMIN).isEmpty()) {
            roleRepo.save(new Role(UserRole.ROLE_ADMIN));
        }

        if (roleRepo.findByRole(UserRole.ROLE_EMPLOYEE).isEmpty()) {
            roleRepo.save(new Role(UserRole.ROLE_EMPLOYEE));
        }
        if (roleRepo.findByRole(UserRole.ROLE_HR).isEmpty()) {
            roleRepo.save(new Role(UserRole.ROLE_HR));
        }
    }
}
