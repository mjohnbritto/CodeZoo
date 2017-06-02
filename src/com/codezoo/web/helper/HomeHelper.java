package com.codezoo.web.helper;

import java.util.Date;
import java.util.List;
import java.util.HashMap;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;

import org.codehaus.jackson.map.ObjectMapper;

import com.codezoo.Helper.CommonHelper;
import com.codezoo.data.JDO.ChangePasswordJDO;
import com.codezoo.data.JDO.ConceptsJDO;
import com.codezoo.data.JDO.UsersJDO;
import com.codezoo.data.DAO.UsersDAO;
import com.codezoo.data.JDO.CourseJDO;
import com.codezoo.data.DAO.ChangePasswordDAO;
import com.codezoo.data.DAO.CourseDAO;
import com.codezoo.data.DAO.ConceptsDAO;

public class HomeHelper {

	private static final Logger logger = Logger.getLogger(RegistrationHelper.class.getName());
	
	@SuppressWarnings("unchecked")
	public static String signinUser( HttpServletRequest request, String signInDetailsJson ){
		logger.info("IN HomeHelper - > signinUser");
		
		String responseString = "";
		
		try{
			ObjectMapper objectMapper = new ObjectMapper();
			HashMap<String, String> requiredDetailsMap = objectMapper.readValue(signInDetailsJson, HashMap.class);
			HashMap<String, Object> responseMap2BeSent = new HashMap<String, Object>();
			
			String userEmailID = "", userPassword = "";
			
			userEmailID = requiredDetailsMap.get("userEmail") != null ? requiredDetailsMap.get("userEmail").toString().trim() : "";
			userPassword = requiredDetailsMap.get("userPasswd") != null ? requiredDetailsMap.get("userPasswd").toString().trim() : "";
			
			if( CommonHelper.isEmptyString(userEmailID) || CommonHelper.isEmptyString(userPassword) ){
				logger.warning("Required details for signin are empty! so not proceeding further!");
				responseMap2BeSent.put(CommonHelper.strSuccess, CommonHelper.blnfalse);
				responseMap2BeSent.put(CommonHelper.strMessage, "UserName or password is empty!");
				
				responseString = objectMapper.writeValueAsString(responseMap2BeSent);
				return responseString;
			}
			
			HashMap<String, Object> response = validateUserWithEmailAndPassword(userEmailID, userPassword);
			logger.info("Response got from  validateUserWithEmailAndPassword is : " + response.toString());
			
			if( (boolean) response.get(CommonHelper.strIsUserExist) ){
				logger.warning("Sign in is successfull!");
				responseMap2BeSent.put(CommonHelper.strSuccess, CommonHelper.blntrue);
				responseMap2BeSent.put(CommonHelper.strMessage, "Successfully signedIn!");
				responseMap2BeSent.put("UsersJDO", response.get("UsersJDO") != null ? response.get("UsersJDO") : null);
				
				request.getSession().setAttribute("UsersJDO", response.get("UsersJDO"));
			}else{
				logger.warning("Sign in NOT is successfull!");
				responseMap2BeSent.put(CommonHelper.strSuccess, CommonHelper.blnfalse);
				responseMap2BeSent.put(CommonHelper.strMessage, "Username or password is incorrect!");
				responseMap2BeSent.put("UsersJDO", null);
			}
			
			responseString = objectMapper.writeValueAsString(responseMap2BeSent);
			
		}catch(Exception e){
			logger.severe("Exception occurred : "+ e.getMessage());
			e.printStackTrace();
		}
		logger.info("OUT HomeHelper - > signinUser");
		return responseString;
	}
	
	public static HashMap<String, Object> validateUserWithEmailAndPassword(String userEmailID, String rawPassword){
		logger.info("IN HomeHelper -> validateUserWithEmailAndPassword");
		
		logger.info("Details received here : userEmailID = " + userEmailID + "\t rawPassword = " + rawPassword);
		HashMap<String, Object> response2beSent = new HashMap<String, Object>();
		try{
			String encryptedPassword = CommonHelper.encryptPassword(rawPassword);
			UsersJDO objUsersJDO = UsersDAO.getUsersJDOWithEmailIDAndPassword(userEmailID, encryptedPassword);
			
			if( objUsersJDO != null ){
				response2beSent.put(CommonHelper.strIsUserExist, CommonHelper.blntrue);
				response2beSent.put("UsersJDO", objUsersJDO);
			}else{
				response2beSent.put(CommonHelper.strIsUserExist, CommonHelper.blnfalse);
				response2beSent.put("UsersJDO", null);
			}
		}catch(Exception e){
			logger.severe("Exception occurred : "+ e.getMessage());
			e.printStackTrace();
		}
		
		logger.info(" response2beSent is :: " + response2beSent + " \n OUT HomeHelper -> validateUserWithEmailAndPassword");
		
		return response2beSent;
	}
	
