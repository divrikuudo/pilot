
function getServerPath() {
    var SERVERPATH = "";
    var serverName = sessionStorage.getItem("serverName");
    if (serverName.indexOf("dev") >= 0) {
        SERVERPATH = Application.DEVBASEURL;
    } else if (serverName.indexOf("st") >= 0) {
        SERVERPATH = Application.STAGEBASEURL;
    } else if (serverName.indexOf("wfservices") >= 0) {
        SERVERPATH = Application.PRODBASEURL;
    } else if (serverName.indexOf("3.209") >= 0) { //3.209.204
        SERVERPATH = "http://" + serverName + ":8080/" + Application.LOCAL;
    } else {
        SERVERPATH = Application.PRODBASEURL;
    }
    return SERVERPATH;
}
function getServerDNSName() {
    var DNSNAME = "";
    var serverName = sessionStorage.getItem("serverName");
    if (serverName.indexOf("dev") >= 0) {
    	DNSNAME = Application.DEVDNSNAME;
    } else if (serverName.indexOf("st") >= 0) {
    	DNSNAME = Application.STAGEDNSNAME;
    } else if (serverName.indexOf("wfservices") >= 0) {
    	DNSNAME = Application.PRODDNSNAME;
    } else if (serverName.indexOf("3.209") >= 0) { //3.209.204
    	DNSNAME = "http://" + serverName + ":8080/" + Application.LOCAL;
    } else {
    	DNSNAME = Application.PRODDNSNAME;
    }
    return DNSNAME;
}
var ssoId="";
var ruleOrder=0;
var sess_pollInterval = 60000;
var sess_expirationMinutes = 30;
var sess_warningMinutes = 20;
var sess_intervalID;
var sess_lastActivity;
var showDivFLag=0;
var editFormFLag=0;
function initSession() {
	sess_lastActivity = new Date();
	sessSetInterval();
	$(document).bind('keypress.session', function (ed, e) {
		sessKeyPressed(ed, e);
	});
}
function sessSetInterval() {
    sess_intervalID = setInterval('sessInterval()', sess_pollInterval);
}
function sessClearInterval() {
    clearInterval(sess_intervalID);
}
function sessKeyPressed(ed, e) {
    sess_lastActivity = new Date();
}
function sessLogOut() {
	setLogout();
}
function sessInterval() {
    var now = new Date();
    //get milliseconds of differneces
    var diff = now - sess_lastActivity;
    //get minutes between differences
    var diffMins = (diff / 1000 / 60);
    if (diffMins >= sess_warningMinutes) {
        //warn before expiring
        //stop the timer
        sessClearInterval();
        //prompt for attention
		$('#sessionExpMsg').html('Your session will expire in ' + 
		        (sess_expirationMinutes - sess_warningMinutes) +
		        ' minutes (as of ' + now.toTimeString() + '),' +
		        'press OK to remain logged in ' +
		        'or press Cancel to log off.' + 
		        '\nIf you are logged off any changes will be lost.');
		$('#sessionExpirePopup').modal();
		
		$('.sessionok').click(function() {
			now = new Date();
            diff = now - sess_lastActivity;
            diffMins = (diff / 1000 / 60);
            if (diffMins > sess_expirationMinutes) {
                sessLogOut();
            } else {
                initSession();
                sessSetInterval();
                sess_lastActivity = new Date();
            }
		});
		$('.sessionCancel').click(function() {
			setLogout();
		});
    }
}
$(document).ready(function() {
	startiLoaderSpiner();
	$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
	$('#devi').hide();
	var accessToken = $("#accessToken").val();
	sessionStorage.setItem("serverName", accessToken);
	$("body").on("click", ".accrodionTitle", function() {
		if ($(this).parent().next().hasClass("expanded")) {
			$(this).parent().nextAll().removeClass("expanded").addClass("notExpanded");
			$(this).parent().find(".accIcon").removeClass("icon-chevron-up").addClass("icon-chevron-right");
			$(this).parent().find(".accRightSideIcon").removeClass("icon-chevron-up").addClass("icon-chevron-down");
		} else {
			if ($(this).parent().next("div").length) {
				$(this).parent().nextAll().removeClass("notExpanded").addClass("expanded");
				$(this).parent().find(".accIcon").removeClass("icon-chevron-right").addClass("icon-chevron-up");
				$(this).parent().find(".accRightSideIcon").removeClass("icon-chevron-down").addClass("icon-chevron-up");
			}
		}
	});
	if ($.browser.mozilla){
		$(document).on("focus", ".datepicker", function(e) {
			$("#"+this.id).datepicker({
				changeMonth: true,
				changeYear: true,
				firstDay: 1,
				showAnim: 'slideDown',
				dateFormat: 'mm/dd/yyyy',
				autoclose:true,
			});
		}); 
	}
	 
	/***********Add Image Element ************/
	$(document).on('click', '.delImage', function() {
		$(this).parent().remove();
	});
    $(document).on('click', '.img_input', function() {
    	var img_id = this.id;
    	var id = img_id.replace('img_input_', '');
    	if ($("#file1_" + id).parent().find(".addImagesDynamic img").length == 5) {
    		$("#AlertPopupImage_").modal();
    		return false;
    	}
    	$("#file1_" + id).trigger("click");
    	$("#file1_" + id).unbind().on("change", function() {
    		var imgSize = $("#file1_" + id).parent().find(".addImagesDynamic img").length;
    		if (imgSize < 5) {
    			readImage(this, id);
    		}
    	});
    });
   /***********Caching Mechanism Code************/
    $(document).on('click','#checklistManagement',function(){
    	$('#dashboardcontent').css("display","block");
    	$('#recordsManagementContent').css("display","none");
    	$('#createchecklist').css("display","none");
    	$(this).parent().attr("class","active");
    	$('#records').parent().removeClass("active");
    	$('#userManagement').parent().removeClass("active");
    	$('#records').parent().removeClass("active");
    });
    $(document).on('click','#userManagement',function(){
    	$('#recordsManagementContent').css("display","none");
    	$('#dashboardcontent').css("display","none");
    	$(this).parent().attr("class","active");
    	$('#checklistManagement').parent().removeClass("active");
    	$('#rolesPerm').parent().removeClass("active");
    	$('#records').parent().removeClass("active");
    });
    $(document).on('click','#rolesPerm',function(){
    	$('#recordsManagementContent').css("display","none");
    	$('#dashboardcontent').css("display","none");
    	$(this).parent().attr("class","active");
    	$('#checklistManagement').parent().removeClass("active");
    	$('#userManagement').parent().removeClass("active");
    	$('#records').parent().removeClass("active");
    });
    $(document).on('click','#records',function(){
    	$('#recordsManagementContent').css("display","block");
    	$('#dashboardcontent').css("display","none");
    	$(this).parent().attr("class","active");
    	$('#checklistManagement').parent().removeClass("active");
    	$('#userManagement').parent().removeClass("active");
    	$('#rolesPerm').parent().removeClass("active");
    });
   saveDraft();
});
/**********************MetaData Service Call********************/
function duplicateName(url,json,success){
	startiLoaderSpiner();
	$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
	$.ajax({
		type: "POST",
		url: url,
		data: json,
		dataType: "json",
		restful: true,
		contentType: 'application/json',
		cache: false,
		timeout: 20000,
		async: true,
		beforeSend: function(data) {},
		success: function(data) {
			success.call(this, data);
			stopiLoaderSpiner();
			$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});

		},
		error: function(data) {

			stopiLoaderSpiner();
			$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});

		}
	});
}

