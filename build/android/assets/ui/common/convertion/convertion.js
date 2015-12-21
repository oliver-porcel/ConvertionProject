function convertion () {
	
	var glog = Ti.App.glog;
	
	var self = Ti.UI.createWindow({
        backgroundColor: '#ffffff',
        navBarHidden: false,   
    	exitOnClose:false,
    	fullscreen:false,
        orientationModes : [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT],
   		title: 'Convertion' 
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
    var backBtn = Titanium.UI.createButton({
    	title: 'Back'
	});

    if (glog.isiOS) {
    	self.setLeftNavButton(backBtn);
    }
    
    
    var BackToDashboard = function (){
    	
		var newWindowClass = require('/ui/common/home/dashboard');
	    var newWindow = new newWindowClass();
    	newWindow.open();
    	self.close();
    };
    
    backBtn.addEventListener('click', BackToDashboard );
    
    
    
    
   
    self.addEventListener('open', function() {
    	
    	if (glog.isAndroid) {
			actionBarModule.setDisableIcon(false);
			actionBarModule.setTitle({
		    	text: 'Conversion de ' + Ti.App.Nombre,
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
					BackToDashboard();
				};
    		}
    	}
    	//TODO - STEP 1
    	
    });
    //CONTROLS OF CONVERTION
    var lblDe = Ti.UI.createLabel({
    	color: '#000000',
		top: 0, 
		width: 250, 
		height: 40,
		text: 'De:',
        backgroundColor: '#ffffff',
    });
    
    self.add(lblDe);
    
    // Create a TextField.   
    var txtAConvertir = Ti.UI.createTextField({
	  	color: '#000000',
		top: 40, 
		width: 250, 
		height: 40,
		hintText: 'Number to convert',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ALWAYS,
		editable: true,
        backgroundColor: '#ffffff',
		borderColor: '#000000'
        
	});
    
    
    // Listen for return events.
    txtAConvertir.addEventListener('return', function(e) {
        txtAConvertir.blur();
        alert('Input was: ' + txtAConvertir.value);
    });
    
    // Add to the parent view.
    self.add(txtAConvertir);
    
    //creating picker
    var picker = Ti.UI.createPicker({
    	top: 90, 
		width: 250, 
		height: 40,
		font: { fontSize: 16, fontFamily:'Helvetica-Neue', fontWeight: 'Bold', color: 'Black'},
        backgroundColor: 'Black',
		borderColor: '#000000'
    });
    
    var lblA = Ti.UI.createLabel({
    	color: '#000000',
		top: 130, 
		width: 250, 
		height: 40,
		text: 'A:',
        backgroundColor: '#ffffff',
    });
    
    self.add(lblA);
    
    var txtResult = Ti.UI.createTextField({
	  	color: '#000000',
		top: 170, 
		width: 250, 
		height: 40,
		hintText: 'Result',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ALWAYS,
		editable: false,
        backgroundColor: '#ffffff',
		borderColor: '#000000'
        
	});
	
	self.add(txtResult);
	
	var picker2 = Ti.UI.createPicker({
    	top: 220, 
		width: 250, 
		height: 40,
		font: { fontSize: 16, fontFamily:'Helvetica-Neue', fontWeight: 'Bold', color: 'Black'},
        backgroundColor: 'Black',
		borderColor: '#000000'
    });
	
	var data = [];
	data[0]=Ti.UI.createPickerRow({title:'No Implementado',custom_item:'NIE'});
	if(Ti.App.Nombre === "Monedas"){
		data[0]=Ti.UI.createPickerRow({title:'Bolivianos',custom_item:'BOB'});
		data[1]=Ti.UI.createPickerRow({title:'Dolar - Estados Unidos',custom_item:'USD'});
		data[2]=Ti.UI.createPickerRow({title:'Peso Chileno',custom_item:'CLP'});
		data[3]=Ti.UI.createPickerRow({title:'Peso Argentino',custom_item:'ARS'});
		data[4]=Ti.UI.createPickerRow({title:'Real Brasilero',custom_item:'BRL'});
		data[5]=Ti.UI.createPickerRow({title:'Bitcoin',custom_item:'BTC'});
		data[6]=Ti.UI.createPickerRow({title:'Peso Cubano',custom_item:'CUP'});
		data[7]=Ti.UI.createPickerRow({title:'Peso Colombiano',custom_item:'COP'});
		data[8]=Ti.UI.createPickerRow({title:'Colon - Costa Rica',custom_item:'CRC'});
		data[9]=Ti.UI.createPickerRow({title:'Peso Dominicano',custom_item:'DOP'});
		data[10]=Ti.UI.createPickerRow({title:'Euro',custom_item:'EUR'});
		data[11]=Ti.UI.createPickerRow({title:'Libra Britanica',custom_item:'GBP'});
		data[12]=Ti.UI.createPickerRow({title:'Peso Mexicano',custom_item:'MXN'});
		data[13]=Ti.UI.createPickerRow({title:'Guarani - Paraguay',custom_item:'PYG'});
		data[14]=Ti.UI.createPickerRow({title:'Nuevo Sol - Peru',custom_item:'PEN'});
		data[15]=Ti.UI.createPickerRow({title:'Bolivar - Venezuela',custom_item:'VEF'});
		data[16]=Ti.UI.createPickerRow({title:'Peso Colombiano',custom_item:'COP'});
	}
	
	var btnConvert = Ti.UI.createButton({
        height : 40,
        width: 250,
        top : 270,
        title: 'Convert',
        backgroundColor: 'red',
        color: '#000000',
        font: {
            fontSize: 16,
            fontFamily:'Helvetica'
        }
    });
    
    self.add(btnConvert);
	
	btnConvert.addEventListener('click', function(e) {
    	if(Ti.App.Nombre === 'Monedas')
    	{
    		Ti.API.info(txtAConvertir.value);
    		if (txtAConvertir.value !== ' ' || txtAConvertir.value !== '' || txtAConvertir.value !== undefined)
    		{
    			var numero = parseFloat(txtAConvertir.value);
    			if (numero !== ' ' || numero !== null)
    				convertirMonedas();
    		}
    		else
    		{
    		}
    		
    	}
    	
    	
    });
    
    picker.addEventListener('change',function(e)
	{
		Ti.App.MonedaO = e.row.custom_item;
		//Ti.API.info("You selected row: "+e.row+", column: "+e.column+", custom_item: "+e.row.custom_item);
		//label.text = "row index: "+e.rowIndex+", column index: "+e.columnIndex+", custom_item: "+e.row.custom_item;
	});
	
	picker2.addEventListener('change', function(e){
		Ti.App.MonedaD = e.row.custom_item;
	});
    
    function convertirMonedas()
    {
    	
    	if (Ti.App.MonedaO === Ti.App.MonedaD)
    	{
    		txtResult.value = txtAConvertir.value;
    	}
    	else
    	{
    		var urlGetConvertion = Ti.App.Properties.getString('convert') + txtAConvertir.value +'&from='+ Ti.App.MonedaO +'&to=' + Ti.App.MonedaD;
			glog.net.getHtml(urlGetConvertion, function (htmlData) {
			if (htmlData.resultCount !== 0) {
				var data = htmlData.toString();
				var myar = data.split("<span class=bld>");
				var mynewarr = myar[1].split(Ti.App.MonedaD);
				var result = mynewarr[0];
				if (result !== '' && result !== null && result !== undefined) {
					var monto = parseFloat(result).toFixed(2);
					txtResult.value = monto;
				}	
			}
			else{
				//alert('erro');
			}
			} , 'GET', null);
    	}
    }
	
	// turn on the selection indicator (off by default)
	picker.selectionIndicator = true;
	
	picker.add(data);
	
	self.add(picker);
	
	picker2.selectionIndicator = true;
	
	picker2.add(data);
	
	self.add(picker2);
	
	picker.setSelectedRow(0,0,true);
	Ti.App.MonedaO = 'BOB';
	
	picker2.setSelectedRow(0,1,true);
	Ti.App.MonedaD = 'USD';
    
    self.addEventListener('android:back', function(){
    	BackToDashboard();
    });
    
    
    if(glog.isiOS){
    	return navWin;
    }else{
    	return self;
    }
};

module.exports = convertion;