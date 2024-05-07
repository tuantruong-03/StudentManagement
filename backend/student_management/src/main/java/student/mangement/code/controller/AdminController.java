package student.mangement.code.controller;

import java.util.Date;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import student.mangement.code.model.Role;
import student.mangement.code.model.User;
import student.mangement.code.service.RoleService;
import student.mangement.code.service.UserService;

@Controller
@ResponseBody
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    RoleService roleService;

    @Autowired
    UserService userService;


    @PostMapping("/user")
    ResponseEntity<User> processPostUser(@RequestBody Map<String, Object> body) {
        System.out.println(body.toString());
        String roleString = (String)body.get("role");
        String firstName = (String)body.get("firstName");
        String lastName = (String)body.get("lastName");
        String email = (String)body.get("email");
        
        if (userService.findUserByEmail(email)!=null) { // Email is unique
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        Role role = roleService.findRoleByAuthority(roleString);
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        User  user = new User(email, passwordEncoder.encode("123"), firstName, lastName, new Date(), null, roles);
        User savedUser = userService.saveUser(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @DeleteMapping("/user")
    ResponseEntity<User> processDeleteUser(@RequestParam Map<String, Object> body) {
        System.out.println(body.toString());
        System.out.println("delete");
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
}
