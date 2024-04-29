package student.mangement.code.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import student.mangement.code.model.User;


public interface UserService extends UserDetailsService {
	List<User> findAllUsers();	
	long countByAuthority(String authority);
	List<User> findUsersByAuthorityAndPagination(String authority, int page, int size);

}
