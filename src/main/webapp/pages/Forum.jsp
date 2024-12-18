<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
   <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="description" content="">
      <meta name="author" content="">
      <link rel="icon" href="../../favicon.ico">
      <title>CodeZoo - Online Learn Programming Tool</title>
      <!-- Bootstrap core CSS -->
      <link href="/bootstrap/css/bootstrap.css" rel="stylesheet">
      <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
      <link href="/assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet">
      <!-- Custom styles for this template -->
      <link href="/css/custom/carousel.css" rel="stylesheet">
      <link href="/css/styles.css" rel="stylesheet">
      <link href="/font-awesome/css/font-awesome.min.css" rel="stylesheet">
      
      <%@ page 
      		import="com.codezoo.data.JDO.UsersJDO"
      %>
      <%
      		UsersJDO loggedInUsersJDO = (UsersJDO) session.getAttribute("UsersJDO");
      		String loggedInUserName = "";
      		if( loggedInUsersJDO != null ){
      			loggedInUserName = loggedInUsersJDO.getName();
      		}else{
      			response.sendRedirect("/");
      		}
      %>
      
   </head>
   <!-- NAVBAR
      ================================================== -->
   <div id="voice-box" style="display: none;">
      <p><span>Saving changes!</span></p>
   </div>
   <body>
      <nav class="navbar navbar-inverse navbar-fixed-top">
         <div class="container">
            <div class="navbar-header">
               <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
               <span class="sr-only">Toggle navigation</span>
               <span class="icon-bar"></span>
               <span class="icon-bar"></span>
               <span class="icon-bar"></span>
               </button>
               <img class="logo" src="/Images/logo.png" />
               <a class="navbar-brand">CodeZoo</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
               <ul class="nav navbar-nav">
                  <li id="nav-Home"><a href="/">Home</a></li>
                  
                  <li id="nav-Courses" class="dropdown">
                  	<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Simulator <span class="caret"></span></a>
	                <ul id="course-list" class="dropdown-menu">
						<li class="dropdown-submenu"><a href="#">Course</a>
							<ul class="dropdown-menu">
		                    	<li><a href="#">Concept</a></li>
	                     	</ul>
						</li>
	                </ul>
                  </li>
                  
                  <li id="nav-PerformanceAnalyzer" class="dropdown">
                  	<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Performance Analyzer <span class="caret"></span></a>
                  	<ul id="performanceAnalyzer-list" class="dropdown-menu">
						<li class="dropdown-submenu"><a href="#">Course</a>
							<ul class="dropdown-menu">
		                    	<li><a href="#">Concept</a></li>
	                     	</ul>
						</li>
	                </ul>
	               </li>
                  
                  <li class="active"><a href="/forum">Forum</a></li>
               </ul>
               <ul class="nav navbar-nav navbar-right">
                  <li id="username" class="welcome"></li>
                  <li><button type="button" id="signout-btn" class="btn btn-primary signout-option" > Log Out <span style="display:none;"> <i class="fa fa-spinner fa-spin"></i> </span> </button></li>
               </ul>
            </div>
            <!-- .nav-collapse -->
         </div>
      </nav>

	  <div class="container" style="margin-top: 55px;">
	  	<div class="sub-navbar">
			<button type="button" class="btn btn-primary btn-sm" id="all-questions">Questions</button>
			<button type="button" class="btn btn-primary btn-sm" id="ask-question" >Ask Question</button>
			<button type="button" class="btn btn-primary btn-sm" id="my-questions">My Questions</button>
		</div>
		
		<div class="newQuestion">
        	<textArea id="qstToPost" placeholder="Post your qeustion here"></textArea>
        	<div>
	        	<button type="button" class="btn btn-primary btn-sm btn-cancel">Cancel</button>
	        	<button type="button" class="btn btn-primary btn-sm btn-post" id="qstPost-btn">Post <span style="display:none;"> <i class="fa fa-spinner fa-spin"></i> </span> </button>
	        </div>
		</div>
		
		<div class="forum-questions" id="forum-questions">
	        <!-- <div class="singleQuestion">
	        	As a heads up, the navbar component is rather tricky here in that the styles for displaying it are rather specific and detailed. Overrides to ensure desktop styles display are not as performant or sleek as one would like. Just be aware there may be potential gotchas as you build on top of this example when using the navbar.
				<div class="asked-by">
					<span>asked at 21 Feb 2016</span> <br>
					<span> <a href="mailto:john.britto@a-cti.com">John Britto</a> </span>
				</div>
				<div class="answers">	        
		        	<div class="singleAnswer">
		        		This is first answer.
		        		<div class="answered-by">
							<span>answered at 21 Feb 2016</span> <br>
							<span> <a href="mailto:john.britto@a-cti.com">John Britto</a> </span>
						</div>
		        	</div>
		        </div>
		        <span> <button type="button" class="btn btn-primary btn-sm answer-now">Answer Now</button> </span>
		        <div class="newAnswer">
		        	<textArea placeholder="Share your answer, Help others."></textArea>
		        	<div>
			        	<button type="button" class="btn btn-primary btn-sm btn-cancel">Cancel</button>
			        	<button type="button" class="btn btn-primary btn-sm btn-save">Save <span style="display:none;"> <i class="fa fa-spinner fa-spin"></i> </span> </button>
			        </div>
		        </div>
	        </div> -->
	        
	    </div>
		
		
	  </div>



      <%@ include file="/pages/algorithm/SwapModal.jsp" %>
      <%@ include file="/pages/algorithm/FibonacciModal.jsp" %>
      <%@ include file="/pages/algorithm/TriangularModal.jsp" %>
      <%@ include file="/pages/algorithm/SearchModal.jsp" %>
      <%@ include file="/pages/algorithm/SortModal.jsp" %>
      <%@ include file="/pages/PerformanceAnalyzer.jsp" %>
      
     
     
    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="/js/jquery/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery.min.js"><\/script>')</script>
    <script src="/bootstrap/js/bootstrap.min.js"></script>
    <!-- Just to make our placeholder images work. Don't actually copy the next line! -->
    <script src="/assets/js/holder.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="/assets/js/ie10-viewport-bug-workaround.js"></script>

	<script type="text/javascript" src="/js/HomePage.js"> </script>
	<script type="text/javascript" src="/js/DashBoard.js"> </script>
    <script type="text/javascript" src="/js/common.js"> </script>
    
    <script type="text/javascript" src="/js/algorithm/swap.js"> </script>
    <script type="text/javascript" src="/js/algorithm/fibonacci.js"> </script>
    <script type="text/javascript" src="/js/algorithm/triangular.js"> </script>
    <script type="text/javascript" src="/js/algorithm/search.js"> </script>
    <script type="text/javascript" src="/js/algorithm/sort.js"> </script>
    
    <script type="text/javascript" src="/js/performanceAnalyzer.js"> </script>
    
    <script type="text/javascript" src="/js/forum.js"> </script>
  </body>
</html>
