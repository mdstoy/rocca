$(function(){
	chrome.storage.sync.get({lr: 'history_back', rl: 'tab_remove'}, function(items){
		$('#lr').val(items.lr);
		$('#rl').val(items.rl);
	});	

	// onclick
	$('#save').click(function(){
		var lr_value = $('#lr').val();
		var rl_value = $('#rl').val();
		chrome.storage.sync.set({
			lr:lr_value, 
			rl:rl_value 
		}, function(){
			$('#status').text('saved');
		});
	});
});

