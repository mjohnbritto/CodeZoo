package com.codezoo.Helper;

import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.util.logging.Logger;

import com.google.appengine.api.mail.MailService;
import com.google.appengine.api.mail.MailService.Attachment;
import com.google.appengine.api.mail.MailServiceFactory;
import com.google.appengine.api.utils.SystemProperty;
import com.google.apphosting.api.ApiProxy;
//import com.google.appengine.api.utils.SystemProperty.Environment;

public class CommonHelper {

	public static Logger logger = Logger.getLogger(CommonHelper.class.getName());
	
	private static String appId = ApiProxy.getCurrentEnvironment().getAppId();
	private static String appUrl = "";
	private static SystemProperty.Environment.Value environment = SystemProperty.environment.value();
	static{
		logger.info("appId :: " + appId);
		if( environment == SystemProperty.Environment.Value.Development ){
			appUrl = "http://localhost:8080";
		}else if( environment == SystemProperty.Environment.Value.Production ){
			appUrl = "http://codezoo-dashboard.appspot.com";
		}
	}
	
	public static String getAppUrl(){
		return appUrl;
	}
	
	public static String getAppId(){
		return appId;
	}
	
	
	public static String strMessage = "message";
	public static String strSuccess = "success";
	public static String strIsUserExist = "isUserExist";
	public static boolean blntrue = true;
	public static boolean blnfalse = false;
	public static String userRoleUser = "user";
	public static String userRoleAdmin = "admin";
	public static String adminEmailID = "mjohnbrittobics@gmail.com";
	public static long resetPasswordLinkExpiryTime = 7200000l;
	
	//user support mail
	public static final String supportMailAddress = "userhelp.codezoo@gmail.com";

	// ViewNames
	public static String strViewHomePage = "HomePage";
	public static String strViewDashboard = "Dashboard";
	public static String strViewAboutPage = "About";
	public static String strViewContactPage = "Contact";
	public static String strViewForumPage = "Forum";
	public static String strViewResetPassword = "ResetPassword";

	public static boolean isEmptyString(String str) {
		str = str.trim();
		if (str != null && !"".equalsIgnoreCase(str)
				&& !"null".equalsIgnoreCase(str) && str.length() > 0) {
			return false;
		} else {
			return true;
		}
	}

	public static String encryptPassword(String password)
			throws UnsupportedEncodingException {
		String encryptedpasswrd = "";
		byte[] encryptedBytes;
		try {

			MessageDigest algorithm = MessageDigest.getInstance("SHA-256");
			algorithm.reset();
			algorithm.update(password.getBytes("UTF-8"));
			encryptedBytes = algorithm.digest();

			encryptedpasswrd = String.format("%064x", new BigInteger(1,
					encryptedBytes));
		} catch (Exception e) {
			logger.severe("Exception occured while encrypting the password::"
					+ e.getMessage());
			e.printStackTrace();
		}
		return encryptedpasswrd;
	}
	
	public static void sendMailQueueHelper(String sender, String recepient, String Cc, String Bcc, String subject,
			String htmlBody, String textBody, String replyTo, String fileName, String attachment) {

		logger.info("In CommonHelper -> sendMailQueueHelper");
		try {
			logger.info("\nSender:::::::::::::" + sender + "\nReceiver:::::::::::" + recepient + "\nCc:::::::::::::::::"
					+ Cc + "\nBcc:::::::::::::::::" + Bcc + "\nSubject::::::::::::" + subject + "\nhtmlBody::::::::::::"
					+ htmlBody + "\n textBody:::::::::::" + textBody + "\n replyTo::::::::" + replyTo
					+ "\n fileName:::::::::::" + fileName + "\n attachment:::::::::" + attachment);

			MailService mailService = MailServiceFactory.getMailService();
			MailService.Message message = new MailService.Message();

			message.setSender(sender);
			message.setTo(recepient);
			if (!(CommonHelper.isEmptyString(Cc))) {
				message.setCc(Cc);
			}
			if (!(CommonHelper.isEmptyString(Bcc))) {
				message.setBcc(Bcc);
			}
			if (!(CommonHelper.isEmptyString(replyTo))) {
				message.setReplyTo(replyTo);
			}
			message.setSubject(subject);
			if (!CommonHelper.isEmptyString(htmlBody)) {
				message.setHtmlBody(htmlBody);
			}
			if (!CommonHelper.isEmptyString(textBody)) {
				message.setTextBody(textBody);
			}
			if (!CommonHelper.isEmptyString(fileName) && !CommonHelper.isEmptyString(attachment)) {
				byte[] attachmentData = attachment.getBytes();
				Attachment attachmentObject = new Attachment(fileName, attachmentData);
				message.setAttachments(attachmentObject);
				logger.info("attachment is not empty so attaching it");
			} else {
				logger.info("attachment is empty so not attaching it");
			}

			mailService.send(message);

			logger.info("Here the Mail has been sent, \n OUT  CommonHelper -> sendMailQueueHelper");
		} catch (Exception e) {
			e.printStackTrace();
			logger.severe("An error has occured while sending mail IN CommonHelper -> sendMailQueueHelper : "
					+ e.getMessage());
		}
	}
	
}
