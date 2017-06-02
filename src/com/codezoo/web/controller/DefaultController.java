package com.codezoo.web.controller;

import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.codezoo.Helper.CommonHelper;
import com.codezoo.data.JDO.UsersJDO;

@Controller
public class DefaultController {

	public static final Logger logger = Logger
			.getLogger(DefaultController.class.getName());

	@RequestMapping("/")
	public String redirectToHome(HttpServletRequest request,
			HttpServletResponse response) {
		logger.info("IN DefaultController -> redirectToHome()");

		try {
			UsersJDO loggedInUsersJDO = null;
			if (request.getSession().getAttribute("UsersJDO") != null) {
				loggedInUsersJDO = (UsersJDO) request.getSession()
						.getAttribute("UsersJDO");
			}
			if (loggedInUsersJDO != null
					&& !CommonHelper.isEmptyString(loggedInUsersJDO
							.getEmailID())) {
				logger.info("User is already signed in and emailID is = "
						+ loggedInUsersJDO.getEmailID()
						+ " , so landing to dashboard page. \n OUT DefaultController -> redirectToHome()");
				return CommonHelper.strViewDashboard;
			} else {
				logger.info("User is Not signed in so landing to home page. \n OUT DefaultController -> redirectToHome()");
				return CommonHelper.strViewHomePage;
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.severe("Exception occurred : " + e.getMessage());
		}

		logger.info("OUT DefaultController -> redirectToHome()");
		return CommonHelper.strViewHomePage;

	}

	@RequestMapping("/about")
	public String redirectToAbout(HttpServletRequest request,
			HttpServletResponse response) {
		logger.info("IN DefaultController -> redirectToAbout()");

		try {
			UsersJDO loggedInUsersJDO = null;
			if (request.getSession().getAttribute("UsersJDO") != null) {
				loggedInUsersJDO = (UsersJDO) request.getSession()
						.getAttribute("UsersJDO");
			}
			if (loggedInUsersJDO != null
					&& !CommonHelper.isEmptyString(loggedInUsersJDO
							.getEmailID())) {
				logger.info("User is already signed in and emailID is = "
						+ loggedInUsersJDO.getEmailID()
						+ " , so landing to dashboard page. \n OUT DefaultController -> redirectToAbout()");
				return CommonHelper.strViewDashboard;
			} else {
				logger.info("User is Not signed in so landing to home page. \n OUT DefaultController -> redirectToAbout()");
				return CommonHelper.strViewAboutPage;
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.severe("Exception occurred : " + e.getMessage());
		}

		logger.info("OUT DefaultController -> redirectToAbout()");
		return CommonHelper.strViewAboutPage;

	}

	@RequestMapping("/contact")
	public String redirectToContact(HttpServletRequest request,
			HttpServletResponse response) {
		logger.info("IN DefaultController -> redirectToContact()");

		try {
			UsersJDO loggedInUsersJDO = null;
			if (request.getSession().getAttribute("UsersJDO") != null) {
				loggedInUsersJDO = (UsersJDO) request.getSession()
						.getAttribute("UsersJDO");
			}
			if (loggedInUsersJDO != null
					&& !CommonHelper.isEmptyString(loggedInUsersJDO
							.getEmailID())) {
				logger.info("User is already signed in and emailID is = "
						+ loggedInUsersJDO.getEmailID()
						+ " , so landing to dashboard page. \n OUT DefaultController -> redirectToContact()");
				return CommonHelper.strViewDashboard;
			} else {
				logger.info("User is Not signed in so landing to home page. \n OUT DefaultController -> redirectToContact()");
				return CommonHelper.strViewContactPage;
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.severe("Exception occurred : " + e.getMessage());
		}

		logger.info("OUT DefaultController -> redirectToContact()");
		return CommonHelper.strViewContactPage;

	}

	@RequestMapping("/forum")
	public String redirectToForum(HttpServletRequest request,
			HttpServletResponse response) {
		logger.info("IN DefaultController -> redirectToForum()");

		try {
			UsersJDO loggedInUsersJDO = null;
			if (request.getSession().getAttribute("UsersJDO") != null) {
				loggedInUsersJDO = (UsersJDO) request.getSession()
						.getAttribute("UsersJDO");
			}
			if (loggedInUsersJDO != null
					&& !CommonHelper.isEmptyString(loggedInUsersJDO
							.getEmailID())) {
				logger.info("User is already signed in and emailID is = "
						+ loggedInUsersJDO.getEmailID()
						+ " , so landing to forum page. \n OUT DefaultController -> redirectToForum()");
				return CommonHelper.strViewForumPage;
			} else {
				logger.info("User is Not signed in so landing to home page. \n OUT DefaultController -> redirectToForum()");
				return CommonHelper.strViewHomePage;
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.severe("Exception occurred : " + e.getMessage());
		}

		logger.info("OUT DefaultController -> redirectToForum()");
		return CommonHelper.strViewHomePage;

	}

}