function post_data(url, jsonfy, success) {
	startiLoaderSpiner();
	$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
	$.ajax({
		type: "POST",
		url: url,
		data: jsonfy,
		dataType: "json",
		restful: true,
		contentType: 'application/json',
		cache: false,
		timeout: 20000,
		async: true,
		beforeSend: function(data) {},
		success: function(data) {
			if (data.requestStatus.responseCode != '3000') {						
				$('#createChecklistErrorPopup').modal();
				intialize();
				stopiLoaderSpiner();
				$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
				return;
			}else{
				success.call(this, data);
				$("#AlertSuccess").modal();
				stopiLoaderSpiner();
				$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
			}
		},
		error: function(data) {
			intialize_1();
			editCall();
			stopiLoaderSpiner();
			$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
			alert("Error In Connecting");
		}
	});
}
/**********************Image Uploading Service Call********************/
function image_post(url_image, image_Obj, success) {
	startiLoaderSpiner();
	$('.container').css({'opacity': '0.3','z-index': '-1'});
	$('.modal-backdrop.fade.in').css({'z-index': '-1'});
	$.ajax({
		type: "POST",
		url:url_image,
		dataType: "json",
		restful: true,
		contentType: 'application/json',
		cache: false,
		data:image_Obj,
		beforeSend: function(data) {},
		success: function(data) {
			success.call(this, data);
			stopiLoaderSpiner();
			$('.container').css({'opacity': '1','z-index': '0'});
			$('.modal-backdrop.fade.in').css({'z-index': '0'});
			$("#helpPopup").modal('hide');
			$("#helpPopup *").prop('disabled', false);
			$(".delImageForm").prop('disabled', false);
			$(".delImageSect").prop('disabled', false);
			$(".delImageStep").prop('disabled', false);
			$(".delImageQues").prop('disabled', false);
			$("#helpSectionPopup *").prop('disabled', false);
			$("#helpStepPopup *").prop('disabled', false);
			$("#helpQuesPopup *").prop('disabled', false);
		},
		error: function(data) {
			intialize_1();
			editCall();
			stopiLoaderSpiner();
			$('.container').css({'opacity': '1','z-index': '0'});
			$('.modal-backdrop.fade.in').css({'z-index': '0'});
			alert("Error In Connecting to server");
		}
	});
}
function displaySaveDraft(showDivFLag,editFormFLag,flagForSaveDraft){
	if(showDivFLag==1){
		flagForSaveDraft=checkToShowSaveDraftButton(flagForSaveDraft);
		if(flagForSaveDraft==0){
			$(".CLCBtnDiv").show(); 
		}
		else{
			$(".CLCBtnDiv").hide();
		}
	}
	if(editFormFLag==1){
		flagForSaveDraft=checkToShowSaveDraftButtonInEditMode(flagForSaveDraft);
		if(flagForSaveDraft==0){
			$('.CLCBtnDiv_').show();
		}
		else{
			$('.CLCBtnDiv_').hide();
		}
	}
}
function checkToShowSaveDraftButtonInEditMode(flagForSaveDraft){
	$('.sectMainDiv').each(function() {
		var noStep="no";
		$(this).find('.stepMainDiv').each(function() {
			noStep = "yes";
		});
		if(noStep=="yes"){
			$(this).find('.stepMainDiv').each(function() {
				var questChange="no";
				$(this).find('.quesMainDiv').each(function() {
					questChange = "yes";
				});
				if(questChange=="yes"){
				}
				else{
					flagForSaveDraft=1;
					$('.CLCBtnDiv_').hide();
				}
			}); 
		}
		else{
			flagForSaveDraft=1;
			$('.CLCBtnDiv_').hide();
		}
	});
	return flagForSaveDraft;
}
function checkToShowSaveDraftButton(flagForSaveDraft){
	$('.sectMainDiv').each(function() {
		var noStep="no";
		$(this).find('.stepMainDiv').each(function() {
			noStep = "yes";
		});
		if(noStep=="yes"){
			$(this).find('.stepMainDiv').each(function() {
				var questChange="no";
				$(this).find('.quesMainDiv').each(function() {
					questChange = "yes";
				});
				if(questChange=="yes"){
				}
				else{
					flagForSaveDraft=1;
					$(".CLCBtnDiv").hide();
				}
			}); 
		}
		else{
			flagForSaveDraft=1;
			$(".CLCBtnDiv").hide();
		}
	});
	return flagForSaveDraft;
}

