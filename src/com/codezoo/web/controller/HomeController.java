package com.codezoo.web.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.codezoo.Helper.CommonHelper;
import com.codezoo.data.DAO.UsersDAO;
import com.codezoo.data.JDO.UsersJDO;
import com.codezoo.web.helper.HomeHelper;

@Controller
@RequestMapping("/home")
public class HomeController {
	private static Logger logger = Logger.getLogger(HomeController.class.getName());

	@RequestMapping( value = "/signin" , method = RequestMethod.POST)
	public static @ResponseBody String signinUser(@RequestBody String signInDetailsJson, HttpServletRequest request, HttpServletResponse response) throws JsonGenerationException, JsonMappingException, IOException{
		logger.info("IN HomeController -> signinUser");
		
		HashMap<String, Object> responseMap = new HashMap<String, Object>();
		ObjectMapper objectMapper = new ObjectMapper();
		String responseString = "";
		logger.info("signInDetailsJson : " + signInDetailsJson.toString());
		try{
			
			return HomeHelper.signinUser( request, signInDetailsJson );
			
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Exception occurred : " + e.getMessage());
		}
		
		responseMap.put(CommonHelper.strSuccess, CommonHelper.blnfalse);
		responseMap.put(CommonHelper.strMessage, "Something went wrong, Please retry!");
		responseString = objectMapper.writeValueAsString(responseMap);
		
		logger.info("OUT HomeController -> signinUser");
		return responseString;
	}
	
