/** ***********Editing Checklist******************** */
var frmID="";
var orgFormId = '';
// var sectionObj = new Array();
var globalFormId = 0;
var publishVersion = 0;
var draftVersion = 0;
var baseFormId;
var globalFormDTO=null;
var StatusName;
function form_post_data(url, jsonfy, success) {
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
			stopiLoaderSpiner();
			$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
			success.call(this, data);
		},
		error: function(data) {
			stopiLoaderSpiner();
			$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
			alert("Error In Connecting");
		}
	});
}
function checkFormForEdit(obj) {
	var ele=$(obj).parents('tr').children('td:eq(0)').text();
	var formId = sessionStorage.getItem("formIds").split(',')[ele -1];
	var formName = $(obj).parent().parent().find('td:nth-child(2)').text();
	var roleuser = sessionStorage.getItem('role');

	var finalResult = {
			formName: formName,
			functionId: sessionStorage.getItem("functionId"),
			subFunctionId: sessionStorage.getItem("subfunctionId"),
			"formLanguage": "English",
			formId:formId,
			"submittedBy": $("#sso").val(),
			"group":roleuser
	};
	var jsonfy = $.toJSON(finalResult);
	var encodedata = encodeURIComponent(jsonfy);
	var serverbaseUrl = getServerPath();
	var url = serverbaseUrl + "checkformforedit";
	form_post_data(url, jsonfy, function(data) {
		callMetadataService(obj, data.resultSet.editable);    	
	});
}

var commonObj;
function callMetadataService(obj, editable) {
	if (editable.isEditable == 'true') {
		fecthTableContent($(obj));
	} else {
		commonObj = obj;
		if (editable.isHasMutliple == 'true') {
			$('#versionMsg').html('There is already a newer version of the checklist available. Please confirm OK to only view this checklist');			
		} else {
			$('#versionMsg').html('There is already a draft version of the checklist available. Please confirm OK to only view this checklist');			
		}
		$('#versionPopup').modal();
	}
}

$(document).on("click", ".versionPopBtn", function(e) {
	fecthTableContent($(commonObj));
	$('.CLCBtnDiv_').hide();
	$('.backDiv').show();

});

function editCheckList() {
	var roleusername = sessionStorage.getItem('role');
	// var accessToken = $("#accessToken").val();
	$('.backDiv').show();
	$('.CLCBtnDiv_').show();
	$(".fa-pencil-square-o").on('click', function(e)  {
		intialize();
		intialize_1();
		editCall();
		editFormFLag=1;
		if (roleusername == 'SuperUser') {
			StatusName = $(this).parent().parent().find('td:nth-child(8)').text();
		} else {
			StatusName = $(this).parent().parent().find('td:nth-child(7)').text();
		}
		if(StatusName=="Draft"){
			$('.CLCBtnDiv12_').css("display","block");
		}
		else{
			$('.CLCBtnDiv12_').css("display","none");
		}
		if (!((StatusName == 'Draft') ||
				(StatusName == 'Approved and Published'))) {
			$('#deleteMsgPopup').modal();
			return;
		}
		if (StatusName == 'Approved and Published') {			
			checkFormForEdit($(this));
		} else {
			fecthTableContent($(this));
		}
	});
	$('#my-table_length select').on('change',function(){
		$(".fa-pencil-square-o").on('click', function(e)  {
			intialize();
			intialize_1();
			editCall();
			editFormFLag=1;
			if (roleusername == 'SuperUser') {
				StatusName = $(this).parent().parent().find('td:nth-child(8)').text();
			} else {
				StatusName = $(this).parent().parent().find('td:nth-child(7)').text();
			}
			if(StatusName=="Draft"){
				$('.CLCBtnDiv12_').css("display","block");
			}
			else{
				$('.CLCBtnDiv12_').css("display","none");
			}
			if (!((StatusName == 'Draft') || (StatusName == 'Approved and Published'))) {
				$('#deleteMsgPopup').modal();
				return;
			}
			if (StatusName == 'Approved and Published') {			
				checkFormForEdit($(this));
			} else {
				fecthTableContent($(this));
			}
		});
	});
	$('#my-table_paginate ul').on('click','li',function(){
		$(".fa-pencil-square-o").on('click', function(e)  {
			intialize();
			intialize_1();
			editCall();
			editFormFLag=1;
			if (roleusername == 'SuperUser') {
				StatusName = $(this).parent().parent().find('td:nth-child(8)').text();
			} else {
				StatusName = $(this).parent().parent().find('td:nth-child(7)').text();
			}
			if(StatusName=="Draft"){
				$('.CLCBtnDiv12_').css("display","block");
			}
			else{
				$('.CLCBtnDiv12_').css("display","none");
			}
			if (!((StatusName == 'Draft') || (StatusName == 'Approved and Published'))) {
				$('#deleteMsgPopup').modal();
				return;
			}
			if (StatusName == 'Approved and Published') {			
				checkFormForEdit($(this));
			} else {
				fecthTableContent($(this));
			}
		});
	});
	$('#tablesearch_length select').on('change',function(){
		$(".fa-pencil-square-o").on('click', function(e)  {
			intialize();
			intialize_1();
			editCall();
			editFormFLag=1;
			if (roleusername == 'SuperUser') {
				StatusName = $(this).parent().parent().find('td:nth-child(8)').text();
			} else {
				StatusName = $(this).parent().parent().find('td:nth-child(7)').text();
			}
			if(StatusName=="Draft"){
				$('.CLCBtnDiv12_').css("display","block");
			}
			else{
				$('.CLCBtnDiv12_').css("display","none");
			}
			if (!((StatusName == 'Draft') || (StatusName == 'Approved and Published'))) {
				$('#deleteMsgPopup').modal();
				return;
			}
			if (StatusName == 'Approved and Published') {			
				checkFormForEdit($(this));
			} else {
				fecthTableContent($(this));
			}
		});
	});
	$('#tablesearch_paginate ul').on('click','li',function(){
		$(".fa-pencil-square-o").on('click', function(e)  {
			intialize();
			intialize_1();
			editCall();
			editFormFLag=1;
			if (roleusername == 'SuperUser') {
				StatusName = $(this).parent().parent().find('td:nth-child(8)').text();
			} else {
				StatusName = $(this).parent().parent().find('td:nth-child(7)').text();
			}
			if(StatusName=="Draft"){
				$('.CLCBtnDiv12_').css("display","block");
			}
			else{
				$('.CLCBtnDiv12_').css("display","none");
			}
			if (!((StatusName == 'Draft') || (StatusName == 'Approved and Published'))) {
				$('#deleteMsgPopup').modal();
				return;
			}
			if (StatusName == 'Approved and Published') {			
				checkFormForEdit($(this));
			} else {
				fecthTableContent($(this));
			}
		});
	});
}
var publishValue=$('input[name=publish_value]:checked').val();
$('input[name=publish_value]').change(function(){
	publishValue=$('input[name=publish_value]:checked').val();
});
$(document).on("click", ".btnPublish", function(e) {		
	$("#publishPopup").modal();
});

