var allUsersMap = new Object();
$(document).ready(function(){
	
	getAllUsersDetails();
});

$(document).on('click', '.answer-now', function(){
	
	if( $(this).parent().siblings('.newAnswer').css('display') == "none" ){
		$('.newAnswer').slideUp();
		$(this).parent().siblings('.newAnswer').find('textarea').val('');
		$(this).parent().siblings('.newAnswer').slideDown();
	}else{
		$(this).parent().siblings('.newAnswer').slideUp();
	}
});

$(document).on('click', '.btn-cancel', function(){
	if( $(this).parent().parent().hasClass('newAnswer') ){
		$(this).parent().parent().slideUp();
	}else if( $(this).parent().parent().hasClass('newQuestion') ){
		$(this).parent().parent().fadeOut();
	}
});

$(document).on('click', '#ask-question', function(){
	
	if( $('.newQuestion').css('display') == "none" ){
		$('#qstToPost').val('');
		$('.newQuestion').fadeIn();
		//$('.newQuestion').slideDown();
	}else{
		$('.newQuestion').fadeOut();
		//$('.newQuestion').slideUp();
	}
});

$(document).on('click', '#all-questions, #my-questions', function(){
	var queryDetails = new Object();
	if( $(this).attr('id') == "all-questions" ){
		queryDetails.userID = "";
	}else if( $(this).attr('id') == "my-questions" ){
		queryDetails.userID = UserDetails.userID;		
	}else{
		queryDetails.userID = "";
	}
	var queryDetailsJSON = JSON.stringify(queryDetails);
	console.log(queryDetailsJSON);
	
	$('.newQuestion').fadeOut();
	$('#forum-questions').html('<div style="font-size: 25px; text-align: center; margin-top: 25%;"> <i class="fa fa-spinner fa-spin"></i> </div>');
	
	var localSysTZ = "" + new Date();
	localSysTZ = localSysTZ.split(' ')[5];
	localSysTZ = "(" + localSysTZ.substring(0,6) +":"+ localSysTZ.substring(6,8) + ")";
	
	$.ajax({
		url : "/forum/getForumQueriesList",
		type : "POST",
		data : queryDetailsJSON,
		contentType : "application/json",
		dataType : "json",
		success : function(response){
			console.log(response);
			if( response.success ){
				showVoiceBox("Details retrived!", 5000);
				var dvQuestionDetails = '';
				var questionAnswerDetails = response.questionAnswerDetails;
				if( typeof(questionAnswerDetails) != 'undefined' && questionAnswerDetails != null && questionAnswerDetails.length > 0 ){
					for( var qIndex=0; qIndex < questionAnswerDetails.length; qIndex++ ){
						var singleQuestion = questionAnswerDetails[qIndex].question;
						var singleQuestionAnswers = questionAnswerDetails[qIndex].answers;
						
						dvQuestionDetails += '<div class="singleQuestion" data-queryID="' + singleQuestion.queryID + '">';
						dvQuestionDetails += 	singleQuestion.query;
						dvQuestionDetails += '	<div class="answer-count">';
						if( singleQuestionAnswers != null && typeof(singleQuestionAnswers) != 'undefined' && singleQuestionAnswers.length > 0 ){
							if(singleQuestionAnswers.length == 1){
								dvQuestionDetails += '		<span>' + singleQuestionAnswers.length + ' Answer</span>';
							}else{
								dvQuestionDetails += '		<span>' + singleQuestionAnswers.length + ' Answers</span>';
							}
						}else{
							dvQuestionDetails += '		<span>No answer yet</span>';
						}
						dvQuestionDetails += '	</div>';
						dvQuestionDetails += '	<div class="asked-by">';
						dvQuestionDetails += '		</span>';
						dvQuestionDetails += '		<span>asked '+ getDateForThisTimeZoneOffset( localSysTZ, "date-time", "-", singleQuestion.postedLongTime ) +'</span> <br/>';
						dvQuestionDetails += '		<span> <a href="mailto:'+ allUsersMap[singleQuestion.userID].emailID +'">'+ allUsersMap[singleQuestion.userID].name +'</a> </span>';
						dvQuestionDetails += '	</div>';
						
						dvQuestionDetails += 	'<div class="answers">';
						if( typeof(singleQuestionAnswers) != 'undefined' && singleQuestionAnswers != null && singleQuestionAnswers.length > 0 ){
							for( var ansIndex=0; ansIndex < singleQuestionAnswers.length; ansIndex++ ){
								dvQuestionDetails += '	<div class="singleAnswer">';
								dvQuestionDetails +=		singleQuestionAnswers[ansIndex].answer;
								dvQuestionDetails += '		<div class="answered-by">';
								dvQuestionDetails += '			<span>answered '+ getDateForThisTimeZoneOffset( localSysTZ, "date-time", "-", singleQuestionAnswers[ansIndex].answeredLongTime ) +'</span> <br/>';
								dvQuestionDetails += '			<span> <a href="mailto:'+ allUsersMap[singleQuestionAnswers[ansIndex].userID].emailID +'">'+ allUsersMap[singleQuestionAnswers[ansIndex].userID].name +'</a> </span>';
								dvQuestionDetails += '		</div>';
								dvQuestionDetails += '	</div>';
							}
						}
				        dvQuestionDetails += 	'</div>';
				        
				        
				        dvQuestionDetails += '	<span> <button type="button" class="btn btn-primary btn-sm answer-now">Answer Now</button> </span>';
				        dvQuestionDetails += '	<div class="newAnswer" data-queryID="' + singleQuestion.queryID + '">';
				        dvQuestionDetails += '		<textArea placeholder="Share your answer, Help others."></textArea>';
				        dvQuestionDetails += '		<div>';
				        dvQuestionDetails += '  		<button type="button" class="btn btn-primary btn-sm btn-cancel">Cancel</button>';
				        dvQuestionDetails += '  		<button type="button" class="btn btn-primary btn-sm btn-save">Save <span style="display:none;"> <i class="fa fa-spinner fa-spin"></i> </span> </button>';
				        dvQuestionDetails += '    	</div>';
				        dvQuestionDetails += '	</div>';
				        dvQuestionDetails += '</div>';
					}
				}else{
					dvQuestionDetails += '<div id="no-questions" style="text-align: center;"> No Questions availavle. Please look back later!</div>';
				}
				
				$('#forum-questions').html(dvQuestionDetails);
			}else{
				showVoiceBox("Something went wrong! Please try again!", 3000);
			}
		},
		error : function(err){
			showVoiceBox("Something went wrong! Please try again!", 3000);
		}
	});
});


