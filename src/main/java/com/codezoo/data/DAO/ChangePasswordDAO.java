package com.codezoo.data.DAO;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;


import com.codezoo.Helper.CommonHelper;
import com.codezoo.Helper.PersistenceManagerUtil;
import com.codezoo.data.JDO.ChangePasswordJDO;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;

public class ChangePasswordDAO{
	
	private static final Logger logger = Logger.getLogger(ConceptsDAO.class.getName());
	
	public static ChangePasswordJDO saveChangePasswordJDO(String userEmailID, long requestedTime) {
		logger.info("IN ChangePasswordDAO - > saveChangePasswordJDO");
		PersistenceManager pm = null;

		try {
			ChangePasswordJDO objChangePasswordJDO = new ChangePasswordJDO();
			objChangePasswordJDO.setUserEmailID(userEmailID);
			objChangePasswordJDO.setRequestedTime(requestedTime);
			objChangePasswordJDO.setRequestKey( CommonHelper.encryptPassword(userEmailID+requestedTime) );
			pm = PersistenceManagerUtil.getPersistentManager();
			pm.makePersistent(objChangePasswordJDO);

			return objChangePasswordJDO;
		} catch (Exception e) {
			e.printStackTrace();
			logger.severe("Exception occurred : " + e.getMessage());
		}finally {
			/*if(pm != null && !pm.isClosed()) {
				pm.close();
			}*/
		}
		logger.info("OUT ChangePasswordDAO - > saveChangePasswordJDO");

		return null;
	}
	
	public static ChangePasswordJDO saveChangePasswordJDO(ChangePasswordJDO objChangePasswordJDO) {
		logger.info("IN ChangePasswordDAO - > saveChangePasswordJDO");
		PersistenceManager pm = null;
		try {
			pm = PersistenceManagerUtil.getPersistentManager();
			pm.makePersistent(objChangePasswordJDO);

			return objChangePasswordJDO;
		} catch (Exception e) {
			e.printStackTrace();
			logger.severe("Exception occurred : " + e.getMessage());
		}finally {
			/*if(pm != null && !pm.isClosed()){
				pm.close();
			}*/
		}
		logger.info("OUT ChangePasswordDAO - > saveChangePasswordJDO");

		return null;
	}
	
	@SuppressWarnings("unchecked")
	public static ChangePasswordJDO getChangePasswordJDOWithEmailID(String userEmailID) {
		logger.info("IN ChangePasswordDAO - > getChangePasswordJDOWithEmailID");
		PersistenceManager pm = null;
		Query query=null;

		try {
			pm = PersistenceManagerUtil.getPersistentManager();
			List<ChangePasswordJDO> lstChangePasswordJDO = new ArrayList<ChangePasswordJDO>();
			ChangePasswordJDO objChangePasswordJDO = new ChangePasswordJDO();

			String strQuery = "";
			strQuery = "SELECT FROM " + ChangePasswordJDO.class.getName() + " WHERE userEmailID == '" + userEmailID + "'";

			query = pm.newQuery(strQuery);

			lstChangePasswordJDO = (List<ChangePasswordJDO>) query.execute();
			logger.info("Query Result : " + lstChangePasswordJDO.toString());
			if (lstChangePasswordJDO.size() > 0) {
				lstChangePasswordJDO = (List<ChangePasswordJDO>) pm.detachCopyAll(lstChangePasswordJDO);
				objChangePasswordJDO = lstChangePasswordJDO.get(0);
			} else {
				logger.info("No entry is available.");
				objChangePasswordJDO = null;
			}

			logger.info("Result to be returned is : " + objChangePasswordJDO);
			return objChangePasswordJDO;
		} catch (Exception e) {
			e.printStackTrace();
			logger.severe("Exception occurred : " + e.getMessage());
		}finally {
			/*if (query != null) {
				query.closeAll();
			}
			if(pm != null) {
				pm.flush();
				pm.close();
			}*/
		}
		logger.info("OUT ChangePasswordDAO - > getChangePasswordJDOWithEmailID");
		
		return null;
	}
	
	@SuppressWarnings("unchecked")
	public static ChangePasswordJDO getChangePasswordJDOWithRequestKey(String requestKey) {
		logger.info("IN ChangePasswordDAO -> getChangePasswordJDOWithRequestKey");
		PersistenceManager pm = null;
		Query query = null;

		try {
			pm = PersistenceManagerUtil.getPersistentManager();
			List<ChangePasswordJDO> lstChangePasswordJDO = new ArrayList<ChangePasswordJDO>();
			ChangePasswordJDO objChangePasswordJDO = new ChangePasswordJDO();

			String strQuery = "";
			strQuery = "SELECT FROM " + ChangePasswordJDO.class.getName() + " WHERE requestKey == '" + requestKey + "'";
			logger.info("\n strQuery :: " + strQuery);
			query = pm.newQuery(strQuery);

			lstChangePasswordJDO = (List<ChangePasswordJDO>) query.execute();
			logger.info("Query Result : " + lstChangePasswordJDO.toString());
			if (lstChangePasswordJDO.size() > 0) {
				lstChangePasswordJDO = (List<ChangePasswordJDO>) pm.detachCopyAll(lstChangePasswordJDO);
				objChangePasswordJDO = lstChangePasswordJDO.get(0);
			} else {
				logger.info("No entry is available.");
				objChangePasswordJDO = null;
			}

			logger.info("Result to be returned is : " + objChangePasswordJDO);
			return objChangePasswordJDO;
		} catch (Exception e) {
			e.printStackTrace();
			logger.severe("Exception occurred : " + e.getMessage());
		}finally {
			/*if (query != null) {
				query.closeAll();
			}
			if(pm != null){
				pm.close();
			}*/
		}
		logger.info("OUT ChangePasswordDAO -> getChangePasswordJDOWithRequestKey");
		
		return null;
	}
	
}