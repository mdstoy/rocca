
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
	}else if(e.button == 2 && lmousedown){
		execGesture("lr");
	}
});

window.addEventListener('mouseup', function(e){

	console.log("up:" + e.button);
	if(e.button == 0){
		lmousedown = false;
		canShowContext = false;
	}else{
		rmousedown = false;
		canShowContext = true;
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

function execGesture(type){
	console.log("exec!!" + type);
	chrome.extension.sendRequest({gesture: type});
}

