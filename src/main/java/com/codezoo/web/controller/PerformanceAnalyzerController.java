package com.codezoo.web.controller;

import java.util.HashMap;
import java.util.logging.Logger;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.codezoo.Helper.CommonHelper;
import com.codezoo.web.helper.PerformanceAnalyzerHelper;

@Controller
@RequestMapping(value = "/Performace")
public class PerformanceAnalyzerController {
	public static Logger logger = Logger
			.getLogger(PerformanceAnalyzerController.class.getName());

	@RequestMapping(value = "/getAllQuestionsForQuiz", method = RequestMethod.POST)
	public static @ResponseBody HashMap<String, Object> getAllQuestionsForQuiz(
			@RequestBody String requiredDetailsJSON) {
		logger.info("IN PerformanceAnalyzerController --> getAllQuestionsForQuiz()");
		HashMap<String, Object> responseMap2BeSent = new HashMap<String, Object>();
		try {
			return PerformanceAnalyzerHelper
					.getAllQuestionsForQuiz(requiredDetailsJSON);
		} catch (Exception e) {
			e.printStackTrace();
			logger.severe("Exception occurred :: " + e.getMessage());
			responseMap2BeSent.put(CommonHelper.strSuccess,
					CommonHelper.blnfalse);
		}
		logger.info("OUT PerformanceAnalyzerController --> getAllQuestionsForQuiz()");
		return responseMap2BeSent;
	}
	
	@RequestMapping( value = "/savePerformanceDetails" )
	public static @ResponseBody HashMap<String, Object> savePerformanceDetails(@RequestBody String requiredDetailsJSON){
		logger.info("IN PerformanceAnalyzerController --> savePerformanceDetails()");
		HashMap<String, Object> responseMap2BeSent = new HashMap<String, Object>();
		try{
			return PerformanceAnalyzerHelper.savePerformanceDetails(requiredDetailsJSON);
		}catch(Exception e){
			e.printStackTrace();
			logger.severe("Eception occured :: " + e.getMessage());
			responseMap2BeSent.put(CommonHelper.strSuccess, CommonHelper.blnfalse);
		}
		logger.info("OUT PerformanceAnalyzerController --> savePerformanceDetails()");
		return responseMap2BeSent;
	}
	
	@RequestMapping(value = "/getScoresForUser", method = RequestMethod.POST)
	public static @ResponseBody HashMap<String, Object> getScoresForUser(@RequestBody String requiredDetailsJSON) {
		logger.info("IN PerformanceAnalyzerController --> getScoresForUser()");
		HashMap<String, Object> responseMap2BeSent = new HashMap<String, Object>();
		try {
			return PerformanceAnalyzerHelper.getScoresForUser(requiredDetailsJSON);
		} catch (Exception e) {
			e.printStackTrace();
			logger.severe("Exception occurred :: " + e.getMessage());
			responseMap2BeSent.put(CommonHelper.strSuccess, CommonHelper.blnfalse);
		}
		logger.info("OUT PerformanceAnalyzerController --> getScoresForUser()");
		return responseMap2BeSent;
	}
}