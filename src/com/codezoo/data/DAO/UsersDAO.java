package com.codezoo.data.DAO;

import java.util.List;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;

import com.codezoo.Helper.CommonHelper;
import com.codezoo.Helper.PersistenceManagerUtil;
import com.codezoo.data.JDO.UsersJDO;

import javax.jdo.Query;

public class UsersDAO {
	private static final Logger logger = Logger.getLogger(ConceptsDAO.class.getName());
	
	public static UsersJDO saveUsersJDO(UsersJDO objUsersJDO){
		logger.info("IN UsersDAO - > saveUsersJDO");
		PersistenceManager pm = null;
		
		try{
			pm = PersistenceManagerUtil.getPersistentManager();
			pm.makePersistent(objUsersJDO);
			pm.close();
			
			return objUsersJDO;
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Exception occurred : "+ e.getMessage());
		}
		logger.info("OUT UsersDAO - > saveUsersJDO");
		
		return null;
	}
	
	@SuppressWarnings("unchecked")
	public static UsersJDO getUsersJDOWithEmailID(String strEmailID){
		logger.info("IN UsersDAO - > getUsersJDOWithEmailID");
		PersistenceManager pm = null;
		
		try{
			pm = PersistenceManagerUtil.getPersistentManager();
			UsersJDO objUsersJDO2BeReturned = new UsersJDO();
			
			if( CommonHelper.isEmptyString(strEmailID) ){
				logger.info("EmailID is empty so not proceeding further!");
				return null;
			}else{
				String strQuery = "";
				strQuery = "SELECT FROM " + UsersJDO.class.getName() + " WHERE emailID == '" + strEmailID.trim() + "'";	
				
				Query query = pm.newQuery(strQuery);
				
				List<UsersJDO> lstUsersJDO = (List<UsersJDO>) query.execute();
				logger.info("Query Result : " + lstUsersJDO.toString());
				if( lstUsersJDO.size() > 0 ){
					lstUsersJDO = (List<UsersJDO>) pm.detachCopyAll(lstUsersJDO);
					objUsersJDO2BeReturned = lstUsersJDO.get(0);
					logger.info("Result to be returned is : " + objUsersJDO2BeReturned.toString());
				}else{
					logger.info("No users with " + strEmailID + " so returning null.");
					objUsersJDO2BeReturned = null;
				}
			}
			
			pm.close();
			
			return objUsersJDO2BeReturned;
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Exception occurred : "+ e.getMessage());
		}
		logger.info("OUT UsersDAO - > getUsersJDOWithEmailID");
		
		return null;
	}
	
	@SuppressWarnings("unchecked")
	public static UsersJDO getUsersJDOWithEmailIDAndPassword(String strEmailID, String encyptedPassword){
		logger.info("IN UsersDAO - > getUsersJDOWithEmailIDAndPassword");
		PersistenceManager pm = null;
		
		try{
			pm = PersistenceManagerUtil.getPersistentManager();
			UsersJDO objUsersJDO2BeReturned = new UsersJDO();
			
			if( CommonHelper.isEmptyString(strEmailID) || CommonHelper.isEmptyString(encyptedPassword) ){
				logger.info("EmailID/Password is empty so not proceeding further!");
				return null;
			}else{
				String strQuery = "";
				strQuery = "SELECT FROM " + UsersJDO.class.getName() + " WHERE emailID == '" + strEmailID.trim() + "' && password == '" + encyptedPassword + "'";	
				
				Query query = pm.newQuery(strQuery);
				
				List<UsersJDO> lstUsersJDO = (List<UsersJDO>) query.execute();
				logger.info("Query Result : " + lstUsersJDO.toString());
				if( lstUsersJDO.size() > 0 ){
					lstUsersJDO = (List<UsersJDO>) pm.detachCopyAll(lstUsersJDO);
					objUsersJDO2BeReturned = lstUsersJDO.get(0);
					logger.info("Result to be returned is : " + objUsersJDO2BeReturned.toString());
				}else{
					logger.info("No users with " + strEmailID + " and " + encyptedPassword + " so returning null.");
					objUsersJDO2BeReturned = null;
				}
			}
			
			pm.close();
			
			return objUsersJDO2BeReturned;
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Exception occurred : "+ e.getMessage());
		}
		logger.info("OUT UsersDAO - > getUsersJDOWithEmailIDAndPassword");
		
		return null;
	}
	
	@SuppressWarnings("unchecked")
	public static List<UsersJDO> getAllUsersOfCodeZoo(){
		logger.info("IN UsersDAO -> getAllUsersOfCodeZoo");
		PersistenceManager pm = null;
		
		try{
			pm = PersistenceManagerUtil.getPersistentManager();
			
			String strQuery = "";
			strQuery = "SELECT FROM " + UsersJDO.class.getName();	
			
			Query query = pm.newQuery(strQuery);
			
			List<UsersJDO> lstUsersJDO = (List<UsersJDO>) query.execute();
			logger.info("Query Result : " + lstUsersJDO);
			if( lstUsersJDO.size() > 0 ){
				lstUsersJDO = (List<UsersJDO>) pm.detachCopyAll(lstUsersJDO);
			}else{
				logger.info("There are No users");
				lstUsersJDO = null;
			}
			pm.close();
			
			logger.info("Result to be returned is : " + lstUsersJDO);
			
			return lstUsersJDO;
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Exception occurred : "+ e.getMessage());
		}
		logger.info("OUT UsersDAO -> getAllUsersOfCodeZoo");
		
		return null;
	}
}
