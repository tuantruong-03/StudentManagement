package student.mangement.code.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import student.mangement.code.model.User;
import student.mangement.code.repository.UserRepository;
import student.mangement.code.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;


	@Override
	public List<User> findAllUsers() {
		return userRepository.findAll();
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException { // username is equivalent to email
		Optional<User> user = userRepository.findByEmail(username);
		if (user.isEmpty()) {
			return null;
		}
		return user.get();
	}

	@Override
	public long countByAuthority(String authority) {
		return userRepository.countByAuthority(authority);
	}

	@Override
	public List<User> findUsersByAuthorityAndPagination(String authority, int page, int size) {
		Pageable pageable = PageRequest.of(page,size);
		return userRepository.findUsersByAuthorityAndPagination(authority, pageable);
	}

	@Override
	public User saveUser(User user) {
		return userRepository.save(user);
	}

	@Override
	// user.isEmtpy() ? null : user.get()
	public User findUserByEmail(String email) {
		Optional<User> user = userRepository.findByEmail(email);
		if (user.isEmpty()) {
			return null;
		}
		return user.get(); 
	}

	@Override
	public void deletUser(User user) {
		userRepository.delete(user);
	}

	@Override
	public User updateUser(User user) {
		Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
		if (existingUser.isEmpty()) {
			return null;
		}
		User updatedUser = existingUser.get();
		updatedUser.setFirstName(user.getFirstName());
		updatedUser.setLastName(user.getLastName());
		updatedUser.setModifiedAt(new Date());
		userRepository.save(updatedUser);
		return updatedUser;
	}

}
