package com.codezoo.data.JDO;

import java.io.Serializable;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable
public class ChangePasswordJDO  implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@PrimaryKey
	String userEmailID = "";
	
	long requestedTime = 0l;
	
	String requestKey = "";

	public String getUserEmailID() {
		return userEmailID;
	}

	public void setUserEmailID(String userEmailID) {
		this.userEmailID = userEmailID;
	}

	public long getRequestedTime() {
		return requestedTime;
	}

	public void setRequestedTime(long requestedTime) {
		this.requestedTime = requestedTime;
	}
	
	public String getRequestKey() {
		return requestKey;
	}

	public void setRequestKey(String requestKey) {
		this.requestKey = requestKey;
	}
}