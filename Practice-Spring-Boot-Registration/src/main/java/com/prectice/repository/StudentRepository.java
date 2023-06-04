package com.prectice.repository;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prectice.entity.Student;


@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
	
	 Student findByEmail(String email);
}