function fecthTableContent(obj) {
	$('#devi').show();
	var ele=$(obj).parents('tr').children('td:eq(0)').text();
	var formId = sessionStorage.getItem("formIds").split(',')[ele -1];
	globalFormId = formId;
	orgFormId = formId;
	$("#dashboardcontent").hide();
	$('#dashboardcontent').fadeOut('medium',function(){
		$('#createchecklist').show();
		getServiceCall(formId, function(data) {				
			loadForms(data.resultSet);
		});
	});
}
function getServiceCall(formId, success) {
	startiLoaderSpiner();
	$('.container').css({'opacity': '0.3', 'z-index': '-1'});
	var serverbaseUrl = getServerPath();
	$.ajax({	       
		type:"POST",
		global:false,
		dataType: "json", 
		contentType: "application/json; charset=utf-8",
		url:serverbaseUrl+Application.checklistServices.editCheckList+"/"+formId,            
		success: function(response) {
			if(response.requestStatus.responseCode=="1001" || response.requestStatus.responseCode=="3003"){
				stopiLoaderSpiner();
				$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
				$("#AlertEditDatabase").modal();
				$("#createchecklist").fadeOut('medium',function(){
					$('#dashboardcontent').show();
					selectOnlyOneRow();
					$("#createchecklist").hide();
				});
			}
			else{
				success.call(this, response);
			}
		}, error:function() {
		},
		Complete:function(){
		},                         
	});
}
function loadForms(formdto) {
	$('#FSGDiv').empty();
	$("#CLName").empty();
	globalFormDTO = formdto;
	publishVersion = formdto.publishVersion;
	draftVersion = formdto.draftVersion;
	baseFormId = formdto.baseFormId;
	frmID=formdto.formId;
	$('.FSGDiv').html('<span>Function</span> - <span>' + formdto.functionName + '</span> > <span>Sub function</span> - <span>' + formdto.subFunctionName + '</span> > <span>Group</span> - <span>' + formdto.groupName + '</span>');
	$("#CLName").append('<div class="CLName_innerDiv">'+
			'<textarea  class="textareaVal dropTxtarea" style="opacity: 1;" placeholder="Enter the name of the Checklist Here..." id="myTextArea"></textarea>'+
			'<a rel="tooltip" title="Help" class="helpBtnIcon" onClick="showHelpFormImage();"><img style="margin-left:29px;" src="images/help.png"></a>'+
			'<a rel="tooltip" title="Add_Section" class="formAddBtn"><img style="padding-left: 7px;" src="images/add-section.png"></a>'+
		'</div>');
	$('#myTextArea').val(formdto.formName);
	$('#myTextArea').attr("disabled","disabled");
	stopiLoaderSpiner();
	$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
	loadSections(formdto);
}
function callDownloadService(url, image, success) {
	startiLoaderSpiner();
	$('.container').css({'opacity': '0.3','z-index': '-1'});
	$('.modal-backdrop.fade.in').css({'z-index': '-1'});
	$.ajax({
		type:"POST",
		url:url,
		data :image,
		dataType:"json",
		restful:true,
		contentType: 'application/json',
		cache:false,
		timeout:20000,
		async:true,
		beforeSend :function(data) { },
		success:function(data){
			success.call(this, data);
			stopiLoaderSpiner();
			$('.container').css({'opacity': '1','z-index': '0'});
			$('.modal-backdrop.fade.in').css({'z-index': '0'});
		},
		error:function(data){
			stopiLoaderSpiner();
			$('.container').css({'opacity': '1','z-index': '0'});
			$('.modal-backdrop.fade.in').css({'z-index': '0'});
			alert("Time out Error");
		}
	});
}

