var BUTTON_LEFT = 0;
var BUTTON_RIGHT = 2;

var canShowContext = false;

var pressedLeft = false;
var pressedRight = false;

$(function(){
	$(document).on('mousedown', function(e){
		// console.log("down:" + e.button);
		if(e.button == BUTTON_LEFT){
			pressedLeft = true;
		}else if(e.button == BUTTON_RIGHT){
			pressedRight = true;
		}
	
		if(e.button == BUTTON_LEFT && pressedRight){
			execGesture("rl");
		}else if(e.button == BUTTON_RIGHT && pressedLeft){
			execGesture("lr");
		}
	});

	$(document).on('mouseup', function(e){
		// console.log("up:" + e.button);
		if(e.button == BUTTON_LEFT){
			pressedLeft = false;
			canShowContext = false;
		}else if(e.button == BUTTON_RIGHT){
			if(pressedRight){
				pressedRight = false;
				canShowContext = true;
			}
		}
	});

	$(document).on('contextmenu', function(e){
		if(canShowContext){
			// after shown contextmenu, reset mouse state
			resetMouseStatus();
		}else{
			e.preventDefault();
			e.stopPropagation();
		}
	});

});

function execGesture(action){
	// console.log("exec!!" + action);
	// after execution, reset mouse state
	resetMouseStatus();
	chrome.runtime.sendMessage({gesture: action}, function(response){
		// console.log("resp:"+response);
		if(response == 'history_back'){
			history.back();
		}else if(response == 'history_forward'){
			history.forward();
		}else if(response == 'reload'){
			location.reload();
		}
	});
}

function resetMouseStatus(){
	pressedRight = false;
	pressedLeft = false;
	canShowContext = false;
}