$(document).on('click', '#qstPost-btn', function(){
	var question = $('#qstToPost').val().trim();
	if( question == null || question == "" ){
		showVoiceBox("Please provide proper question!", 3000);
		return;
	}
	var queryDetails = new Object();
	queryDetails.userID = UserDetails.userID;
	queryDetails.question = question;
	
	var queryDetailsJSON = JSON.stringify(queryDetails);
	console.log(queryDetailsJSON);
	showLoader('qstPost-btn');
	
	var localSysTZ = "" + new Date();
	localSysTZ = localSysTZ.split(' ')[5];
	localSysTZ = "(" + localSysTZ.substring(0,6) +":"+ localSysTZ.substring(6,8) + ")";
	
	$.ajax({
		url : "/forum/postNewQuestion",
		type : "POST",
		data : queryDetailsJSON,
		contentType : "application/json",
		dataType : "json",
		success : function(response){
			console.log(response);
			hideLoader('qstPost-btn');
			if( response.success ){
				showVoiceBox("Successfully posted the question, Look back later for answers!", 5000);
				$('.newQuestion').fadeOut();
				
				var newQuery = response.ForumQueryJDO;
				$('#no-questions').remove(); // There were No questions error remove that.
				var thisQuestionDetails = '<div class="singleQuestion" data-queryID="' + newQuery.queryID + '">';
				thisQuestionDetails += 	newQuery.query;
				thisQuestionDetails += '		<div class="asked-by">';
				thisQuestionDetails += '			<span>asked '+ getDateForThisTimeZoneOffset( localSysTZ, "date-time", "-", newQuery.postedLongTime ) +'</span> <br/>';
				thisQuestionDetails += '			<span> <a href="mailto:'+ allUsersMap[newQuery.userID].emailID +'">'+ allUsersMap[newQuery.userID].name +'</a> </span>';
				thisQuestionDetails += '		</div>';
				
				thisQuestionDetails += 	'<div class="answers"></div>';
		        
				thisQuestionDetails += '	<span> <button type="button" class="btn btn-primary btn-sm answer-now">Answer Now</button> </span>';
				thisQuestionDetails += '	<div class="newAnswer" data-queryID="' + newQuery.queryID + '">';
				thisQuestionDetails += '		<textArea placeholder="Share your answer, Help others."></textArea>';
				thisQuestionDetails += '		<div>';
				thisQuestionDetails += '  		<button type="button" class="btn btn-primary btn-sm btn-cancel">Cancel</button>';
				thisQuestionDetails += '  		<button type="button" class="btn btn-primary btn-sm btn-save">Save <span style="display:none;"> <i class="fa fa-spinner fa-spin"></i> </span> </button>';
				thisQuestionDetails += '    	</div>';
				thisQuestionDetails += '	</div>';
				thisQuestionDetails += '</div>';

				$('#forum-questions').append(thisQuestionDetails);
			}else{
				showVoiceBox("Something went wrong! Please try again!", 3000);
			}
		},
		error : function(err){
			hideLoader('qstPost-btn');
			showVoiceBox("Something went wrong! Please try again!", 3000);
		}
	});
});


