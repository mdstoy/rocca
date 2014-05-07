var L_BUTTON = 0;
var R_BUTTON = 2;

var canShowContext = false;

var lmousedown = false;
var rmousedown = false;

window.addEventListener('mousedown', function(e){

	//console.log("down:" + e.button);
	if(e.button == L_BUTTON){
		lmousedown = true;
	}else if(e.button == R_BUTTON){
		rmousedown = true;
	}

	if(e.button == L_BUTTON && rmousedown){
		execGesture("rl");
		lmousedown = false;
	}else if(e.button == R_BUTTON && lmousedown){
		execGesture("lr");
		rmousedown = false;
		canShowContext = false;
	}
});

window.addEventListener('mouseup', function(e){

	//console.log("up:" + e.button);
	if(e.button == L_BUTTON){
		lmousedown = false;
		canShowContext = false;
	}else if(e.button == R_BUTTON){
		if(rmousedown){
			rmousedown = false;
			canShowContext = true;
		}
	}
});

window.addEventListener('contextmenu', function(e){
	if(canShowContext){
		// after shown contextmenu, reset mouse state
		rmousedown = false;
		canShowContext = false;
	}else{
		e.preventDefault();
		e.stopPropagation();
	}
});

function execGesture(action){
	//console.log("exec!!" + action);
	if(action == "lr"){
		history.back();
	}else{
		chrome.runtime.sendMessage({gesture: action});
	}
}

