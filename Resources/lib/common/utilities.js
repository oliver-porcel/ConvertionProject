exports.alertWin = function (title, msg, buttons) {
	
	var dialog = Ti.UI.createAlertDialog({
	    message: msg,
	    buttonNames: ['OK'],
	    title: title
	});
	dialog.show();
};