var UserDetails;
$(document).ready(function(){
	
	fetchRequiredDetailsForSignedInUser();
	
	$('#nav-Home').click(function(){
		$('ul.navbar-nav li').removeClass('active');
		$('#nav-Home').addClass('active');
	});
});


function fetchRequiredDetailsForSignedInUser(){
	
	console.log("In fetchRequiredDetailsForSignedInUser()");
	$.ajax({
		url : "/home/getRequiredDetailsForSignedInUser",
		type : "POST",
		contentType : "application/json",
		dataType : "json",
		success : function(response){
					console.log(response);
					if( response.success ){
						console.log("in success");
						UserDetails = response.UserDetails;
						$('#username').html( "Welcome, " + UserDetails.name.toUpperCase() );
						
						var CourseDetails = response.CourseDetails;
						var ConceptsDetails = response.ConceptsDetails;
						generateCourseDetails( CourseDetails, ConceptsDetails );
						generatePerformanceAnalyzerDetails( CourseDetails, ConceptsDetails );
						
					}else{
						showVoiceBox("Something went please try again!", 3000);
					}
				},
		error : function(err){
					console.log("Something went wrong!");
				}
	});
}

function generateCourseDetails(CourseDetails, ConceptsDetails){
	
	if( CourseDetails != null && ConceptsDetails != null ){
		var liCourseConceptDetails = '';
		
		for(var courseIndex in CourseDetails){
			liCourseConceptDetails += '<li class="dropdown-submenu"><a href="#">' + CourseDetails[courseIndex].courseName + '</a>'; 
			liCourseConceptDetails += '		<ul class="dropdown-menu">';
			
			for(var conceptIndex in ConceptsDetails){
				if( CourseDetails[courseIndex].courseID == ConceptsDetails[conceptIndex].courseID ){
					liCourseConceptDetails += '			<li id="' + ConceptsDetails[conceptIndex].conceptName.replace(/ /g, '-') + '" ><a href="#">' + ConceptsDetails[conceptIndex].conceptName + '</a></li>';
				}
			}
			
			liCourseConceptDetails += '		</ul>';
			liCourseConceptDetails += '</li>';
		}
		$('#course-list').html(liCourseConceptDetails);
		
	}else{
		console.log("CourseDetails or ConceptsDetails are empty!");
	}
}

function generatePerformanceAnalyzerDetails(CourseDetails, ConceptsDetails){
	
	if( CourseDetails != null && ConceptsDetails != null ){
		var liCourseConceptDetails = '';
		
		for(var courseIndex in CourseDetails){
			liCourseConceptDetails += '<li class="dropdown-submenu"><a href="#">' + CourseDetails[courseIndex].courseName + '</a>';
			liCourseConceptDetails += '		<ul class="dropdown-menu">';
			
			for(var conceptIndex in ConceptsDetails){
				if( CourseDetails[courseIndex].courseID == ConceptsDetails[conceptIndex].courseID ){
					liCourseConceptDetails += '			<li><a href="#" data-conceptID=' + ConceptsDetails[conceptIndex].conceptID + '>' + ConceptsDetails[conceptIndex].conceptName + '</a></li>';
				}
			}
			
			liCourseConceptDetails += '		</ul>';
			liCourseConceptDetails += '</li>';
		}
		liCourseConceptDetails += '<li role="separator" class="divider"></li>';
		liCourseConceptDetails += '<li id="viewScore"><a href="#">View Score</a></li>';
		
		$('#performanceAnalyzer-list').html(liCourseConceptDetails);
		
	}else{
		console.log("CourseDetails or ConceptsDetails are empty!");
	}
}