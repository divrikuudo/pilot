/*************Publish Button functionality*********************/
$(document).on("click", ".publishBtn", function(e) {
	var checkListName=($('#myTextArea').val());
	var sectionElementAr = generateSaveMetadataJson();
	var finalResult = {
			formName: checkListName,
			tempFormId:globalFormId,
			formId: globalFormId,
			functionId: sessionStorage.getItem("functionId"),
			subFunctionId: sessionStorage.getItem("subfunctionId"),
			groupId: globalFormDTO.groupId,
			"formLanguage": "English",
			"createdDate": "2015-08-06",
			"isActive": "Y",
			"formStatusId": "14",
			"isFormConfigured": 'Y',
			"submittedBy": $("#sso").val(),
			"formStatusVersion": "publish",
			"assignedToProject" : globalFormDTO.assignedToProject == 't' ? 'Yes' : 'No',
					"publishVersion": publishVersion,
					"draftVersion" : draftVersion,
					"minMajor":publishValue,
					"baseFormId" : baseFormId,
					sectionElements: sectionElementAr
	};

	var serverbaseUrl = getServerPath();
	var url = serverbaseUrl + Application.checklistServices.saveMetadata;
	var jsonfy = $.toJSON(finalResult);
	if (sectionNameFlag == 1) {
		$("#AlertPopupSection").modal();
		intialize();
		return false;        	
	} else if (stepNameFlag == 1) {
		$("#AlertPopupStep").modal();
		intialize();
		return false;
	}else if (quesFlag == 1 && ansFlag == 1) {
		$("#AlertSaveDraft").modal();
		intialize();
		return false;
	} else if (quesFlag == 1) {
		$("#AlertSaveDraft1").modal();
		intialize();
		return false;
	} else if (ansFlag == 1) {
		$("#AlertSaveDraft2").modal();
		intialize();
		return false;
	}
	else if(quesTextAreaCompulsoryFlag==1){
		$("#AlertSaveDraft5").modal();
		intialize();
		return false;
	}
	else if (quesTextAreaFlag == 1) {
		$("#AlertSaveDraft3").modal();
		intialize();
		return false;
	} else if(imageUploadJsonArr.length!=countOFIm  ||  textAreaJsonArr.length!=countOFText ||   datePickerJsonArr.length!=countOFDate|| buttonJsonArr.length!=countOFBtn || checkBoxJsonArr.length!=countOFCheck || radioButtonJsonArr.length!=countOFRadio || textBoxJsonArr.length!=countOFTBox || signatureJsonArr.length!=countOFSig || labelJsonArr.length!=countOFLabel ||dropDownJsonArr.length!=countOFDrop ){
		$("#AlertSaveDraft4").modal();
		//	quesTextAreaFlag = 0;
		intialize();
		return false;
	}else{
		post_data(url, jsonfy, function(data) {
			$("#createchecklist").hide();
			$('.CLCBtnDiv').hide();
			$('#createchecklist').fadeOut('medium', function() {
				updatedPageChecklist();
				$("#collapseTwo").removeClass("expanded").addClass("notExpanded");
				$(".accIcon").removeClass("icon-chevron-up").addClass("icon-chevron-right");
				$("#collapseOne").removeClass("expanded").addClass("notExpanded");
				$(".accIcon").removeClass("icon-chevron-up").addClass("icon-chevron-right");
				$("#tablesearch_wrapper").empty();
				$("#kwd_search").val("");
				$('#dashboardcontent').show();
			});
		});	
	}
	selectOnlyOneRow();
});