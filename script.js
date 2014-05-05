
var canShowContext = false;

var lmousedown = false;
var rmousedown = false;

window.addEventListener('mousedown', function(e){

	console.log("down:" + e.button);
	if(e.button == 0){
		lmousedown = true;
	}else if(e.button == 2){
		rmousedown = true;
	}

	if(e.button == 0 && rmousedown){
		execGesture("rl");
		lmousedown = false;
	}else if(e.button == 2 && lmousedown){
		execGesture("lr");
		rmousedown = false;
		canShowContext = false;
	}
});

window.addEventListener('mouseup', function(e){

	console.log("up:" + e.button);
	if(e.button == 0){
		lmousedown = false;
		canShowContext = false;
	}else if(e.button == 2){
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
	console.log("exec!!" + action);
	if(action == "lr"){
		history.back();
	}else{
		chrome.extension.sendRequest({gesture: action});
	}
}

