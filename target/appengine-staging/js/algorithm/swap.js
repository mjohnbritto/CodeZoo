
var swapSimulateState = 0;
var timeInterval = 2000;
var swapSimulateThread;
	
$(document).ready(function(){
	
	
	$(document).on('click', '#Swap', function(){
		console.log(swapSimulateThread);
		clearTimeout(swapSimulateThread);
		//$('ul.navbar-nav li').removeClass('active');
		//$('#nav-Courses').addClass('active');
		
		$('.dv-swap-input').show();
		$('#swapModal .modal-footer').show();
		$('#swapCanvas').hide();
		$('#swap-error').html("").hide();
		$('#swapIP1').val('').focus();
		$('#swapIP2').val('');
		showModal('swapModal');
	});
	
	$(document).on('click', '#swap-Simulate', function(){
		$('#swap-error').html("").hide();
		var value1 = $('#swapIP1').val();
		var value2 = $('#swapIP2').val();
		if( !isNumber(value1) || !isNumber(value2) ){
			$('#swap-error').html("Please fill all the fields(Numeric)!").show();
		}else{
			value1 = Number(value1);
			value2 = Number(value2);
			
			$('.dv-swap-input').hide();
			$('#swapModal .modal-footer').hide();
			
			swapSimulateState = 1;
			simulateSwapping(value1, value2);
		}
		
	});
	
});

