package student.mangement.code.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

}
