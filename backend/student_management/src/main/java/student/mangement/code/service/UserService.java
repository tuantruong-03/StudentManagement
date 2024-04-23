package student.mangement.code.service;

import java.util.List;

import org.springframework.stereotype.Service;

import student.mangement.code.model.User;


public interface UserService {
	List<User> findAllUsers();

}
