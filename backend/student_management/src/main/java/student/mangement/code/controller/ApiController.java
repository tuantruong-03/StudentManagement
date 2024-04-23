package student.mangement.code.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import student.mangement.code.model.Course;
import student.mangement.code.model.User;
import student.mangement.code.service.CourseService;
import student.mangement.code.service.UserService;

@Controller
@RequestMapping("/api")
public class ApiController {
	
	@Autowired
	CourseService courseService;
	@Autowired
	UserService userService;
	
	@GetMapping("")
	@ResponseBody
	List<String> test() {
		return userService.findAllUsers().get(1).getCourses()
				.stream()
				.map(Course::getName)
				.toList();
	}
}
