package student.mangement.code.controller;

import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ResponseBody
@RequestMapping("/admin")
public class AdminController {
    @PostMapping("/student")
    ResponseEntity<User> processPostStudent() {
        return new ResponseEntity<>(null, HttpStatus.CREATED);
    }
}
