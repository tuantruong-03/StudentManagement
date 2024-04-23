package student.mangement.code.model;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Data
@Entity
@Table(name = "courses")
public class Course {	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "course_id")
	private Integer courseId;
	
	@Column(name = "name")
	private String name;
	
	@Column(name="max_number_of_student")
	private Integer maxNumberOfStudent;
	
	@Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modified_at")
    private Date modifiedAt;
    
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
    		name = "courses_users"
    		,joinColumns = {@JoinColumn(name="course_id")}
    		,inverseJoinColumns = {@JoinColumn(name = "user_id")}
    		)
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
}
