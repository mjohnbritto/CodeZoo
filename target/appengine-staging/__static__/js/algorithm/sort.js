var sortSimulateState = 0;
var timeInterval = 2000;
var sortSimulateThread, sortSimulateInnerState;
var value1,value2,value3,value4,value5,value6;
	
$(document).ready(function(){
	
	
	$(document).on('click', '#Sort', function(){
		console.log(sortSimulateThread);
		clearTimeout(sortSimulateThread);
		//$('ul.navbar-nav li').removeClass('active');
		//$('#nav-Courses').addClass('active');
		
		$('.dv-sort-input').show();
		$('#sortModal .modal-footer').show();
		$('#sortCanvas').hide();
		$('#sort-error').html("").hide();
		$('#sortModal .modal-dialog').width(700);
		showModal('sortModal');
		
		$('#sortIP1, #sortIP2, #sortIP3, #sortIP4, #sortIP5, #sortIP6').val('');
	});
	
	$(document).on('click', '#sort-Simulate', function(){
		$('#sort-error').html("").hide();
		value1 = $('#sortIP1').val();
		value2 = $('#sortIP2').val();
		value3 = $('#sortIP3').val();
		value4 = $('#sortIP4').val();
		value5 = $('#sortIP5').val();
		value6 = $('#sortIP6').val();
		if( !isNumber(value1) || !isNumber(value2) || !isNumber(value3) || !isNumber(value4) || !isNumber(value5) || !isNumber(value6) ){
			$('#sort-error').html("Please fill all the fields(Numeric)!").show();
		}else{
			value1 = Number(value1);
			value2 = Number(value2);
			value3 = Number(value3);
			value4 = Number(value4);
			value5 = Number(value5);
			value6 = Number(value6);
			
			$('.dv-sort-input').hide();
			$('#sortModal .modal-footer').hide();
			$('#sortModal .modal-dialog').width(800);
			
			sortSimulateState = 1;
			SortSimulation.sortSimulate();
		}
	});
	
});

