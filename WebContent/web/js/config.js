var DEVHOST = "http://dev.api.ge.com/gecorp/wind/bladeinspection/v1/service";
var STGHOST = "http:// /gecorp/wind/bladeinspection/v1";
var PRODHOST = "http:// /gecorp/wind/bladeinspection/v1";
var LOCALHOST = "http://3.209.92.107:8080/checklistadminportal/service";
var DEVAPP = "https://dev-wfservices.pw.ge.com/checklistadminportal/web/index";
var STGAPP = "http:// /checklistadminportal/web/index.html";
var PRODAPP = "http:// /checklistadminportal/web/index.html";
var LOCALAPP= "http://3.209.92.107:8080/checklistadminportal/web/index";

//var DEVAPPURL = "https://dev-wfservices.pw.ge.com/checklistadminportal/web/portalHandler";
//var LOCAL = "http://3.209.48.74:8080/checklistadminportal/web/portalHandler";


var PATH = "/gecorp/wind/bladeinspection/v1/service";

var Application = {
		// Web Services base url
		DEVBASEURL : "https://dev-wfservices.pw.ge.com/checklistadminportal/service/",
		STAGEBASEURL : "https://st-wfservices.gepower.com/checklistadminportal/service/",
		PRODBASEURL : "https://wfservices.gepower.com/checklistadminportal/service/",
		LOCAL : "checklistadminportal/service/",
		// Server DNS Names
		DEVDNSNAME : "https://dev-wfservices.pw.ge.com",
		STAGEDNSNAME : "https://st-wfservices.gepower.com",
		PRODDNSNAME : "https://wfservices.gepower.com",
		
		//Mobile Service Details
		mobileServices : {
			userRoleAndPermission:"getuserroleandpermission",
			checklistDetail : "getchecklistdetail",
			checklistMetadata : "getJobsTrackingFilter",
			checklistLastRecords : "getJobTrackingDataDetails",
			checklistGetImage:"getGEKJobFilterByFilter",
			validationRuleList:"getvalidationrulelist",
			
		},
		//Web Portal Service Details
		checklistServices:{
			checklistComponent:"checklistComponent",
			businessHierarchyDetail:"businessHierarchyDetail",
			functionChecklist:"functionChecklist",
			subfunctionChecklist:"subfunctionChecklist",
			groupChecklist:"groupChecklist",
			elementPropertiesList:"getelementproperties",
			uploadChecklistImages:"uploadimagesbyportal",
			saveMetadata:"saveMetadata",
			editCheckList:"getchecklistmetadataforedit",
			publishchecklist:"publishchecklist",
			checklistnames:"checklistnames",
			checklistversions:"checklistversions",
			searchrecords:"searchrecords",
			exportxls:"export",
			downloadimages:"downloadimages",
			uploadbulkimages:"uploadbulkimages",
			downloadbulkimages:"downloadbulkimages",
			checklistnameexists:"checklistnameexists",
		},
		deshboardServices:{
			loadchecklist:"loadChecklist",
			checklistDetail : "getchecklistdetail",
			pageChecklist:"pageChecklist",
			searchChecklistForm:"searchChecklistForm",
			deleteChecklist:"deleteChecklist",
			getvalidationrulelist:"getvalidationrulelist",
		},
		userServices : {
			userRoleAndPermission:"getportaluserroleandpermission",
			eraseBrowserCookies:"deleteCookiesonLogout"
		},
};

function loadpage(page) {
	window.location.href = page;
}

$(document)
.ready(
		function() {

			if (document.domain == "" || document.domain == null) {
				Application.devurl = "https://dev-wfservices.pw.ge.com"
					+ PATH;	
				Application.hostname = "DEV";
				Application.appurl = DEVAPP;
				Application.logouturl = Application.devlogouturl;

			} else if (document.domain.indexOf("dev") != -1){
				Application.devurl = DEVHOST;
				Application.hostname = "DEV";
				Application.appurl = DEVAPP;
				Application.logouturl = Application.devlogouturl;

			}else if(document.domain.indexOf("stg") != -1){
				Application.devurl = STGHOST;
				Application.hostname = "STG";
				Application.appurl = STGAPP;
				Application.logouturl = Application.stglogouturl;
			}else if(document.domain.indexOf("3.209.92.107") != -1){
				Application.devurl = LOCALHOST;
				Application.hostname = "LOCAL";
				Application.appurl = LOCALAPP;
				Application.logouturl = Application.devlogouturl;
			}else{
				Application.devurl = PRODHOST;
				Application.hostname = "PROD";
				Application.appurl = PRODAPP;
				Application.logouturl = Application.prodlogouturl;
			}


		});