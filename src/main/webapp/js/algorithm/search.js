var searchSimulateState = 0;
var timeInterval = 2000;
var searchSimulateThread;
var value1,value2,value3,value4,value5,value6,searchItem;
	
$(document).ready(function(){
	
	
	$(document).on('click', '#Search', function(){
		console.log(searchSimulateThread);
		clearTimeout(searchSimulateThread);
		//$('ul.navbar-nav li').removeClass('active');
		//$('#nav-Courses').addClass('active');
		
		$('.dv-search-input').show();
		$('#searchModal .modal-footer').show();
		$('#searchCanvas').hide();
		$('#search-error').html("").hide();
		$('#searchModal .modal-dialog').width(700);
		showModal('searchModal');
		
		$('#searchIP1, #searchIP2, #searchIP3, #searchIP4, #searchIP5, #searchIP6, #searchItem').val('');
	});
	
	$(document).on('click', '#search-Simulate', function(){
		$('#search-error').html("").hide();
		value1 = $('#searchIP1').val();
		value2 = $('#searchIP2').val();
		value3 = $('#searchIP3').val();
		value4 = $('#searchIP4').val();
		value5 = $('#searchIP5').val();
		value6 = $('#searchIP6').val();
		searchItem = $('#searchItem').val();
		if( !isNumber(value1) || !isNumber(value2) || !isNumber(value3) || !isNumber(value4) || !isNumber(value5) || !isNumber(value6) ){
			$('#search-error').html("Please fill all the fields(Numeric)!").show();
		}else if( !isNumber(searchItem) ){
			$('#search-error').html("Please enter the element to be found(Numeric)!").show();
		}else{
			value1 = Number(value1);
			value2 = Number(value2);
			value3 = Number(value3);
			value4 = Number(value4);
			value5 = Number(value5);
			value6 = Number(value6);
			searchItem = Number(searchItem);
			
			$('.dv-search-input').hide();
			$('#searchModal .modal-footer').hide();
			$('#searchModal .modal-dialog').width(800);
			
			searchSimulateState = 1;
			SearchSimulation.searchSimulate();
		}
		
	});
	
});

