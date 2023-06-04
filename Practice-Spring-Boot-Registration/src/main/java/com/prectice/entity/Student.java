package com.prectice.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "Student_Info")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "Student_Name")
    private String name;

    @Column(name = "Student_Email")
    private String email;

    @CreationTimestamp
    @Column(name = "Registration_Date")
    private LocalDate date;

    @CreationTimestamp
    @Column(name = "Registration_Time")
    private LocalTime time;

    @Column
    private String password;

	public Student(long id, String name, String email, LocalDate date, LocalTime time, String password) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.date = date;
		this.time = time;
		this.password = password;
	}


	public Student() {
	
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public LocalTime getTime() {
		return time;
	}

	public void setTime(LocalTime time) {
		this.time = time;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

    // Constructor, getters, and setters
    
    
	@Override
	public String toString() {
		return "Student [id=" + id + ", name=" + name + ", email=" + email + ", date=" + date + ", time=" + time
				+ ", password=" + password + "]";
	}
    
}
