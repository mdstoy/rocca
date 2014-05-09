chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		(function(){
			var defer = $.Deferred();
			chrome.storage.sync.get(request.gesture, function(items){
				action = items[request.gesture];
				defer.resolve(action);
			});
			return defer.promise();
		})().done(function(action){
			if(action == 'tab_remove'){
				chrome.tabs.remove(sender.tab.id);
			}
			sendResponse(action);
		});
		return true;
	}
);


