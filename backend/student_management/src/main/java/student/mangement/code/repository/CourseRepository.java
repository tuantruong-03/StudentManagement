package student.mangement.code.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import student.mangement.code.model.Course;


@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {
	Optional<Course>findByName(String name);
	@Query("SELECT c FROM Course c")
	List<Course> findByPage(Pageable pageable);
	@Query("SELECT COUNT(c) FROM Course c")
    long count();
}
