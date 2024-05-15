package student.mangement.code.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import student.mangement.code.model.Course;


public interface CourseRepository extends MongoRepository<Course, Integer> {
	Optional<Course> findByName(String name);
	Optional<Course> findByCourseId(int courseId);
	// @Query("SELECT c FROM Course c")
	List<Course> findByPage(Pageable pageable);
	// @Query("SELECT COUNT(c) FROM Course c")
    long count();
}
