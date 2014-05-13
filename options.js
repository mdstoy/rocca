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
		, "tab_remove_all_other"
		, "tab_remove_all_other_not_pin"
		, "tab_remove_all_right"
		, "tab_remove_all_right_not_pin"
		, "tab_remove_all_left"
		, "tab_remove_all_left_not_pin"
	];

	createRows(data);

	chrome.storage.sync.get('rocca_setting', function(items){
		var setting = JSON.parse(items.rocca_setting);
		// rocker gesture settings
		var rocker_setting = setting.rocker;
		$('#rl_' + rocker_setting.rl).prop('checked', true);
		$('#lr_' + rocker_setting.lr).prop('checked', true);
	});

	// onclick
	$('#save').click(function(){
		var rl_value = $('input[name="rl"]:checked').val();
		var lr_value = $('input[name="lr"]:checked').val();

		var setting = {'rocker': {'rl': rl_value, 'lr': lr_value}};
		var setting_json = JSON.stringify(setting);

		chrome.storage.sync.set({'rocca_setting': setting_json}, function(){
			$('#status').text(chrome.i18n.getMessage('saved'));
		});
	});
});