	public static String signOutUser( HttpServletRequest request ){
		logger.info("IN HomeHelper - > signOutUser");
		
		String responseString = "";
		
		try{
			ObjectMapper objectMapper = new ObjectMapper();
			HashMap<String, Object> responseMap2BeSent = new HashMap<String, Object>();
			
			UsersJDO loggedInUsersJDO = null;
			if( request.getSession().getAttribute("UsersJDO") != null ){
				loggedInUsersJDO = (UsersJDO) request.getSession().getAttribute("UsersJDO");
			}
			if( loggedInUsersJDO != null &&  !CommonHelper.isEmptyString(loggedInUsersJDO.getEmailID()) ){
				logger.info("User is signed so signing out, emailID = " + loggedInUsersJDO.getEmailID() + " \n OUT HomeHelper -> signOutUser()");
				request.getSession().removeAttribute("UsersJDO");
			}else{
				logger.info("User is already signed out.");
			}
			logger.warning("Sign Out is successfull!");
			responseMap2BeSent.put(CommonHelper.strSuccess, CommonHelper.blntrue);
			responseMap2BeSent.put(CommonHelper.strMessage, "Successfully signedOut!");
			
			responseString = objectMapper.writeValueAsString(responseMap2BeSent);
		}catch(Exception e){
			logger.severe("Exception occurred : "+ e.getMessage());
			e.printStackTrace();
		}
		logger.info("OUT HomeHelper - > signOutUser");
		return responseString;
	}
	
	public static String getRequiredDetailsForSignedInUser( HttpServletRequest request ){
		logger.info("IN HomeHelper - > getRequiredDetailsForSignedInUser");
		
		String responseString = "";
		
		try{
			ObjectMapper objectMapper = new ObjectMapper();
			HashMap<String, Object> responseMap2BeSent = new HashMap<String, Object>();
			
			UsersJDO loggedInUsersJDO = null;
			if( request.getSession().getAttribute("UsersJDO") != null ){
				loggedInUsersJDO = (UsersJDO) request.getSession().getAttribute("UsersJDO");
			}
			if( loggedInUsersJDO != null &&  !CommonHelper.isEmptyString(loggedInUsersJDO.getEmailID()) ){
				logger.info("The signed User emailID is = " + loggedInUsersJDO.getEmailID());
				
				List<CourseJDO> lstCourseDetails = CourseDAO.getAllCourseJDO();
				List<ConceptsJDO> lstConceptsDetails = ConceptsDAO.getAllConceptsJDO(); 
				
				responseMap2BeSent.put("UserDetails", loggedInUsersJDO);
				responseMap2BeSent.put("CourseDetails", lstCourseDetails);
				responseMap2BeSent.put("ConceptsDetails", lstConceptsDetails);
				
				responseMap2BeSent.put(CommonHelper.strSuccess, CommonHelper.blntrue);
			}else{
				logger.info("No User is signed in so returning.");
				responseMap2BeSent.put(CommonHelper.strSuccess, CommonHelper.blnfalse);
				responseMap2BeSent.put(CommonHelper.strMessage, "No user signedIn!");
			}
			
			responseString = objectMapper.writeValueAsString(responseMap2BeSent);
		}catch(Exception e){
			logger.severe("Exception occurred : "+ e.getMessage());
			e.printStackTrace();
		}
		logger.info("OUT HomeHelper - > getRequiredDetailsForSignedInUser");
		return responseString;
	}
	
