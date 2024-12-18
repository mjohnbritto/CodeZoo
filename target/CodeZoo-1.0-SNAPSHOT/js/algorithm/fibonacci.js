var fibonacciSimulateState = 0;
var timeInterval = 2000;
var fibonacciSimulateThread;
var value1,value2,value3,value4,value5,value6;
	
$(document).ready(function(){
	
	
	$(document).on('click', '#Fibonacci-Series', function(){
		console.log(fibonacciSimulateThread);
		clearTimeout(fibonacciSimulateThread);
		//$('ul.navbar-nav li').removeClass('active');
		//$('#nav-Courses').addClass('active');
		
		$('.dv-fibonacci-input').show();
		$('#fibonacciModal .modal-footer').show();
		$('#fibonacciCanvas').hide();
		$('#fibonacci-error').html("").hide();
		$('#fibonacciIP1').val('0');
		$('#fibonacciIP2').val('1');
		$('#fibonacciModal .modal-dialog').width(600);
		showModal('fibonacciModal');
		
	});
	
	$(document).on('click', '#fibonacci-Simulate', function(){
		$('#fibonacci-error').html("").hide();
		$('#fibonacciIP1').val('0');
		$('#fibonacciIP2').val('1');
		value1 = $('#fibonacciIP1').val();
		value2 = $('#fibonacciIP2').val();
		if( !isNumber(value1) || !isNumber(value2) ){
			$('#fibonacci-error').html("Please fill all the fields(Numeric)!").show();
		}else{
			value1 = Number(value1);
			value2 = Number(value2);
			
			$('.dv-fibonacci-input').hide();
			$('#fibonacciModal .modal-footer').hide();
			$('#fibonacciModal .modal-dialog').width(800);
			
			fibonacciSimulateState = 1;
			FiboSimulation.fibonacciSimulate();
		}
		
	});
	
});

