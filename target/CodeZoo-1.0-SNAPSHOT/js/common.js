/**
 * 
 */

function isEmptyString(string){
	if(string != null){
		string = string.toString();
	}
	return (string == null || string == "") ? true : false;
}

function isNumber(str){
	return ( str == null || str == '' || str == "" || isNaN(Number(str)) ) ? false : true;
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function showLoader(DOMElement){
	$('#' + DOMElement).find('span').show();
}

function hideLoader(DOMElement){
	$('#' + DOMElement).find('span').hide();
}

function showModal(ModalElement){
	$('#' + ModalElement).modal('show');
}

function hideModal(ModalElement){
	$('#' + ModalElement).modal('hide');
}

function showVoiceBox ( message, timeInSecs ) {
	$( "#voice-box" ).hide();
	$( "#voice-box p span" ).html( message );
	$( "#voice-box" ).fadeIn();
	if ( timeInSecs != null && timeInSecs != undefined ) {
		if ( timeInSecs == 0 ) {
			console.log( "Dont Hide voiceBox" );
		} else {
			$( "#voice-box" ).fadeOut( timeInSecs );
		}
	} else {
		$( "#voice-box" ).fadeOut( 3000 );
	}
}

function drawArrow(context, fromx, fromy, tox, toy){
    var headlen = 10;
    var angle = Math.atan2(toy-fromy,tox-fromx);
    
    context.beginPath();
    context.lineWidth = "1.5";
    context.strokeStyle = "#337ab7";
    
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
    context.moveTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
    context.stroke();
}

function drawDashedArrow(context, fromx, fromy, tox, toy){
    var headlen = 10;
    var angle = Math.atan2(toy-fromy,tox-fromx);
    
    context.beginPath();
    context.lineWidth = "1.5";
    context.strokeStyle = "#337ab7";
    context.moveTo(fromx, fromy);
    context.setLineDash([5,5]);
    context.lineTo(tox, toy);
    context.stroke();
    
    context.beginPath();
    context.lineWidth = "1.5";
    context.strokeStyle = "#337ab7";
    context.setLineDash([]);
    context.moveTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
    context.moveTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
    context.stroke();
}

function getDateForThisTimeZoneOffset ( destinationTimeZone, prmDateTime, prmSeparator, dateTimeLngMilliSecs ) {

	var timeZoneString = destinationTimeZone.split( ')' )[ 0 ];
	timeZoneString = timeZoneString.substring( 4 );
	var offsetOperator = timeZoneString.charAt( 0 );
	timeZoneString = timeZoneString.substring( 1 );
	var offsetHour = timeZoneString.split( ':' )[ 0 ];
	var offsetMinutes = timeZoneString.split( ':' )[ 1 ];

	var cur_TZ_date = new Date();
	var cur_TZ_Offset = Number( cur_TZ_date.getTimezoneOffset() * 60000 );
	var UTC_Milli = ( dateTimeLngMilliSecs + cur_TZ_Offset );

	offsetHour = Number( offsetHour );
	offsetMinutes = Number( offsetMinutes );
	offsetMinutes += ( offsetHour * 60 );
	var offsetMillis = Number( offsetMinutes * 60000 );
	if ( offsetOperator == "-" ) {
		offsetMillis *= -1;
	}

	var chosenTimeZoneMillis = ( UTC_Milli + offsetMillis );
	var newDate = new Date( chosenTimeZoneMillis );

	if ( prmDateTime == "date" ) {
		return ( ( ((newDate.getMonth() + 1)<10) ? "0"+(newDate.getMonth() + 1) : (newDate.getMonth() + 1) ) + prmSeparator + ( (newDate.getDate()<10) ? "0"+newDate.getDate() : newDate.getDate() ) + prmSeparator + newDate.getFullYear() );
	} else if ( prmDateTime == "time" ) {
		var hours = Number( newDate.getHours() );
		var minutes = Number( newDate.getMinutes() );
		var seconds = Number( newDate.getSeconds() );
		var session = "";
		if ( hours == 0 ) {
			hours = 12;
			session = "AM";
		} else if ( hours < 12 ) {
			session = "AM";
		} else if ( hours == 12 ) {
			session = "PM";
		} else if ( hours > 12 ) {
			hours = ( hours - 12 );
			session = "PM";
		}

		if ( hours < 10 ) {
			hours = "0" + hours;
		}
		if ( minutes < 10 ) {
			minutes = "0" + minutes;
		}
		if ( seconds < 10 ) {
			seconds = "0" + seconds;
		}
		return ( hours + prmSeparator + minutes + prmSeparator + seconds + " " + session );
	} else if ( prmDateTime == "date-time" ) {
		var hours = Number( newDate.getHours() );
		var minutes = Number( newDate.getMinutes() );
		var seconds = Number( newDate.getSeconds() );
		var session = "";
		if ( hours == 0 ) {
			hours = 12;
			session = "AM";
		} else if ( hours < 12 ) {
			session = "AM";
		} else if ( hours == 12 ) {
			session = "PM";
		} else if ( hours > 12 ) {
			hours = ( hours - 12 );
			session = "PM";
		}
		if ( hours < 10 ) {
			hours = "0" + hours;
		}
		if ( minutes < 10 ) {
			minutes = "0" + minutes;
		}
		if ( seconds < 10 ) {
			seconds = "0" + seconds;
		}
		var clockInDateTimeText = ( (newDate.getDate()<10) ? "0"+newDate.getDate() : newDate.getDate() ) + prmSeparator + getMonthName( newDate.getMonth(), "abbreviated" ) + prmSeparator + newDate.getFullYear() + " " + hours + ":" + minutes + ":" + seconds + " " + session;
		
		return clockInDateTimeText;
	}
}

function getMonthName ( monthId, format ) {
	var monthName = "";

	switch ( monthId ) {
	case 0:
		monthName = "January";
		break;

	case 1:
		monthName = "February";
		break;

	case 2:
		monthName = "March";
		break;

	case 3:
		monthName = "April";
		break;

	case 4:
		monthName = "May";
		break;

	case 5:
		monthName = "June";
		break;

	case 6:
		monthName = "July";
		break;

	case 7:
		monthName = "August";
		break;

	case 8:
		monthName = "September";
		break;

	case 9:
		monthName = "October";
		break;

	case 10:
		monthName = "November";
		break;

	case 11:
		monthName = "December";
		break;
	}

	if ( format.toLowerCase() == 'abbreviated' ) {
		monthName = monthName.substr( 0, 3 );
	}
	return monthName;
}