
var canShowContext = 0;

var lmousedown = false;
var rmousedown = false;

window.addEventListener('mousedown', function(e){

	console.log("down:" + e.button);
	if(e.button == 0){
		lmousedown = true;
	}else{
		rmousedown = true;
	}

	if(e.button == 0 && rmousedown){
		execGesture("rl");
	}else if(e.button != 0){
		console.log("ほげ");
	}
});

window.addEventListener('mouseup', function(e){

	console.log("up:" + e.button);

	if(e.button == 0){
		lmousedown = false;
		canShowContext = 0;
	}else{
		rmousedown = false;
		++canShowContext;
	}
});

window.addEventListener('contextmenu', function(e){
	if(canShowContext == 1){
		canShowContext = 0;
	}else{
		e.preventDefault();
		e.stopPropagation();
	}
});

function execGesture(type){
	console.log("exec!!" + type);
	chrome.extension.sendRequest({gesture: type});
}

