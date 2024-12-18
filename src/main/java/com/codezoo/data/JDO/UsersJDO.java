package com.codezoo.data.JDO;

import java.io.Serializable;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.PrimaryKey;

import com.codezoo.Helper.CommonHelper;

@PersistenceCapable
public class UsersJDO implements Serializable{

//	serial version id
	private static final long serialVersionUID = 1L;
	
	@PrimaryKey
	String userID = "";
	
	String name = "";
	
	String emailID = "";
	
	String role = CommonHelper.userRoleUser;
	
	String password = "";
	
	String address = "";

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmailID() {
		return emailID;
	}

	public void setEmailID(String emailID) {
		this.emailID = emailID;
	}
	
	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
}
