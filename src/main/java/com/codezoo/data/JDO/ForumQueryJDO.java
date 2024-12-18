package com.codezoo.data.JDO;

import java.io.Serializable;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable
public class ForumQueryJDO implements Serializable{

//	serial version id
	private static final long serialVersionUID = 1L;

	@PrimaryKey
	String queryID = "";
	
	String userID = "";
	
	String query = "";
	
	Long postedLongTime = 0l;

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

	public String getQuery() {
		return query;
	}

	public void setQuery(String query) {
		this.query = query;
	}

	public Long getPostedLongTime() {
		return postedLongTime;
	}

	public void setPostedLongTime(Long postedLongTime) {
		this.postedLongTime = postedLongTime;
	}
}
