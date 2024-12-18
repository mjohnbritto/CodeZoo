package com.codezoo.data.DAO;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import com.codezoo.Helper.PersistenceManagerUtil;
import com.codezoo.data.JDO.ConceptsJDO;

public class ConceptsDAO {

	private static final Logger logger = Logger.getLogger(ConceptsDAO.class
			.getName());

	public static ConceptsJDO saveConceptsJDO(ConceptsJDO objConceptsJDO) {
		logger.info("IN ConceptsDAO - > saveConceptsJDO");
		PersistenceManager pm = null;

		try {
			pm = PersistenceManagerUtil.getPersistentManager();
			pm.makePersistent(objConceptsJDO);

			return objConceptsJDO;
		} catch (Exception e) {
			e.printStackTrace();
			logger.severe("Exception occurred : " + e.getMessage());
		}finally {
			/*if(pm != null){
				pm.close();
			}*/
		}
		logger.info("OUT ConceptsDAO - > saveConceptsJDO");

		return null;
	}

	@SuppressWarnings("unchecked")
	public static List<ConceptsJDO> getAllConceptsJDO() {
		logger.info("IN ConceptsDAO - > getAllConceptsJDO");
		PersistenceManager pm = null;

		try {
			pm = PersistenceManagerUtil.getPersistentManager();
			List<ConceptsJDO> objConceptsJDO2BeReturned = new ArrayList<ConceptsJDO>();

			String strQuery = "";
			strQuery = "SELECT FROM " + ConceptsJDO.class.getName();

			Query query = pm.newQuery(strQuery);

			objConceptsJDO2BeReturned = (List<ConceptsJDO>) query.execute();
			logger.info("Query Result : "
					+ objConceptsJDO2BeReturned.toString());
			if (objConceptsJDO2BeReturned.size() > 0) {
				objConceptsJDO2BeReturned = (List<ConceptsJDO>) pm
						.detachCopyAll(objConceptsJDO2BeReturned);
			} else {
				logger.info("No entry is available.");
				objConceptsJDO2BeReturned = null;
			}

			logger.info("Result to be returned is : "
					+ objConceptsJDO2BeReturned.toString());
			return objConceptsJDO2BeReturned;
		} catch (Exception e) {
			e.printStackTrace();
			logger.severe("Exception occurred : " + e.getMessage());
		}finally {
			/*if(pm != null){
				pm.close();
			}*/
		}
		logger.info("OUT ConceptsDAO - > getAllConceptsJDO");

		return null;
	}

	@SuppressWarnings("unchecked")
	public static ConceptsJDO getConceptsJDOWithConceptID(String conceptID) {
		logger.info("IN ConceptsDAO - > getConceptsJDOWithConceptID");
		PersistenceManager pm = null;

		try {
			pm = PersistenceManagerUtil.getPersistentManager();
			List<ConceptsJDO> lstConceptsJDO = new ArrayList<ConceptsJDO>();
			ConceptsJDO objConceptsJDO2BeReturned = new ConceptsJDO();

			String strQuery = "";
			strQuery = "SELECT FROM " + ConceptsJDO.class.getName()
					+ " WHERE conceptID == '" + conceptID + "'";

			Query query = pm.newQuery(strQuery);

			lstConceptsJDO = (List<ConceptsJDO>) query.execute();
			logger.info("Query Result : " + lstConceptsJDO.toString());
			if (lstConceptsJDO.size() > 0) {
				lstConceptsJDO = (List<ConceptsJDO>) pm
						.detachCopyAll(lstConceptsJDO);
				objConceptsJDO2BeReturned = lstConceptsJDO.get(0);
			} else {
				logger.info("No entry is available.");
				objConceptsJDO2BeReturned = null;
			}

			logger.info("Result to be returned is : "
					+ objConceptsJDO2BeReturned.toString());
			return objConceptsJDO2BeReturned;
		} catch (Exception e) {
			e.printStackTrace();
			logger.severe("Exception occurred : " + e.getMessage());
		}finally {
			/*if(pm != null){
				pm.close();
			}*/
		}
		logger.info("OUT ConceptsDAO - > getConceptsJDOWithConceptID");

		return null;
	}
}
