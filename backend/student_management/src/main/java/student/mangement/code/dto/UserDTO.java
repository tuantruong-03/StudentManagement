package student.mangement.code.dto;

import java.util.Collection;
import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;

import lombok.AllArgsConstructor;
import lombok.Data;
import student.mangement.code.model.Role;
import student.mangement.code.model.User;

@Data
@AllArgsConstructor
public class UserDTO {
	
    private Integer userId;
	private String email;
	private String firstName;
	private String lastName;
    private Set<Role> authorities;

    public UserDTO(User user) {
        this.userId = user.getUserId();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.authorities = convertAuthorities(user.getAuthorities());
    }

    private Set<Role> convertAuthorities(Collection<? extends GrantedAuthority> grantedAuthorities) {
        if (grantedAuthorities == null) {
            return Collections.emptySet();
        }
        return grantedAuthorities.stream()
                                 .map(authority -> new Role(authority.getAuthority())) // Assuming Role has a constructor that takes a String
                                 .collect(Collectors.toSet());
    }
}
