package com.codezoo.web.helper;

import java.util.HashMap;
import java.util.List;
import java.util.logging.Logger;

import org.codehaus.jackson.map.ObjectMapper;

import com.codezoo.Helper.CommonHelper;
import com.codezoo.data.DAO.PerformanceAnalyzerDAO;
import com.codezoo.data.DAO.PerformanceDetailsDAO;
import com.codezoo.data.JDO.PerformanceAnalyzerJDO;
import com.codezoo.data.JDO.PerformanceDetailsJDO;

public class PerformanceAnalyzerHelper {

	private static final Logger logger = Logger
			.getLogger(RegistrationHelper.class.getName());

	@SuppressWarnings("unchecked")
	public static HashMap<String, Object> getAllQuestionsForQuiz(
			String requiredDetailsJSON) {
		logger.info("IN PerformanceAnalyzerHelper --> getAllQuestionsForQuiz()");
		HashMap<String, Object> responseMap2BeSent = new HashMap<String, Object>();
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			HashMap<String, String> requiredDetailsMap = objectMapper
					.readValue(requiredDetailsJSON, HashMap.class);
			String conceptID = requiredDetailsMap.get("conceptID");
			conceptID = conceptID.trim();
			logger.info("ConceptID is = " + conceptID);
			if (!CommonHelper.isEmptyString(conceptID)) {
				List<PerformanceAnalyzerJDO> lstPerformanceAnalyzerJDO = PerformanceAnalyzerDAO
						.getAllQuestionsWithConceptID(conceptID);

				responseMap2BeSent.put(CommonHelper.strSuccess,
						CommonHelper.blntrue);
				responseMap2BeSent.put("questionsDetails",
						lstPerformanceAnalyzerJDO);
			} else {
				logger.warning("conceptID is EMPTY!!");
				responseMap2BeSent.put(CommonHelper.strSuccess,
						CommonHelper.blnfalse);
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.severe("Exception occurred :: " + e.getMessage());
			responseMap2BeSent.put(CommonHelper.strSuccess,
					CommonHelper.blnfalse);
		}
		logger.info("OUT PerformanceAnalyzerHelper --> getAllQuestionsForQuiz()");
		return responseMap2BeSent;
	}
	
	
	@SuppressWarnings("unchecked")
	public static HashMap<String, Object> savePerformanceDetails(String requiredDetailsJSON) {
		logger.info("IN PerformanceAnalyzerHelper --> savePerformanceDetails()");
		HashMap<String, Object> responseMap2BeSent = new HashMap<String, Object>();
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			HashMap<String, String> requiredDetailsMap = objectMapper.readValue(requiredDetailsJSON, HashMap.class);
			String userID = requiredDetailsMap.get("userID").trim();
			String conceptID = requiredDetailsMap.get("conceptID").trim();
			String score = requiredDetailsMap.get("score").trim();
			logger.info("userID = " + userID + "\n ConceptID is = " + conceptID + "\n score = " + score);
			if (!CommonHelper.isEmptyString(userID) && !CommonHelper.isEmptyString(conceptID) && !CommonHelper.isEmptyString(score)) {
				PerformanceDetailsJDO objPerformanceDetailsJDO = new PerformanceDetailsJDO();
				objPerformanceDetailsJDO.setUserID(userID);
				objPerformanceDetailsJDO.setConceptID(conceptID);
				objPerformanceDetailsJDO.setScore(score);
				PerformanceDetailsDAO.savePerformanceDetailsJDO(objPerformanceDetailsJDO);

				responseMap2BeSent.put(CommonHelper.strSuccess, CommonHelper.blntrue);
				responseMap2BeSent.put("PerformanceDetailsJDO", objPerformanceDetailsJDO);
			} else {
				logger.warning("Required details are EMPTY!!, so not proceeding further.");
				responseMap2BeSent.put(CommonHelper.strSuccess, CommonHelper.blnfalse);
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.severe("Exception occurred :: " + e.getMessage());
			responseMap2BeSent.put(CommonHelper.strSuccess, CommonHelper.blnfalse);
		}
		logger.info("OUT PerformanceAnalyzerHelper --> savePerformanceDetails()");
		return responseMap2BeSent;
	}
	
	@SuppressWarnings("unchecked")
	public static HashMap<String, Object> getScoresForUser(String requiredDetailsJSON) {
		logger.info("IN PerformanceAnalyzerHelper --> getScoresForUser()");
		HashMap<String, Object> responseMap2BeSent = new HashMap<String, Object>();
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			HashMap<String, String> requiredDetailsMap = objectMapper.readValue(requiredDetailsJSON, HashMap.class);
			String userID = requiredDetailsMap.get("userID").trim();
			logger.info("userID is = " + userID);
			if (!CommonHelper.isEmptyString(userID)) {
				List<PerformanceDetailsJDO> lstPerformanceDetailsJDO = PerformanceDetailsDAO.getScoresForUser(userID);

				responseMap2BeSent.put(CommonHelper.strSuccess, CommonHelper.blntrue);
				responseMap2BeSent.put("scoreDetails", lstPerformanceDetailsJDO);
			} else {
				logger.warning("userID is EMPTY!!");
				responseMap2BeSent.put(CommonHelper.strSuccess, CommonHelper.blnfalse);
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.severe("Exception occurred :: " + e.getMessage());
			responseMap2BeSent.put(CommonHelper.strSuccess, CommonHelper.blnfalse);
		}
		logger.info("OUT PerformanceAnalyzerHelper --> getScoresForUser()");
		return responseMap2BeSent;
	}
}