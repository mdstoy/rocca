$(function(){
	chrome.storage.sync.get({lr: 'history_back', rl: 'tab_remove'}, function(items){
		$('#rl_' + items.rl).prop('checked', true);
		$('#lr_' + items.lr).prop('checked', true);
	});

	// onclick
	$('#save').click(function(){
		var rl_value = $('input[name="rl"]:checked').val();
		var lr_value = $('input[name="lr"]:checked').val();
		chrome.storage.sync.set({
			lr:lr_value, 
			rl:rl_value 
		}, function(){
			$('#status').text('saved');
		});
	});
});

