exports.getJSON = function (getJSONurl, getJSONonSuccess, getMethod, getParameters ) {
	Ti.API.info('=> Final URL: ' + getJSONurl );
	Ti.API.info('=> getMethod: ' + getMethod );
	//Ti.API.info('=> getParameters: ' + getParameters );
	var getJSONData = null;
	
	try {
		var xhr = Ti.Network.createHTTPClient({
			onload : function () {
				try {
					Ti.API.info('Response => ' + this.responseText);
					getJSONData = JSON.parse(this.responseText);
				} catch (err) {
					showgetJSONError(err);
				}
				if (getJSONData != null) {
					getJSONonSuccess(getJSONData);
				}
			},
			onerror: function(err) {
				showgetJSONError (err);
				this.abort();
			},
			timeout: 30000
		});
		xhr.open(getMethod, getJSONurl);
		xhr.validatesSecureCertificate = Ti.App.Properties.getBool('hasSSL');
		xhr.send(getParameters);
		
	} catch(err){
		showgetJSONError(err);
	}	
	var showgetJSONError = function (err) {
		
		var hasNetwork = Ti.Network.online;
        var errorMsg = err.error ? err.error.toLowerCase() : '';
        var isTimeout =  !hasNetwork | (errorMsg.indexOf('timed out') >=0 | errorMsg.indexOf('sockettimeoutexception') >=0 || errorMsg.indexOf('unable to resolve host') >=0);
        var isAppError = hasNetwork && !isTimeout;
        
		Titanium.UI.createAlertDialog({
            title: 'Tema 6',
            message: isTimeout ?  'Check your internet connection and try again.' : 'We are sorry but something went wrong while fetching data' ,
            buttonNames: ['Ok']
        })
        .show(); 
        
         Ti.App.fireEvent('networkUtilsError', { isTimeout: isTimeout, isAppError: isAppError });
	};	
		
	
};

exports.getHtml = function (getHtmlurl, getHTMLonSuccess, getMethod, getParameters ) {
	Ti.API.info('=> Final URL: ' + getHtmlurl );
	Ti.API.info('=> getMethod: ' + getMethod );
	//Ti.API.info('=> getParameters: ' + getParameters );
	var getHTMLData = null;
	
	try {
		var xhr = Ti.Network.createHTTPClient({
			onload : function () {
				try {
					Ti.API.info('Response => ' + this.responseText);
					getHTMLData = this.responseText;
				} catch (err) {
					showgetHTMLError(err);
				}
				if (getHTMLData != null) {
					getHTMLonSuccess(getHTMLData);
				}
			},
			onerror: function(err) {
				showgetHTMLError (err);
				this.abort();
			},
			timeout: 30000
		});
		xhr.open(getMethod, getHtmlurl);
		xhr.validatesSecureCertificate = Ti.App.Properties.getBool('hasSSL');
		xhr.send(getParameters);
		
	} catch(err){
		showgetHTMLError(err);
	}	
	var showgetHTMLError = function (err) {
		
		var hasNetwork = Ti.Network.online;
        var errorMsg = err.error ? err.error.toLowerCase() : '';
        var isTimeout =  !hasNetwork | (errorMsg.indexOf('timed out') >=0 | errorMsg.indexOf('sockettimeoutexception') >=0 || errorMsg.indexOf('unable to resolve host') >=0);
        var isAppError = hasNetwork && !isTimeout;
        
		Titanium.UI.createAlertDialog({
            title: 'Convertion Timeout Error',
            message: isTimeout ?  'Check your internet connection and try again.' : 'We are sorry but something went wrong while fetching data' ,
            buttonNames: ['Ok']
        })
        .show(); 
        
         Ti.App.fireEvent('networkUtilsError', { isTimeout: isTimeout, isAppError: isAppError });
	};	
		
	
};