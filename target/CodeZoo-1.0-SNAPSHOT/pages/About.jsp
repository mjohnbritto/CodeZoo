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
      <link href="/bootstrap/css/bootstrap.min.css" rel="stylesheet">
      <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
      <link href="/assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet">
      <!-- Custom styles for this template -->
      <link href="/css/custom/carousel.css" rel="stylesheet">
      <link href="/css/custom/signin.css" rel="stylesheet">
      <link href="/css/styles.css" rel="stylesheet">
      <link href="/font-awesome/css/font-awesome.min.css" rel="stylesheet">
      
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
                  <li><a href="/">Home</a></li>
                  <li class="active"><a href="/about">About</a></li>
                  <li><a href="/contact">Contact</a></li>
               </ul>
               <ul class="nav navbar-nav navbar-right">
                  <li><button type="button" id="signin-option" class="btn btn-primary signin-option" > LogIn </button></li>
                  <li><button type="button" id="signup-option" class="btn btn-primary signup-option" > Sign Up </button></li>
               </ul>
            </div>
            <!-- .nav-collapse -->
         </div>
      </nav>
      
      
	<div class="container">
		<div class="page-header">
			<h1>About CodeZoo</h1>
		</div>
		<p class="lead">
			Learning management system(LMS), in general is a software application for the administration, documentation, tracking, reporting and delivery of electronic educational technology (also called e-learning) courses or training programs. Code-Zoo comes under the electronic educational technology of general Learning Management System that is e-learning. To be specific This software application mainly focuses on reaching the school/college students of computer science department. The Code-Zoo application functions in the following way, This application provides an interface for self learning where the learners will learn programming concepts by themselves and then it contains a self evaluating tool where the learners rate themselves once they complete a particular course and the other feature of this application is forum, where in if the learner has any doubts they can post a question and it will be answered by other users.
		</p>
		<p class="lead">
			Code-Zoo, provides an effective self learning environment for the learners to learn the programming concepts like searching, sorting, etc... of various programming languages. As this system provides a self evaluating tool to analyse the individual’s performance, It will encourage the students. and this has a forum where anybody can post their doubts and it will be answered by others in this the knowledge can be shared. So I hope this application software will be very useful for the students. It also helps the students to enhance their understanding level in programming concepts.
		</p>
		<p class="lead">
			Here are some previews of Simulators:
			<h3>Linear Search</h1>
			<div> 
				<center>
					<img src="/Images/simulations/linearSearch.gif" alt="linear search" width="500" height="200" />
				</center>
			</div>
			<h3>Quick Sort</h1>
			<div>
				<center>
					<img src="/Images/simulations/quickSort.gif" alt="quick sort" width="500" height="200" />
				</center>
			</div>
		</p>
		<p class="lead" style="white-space:pre;">
		</p>
	</div>
    
      <div class="container marketing">
         <footer>
            <p class="pull-right"><a href="#">Back to top</a></p>
            <p>&copy; 2025 Joe Stephy Leena &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
         </footer>
      </div>
      <!-- /.container -->



