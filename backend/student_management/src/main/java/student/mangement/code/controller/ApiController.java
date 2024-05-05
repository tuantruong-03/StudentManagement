package student.mangement.code.controller;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import io.jsonwebtoken.Claims;
import student.mangement.code.dto.UserDTO;
import student.mangement.code.model.Role;
import student.mangement.code.model.User;
import student.mangement.code.repository.UserRepository;
import student.mangement.code.service.CourseService;
import student.mangement.code.service.UserService;
import student.mangement.code.utils.JwtUtil;

@Controller
@RequestMapping("/api")
public class ApiController {
	private String token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqb2huZG9lIiwiZXhwIjoxNzEzOTgxODkwLCJpYXQiOjE3MTM5NjM4OTB9.aAELEE5oWAMUOPnLQwC19QtaLW1gvt4qFH4ZuaqnfeEuJm4tOamgVIS1_GvbRE1GOnlB5eNC16sPHHb3RMq4hA";
	@Autowired
	CourseService courseService;
	@Autowired
	UserService userService;
	// Teacher API
	@GetMapping("/allTeachers")
	@ResponseBody
	ResponseEntity<List<UserDTO>> getTeachers() {
		List<UserDTO> userList = userService.findAllUsers().stream()
                      .filter(user -> user.getAuthorities().stream()
                                         .anyMatch(authority -> "ROLE_TEACHER".equals(authority.getAuthority())))
										 .map(user -> new UserDTO(user))
					.toList();
		return new ResponseEntity<>(userList, HttpStatus.OK);
	}
	@GetMapping("/numberOfTeachers")
	@ResponseBody
	ResponseEntity<Long> countTeachers() {
		Long count = userService.countByAuthority("ROLE_TEACHER");
		return new ResponseEntity<>(count,HttpStatus.OK);
	}
	@GetMapping("/teachers")
	@ResponseBody
	ResponseEntity<List<UserDTO>> getTeachersByPage(@RequestParam Map<String, String> param) {
		// "page" counted from 1, but in SQL it is counted from 0

		int size = 5; // Set default
		String page_raw = (String)param.get("page");
		int page = page_raw == null ? 0 : Integer.parseInt(page_raw) - 1;
		List<User> userList = userService.findUsersByAuthorityAndPagination("ROLE_TEACHER", page, size);
		List<UserDTO> userDTOs = userList.stream()
			.map(user -> new UserDTO(user))
			.toList();
		return new ResponseEntity<>(userDTOs,HttpStatus.OK);
	}
	// Student API	
	@GetMapping("/allStudents")
	@ResponseBody
	ResponseEntity<List<UserDTO>> getStudents() {
		List<UserDTO> userList = userService.findAllUsers().stream()
                      .filter(user -> user.getAuthorities().stream()
                                         .anyMatch(authority -> "ROLE_STUDENT".equals(authority.getAuthority())))
										 .map(user -> new UserDTO(user))
					.toList();
		return new ResponseEntity<>(userList, HttpStatus.OK);
	}

	@GetMapping("/numberOfStudents")
	@ResponseBody
	ResponseEntity<Long> countStudents() {
		Long count = userService.countByAuthority("ROLE_STUDENT");
		return new ResponseEntity<>(count,HttpStatus.OK);
	}

	@GetMapping("/students")
	@ResponseBody
	ResponseEntity<List<UserDTO>> getStudentsByPage(@RequestParam Map<String, String> param) {
		// "page" counted from 1, but in SQL it is counted from 0

		int size = 5; // Set default
		String page_raw = (String)param.get("page");
		int page = page_raw == null ? 0 : Integer.parseInt(page_raw) - 1;
		List<User> userList = userService.findUsersByAuthorityAndPagination("ROLE_STUDENT", page, size);
		List<UserDTO> userDTOs = userList.stream()
			.map(user -> new UserDTO(user))
			.toList();
		return new ResponseEntity<>(userDTOs,HttpStatus.OK);
	}
	// Course API

	
	@GetMapping("/token")
	@ResponseBody
	String getToken() {
		JwtUtil jwtUtil = new JwtUtil();
		User user = userService.findAllUsers().get(1);
		System.out.println("/token");
		Boolean isVerified = jwtUtil.validateToken(token);
		Claims claims = jwtUtil.getAllClaimsFromToken(token);
		System.out.println(claims.toString());
		return claims.getSubject();
	}
}
