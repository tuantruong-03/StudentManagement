package student.mangement.code.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import student.mangement.code.model.Course;
import student.mangement.code.repository.CourseRepository;
import student.mangement.code.service.CourseService;


@Service
public class CourseServiceImpl implements CourseService {
	@Autowired
	CourseRepository courseRepository;
	
	@Override
	public List<Course> findAllCourses() {
		return courseRepository.findAll();
	}

	@Override
	public List<Course> findCoursesByPage(int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		return courseRepository.findByPage(pageable);
	}

	@Override
	public long countCourse() {
		return courseRepository.count();
	}

}
