package student.mangement.code.service;

import java.util.List;

import org.springframework.stereotype.Service;

import student.mangement.code.dto.CourseDTO;
import student.mangement.code.model.Course;
import student.mangement.code.model.User;


public interface CourseService {

	Course saveCourse(Course course);
	Course findCourseByCourseId(int courseId);
	Course findCourseByName(String name);
	List<Course> findAllCourses();
	List<CourseDTO> findCoursesByPage(int page, int size);
	List<User> findStudentsOfCourse(int courseId);
	List<User> findTeachersOfCourse(int courseId);
	long countStudentsOfCourse(int courseId);
	long countTeachersOfCourse(int courseId);
	long countCourse();
	void deleteCourse(Course existingCourse);
    Course updateCourse(Course course);
	void insertUserToCourse(User user, Course course);
	void deleteUserFromCourse(User user, Course course);
}
