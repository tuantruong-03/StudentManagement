package student.mangement.code.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import student.mangement.code.model.User;


public interface UserRepository extends MongoRepository<User, Integer> {
	Optional<User> findByEmail(String email);


	// @Query("SELECT COUNT(u) FROM User u JOIN u.authorities a WHERE a.authority = :authority")
    long countByAuthority(@Param("authority") String authority);

	// @Query("SELECT u FROM User u JOIN u.authorities a WHERE a.authority = :authority")
	List<User> findUsersByAuthorityAndPagination(@Param("authority") String authority, Pageable pageable);


}
