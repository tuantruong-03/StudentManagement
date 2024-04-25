package student.mangement.code.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import student.mangement.code.model.User;


public interface UserService extends UserDetailsService {
	List<User> findAllUsers();
	

}
