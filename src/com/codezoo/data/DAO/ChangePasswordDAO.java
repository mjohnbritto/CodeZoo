package com.codezoo.data.DAO;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import com.codezoo.Helper.CommonHelper;
import com.codezoo.Helper.PersistenceManagerUtil;
import com.codezoo.data.JDO.ChangePasswordJDO;

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
			pm.close();

			return objChangePasswordJDO;
		} catch (Exception e) {
			e.printStackTrace();
			logger.severe("Exception occurred : " + e.getMessage());
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
			pm.close();

			return objChangePasswordJDO;
		} catch (Exception e) {
			e.printStackTrace();
			logger.severe("Exception occurred : " + e.getMessage());
		}
		logger.info("OUT ChangePasswordDAO - > saveChangePasswordJDO");

		return null;
	}
	
	@SuppressWarnings("unchecked")
	public static ChangePasswordJDO getChangePasswordJDOWithEmailID(String userEmailID) {
		logger.info("IN ChangePasswordDAO - > getChangePasswordJDOWithEmailID");
		PersistenceManager pm = null;

		try {
			pm = PersistenceManagerUtil.getPersistentManager();
			List<ChangePasswordJDO> lstChangePasswordJDO = new ArrayList<ChangePasswordJDO>();
			ChangePasswordJDO objChangePasswordJDO = new ChangePasswordJDO();

			String strQuery = "";
			strQuery = "SELECT FROM " + ChangePasswordJDO.class.getName() + " WHERE userEmailID == '" + userEmailID + "'";

			Query query = pm.newQuery(strQuery);

			lstChangePasswordJDO = (List<ChangePasswordJDO>) query.execute();
			logger.info("Query Result : " + lstChangePasswordJDO.toString());
			if (lstChangePasswordJDO.size() > 0) {
				lstChangePasswordJDO = (List<ChangePasswordJDO>) pm.detachCopyAll(lstChangePasswordJDO);
				objChangePasswordJDO = lstChangePasswordJDO.get(0);
			} else {
				logger.info("No entry is available.");
				objChangePasswordJDO = null;
			}
			pm.close();

			logger.info("Result to be returned is : " + objChangePasswordJDO);
			return objChangePasswordJDO;
		} catch (Exception e) {
			e.printStackTrace();
			logger.severe("Exception occurred : " + e.getMessage());
		}
		logger.info("OUT ChangePasswordDAO - > getChangePasswordJDOWithEmailID");
		
		return null;
	}
	
	@SuppressWarnings("unchecked")
	public static ChangePasswordJDO getChangePasswordJDOWithRequestKey(String requestKey) {
		logger.info("IN ChangePasswordDAO -> getChangePasswordJDOWithRequestKey");
		PersistenceManager pm = null;

		try {
			pm = PersistenceManagerUtil.getPersistentManager();
			List<ChangePasswordJDO> lstChangePasswordJDO = new ArrayList<ChangePasswordJDO>();
			ChangePasswordJDO objChangePasswordJDO = new ChangePasswordJDO();

			String strQuery = "";
			strQuery = "SELECT FROM " + ChangePasswordJDO.class.getName() + " WHERE requestKey == '" + requestKey + "'";
			logger.info("\n strQuery :: " + strQuery);
			Query query = pm.newQuery(strQuery);

			lstChangePasswordJDO = (List<ChangePasswordJDO>) query.execute();
			logger.info("Query Result : " + lstChangePasswordJDO.toString());
			if (lstChangePasswordJDO.size() > 0) {
				lstChangePasswordJDO = (List<ChangePasswordJDO>) pm.detachCopyAll(lstChangePasswordJDO);
				objChangePasswordJDO = lstChangePasswordJDO.get(0);
			} else {
				logger.info("No entry is available.");
				objChangePasswordJDO = null;
			}
			pm.close();

			logger.info("Result to be returned is : " + objChangePasswordJDO);
			return objChangePasswordJDO;
		} catch (Exception e) {
			e.printStackTrace();
			logger.severe("Exception occurred : " + e.getMessage());
		}
		logger.info("OUT ChangePasswordDAO -> getChangePasswordJDOWithRequestKey");
		
		return null;
	}
	
}