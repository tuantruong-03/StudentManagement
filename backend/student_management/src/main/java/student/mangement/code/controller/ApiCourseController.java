package student.mangement.code.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import student.mangement.code.dto.CourseDTO;
import student.mangement.code.model.Course;
import student.mangement.code.service.CourseService;


@Controller
@ResponseBody
@RequestMapping("/api/v1")
public class ApiCourseController {
	@Autowired
	CourseService courseService;
	
	// Course API
	@GetMapping("/allCourses")
	ResponseEntity<List<Course>> getCourses() {
		List<Course> courseList = courseService.findAllCourses();
		return new ResponseEntity<>(courseList, HttpStatus.OK);
	}

	@GetMapping("/numberOfCourses")
	ResponseEntity<Long> countCourses() {
		Long count = courseService.countCourse();
		return new ResponseEntity<>(count,HttpStatus.OK);
	}

	@GetMapping("/courses")
	ResponseEntity<List<CourseDTO>> getCoursesByPage(@RequestParam Map<String, String> param) {
		// "page" counted from 1, but in SQL it is counted from 0

		int size = 10; // Set default
		String page_raw = (String)param.get("page");
		int page = page_raw == null ? 0 : Integer.parseInt(page_raw) - 1;
		List<CourseDTO> courseList = courseService.findCoursesByPage(page, size);
		return new ResponseEntity<>(courseList,HttpStatus.OK);
	}

	@PostMapping("/course")
	ResponseEntity<Course> processPostCourse(@RequestBody Map<String, Object> body) {
		System.out.println(body.toString());
		Long count = courseService.countCourse();
		return new ResponseEntity<>(null,HttpStatus.OK);
	}


}
