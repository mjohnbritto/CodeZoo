package com.codezoo.data.DAO;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import com.codezoo.Helper.PersistenceManagerUtil;
import com.codezoo.data.JDO.ConceptsJDO;
import com.codezoo.data.JDO.PerformanceDetailsJDO;

public class PerformanceDetailsDAO {
	private static final Logger logger = Logger.getLogger(ConceptsDAO.class
			.getName());

	public static PerformanceDetailsJDO savePerformanceDetailsJDO(
			PerformanceDetailsJDO objPerformanceDetailsJDO) {
		logger.info("IN PerformanceDetailsJDO - > savePerformanceDetailsJDO");
		PersistenceManager pm = null;

		try {
			pm = PersistenceManagerUtil.getPersistentManager();
			if(objPerformanceDetailsJDO != null){
				logger.info(" Received userID = " + objPerformanceDetailsJDO.getUserID() + "\n conceptID = " + objPerformanceDetailsJDO.getConceptID());
				PerformanceDetailsJDO resultJDO = getPerformanceDetailsWithUserIDAndConceptID(objPerformanceDetailsJDO.getUserID(), objPerformanceDetailsJDO.getConceptID());
				if(resultJDO != null){
					logger.info("With this userID and conceptID There is already an entry available so updating the same entry.");
					resultJDO.setScore(objPerformanceDetailsJDO.getScore());
					pm.makePersistent(resultJDO);
				}else{
					logger.info("With this userID and conceptID There is NO entry available so creating new entry.");
					pm.makePersistent(objPerformanceDetailsJDO);
				}
			}else{
				logger.warning("Required details are empty so not proceeding further!");
				return null;
			}
			pm.close();
			return objPerformanceDetailsJDO;
		} catch (Exception e) {
			e.printStackTrace();
			logger.severe("Exception occurred : " + e.getMessage());
		}
		logger.info("OUT PerformanceDetailsJDO - > savePerformanceDetailsJDO");
		return null;
	}
	
	@SuppressWarnings("unchecked")
	public static PerformanceDetailsJDO getPerformanceDetailsWithUserIDAndConceptID(String userID, String conceptID){
		logger.info("IN PerformanceDetailsJDO --> getPerformanceDetailsWithUserIDAndConceptID()");
		PerformanceDetailsJDO objPerformanceDetailsJDO2BReturned = new PerformanceDetailsJDO();
		try{
			PersistenceManager pm = PersistenceManagerUtil.getPersistentManager();
			List<PerformanceDetailsJDO> lstPerformanceDetailsJDO = new ArrayList<PerformanceDetailsJDO>();
			String strQuery = "SELECT FROM " + PerformanceDetailsJDO.class.getName() + " WHERE userID == '" + userID + "' && conceptID == '" + conceptID + "'";
			Query query = pm.newQuery(strQuery);
			lstPerformanceDetailsJDO = (List<PerformanceDetailsJDO>) query.execute();
			logger.info("Query result is = " + lstPerformanceDetailsJDO);
			if( lstPerformanceDetailsJDO != null && lstPerformanceDetailsJDO.size() > 0 ){
				lstPerformanceDetailsJDO = (List<PerformanceDetailsJDO>) pm.detachCopyAll(lstPerformanceDetailsJDO);
				objPerformanceDetailsJDO2BReturned = lstPerformanceDetailsJDO.get(0); 
			}else{
				objPerformanceDetailsJDO2BReturned = null;
			}
			logger.info("Result to be returned is = " + objPerformanceDetailsJDO2BReturned);
			pm.close();
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Exception occurred :: " + e.getMessage());
			objPerformanceDetailsJDO2BReturned = null;
		}
		logger.info("OUT PerformanceDetailsJDO --> getPerformanceDetailsWithUserIDAndConceptID()");
		return objPerformanceDetailsJDO2BReturned;
	}

	@SuppressWarnings("unchecked")
	public static List<PerformanceDetailsJDO> getScoresForUser(String userID) {
		logger.info("IN PerformanceDetailsDAO - > getScoresForUser \n received userID is = "
				+ userID);
		PersistenceManager pm = null;

		try {
			pm = PersistenceManagerUtil.getPersistentManager();
			List<PerformanceDetailsJDO> objPerformanceDetailsJDO2BeReturned = new ArrayList<PerformanceDetailsJDO>();

			String strQuery = "SELECT FROM "
					+ PerformanceDetailsJDO.class.getName()
					+ " WHERE userID == '" + userID
					+ "' ORDER BY conceptID ASC";
			Query query = pm.newQuery(strQuery);

			objPerformanceDetailsJDO2BeReturned = (List<PerformanceDetailsJDO>) query
					.execute();
			logger.info("Query Result : "
					+ objPerformanceDetailsJDO2BeReturned.toString());
			if (objPerformanceDetailsJDO2BeReturned != null && objPerformanceDetailsJDO2BeReturned.size() > 0) {
				objPerformanceDetailsJDO2BeReturned = (List<PerformanceDetailsJDO>) pm
						.detachCopyAll(objPerformanceDetailsJDO2BeReturned);

				ConceptsJDO objConceptsJDO = new ConceptsJDO();
				for (PerformanceDetailsJDO performanceDetails : objPerformanceDetailsJDO2BeReturned) {
					objConceptsJDO = ConceptsDAO
							.getConceptsJDOWithConceptID(performanceDetails
									.getConceptID());
					performanceDetails.setConceptName(objConceptsJDO
							.getConceptName());
				}
			} else {
				logger.info("No entry is available.");
				objPerformanceDetailsJDO2BeReturned = null;
			}
			pm.close();

			logger.info("Result to be returned is  = "
					+ objPerformanceDetailsJDO2BeReturned);
			return objPerformanceDetailsJDO2BeReturned;
		} catch (Exception e) {
			e.printStackTrace();
			logger.severe("Exception occurred : " + e.getMessage());
		}
		logger.info("OUT PerformanceDetailsDAO - > getScoresForUser");

		return null;
	}
}
