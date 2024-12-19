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
                  <li id="nav-Home" class="active"><a href="/">Home</a></li>
                  
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
                  
                  <li><a href="/forum">Forum</a></li>
               </ul>
               <ul class="nav navbar-nav navbar-right">
                  <li id="username" class="welcome"></li>
                  <li><button type="button" id="signout-btn" class="btn btn-primary signout-option" > Log Out <span style="display:none;"> <i class="fa fa-spinner fa-spin"></i> </span> </button></li>
               </ul>
            </div>
            <!-- .nav-collapse -->
         </div>
      </nav>
      
      
      
      
      
      <!-- Carousel
         ================================================== -->
      <div id="myCarousel" class="carousel slide" data-ride="carousel" style="margin-top: 51px;">
         <!-- Indicators -->
         <ol class="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
            <li data-target="#myCarousel" data-slide-to="3"></li>
         </ol>
         <div class="carousel-inner" role="listbox">
            <div class="item active">
               <img class="first-slide" src="/Images/banner/banner1.jpg" alt="First slide">
               <!-- <div class="container">
                  <div class="carousel-caption">
                     <p style="margin-bottom: 1%; margin-left: -6.5%;"><a class="btn btn-lg btn-primary" id="sign-up-today" role="button">Sign up today</a></p>
                  </div>
               </div> -->
            </div>
            <div class="item">
               <img class="second-slide" src="/Images/banner/banner2.jpg" alt="Second slide">
            </div>
            <div class="item">
               <img class="third-slide" src="/Images/banner/banner3.jpg" alt="Third slide">
            </div>
            <div class="item">
               <img class="third-slide" src="/Images/banner/banner4.jpg" alt="Fourth slide">
            </div>
         </div>
         <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
         <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
         <span class="sr-only">Previous</span>
         </a>
         <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
         <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
         <span class="sr-only">Next</span>
         </a>
      </div>
      <!-- /.carousel -->
      <!-- Marketing messaging and featurettes
         ================================================== -->
      <!-- Wrap the rest of the page in another container to center all the content. -->
      <div class="container marketing">
         <!-- Three columns of text below the carousel -->
         <div class="row">
            <div class="col-lg-4">
               <img class="img-circle" src="/Images/marketing/simulator.gif" alt="Simulator" width="140" height="140">
               <h2>Simulator</h2>
               <p>This module simulates the programming concepts visually based on the user’s given input with which the learners can easily understand the programming concepts clearly.</p>
            </div>
            <div class="col-lg-4">
               <img class="img-circle" src="/Images/marketing/performanceAnalyser.png" alt="Performance Analyser" width="170" height="140">
               <h2>Performance Analyser</h2>
               <p>Performance analyser is the tool to analyse the performance of the learner by allowing them to attend a online test, once they have completed learning a particular programming concept.</p>
            </div>
            <div class="col-lg-4">
               <img class="img-circle" src="/Images/marketing/forum.png" alt="Forum" width="140" height="140">
               <h2>Forum</h2>
               <p>This module lets the user to share their knowledge with others or to say, It lets you help others. This is a forum, this is open to all, anybody can post their doubts and queries here which will be answered by other users of CODE-ZOO.</p>
            </div>
            <!-- /.col-lg-4 -->
         </div>
         <!-- /.row -->
         <!-- START THE FEATURETTES -->
         <hr class="featurette-divider">
         <div class="row featurette">
            <div class="col-md-7">
               <h2 class="featurette-heading">Data Structure Simulations. <span class="text-muted">It'll blow your mind.</span></h2>
               <p class="lead">Data Structures in any progamming longuages remains bit complicated for the learners. CodeZoo has put and effort to make it simple and cool with detailed explained simulations of the Data structres. Hope you will like it. Get Started and explore it.</p>
            </div>
            <div class="col-md-5">
               <img class="featurette-image img-responsive center-block" alt="Generic placeholder image" src="/Images/feature/ds.png">
            </div>
         </div>
         <hr class="featurette-divider">
         <div class="row featurette">
            <div class="col-md-7 col-md-push-5">
               <h2 class="featurette-heading">Online Test. <span class="text-muted">See for yourself.</span></h2>
               <p class="lead">Online test is an amazing opportunity for you to analyze your growth. In the current era we have lot of sites which offers a course and provide you tests to take you to the next level of the course, So Try Now and get addicted to learn.</p>
            </div>
            <div class="col-md-5 col-md-pull-7">
               <img class="featurette-image img-responsive center-block" alt="Generic placeholder image" src="/Images/feature/test.jpg">
            </div>
         </div>
         <hr class="featurette-divider">
         <div class="row featurette">
            <div class="col-md-7">
               <h2 class="featurette-heading">Learn to Teach, Learn by Teach. <span class="text-muted">Checkmate.</span></h2>
               <p class="lead">The knowledge whatever we have is not to be kept aside but to be shared. Here we provide you a great opportunity to share your knowledge with people across the world, Remember in a way you do help others. Take you turn and Help Now.</p>
            </div>
            <div class="col-md-5">
               <img class="featurette-image img-responsive center-block" alt="Generic placeholder image" src="/Images/feature/share.png">
            </div>
         </div>
         <hr class="featurette-divider">
         <!-- /END THE FEATURETTES -->
         <!-- FOOTER -->
        <footer>
            <p class="pull-right"><a href="#">Back to top</a></p>
            <p>&copy; 2024 Joe Stephy Leena &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
         </footer>
       
      </div>
      <!-- /.container -->
      
      
      
      
      
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
  </body>
</html>