function readImage(input, id) {
	if (input.files && input.files[0]) {
		var FR = new FileReader();
		FR.onload = function(e) {
			$(input).parent().parent().find("#addImagesDynamic_" + id).append("<div class='imgDimensions' id='image_" + id + "' ><img src='" + e.target.result + "' value='" + e.target.result + "'/><i class='icon-trash delImage' ></i></div>");
		};
		FR.readAsDataURL(input.files[0]);
	}
}
$('#logout').click(function() {
	var accessToken = $("#accessToken").val();
	$("#logoutPopup").modal();
	$(".confirm").click(function() {
		setLogout();        
	});
});
function setLogout() {
	var DNSNAME = getServerDNSName();
	sessionStorage.clear();
	localStorage.clear();
	window.location=DNSNAME+"/auth/oauthredirect?logout=%2Funprotected%2FdigiformLoggoff.jsp";
}
function getCookies(name) {
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1) {
		begin = dc.indexOf(prefix);
		if (begin != 0) return null;
	}
	else
		begin += 2;
	var end = document.cookie.indexOf(";", begin);
	if (end == -1)
		end = dc.length;
	return unescape(dc.substring(begin + prefix.length, end));
}
function deleteCookie(name, path, domain) {
	if (getCookies(name)) {
		document.cookie = name + "=" + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + "; expires=Thu, 01-Jan-00 00:00:01 GMT";
	}
}
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function eraseCookie(name) {
	createCookie(name,"",-1);
}
var oTable;
require(['jquery', 'datagrids'], function($) {
	init();
});
function init() {
	load();
}
function clearListCookies() {
	document.cookie = encodeURIComponent('st-wfservices.gepower.com') + "=deleted; expires=" + new Date(0).toUTCString();
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++){   
		var spcook =  cookies[i].split("=");
		deleteCookie (spcook[0], "/", ".ge.com");
	}
	window.location = ""; // TO REFRESH THE PAGE
}
function deleteCookie(name, path, domain) {	
	if (getCookies(name)) {
		document.cookie = name + "=" +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		"; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}		
function getCookies(name) {
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1) {
		begin = dc.indexOf(prefix);
		if (begin != 0) return null;
	} else
		begin += 2;
	var end = document.cookie.indexOf(";", begin);
	if (end == -1)
		end = dc.length;
	return unescape(dc.substring(begin + prefix.length, end));
}		
function load() {
	var sso = $("#sso").val();
	ssoId=$("#sso").val();
	/* sessionStorage.setItem("userId", sso); //200021669 //502413406
    ssoId = sessionStorage.getItem("userId");*/
	var serverbaseUrl = getServerPath();
	$.ajax({
		type: "POST",
		global: false,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		url: serverbaseUrl + Application.userServices.userRoleAndPermission + "/" + ssoId,
		success: function(response) {
			if (response.resultSet.roleName != "SuperUser") {
				$('.primary-navbar ul li:nth-child(2)').hide();
				$('.primary-navbar ul li:nth-child(3)').hide();
			}
			if (response.requestStatus.responseMessage == "No Record found to display.") {
				stopiLoaderSpiner();
				$("#AlertInvalidUser").modal();                
			} else if (response.requestStatus.responseMessage == "SUCCESS") {
				var roleuser = response.resultSet.roleName;
				sessionStorage.setItem('role', roleuser);
				var lname = response.resultSet.lastName;
				var fname = response.resultSet.firstName;
				$('.user-name').append('<span style="padding-right:5px;">' + lname + '</span><span>' + fname + '</span>');
				if (roleuser != "SuperUser") {
					$('.primary-navbar ul li:nth-child(2)').hide();
					$('.primary-navbar ul li:nth-child(3)').hide();
				}
				checklistcomponent();
				pagechecklist();
			}
		},
		error: function() {},
		Complete: function() {},
	}); 
}
/*************Back Button Function *********************/
$(".backBtns").on("click", function() {
	$("#dilogueBack").modal();  
});
$(".CConfirm").on("click", function() {	
	$('.sectMainDiv').remove();
	$('.CLCBtnDiv_').show();
	$('.CLCBtnDiv').hide();
	$("#steps").val('');
	$("#questions").val('');
	$("#collapseTwo").removeClass("expanded").addClass("notExpanded");
	$(".accIcon").removeClass("icon-chevron-up").addClass("icon-chevron-right");
	$("#collapseOne").removeClass("expanded").addClass("notExpanded");
	$(".accIcon").removeClass("icon-chevron-up").addClass("icon-chevron-right");
	$('.CLName_innerDiv .textareaVal').val('');
	$('#createchecklist').fadeOut('medium', function() {
		$('#dashboardcontent').show();
		selectOnlyOneRow();
		
		stopiLoaderSpiner();
		$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
		$("#createchecklist").hide();
	});
});
function selectOnlyOneRow(){
	var rows = $('tr');
	rows.on('click', function(e) {
		var row=$(this);		 
		rows.removeClass('row_selected');
		rows.removeClass('highlightRow');
		row.addClass('highlightRow');
	});
}
var addSerialNumber = function() {
	$('table tbody tr').each(function(index) {
		$(this).find('td:nth-child(1)').html(index + 1);
	});
}
function filter() {
	$("#kwd_search").keyup(function() {
		var term = $(this).val()
		if (term != "") {
			$("#my-table tbody>tr").hide();
			$("#my-table td").filter(function() {
				return $(this).text().toLowerCase().indexOf(term) > -1
			}).parent("tr").show();
			$("#my-table tbody>tr th").show();
		} else {
			$("#my-table tbody>tr").show();
		}
	});
}
function logout() {
	$(".open .dropdown-menu li a").click(function() {
		sessionStorage.clear();
		window.location.replace('sample.html');
	});
}
$(".btnInvalidUser").on("click", function() {
	$("#AlertInvalidUser").hide();
	setLogout();
});