	public static HashMap<String, Object> changePasswordRequest(String userEmailID){
		HashMap<String, Object> responseMap = new HashMap<String, Object>();
		try{
			UsersJDO objUsersJDO = UsersDAO.getUsersJDOWithEmailID(userEmailID);
			if(objUsersJDO != null){
				ChangePasswordJDO objChangePasswordJDO = ChangePasswordDAO.getChangePasswordJDOWithEmailID(userEmailID);
				if(objChangePasswordJDO != null){
					logger.info("Entry is already available so updating...");
					objChangePasswordJDO.setRequestedTime(new Date().getTime());
					objChangePasswordJDO.setRequestKey( CommonHelper.encryptPassword(userEmailID+objChangePasswordJDO.getRequestedTime()) );
					objChangePasswordJDO = ChangePasswordDAO.saveChangePasswordJDO(objChangePasswordJDO);
				}else{
					logger.info("It's a new request so creating new Entry...");
					objChangePasswordJDO = ChangePasswordDAO.saveChangePasswordJDO(userEmailID, new Date().getTime());
				}
				responseMap.put(CommonHelper.strSuccess, true);
				responseMap.put(CommonHelper.strMessage, "Request Processed.");
				responseMap.put("objChangePasswordJDO", objChangePasswordJDO);
				
				logger.info("appID :: " + CommonHelper.getAppId());
				String subject = "CodeZoo - Change Password request";
				String resetPasswordURL = CommonHelper.getAppUrl();
				resetPasswordURL += "/home/resetPassword?requestKey=" + objChangePasswordJDO.getRequestKey();
				String textBody = "Hi " + objUsersJDO.getName() + ", \n You have requested to change your CodeZoo Password. Please click on the below link to change your paassword. The link is valid only upto 2hrs from now. \n " + resetPasswordURL;
				CommonHelper.sendMailQueueHelper( CommonHelper.supportMailAddress, userEmailID, "", "", subject, "", textBody, CommonHelper.supportMailAddress, "", "");
			}else{
				logger.severe( userEmailID + " is not a valid CodeZoo user!");
				responseMap.put(CommonHelper.strSuccess, false);
				responseMap.put(CommonHelper.strMessage, "Invalid UserID!");
			}
		}catch(Exception e){
			logger.severe("Exception occurred : "+ e.getMessage());
			e.printStackTrace();
			responseMap.put(CommonHelper.strSuccess, false);
			responseMap.put(CommonHelper.strMessage, "Required Details are EMPTY!");
		}
		return responseMap;
	}
	
	public static void authorizeToResetPassword(HttpServletRequest request, String requestKey){
		logger.info("IN HomeHelper -> authorizeToResetPassword()");
		try{
			HashMap<String, Object> resetPasswordDetails = new HashMap<String, Object>(); 
			if( CommonHelper.isEmptyString(requestKey) ){
				resetPasswordDetails.put(CommonHelper.strSuccess, false);
				resetPasswordDetails.put(CommonHelper.strMessage, "Invalid request, Your password reset link is not valid or expired");
			}else{
				ChangePasswordJDO objChangePasswordJDO = new ChangePasswordJDO();
				objChangePasswordJDO = ChangePasswordDAO.getChangePasswordJDOWithRequestKey(requestKey);
				
				if( objChangePasswordJDO != null ){
					long currentTime = new Date().getTime();
					long requestedTime = objChangePasswordJDO.getRequestedTime();
					if( (currentTime-requestedTime) <= CommonHelper.resetPasswordLinkExpiryTime ){
						resetPasswordDetails.put(CommonHelper.strSuccess, true);
						resetPasswordDetails.put("userEmailID", objChangePasswordJDO.getUserEmailID());
					}else{
						resetPasswordDetails.put(CommonHelper.strSuccess, false);
						resetPasswordDetails.put(CommonHelper.strMessage, "Your password reset link is expired.");
					}
					//need to delete the entry
				}else{
					resetPasswordDetails.put(CommonHelper.strSuccess, false);
					resetPasswordDetails.put(CommonHelper.strMessage, "Invalid request, Your password reset link is not valid or expired");
				}
			}
			ObjectMapper objectMapper = new ObjectMapper();
			String resetPasswordDetailsString = objectMapper.writeValueAsString(resetPasswordDetails);
			request.getSession().setAttribute("resetPasswordDetailsJSON", resetPasswordDetailsString);
//			request.getSession().setAttribute("resetPasswordDetailsJSON", resetPasswordDetails);
		}catch(Exception e){
			logger.severe("Exception occurred : "+ e.getMessage());
			e.printStackTrace();
		}
		logger.info("OUT HomeHelper -> authorizeToResetPassword()");
	}
	
	public static HashMap<String, Object> updatePasswordHelper(String userEmailID, String password){
		logger.info("IN HomeHelper -> updatePasswordHelper()");
		HashMap<String, Object> responseMap = new HashMap<String, Object>();
		try{
			if( CommonHelper.isEmptyString(userEmailID) || CommonHelper.isEmptyString(password) ){
				responseMap.put(CommonHelper.strSuccess, false);
				responseMap.put(CommonHelper.strMessage, "Required details are EMPTY!");
			}else{
				UsersJDO objUsersJDO = UsersDAO.getUsersJDOWithEmailID(userEmailID);
				objUsersJDO.setPassword( CommonHelper.encryptPassword(password) );
				UsersDAO.saveUsersJDO(objUsersJDO);
				
				responseMap.put(CommonHelper.strSuccess, true);
				responseMap.put(CommonHelper.strMessage, "Your password has been updated successfully!");
			}
		}catch(Exception e){
			logger.severe("Exception occurred : "+ e.getMessage());
			e.printStackTrace();
		}
		logger.info("OUT HomeHelper -> updatePasswordHelper()");
		return responseMap;
	}
}
