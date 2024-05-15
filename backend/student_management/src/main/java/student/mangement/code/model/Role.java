package student.mangement.code.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.security.core.GrantedAuthority;

import lombok.Data;


@Data
@Document(collection = "Roles")
public class Role implements GrantedAuthority {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	private Integer roleId;
	
	@Field("authority")
	private String authority;

	@Override
	public String getAuthority() {
		return authority;
	}
	
	

	public Role(String authority) {
		super();
		this.authority = authority;
	}



	public Role() {
		super();
	}
	

}
