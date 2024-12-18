package com.codezoo.data.DAO;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import com.codezoo.Helper.CommonHelper;
import com.codezoo.Helper.PersistenceManagerUtil;
import com.codezoo.data.JDO.ForumQueryJDO;

public class ForumQueryDAO {
	private static final Logger logger = Logger.getLogger(ConceptsDAO.class.getName());
	
	public static ForumQueryJDO saveForumQueryJDO( ForumQueryJDO objForumQueryJDO ){
		logger.info("IN ForumQueryDAO --> saveForumQueryJDO()");
		PersistenceManager pm = null; 
		try{
			pm = PersistenceManagerUtil.getPersistentManager();
			if( objForumQueryJDO != null){
				pm.makePersistent(objForumQueryJDO);
				logger.warning("The object is Saved");
			}else{
				logger.warning("The object is EMPTY, so not proceeding further!");
			}
			return objForumQueryJDO;
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Exception occurred :: " + e.getMessage());
		}finally {
			/*if(pm != null){
				pm.close();
			}*/
		}
		logger.info("OUT ForumQueryDAO --> saveForumQueryJDO()");
		return null;
	}
	
	@SuppressWarnings("unchecked")
	public static List<ForumQueryJDO> getForumQueries(String userID){
		logger.info("IN ForumQueryDAO --> ForumQueryJDO()");
		PersistenceManager pm = null;
		List<ForumQueryJDO> lstForumQueryJDO = new ArrayList<ForumQueryJDO>();  
		try{
			pm = PersistenceManagerUtil.getPersistentManager();
			String strQuery = "SELECT FROM " + ForumQueryJDO.class.getName();
			if( !CommonHelper.isEmptyString(userID) ){
				strQuery += " WHERE userID == '" + userID + "'";
			}
			strQuery += " ORDER BY postedLongTime ASC";
			logger.info("strQuery :: " + strQuery);
			Query query = pm.newQuery(strQuery);
			lstForumQueryJDO = (List<ForumQueryJDO>) query.execute();
			if( lstForumQueryJDO != null && lstForumQueryJDO.size()>0 ){
				lstForumQueryJDO = (List<ForumQueryJDO>) pm.detachCopyAll(lstForumQueryJDO);
			}else{
				lstForumQueryJDO = null;
			}
			logger.info("Result to be returned is :: " + lstForumQueryJDO);
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Exception occurred :: " + e.getMessage());
		}finally {
			/*if(pm != null){
				pm.close();
			}*/
		}
		logger.info("OUT ForumQueryDAO --> ForumQueryJDO()");
		return lstForumQueryJDO;
	}
}
