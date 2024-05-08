package student.mangement.code;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
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
		if (userRepository.findByEmail(user.getUsername()).isEmpty()) {
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
	        insertUser(new User("anhtuantruong3021@gmail.com", passwordEncoder.encode("123"), "Tuan", "Truong", new Date(), null, null), "ROLE_ADMIN", roleRepository, userRepository);
			// Student
			insertUser(new User("johndoe@student.myschool.com", passwordEncoder.encode("123"), "John", "Doe", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
	        insertUser(new User("janedoe@student.myschool.com", passwordEncoder.encode("123"), "Jane", "Doe", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
	        insertUser(new User("samsmith@student.myschool.com", passwordEncoder.encode("123"), "Sam", "Smith", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
	        insertUser(new User("alicejones@student.myschool.com", passwordEncoder.encode("123"), "Alice", "Jones", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
	        insertUser(new User("bobwilliams@student.myschool.com", passwordEncoder.encode("123"), "Bob", "Williams", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
	        insertUser(new User("chloebrown@student.myschool.com", passwordEncoder.encode("123"), "Chloe", "Brown", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
	        insertUser(new User("davidlee@student.myschool.com", passwordEncoder.encode("123"), "David", "Lee", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
	        insertUser(new User("emilypatel@student.myschool.com", passwordEncoder.encode("123"), "Emily", "Patel", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
	        insertUser(new User("frankgarcia@student.myschool.com", passwordEncoder.encode("123"), "Frank", "Garcia", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
	        insertUser(new User("gracekim@student.myschool.com", passwordEncoder.encode("123"), "Grace", "Kim", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
	        insertUser(new User("henrymoore@student.myschool.com", passwordEncoder.encode("123"), "Henry", "Moore", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
	        insertUser(new User("isabellayoung@student.myschool.com", passwordEncoder.encode("123"), "Isabella", "Young", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
	        insertUser(new User("jackmartin@student.myschool.com", passwordEncoder.encode("123"), "Jack", "Martin", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
	        insertUser(new User("kaylawhite@student.myschool.com", passwordEncoder.encode("123"), "Kayla", "White", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("rachelgreen@student.myschool.com", passwordEncoder.encode("123"), "Rachel", "Green", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("rossgeller@student.myschool.com", passwordEncoder.encode("123"), "Ross", "Geller", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("monicageller@student.myschool.com", passwordEncoder.encode("123"), "Monica", "Geller", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("joeytribbiani@student.myschool.com", passwordEncoder.encode("123"), "Joey", "Tribbiani", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("chandlerbing@student.myschool.com", passwordEncoder.encode("123"), "Chandler", "Bing", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("sarahconnor@student.myschool.com", passwordEncoder.encode("123"), "Sarah", "Connor", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("johnconnor@student.myschool.com", passwordEncoder.encode("123"), "John", "Connor", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("kyleslater@student.myschool.com", passwordEncoder.encode("123"), "Kyle", "Slater", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("soniablade@student.myschool.com", passwordEncoder.encode("123"), "Sonia", "Blade", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("jonnysilverhand@student.myschool.com", passwordEncoder.encode("123"), "Jonny", "Silverhand", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("vickyvale@student.myschool.com", passwordEncoder.encode("123"), "Vicky", "Vale", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("peterparker@student.myschool.com", passwordEncoder.encode("123"), "Peter", "Parker", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("brucewayne@student.myschool.com", passwordEncoder.encode("123"), "Bruce", "Wayne", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("clarkkent@student.myschool.com", passwordEncoder.encode("123"), "Clark", "Kent", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("dianaprince@student.myschool.com", passwordEncoder.encode("123"), "Diana", "Prince", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("barryallen@student.myschool.com", passwordEncoder.encode("123"), "Barry", "Allen", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("haljordan@student.myschool.com", passwordEncoder.encode("123"), "Hal", "Jordan", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("tonystark@student.myschool.com", passwordEncoder.encode("123"), "Tony", "Stark", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("stevenrogers@student.myschool.com", passwordEncoder.encode("123"), "Steven", "Rogers", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("natasharomanoff@student.myschool.com", passwordEncoder.encode("123"), "Natasha", "Romanoff", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("loganwright@student.myschool.com", passwordEncoder.encode("123"), "Logan", "Wright", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("lilyevans@student.myschool.com", passwordEncoder.encode("123"), "Lily", "Evans", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("jamespotter@student.myschool.com", passwordEncoder.encode("123"), "James", "Potter", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("ginnyweasley@student.myschool.com", passwordEncoder.encode("123"), "Ginny", "Weasley", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("fredgeorge@student.myschool.com", passwordEncoder.encode("123"), "Fred", "George", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("hermionegranger@student.myschool.com", passwordEncoder.encode("123"), "Hermione", "Granger", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("ronweasley@student.myschool.com", passwordEncoder.encode("123"), "Ron", "Weasley", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			insertUser(new User("dracomalfoy@student.myschool.com", passwordEncoder.encode("123"), "Draco", "Malfoy", new Date(), null, null), "ROLE_STUDENT", roleRepository, userRepository);
			// Teacher
			insertUser(new User("phoebebuffay@teacher.myschool.com", passwordEncoder.encode("123"), "Phoebe", "Buffay", new Date(), null, null), "ROLE_TEACHER", roleRepository, userRepository);
			insertUser(new User("sheldoncooper@teacher.myschool.com", passwordEncoder.encode("123"), "Sheldon", "Cooper", new Date(), null, null), "ROLE_TEACHER", roleRepository, userRepository);
			insertUser(new User("leonardhofstadter@teacher.myschool.com", passwordEncoder.encode("123"), "Leonard", "Hofstadter", new Date(), null, null), "ROLE_TEACHER", roleRepository, userRepository);
			insertUser(new User("pennyhoffstader@teacher.myschool.com", passwordEncoder.encode("123"), "Penny", "Hoffstader", new Date(), null, null), "ROLE_TEACHER", roleRepository, userRepository);
			insertUser(new User("howardwolowitz@teacher.myschool.com", passwordEncoder.encode("123"), "Howard", "Wolowitz", new Date(), null, null), "ROLE_TEACHER", roleRepository, userRepository);
			insertUser(new User("rajeshkoothrappali@teacher.myschool.com", passwordEncoder.encode("123"), "Rajesh", "Koothrappali", new Date(), null, null), "ROLE_TEACHER", roleRepository, userRepository);
	        insertUser(new User("lucaswalker@teacher.myschool.com", passwordEncoder.encode("123"), "Lucas", "Walker", new Date(), null, null), "ROLE_TEACHER", roleRepository, userRepository);
	        insertUser(new User("miamartin@teacher.myschool.com", passwordEncoder.encode("123"), "Mia", "Martin", new Date(), null, null), "ROLE_TEACHER", roleRepository, userRepository);
	        insertUser(new User("noahrobinson@teacher.myschool.com", passwordEncoder.encode("123"), "Noah", "Robinson", new Date(), null, null), "ROLE_TEACHER", roleRepository, userRepository);
	        insertUser(new User("oliviaking@teacher.myschool.com", passwordEncoder.encode("123"), "Olivia", "King", new Date(), null, null), "ROLE_TEACHER", roleRepository, userRepository);
	        insertUser(new User("peterwright@teacher.myschool.com", passwordEncoder.encode("123"), "Peter", "Wright", new Date(), null, null), "ROLE_TEACHER", roleRepository, userRepository);
	        insertUser(new User("quinnlopez@teacher.myschool.com", passwordEncoder.encode("123"), "Quinn", "Lopez", new Date(), null, null), "ROLE_TEACHER", roleRepository, userRepository);
			insertUser(new User("nevillelongbottom@teacher.myschool.com", passwordEncoder.encode("123"), "Neville", "Longbottom", new Date(), null, null), "ROLE_TEACHER", roleRepository, userRepository);
			insertUser(new User("lunafelton@teacher.myschool.com", passwordEncoder.encode("123"), "Luna", "Felton", new Date(), null, null), "ROLE_TEACHER", roleRepository, userRepository);
			insertUser(new User("siriusblack@teacher.myschool.com", passwordEncoder.encode("123"), "Sirius", "Black", new Date(), null, null), "ROLE_TEACHER", roleRepository, userRepository);
			insertUser(new User("severussnape@teacher.myschool.com", passwordEncoder.encode("123"), "Severus", "Snape", new Date(), null, null), "ROLE_TEACHER", roleRepository, userRepository);
			insertUser(new User("minervamcgonagall@teacher.myschool.com", passwordEncoder.encode("123"), "Minerva", "McGonagall", new Date(), null, null), "ROLE_TEACHER", roleRepository, userRepository);
			insertUser(new User("albusdumbledore@teacher.myschool.com", passwordEncoder.encode("123"), "Albus", "Dumbledore", new Date(), null, null), "ROLE_TEACHER", roleRepository, userRepository);
			insertUser(new User("tomriddle@teacher.myschool.com", passwordEncoder.encode("123"), "Tom", "Riddle", new Date(), null, null), "ROLE_TEACHER", roleRepository, userRepository);
	        if (students.size() > 0) {
	        	String[] courseNames = {"Introduction to Python", "Advanced Java", "Web Development", "Algorithms and Data Structures", "Database Systems"}; 
	        	Integer[] maxNumberOfStudents = {50, 60, 75, 65, 80};
	        	for (int i = 0; i < courseNames.length; ++i) {
	        		List<User> courseUsers = new ArrayList<>();
	        		Collections.shuffle(teachers);
	        		for (int j = 0; j < 5; ++j) {
	        			courseUsers.add(teachers.get(j));
	        		}
	        		int numberToAdd = students.size() < 20 ? students.size() : 20;
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