var FiboSimulation = (function($, window, document, undefined) {
	
	var canvas = document.getElementById("fibonacciCanvas");
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
		context.rect(65, 75, boxWidth, boxHeight);
		context.rect(165, 75, boxWidth, boxHeight);
		context.rect(265, 75, boxWidth, boxHeight);
		context.rect(365, 75, boxWidth, boxHeight);
		context.rect(465, 75, boxWidth, boxHeight);
		context.rect(565, 75, boxWidth, boxHeight);
		if( !isEmptyString(val1) ){
			context.fillText(val1, 95,108);
		}
		if( !isEmptyString(val2) ){
			context.fillText(val2, 195,108);
		}
		if( !isEmptyString(val3) ){
			context.fillText(val3, 295,108);
		}
		if( !isEmptyString(val4) ){
			context.fillText(val4, 395,108);
		}
		if( !isEmptyString(val5) ){
			context.fillText(val5, 495,108);
		}
		if( !isEmptyString(val6) ){
			context.fillText(val6, 595,108);
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
	
	function drawText(text, x, y){
		context.beginPath();
		context.font = font;
		context.fillText(text, x, y);
		context.stroke();
	}
	function fibonacciSimulate(){
	
		if( fibonacciSimulateState == 1 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			fibonacciSimulateState = 2;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 2 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements('','','','','','');
			FiboSimulation.displayProcessState("");
			
			fibonacciSimulateState = 3;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 3 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,'','','','');
			FiboSimulation.displayProcessState("Default value of series 0,1");
			
			fibonacciSimulateState = 4;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 4 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,'','','','');
			FiboSimulation.displayProcessState("");
			context.beginPath();
			context.font = smallFont;
			context.strokeStyle = strokeColor;
			context.lineWidth = processBarLineWidth;
			context.fillText("Next value = (Previous value + Current value)", 200, 230);
			context.stroke();
			
			fibonacciSimulateState = 5;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 5 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,'','','','');
			FiboSimulation.displayProcessState("Create Temporary holder");
			FiboSimulation.drawTempHolder(65, 225, '');
			
			fibonacciSimulateState = 6;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 6 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,'','','','');
			FiboSimulation.displayProcessState("Take the previous value");
			drawArrow(context, 102, 125, 102, 225);
			FiboSimulation.drawTempHolder(65, 225, value1);
			
			fibonacciSimulateState = 7;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 7 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,'','','','');
			FiboSimulation.displayProcessState("Create Temporary holder");
			FiboSimulation.drawTempHolder(65, 225, value1);
			FiboSimulation.drawTempHolder(165, 225, '');
			
			fibonacciSimulateState = 8;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 8 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,'','','','');
			FiboSimulation.displayProcessState("Take the current value");
			FiboSimulation.drawTempHolder(65, 225, value1);
			drawArrow(context, 202, 125, 202, 225);
			FiboSimulation.drawTempHolder(165, 225, value2);
			
			fibonacciSimulateState = 9;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 9 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,'','','','');
			FiboSimulation.displayProcessState("Add previous value with current value");
			FiboSimulation.drawTempHolder(65, 225, value1);
			FiboSimulation.drawText("+", 145, 260);
			FiboSimulation.drawTempHolder(165, 225, value2);
			
			fibonacciSimulateState = 10;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 10 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,'','','','');
			FiboSimulation.displayProcessState("Next value is found");
			FiboSimulation.drawTempHolder(65, 225, value1);
			FiboSimulation.drawText("+", 145, 260);
			FiboSimulation.drawTempHolder(165, 225, value2);
			FiboSimulation.drawText("=", 245, 260);
			value3 = Number(value1)+Number(value2);
			FiboSimulation.drawTempHolder(265, 225, value3);
			
			fibonacciSimulateState = 11;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 11 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,'','','','');
			FiboSimulation.displayProcessState("Replace current value with the new one found");
			FiboSimulation.drawTempHolder(65, 225, value1);
			FiboSimulation.drawText("+", 145, 260);
			FiboSimulation.drawTempHolder(165, 225, value2);
			FiboSimulation.drawText("=", 245, 260);
			FiboSimulation.drawTempHolder(265, 225, '');
			drawArrow(context, 302, 225, 302, 125);
			FiboSimulation.drawText(value3, 295, 108);
			
			fibonacciSimulateState = 12;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 12 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,value3,'','','');
			FiboSimulation.displayProcessState("Create Temporary holder");
			FiboSimulation.drawTempHolder(165, 225, '');
			
			fibonacciSimulateState = 13;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 13 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,value3,'','','');
			FiboSimulation.displayProcessState("Take the previous value");
			drawArrow(context, 202, 125, 202, 225);
			FiboSimulation.drawTempHolder(165, 225, value2);
			
			fibonacciSimulateState = 14;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 14 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,value3,'','','');
			FiboSimulation.displayProcessState("Create Temporary holder");
			FiboSimulation.drawTempHolder(165, 225, value2);
			FiboSimulation.drawTempHolder(265, 225, '');
			
			fibonacciSimulateState = 15;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 15 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,value3,'','','');
			FiboSimulation.displayProcessState("Take the current value");
			FiboSimulation.drawTempHolder(165, 225, value2);
			drawArrow(context, 302, 125, 302, 225);
			FiboSimulation.drawTempHolder(265, 225, value3);
			
			fibonacciSimulateState = 16;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 16 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,value3,'','','');
			FiboSimulation.displayProcessState("Add previous value with current value");
			FiboSimulation.drawTempHolder(165, 225, value2);
			FiboSimulation.drawText("+", 245, 260);
			FiboSimulation.drawTempHolder(265, 225, value3);
			
			fibonacciSimulateState = 17;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 17 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,value3,'','','');
			FiboSimulation.displayProcessState("Next value is found");
			FiboSimulation.drawTempHolder(165, 225, value2);
			FiboSimulation.drawText("+", 245, 260);
			FiboSimulation.drawTempHolder(265, 225, value3);
			FiboSimulation.drawText("=", 345, 260);
			value4 = Number(value2)+Number(value3);
			FiboSimulation.drawTempHolder(365, 225, value4);
			
			fibonacciSimulateState = 18;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 18 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,value3,'','','');
			FiboSimulation.displayProcessState("Replace current value with the new one found");
			FiboSimulation.drawTempHolder(165, 225, value2);
			FiboSimulation.drawText("+", 245, 260);
			FiboSimulation.drawTempHolder(265, 225, value3);
			FiboSimulation.drawText("=", 345, 260);
			FiboSimulation.drawTempHolder(365, 225, '');
			drawArrow(context, 402, 225, 402, 125);
			FiboSimulation.drawText(value4, 395, 108);
			
			fibonacciSimulateState = 19;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 19 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,value3,value4,'','');
			FiboSimulation.displayProcessState("Create Temporary holder");
			FiboSimulation.drawTempHolder(265, 225, '');
			
			fibonacciSimulateState = 20;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 20 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,value3,value4,'','');
			FiboSimulation.displayProcessState("Take the previous value");
			drawArrow(context, 302, 125, 302, 225);
			FiboSimulation.drawTempHolder(265, 225, value3);
			
			fibonacciSimulateState = 21;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 21 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,value3,value4,'','');
			FiboSimulation.displayProcessState("Create Temporary holder");
			FiboSimulation.drawTempHolder(265, 225, value3);
			FiboSimulation.drawTempHolder(365, 225, '');
			
			fibonacciSimulateState = 22;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 22 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,value3,value4,'','');
			FiboSimulation.displayProcessState("Take the current value");
			FiboSimulation.drawTempHolder(265, 225, value3);
			drawArrow(context, 402, 125, 402, 225);
			FiboSimulation.drawTempHolder(365, 225, value4);
			
			fibonacciSimulateState = 23;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 23 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,value3,value4,'','');
			FiboSimulation.displayProcessState("Add previous value with current value");
			FiboSimulation.drawTempHolder(265, 225, value3);
			FiboSimulation.drawText("+", 345, 260);
			FiboSimulation.drawTempHolder(365, 225, value4);
			
			fibonacciSimulateState = 24;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 24 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,value3,value4,'','');
			FiboSimulation.displayProcessState("Next value is found");
			FiboSimulation.drawTempHolder(265, 225, value3);
			FiboSimulation.drawText("+", 345, 260);
			FiboSimulation.drawTempHolder(365, 225, value4);
			FiboSimulation.drawText("=", 445, 260);
			value5 = Number(value3)+Number(value4);
			FiboSimulation.drawTempHolder(465, 225, value5);
			
			fibonacciSimulateState = 25;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 25 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,value3,value4,'','');
			FiboSimulation.displayProcessState("Replace current value with the new one found");
			FiboSimulation.drawTempHolder(265, 225, value3);
			FiboSimulation.drawText("+", 345, 260);
			FiboSimulation.drawTempHolder(365, 225, value4);
			FiboSimulation.drawText("=", 445, 260);
			FiboSimulation.drawTempHolder(465, 225, '');
			drawArrow(context, 502, 225, 502, 125);
			FiboSimulation.drawText(value5, 495, 108);
			
			fibonacciSimulateState = 26;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 26 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,value3,value4,value5,'');
			FiboSimulation.displayProcessState("Create Temporary holder");
			FiboSimulation.drawTempHolder(365, 225, '');
			
			fibonacciSimulateState = 27;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 27 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,value3,value4,value5,'');
			FiboSimulation.displayProcessState("Take the previous value");
			drawArrow(context, 402, 125, 402, 225);
			FiboSimulation.drawTempHolder(365, 225, value4);
			
			fibonacciSimulateState = 28;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 28 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,value3,value4,value5,'');
			FiboSimulation.displayProcessState("Create Temporary holder");
			FiboSimulation.drawTempHolder(365, 225, value4);
			FiboSimulation.drawTempHolder(465, 225, '');
			
			fibonacciSimulateState = 29;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 29 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,value3,value4,value5,'');
			FiboSimulation.displayProcessState("Take the current value");
			FiboSimulation.drawTempHolder(365, 225, value4);
			drawArrow(context, 502, 125, 502, 225);
			FiboSimulation.drawTempHolder(465, 225, value5);
			
			fibonacciSimulateState = 30;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 30 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,value3,value4,value5,'');
			FiboSimulation.displayProcessState("Add previous value with current value");
			FiboSimulation.drawTempHolder(365, 225, value4);
			FiboSimulation.drawText("+", 445, 260);
			FiboSimulation.drawTempHolder(465, 225, value5);
			
			fibonacciSimulateState = 31;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 31 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,value3,value4,value5,'');
			FiboSimulation.displayProcessState("Next value is found");
			FiboSimulation.drawTempHolder(365, 225, value4);
			FiboSimulation.drawText("+", 445, 260);
			FiboSimulation.drawTempHolder(465, 225, value5);
			FiboSimulation.drawText("=", 545, 260);
			value6 = Number(value4)+Number(value5);
			FiboSimulation.drawTempHolder(565, 225, value6);
			
			fibonacciSimulateState = 32;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 32 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,value3,value4,value5,'');
			FiboSimulation.displayProcessState("Replace current value with the new one found");
			FiboSimulation.drawTempHolder(365, 225, value4);
			FiboSimulation.drawText("+", 445, 260);
			FiboSimulation.drawTempHolder(465, 225, value5);
			FiboSimulation.drawText("=", 545, 260);
			FiboSimulation.drawTempHolder(565, 225, '');
			drawArrow(context, 602, 225, 602, 125);
			FiboSimulation.drawText(value6, 595, 108);
			
			fibonacciSimulateState = 33;
			fibonacciSimulateThread = window.setTimeout( function(){ FiboSimulation.fibonacciSimulate(); }, timeInterval);
		}else if( fibonacciSimulateState == 33 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			FiboSimulation.drawDefaultElements(value1, value2,value3,value4,value5,value6);
			context.beginPath();
			context.font = smallFont;
			context.strokeStyle = strokeColor;
			context.lineWidth = processBarLineWidth;
			context.rect(50, 220, processBarWidth, processBarHeight);//process bar
			context.fillText("The Fibonacci series is " + value1 + ", " + value2 + ", " + value3 + ", " + value4 + ", " + value5 + ", " + value6 +", ...", 220, 250);//process state
			context.stroke();
			
			fibonacciSimulateState = 0;
		}else{
			context.clearRect(0, 0, canvas.width, canvas.height);
			fibonacciSimulateState = 0;
		}
	
		$('#fibonacciCanvas').show();
	}
	
	return {
		drawDefaultElements : drawDefaultElements,
		displayProcessState : displayProcessState,
		drawTempHolder : drawTempHolder,
		drawText : drawText,
		fibonacciSimulate : fibonacciSimulate,
	}
	
})(jQuery, window, document);;