<%@page import="com.codezoo.data.DAO.ConceptsDAO"%>
<%@page import="com.codezoo.Helper.UUIDGenerator"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>

<%@page 
	import="com.codezoo.data.JDO.CourseJDO"
	import="com.codezoo.data.DAO.CourseDAO"
	import="com.codezoo.data.JDO.ConceptsJDO"
	import="com.codezoo.data.DAO.ConceptsDAO"
%>

<%
	CourseJDO objCourseJDO = new CourseJDO();

	objCourseJDO.setCourseID("cr_001");
	objCourseJDO.setCourseName("Basic Algorithms");
	CourseDAO.saveCourseJDO(objCourseJDO);
	
	objCourseJDO.setCourseID("cr_002");
	objCourseJDO.setCourseName("Data Structures");
	CourseDAO.saveCourseJDO(objCourseJDO);
	
	ConceptsJDO objConceptsJDO = new ConceptsJDO();
	
	objConceptsJDO.setConceptID("cp_001");
	objConceptsJDO.setConceptName("Swap");
	objConceptsJDO.setCourseID("cr_001");
	ConceptsDAO.saveConceptsJDO(objConceptsJDO);
	
	objConceptsJDO.setConceptID("cp_002");
	objConceptsJDO.setConceptName("Fibonacci Series");
	objConceptsJDO.setCourseID("cr_001");
	ConceptsDAO.saveConceptsJDO(objConceptsJDO);
	
	objConceptsJDO.setConceptID("cp_003");
	objConceptsJDO.setConceptName("Triangular Series");
	objConceptsJDO.setCourseID("cr_001");
	ConceptsDAO.saveConceptsJDO(objConceptsJDO);
	
	
	objConceptsJDO.setConceptID("cp_004");
	objConceptsJDO.setConceptName("Sort");
	objConceptsJDO.setCourseID("cr_002");
	ConceptsDAO.saveConceptsJDO(objConceptsJDO);
	
	objConceptsJDO.setConceptID("cp_005");
	objConceptsJDO.setConceptName("Search");
	objConceptsJDO.setCourseID("cr_002");
	ConceptsDAO.saveConceptsJDO(objConceptsJDO);
	
	System.out.println( "" + CourseDAO.getAllCourseJDO().toString() );
	System.out.println( "" + ConceptsDAO.getAllConceptsJDO().toString() );
	
%>

</head>
<body>
	Values are persisted
</body>
</html>