var SortSimulation = (function($, window, document, undefined) {
	
	var canvas = document.getElementById("sortCanvas");
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
	
	function drawText(text, x, y){
		context.beginPath();
		context.font = font;
		context.fillText(text, x, y);
		context.stroke();
	}
	function sortSimulate(){
	
		if( sortSimulateState == 1 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			sortSimulateState = 2;
			sortSimulateThread = window.setTimeout( function(){ SortSimulation.sortSimulate(); }, timeInterval);
		}else if( sortSimulateState == 2 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			SortSimulation.drawDefaultElements('','','','','','');
			SortSimulation.displayProcessState("");
			
			sortSimulateState = 3;
			sortSimulateThread = window.setTimeout( function(){ SortSimulation.sortSimulate(); }, timeInterval);
		}else if( sortSimulateState == 3 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			SortSimulation.drawDefaultElements(value1, value2,value3,value4,value5,value6);
			SortSimulation.displayProcessState("The given elements to sort");
			
			sortSimulateState = 4;
			sortSimulateThread = window.setTimeout( function(){ SortSimulation.sortSimulate(); }, timeInterval);
		}else if( sortSimulateState == 4 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			SortSimulation.drawDefaultElements(value1,'',value3,value4,value5,value6);
			SortSimulation.displayProcessState("Take the Second element");
			drawArrow(context, 200, 175, 145, 100);
			SortSimulation.drawTempHolder(110, 50, value2);
			
			sortSimulateState = 5;
			sortSimulateThread = window.setTimeout( function(){ SortSimulation.sortSimulate(); }, timeInterval);
		}else if( sortSimulateState == 5 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			SortSimulation.drawDefaultElements(value1, '',value3,value4,value5,value6);
			SortSimulation.displayProcessState("Compare the Second element with First element");
			SortSimulation.drawTempHolder(110, 50, value2);
			drawDashedArrow(context, 145, 100, 100, 175);
			
			sortSimulateState = 6;
			sortSimulateThread = window.setTimeout( function(){ SortSimulation.sortSimulate(); }, timeInterval);
		}else if( sortSimulateState == 6 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			if( value1 > value2 ){
				var temp = value1;
				value1 = value2;
				value2 = temp;
				SortSimulation.drawDefaultElements('',value2,value3,value4,value5,value6);
				SortSimulation.displayProcessState("Since First element is bigger, moving that to the Second position");
				SortSimulation.drawTempHolder(110, 50, value1);
				drawDashedArrow(context, 145, 100, 100, 175);
				drawArrow(context, 140, 200, 165, 200);
				
				sortSimulateInnerState = 1;
			}else if( sortSimulateInnerState == 1 ){
				SortSimulation.drawDefaultElements(value1,value2,value3,value4,value5,value6);
				SortSimulation.displayProcessState("Moving the temp element to the First position");
				SortSimulation.drawTempHolder(110, 50, '');
				drawArrow(context, 145, 100, 100, 175);
				
				sortSimulateInnerState = 0;
				sortSimulateState = 7;
			}else{
				SortSimulation.drawDefaultElements(value1,value2,value3,value4,value5,value6);
				SortSimulation.displayProcessState("Since First element is smaller, No change");
				SortSimulation.drawTempHolder(110, 50, '');
				drawArrow(context, 145, 100, 200, 175);
				
				sortSimulateState = 7;
			}
			sortSimulateThread = window.setTimeout( function(){ SortSimulation.sortSimulate(); }, timeInterval);
			
		}else if( sortSimulateState == 7 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			SortSimulation.drawDefaultElements(value1,value2,value3,value4,value5,value6);
			SortSimulation.displayProcessState("First iteration is over");
			
			sortSimulateState = 8;
			sortSimulateThread = window.setTimeout( function(){ SortSimulation.sortSimulate(); }, timeInterval);
		}else if( sortSimulateState == 8 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			SortSimulation.drawDefaultElements(value1,value2,'',value4,value5,value6);
			SortSimulation.displayProcessState("Take the Third element");
			drawArrow(context, 300, 175, 245, 100);
			SortSimulation.drawTempHolder(210, 50, value3);
			
			sortSimulateState = 9;
			sortSimulateThread = window.setTimeout( function(){ SortSimulation.sortSimulate(); }, timeInterval);
		}else if( sortSimulateState == 9 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			SortSimulation.drawDefaultElements(value1,value2,'',value4,value5,value6);
			SortSimulation.displayProcessState("Compare the Third element with Second element");
			SortSimulation.drawTempHolder(210, 50, value3);
			drawDashedArrow(context, 245, 100, 200, 175);
			
			sortSimulateState = 10;
			sortSimulateThread = window.setTimeout( function(){ SortSimulation.sortSimulate(); }, timeInterval);
		}else if( sortSimulateState == 10 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			if( value2 > value3 ){
				var temp = value2;
				value2 = value3;
				value3 = temp;
				SortSimulation.drawDefaultElements(value1,'',value3,value4,value5,value6);
				SortSimulation.displayProcessState("Since Second element is bigger, moving that to the Third position");
				SortSimulation.drawTempHolder(210, 50, value2);
				drawDashedArrow(context, 245, 100, 200, 175);
				drawArrow(context, 240, 200, 265, 200);
				
				sortSimulateInnerState = 1;
			}else if( value1 > value2 ){
				var temp = value1;
				value1 = value2;
				value2 = temp;
				SortSimulation.drawDefaultElements('',value2,value3,value4,value5,value6);
				SortSimulation.displayProcessState("Since First element is bigger, moving that to the Second position");
				SortSimulation.drawTempHolder(210, 50, value1);
				drawDashedArrow(context, 245, 100, 100, 175);
				drawArrow(context, 140, 200, 165, 200);
				
				sortSimulateInnerState = 2;
			}else if( sortSimulateInnerState == 2 ){
				SortSimulation.drawDefaultElements(value1,value2,value3,value4,value5,value6);
				SortSimulation.displayProcessState("Moving the temp element to the First position");
				SortSimulation.drawTempHolder(210, 50, '');
				drawArrow(context, 245, 100, 100, 175);
				
				sortSimulateInnerState = 0;
				sortSimulateState = 11;
			}else if( sortSimulateInnerState == 1 ){
				SortSimulation.drawDefaultElements(value1,value2,value3,value4,value5,value6);
				SortSimulation.displayProcessState("Moving the temp element to the Second position");
				SortSimulation.drawTempHolder(210, 50, '');
				drawArrow(context, 245, 100, 200, 175);
				
				sortSimulateInnerState = 0;
				sortSimulateState = 11;
			}else{
				SortSimulation.drawDefaultElements(value1,value2,value3,value4,value5,value6);
				SortSimulation.displayProcessState("Since Second element is smaller, No change");
				SortSimulation.drawTempHolder(210, 50, '');
				drawArrow(context, 245, 100, 300, 175);
				
				sortSimulateState = 11;
			}
			
			sortSimulateThread = window.setTimeout( function(){ SortSimulation.sortSimulate(); }, timeInterval);
		}else if( sortSimulateState == 11 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			SortSimulation.drawDefaultElements(value1,value2,value3,value4,value5,value6);
			SortSimulation.displayProcessState("Second iteration is over");
			
			sortSimulateState = 12;
			sortSimulateThread = window.setTimeout( function(){ SortSimulation.sortSimulate(); }, timeInterval);
		}else if( sortSimulateState == 12 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			SortSimulation.drawDefaultElements(value1,value2,value3,'',value5,value6);
			SortSimulation.displayProcessState("Take the Fourth element");
			drawArrow(context, 400, 175, 345, 100);
			SortSimulation.drawTempHolder(310, 50, value4);
			
			sortSimulateState = 13;
			sortSimulateThread = window.setTimeout( function(){ SortSimulation.sortSimulate(); }, timeInterval);
		}else if( sortSimulateState == 13 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			SortSimulation.drawDefaultElements(value1,value2,value3,'',value5,value6);
			SortSimulation.displayProcessState("Compare the Fourth element with Third element");
			SortSimulation.drawTempHolder(310, 50, value4);
			drawDashedArrow(context, 345, 100, 300, 175);
			
			sortSimulateState = 14;
			sortSimulateThread = window.setTimeout( function(){ SortSimulation.sortSimulate(); }, timeInterval);
		}else if( sortSimulateState == 14 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			if( value3 > value4 ){
				var temp = value3;
				value3 = value4;
				value4 = temp;
				SortSimulation.drawDefaultElements(value1,value2,'',value4,value5,value6);
				SortSimulation.displayProcessState("Since Third element is bigger, moving that to the Fourth position");
				SortSimulation.drawTempHolder(310, 50, value3);
				drawDashedArrow(context, 345, 100, 300, 175);
				drawArrow(context, 340, 200, 365, 200);
				
				sortSimulateInnerState = 1;
			}else if( value2 > value3 ){
				var temp = value2;
				value2 = value3;
				value3 = temp;
				SortSimulation.drawDefaultElements(value1,'',value3,value4,value5,value6);
				SortSimulation.displayProcessState("Since Second element is bigger, moving that to the Third position");
				SortSimulation.drawTempHolder(310, 50, value2);
				drawDashedArrow(context, 345, 100, 200, 175);
				drawArrow(context, 240, 200, 265, 200);
				
				sortSimulateInnerState = 2;
			}else if( value1 > value2 ){
				var temp = value1;
				value1 = value2;
				value2 = temp;
				SortSimulation.drawDefaultElements('',value2,value3,value4,value5,value6);
				SortSimulation.displayProcessState("Since First element is bigger, moving that to the Second position");
				SortSimulation.drawTempHolder(310, 50, value1);
				drawDashedArrow(context, 345, 100, 100, 175);
				drawArrow(context, 140, 200, 165, 200);
				
				sortSimulateInnerState = 3;
			}else if( sortSimulateInnerState == 3 ){
				SortSimulation.drawDefaultElements(value1,value2,value3,value4,value5,value6);
				SortSimulation.displayProcessState("Moving the temp element to the First position");
				SortSimulation.drawTempHolder(310, 50, '');
				drawArrow(context, 345, 100, 100, 175);
				
				sortSimulateInnerState = 0;
				sortSimulateState = 15;
			}else if( sortSimulateInnerState == 2 ){
				SortSimulation.drawDefaultElements(value1,value2,value3,value4,value5,value6);
				SortSimulation.displayProcessState("Moving the temp element to the Second position");
				SortSimulation.drawTempHolder(310, 50, '');
				drawArrow(context, 345, 100, 200, 175);
				
				sortSimulateInnerState = 0;
				sortSimulateState = 15;
			}else if( sortSimulateInnerState == 1 ){
				SortSimulation.drawDefaultElements(value1,value2,value3,value4,value5,value6);
				SortSimulation.displayProcessState("Moving the temp element to the Third position");
				SortSimulation.drawTempHolder(310, 50, '');
				drawArrow(context, 345, 100, 300, 175);
				
				sortSimulateInnerState = 0;
				sortSimulateState = 15;
			}else{
				SortSimulation.drawDefaultElements(value1,value2,value3,value4,value5,value6);
				SortSimulation.displayProcessState("Since Third element is smaller, No change");
				SortSimulation.drawTempHolder(310, 50, '');
				drawArrow(context, 345, 100, 400, 175);
				
				sortSimulateState = 15;
			}
			
			sortSimulateThread = window.setTimeout( function(){ SortSimulation.sortSimulate(); }, timeInterval);
		}else if( sortSimulateState == 15 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			SortSimulation.drawDefaultElements(value1,value2,value3,value4,value5,value6);
			SortSimulation.displayProcessState("Third iteration is over");
			
			sortSimulateState = 16;
			sortSimulateThread = window.setTimeout( function(){ SortSimulation.sortSimulate(); }, timeInterval);
		}else if( sortSimulateState == 16 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			SortSimulation.drawDefaultElements(value1,value2,value3,value4,'',value6);
			SortSimulation.displayProcessState("Take the Fifth element");
			drawArrow(context, 500, 175, 445, 100);
			SortSimulation.drawTempHolder(410, 50, value5);
			
			sortSimulateState = 17;
			sortSimulateThread = window.setTimeout( function(){ SortSimulation.sortSimulate(); }, timeInterval);
		}else if( sortSimulateState == 17 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			SortSimulation.drawDefaultElements(value1,value2,value3,value4,'',value6);
			SortSimulation.displayProcessState("Compare the Fifth element with Fourth element");
			SortSimulation.drawTempHolder(410, 50, value5);
			drawDashedArrow(context, 445, 100, 400, 175);
			
			sortSimulateState = 18;
			sortSimulateThread = window.setTimeout( function(){ SortSimulation.sortSimulate(); }, timeInterval);
		}else if( sortSimulateState == 18 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			if( value4 > value5 ){
				var temp = value4;
				value4 = value5;
				value5 = temp;
				SortSimulation.drawDefaultElements(value1,value2,value3,'',value5,value6);
				SortSimulation.displayProcessState("Since Fourth element is bigger, moving that to the Fifth position");
				SortSimulation.drawTempHolder(410, 50, value4);
				drawDashedArrow(context, 445, 100, 400, 175);
				drawArrow(context, 440, 200, 465, 200);
				
				sortSimulateInnerState = 1;
			}else if( value3 > value4 ){
				var temp = value3;
				value3 = value4;
				value4 = temp;
				SortSimulation.drawDefaultElements(value1,value2,'',value4,value5,value6);
				SortSimulation.displayProcessState("Since Third element is bigger, moving that to the Fourth position");
				SortSimulation.drawTempHolder(410, 50, value3);
				drawDashedArrow(context, 445, 100, 300, 175);
				drawArrow(context, 340, 200, 365, 200);
				
				sortSimulateInnerState = 2;
			}else if( value2 > value3 ){
				var temp = value2;
				value2 = value3;
				value3 = temp;
				SortSimulation.drawDefaultElements(value1,'',value3,value4,value5,value6);
				SortSimulation.displayProcessState("Since Second element is bigger, moving that to the Third position");
				SortSimulation.drawTempHolder(410, 50, value2);
				drawDashedArrow(context, 445, 100, 200, 175);
				drawArrow(context, 240, 200, 265, 200);
				
				sortSimulateInnerState = 3;
			}else if( value1 > value2 ){
				var temp = value1;
				value1 = value2;
				value2 = temp;
				SortSimulation.drawDefaultElements('',value2,value3,value4,value5,value6);
				SortSimulation.displayProcessState("Since First element is bigger, moving that to the Second position");
				SortSimulation.drawTempHolder(410, 50, value1);
				drawDashedArrow(context, 445, 100, 100, 175);
				drawArrow(context, 140, 200, 165, 200);
				
				sortSimulateInnerState = 4;
			}else if( sortSimulateInnerState == 4 ){
				SortSimulation.drawDefaultElements(value1,value2,value3,value4,value5,value6);
				SortSimulation.displayProcessState("Moving the temp element to the First position");
				SortSimulation.drawTempHolder(410, 50, '');
				drawArrow(context, 445, 100, 100, 175);
				
				sortSimulateInnerState = 0;
				sortSimulateState = 19;
			}else if( sortSimulateInnerState == 3 ){
				SortSimulation.drawDefaultElements(value1,value2,value3,value4,value5,value6);
				SortSimulation.displayProcessState("Moving the temp element to the Second position");
				SortSimulation.drawTempHolder(410, 50, '');
				drawArrow(context, 445, 100, 200, 175);
				
				sortSimulateInnerState = 0;
				sortSimulateState = 19;
			}else if( sortSimulateInnerState == 2 ){
				SortSimulation.drawDefaultElements(value1,value2,value3,value4,value5,value6);
				SortSimulation.displayProcessState("Moving the temp element to the Third position");
				SortSimulation.drawTempHolder(410, 50, '');
				drawArrow(context, 445, 100, 300, 175);
				
				sortSimulateInnerState = 0;
				sortSimulateState = 19;
			}else if( sortSimulateInnerState == 1 ){
				SortSimulation.drawDefaultElements(value1,value2,value3,value4,value5,value6);
				SortSimulation.displayProcessState("Moving the temp element to the Fourth position");
				SortSimulation.drawTempHolder(410, 50, '');
				drawArrow(context, 445, 100, 400, 175);
				
				sortSimulateInnerState = 0;
				sortSimulateState = 19;
			}else{
				SortSimulation.drawDefaultElements(value1,value2,value3,value4,value5,value6);
				SortSimulation.displayProcessState("Since Fourth element is smaller, No change");
				SortSimulation.drawTempHolder(410, 50, '');
				drawArrow(context, 445, 100, 500, 175);
				
				sortSimulateState = 19;
			}
			
			sortSimulateThread = window.setTimeout( function(){ SortSimulation.sortSimulate(); }, timeInterval);
		}else if( sortSimulateState == 19 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			SortSimulation.drawDefaultElements(value1,value2,value3,value4,value5,value6);
			SortSimulation.displayProcessState("Fourth iteration is over");
			
			sortSimulateState = 20;
			sortSimulateThread = window.setTimeout( function(){ SortSimulation.sortSimulate(); }, timeInterval);
		}else if( sortSimulateState == 20 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			SortSimulation.drawDefaultElements(value1,value2,value3,value4,value5,'');
			SortSimulation.displayProcessState("Take the Sixth element");
			drawArrow(context, 600, 175, 545, 100);
			SortSimulation.drawTempHolder(510, 50, value6);
			
			sortSimulateState = 21;
			sortSimulateThread = window.setTimeout( function(){ SortSimulation.sortSimulate(); }, timeInterval);
		}else if( sortSimulateState == 21 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			SortSimulation.drawDefaultElements(value1,value2,value3,value4,value5,'');
			SortSimulation.displayProcessState("Compare the Sixth element with Fifth element");
			SortSimulation.drawTempHolder(510, 50, value6);
			drawDashedArrow(context, 545, 100, 500, 175);
			
			sortSimulateState = 22;
			sortSimulateThread = window.setTimeout( function(){ SortSimulation.sortSimulate(); }, timeInterval);
		}else if( sortSimulateState == 22 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			if( value5 > value6 ){
				var temp = value5;
				value5 = value6;
				value6 = temp;
				SortSimulation.drawDefaultElements(value1,value2,value3,value4,'',value6);
				SortSimulation.displayProcessState("Since Fifth element is bigger, moving that to the Sixth position");
				SortSimulation.drawTempHolder(510, 50, value5);
				drawDashedArrow(context, 545, 100, 500, 175);
				drawArrow(context, 540, 200, 565, 200);
				
				sortSimulateInnerState = 1;
			}else if( value4 > value5 ){
				var temp = value4;
				value4 = value5;
				value5 = temp;
				SortSimulation.drawDefaultElements(value1,value2,value3,'',value5,value6);
				SortSimulation.displayProcessState("Since Fourth element is bigger, moving that to the Fifth position");
				SortSimulation.drawTempHolder(510, 50, value4);
				drawDashedArrow(context, 545, 100, 400, 175);
				drawArrow(context, 440, 200, 465, 200);
				
				sortSimulateInnerState = 2;
			}else if( value3 > value4 ){
				var temp = value3;
				value3 = value4;
				value4 = temp;
				SortSimulation.drawDefaultElements(value1,value2,'',value4,value5,value6);
				SortSimulation.displayProcessState("Since Third element is bigger, moving that to the Fourth position");
				SortSimulation.drawTempHolder(510, 50, value3);
				drawDashedArrow(context, 545, 100, 300, 175);
				drawArrow(context, 340, 200, 365, 200);
				
				sortSimulateInnerState = 3;
			}else if( value2 > value3 ){
				var temp = value2;
				value2 = value3;
				value3 = temp;
				SortSimulation.drawDefaultElements(value1,'',value3,value4,value5,value6);
				SortSimulation.displayProcessState("Since Second element is bigger, moving that to the Third position");
				SortSimulation.drawTempHolder(510, 50, value2);
				drawDashedArrow(context, 545, 100, 200, 175);
				drawArrow(context, 240, 200, 265, 200);
				
				sortSimulateInnerState = 4;
			}else if( value1 > value2 ){
				var temp = value1;
				value1 = value2;
				value2 = temp;
				SortSimulation.drawDefaultElements('',value2,value3,value4,value5,value6);
				SortSimulation.displayProcessState("Since First element is bigger, moving that to the Second position");
				SortSimulation.drawTempHolder(510, 50, value1);
				drawDashedArrow(context, 545, 100, 100, 175);
				drawArrow(context, 140, 200, 165, 200);
				
				sortSimulateInnerState = 5;
			}else if( sortSimulateInnerState == 5 ){
				SortSimulation.drawDefaultElements(value1,value2,value3,value4,value5,value6);
				SortSimulation.displayProcessState("Moving the temp element to the First position");
				SortSimulation.drawTempHolder(510, 50, '');
				drawArrow(context, 545, 100, 100, 175);
				
				sortSimulateInnerState = 0;
				sortSimulateState = 23;
			}else if( sortSimulateInnerState == 4 ){
				SortSimulation.drawDefaultElements(value1,value2,value3,value4,value5,value6);
				SortSimulation.displayProcessState("Moving the temp element to the Second position");
				SortSimulation.drawTempHolder(510, 50, '');
				drawArrow(context, 545, 100, 200, 175);
				
				sortSimulateInnerState = 0;
				sortSimulateState = 23;
			}else if( sortSimulateInnerState == 3 ){
				SortSimulation.drawDefaultElements(value1,value2,value3,value4,value5,value6);
				SortSimulation.displayProcessState("Moving the temp element to the Third position");
				SortSimulation.drawTempHolder(510, 50, '');
				drawArrow(context, 545, 100, 300, 175);
				
				sortSimulateInnerState = 0;
				sortSimulateState = 23;
			}else if( sortSimulateInnerState == 2 ){
				SortSimulation.drawDefaultElements(value1,value2,value3,value4,value5,value6);
				SortSimulation.displayProcessState("Moving the temp element to the Fourth position");
				SortSimulation.drawTempHolder(510, 50, '');
				drawArrow(context, 545, 100, 400, 175);
				
				sortSimulateInnerState = 0;
				sortSimulateState = 23;
			}else if( sortSimulateInnerState == 1 ){
				SortSimulation.drawDefaultElements(value1,value2,value3,value4,value5,value6);
				SortSimulation.displayProcessState("Moving the temp element to the Fifth position");
				SortSimulation.drawTempHolder(510, 50, '');
				drawArrow(context, 545, 100, 500, 175);
				
				sortSimulateInnerState = 0;
				sortSimulateState = 23;
			}else{
				SortSimulation.drawDefaultElements(value1,value2,value3,value4,value5,value6);
				SortSimulation.displayProcessState("Since Fifth element is smaller, No change");
				SortSimulation.drawTempHolder(510, 50, '');
				drawArrow(context, 545, 100, 600, 175);
				
				sortSimulateState = 23;
			}
			
			sortSimulateThread = window.setTimeout( function(){ SortSimulation.sortSimulate(); }, timeInterval);
		}else if( sortSimulateState == 23 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			SortSimulation.drawDefaultElements(value1,value2,value3,value4,value5,value6);
			SortSimulation.displayProcessState("Fifth iteration is over");
			
			sortSimulateState = 24;
			sortSimulateThread = window.setTimeout( function(){ SortSimulation.sortSimulate(); }, timeInterval);
		}else if( sortSimulateState == 24 ){
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			SortSimulation.drawDefaultElements(value1, value2,value3,value4,value5,value6);
			context.beginPath();
			context.font = smallFont;
			context.strokeStyle = strokeColor;
			context.lineWidth = processBarLineWidth;
			context.rect(50, 250, processBarWidth, processBarHeight);//process bar
			context.fillText("The elements are sorted", 250, 280);//process state
			context.stroke();
			
			sortSimulateState = 0;
		}else{
			context.clearRect(0, 0, canvas.width, canvas.height);
			sortSimulateState = 0;
		}
	
		$('#sortCanvas').show();
	}
	
	return {
		drawDefaultElements : drawDefaultElements,
		displayProcessState : displayProcessState,
		drawTempHolder : drawTempHolder,
		drawText : drawText,
		sortSimulate : sortSimulate,
	}
	
})(jQuery, window, document);;