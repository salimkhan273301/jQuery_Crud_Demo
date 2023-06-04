package com.prectice.service;

import java.util.List;

import com.prectice.entity.Student;

public interface StudentService {
    List<Student> getAllStudents();
    Student getStudentById(long id);
    Student createStudent(Student student);
    Student updateStudent(long id, Student student);
    void deleteStudent(long id);
    boolean validateCredentials(String email, String password);
    
    
    
}