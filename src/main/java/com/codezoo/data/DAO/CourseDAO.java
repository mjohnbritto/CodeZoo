package com.codezoo.data.DAO;

import java.util.logging.Logger;
import java.util.ArrayList;
import java.util.List;

import javax.jdo.PersistenceManager;

import com.codezoo.Helper.PersistenceManagerUtil;
import com.codezoo.data.JDO.CourseJDO;

import javax.jdo.Query;

public class CourseDAO {
	private static final Logger logger = Logger.getLogger(CourseDAO.class.getName());
	
	public static CourseJDO saveCourseJDO(CourseJDO objCourseJDO){
		logger.info("IN CourseDAO - > saveCourseJDO");
		PersistenceManager pm = null;
		
		try{
			pm = PersistenceManagerUtil.getPersistentManager();
			pm.makePersistent(objCourseJDO);

			return objCourseJDO;
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Exception occurred : "+ e.getMessage());
		}finally {
			/*if(pm != null){
				pm.close();
			}*/
		}
		logger.info("OUT CourseDAO - > saveCourseJDO");
		
		return null;
	}
	
	@SuppressWarnings("unchecked")
	public static List<CourseJDO> getAllCourseJDO(){
		logger.info("IN CourseDAO - > getAllCourseJDO");
		PersistenceManager pm = null;
		
		try{
			pm = PersistenceManagerUtil.getPersistentManager();
			List<CourseJDO> objUsersJDO2BeReturned = new ArrayList<CourseJDO>();
			
			String strQuery = "";
			strQuery = "SELECT FROM " + CourseJDO.class.getName();	
			
			Query query = pm.newQuery(strQuery);
			
			objUsersJDO2BeReturned = (List<CourseJDO>) query.execute();
			logger.info("Query Result : " + objUsersJDO2BeReturned.toString());
			if( objUsersJDO2BeReturned.size() > 0 ){
				objUsersJDO2BeReturned = (List<CourseJDO>) pm.detachCopyAll(objUsersJDO2BeReturned);
			}else{
				logger.info("No entry is available.");
				objUsersJDO2BeReturned = null;
			}

			logger.info("Result to be returned is : " + objUsersJDO2BeReturned.toString());
			return objUsersJDO2BeReturned;
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Exception occurred : "+ e.getMessage());
		}finally {
			/*if(pm != null){
				pm.close();
			}*/
		}
		logger.info("OUT CourseDAO - > getAllCourseJDO");
		
		return null;
	}
}
