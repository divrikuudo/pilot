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
	'bootstrap/bootstrap-datepicker':           [ 'jquery' ],

    // Highcharts (Highstock)
    'highstock':                                ['jquery'],
	'datatables':                               ['jquery'],
	'chosen':                                   ['jquery'],

    // DataTables
    'datatables/jquery.dataTables':             	['jquery'],
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


$("#btnLogin").click(function() {
	
	var userName = $("#loginUserName").val();
	var password = $("#loginPassword").val();
	sessionStorage.setItem("userId","502430465");	
	bootstrap_non_alert.clear("#alert_placeholder");
	
	if (userName == null || userName == "" || password == null || password == ""){
		
		$("#loginUserName").val("");
		$("#loginUserName").attr("required","true");
		$("#loginUserName").focus();
		$("#loginPassword").val("");
		$("#loginPassword").attr("required","true");
		$("#loginPassword").focus();
		bootstrap_non_alert.error("#alert_placeholder", "Both fields are required.");
	}else {
		login(userName,password);	
	}	
	
});


function login(userSsoId,password){
	if (userSsoId == null || userSsoId == "" || password == null || password == ""){
		//redirectScreen("ReqAccess");
	}else{
			
		$.ajax({
            type:"POST",
            global:false,
            beforeSend: function (request)
            {
                request.setRequestHeader("SM_SSOID", userSsoId);
            },
            url: "Webservice/authenticateUser",
            processData: false,
            success: function(msg) {
            	$('#jsId').html(msg);
				 sessionStorage.getItem("userId");
				 $('.user-name').append(userId);
            }
    });
	}	
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