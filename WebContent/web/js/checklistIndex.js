requirejs.config({
 baseUrl: './js',
  paths: {
    'jquery':                                   'vendor/require-jquery',
    'bootstrap':                                'vendor/bootstrap',
    'jquery-ui':                                'vendor/jquery-ui',
    'd3':                                       'vendor/d3.v2',
    'highstock':                                'vendor/highstock',
    'datatables':                               'ge/datatables',
    'prettify':                                 'vendor/prettify/prettify',
    'chosen':                                   'vendor/chosen/chosen.jquery.min',
	'datepicker':                               'vendor/bootstrap/bootstrap-datepicker'
  },
  shim: {
    // Bootstrap
    'bootstrap/bootstrap-alert':                [ 'jquery' ],
    'bootstrap/bootstrap-button':               [ 'jquery' ],
    'bootstrap/bootstrap-carousel':             [ 'jquery' ],
    'bootstrap/bootstrap-collapse':             [ 'jquery' ],
    'bootstrap/bootstrap-dropdown':             [ 'jquery' ],
    'bootstrap/bootstrap-modal':                [ 'jquery' ],
    'bootstrap/bootstrap-popover':              [ 'jquery', 'bootstrap/bootstrap-tooltip' ],
    'bootstrap/bootstrap-scrollspy':            [ 'jquery' ],
    'bootstrap/bootstrap-tab':                  [ 'jquery' ],
    'bootstrap/bootstrap-togglenav':            [ 'jquery' ],
    'bootstrap/bootstrap-tooltip':              [ 'jquery' ],
    'bootstrap/bootstrap-transition':           [ 'jquery' ],
    'bootstrap/bootstrap-typeahead':            [ 'jquery' ],
	'bootstrap/bootstrap-datepicker':            [ 'jquery' ],

    // Highcharts (Highstock)
    'highstock':                                ['jquery'],
	
	'datatables':                                ['jquery'],
	
'chosen':                                   ['jquery'],

    // DataTables
  'datatables/jquery.dataTables':             ['jquery'],
    'datatables/TableTools':                    ['datatables/jquery.dataTables'],
    'datatables/ColReorder':                    ['datatables/jquery.dataTables'],

    // D3
    // `exports` tells requirejs to use the global d3 object as the module value
    // it does not, however, allow you to change the name of the module to 'd9' or 'foobar'
    // `exports` can also be a function which returns a value like `return jQuery.noConflict()`
    'd3':                                       { deps: [ 'jquery' ], exports: 'd3' }
  },
  waitSeconds: 0
});

require(['chosen','datepicker','bootstrap'/*,'datatables','ge/filtertray','modal','transition'*/], function (ch,dp,bs,dt) {
var curr_div_id = '';
var global_row = '';
var global_column = '';

$("#btnClear").click(function() {
	bootstrap_non_alert.clear("#alert_placeholder");
	
	$("#loginUserName").val("");
	$("#loginUserName").removeAttr("required","false");
});

$("#btnLogin").click(function(){
	var userName = $("#loginUserName").val();
	var accessToken = $("#accessToken").val();
	callWebService(userName, accessToken);
	//login(userName,password);	

});

 function callWebService(userName, accessToken){
	//environmentVar values will be "DEV", "STAGE", "PRODUCTION" based on environment using
	/*var param = {serviceName:"getuserroleandpermission", userName:userName, firstName:"vijay",lastName:"SIngh",email:"vijaykumar.singh@ge.com",region:"America",emailType:"quote",phone:"123456",company:"Igate"};
	var param1 =JSON.stringify({ serviceName: Application.mobileServices.userRoleAndPermission, 
		 serviceParam:"/"+userName, environmentVar:"DEV", method:"POST",
		 postdata:param});*/
	 //console.log(Application.DEVAPPURL);
	 //console.log("accessToken -- "+accessToken);
	$.ajax({
        type:"POST",
        global:false,
        dataType: "json", 
        //data: param1,
        contentType: "application/json; charset=utf-8",
        //url: "http://3.209.204.77:8080/checklistadminportal/web/portalHandler",
        url:Application.PRODBASEURL+"getuserroleandpermission/"+userName,
        processData: false,
        success: function(msg) {
        	var resString = JSON.stringify(msg);
        	console.log(msg);
        	//alert(msg);
        	$('#responseLable').text(resString);
        	//$('#jsId').html(msg);
        }
});
}

bootstrap_non_alert = function() {};
bootstrap_non_alert.error = function(mId, message) {
    $(mId).html('<div class="alert alert-danger"><span>'+message+'</span></div>');
};

bootstrap_non_alert.success = function(mId,message) {
$(mId).html('<div class="alert alert-success"><span>'+message+'</span></div>');
};

bootstrap_non_alert.clear = function(mId) {
$(mId).html("");
};


});