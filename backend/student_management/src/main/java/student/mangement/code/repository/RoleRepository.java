package student.mangement.code.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import student.mangement.code.model.Role;



public interface RoleRepository extends MongoRepository<Role, Integer> {
	Optional<Role> findByAuthority(String authority);
}