	@RequestMapping( value = "/signout" , method = RequestMethod.POST)
	public static @ResponseBody String signOutUser(HttpServletRequest request, HttpServletResponse response) throws JsonGenerationException, JsonMappingException, IOException{
		logger.info("IN HomeController -> signOutUser");
		
		HashMap<String, Object> responseMap = new HashMap<String, Object>();
		ObjectMapper objectMapper = new ObjectMapper();
		String responseString = "";
		try{
			
			return HomeHelper.signOutUser( request );
			
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Exception occurred : " + e.getMessage());
		}
		
		responseMap.put(CommonHelper.strSuccess, CommonHelper.blnfalse);
		responseMap.put(CommonHelper.strMessage, "Something went wrong, Please retry!");
		responseString = objectMapper.writeValueAsString(responseMap);
		
		logger.info("OUT HomeController -> signOutUser");
		return responseString;
	}
	
	
	@RequestMapping( value = "/getRequiredDetailsForSignedInUser" , method = RequestMethod.POST)
	public static @ResponseBody String getRequiredDetailsForSignedInUser(HttpServletRequest request, HttpServletResponse response) throws JsonGenerationException, JsonMappingException, IOException{
		logger.info("IN HomeController -> getRequiredDetailsForSignedInUser");
		
		HashMap<String, Object> responseMap = new HashMap<String, Object>();
		ObjectMapper objectMapper = new ObjectMapper();
		String responseString = "";
		try{
			return HomeHelper.getRequiredDetailsForSignedInUser(request);
			
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Exception occurred : " + e.getMessage());
		}
		
		responseMap.put(CommonHelper.strSuccess, CommonHelper.blnfalse);
		responseMap.put(CommonHelper.strMessage, "Something went wrong, Please retry!");
		responseString = objectMapper.writeValueAsString(responseMap);
		
		logger.info("OUT HomeController -> getRequiredDetailsForSignedInUser");
		return responseString;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping( value="/raiseUserQuery", method={RequestMethod.POST})
	public static @ResponseBody String raiseUserQuery(@RequestBody String requiredDetailsJSON) throws JsonGenerationException, JsonMappingException, IOException{
		logger.info("IN HomeController --> raiseUserQuery()");
		HashMap<String, Object> responseMap = new HashMap<String, Object>();
		ObjectMapper objectMapper = new ObjectMapper();
		String responseString = "";
		try{
			HashMap<String, Object> requiredDetailsMap = new HashMap<String, Object>();
			requiredDetailsMap = objectMapper.readValue(requiredDetailsJSON, HashMap.class);
			String name = (String) requiredDetailsMap.get("name");
			String email = (String) requiredDetailsMap.get("email");
			String querySubject = (String) requiredDetailsMap.get("subject");
			String queryMsg = (String) requiredDetailsMap.get("query");
			
			if( CommonHelper.isEmptyString(name) || CommonHelper.isEmptyString(email) || CommonHelper.isEmptyString(querySubject) || CommonHelper.isEmptyString(queryMsg) ){
				responseMap.put(CommonHelper.strSuccess, CommonHelper.blnfalse);
				responseMap.put(CommonHelper.strMessage, "Required details are empty!");
			}else{
				String subject = "CodeZoo - User has Raised query";
				String textBody = "Hi, John \n"+ email +" has raised a query. Here is the query details.\n Subject : " + querySubject + "\n Message : " + queryMsg;
				CommonHelper.sendMailQueueHelper( CommonHelper.supportMailAddress, "mjohnbrittobics@gmail.com", "", "", subject, "", textBody, CommonHelper.supportMailAddress, "", "");
				subject = "CodeZoo - Thanks for reaching to us";
				textBody = "Hello, " + name + "\n Thanks for contacing us. We'll get back to you soon. :)";
				CommonHelper.sendMailQueueHelper(CommonHelper.supportMailAddress, email, "", "", subject, "", textBody, CommonHelper.supportMailAddress, "", "");
				responseMap.put(CommonHelper.strSuccess, CommonHelper.blntrue);
				responseMap.put(CommonHelper.strMessage, "Successfully posted the query!");
			}
			
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Exception occurred :: " + e.getMessage());
			responseMap.put(CommonHelper.strSuccess, CommonHelper.blnfalse);
			responseMap.put(CommonHelper.strMessage, "Something went wrong, Please retry!");
		}
		responseString = objectMapper.writeValueAsString(responseMap);
		logger.info("OUT HomeController --> raiseUserQuery()");
		return responseString;
	}
	
	@RequestMapping( value = "/updateAllUsersDetails")
	public static void updateAllUsersDetails(){
		try{
			List<UsersJDO> lstUsersJDO = UsersDAO.getAllUsersOfCodeZoo();
			if( lstUsersJDO != null && lstUsersJDO.size()>0 ){
				logger.info("There are " + lstUsersJDO.size() + " users are available.");
				for( int index=0; index< lstUsersJDO.size(); index++ ){
					if( CommonHelper.adminEmailID.equalsIgnoreCase(lstUsersJDO.get(index).getEmailID()) ){
						lstUsersJDO.get(index).setRole(CommonHelper.userRoleAdmin);
					}else{
						lstUsersJDO.get(index).setRole(CommonHelper.userRoleUser);
					}
					UsersDAO.saveUsersJDO(lstUsersJDO.get(index));
				}
			}else{
				logger.info("No users available");
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Exception occurred :: " + e.getMessage());
		}
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping( value = "/changePasswordRequest", method = {RequestMethod.POST,RequestMethod.GET})
	public static @ResponseBody String changePasswordRequest(HttpServletRequest request, @RequestBody String requiredDetailsJSON){
		String responseString = "";
		try{
			HashMap<String, Object> responseMap = new HashMap<String, Object>();
			ObjectMapper objectMapper = new ObjectMapper();
			HashMap<String, Object> requiredDetailsMap = objectMapper.readValue(requiredDetailsJSON, HashMap.class);
			String userEmailID = (String) requiredDetailsMap.get("userEmail");
			logger.info("\n Password change request came for :: " + userEmailID);
			if(!CommonHelper.isEmptyString(userEmailID)){
				responseMap = HomeHelper.changePasswordRequest(userEmailID);
			}else{
				responseMap.put(CommonHelper.strSuccess, false);
				responseMap.put(CommonHelper.strMessage, "Required Details are EMPTY!");
			}
			responseString = objectMapper.writeValueAsString(responseMap);
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Exception occurred :: " + e.getMessage());
		}
		logger.info("\n Response to be retured is :: " + responseString);
		return responseString;
	}

	@RequestMapping( value = "/resetPassword", method = {RequestMethod.POST,RequestMethod.GET})
	public static String resetPasswordRequest(HttpServletRequest request){
		logger.info("IN HomeController -> resetPasswordRequest()");
		try{
			String requestKey = "";
			if( request.getParameter("requestKey") != null && request.getParameter("requestKey") != ""){
				requestKey = (String) request.getParameter("requestKey");
			}
			logger.info("\n requestKey :: " + requestKey);
			
			HomeHelper.authorizeToResetPassword(request, requestKey); 
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Exception occurred :: " + e.getMessage());
		}
		logger.info("OUT HomeController -> resetPasswordRequest()");
		return CommonHelper.strViewResetPassword;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/updatePassword", method={RequestMethod.POST})
	public static @ResponseBody String updatePassword(HttpServletRequest request, @RequestBody String requiredDetailsJSON){
		logger.info("IN HomeControler -> updatePassword()");
		String response2BReturn = "";
		try{
			ObjectMapper objectMapper = new ObjectMapper();
			HashMap<String, String> requiredDetailsMap = objectMapper.readValue(requiredDetailsJSON, HashMap.class);
			String userEmailID = "", password = "";
			userEmailID = (String) requiredDetailsMap.get("userEmailID");
			password = (String) requiredDetailsMap.get("password");
			
			HashMap<String, Object> responseMap = HomeHelper.updatePasswordHelper(userEmailID, password);
			response2BReturn = objectMapper.writeValueAsString(responseMap);
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Exception occurred :: " + e.getMessage());
		}
		logger.info("\n response2BReturn :: + " + response2BReturn + "\n OUT HomeControler -> updatePassword()");
		return response2BReturn;
	}
}
