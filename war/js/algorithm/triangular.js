var triangularSimulateState = 0;
var timeInterval = 2000;
var triangularSimulateThread;
var value1,value2,value3,value4,value5,value6;
	
$(document).ready(function(){
	
	
	$(document).on('click', '#Triangular-Series', function(){
		console.log(triangularSimulateThread);
		clearTimeout(triangularSimulateThread);
		//$('ul.navbar-nav li').removeClass('active');
		//$('#nav-Courses').addClass('active');
		
		$('.dv-triangular-input').show();
		$('#triangularModal .modal-footer').show();
		$('#triangularCanvas').hide();
		$('#triangular-error').html("").hide();
		$('#triangularIP1').val('0');
		$('#triangularIP2').val('1');
		$('#triangularModal .modal-dialog').width(600);
		showModal('triangularModal');
		
	});
	
	$(document).on('click', '#triangular-Simulate', function(){
		$('#triangular-error').html("").hide();
		$('#triangularIP1').val('0');
		$('#triangularIP2').val('1');
		value1 = $('#triangularIP1').val();
		value2 = $('#triangularIP2').val();
		if( !isNumber(value1) || !isNumber(value2) ){
			$('#triangular-error').html("Please fill all the fields(Numeric)!").show();
		}else{
			value1 = Number(value1);
			value2 = Number(value2);
			
			$('.dv-triangular-input').hide();
			$('#triangularModal .modal-footer').hide();
			$('#triangularModal .modal-dialog').width(850);
			
			triangularSimulateState = 0;
			TriangularSimulation.triangularSimulate();
		}
		
	});
	
});

