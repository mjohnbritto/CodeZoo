package com.codezoo.data.JDO;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.PrimaryKey;
import java.io.Serializable;

@PersistenceCapable
public class CourseJDO implements Serializable{

//	serial version id
	private static final long serialVersionUID = 1L;

	@PrimaryKey
	String courseID = "";
	
	String courseName = "";
	
	public String getCourseID() {
		return courseID;
	}

	public void setCourseID(String courseID) {
		this.courseID = courseID;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

}
