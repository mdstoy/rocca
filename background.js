chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse){
		if(request.gesture == 'rl'){
			chrome.tabs.remove(sender.tab.id);
		}
	}
);