$(document).on('click', '.newAnswer .btn-save', function(){
	var answer = $(this).parent().parent().find('textarea').val().trim();
	if( answer == null || answer == "" ){
		showVoiceBox("Please provide proper answer!", 3000);
		return;
	}
	var answerDetails = new Object();
	answerDetails.queryID = $(this).parent().parent().attr('data-queryid');
	answerDetails.userID = UserDetails.userID;
	answerDetails.answer = answer;
	
	var answerDetailsJSON = JSON.stringify(answerDetails);
	console.log(answerDetailsJSON);
	var thisElement = $(this);
	$(thisElement).find('span').show();
	
	var localSysTZ = "" + new Date();
	localSysTZ = localSysTZ.split(' ')[5];
	localSysTZ = "(" + localSysTZ.substring(0,6) +":"+ localSysTZ.substring(6,8) + ")";
	
	$.ajax({
		url : "/forum/saveNewAnswer",
		type : "POST",
		data : answerDetailsJSON,
		contentType : "application/json",
		dataType : "json",
		success : function(response){
			console.log(response);
			$(thisElement).find('span').hide();
			if( response.success ){
				showVoiceBox("Thanks for your answer!", 5000);
				$(thisElement).parent().parent().slideUp();
				
				var newAnswer = response.ForumAnswerJDO;
				var thisAnswerDetails = '	<div class="singleAnswer">';
				thisAnswerDetails +=		newAnswer.answer;
				thisAnswerDetails += '		<div class="answered-by">';
				thisAnswerDetails += '			<span>answered '+ getDateForThisTimeZoneOffset( localSysTZ, "date-time", "-", newAnswer.answeredLongTime ) +'</span> <br/>';
				thisAnswerDetails += '			<span> <a href="mailto:'+ allUsersMap[newAnswer.userID].emailID +'">'+ allUsersMap[newAnswer.userID].name +'</a> </span>';
				thisAnswerDetails += '		</div>';
				thisAnswerDetails += '	</div>';
				$(thisElement).parent().parent().siblings('div.answers').append(thisAnswerDetails);
			}else{
				showVoiceBox("Something went wrong! Please try again!", 3000);
			}
		},
		error : function(err){
			$(thisElement).find('span').hide();
			showVoiceBox("Something went wrong! Please try again!", 3000);
		}
	});
});


function getAllUsersDetails(){
	$('#forum-questions').html('<div style="font-size: 25px; text-align: center; margin-top: 25%;"> <i class="fa fa-spinner fa-spin"></i> </div>');
	
	$.ajax({
		url : "/forum/getAllUsersDetails",
		type : "POST",
		contentType : "application/json",
		success : function(responseObject){
			if(responseObject.success){
				allUsersMap = responseObject.allUsersMap;
				$('#all-questions').trigger('click');
			}else{
				showVoiceBox("Something went wrong! try refreshing the page!", 3000);
			}
		},
		error : function(err){
			showVoiceBox("Something went wrong! try refreshing the page!", 3000);
		}
	});
}