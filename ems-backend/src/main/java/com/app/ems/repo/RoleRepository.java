package com.app.ems.repo;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.app.ems.entities.Role;
import com.app.ems.entities.UserRole;


public interface RoleRepository extends JpaRepository<Role, Long> {
	
	Optional<Role> findByRole(UserRole role);
	
}
