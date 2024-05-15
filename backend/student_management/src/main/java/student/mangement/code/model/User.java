package student.mangement.code.model;

import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;


import lombok.Data;

@Data
@Document(collation = "Users")
public class User implements UserDetails {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	private Integer userId;
	
	private String email;	// Use email as username
	@JsonIgnore
	private String password;
	private String firstName;
	private String lastName;
	
    @Field(name = "created_at")
    private Date createdAt;

    @Field(name = "modified_at")
    private Date modifiedAt;

	@DBRef
    Set<Role> authorities;
    
	@JsonIgnore
	@DBRef
    List<Course> courses;
    

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
	

	public User(String email, String password, String firstName, String lastName, Date createdAt, Date modifiedAt,
			Set<Role> authorities) {
		super();
		this.email = email;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
		this.authorities = authorities;
	}

	public User() {
		super();
		this.authorities = new HashSet<>();
	}

}
