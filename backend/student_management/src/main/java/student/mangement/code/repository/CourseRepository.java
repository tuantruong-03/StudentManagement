package student.mangement.code.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import student.mangement.code.model.Course;


@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {
	Optional<Course>findByName(String name);
}
