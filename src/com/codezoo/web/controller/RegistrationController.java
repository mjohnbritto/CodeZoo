package com.codezoo.web.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.codezoo.Helper.CommonHelper;
import com.codezoo.web.helper.RegistrationHelper;


@Controller
@RequestMapping("/registration")
public class RegistrationController {
	private static final Logger logger = Logger.getLogger(RegistrationController.class.getName());
	
	@RequestMapping( value = "/registerNewUser", method = RequestMethod.POST )
	public @ResponseBody String registerNewUser( @RequestBody String reqRegDetailsJSON, HttpServletRequest request, HttpServletResponse response) throws JsonGenerationException, JsonMappingException, IOException{
		logger.info("IN RegistrationController -> registerNewUser()");
		
		HashMap<String, Object> responseMap = new HashMap<String, Object>();
		ObjectMapper objectMapper = new ObjectMapper();
		String responseString = "";
		logger.info("regReqDetails : " + reqRegDetailsJSON.toString());
		
		try{
			return RegistrationHelper.registerNewUser(reqRegDetailsJSON);
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Exception occurred : " + e.getMessage());
		}
		
		responseMap.put(CommonHelper.strSuccess, CommonHelper.blnfalse);
		responseMap.put(CommonHelper.strMessage, "Something went wrong, Please retry!");
		responseString = objectMapper.writeValueAsString(responseMap);
		logger.info("OUT RegistrationController -> registerNewUser()");
		return responseString;
	}
}
