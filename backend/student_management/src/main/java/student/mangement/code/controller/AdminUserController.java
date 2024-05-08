package student.mangement.code.controller;

import java.util.Date;
import java.util.HashMap;
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
@RequestMapping("/admin/user")
public class AdminUserController {
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    RoleService roleService;

    @Autowired
    UserService userService;

    @PostMapping("")
    ResponseEntity<User> processPostUser(@RequestBody Map<String, Object> body) {
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
    @PostMapping("/delete")
    ResponseEntity<?> processDeleteUser(@RequestBody Map<String,Object> body) {
        Map <String, String> response = new HashMap<>();
        String email = (String)body.get("email");
        User existingUser = userService.findUserByEmail(email);
        if (existingUser!= null){
            userService.deletUser(existingUser);
            response.put("message", "Success");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        response.put("message", "Failed");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/put")
    ResponseEntity <User> processPutUser(@RequestBody Map<String, Object> body) {
        String firstName = (String)body.get("firstName");
        String lastName = (String)body.get("lastName");
        String email = (String)body.get("email");
        User user = new User(email,"",firstName,lastName,null,null,null);   // Temporary user
        User updatedUser = userService.updateUser(user);
        if (updatedUser == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }   
}
