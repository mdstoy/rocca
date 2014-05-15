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
			}else if(action.lastIndexOf('tab_remove_all', 0) === 0){
				var target = action.substring(15);
				chrome.tabs.query({currentWindow: true}, function(tabs){
					if(target == 'other'){
						$.each(tabs, function(index, tab){
							if(!tab.highlighted){
								chrome.tabs.remove(tab.id);
							}
						});
					}else if(target == 'other_not_pin'){
						$.each(tabs, function(index, tab){
							if(!tab.highlighted){
								if(!tab.pinned){
									chrome.tabs.remove(tab.id);
								}
							}
						});
					}else if(target == 'right'){
						var f = false;
						$.each(tabs, function(index, tab){
							if(f){
								chrome.tabs.remove(tab.id);
							}else if(tab.highlighted){
								f = true;
							}
						});
					}else if(target == 'right_not_pin'){
						var f = false;
						$.each(tabs, function(index, tab){
							if(f){
								if(!tab.pinned){
									chrome.tabs.remove(tab.id);
								}
							}else if(tab.highlighted){
								f = true;
							}
						});
					}else if(target == 'left'){
						var f = false;
						$.each(tabs.reverse(), function(index, tab){
							if(f){
								chrome.tabs.remove(tab.id);
							}else if(tab.highlighted){
								f = true;
							}
						});
					}else if(target == 'left_not_pin'){
						var f = false;
						$.each(tabs.reverse(), function(index, tab){
							if(f){
								if(!tab.pinned){
									chrome.tabs.remove(tab.id);
								}
							}else if(tab.highlighted){
								f = true;
							}
						});
					}
				});
			}else if(action == 'pinned_tab'){
				chrome.tabs.query({currentWindow: true, highlighted: true}, function(tabs){
					chrome.tabs.update(tabs[0].id, {pinned: !tabs[0].pinned});
				});
			}

			sendResponse(action);
		});
		return true;
	}
);

