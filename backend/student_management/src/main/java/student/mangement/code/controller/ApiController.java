package student.mangement.code.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import io.jsonwebtoken.Claims;
import student.mangement.code.model.User;
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
	
	@GetMapping("/students")
	@ResponseBody
	List<User> getStudents() {
		return userService.findAllUsers().stream()
                      .filter(user -> user.getAuthorities().stream()
                                         .anyMatch(authority -> "ROLE_STUDENT".equals(authority.getAuthority())))
					.toList();
	}

	@GetMapping("/teachers")
	@ResponseBody
	List<User> getTeachers() {
		return userService.findAllUsers().stream()
						.filter(user -> user.getAuthorities().stream()
						.anyMatch(authority -> "ROLE_TEACHER".equals(authority.getAuthority())))
		.toList();
	}

	@GetMapping("/token")
	@ResponseBody
	String getToken() {
		JwtUtil jwtUtil = new JwtUtil();
		User user = userService.findAllUsers().get(1);
		System.out.println("/token");
		Boolean isVerified = jwtUtil.validateToken(token, user);
		Claims claims = jwtUtil.getAllClaimsFromToken(token);
		System.out.println(claims.toString());
		return claims.getSubject();
	}
}
