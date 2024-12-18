<html>
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
		<link href="/css/custom/carousel.css" rel="stylesheet"><link href="/css/custom/signin.css" rel="stylesheet">
		<link href="/css/styles.css" rel="stylesheet">
		<link href="/font-awesome/css/font-awesome.min.css" rel="stylesheet">
		
		<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
    	<%@ page
			import="java.util.HashMap"
		%>

		<%
    		String resetPasswordDetailsMap = (String) request.getSession().getAttribute("resetPasswordDetailsJSON");
  		%>
    </head>
	<body>
		
		<!-- Change password modal starts here-->
		<div id="frgtpwd-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		   <div class="modal-dialog" role="document">
		      <div class="modal-content">
		         <div class="modal-header">
		            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		            <h4 class="modal-title" id="myModalLabel">CodeZoo - Reset Password</h4>
		         </div>
		         <div class="modal-body">
		         	<p id="passwdReset-success" style="text-align: center; display:none;"> success </p>
		         	<p class="errorStatus" id="passwdReset-error" style="display:none;"> error </p>
		            <form class="form-signin">
		               <input type="password" id="passwdReset-new-Password" class="form-control" placeholder="New Password" required>
		               <input type="password" id="passwdReset-retype-Password" class="form-control" placeholder="Retype Password" required>
		               <button class="btn btn-lg btn-primary btn-block"  id="passwdReset-btn" type="button">Change Password<span style="display:none;"> <i class="fa fa-spinner fa-spin"></i> </span> </button>
		            </form>
		         </div>
		      </div>
		   </div>
		</div>
		<!-- Change password modal ends here-->
		
		<script src="/js/jquery/jquery.min.js"></script>
	    <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery.min.js"><\/script>')</script>
	    <script src="/bootstrap/js/bootstrap.min.js"></script>
	    <!-- Just to make our placeholder images work. Don't actually copy the next line! -->
	    <script src="/assets/js/holder.min.js"></script>
	    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
	    <script src="/assets/js/ie10-viewport-bug-workaround.js"></script>
	    
	    <script type="text/javascript" src="/js/common.js"> </script>
	    
	    <script type="text/javascript">
	    	var resetPasswordDetails = <%=resetPasswordDetailsMap%>;
			$(document).ready(function(){
				
				if( resetPasswordDetails.success ){
					$('#passwdReset-error').html('').hide();
					$('#frgtpwd-modal').find('form').show();
				}else{
					$('#passwdReset-error').html(resetPasswordDetails.message).show();
					$('#frgtpwd-modal').find('form').hide();
				}
				showModal('frgtpwd-modal');
				
				$(document.body).on('click', '#passwdReset-btn', function(){
					$('#passwdReset-error').html('').hide();
					let passwd1 = $('#passwdReset-new-Password').val().trim();
					let passwd2 = $('#passwdReset-retype-Password').val().trim();
					if( isEmptyString(passwd1) ){
						$('#passwdReset-error').html('Please enter the password').show();
						$('#passwdReset-new-Password').focus();
						return false;
					}else if( isEmptyString(passwd2) ){
						$('#passwdReset-error').html('Please enter the password').show();
						$('#passwdReset-retype-Password').focus();
						return false;
					}else if( passwd1 != passwd2 ){
						$('#passwdReset-error').html('Passwords do not match').show();
						$('#passwdReset-retype-Password').focus();
						return false;
					}else{
						showLoader('passwdReset-btn');
						
						let updatePswdDetails = new Object();
						updatePswdDetails.userEmailID = resetPasswordDetails.userEmailID;
						updatePswdDetails.password = passwd1;
						let updatePswdDetailsJSON = JSON.stringify(updatePswdDetails);
						console.log(updatePswdDetailsJSON);
						
						$.ajax({
							url : "/home/updatePassword",
							type : "POST",
							data : updatePswdDetailsJSON,
							contentType : "application/json",
							dataType : "json",
							success : function(response){
								console.log(response);
								hideLoader('passwdReset-btn');
								if( response.success ){
									$('#passwdReset-success').html(response.message + "</br> You will be redirected to login page automatically!").show();
									$('#frgtpwd-modal').find('form').hide();
									setTimeout( function(){ window.location = "/"; }, 5000 );
								}else{
									$('#passwdReset-error').html(response.message).show();
								}
							},
							error : function(err){
								hideLoader('passwdReset-btn');
								console.log("Something went wrong!");
							}
						});
					}
				});
				
				
			});
		</script>
	</body>
</html>