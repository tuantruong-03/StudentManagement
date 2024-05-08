package student.mangement.code.controller;

import java.util.Date;
import java.util.HashMap;
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
@RequestMapping("/admin/course")
public class AdminCourseController {
	@Autowired
	CourseService courseService;

	@PostMapping("")
	ResponseEntity<Course> processPostCourse(@RequestBody Map<String, Object> body) throws NumberFormatException {
		System.out.println(body.toString());
		String name = (String)body.get("name");
		Integer maxNumberOfStudent = Integer.parseInt((String)body.get("maxNumberOfStudent"));
		if (courseService.findCourseByName(name) != null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);	// Course name is used!
		}
		Course course = new Course(name, maxNumberOfStudent,null,new Date(),null);
		Course savedCourse = courseService.saveCourse(course);
		return new ResponseEntity<>(savedCourse,HttpStatus.CREATED);
	}

	@PostMapping("/delete")
	ResponseEntity<?> processDeleteCourse(@RequestBody Map<String, Object> body) throws NumberFormatException {
		Map <String, String> response = new HashMap<>();
		String name = (String)body.get("name");
		Course existingCourse = courseService.findCourseByName(name);
		if (existingCourse!= null){
            courseService.deleteCourse(existingCourse);
            response.put("message", "Success");
			return new ResponseEntity<>(response,HttpStatus.OK);
        }
		response.put("message", "Fail");
		return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
	}
}
