package student.mangement.code.service;

import java.util.List;

import org.springframework.stereotype.Service;

import student.mangement.code.model.Course;


public interface CourseService {
	List<Course> findAllCourses();
	List<Course> findCoursesByPage(int page, int size);
	long countCourse();
}
