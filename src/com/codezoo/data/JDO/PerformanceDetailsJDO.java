package com.codezoo.data.JDO;

import java.io.Serializable;

import javax.jdo.annotations.NotPersistent;
import javax.jdo.annotations.PersistenceCapable;

@PersistenceCapable(detachable="true")
public class PerformanceDetailsJDO implements Serializable {

	// serial version id
	private static final long serialVersionUID = 1L;

	String userID = "";

	String conceptID = "";
	
	@NotPersistent
	String conceptName = "";

	String score = "";

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getConceptID() {
		return conceptID;
	}

	public void setConceptID(String conceptID) {
		this.conceptID = conceptID;
	}

	public String getConceptName() {
		return conceptName;
	}

	public void setConceptName(String conceptName) {
		this.conceptName = conceptName;
	}
	
	public String getScore() {
		return score;
	}

	public void setScore(String score) {
		this.score = score;
	}

}
