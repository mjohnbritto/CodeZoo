/**
 * 
 */

$(document).ready(function(){

	$(document).on('click', '#signin-option', function(){
		$('#signin-Email, #signin-Password').val('');
		$('#signin-error').html('').hide();

		var rememberMe = localStorage.getItem('remember-me-checked');
		var email = localStorage.getItem('email');
		if( typeof(rememberMe) != 'undefined' && !isEmptyString(rememberMe) && rememberMe == "true" ){
			$('#remember-me').prop('checked', true);
		}else{
			$('#remember-me').prop('checked', false);
		}
		if( typeof(email) != 'undefined' && !isEmptyString(email) ){
			$('#signin-Email').val(email);
		}

		showModal('signin-modal');
	});

	$(document).on('click', '#frgtpasswd-option', function(){
		$('#frgtpasswd-Email').val('');
		$('#frgtpasswd-error').html('').hide();

		hideModal('signin-modal');
		
		$('#frgtpasswd-modal form').show();
		$('#frgtpasswd-modal #frgtpasswd-confirmation').html('').hide();
		$('#frgtpasswd-modal .modal-footer').hide();
		showModal('frgtpasswd-modal');
	});

	$(document).on('click', '#back-to-signin', function(){
		hideModal('frgtpasswd-modal');
		$('#signin-option').click();
	});
	
//	$(document).on('click', '#frgtpasswd-option', function(){
//	$('#frgtpasswd-Email, #passwdReset-new-Password, #passwdReset-retype-Password').val('');
//	$('#passwdReset-error').html('').hide();

//	hideModal('signin-modal');
//	showModal('frgtpwd-modal');
//	});

	$(document).on('click', '#signup-option, #sign-up-today, #feature1-signUp, #feature2-signUp, #feature3-signUp' , function(){
		$('#signup-Name').val('');
		$('#signup-Email').val('');
		$('#signup-Password').val('');
		$('#signup-Address').val('');
		$('#signup-error').html('').hide();
		showModal('signup-modal');
	});

	$(document).on('keyup', '#signup-Name', function(){
		var userName = $('#signup-Name').val();
		userName = userName.replace(/[^a-zA-Z ]/g, "");
		$('#signup-Name').val(userName);
	});

	$(document).on('keyup', '#signin-Password', function(event){
		console.log(event.KeyCode);
		if(event.keyCode == 13){
			$('#signin-btn').click();
		}
	});

//	$(document).on('focus' , '#signup-Name, #signup-Email, #signup-Password, #signup-Address', function(){
//	$('#signup-error').html('').hide();
//	});

	$(document).on('click', '#signin-btn', function(){
		if( document.getElementById('remember-me').checked ){
			localStorage.setItem('remember-me-checked', 'true');
			localStorage.setItem('email', $('#signin-Email').val().trim());
		}else{
			localStorage.setItem('remember-me-checked', 'false');
			localStorage.setItem('email', '');
		}
		signInUser();
	});

	$(document).on('click', '#frgtpasswd-btn', function(){
		sendChangePasswordReq();
	});

	$(document).on('click', '#signout-btn', function(){
		signOutUser();
	});

	$(document).on('click', '#signup-btn', function(){
		registerNewUser();
	});

	$(document).on('click', '#contact-btn', function(){
		sendUserQuery();
	});
});

function signInUser(){

	var userEmail = $('#signin-Email').val().trim();
	var userPassword = $('#signin-Password').val().trim();

	if( !validateEmail(userEmail) ){
		$('#signin-error').html("Email : is not valid!").show();
		$('#signin-Email').focus();
	}else if( isEmptyString(userPassword) ){
		$('#signin-error').html("Password : please enter the password!").show();
		$('#signin-Password').focus();
	}else{

		$('#signin-error').html("").hide();
		showLoader('signin-btn');

		var signinDetails = new Object();
		signinDetails.userEmail = userEmail;
		signinDetails.userPasswd = userPassword;

		var signinDetailsJSON = JSON.stringify(signinDetails);
		console.log(signinDetailsJSON);

		$.ajax({
			url : "/home/signin",
			type : "POST",
			data : signinDetailsJSON,
			contentType : "application/json",
			dataType : "json",
			success : function(response){
				console.log(response);
				hideLoader('signin-btn');
				if( response.success ){
					hideModal('signin-modal');
					showVoiceBox("SignIn successful!", 3000);
					window.location = "/";
				}else{
					$('#signin-error').html( response.message ).show();
				}
			},
			error : function(err){
				hideLoader('signin-btn');
				console.log("Something went wrong!");
			}
		});
	}
}