var TriangularSimulation = (function($, window, document, undefined) {
	
	var canvas = document.getElementById("triangularCanvas");
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
	var smallFont = "bold 18px 'Times New Roman', Times, serif";
	var numericalSeries = new Array("0","1","2","3","4","5");
	
	function drawNumercalSeries(rect1, rect2, rect3, rect4, rect5, rect6){
		context.beginPath();
		context.lineWidth = "2";
		context.strokeStyle = strokeColor;
		context.font = smallFont;
		context.fillText("Numerical Series", 280, 30);
		context.fillText("0", 95,55);
		context.fillText("1", 195,55);
		context.fillText("2", 295,55);
		context.fillText("3", 395,55);
		context.fillText("4", 495,55);
		context.fillText("5", 595,55);
		if( rect1 ){
			context.rect(92, 41, 16, 16);
		}
		if( rect2 ){
			context.rect(192, 41, 16, 16);
		}
		if( rect3 ){
			context.rect(292, 41, 16, 16);
		}
		if( rect4 ){
			context.rect(392, 41, 16, 16);
		}
		if( rect5 ){
			context.rect(492, 41, 16, 16);
		}
		if( rect6 ){
			context.rect(592, 41, 16, 16);
		}
		
		context.stroke();
	}
	
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
	function triangularSimulate(){
	
		if( triangularSimulateState == 0 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			triangularSimulateState = 1;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 1 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			
			triangularSimulateState = 2;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 2 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			TriangularSimulation.drawDefaultElements('','','','','','');
			TriangularSimulation.displayProcessState("");
			
			triangularSimulateState = 3;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 3 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(true, true, false, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,'','','','');
			drawArrow(context, 100, 58, 100, 75);
			drawArrow(context, 200, 58, 200, 75);
			TriangularSimulation.displayProcessState("Default value of series 0,1");
			
			triangularSimulateState = 4;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 4 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,'','','','');
			TriangularSimulation.displayProcessState("");
			context.beginPath();
			context.font = smallFont;
			context.strokeStyle = strokeColor;
			context.lineWidth = processBarLineWidth;
			context.fillText("Next value = (Current value + Next value in series)", 160, 230);
			context.stroke();
			
			triangularSimulateState = 5;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 5 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,'','','','');
			TriangularSimulation.displayProcessState("Create Temporary holder");
			TriangularSimulation.drawTempHolder(165, 225, '');
			
			triangularSimulateState = 6;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 6 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,'','','','');
			TriangularSimulation.displayProcessState("Take the current value");
			drawArrow(context, 202, 125, 202, 225);
			TriangularSimulation.drawTempHolder(165, 225, value2);
			
			triangularSimulateState = 7;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 7 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,'','','','');
			TriangularSimulation.displayProcessState("Create Temporary holder");
			TriangularSimulation.drawTempHolder(165, 225, value2);
			TriangularSimulation.drawTempHolder(265, 225, '');
			
			triangularSimulateState = 8;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 8 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, true, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,'','','','');
			TriangularSimulation.displayProcessState("Take the Next value of the series");
			TriangularSimulation.drawTempHolder(165, 225, value2);
			drawArrow(context, 300, 58, 300, 225);
			TriangularSimulation.drawTempHolder(265, 225, numericalSeries[2]);
			
			triangularSimulateState = 9;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 9 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,'','','','');
			TriangularSimulation.displayProcessState("Add current value with next value of the series");
			TriangularSimulation.drawTempHolder(165, 225, value2);
			TriangularSimulation.drawText("+", 245, 260);
			TriangularSimulation.drawTempHolder(265, 225, numericalSeries[2]);
			
			triangularSimulateState = 10;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 10 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,'','','','');
			TriangularSimulation.displayProcessState("Next value is found");
			TriangularSimulation.drawTempHolder(165, 225, value2);
			TriangularSimulation.drawText("+", 245, 260);
			TriangularSimulation.drawTempHolder(265, 225, numericalSeries[2]);
			TriangularSimulation.drawText("=", 345, 260);
			value3 = Number(value2)+Number(numericalSeries[2]);
			TriangularSimulation.drawTempHolder(365, 225, value3);
			
			triangularSimulateState = 11;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 11 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,'','','','');
			TriangularSimulation.displayProcessState("Make this value as the new current value of the Triangular series");
			TriangularSimulation.drawTempHolder(165, 225, value2);
			TriangularSimulation.drawText("+", 245, 260);
			TriangularSimulation.drawTempHolder(265, 225, numericalSeries[2]);
			TriangularSimulation.drawText("=", 345, 260);
			TriangularSimulation.drawTempHolder(365, 225, '');
			drawArrow(context, 402, 225, 302, 125);
			TriangularSimulation.drawText(value3, 295, 108);
			
			triangularSimulateState = 12;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 12 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,value3,'','','');
			TriangularSimulation.displayProcessState("Create Temporary holder");
			TriangularSimulation.drawTempHolder(265, 225, '');
			
			triangularSimulateState = 13;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 13 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,value3,'','','');
			TriangularSimulation.displayProcessState("Take the current value");
			drawArrow(context, 302, 125, 302, 225);
			TriangularSimulation.drawTempHolder(265, 225, value3);
			
			triangularSimulateState = 14;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 14 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,value3,'','','');
			TriangularSimulation.displayProcessState("Create Temporary holder");
			TriangularSimulation.drawTempHolder(265, 225, value3);
			TriangularSimulation.drawTempHolder(365, 225, '');
			
			triangularSimulateState = 15;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 15 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, true, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,value3,'','','');
			TriangularSimulation.displayProcessState("Take the Next value of the series");
			TriangularSimulation.drawTempHolder(265, 225, value3);
			drawArrow(context, 400, 58, 400, 225);
			TriangularSimulation.drawTempHolder(365, 225, numericalSeries[3]);
			
			triangularSimulateState = 16;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 16 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,value3,'','','');
			TriangularSimulation.displayProcessState("Add current value with next value of the series");
			TriangularSimulation.drawTempHolder(265, 225, value3);
			TriangularSimulation.drawText("+", 345, 260);
			TriangularSimulation.drawTempHolder(365, 225, numericalSeries[3]);
			
			triangularSimulateState = 17;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 17 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,value3,'','','');
			TriangularSimulation.displayProcessState("Next value is found");
			TriangularSimulation.drawTempHolder(265, 225, value3);
			TriangularSimulation.drawText("+", 345, 260);
			TriangularSimulation.drawTempHolder(365, 225, numericalSeries[3]);
			TriangularSimulation.drawText("=", 445, 260);
			value4 = Number(value3)+Number(numericalSeries[3]);
			TriangularSimulation.drawTempHolder(465, 225, value4);
			
			triangularSimulateState = 18;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 18 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,value3,'','','');
			TriangularSimulation.displayProcessState("Make this value as the new current value of the Triangular series");
			TriangularSimulation.drawTempHolder(265, 225, value3);
			TriangularSimulation.drawText("+", 345, 260);
			TriangularSimulation.drawTempHolder(365, 225, numericalSeries[3]);
			TriangularSimulation.drawText("=", 445, 260);
			value4 = Number(value3)+Number(numericalSeries[3]);
			TriangularSimulation.drawTempHolder(465, 225, '');
			drawArrow(context, 502, 225, 402, 125);
			TriangularSimulation.drawText(value4, 395, 108);
			
			triangularSimulateState = 19;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 19 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,value3,value4,'','');
			TriangularSimulation.displayProcessState("Create Temporary holder");
			TriangularSimulation.drawTempHolder(365, 225, '');
			
			triangularSimulateState = 20;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 20 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,value3,value4,'','');
			TriangularSimulation.displayProcessState("Take the current value");
			drawArrow(context, 402, 125, 402, 225);
			TriangularSimulation.drawTempHolder(365, 225, value4);
			
			triangularSimulateState = 21;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 21 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,value3,value4,'','');
			TriangularSimulation.displayProcessState("Create Temporary holder");
			TriangularSimulation.drawTempHolder(365, 225, value4);
			TriangularSimulation.drawTempHolder(465, 225, '');
			
			triangularSimulateState = 22;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 22 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, true, false);
			TriangularSimulation.drawDefaultElements(value1, value2,value3,value4,'','');
			TriangularSimulation.displayProcessState("Take the Next value of the series");
			TriangularSimulation.drawTempHolder(365, 225, value4);
			drawArrow(context, 500, 58, 500, 225);
			TriangularSimulation.drawTempHolder(465, 225, numericalSeries[4]);
			
			triangularSimulateState = 23;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 23 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,value3,value4,'','');
			TriangularSimulation.displayProcessState("Add current value with next value of the series");
			TriangularSimulation.drawTempHolder(365, 225, value4);
			TriangularSimulation.drawText("+", 445, 260);
			TriangularSimulation.drawTempHolder(465, 225, numericalSeries[4]);
			
			triangularSimulateState = 24;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 24 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,value3,value4,'','');
			TriangularSimulation.displayProcessState("Next value is found");
			TriangularSimulation.drawTempHolder(365, 225, value4);
			TriangularSimulation.drawText("+", 445, 260);
			TriangularSimulation.drawTempHolder(465, 225, numericalSeries[4]);
			TriangularSimulation.drawText("=", 545, 260);
			value5 = Number(value4)+Number(numericalSeries[4]);
			TriangularSimulation.drawTempHolder(565, 225, value5);
			
			triangularSimulateState = 25;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 25 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,value3,value4,'','');
			TriangularSimulation.displayProcessState("Make this value as the new current value of the Triangular series");
			TriangularSimulation.drawTempHolder(365, 225, value4);
			TriangularSimulation.drawText("+", 445, 260);
			TriangularSimulation.drawTempHolder(465, 225, numericalSeries[4]);
			TriangularSimulation.drawText("=", 545, 260);
			TriangularSimulation.drawTempHolder(565, 225, '');
			drawArrow(context, 602, 225, 502, 125);
			TriangularSimulation.drawText(value5, 495, 108);
			
			triangularSimulateState = 26;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 26 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,value3,value4,value5,'');
			TriangularSimulation.displayProcessState("Create Temporary holder");
			TriangularSimulation.drawTempHolder(465, 225, '');
			
			triangularSimulateState = 27;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 27 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,value3,value4,value5,'');
			TriangularSimulation.displayProcessState("Take the current value");
			drawArrow(context, 502, 125, 502, 225);
			TriangularSimulation.drawTempHolder(465, 225, value5);
			
			triangularSimulateState = 28;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 28 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,value3,value4,value5,'');
			TriangularSimulation.displayProcessState("Create Temporary holder");
			TriangularSimulation.drawTempHolder(465, 225, value5);
			TriangularSimulation.drawTempHolder(565, 225, '');
			
			triangularSimulateState = 29;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 29 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, true);
			TriangularSimulation.drawDefaultElements(value1, value2,value3,value4,value5,'');
			TriangularSimulation.displayProcessState("Take the Next value of the series");
			TriangularSimulation.drawTempHolder(465, 225, value5);
			drawArrow(context, 600, 58, 600, 225);
			TriangularSimulation.drawTempHolder(565, 225, numericalSeries[5]);
			
			triangularSimulateState = 30;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 30 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,value3,value4,value5,'');
			TriangularSimulation.displayProcessState("Add current value with next value of the series");
			TriangularSimulation.drawTempHolder(465, 225, value5);
			TriangularSimulation.drawText("+", 545, 260);
			TriangularSimulation.drawTempHolder(565, 225, numericalSeries[5]);
			
			triangularSimulateState = 31;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 31 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,value3,value4,value5,'');
			TriangularSimulation.displayProcessState("Next value is found");
			TriangularSimulation.drawTempHolder(465, 225, value5);
			TriangularSimulation.drawText("+", 545, 260);
			TriangularSimulation.drawTempHolder(565, 225, numericalSeries[5]);
			TriangularSimulation.drawText("=", 645, 260);
			value6 = Number(value5)+Number(numericalSeries[5]);
			TriangularSimulation.drawTempHolder(665, 225, value6);
			
			triangularSimulateState = 32;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 32 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,value3,value4,value5,'');
			TriangularSimulation.displayProcessState("Make this value as the new current value of the Triangular series");
			TriangularSimulation.drawTempHolder(465, 225, value5);
			TriangularSimulation.drawText("+", 545, 260);
			TriangularSimulation.drawTempHolder(565, 225, numericalSeries[5]);
			TriangularSimulation.drawText("=", 645, 260);
			TriangularSimulation.drawTempHolder(665, 225, '');
			drawArrow(context, 702, 225, 602, 125);
			TriangularSimulation.drawText(value6, 595, 108);
			
			triangularSimulateState = 33;
			triangularSimulateThread = window.setTimeout( function(){ TriangularSimulation.triangularSimulate(); }, timeInterval);
		}else if( triangularSimulateState == 33 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			TriangularSimulation.drawNumercalSeries(false, false, false, false, false, false);
			TriangularSimulation.drawDefaultElements(value1, value2,value3,value4,value5,value6);
			context.beginPath();
			context.font = smallFont;
			context.strokeStyle = strokeColor;
			context.lineWidth = processBarLineWidth;
			context.rect(50, 220, processBarWidth, processBarHeight);//process bar
			context.fillText("The Triangular series is " + value1 + ", " + value2 + ", " + value3 + ", " + value4 + ", " + value5 + ", " + value6 + ", ..." , 180, 250);//process state
			context.stroke();
			
			triangularSimulateState = 0;
		}else{
			context.clearRect(0, 0, canvas.width, canvas.height);
			triangularSimulateState = 0;
		}
	
		$('#triangularCanvas').show();
	}
	
	return {
		drawNumercalSeries : drawNumercalSeries,
		drawDefaultElements : drawDefaultElements,
		displayProcessState : displayProcessState,
		drawTempHolder : drawTempHolder,
		drawText : drawText,
		triangularSimulate : triangularSimulate,
	}
	
})(jQuery, window, document);;