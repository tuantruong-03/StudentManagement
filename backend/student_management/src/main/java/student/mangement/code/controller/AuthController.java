package student.mangement.code.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import student.mangement.code.dto.UserDTO;
import student.mangement.code.model.User;
import student.mangement.code.service.UserService;
import student.mangement.code.utils.JwtUtil;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth")
@Controller
public class AuthController {

    @Autowired
    UserService userService;
    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> processPostLogin(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        Map<String, Object> response = new HashMap<>();
        User user = (User)userService.loadUserByUsername(username);
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
        JwtUtil jwtUtil = new JwtUtil();
        String token = jwtUtil.generateToken(user);
        response.put("token", token);
        response.put("user",new UserDTO(user));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
