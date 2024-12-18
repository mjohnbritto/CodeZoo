package com.codezoo.data.DAO;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import com.codezoo.Helper.PersistenceManagerUtil;
import com.codezoo.Helper.UUIDGenerator;
import com.codezoo.data.JDO.PerformanceAnalyzerJDO;

public class PerformanceAnalyzerDAO {
	private static final Logger logger = Logger.getLogger(ConceptsDAO.class
			.getName());

	public static void setPerformanceAnalyzerProperties(String conceptID,
			String question, String option1, String option2, String option3,
			String option4, String answer) {
		logger.info("IN PerformanceAnalyzerJDO --> setPerformanceAnalyzerProperties");
		try {
			PerformanceAnalyzerJDO objPerformanceAnalyzerJDO = new PerformanceAnalyzerJDO();
			objPerformanceAnalyzerJDO.setConceptID(conceptID);	
			objPerformanceAnalyzerJDO
					.setQuestionID(UUIDGenerator.getUniqueID());
			objPerformanceAnalyzerJDO.setQuestion(question);
			objPerformanceAnalyzerJDO.setOption1(option1);
			objPerformanceAnalyzerJDO.setOption2(option2);
			objPerformanceAnalyzerJDO.setOption3(option3);
			objPerformanceAnalyzerJDO.setOption4(option4);
			objPerformanceAnalyzerJDO.setAnswer(answer);
			savePerformanceAnalyzerJDO(objPerformanceAnalyzerJDO);
		} catch (Exception e) {
			e.printStackTrace();
			logger.severe("Exception occurred :: " + e.getMessage());
		}
		logger.info("OUT PerformanceAnalyzerJDO --> setPerformanceAnalyzerProperties");
	}

	public static PerformanceAnalyzerJDO savePerformanceAnalyzerJDO(
			PerformanceAnalyzerJDO objPerformanceAnalyzerJDO) {
		logger.info("IN PerformanceAnalyzerDAO - > savePerformanceAnalyzerJDO");
		PersistenceManager pm = null;

		try {
			pm = PersistenceManagerUtil.getPersistentManager();
			pm.makePersistent(objPerformanceAnalyzerJDO);

			return objPerformanceAnalyzerJDO;
		} catch (Exception e) {
			e.printStackTrace();
			logger.severe("Exception occurred : " + e.getMessage());
		}finally {
			/*if(pm != null){
				pm.close();
			}*/
		}
		logger.info("OUT PerformanceAnalyzerDAO - > savePerformanceAnalyzerJDO");

		return null;
	}

	@SuppressWarnings("unchecked")
	public static List<PerformanceAnalyzerJDO> getAllQuestionsWithConceptID(
			String conceptID) {
		logger.info("IN PerformanceAnalyzerDAO - > getAllQuestionsWithConceptID \n received conceptID is = "
				+ conceptID);
		PersistenceManager pm = null;

		try {
			pm = PersistenceManagerUtil.getPersistentManager();
			List<PerformanceAnalyzerJDO> objPerformanceAnalyzerJDO2BeReturned = new ArrayList<PerformanceAnalyzerJDO>();

			String strQuery = "SELECT FROM "
					+ PerformanceAnalyzerJDO.class.getName()
					+ " WHERE conceptID == '" + conceptID + "'";
			Query query = pm.newQuery(strQuery);

			objPerformanceAnalyzerJDO2BeReturned = (List<PerformanceAnalyzerJDO>) query
					.execute();
			logger.info("Query Result : "
					+ objPerformanceAnalyzerJDO2BeReturned.toString());
			if (objPerformanceAnalyzerJDO2BeReturned.size() > 0) {
				objPerformanceAnalyzerJDO2BeReturned = (List<PerformanceAnalyzerJDO>) pm
						.detachCopyAll(objPerformanceAnalyzerJDO2BeReturned);
			} else {
				logger.info("No entry is available.");
				objPerformanceAnalyzerJDO2BeReturned = null;
			}

			logger.info("Result to be returned is : "
					+ objPerformanceAnalyzerJDO2BeReturned.toString()
					+ "\n  Size is = "
					+ objPerformanceAnalyzerJDO2BeReturned.size());
			return objPerformanceAnalyzerJDO2BeReturned;
		} catch (Exception e) {
			e.printStackTrace();
			logger.severe("Exception occurred : " + e.getMessage());
		}finally {
			/*if(pm != null){
				pm.close();
			}*/
		}
		logger.info("OUT PerformanceAnalyzerDAO - > getAllQuestionsWithConceptID");

		return null;
	}
}
