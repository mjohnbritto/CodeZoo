package com.codezoo.web.helper;

import java.util.HashMap;
import java.util.logging.Logger;

import org.codehaus.jackson.map.ObjectMapper;

import com.codezoo.Helper.CommonHelper;
import com.codezoo.Helper.UUIDGenerator;
import com.codezoo.data.JDO.UsersJDO;
import com.codezoo.data.DAO.UsersDAO;

public class RegistrationHelper {
	private static final Logger logger = Logger.getLogger(RegistrationHelper.class.getName());
	
	@SuppressWarnings("unchecked")
	public static String registerNewUser(String reqRegDetailsJSON){
		logger.info("IN RegistraionHelper - > registerNewUser");
		
		String responseString = "";
		
		try{
			UsersJDO newUsersJDO = new UsersJDO();
			ObjectMapper objectMapper = new ObjectMapper();
			HashMap<String, String> requiredDetailsMap = objectMapper.readValue(reqRegDetailsJSON, HashMap.class);
			HashMap<String, Object> responseMap = new HashMap<String, Object>();
			
			String userName = "", userEmailID = "", userPassword = "", userAddress = "";
			
			userName = requiredDetailsMap.get("userName") != null ? requiredDetailsMap.get("userName").toString().trim() : "";
			userEmailID = requiredDetailsMap.get("userEmail") != null ? requiredDetailsMap.get("userEmail").toString().trim() : "";
			userPassword = requiredDetailsMap.get("userPasswd") != null ? requiredDetailsMap.get("userPasswd").toString().trim() : "";
			userAddress = requiredDetailsMap.get("userAddress") != null ? requiredDetailsMap.get("userAddress").toString().trim() : "";
			
			if( CommonHelper.isEmptyString(userName) || CommonHelper.isEmptyString(userEmailID) || CommonHelper.isEmptyString(userPassword) || CommonHelper.isEmptyString(userAddress) ){
				logger.warning("Required details for registration are empty! so not proceeding further!");
				responseMap.put(CommonHelper.strSuccess, CommonHelper.blnfalse);
				responseMap.put(CommonHelper.strMessage, "Required Details are empty!");
				
				responseString = objectMapper.writeValueAsString(responseMap);
				return responseString;
			}
			
			UsersJDO existingUsersJDO = UsersDAO.getUsersJDOWithEmailID(userEmailID);
			if( existingUsersJDO != null ){
				logger.info("Response got from  getUsersJDOWithEmailID is : " + existingUsersJDO);
				logger.warning("This user is already registered with CodeZoo!");
				responseMap.put(CommonHelper.strSuccess, CommonHelper.blnfalse);
				responseMap.put(CommonHelper.strMessage, "This user is already registered!");
				
				responseString = objectMapper.writeValueAsString(responseMap);
				return responseString;
			}
			
			newUsersJDO.setUserID(UUIDGenerator.getUniqueID());
			newUsersJDO.setName(userName);
			newUsersJDO.setEmailID(userEmailID);
			newUsersJDO.setPassword( CommonHelper.encryptPassword(userPassword) );
			newUsersJDO.setAddress(userAddress);
			
			UsersDAO.saveUsersJDO(newUsersJDO);
			
			responseMap.put(CommonHelper.strSuccess, CommonHelper.blntrue);
			responseMap.put(CommonHelper.strMessage, "User successfully registered!");
			responseMap.put("UsersJDO", newUsersJDO);
			
			responseString = objectMapper.writeValueAsString(responseMap);
			return responseString;
			
		}catch(Exception e){
			logger.severe("Exception occurred : "+ e.getMessage());
			e.printStackTrace();
		}
		logger.info("OUT RegistraionHelper - > registerNewUser");
		return null;
	}
}
