package com.codezoo.web.controller;

import java.util.HashMap;
import java.util.logging.Logger;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.codezoo.Helper.CommonHelper;
import com.codezoo.web.helper.ForumHelper;

import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping( value="/forum" )
public class ForumController{
	public static Logger logger = Logger.getLogger(ForumController.class.getName());
	
	@RequestMapping( value="/postNewQuestion", method = RequestMethod.POST )
	public @ResponseBody HashMap<String, Object> postNewQuestion(@RequestBody String requiredDetailsJson){
		logger.info("IN ForumController --> postNewQuestion()");
		HashMap<String, Object> responseMap = new HashMap<String, Object>();
		try{
			return ForumHelper.postNewQuestion(requiredDetailsJson);
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Exception occurred :: " + e.getMessage());
			responseMap.put(CommonHelper.strSuccess, CommonHelper.blnfalse);
		}
		logger.info("OUT ForumController --> postNewQuestion()");
		return responseMap;
	}
	
	@RequestMapping( value="/saveNewAnswer", method = RequestMethod.POST )
	public @ResponseBody HashMap<String, Object> saveNewAnswer(@RequestBody String requiredDetailsJson){
		logger.info("IN ForumController --> saveNewAnswer()");
		HashMap<String, Object> responseMap = new HashMap<String, Object>();
		try{
			return ForumHelper.saveNewAnswer(requiredDetailsJson);
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Exception occurred :: " + e.getMessage());
			responseMap.put(CommonHelper.strSuccess, CommonHelper.blnfalse);
		}
		logger.info("OUT ForumController --> saveNewAnswer()");
		return responseMap;
	}
	
	@RequestMapping( value="/getForumQueriesList", method = RequestMethod.POST )
	public @ResponseBody HashMap<String, Object> getForumQueriesList(@RequestBody String requiredDetailsJson){
		logger.info("IN ForumController --> getForumQueriesList() \n requiredDetailsJson :: " + requiredDetailsJson);
		HashMap<String, Object> responseMap = new HashMap<String, Object>();
		try{
			return ForumHelper.getForumQueriesList(requiredDetailsJson);
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Exception occurred :: " + e.getMessage());
			responseMap.put(CommonHelper.strSuccess, CommonHelper.blnfalse);
		}
		logger.info("OUT ForumController --> getForumQueriesList()");
		return responseMap;
	}
	
	@RequestMapping( value="/getAllUsersDetails", method=RequestMethod.POST)
	public @ResponseBody HashMap<String, Object> getAllUsersDetailsMap(){
		logger.info("IN ForumController --> getAllUsersDetailsMap()");
		HashMap<String, Object> responseMap = new HashMap<String, Object>();
		try{
			HashMap<String, Object> allUsersMap = ForumHelper.getAllUsersDetailsMap();
			responseMap.put(CommonHelper.strSuccess, CommonHelper.blntrue);
			responseMap.put("allUsersMap", allUsersMap);
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Exception occurred :: " + e.getMessage());
			responseMap.put(CommonHelper.strSuccess, CommonHelper.blnfalse);
		}
		logger.info("Result to returned from controller :: " + responseMap.toString() + " \n OUT ForumController --> getAllUsersDetailsMap()");
		return responseMap;
	}
	
	@RequestMapping(value="/downloadCSV")
	public void downloadCSV(HttpServletResponse response){
		try{
			response.setContentType("text/csv");
			response.setHeader("Content-Disposition", "attachment; filename=\"sample.csv\"");
			StringBuffer strbuf = new StringBuffer();
			strbuf.append("Name,Age");
			strbuf.append("\nJohn,22");
			strbuf.append("\nBritto,21");
			response.getOutputStream().write( String.valueOf(strbuf).getBytes() );
		}catch(Exception e){
			e.printStackTrace();
		}
	}
}