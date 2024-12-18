package com.codezoo.data.DAO;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import com.codezoo.Helper.CommonHelper;
import com.codezoo.Helper.PersistenceManagerUtil;
import com.codezoo.data.JDO.ForumAnswerJDO;

public class ForumAnswerDAO {
	private static final Logger logger = Logger.getLogger(ConceptsDAO.class.getName());
	
	
	public static ForumAnswerJDO saveForumAnswerJDO( ForumAnswerJDO objForumAnswerJDO ){
		logger.info("IN ForumAnswerJDO --> saveForumAnswerJDO()");
		PersistenceManager pm = null; 
		try{
			pm = PersistenceManagerUtil.getPersistentManager();
			if( objForumAnswerJDO != null){
				pm.makePersistent(objForumAnswerJDO);
				logger.warning("The object is Saved");
			}else{
				logger.warning("The object is EMPTY, so not proceeding further!");
			}
			return objForumAnswerJDO;
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Exception occurred :: " + e.getMessage());
		}finally {
			/*if(pm != null){
				pm.close();
			}*/
		}
		logger.info("OUT ForumAnswerJDO --> saveForumAnswerJDO()");
		return null;
	}
	
	
	@SuppressWarnings("unchecked")
	public static List<ForumAnswerJDO> getAllAnswersForThisQuestion(String queryID) {
		logger.info("IN ForumAnswerDAO --> getAllAnswersForThisQuestion()");
		PersistenceManager pm = null;

		try {
			if( CommonHelper.isEmptyString(queryID) ){
				logger.warning("queryID is EMPTY!, So not proceeding further.");
				return null;
			}
			logger.info("received queryID is :: " + queryID);
			
			pm = PersistenceManagerUtil.getPersistentManager();
			List<ForumAnswerJDO> lstForumAnswerJDO = new ArrayList<ForumAnswerJDO>();

			String strQuery = "SELECT FROM " + ForumAnswerJDO.class.getName() + " WHERE queryID == '" + queryID + "' ORDER BY answeredLongTime ASC";

			Query query = pm.newQuery(strQuery);

			lstForumAnswerJDO = (List<ForumAnswerJDO>) query.execute();
			logger.info("Query Result : " + lstForumAnswerJDO);
			if ( lstForumAnswerJDO != null && lstForumAnswerJDO.size() > 0) {
				lstForumAnswerJDO = (List<ForumAnswerJDO>) pm.detachCopyAll(lstForumAnswerJDO);
			} else {
				logger.info("No entry is available.");
				lstForumAnswerJDO = null;
			}

			logger.info("Result to be returned is : " + lstForumAnswerJDO);
			return lstForumAnswerJDO;
		} catch (Exception e) {
			e.printStackTrace();
			logger.severe("Exception occurred : " + e.getMessage());
		}finally {
			/*if(pm != null){
				pm.close();
			}*/
		}
		logger.info("OUT ForumAnswerDAO - > getAllAnswersForThisQuestion()");

		return null;
	}
}
