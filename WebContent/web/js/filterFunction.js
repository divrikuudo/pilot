/*************Filter functionality*********************/
$("#applyFilter").click(function(){
	var stepId = $('#steps').val();
	var section = $('#sections').val();
	var question = $('#questions').val();
	if($('#sections').val()=="" ||$('#sections').val()==" " ||$('#sections').val()=="null" ||$('#sections').val()==null){

	}
	else
	{
		for( var i = 0; i < sectionArr.length; i++) {
			var sectionId = sectionArr[i].id;
			if ("section_" + sectionId === "section_" + section) {
				$("#section_"+sectionId).children().children().children().show();
				$("#section_"+sectionId).children().children().show();
				$("#section_"+section).show();
				if(stepId) showAndHideStep(sectionId, stepId, question);
			} else {
				$("#section_"+sectionId).removeClass("expanded").addClass("notExpanded");
				$("#section_"+sectionId).children().children().children().hide();
				$("#section_"+sectionId).children().children().hide();

			}
		} 
	}
});
function showAndHideStep(sectionId, stepId, question) {
	for (var i = 0; i < stepsArr.length; i++) {
		if (stepsArr[i].id === sectionId) {
			for (var j = 0; j < stepsArr[i].steps.length; j++) {
				if (stepsArr[i].steps[j].id === stepId) {
					$("#step_"+stepId).children().children().show();
					$("#step_"+stepId).children().show();
					if(question) showAndHideQues(sectionId, stepId, question);
				} else {
					$("#step_"+stepsArr[i].steps[j].id).children().children().hide();
					$("#step_"+stepsArr[i].steps[j].id).children().hide();
				}
			}
		}
	}
}

function showAndHideQues(sectionId, stepId, question) {
	for (var i = 0; i < questArr.length; i++) {
		if (questArr[i].id === stepId) {
			for (var j = 0; j < questArr[i].ques.length; j++) {
				if (questArr[i].ques[j].id === question) {					
					$("#quesMainDiv_"+question).children().show();
				} else {
					$("#quesMainDiv_"+questArr[i].ques[j].id).children().hide();
				}
			}
		}
	}
}

$('#applyReset').click(function() {
	intialize();
	stepCount=0;
	label=[];
	quesText=0;
	eleOredr=1;questionChange=[];
	actionRulesArr=[];ruleMainArr=[];
	quesCountNumber=0;
	quesCountNumber_=0;
	countSect=0;
	textAreaJsonArr=[];
	textAreaCount_=0;
	textAreacount=0;
	textCountArr=[];
	textArea_Count=[];
	dropDownCount_=0;
	dropDownJsonArr = [];
	dropDown_Count=[];
	dropDownCount=0;
	dropCountArr=[];
	datePickerCount_=0;
	datePickerJsonArr =[];
	datePicker_Count=[];
	datePickerCount=0;
	dateCountArr=[];
	btnCount_=0;
	buttonJsonArr =[];
	btn_Count= [];
	buttonCount=0;
	btnCountArr=[];
	addImageCount_=0;
	addImageJsonArr = [];
	addImage_Count=[];
	addIm=0;
	addimCountArr=[];
	checkboxCount_=0;
	checkBoxJsonArr =[];
	chk_Count=[];
	checkBoxCount=0;
	checkCountArr=[];
	radioCount_=0;
	radioButtonJsonArr=[];
	radio_Count=[];
	radioButton=0;
	radioCountArr=[];
	textboxCount_=0;
	textBoxJsonArr=[];
	textbox_Count=[];
	textBoxCount=0;
	textBoxCountArr=[];
	sigCount_=0;
	signatureJsonArr=[];
	sig_Count=[];
	signatureCount=0;
	sigCountArr=[];
	labelCount_=0;
	labelJsonArr=[];
	label_Count=[];
	labelCount=0;
	labelCountArr=[];
	imageUploadCount_=0;
	imageUploadJsonArr=[];
	imageUpload_Count=[];
	imageUploadCount=0;
	imuploadCountArr=[];
	stepCount_=0;
	sect_Count=0;
	 seqNoFormImages = 0;
	 seqNoSectionImages =0;
	 seqNoStepImages=0;
	 seqNoQuestionImages=0;
	  labelEditFormFlag=0;
	  labelEditSectionArr=[];
	  labelEditStepArr=[];
	  labelEditQuesArr=[];
	  secArr =[];
	  stepArr =[];
	  quesArr =[];
	  formArr =[];
	   deleteFormImageFlag=0;
	   deleteSectionImageFlag=0;
	   deleteQuesImageFlag=0;
	   deleteStepImageFlag=0;
	   deleteFormImage=[];
	   deleteSectionImage=[];
	   deleteStepImage=[];
	   deleteQuesImage=[];
	   addImSectionFlag=0;
	   addImQuesFlag=0;
	   addImStepFlag=0;
	   addImFormFlag=0;
	$(".accordion-inner #steps").empty();
	$("#steps option").remove();
	var stepSelect = $(".accordion-inner #steps");
	stepSelect.append('<option  value="">Select</option>');
	$(".accordion-inner #questions").empty();
	$("#questions option").remove();
	var quesSelect = $(".accordion-inner #questions");
	quesSelect.append('<option  value="">Select</option>');
	loadForms(globalFormDTO);
});