function sendChangePasswordReq(){
	var userEmail = $('#frgtpasswd-Email').val().trim();

	if( !validateEmail(userEmail) ){
		$('#frgtpasswd-error').html("Email : is not valid!").show();
		$('#frgtpasswd-Email').focus();
	}else{

		$('#frgtpasswd-error').html("").hide();
		showLoader('frgtpasswd-btn');

		var reqDetails = new Object();
		reqDetails.userEmail = userEmail;

		var reqDetailsJSON = JSON.stringify(reqDetails);
		console.log(reqDetailsJSON);

		$.ajax({
			url : "/home/changePasswordRequest",
			type : "POST",
			data : reqDetailsJSON,
			contentType : "application/json",
			dataType : "json",
			success : function(response){
				console.log(response);
				hideLoader('frgtpasswd-btn');
				if( response.success ){
					$('#frgtpasswd-modal form').hide();
					$('#frgtpasswd-modal #frgtpasswd-confirmation').html('Please check your registered email inbox and proceed further to change your password.').show();
					$('#frgtpasswd-modal .modal-footer').show();
				}else{
					$('#frgtpasswd-error').html( response.message ).show();
				}
			},
			error : function(err){
				console.log(err);
				hideLoader('frgtpasswd-btn');
				console.log("Something went wrong!");
			}
		});
	}
}

function signOutUser(){

	showLoader('signout-btn');

	$.ajax({
		url : "/home/signout",
		type : "POST",
		contentType : "application/json",
		dataType : "json",
		success : function(response){
			console.log(response);
			hideLoader('signout-btn');
			if( response.success ){
				showVoiceBox("SignOut successful!", 3000);
				window.location = "/";
			}else{
				showVoiceBox("Something went please try again!", 3000);
			}
		},
		error : function(err){
			console.log("Something went wrong!");
			hideLoader('signout-btn');
		}
	});
}

function registerNewUser(){

	var userName = $('#signup-Name').val().trim();
	var userEmail = $('#signup-Email').val().trim();
	var userPassword = $('#signup-Password').val().trim();
	var userAddress = $('#signup-Address').val().trim();

	if( isEmptyString(userName) ){
		$('#signup-error').html("Name : is not valid!").show();
		$('#signup-Name').focus();
	}else if( !validateEmail(userEmail) ){
		$('#signup-error').html("Email : is not valid!").show();
		$('#signup-Email').focus();
	}else if( userPassword.length<6 ){
		$('#signup-error').html("Password : please enter atleast 6 characters!").show();
		$('#signup-Password').focus();
	}else if( isEmptyString(userAddress) ){
		$('#signup-error').html("Address : is not valid!").show();
		$('#signup-Address').focus();
	}else{

		$('#signup-error').html("").hide();
		showLoader('signup-btn');

		var registrationDetails = new Object();
		registrationDetails.userName = userName;
		registrationDetails.userEmail = userEmail;
		registrationDetails.userPasswd = userPassword;
		registrationDetails.userAddress = userAddress;

		var registrationDetailsJSON = JSON.stringify(registrationDetails);
		console.log(registrationDetailsJSON);

		$.ajax({
			url : "/registration/registerNewUser",
			type : "POST",
			data : registrationDetailsJSON,
			contentType : "application/json",
			dataType : "json",
			success : function(response){
				console.log(response);
				if( response.success ){
					var registeredUserEmail = response.UsersJDO.emailID;
					hideModal('signup-modal');
					showModal('common-success-modal');
					$('#common-success-modal .modal-title').html("Thank you for registering");
					$('#common-success-modal .modal-body>p').html("Your registraion is now complete.<br/> <button type='button' class='btn btn-primary' style='margin-left: 40%;' onclick='signInNow(\"" + registeredUserEmail + "\")'>Login to CodeZoo</button>");
				}else{
					$('#signup-error').html( response.message ).show();
				}
				hideLoader('signup-btn');
			},
			error : function(err){
				hideLoader('signup-btn');
				console.log("Something went wrong!");
			}
		});
	}
}

function signInNow(userEmailID){
	$('.modal').modal('hide');

	if( !isEmptyString(userEmailID) ){
		$('#signin-Email').val( userEmailID );
	}else{
		$('#signin-Email').val('');
	}
	$('#signin-Password').val('');
	$('#signin-error').html('').hide();
	$('#remember-me').prop('checked', false);
	showModal('signin-modal');
}




function sendUserQuery(){

	var name = $('#contact-Name').val();
	var email = $('#contact-Email').val();
	var subject = $('#contact-Subject').val();
	var query = $('#contact-Query').val();
	$('#contact-error').html("").hide();
	if( isEmptyString(name) || isEmptyString(email) || isEmptyString(subject) || isEmptyString(query) ){
		$('#contact-error').html("Please provide all details!").show();
		return;
	}

	var userQueryDetails = new Object();
	userQueryDetails.name = name;
	userQueryDetails.email = email;
	userQueryDetails.subject = subject;
	userQueryDetails.query = query;

	var userQueryDetailsJSON = JSON.stringify(userQueryDetails);
	console.log(userQueryDetailsJSON);

	$('#contact-btn span').show();

	$.ajax({
		url : "home/raiseUserQuery/",
		type : "POST",
		data : userQueryDetailsJSON,
		contentType : "application/json",
		dataType : "json",
		success : function(response){
			console.log(response);
			$('#contact-btn span').hide();

			if( response.success ){
				showVoiceBox("Thanks! We'll contact you soon!", 3000);
				$('#contact-Name, #contact-Email, #contact-Subject, #contact-Query').val('');
			}else{
				$('#contact-error').html( response.message ).show();
			}
		},
		error : function(err){
			$('#contact-btn span').hide();
			console.log("Something went wrong!");
		}
	});
}