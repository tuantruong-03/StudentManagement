package student.mangement.code.service.impl;

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
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> user = userRepository.findByUsername(username);
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

}
