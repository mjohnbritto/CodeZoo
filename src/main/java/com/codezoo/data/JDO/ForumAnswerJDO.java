package com.codezoo.data.JDO;

import java.io.Serializable;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable
public class ForumAnswerJDO implements Serializable{

//	serial version id
	private static final long serialVersionUID = 1L;

	@PrimaryKey
	String answerID = "";
	
	String queryID = "";
	
	String userID = "";
	
	String answer = "";
	
	Long answeredLongTime = 0l;

	public String getAnswerID() {
		return answerID;
	}

	public void setAnswerID(String answerID) {
		this.answerID = answerID;
	}

	public String getQueryID() {
		return queryID;
	}

	public void setQueryID(String queryID) {
		this.queryID = queryID;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public Long getAnsweredLongTime() {
		return this.answeredLongTime;
	}

	public void setAnsweredLongTime(Long answeredLongTime) {
		this.answeredLongTime = answeredLongTime;
	}
	
}
