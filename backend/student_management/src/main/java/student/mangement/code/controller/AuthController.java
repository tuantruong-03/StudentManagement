package student.mangement.code.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import student.mangement.code.dto.UserDTO;
import student.mangement.code.model.User;
import student.mangement.code.service.UserService;
import student.mangement.code.utils.JwtUtil;

@RequestMapping("/auth")
@Controller
public class AuthController {

    private Cookie setCookie(String name, String value) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(false);
        cookie.setSecure(true);
        cookie.setMaxAge(60 * 60 * 3); // in seconds (3 hours)
        cookie.setPath("/");   
        return cookie;
    }

    @Autowired
    UserService userService;
    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    @ResponseBody
    // "JsonProcessingException" for "ObjectMapper", "UnsupportedEncodingException"
    // for "URLEncoder"
    public ResponseEntity<Map<String, Object>> processPostLogin(@RequestBody Map<String, String> body,
            HttpServletResponse res) throws JsonProcessingException, UnsupportedEncodingException {
        System.out.println(body.toString());
        String username = body.get("username");
        String password = body.get("password");
        Map<String, Object> bodyResponse = new HashMap<>();
        User user = (User) userService.loadUserByUsername(username);
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            bodyResponse.put("message", "Failed");
            return new ResponseEntity<>(bodyResponse, HttpStatus.BAD_REQUEST);
        }
        JwtUtil jwtUtil = new JwtUtil();
        String token = jwtUtil.generateToken(user);
        // SetCookie
        Cookie tokenCookie = setCookie("token", token);
        ObjectMapper objectMapper = new ObjectMapper();
        String userJson = objectMapper.writeValueAsString(user);
        String encodedUserJson = URLEncoder.encode(userJson, StandardCharsets.UTF_8.toString());  // Fix java.lang.IllegalArgumentException: An invalid character [34] was present in the Cookie value
        Cookie userCookie = setCookie("user", encodedUserJson); 
        res.addCookie(userCookie);
        res.addCookie(tokenCookie);
        bodyResponse.put("message", "Success");
        return new ResponseEntity<>(bodyResponse, HttpStatus.OK);
    }
}
