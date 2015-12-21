Ti.App.Properties.setBool('hasSSL', false);
Ti.App.Properties.setString('urlAPI', 'https://www.google.com/finance/');
Ti.App.Properties.setString('convert', Ti.App.Properties.getString('urlAPI') +  'converter?a=');
(
	function() {
  
    var osName = Ti.Platform.osname;
    osName = osName == 'iphone' || osName == 'ipad' ? 'ios' :  osName == 'mobileweb' ? osName : 'android';
    
    var mainWindow;
    var isAndroid = (osName ==  'android') ? true : false;
    var isiPhone = (Ti.Platform.osname ==  'iphone') ? true : false;
    var isiPad = (Ti.Platform.osname ==  'ipad') ? true : false;
    var isiOS = (osName ==  'ios') ? true : false;
    
    
   	Ti.App.glog = {
        osName: osName,
        isAndroid: isAndroid,
        isiOS: isiOS,
        net: require ('/lib/common/network'),
        util: require('/lib/common/utilities')
        //dt: require('/lib/common/DateFunctions')
          
    };
  
   switch (osName) {
        
       case 'android':
            //var uiLogin = '/ui/common/login/login';
            var uiDashboard = '/ui/common/home/dashboard';
            break;

        case 'ios':
            //var uiLogin = 'ui/common/login/login';
            var uiDashboard = 'ui/common/home/dashboard';
            break;
    }
  	
  	mainWindow = new (require(uiDashboard))();
  	mainWindow.open();
      
}
)();

