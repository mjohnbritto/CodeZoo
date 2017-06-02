package com.codezoo.web.helper;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Logger;

import org.codehaus.jackson.map.ObjectMapper;

import com.codezoo.Helper.CommonHelper;
import com.codezoo.Helper.UUIDGenerator;
import com.codezoo.data.DAO.ForumAnswerDAO;
import com.codezoo.data.DAO.ForumQueryDAO;
import com.codezoo.data.DAO.UsersDAO;
import com.codezoo.data.JDO.ForumAnswerJDO;
import com.codezoo.data.JDO.ForumQueryJDO;
import com.codezoo.data.JDO.UsersJDO;


public class ForumHelper{
	public static Logger logger = Logger.getLogger(ForumHelper.class.getName());
	
	@SuppressWarnings("unchecked")
	public static HashMap<String, Object> postNewQuestion(String requiredDetailsJson){
		logger.info("IN ForumHelper --> postNewQuestion()");
		HashMap<String, Object> responseMap = new HashMap<String, Object>();
		try{
			ObjectMapper objectMapper = new ObjectMapper();
			HashMap<String, Object> requiredDetailsMap = objectMapper.readValue(requiredDetailsJson, HashMap.class);
			
			if( CommonHelper.isEmptyString((String) requiredDetailsMap.get("userID")) || CommonHelper.isEmptyString((String) requiredDetailsMap.get("question")) ){
				logger.warning("Required details are EMPTY!");
				responseMap.put(CommonHelper.strSuccess, CommonHelper.blnfalse);
			}else{
				ForumQueryJDO objForumQueryJDO = new ForumQueryJDO();
				objForumQueryJDO.setQueryID(UUIDGenerator.getUniqueID());
				objForumQueryJDO.setUserID( requiredDetailsMap.get("userID").toString().trim() );
				objForumQueryJDO.setQuery( requiredDetailsMap.get("question").toString().trim() );
				objForumQueryJDO.setPostedLongTime( new Date().getTime() );
				
				objForumQueryJDO = ForumQueryDAO.saveForumQueryJDO(objForumQueryJDO);
				
				responseMap.put(CommonHelper.strSuccess, CommonHelper.blntrue);
				responseMap.put("ForumQueryJDO", objForumQueryJDO);
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Exception occurred :: " + e.getMessage());
			responseMap.put(CommonHelper.strSuccess, CommonHelper.blnfalse);
		}
		logger.info("OUT ForumHelper --> postNewQuestion()");
		return responseMap;
	}
	
	@SuppressWarnings("unchecked")
	public static HashMap<String, Object> saveNewAnswer(String requiredDetailsJson){
		logger.info("IN ForumHelper --> saveNewAnswer()");
		HashMap<String, Object> responseMap = new HashMap<String, Object>();
		try{
			ObjectMapper objectMapper = new ObjectMapper();
			HashMap<String, Object> requiredDetailsMap = objectMapper.readValue(requiredDetailsJson, HashMap.class);
			
			if( CommonHelper.isEmptyString((String) requiredDetailsMap.get("queryID")) || CommonHelper.isEmptyString((String) requiredDetailsMap.get("userID")) || CommonHelper.isEmptyString((String) requiredDetailsMap.get("answer")) ){
				logger.warning("Required details are EMPTY!");
				responseMap.put(CommonHelper.strSuccess, CommonHelper.blnfalse);
			}else{
				ForumAnswerJDO objForumAnswerJDO = new ForumAnswerJDO();
				objForumAnswerJDO.setAnswerID( UUIDGenerator.getUniqueID() );
				objForumAnswerJDO.setQueryID( (String) requiredDetailsMap.get("queryID") );
				objForumAnswerJDO.setUserID( (String) requiredDetailsMap.get("userID") );
				objForumAnswerJDO.setAnswer( (String) requiredDetailsMap.get("answer") );
				objForumAnswerJDO.setAnsweredLongTime( new Date().getTime() );
				
				objForumAnswerJDO = ForumAnswerDAO.saveForumAnswerJDO(objForumAnswerJDO);
				
				responseMap.put(CommonHelper.strSuccess, CommonHelper.blntrue);
				responseMap.put("ForumAnswerJDO", objForumAnswerJDO);
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Exception occurred :: " + e.getMessage());
			responseMap.put(CommonHelper.strSuccess, CommonHelper.blnfalse);
		}
		logger.info("OUT ForumHelper --> saveNewAnswer()");
		return responseMap;
	}
	
	@SuppressWarnings("unchecked")
	public static HashMap<String, Object> getForumQueriesList(String requiredDetailsJson){
		logger.info("IN ForumHelper --> getForumQueriesList()");
		HashMap<String, Object> responseMap = new HashMap<String, Object>();
		try{
			String userID = "";
			ObjectMapper objectMapper = new ObjectMapper();
			HashMap<String, Object> requiredDetailsMap = objectMapper.readValue(requiredDetailsJson, HashMap.class);
			
			List<ForumQueryJDO> lstForumQueryJDO = new ArrayList<ForumQueryJDO>();
			
			if( CommonHelper.isEmptyString((String) requiredDetailsMap.get("userID")) ){
				userID = "";
			}else{
				userID = (String) requiredDetailsMap.get("userID");
			}
			logger.warning("Received userID is :: " + userID);
			lstForumQueryJDO = ForumQueryDAO.getForumQueries(userID);
			
			List<HashMap<String, Object>> lstForumQueryAnswer;
			
			if( lstForumQueryJDO != null ){
				lstForumQueryAnswer = new ArrayList<HashMap<String, Object>>();
				
				for( ForumQueryJDO entry : lstForumQueryJDO ){
					HashMap<String, Object> questionAndAnswerMap = new HashMap<String, Object>();
					List<ForumAnswerJDO> lstForumAnswerJDO = ForumAnswerDAO.getAllAnswersForThisQuestion(entry.getQueryID());
					questionAndAnswerMap.put("question", entry);
					questionAndAnswerMap.put("answers", lstForumAnswerJDO);
					
					lstForumQueryAnswer.add(questionAndAnswerMap);
				}
			}else{
				lstForumQueryAnswer = null;
			}
			
			responseMap.put(CommonHelper.strSuccess, CommonHelper.blntrue);
			responseMap.put("questionAnswerDetails", lstForumQueryAnswer);
			logger.info("responseMap to be returned is :: " + responseMap);
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Exception occurred :: " + e.getMessage());
			responseMap.put(CommonHelper.strSuccess, CommonHelper.blnfalse);
		}
		logger.info("OUT ForumHelper --> getForumQueriesList()");
		return responseMap;
	}
	
	public static HashMap<String, Object> getAllUsersDetailsMap(){
		logger.info("IN ForumHelper --> getAllUsersDetailsMap()");
		HashMap<String, Object> allUsersMap = new HashMap<String, Object>();
		try{
			List<UsersJDO> lstUsersJDO = UsersDAO.getAllUsersOfCodeZoo();
			if( lstUsersJDO != null && lstUsersJDO.size()>0 ){
				for( int index=0; index< lstUsersJDO.size(); index++ ){
					allUsersMap.put(lstUsersJDO.get(index).getUserID() , lstUsersJDO.get(index));
				}
			}else{
				allUsersMap = null;
			}
			logger.info("Response to be returned is :: " + allUsersMap);
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Exception occurred : " + e.getMessage());
		}
		logger.info("OUT ForumHelper --> getAllUsersDetailsMap()");
		return allUsersMap;
	}
}