function createRows(data){

	var rows = $.each(data, function(index, value){
		var row = '<tr><td id="header_' + value + '"></td>'
			+ '<td><input type="radio" name="rl" value="' + value + '" id="rl_' + value + '"></td>'
			+ '<td><input type="radio" name="lr" value="' + value + '" id="lr_' + value + '"></td>'
			+ '<td><input type="text" name="' + value + '"></td>'
			+ '</tr>';

		$('tbody').append(row);
		$('#header_' + value).text(chrome.i18n.getMessage(toCamel(value)));
	});
}

function toCamel(snake){
	return snake.replace(/_./g, function(matched){
		return matched.charAt(1).toUpperCase();
	});
}

$(function(){

	var data = [
		"tab_remove"
		, "history_back"
		, "history_forward"
		, "reload"
	];

	createRows(data);

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
			$('#status').text(chrome.i18n.getMessage('saved'));
		});
	});
});