<!-- Modals -->
	
		<!-- signin modal starts here-->
		<div id="signin-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		   <div class="modal-dialog" role="document">
		      <div class="modal-content">
		         <div class="modal-header">
		            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		            <h4 class="modal-title" id="myModalLabel">CodeZoo - LogIn</h4>
		         </div>
		         <div class="modal-body">
		         	<p class="errorStatus" id="signin-error" style="display:none;"> error </p>
		            <form class="form-signin">
		               <h2 class="form-signin-heading">Please login</h2>
		               <!-- <label for="inputEmail" class="sr-only">Email address</label> -->
		               <input type="email" id="signin-Email" class="form-control" placeholder="Email address" required autofocus>
		               <!-- <label for="inputPassword" class="sr-only">Password</label> -->
		               <input type="password" id="signin-Password" class="form-control" placeholder="Password" required>
		               <div class="checkbox">
		                  <label>
		                  <input id="remember-me" type="checkbox" value="remember-me"> Remember me
		                  </label>
		                  <span class="frgt-passwd"> 
		                 	<a id="frgtpasswd-option">Forgot password?</a>
		                  </span>
		               </div>
		               <button class="btn btn-lg btn-primary btn-block"  id="signin-btn" type="button">Sign in <span style="display:none;"> <i class="fa fa-spinner fa-spin"></i> </span> </button>
		            </form>
		         </div>
		      </div>
		   </div>
		</div>
		<!-- signin modal ends here-->
	
		<!-- signup modal starts here-->
		<div id="signup-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		   <div class="modal-dialog" role="document">
		      <div class="modal-content">
		         <div class="modal-header">
		            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		            <h4 class="modal-title" id="myModalLabel">CodeZoo - SignUp</h4>
		         </div>
		         <div class="modal-body">
		            <p class="errorStatus" id="signup-error" style="display:none;"> error </p>
		            <form class="form-group">
		               <div class="form-group">
		                  <input type="text" id="signup-Name" class="form-control" placeholder="Name" style="width: 60%; margin-left: 20%;" autofocus>
		               </div>
		               <div class="form-group">
		                  <input type="email" id="signup-Email" class="form-control" placeholder="Email address" style="width: 60%; margin-left: 20%;">
		               </div>
		               <div class="form-group">
		                  <input type="password" id="signup-Password" class="form-control" placeholder="Password" style="width: 60%; margin-left: 20%;">
		               </div>
		               <div class="form-group">
		                  <!-- <input type="text" id="signup-Address" class="form-control" placeholder="Address" required> -->
		                  <textarea class="form-control" id="signup-Address" placeholder="Address" style="margin: 0px -6px 0px 20%; height: 77px; width: 60%;" autocomplete="off"></textarea>
		               </div>
		            </form>
		         </div>
		         <div class="modal-footer">
		            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		            <button type="button" id="signup-btn" class="btn btn-primary">Sign Up <span style="display:none;"> <i class="fa fa-spinner fa-spin"></i> </span></button>
		         </div>
		      </div>
		   </div>
		</div>
		<!-- signup modal ends here-->
			
		<!-- Sign up success modal starts here -->
		<div id = "common-success-modal" class="modal fade" tabindex="-1" role="dialog">
		   <div class="modal-dialog">
		      <div class="modal-content">
		         <div class="modal-header">
		            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		            <h4 class="modal-title">Modal title</h4>
		         </div>
		         <div class="modal-body">
		            <p>One fine body&hellip;</p>
		         </div>
		         <!-- <div class="modal-footer">
		            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		            <button type="button" class="btn btn-primary">Save changes</button>
		         </div> -->
		      </div>
		      <!-- /.modal-content -->
		   </div>
		   <!-- /.modal-dialog -->
		</div>
		<!-- Sign up success modal ends here -->
		
		<!-- Forgot password modal starts here-->
		<div id="frgtpasswd-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		   <div class="modal-dialog" role="document">
		      <div class="modal-content">
		         <div class="modal-header">
		            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		            <h4 class="modal-title" id="myModalLabel">CodeZoo - Forgot Password</h4>
		         </div>
		         <div class="modal-body">
		         	<p class="errorStatus" id="frgtpasswd-error" style="display:none;"> error </p>
		         	<p class="successStatus" id="frgtpasswd-confirmation" style="display:none;">Please check your registered email inbox and proceed further to change your password.</p>
		            <form class="form-signin">
		               <input type="email" id="frgtpasswd-Email" class="form-control" placeholder="Email address" required autofocus>
		               <button class="btn btn-lg btn-primary btn-block"  id="frgtpasswd-btn" type="button">Forgot Password<span style="display:none;"> <i class="fa fa-spinner fa-spin"></i> </span> </button>
		            </form>
		         </div>
		         <div class="modal-footer">
		         	<button type="button" id="back-to-signin" class="btn btn-primary">Back to Sign</button>
		         </div>
		      </div>
		   </div>
		</div>
		<!-- Forgot password modal ends here-->
		
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
    <script type="text/javascript" src="/js/common.js"> </script>
  </body>
</html>
