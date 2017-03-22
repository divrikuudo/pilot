/*************Create Checklist Pop Up*********************/
$('#Backbtn button').click(function() { 
	$("#createchecklistPopup").modal({ backdrop: 'static'});
	removeTableRowSelectionCreate();
	$('.createChecklistBtn').prop('disabled', true);
});
$("#Backbtn .btn").click(function() {
	startiLoaderSpiner();
	$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
	$("#function").prop('disabled', true);
	$("#subfunction").prop('disabled', true);
	$("#group").prop('disabled', true);
	$("#frmName").val('');
	$("#sectName").val('');
	$("#stepName").val('');
	$(".accordion-inner #function").empty();
	$(".accordion-inner #subfunction").empty();
	$(".accordion-inner #group").empty();
	if (roleuser == "SuperUser") {
		var functiondropid = $('#createchecklistPopup select').attr("id");
		var id = "0";
		roleuser = sessionStorage.getItem('role');
		$("#createchecklistPopup .accordion-inner #group").append('<option value="">Select</option>');
		$("#createchecklistPopup .accordion-inner #subfunction").append('<option value="">Select</option>');
		var $select1 = $(".accordion-inner #function").on("change", function() {
			$('.createChecklistBtn').prop('disabled', true);
			var val = this.value;
			var select = $(".accordion-inner #subfunction");
			var option;
			select.empty(option);
			var funValue = $("select#function option:selected").val();
			if(funValue=="" || funValue==" " || funValue==null)
			{
			}
			else{
				startiLoaderSpiner();
				$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
				$("#function").prop('disabled', true);
				$("#subfunction").prop('disabled', true);
				$("#group").prop('disabled', true);
			}
			$(".accordion-inner #subfunction").empty();
			$("#createchecklistPopup .accordion-inner #subfunction").append('<option  value="">Select</option>');	
			subfunction();
		});
		var serverbaseUrl = getServerPath();
		$.ajax({
			type: "POST",
			global: false,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			url: serverbaseUrl + Application.checklistServices.businessHierarchyDetail + "/" + ssoId + "/" + roleuser + "/" + id + "/" + functiondropid,
			success: function(response) {
				sessionStorage.setItem("function", JSON.stringify(response));
				var jsonVal = JSON.stringify(response);
				var JSONObject = JSON.parse(jsonVal);
				for (var key in JSONObject) {
					JSONObject[key]["functionId"];
				}
				$("#createchecklistPopup .accordion-inner #function").append('<option  value="">Select</option>');
				for (var i = 0; i < JSONObject.resultSet.subFunctionElement.length; i++) {
					$('<option value="' + JSONObject.resultSet.subFunctionElement[i].groupId + '" data-fnid="' + JSONObject.resultSet.subFunctionElement[i].groupId + '">' + JSONObject.resultSet.subFunctionElement[i].groupName + '</option>').appendTo($select1);
				}
				stopiLoaderSpiner();
				$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
				$("#function").prop('disabled', false);
				$("#subfunction").prop('disabled', false);
				$("#group").prop('disabled', false);
			},
			error: function() {
				stopiLoaderSpiner();
				$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
				$("#function").prop('disabled', false);
				$("#subfunction").prop('disabled', false);
				$("#group").prop('disabled', false);
			},
			Complete: function() {},
		});
	} else{
		var functiondropid = $('#createchecklistPopup select').attr("id");
		var id = "0";
		roleuser = sessionStorage.getItem('role');
		$("#createchecklistPopup .accordion-inner #group").append('<option value="">Select</option>');
		$("#createchecklistPopup .accordion-inner #subfunction").append('<option value="">Select</option>');
		var $select1 = $(".accordion-inner #function").on("change", function() {
			$('.createChecklistBtn').prop('disabled', true);
			var val = this.value;
			var select = $(".accordion-inner #subfunction");
			var option;
			select.empty(option);
			var funValue = $("select#function option:selected").val();
			if(funValue=="" || funValue==" " || funValue==null){
			}
			else{
				startiLoaderSpiner();
				$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
				$("#function").prop('disabled', true);
				$("#subfunction").prop('disabled', true);
				$("#group").prop('disabled', true);
			}
			$(".accordion-inner #subfunction").empty();
			$("#createchecklistPopup .accordion-inner #subfunction").append('<option  value="">Select</option>');	
			subfunction();
		});
		var serverbaseUrl = getServerPath();
		$.ajax({
			type: "POST",
			global: false,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			url: serverbaseUrl + Application.checklistServices.businessHierarchyDetail + "/" + ssoId + "/" + roleuser + "/" + id + "/" + functiondropid,
			success: function(response) {
				sessionStorage.setItem("function", JSON.stringify(response));
				var jsonVal = JSON.stringify(response);
				var JSONObject = JSON.parse(jsonVal);
				for (var key in JSONObject) {
					JSONObject[key]["functionId"];
				}
				$("#createchecklistPopup .accordion-inner #function").append('<option  value="">Select</option>');
				for (var i = 0; i < JSONObject.resultSet.subFunctionElement.length; i++) {
					$('<option value="' + JSONObject.resultSet.subFunctionElement[i].groupId + '" data-fnid="' + JSONObject.resultSet.subFunctionElement[i].groupId + '">' + JSONObject.resultSet.subFunctionElement[i].groupName + '</option>').appendTo($select1);
				}
				stopiLoaderSpiner();
				$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
				$("#function").prop('disabled', false);
				$("#subfunction").prop('disabled', false);
				$("#group").prop('disabled', false);
			},
			error: function() {
				stopiLoaderSpiner();
				$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
				$("#function").prop('disabled', false);
				$("#subfunction").prop('disabled', false);
				$("#group").prop('disabled', false);
			},
			Complete: function() {},
		});
	}  
});
function subfunction() {
	$(".accordion-inner #subfunction").empty();
	$(".accordion-inner #group").empty();
	$("#createchecklistPopup .accordion-inner #subfunction").append('<option  value="">Select</option>');
	$("#createchecklistPopup .accordion-inner #group").append('<option  value="">Select</option>');
	roleuser = sessionStorage.getItem('role');
	var functiondropid = $('#createchecklistPopup select').attr("id");
	$(".accordion-inner #subfunction").empty();
	$("#createchecklistPopup .accordion-inner #subfunction").append('<option  value="">Select</option>');
	var select2 = $(".accordion-inner #subfunction").on("change", function() {
		$('.createChecklistBtn').prop('disabled', true);
		var val = this.value;
		var selection = $(".accordion-inner #group");
		var option;
		selection.empty(option);
		$(".accordion-inner #group").empty();
		$("#createchecklistPopup .accordion-inner #group").append('<option  value="">Select</option>');
		var subFununValue = $("select#subfunction option:selected").val();
		if(subFununValue=="" || subFununValue==" " || subFununValue==null)
		{
		}
		else{
			startiLoaderSpiner();
			$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
			$("#function").prop('disabled', true);
			$("#subfunction").prop('disabled', true);
			$("#group").prop('disabled', true);
		}
		group();
	});
	var id = parseInt($(".accordion-inner #function option:selected").attr("data-fnid"));
	var serverbaseUrl = getServerPath();
	$.ajax({
		type: "POST",
		global: false,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		url: serverbaseUrl + Application.checklistServices.businessHierarchyDetail + "/" + ssoId + "/" + roleuser + "/" + id + "/" + functiondropid,
		success: function(response) {
			sessionStorage.setItem("subfunction", JSON.stringify(response));
			var jsonVal = JSON.stringify(response);
			var JSONObject = JSON.parse(jsonVal);
			for (var key in JSONObject) {
				JSONObject[key]["subFunctionId"];
			}
			$(".accordion-inner #subfunction").empty();
			$("#createchecklistPopup .accordion-inner #subfunction").append('<option  value="">Select</option>');
			for (var i = 0; i < JSONObject.resultSet.subFunctionElement.length; i++) {
				$('<option value="' + JSONObject.resultSet.subFunctionElement[i].groupId + '" data-subid="' + JSONObject.resultSet.subFunctionElement[i].groupId + '">' + JSONObject.resultSet.subFunctionElement[i].groupName + '</option>').appendTo(select2);
			}
			stopiLoaderSpiner();
			$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
			$("#function").prop('disabled', false);
			$("#subfunction").prop('disabled', false);
			$("#group").prop('disabled', false);
		},
		error: function() {
			stopiLoaderSpiner();
			$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
			$("#function").prop('disabled', false);
			$("#subfunction").prop('disabled', false);
			$("#group").prop('disabled', false);
		},
		Complete: function() {
		},
	});
}
function group() {
	roleuser = sessionStorage.getItem('role');
	var functiondropid = '';
	if (roleuser == "SuperUser") {
		functiondropid = $('#createchecklistPopup select').attr("id");
	}else{
		functiondropid = 'subfunction';
	}
	var select3 = $(".accordion-inner #group").on("change", function() {
		$('.createChecklistBtn').prop('disabled', true);
		var grpValue = $("select#group option:selected").val();
		validationOfMandatoryFields();
		if (grpValue == null || grpValue == "" || grpValue == " " ||grpValue == "null" ) {
			$('.createChecklistBtn').attr("disabled","disabled");
		} 
	});
	var grpValue = $("select#group option:selected").val();
	if (grpValue == null || grpValue == "" || grpValue == " " ||grpValue == "null" ) {
		$('.createChecklistBtn').attr("disabled","disabled");
	}
	var serverbaseUrl = getServerPath();
	var subid = parseInt($(".accordion-inner #subfunction option:selected").attr("data-subid"));
	$.ajax({
		type: "POST",
		global: false,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		url: serverbaseUrl + Application.checklistServices.businessHierarchyDetail + "/" + ssoId + "/" + roleuser + "/" + subid + "/" + functiondropid,
		success: function(response) {
			sessionStorage.setItem("group", JSON.stringify(response));
			var jsonVal = JSON.stringify(response);
			var JSONObject = JSON.parse(jsonVal);
			for (var key in JSONObject) {
				JSONObject[key]["groupId"];
			}
			if (roleuser == "SuperUser") {
				$("#createchecklistPopup .accordion-inner #group").empty();
				$("#createchecklistPopup .accordion-inner #group").append('<option  value="">Select</option>');
				for (var i = 0; i < JSONObject.resultSet.subFunctionElement.length; i++) {
					$('<option value="' + JSONObject.resultSet.subFunctionElement[i].groupId + '">' + JSONObject.resultSet.subFunctionElement[i].groupName + '</option>').appendTo(select3);
				}
			} else{
				$("#createchecklistPopup .accordion-inner #group").empty();
				$("#createchecklistPopup .accordion-inner #group").append('<option  value="">Select</option>');
				for (var i = 0; i < JSONObject.resultSet.subFunctionElement.length; i++) {
					$('#group').append("<option value=" + JSONObject.resultSet.subFunctionElement[i].groupId+" data-subid= "+ JSONObject.resultSet.subFunctionElement[i].groupId +">" + JSONObject.resultSet.subFunctionElement[i].groupName + "</option>");
				}
			}
			var grpValue = $("select#group option:selected").val();
			if (grpValue == null || grpValue == "" || grpValue == " " ||grpValue == "null" ) {
				$('.createChecklistBtn').attr("disabled","disabled");
			} 
			stopiLoaderSpiner();
			$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
			$("#function").prop('disabled', false);
			$("#subfunction").prop('disabled', false);
			$("#group").prop('disabled', false);
		},
		error: function() {
			stopiLoaderSpiner();
			$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
			$("#function").prop('disabled', false);
			$("#subfunction").prop('disabled', false);
			$("#group").prop('disabled', false);
		},
		Complete: function() {},
	});
}
$("#frmName").keyup(function() {
	validationOfMandatoryFields();
	if (!this.value ||this.value.replace(/^\s+|\s+$/g, "").length==0||this.value=="" ||this.value==" ") {
		$('.createChecklistBtn').attr("disabled","disabled");
		$('#sectName').attr("disabled","disabled");
	}
	else{	$('#sectName').prop('disabled', false);}


});
$("#sectName").keyup(function() {
	validationOfMandatoryFields();
	if (!this.value ||this.value.replace(/^\s+|\s+$/g, "").length==0||this.value=="" ||this.value==" ") {
		$('.createChecklistBtn').attr("disabled","disabled");
		$('#stepName').attr("disabled","disabled");
	}
	else{
		$('#stepName').prop('disabled', false);
	}
});
$("#stepName").keyup(function() {
	validationOfMandatoryFields();
	if (!this.value ||this.value.replace(/^\s+|\s+$/g, "").length==0||this.value=="" ||this.value==" ") {
		$('.createChecklistBtn').attr("disabled","disabled");
	}
});
function validationOfMandatoryFields(){
	var funFlag=0;
	var subfunFlag=0;
	var groupFlag=0;
	var formFlag=0;
	var sectFlag=0;
	var stepFlag=0;
	var formval=$("#frmName").val();
	var sectval=$("#sectName").val();
	var stepval=$("#stepName").val();
	var funValue = $("select#function option:selected").val();
	var subFununValue = $("select#subfunction option:selected").val();
	var grpValue = $("select#group option:selected").val();
	if (funValue == null || funValue == "" ||funValue == " ") {
		funFlag=1;
	}if (subFununValue  == null || subFununValue == "" ||subFununValue ==" " ||subFununValue  == "null") {
		subfunFlag=1;
	}if (grpValue  == null || grpValue  == "" ||grpValue  == " " ||grpValue == "null") {
		groupFlag=1;	
	}if(formval=="" || formval==" "){
		formFlag=1;
	}if(sectval=="" || sectval==" "){
		sectFlag=1;
	}if(stepval=="" || stepval==" "){
		stepFlag=1;
	}
	if(funFlag==1 || subfunFlag==1 || groupFlag==1 ||formFlag==1 ||sectFlag==1 ||stepFlag==1){
		$('.createChecklistBtn').attr("disabled","disabled");	
	}
	else{
		$('.createChecklistBtn').prop('disabled', false);
	}	
}
function removeTableRowSelectionCreate() {
	var rows = $('#createChecklistPopupTable tr');
	rows.on('click', function(e) {
		rows.removeClass('highlightRow'); 
	});
}

