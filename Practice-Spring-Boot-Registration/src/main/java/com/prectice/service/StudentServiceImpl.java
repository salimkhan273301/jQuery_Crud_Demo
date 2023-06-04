package com.prectice.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prectice.entity.Student;
import com.prectice.repository.StudentRepository;

@Service
public class StudentServiceImpl implements StudentService {
    private final StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Student getStudentById(long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Student not found"));
    }

    @Override
    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public Student updateStudent(long id, Student student) {
        if (!studentRepository.existsById(id)) {
            throw new NoSuchElementException("Student not found");
        }
        student.setId(id);
        return studentRepository.save(student);
    }

    @Override
    public void deleteStudent(long id) {
        if (!studentRepository.existsById(id)) {
            throw new NoSuchElementException("Student not found");
        }
        studentRepository.deleteById(id);
    }
    
    
	/*
	 * @Override public boolean validateCredentials(String email, String password) {
	 * Optional<Student> studentOptional = studentRepository.findByEmail(email); if
	 * (studentOptional.isPresent()) { Student student = studentOptional.get();
	 * return student.getPassword().equals(password); } return false; }
	 */
    
    @Override
    public boolean validateCredentials(String email, String password) throws NullPointerException {
    	System.out.println("#########################################"+email+"password"+password);
        Student student = studentRepository.findByEmail(email);
        if (student != null && student.getPassword().equals(password)) {
        	System.out.println(student.toString()+"---------------------"+student.getPassword().equals(password));
            return true;
        }
        return false;
    }
    
}
