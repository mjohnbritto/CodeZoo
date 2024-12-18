var gQuestionsDetails = [];
var gScoreCount = 0;
var gCurruntQuestionNo = 0;
var chosenConceptID;
$(document).ready(function(){
	
	$(document).on('click', '#performanceAnalyzer-list li ul li a', function(){
		//$('ul.navbar-nav li').removeClass('active');
		//$('#nav-PerformanceAnalyzer').addClass('active');
		
		$('#performanceAnalyzerModal-title').html( $(this).html() + ' Algorithm');
		$('#performanceAnalyzerModal').find('#loader').show();
		$('#question-desc').hide();
		$('#performanceAnalyzerModal .modal-footer button').attr('disabled', true);
		
		$('#nextQuestion').html('Next <span style="display:none;"> <i class="fa fa-spinner fa-spin"></i> </span>');
		$('#nextQuestion').attr('onclick', 'displayQuizQuestion();')
		showModal('performanceAnalyzerModal');
		
		chosenConceptID = $(this).attr('data-conceptID');
		getPerformanceAnalyzerDetailsForQuiz(chosenConceptID);
	});
	
	$(document).on('click', '#viewScore', function(){
		
		showModal('scoreModal');
		$('#scoreModal').find('#loader').show();
		$('#dvScoreDetails').hide();
		$('#dvNo-data').hide();
		
		var performanceDetails = new Object();
		performanceDetails.userID = UserDetails.userID;
		var performanceDetailsJSON = JSON.stringify(performanceDetails);
		console.log("performanceDetailsJSON :: " + performanceDetailsJSON);
		
		$.ajax({
			url : "/Performace/getScoresForUser",
			type : "POST",
			contentType : "application/json",
			dataType : "json",
			data : performanceDetailsJSON,
			success : function(response){
				if(response.success){
					console.log(response);
					var scoreDetails = response.scoreDetails;
					if( scoreDetails != null ){
						var tbodyScore = '';
						for( var index = 0; index<scoreDetails.length; index++ ){
							tbodyScore += '<tr>';
							tbodyScore += '		<td>' + scoreDetails[index].conceptName + '</td>';
							tbodyScore += '		<td>' + scoreDetails[index].score + '</td>';
							tbodyScore += '</tr>';
						}
						$('#dvScoreDetails tbody').html(tbodyScore);
						$('#dvScoreDetails').show();						
					}else{
						$('#dvNo-data').show();
					}
				}else{
					console.log("Something went wrong!");
					showVoiceBox("Something went please try again!", 3000);
				}
				$('#scoreModal').find('#loader').hide();
			},
			error : function(err){
				console.log("Something went wrong! : " + err);
				$('#scoreModal').find('#loader').hide();
			}
		});
	});
});

function getPerformanceAnalyzerDetailsForQuiz(conceptID){
	
	console.log("In getPerformanceAnalyzerDetailsForQuiz()");
	var requiredDetails = new Object();
	requiredDetails.conceptID = conceptID;
	var requiredDetailsJSON = JSON.stringify(requiredDetails);
	console.log(" requiredDetailsJSON = " + requiredDetailsJSON);
	$.ajax({
		url : "/Performace/getAllQuestionsForQuiz",
		type : "POST",
		contentType : "application/json",
		dataType : "json",
		data : requiredDetailsJSON,
		success : function(response){
			console.log(response);
			if( response.success ){
				console.log("in success");

				gQuestionsDetails = response.questionsDetails;
				gScoreCount = 0;
				gCurruntQuestionNo = 0;
				displayQuizQuestion();
				$('#question-desc').show();
			}else{
				showVoiceBox("Something went please try again!", 3000);
			}
			$('#performanceAnalyzerModal').find('#loader').hide();
			$('#performanceAnalyzerModal .modal-footer button').attr('disabled', false);
		},
		error : function(err){
			console.log("Something went wrong!");
			$('#performanceAnalyzerModal').find('#loader').hide();
			$('#performanceAnalyzerModal .modal-footer button').attr('disabled', false);
		}
	});
}

function displayQuizQuestion(){
	
	$('#performanceAnalyzer-error').html("").hide();
	if(gCurruntQuestionNo != 0){
		var chosenOption = $('input[name=options]:checked').val();
		console.log(chosenOption);
		if( typeof(chosenOption) == 'undefined' || chosenOption == '' || chosenOption == null ){
			$('#performanceAnalyzer-error').html("Please choose the answer!").show();
			return;
		}
		if( gQuestionsDetails[gCurruntQuestionNo-1][chosenOption] == gQuestionsDetails[gCurruntQuestionNo-1].answer ){
			gScoreCount ++;
		}
	}
	
	$('#question-desc').find('label').replaceWith( '<label> <span>' + (gCurruntQuestionNo + 1) + '.</span> ' + gQuestionsDetails[gCurruntQuestionNo].question + ' </label>' );
	$('#option1').html( gQuestionsDetails[gCurruntQuestionNo].option1 );
	$('#option2').html( gQuestionsDetails[gCurruntQuestionNo].option2 );
	$('#option3').html( gQuestionsDetails[gCurruntQuestionNo].option3 );
	$('#option4').html( gQuestionsDetails[gCurruntQuestionNo].option4 );
	$("input:radio").removeAttr("checked");
	
	gCurruntQuestionNo++;
	
	if(gCurruntQuestionNo == 10){
		$('#nextQuestion').html('Submit <span style="display:none;"> <i class="fa fa-spinner fa-spin"></i> </span>');
		$('#nextQuestion').attr('onclick', 'submitAnswers();')
	}
}

function submitAnswers(){
	console.log("in submitAnswers");
	
	$('#performanceAnalyzer-error').html("").hide();
	var chosenOption = $('input[name=options]:checked').val();
	console.log(chosenOption);
	if( typeof(chosenOption) == 'undefined' || chosenOption == '' || chosenOption == null ){
		$('#performanceAnalyzer-error').html("Please choose the answer!").show();
		return;
	}
	if( gQuestionsDetails[gCurruntQuestionNo-1][chosenOption] == gQuestionsDetails[gCurruntQuestionNo-1].answer ){
		gScoreCount ++;
	}
	
	var performanceDetails = new Object();
	performanceDetails.userID = UserDetails.userID;
	performanceDetails.conceptID = chosenConceptID;
	performanceDetails.score = gScoreCount.toString();
	var performanceDetailsJSON = JSON.stringify(performanceDetails);
	console.log("performanceDetailsJSON :: " + performanceDetailsJSON);
	
	showLoader('nextQuestion');
	
	$.ajax({
		url : "/Performace/savePerformanceDetails",
		type : "POST",
		contentType : "application/json",
		dataType : "json",
		data : performanceDetailsJSON,
		success : function(response){
			if(response.success){
				showVoiceBox("Great Job! Successfully completed the test!", 3000);
				hideModal('performanceAnalyzerModal');
			}else{
				console.log("Something went wrong!");
				showVoiceBox("Something went please try again!", 3000);
			}
			hideLoader('nextQuestion');
		},
		error : function(err){
			console.log("Something went wrong!");
			hideLoader('nextQuestion');
		}
	});
}