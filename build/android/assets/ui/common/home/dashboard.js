function dashboard () {
	
	var glog = Ti.App.glog;
	
	var self = Ti.UI.createWindow({
        backgroundColor: '#ffffff',
        navBarHidden: false,   
    	exitOnClose:true,
    	fullscreen:false,
        orientationModes : [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT],
   		title: 'ConvertionApp' 
    });
    
    	
    if (glog.isiOS) {
    	
    	self.statusBarStyle = Ti.UI.iPhone.StatusBar.DEFAULT;
        self.barColor = '#ffffff';
	    
	    var navWin = Ti.UI.iOS.createNavigationWindow({
	        window : self
	    });
    	
    }else{
    	var actionBarModule = require('com.alcoapps.actionbarextras');	
    }
    var logoutBtn = Titanium.UI.createButton({
    	title: 'Exit'
	});

    if (glog.isiOS) {
    	self.setLeftNavButton(logoutBtn);
    }
    
    var dialogLogout = Ti.UI.createAlertDialog({
    	cancel : 0,
    	buttonNames: ['Cancel', 'Accept'],
    	title: 'Exit'
    });
    
    var openLogoutMessage = function (e){
    	dialogLogout.message = 'Are you sure you want to exit of the app?';
    	dialogLogout.show();
    	
    };
    
    logoutBtn.addEventListener('click', openLogoutMessage );
    
    dialogLogout.addEventListener('click', function(e){
    	
    	if (e.index !== e.source.cancel){
    		logout();
    	}
    	
    });
    
    var logout = function (){
    	self.close();
    };
    
    var getData = function (){ 	
    	var data = {
		  "resultCount": 2,
		  "results": [
		    {
		      "Id": 1,
		      "Name": "Monedas",
		      "Description": "Convierta monedas de diferentes países y regiones en tiempo real.",
		      "Image": '/images/moneda.png'
		    },
		    {
		      "Id": 2,
		      "Name": "Longitud",
		      "Description": "Convierta diferentes medidas de longitud.",
		      "Image": '/images/longitud.png'
		    },
		  ]
		};
		drawTableData(data.results);
		Ti.App.data = data.results;
		//Ti.API.info('length:' + data.length + ', '+ JSON.stringify(data.results[0].trackName));
		//var urlGetArtist = Ti.App.Properties.getString('getArtist') + 'term=mana&limit=20';
		/*
		glog.net.getJSON(urlGetArtist, function (jsonData) {
			if (jsonData.resultCount !== 0) {
				var listSongs = jsonData.results;
				if (listSongs !== '' && listSongs !== null && listSongs !== undefined) {
					drawTableData(listSongs);
				}	
			}else{
				//alert('erro');
			}
			
			
		} , 'POST', null);
		*/

   };
   
   var tableView = Titanium.UI.createTableView({
		//disableBounce: true,
		top: 0,
		scrollable : true 
	});
	//EventListener
	tableView.addEventListener('click', function(e)
	{
		showClickEventInfo(e);
	});
	
	function showClickEventInfo(e, islongclick) {
		// event data
		var index = e.index;
		var section = e.section;
		var row = e.row + " " + e.row.Description;
		var rowdata = Ti.App.data[e.index].Name;
		Ti.App.Nombre = Ti.App.data[e.index].Name;
		openConvertionWindow();
	}
	
	var openConvertionWindow = function () {
        
        var win = require('/ui/common/convertion/convertion');
        new win().open();
        
        if (glog.isiOS) {
        	navWin.close(self);
        }else{
        	self.close();
        }
        
   };
	
	self.add(tableView);
	
    var drawTableData = function (args){
   		var rows = [];
   		
   		for (var x = 0; x < args.length; x++){
   			
   			var element = args[x];
   			
   			var row = Ti.UI.createTableViewRow({
				backgroundColor: 'transparent',
				selectedBackgroundColor: 'transparent',
				height: 100,
		    	width: Ti.UI.FILL
		    	
			});
			
			var photoImg = Ti.UI.createImageView ({
				image: element.Image,
				top:0,
				left: 0,
				width: 100,
				height: 99
			});
			
			var Name = Ti.UI.createLabel({
				text: element.Name,
				top: 5,
				left: 105,
				width: Ti.UI.FILL,
				color: '#000000',
				font: { fontSize: 16, fontFamily:'Helvetica-Neue', fontWeight: 'Bold'}
				
			});
			
			var Description = Ti.UI.createLabel({
				text: element.Description,
				top: 25,
				left: 105,
				width: Ti.UI.FILL,
				color: '#9E9E9E',
				font: { fontSize: 14, fontFamily:'Helvetica-Neue', fontWeight: 'Normal'}
			});
			
			
			
			
   			row.add(photoImg);
   			row.add(Name);
   			row.add(Description);
   			rows.push(row);
   		}
   		
   		Ti.API.info(JSON.stringify(rows));
   		tableView.setData(rows);
   		
    };
    
   
    self.addEventListener('open', function() {
    	
    	if (glog.isAndroid) {
			actionBarModule.setDisableIcon(false);
			actionBarModule.setTitle({
		    	text: 'Convertion App',
		    	font: {
			    	fontSize: 16
			        
			    },
		    	color: '#ffffff'
		    });
			
			actionBarModule.setBackgroundColor('#000');
			    
			var activity = self.getActivity();
			if (activity) {
				activity.actionBar.displayHomeAsUp = true;
				activity.actionBar.onHomeIconItemSelected = function() {
					openLogoutMessage();
				};
    		}
    	}
    	//TODO - STEP 1
    	getData();
    	
    });
    
    
    self.addEventListener('android:back', function(){
    	openLogoutMessage();
    });
    
    
    if(glog.isiOS){
    	return navWin;
    }else{
    	return self;
    }
};

module.exports = dashboard;