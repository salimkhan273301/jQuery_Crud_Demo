package com.prectice.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.prectice.entity.Student;
import com.prectice.service.StudentService;


//
//@RequestMapping("/api/v1/")
//@RestController

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")  // Replace with the actual URL of your frontend
@RequestMapping("/student")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable long id) {
        return studentService.getStudentById(id);
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.createStudent(student);
    }

    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable long id, @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable long id) {
        studentService.deleteStudent(id);
    }
    
    
    
    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestParam("email") String email, @RequestParam("password") String password) {
        boolean isValidCredentials = studentService.validateCredentials(email, password);
        
        System.out.println("&&&&&&&&&&&&&&&&&&&&&&&&&&&&"+ResponseEntity.ok(isValidCredentials));
        return ResponseEntity.ok(isValidCredentials);
    }
    
    
}
