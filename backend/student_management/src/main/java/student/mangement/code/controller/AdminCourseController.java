package student.mangement.code.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import student.mangement.code.model.Course;
import student.mangement.code.model.User;
import student.mangement.code.service.CourseService;
import student.mangement.code.service.UserService;

@Controller
@ResponseBody
@RequestMapping("/admin/course")
public class AdminCourseController {
	@Autowired
	CourseService courseService;
	@Autowired
	UserService userService;

	@PostMapping("")
	ResponseEntity<Course> processPostCourse(@RequestBody Map<String, Object> body) {
		System.out.println(body.toString());

		String name = (String) body.get("name");
		Integer maxNumberOfStudent = null;

		// Attempt to extract maxNumberOfStudent safely
		try {
			maxNumberOfStudent = Integer.parseInt(body.get("maxNumberOfStudent").toString());
		} catch (NumberFormatException | NullPointerException e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST); // Invalid or missing maxNumberOfStudent
		}

		// Check if the course name is already in use
		if (courseService.findCourseByName(name) != null) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST); // Course name is used!
		}

		// Create and save the new course
		Course course = new Course(name, maxNumberOfStudent, null, new Date(), null);
		Course savedCourse = courseService.saveCourse(course);
		return new ResponseEntity<>(savedCourse, HttpStatus.CREATED);
	}

	@PostMapping("/delete")
	ResponseEntity<?> processDeleteCourse(@RequestBody Map<String, Object> body) throws NumberFormatException {
		Map<String, String> response = new HashMap<>();
		String name = (String) body.get("name");
		Course existingCourse = courseService.findCourseByName(name);
		if (existingCourse != null) {
			courseService.deleteCourse(existingCourse);
			response.put("message", "Success");
			return new ResponseEntity<>(response, HttpStatus.OK);
		}
		response.put("message", "Fail");
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	@PostMapping("/put")
	ResponseEntity<?> processUpdateCourse(@RequestBody Map<String, Object> body) {
		String name = (String)body.get("name");
		Integer courseId = 0;
		Integer maxNumberOfStudent = 0;
		try {
			courseId = Integer.parseInt(body.get("courseId").toString()) ;
			maxNumberOfStudent = Integer.parseInt(body.get("maxNumberOfStudent").toString()) ;
			Course course = new Course(courseId, name, maxNumberOfStudent, null);
			Course updatedCourse = courseService.updateCourse(course);
			if (updatedCourse == null) {
				return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity<>(updatedCourse, HttpStatus.OK);

		} catch( NumberFormatException e) {
			Map<String, String> response = new HashMap<>();
			response.put("message", "Invalid number!");
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/{courseId}/insertTeacher")
	ResponseEntity<?> processInsertTeacherToCourse(@PathVariable(name = "courseId") String courseId, @RequestBody List<String> body) {
		System.out.println(body.toString());
		Map<String, Object> response = new HashMap<>();
		try {
			Integer courseIdValue = Integer.parseInt(courseId);
			Course course = courseService.findCourseByCourseId(courseIdValue);
			if (course == null) {	
				response.put("message", "Invalid course id!");
				return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
			}
			for (String email : body) {
				User user = userService.findUserByEmail(email);
				courseService.insertUserToCourse(user, course);
			}
			return new ResponseEntity<>(null, HttpStatus.OK);
		} catch(NumberFormatException e) {
			response.put("message", "Invalid course id!");
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}
	}

}
