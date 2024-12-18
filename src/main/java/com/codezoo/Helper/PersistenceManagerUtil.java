package com.codezoo.Helper;


import javax.jdo.JDOHelper;
import javax.jdo.PersistenceManager;
import javax.jdo.PersistenceManagerFactory;

public class PersistenceManagerUtil {
	
	private static PersistenceManagerFactory pmf = JDOHelper.getPersistenceManagerFactory("transactions-optional");
	
	public static PersistenceManager getPersistentManager(){
		return pmf.getPersistenceManager();
	}

}
