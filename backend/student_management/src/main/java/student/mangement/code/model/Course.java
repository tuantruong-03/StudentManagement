package student.mangement.code.model;

import java.util.Date;
import java.util.List;

import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;

@Data
@Document(collection = "Courses")
public class Course {	
	@Id
	@Field(name = "course_id")
	private Integer courseId;
	
	private String name;
	
	private Integer maxNumberOfStudent;
    @Field(name = "created_at")
    private Date createdAt;

    @Field(name = "modified_at")
    private Date modifiedAt;
    
    
    @DBRef
    private List<User> users;

	public Course() {
		super();
	}

	public Course(String name, Integer maxNumberOfStudent, List<User> users, Date createdAt, Date modifiedAt) {
		super();
		this.name = name;
		this.maxNumberOfStudent = maxNumberOfStudent;
		this.users = users;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
	}

	public Course(Integer courseId, String name, Integer maxNumberOfStudent, List<User> users) {
		super();
		this.courseId = courseId;
		this.name = name;
		this.maxNumberOfStudent = maxNumberOfStudent;
		this.users = users;
	}

	// Override because list of users is not fed eagerly, so the instance of this class can't call "toString" by default (including users)
	@Override
	public String toString() {
		return "Course [courseId=" + courseId + ", name=" + name + ", maxNumberOfStudent=" + maxNumberOfStudent
				+ ", createdAt=" + createdAt + ", modifiedAt=" + modifiedAt + "]";
	}
}
