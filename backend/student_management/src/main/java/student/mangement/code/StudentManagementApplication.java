package student.mangement.code;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import student.mangement.code.model.Course;
import student.mangement.code.model.Role;
import student.mangement.code.model.User;
import student.mangement.code.repository.CourseRepository;
import student.mangement.code.repository.RoleRepository;
import student.mangement.code.repository.UserRepository;

@SpringBootApplication
public class StudentManagementApplication {
	
	private List<User> students = new ArrayList<>();
	private List<User> teachers = new ArrayList<>();
	
	private void insertUser(User user, String authority, RoleRepository roleRepository, UserRepository userRepository) {
		if (userRepository.findByUsername(user.getUsername()).isEmpty()) {
			Set<Role> authorities = new HashSet<>();
			authorities.add(roleRepository.findByAuthority(authority).get());
			user.setAuthorities(authorities);
			userRepository.save(user);
			if (authority.equals("ROLE_STUDENT")) {
				students.add(user);
			}
			else if (authority.equals("ROLE_TEACHER")) {
				teachers.add(user);
			}
		}
	}
	private void insertCourse(Course course, List<User> users, CourseRepository courseRepository) {
		if (courseRepository.findByName(course.getName()).isEmpty()) {
			course.setUsers(users);
			courseRepository.save(course);
		}
	}

	public static void main(String[] args) {
		SpringApplication.run(StudentManagementApplication.class, args);
	}
	
	// Add data 
	@Bean
	CommandLineRunner run(RoleRepository roleRepository
			, CourseRepository courseRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			Role adminRole = null;
			Role teacherRole = null;
			Role studentRole = null;
			if (roleRepository.findByAuthority("ROLE_ADMIN").isEmpty()) {
	            adminRole = roleRepository.save(new Role("ROLE_ADMIN"));
	            System.out.println(adminRole);
	        }

	        if (roleRepository.findByAuthority("ROLE_TEACHER").isEmpty()) {
	        	teacherRole = roleRepository.save(new Role("ROLE_TEACHER"));
	            System.out.println(teacherRole);
	        }
	        if (roleRepository.findByAuthority("ROLE_STUDENT").isEmpty()) {
	        	studentRole = roleRepository.save(new Role("ROLE_STUDENT"));
	            System.out.println(studentRole);
	        }
	        
	        insertUser(new User("admin","anhtuantruong3021@gmail.com", passwordEncoder.encode("123"), "Tuan", "Truong", new Date(), null, null), "ROLE_ADMIN", roleRepository, userRepository);
	        insertUser(new User("johndoe","johndoe@example.com", passwordEncoder.encode("123"), "John", "Doe", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
	        insertUser(new User("janedoe","janedoe@example.com", passwordEncoder.encode("123"), "Jane", "Doe", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
	        insertUser(new User("samsmith","samsmith@example.com", passwordEncoder.encode("123"), "Sam", "Smith", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
	        insertUser(new User("alicejones","alicejones@example.com", passwordEncoder.encode("123"), "Alice", "Jones", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
	        insertUser(new User("bobwilliams","bobwilliams@example.com", passwordEncoder.encode("123"), "Bob", "Williams", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
	        insertUser(new User("chloebrown","chloebrown@example.com", passwordEncoder.encode("123"), "Chloe", "Brown", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
	        insertUser(new User("davidlee","davidlee@example.com", passwordEncoder.encode("123"), "David", "Lee", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
	        insertUser(new User("emilypatel","emilypatel@example.com", passwordEncoder.encode("123"), "Emily", "Patel", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
	        insertUser(new User("frankgarcia","frankgarcia@example.com", passwordEncoder.encode("123"), "Frank", "Garcia", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
	        insertUser(new User("gracekim","gracekim@example.com", passwordEncoder.encode("123"), "Grace", "Kim", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
	        insertUser(new User("henrymoore","henrymoore@example.com", passwordEncoder.encode("123"), "Henry", "Moore", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
	        insertUser(new User("isabellayoung","isabellayoung@example.com", passwordEncoder.encode("123"), "Isabella", "Young", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
	        insertUser(new User("jackmartin","jackmartin@example.com", passwordEncoder.encode("123"), "Jack", "Martin", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
	        insertUser(new User("kaylawhite","kaylawhite@example.com", passwordEncoder.encode("123"), "Kayla", "White", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
	        insertUser(new User("lucaswalker","lucaswalker@example.com", passwordEncoder.encode("123"), "Lucas", "Walker", new Date(), null, null), "ROLE_TEACHER", roleRepository, userRepository);
	        insertUser(new User("miamartin","miamartin@example.com", passwordEncoder.encode("123"), "Mia", "Martin", new Date(), null, null), "ROLE_TEACHER", roleRepository, userRepository);
	        insertUser(new User("noahrobinson","noahrobinson@example.com", passwordEncoder.encode("123"), "Noah", "Robinson", new Date(), null, null), "ROLE_TEACHER", roleRepository, userRepository);
	        insertUser(new User("oliviaking","oliviaking@example.com", passwordEncoder.encode("123"), "Olivia", "King", new Date(), null, null), "ROLE_TEACHER", roleRepository, userRepository);
	        insertUser(new User("peterwright","peterwright@example.com", passwordEncoder.encode("123"), "Peter", "Wright", new Date(), null, null), "ROLE_TEACHER", roleRepository, userRepository);
	        insertUser(new User("quinnlopez","quinnlopez@example.com", passwordEncoder.encode("123"), "Quinn", "Lopez", new Date(), null, null), "ROLE_TEACHER", roleRepository, userRepository);
	        
	        if (students.size() > 0) {
	        	String[] courseNames = {"Introduction to Python", "Advanced Java", "Web Development", "Algorithms and Data Structures", "Database Systems"}; 
	        	Integer[] maxNumberOfStudents = {30, 25, 40, 35, 30};
	        	for (int i = 0; i < courseNames.length; ++i) {
	        		List<User> courseUsers = new ArrayList<>();
	        		Collections.shuffle(teachers);
	        		for (int j = 0; j < 3; ++j) {
	        			courseUsers.add(teachers.get(j));
	        		}
	        		int numberToAdd = students.size() < 10 ? students.size() : 10;
	        		Collections.shuffle(students);
	        		for (int j = 0; j < numberToAdd; ++j) {
	        			courseUsers.add(students.get(j));
	        		}
	        		Course course = new Course(courseNames[i], maxNumberOfStudents[i] , null, new Date(), null);
	        		insertCourse(course, courseUsers, courseRepository);
	        	}
	        }
	        
		};
	}

}