function simulateSwapping(value1, value2){
	
	var canvas = document.getElementById("swapCanvas");
	var context = canvas.getContext("2d");
	var strokeColor = "#337ab7";
	var boxWidth = 100;
	var boxHeight = 50;
	var padding = 50;
	var lineWidth="5";
	var font = "bold 25px 'Times New Roman', Times, serif";
	var processBarWidth="400";
	var processBarHeight="50";
	var processBarLineWidth = "1.5";
	var smallFont = "bold 15px 'Times New Roman', Times, serif";

	if( swapSimulateState == 1 ){
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		swapSimulateState = 2;
		swapSimulateThread = window.setTimeout( function(){ simulateSwapping(value1, value2); }, timeInterval);
	}else if( swapSimulateState == 2 ){
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		context.beginPath();
		context.lineWidth = lineWidth;
		context.strokeStyle = strokeColor;
		context.font = font;
		context.fillText("A", 115,70);
		context.fillText("B", 340,70);
		context.rect(75, 75, boxWidth, boxHeight);//A
		context.rect(300, 75, boxWidth, boxHeight);//B
		context.fillText(value1, 105,108);
		context.fillText(value2, 330,108);
		context.stroke();
		
		context.beginPath();
		context.font = smallFont;
		context.strokeStyle = strokeColor;
		context.lineWidth = processBarLineWidth;
		context.rect(50, 400, processBarWidth, processBarHeight);//process bar
		context.fillText("Setting up the values 'A' and 'B'", 140, 430);//process state
		context.stroke();
		
		swapSimulateState = 3;
		swapSimulateThread = window.setTimeout( function(){ simulateSwapping(value1, value2); }, timeInterval);
	}else if( swapSimulateState == 3 ){
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		context.beginPath();
		context.lineWidth = lineWidth;
		context.strokeStyle = strokeColor;
		context.font = font;
		context.fillText("A", 115,70);
		context.fillText("B", 340,70);
		context.fillText("C", 230,325);
		context.rect(75, 75, boxWidth, boxHeight);//A
		context.rect(300, 75, boxWidth, boxHeight);//B
		context.rect(190, 250, boxWidth, boxHeight);//C
		context.fillText(value1, 105,108);//A
		context.fillText(value2, 330,108);//B
		context.stroke();
		
		context.beginPath();
		context.font = smallFont;
		context.strokeStyle = strokeColor;
		context.lineWidth = processBarLineWidth;
		context.rect(50, 400, processBarWidth, processBarHeight);//process bar
		context.fillText("Create temporary holder 'C'", 155, 430);//process state
		context.stroke();
		
		swapSimulateState = 4;
		swapSimulateThread = window.setTimeout( function(){ simulateSwapping(value1, value2); }, timeInterval);
	}else if( swapSimulateState == 4 ){
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		context.beginPath();
		context.lineWidth = lineWidth;
		context.strokeStyle = strokeColor;
		context.font = font;
		context.fillText("A", 115,70);
		context.fillText("B", 340,70);
		context.fillText("C", 230,325);
		context.rect(75, 75, boxWidth, boxHeight);//A
		context.rect(300, 75, boxWidth, boxHeight);//B
		context.rect(190, 250, boxWidth, boxHeight);//C
		context.fillText(value2, 330,108);//B
		context.fillText(value1, 220,283);//C
		context.stroke();
		drawArrow(context, 125, 125, 240, 250);
		
		context.beginPath();
		context.font = smallFont;
		context.strokeStyle = strokeColor;
		context.lineWidth = processBarLineWidth;
		context.rect(50, 400, processBarWidth, processBarHeight);//process bar
		context.fillText("Moving, value 'A' to 'C'", 170,430);//process state
		context.stroke();
		
		swapSimulateState = 5;
		swapSimulateThread = window.setTimeout( function(){ simulateSwapping(value1, value2); }, timeInterval);
	}else if( swapSimulateState == 5 ){
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		context.beginPath();
		context.lineWidth = lineWidth;
		context.strokeStyle = strokeColor;
		context.font = font;
		context.fillText("A", 115,70);
		context.fillText("B", 340,70);
		context.fillText("C", 230,325);
		context.rect(75, 75, boxWidth, boxHeight);//A
		context.rect(300, 75, boxWidth, boxHeight);//B
		context.rect(190, 250, boxWidth, boxHeight);//C
		context.fillText(value2, 105,108);//A
		context.fillText(value1, 220,283);//C
		context.stroke();
		drawArrow(context, 300, 100, 175, 100);
		
		context.beginPath();
		context.font = smallFont;
		context.strokeStyle = strokeColor;
		context.lineWidth = processBarLineWidth;
		context.rect(50, 400, processBarWidth, processBarHeight);//process bar
		context.fillText("Moving, value 'B' to 'A'", 170,430);//process state
		context.stroke();
		
		swapSimulateState = 6;
		swapSimulateThread = window.setTimeout( function(){ simulateSwapping(value1, value2); }, timeInterval);
	}else if( swapSimulateState == 6 ){
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		context.beginPath();
		context.lineWidth = lineWidth;
		context.strokeStyle = strokeColor;
		context.font = font;
		context.fillText("A", 115,70);
		context.fillText("B", 340,70);
		context.fillText("C", 230,325);
		context.rect(75, 75, boxWidth, boxHeight);//A
		context.rect(300, 75, boxWidth, boxHeight);//B
		context.rect(190, 250, boxWidth, boxHeight);//C
		context.fillText(value2, 105,108);//A
		context.fillText(value1, 330,108);//B
		context.stroke();
		drawArrow(context, 240, 250, 350, 125);
		
		context.beginPath();
		context.font = smallFont;
		context.strokeStyle = strokeColor;
		context.lineWidth = processBarLineWidth;
		context.rect(50, 400, processBarWidth, processBarHeight);//process bar
		context.fillText("Moving, value 'C' to 'B'", 170,430);//process state
		context.stroke();
		
		swapSimulateState = 7;
		swapSimulateThread = window.setTimeout( function(){ simulateSwapping(value1, value2); }, timeInterval);
	}else if( swapSimulateState == 7 ){
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		context.beginPath();
		context.lineWidth = lineWidth;
		context.strokeStyle = strokeColor;
		context.font = font;
		context.fillText("A", 115,70);
		context.fillText("B", 340,70);
		context.rect(75, 75, boxWidth, boxHeight);//A
		context.rect(300, 75, boxWidth, boxHeight);//B
		context.fillText(value2, 105,108);//A
		context.fillText(value1, 330,108);//B
		context.stroke();

		context.beginPath();
		context.font = smallFont;
		context.strokeStyle = strokeColor;
		context.lineWidth = processBarLineWidth;
		context.rect(50, 220, processBarWidth, processBarHeight);//process bar
		context.fillText("Values 'A' and 'B' are swapped", 150,250);//process state
		context.stroke();
		
		swapSimulateState = 0;
	}else{
		context.clearRect(0, 0, canvas.width, canvas.height);
		swapSimulateState = 0;
	}

	$('#swapCanvas').show();
}