var SearchSimulation = (function($, window, document, undefined) {
	
	var canvas = document.getElementById("searchCanvas");
	var context = canvas.getContext("2d");
	var strokeColor = "#337ab7";
	var boxWidth = 75;
	var boxHeight = 50;
	var padding = 50;
	var lineWidth="5";
	var font = "bold 25px 'Times New Roman', Times, serif";
	var processBarWidth="600";
	var processBarHeight="50";
	var processBarLineWidth = "1.5";
	var smallFont = "bold 15px 'Times New Roman', Times, serif";
	
	function drawDefaultElements(val1, val2, val3, val4, val5, val6){
		context.beginPath();
		context.lineWidth = lineWidth;
		context.strokeStyle = strokeColor;
		context.font = font;
		context.rect(65, 175, boxWidth, boxHeight);
		context.rect(165, 175, boxWidth, boxHeight);
		context.rect(265, 175, boxWidth, boxHeight);
		context.rect(365, 175, boxWidth, boxHeight);
		context.rect(465, 175, boxWidth, boxHeight);
		context.rect(565, 175, boxWidth, boxHeight);
		if( !isEmptyString(val1) ){
			context.fillText(val1, 95,208);
		}
		if( !isEmptyString(val2) ){
			context.fillText(val2, 195,208);
		}
		if( !isEmptyString(val3) ){
			context.fillText(val3, 295,208);
		}
		if( !isEmptyString(val4) ){
			context.fillText(val4, 395,208);
		}
		if( !isEmptyString(val5) ){
			context.fillText(val5, 495,208);
		}
		if( !isEmptyString(val6) ){
			context.fillText(val6, 595,208);
		}
		
		context.stroke();
	}

	function displayProcessState(processState){
		context.beginPath();
		context.font = smallFont;
		context.strokeStyle = strokeColor;
		context.lineWidth = processBarLineWidth;
		context.rect(50, 400, processBarWidth, processBarHeight);//process bar
		context.fillText(processState, 100, 430);//process state
		context.stroke();
	}
	
	function drawTempHolder(x,y,val){
		context.beginPath();
		context.lineWidth = lineWidth;
		context.strokeStyle = strokeColor;
		context.font = font;
		context.rect(x, y, boxWidth, boxHeight);
		if( !isEmptyString(val) ){
			context.fillText(val, (x+30), (y+30));
		}
		context.stroke();
	}
	
	function drawFoundItem(x,y){
		context.beginPath();
		context.lineWidth = lineWidth;
		context.strokeStyle = strokeColor;
		context.font = font;
		context.rect(x, y, boxWidth+20, boxHeight+20);
		context.stroke();
	}
	
	function searchSimulate(){
	
		if( searchSimulateState == 1 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			searchSimulateState = 2;
			searchSimulateThread = window.setTimeout( function(){ SearchSimulation.searchSimulate(); }, timeInterval);
		}else if( searchSimulateState == 2 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			SearchSimulation.drawDefaultElements('','','','','','');
			SearchSimulation.displayProcessState("");
			
			searchSimulateState = 3;
			searchSimulateThread = window.setTimeout( function(){ SearchSimulation.searchSimulate(); }, timeInterval);
		}else if( searchSimulateState == 3 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			SearchSimulation.drawDefaultElements(value1, value2,value3,value4,value5,value6);
			SearchSimulation.displayProcessState("Given elements");
			
			searchSimulateState = 4;
			searchSimulateThread = window.setTimeout( function(){ SearchSimulation.searchSimulate(); }, timeInterval);
		}else if( searchSimulateState == 4 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			SearchSimulation.drawDefaultElements(value1, value2,value3,value4,value5,value6);
			SearchSimulation.displayProcessState("Search Item to search in the given elements");
			SearchSimulation.drawTempHolder(65, 50, '');
			
			searchSimulateState = 5;
			searchSimulateThread = window.setTimeout( function(){ SearchSimulation.searchSimulate(); }, timeInterval);
		}else if( searchSimulateState == 5 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			SearchSimulation.drawDefaultElements(value1, value2,value3,value4,value5,value6);
			SearchSimulation.displayProcessState("The search item to be found is = " + searchItem);
			SearchSimulation.drawTempHolder(65, 50, searchItem);
			
			searchSimulateState = 6;
			searchSimulateThread = window.setTimeout( function(){ SearchSimulation.searchSimulate(); }, timeInterval);
		}else if( searchSimulateState == 6 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			SearchSimulation.drawDefaultElements(value1, value2,value3,value4,value5,value6);
			SearchSimulation.displayProcessState("Compare the search item with the first element");
			SearchSimulation.drawTempHolder(65, 50, searchItem);
			drawArrow(context, 102, 100, 102, 175);
			
			searchSimulateState = 7;
			searchSimulateThread = window.setTimeout( function(){ SearchSimulation.searchSimulate(); }, timeInterval);
		}else if( searchSimulateState == 7 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			if( searchItem == value1 ){
				SearchSimulation.drawDefaultElements(value1, value2,value3,value4,value5,value6);
				SearchSimulation.displayProcessState("The item is found at the first location");
				SearchSimulation.drawTempHolder(65, 50, searchItem);
				SearchSimulation.drawFoundItem(55, 165);
				
				searchSimulateState = 0;
			}else{
				SearchSimulation.drawDefaultElements(value1, value2,value3,value4,value5,value6);
				SearchSimulation.displayProcessState("Compare the search item with the second element");
				SearchSimulation.drawTempHolder(165, 50, searchItem);
				drawArrow(context, 202, 100, 202, 175);
				
				searchSimulateState = 8;
				searchSimulateThread = window.setTimeout( function(){ SearchSimulation.searchSimulate(); }, timeInterval);	
			}
		}else if( searchSimulateState == 8 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			if( searchItem == value2 ){
				SearchSimulation.drawDefaultElements(value1, value2,value3,value4,value5,value6);
				SearchSimulation.displayProcessState("The item is found at the second location");
				SearchSimulation.drawTempHolder(165, 50, searchItem);
				SearchSimulation.drawFoundItem(155, 165);
				
				searchSimulateState = 0;
			}else{
				SearchSimulation.drawDefaultElements(value1, value2,value3,value4,value5,value6);
				SearchSimulation.displayProcessState("Compare the search item with the third element");
				SearchSimulation.drawTempHolder(265, 50, searchItem);
				drawArrow(context, 302, 100, 302, 175);
				
				searchSimulateState = 9;
				searchSimulateThread = window.setTimeout( function(){ SearchSimulation.searchSimulate(); }, timeInterval);	
			}
		}else if( searchSimulateState == 9 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			if( searchItem == value3 ){
				SearchSimulation.drawDefaultElements(value1, value2,value3,value4,value5,value6);
				SearchSimulation.displayProcessState("The item is found at the third location");
				SearchSimulation.drawTempHolder(265, 50, searchItem);
				SearchSimulation.drawFoundItem(255, 165);
				
				searchSimulateState = 0;
			}else{
				SearchSimulation.drawDefaultElements(value1, value2,value3,value4,value5,value6);
				SearchSimulation.displayProcessState("Compare the search item with the fourth element");
				SearchSimulation.drawTempHolder(365, 50, searchItem);
				drawArrow(context, 402, 100, 402, 175);
				
				searchSimulateState = 10;
				searchSimulateThread = window.setTimeout( function(){ SearchSimulation.searchSimulate(); }, timeInterval);	
			}
		}else if( searchSimulateState == 10 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			if( searchItem == value4 ){
				SearchSimulation.drawDefaultElements(value1, value2,value3,value4,value5,value6);
				SearchSimulation.displayProcessState("The item is found at the fourth location");
				SearchSimulation.drawTempHolder(365, 50, searchItem);
				SearchSimulation.drawFoundItem(355, 165);
				
				searchSimulateState = 0;
			}else{
				SearchSimulation.drawDefaultElements(value1, value2,value3,value4,value5,value6);
				SearchSimulation.displayProcessState("Compare the search item with the fifth element");
				SearchSimulation.drawTempHolder(465, 50, searchItem);
				drawArrow(context, 502, 100, 502, 175);
				
				searchSimulateState = 11;
				searchSimulateThread = window.setTimeout( function(){ SearchSimulation.searchSimulate(); }, timeInterval);	
			}
		}else if( searchSimulateState == 11 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			if( searchItem == value5 ){
				SearchSimulation.drawDefaultElements(value1, value2,value3,value4,value5,value6);
				SearchSimulation.displayProcessState("The item is found at the fifth location");
				SearchSimulation.drawTempHolder(465, 50, searchItem);
				SearchSimulation.drawFoundItem(455, 165);
				
				searchSimulateState = 0;
			}else{
				SearchSimulation.drawDefaultElements(value1, value2,value3,value4,value5,value6);
				SearchSimulation.displayProcessState("Compare the search item with the sixth element");
				SearchSimulation.drawTempHolder(565, 50, searchItem);
				drawArrow(context, 602, 100, 602, 175);
				
				searchSimulateState = 12;
				searchSimulateThread = window.setTimeout( function(){ SearchSimulation.searchSimulate(); }, timeInterval);	
			}
		}else if( searchSimulateState == 12 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			if( searchItem == value6 ){
				SearchSimulation.drawDefaultElements(value1, value2,value3,value4,value5,value6);
				SearchSimulation.displayProcessState("The item is found at the sixth location");
				SearchSimulation.drawTempHolder(565, 50, searchItem);
				SearchSimulation.drawFoundItem(555, 165);
				
				searchSimulateState = 0;
			}else{
				SearchSimulation.drawDefaultElements(value1, value2,value3,value4,value5,value6);
				SearchSimulation.displayProcessState("Item is not found");
				
				searchSimulateState = 0;
			}
		}else{
			context.clearRect(0, 0, canvas.width, canvas.height);
			searchSimulateState = 0;
		}
	
		$('#searchCanvas').show();
	}
	
	return {
		drawDefaultElements : drawDefaultElements,
		displayProcessState : displayProcessState,
		drawTempHolder : drawTempHolder,
		searchSimulate : searchSimulate,
		drawFoundItem : drawFoundItem
	}
	
})(jQuery, window, document);;