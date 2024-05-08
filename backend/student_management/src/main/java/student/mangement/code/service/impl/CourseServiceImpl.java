package student.mangement.code.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import student.mangement.code.dto.CourseDTO;
import student.mangement.code.model.Course;
import student.mangement.code.model.User;
import student.mangement.code.repository.CourseRepository;
import student.mangement.code.service.CourseService;


@Service
public class CourseServiceImpl implements CourseService {
	@Autowired
	CourseRepository courseRepository;

	@Override
	public Course findCourseByCourseId(int courseId) {
		// TODO Auto-generated method stub
		Optional<Course> course = courseRepository.findById(courseId);
		return course.isEmpty() ? null : course.get();
	}
	
	@Override
	public List<Course> findAllCourses() {
		return courseRepository.findAll();
	}

	@Override
	public List<CourseDTO> findCoursesByPage(int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		List<Course> courseList = courseRepository.findByPage(pageable);
		return courseList.stream()
		.map(course -> new CourseDTO(course, (int)countStudentsOfCourse(course.getCourseId())))
		.toList();
	}

	@Override
	public long countCourse() {
		return courseRepository.count();
	}

	@Override
	public List<User> findStudentsOfCourse(int courseId) {
		Course course = findCourseByCourseId(courseId);
		List<User> userList = course.getUsers();
		return userList.stream()
			.filter(user -> user.getAuthorities().stream().anyMatch(a -> "ROLE_STUDENT".equals(a.getAuthority())))
			.toList();
	}

	@Override
	public List<User> findTeachersOfCourse(int courseId) {
		Course course = findCourseByCourseId(courseId);
		List<User> userList = course.getUsers();
		return userList.stream()
			.filter(user -> user.getAuthorities().stream().anyMatch(a -> "ROLE_TEACHER".equals(a.getAuthority())))
			.toList();
	}

	@Override
	public long countStudentsOfCourse(int courseId) {
		Course course = findCourseByCourseId(courseId);
		List<User> userList = course.getUsers();
		return userList.stream()
			.filter(user -> user.getAuthorities().stream().anyMatch(a -> "ROLE_STUDENT".equals(a.getAuthority())))
			.count();
	}

	@Override
	public long countTeachersOfCourse(int courseId) {
		Course course = findCourseByCourseId(courseId);
		List<User> userList = course.getUsers();
		return userList.stream()
			.filter(user -> user.getAuthorities().stream().anyMatch(a -> "ROLE_TEACHER".equals(a.getAuthority())))
			.count();
	}

	@Override
	public Course findCourseByName(String name) {
		Optional<Course> course = courseRepository.findByName(name);
		return course.isEmpty() ? null : course.get();
	}

	@Override
	public Course saveCourse(Course course) {
		return courseRepository.save(course);
	}

	@Override
	public void deleteCourse(Course existingCourse) {
		courseRepository.delete(existingCourse);
	}

	

}
