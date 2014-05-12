chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		(function(){
			var defer = $.Deferred();
			chrome.storage.sync.get('rocca_setting', function(items){
				setting = JSON.parse(items.rocca_setting);
				defer.resolve(setting);
			});
			return defer.promise();
		})().done(function(setting){
			var gesture = request.gesture;
			var action = '';
			if(gesture == 'rl' || gesture == 'lr'){
				action = setting.rocker[gesture];
			}//else {mouse gesture}

			if(action == 'tab_remove'){
				chrome.tabs.remove(sender.tab.id);
			}
			sendResponse(action);
		});
		return true;
	}
);

