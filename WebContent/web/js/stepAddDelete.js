/*************Constructing New Step Div*********************/
var tempSect;
$(document).on("click",".sectionAddBtn",function(e){
	if($(this).parent().find('textarea').val()=="" ||$(this).parent().find('textarea').val().replace(/^\s+|\s+$/g, "").length==0){
		$("#AlertPopupSection").modal();
	}
	else {
		$('#StepName_').val('');
		$("#addStepName").modal();
		tempSect="";
		tempSect1="";
		tempSect=$(this).attr("data-server");
		tempSect1=$(this).attr("data-sect-count");
		var sectionName=$("#sectionText_"+tempSect).val();
		$("#SectionName_").val(sectionName);
	}
	if(editFormFLag==1){
		$(".CLCBtnDiv").hide();
		$('.CLCBtnDiv_').show();
	}
	else{
		$('.CLCBtnDiv_').hide();
		$(".CLCBtnDiv").show();
	}
	$(".addBtnIcon , .to_edit , .toDel").tooltip();
	dragDropFunction();
});
function stepNumber(thisele) {
	var qsnnum = $("#section_"+thisele).find(".stepMainDiv").length;
	qsnnum++;
	return qsnnum;
}
/*************Deleting Step*********************/
function delStep(click) {
	var flagForSaveDraft=0;
	var step_id=$(click).attr("data-step-del");
	var section_id=$(click).attr("data-sect-count");
	var nameOfElement=new Array();
	nameOfElement=[textAreaJsonArr,imageUploadJsonArr,dropDownJsonArr,datePickerJsonArr,buttonJsonArr,radioButtonJsonArr,checkBoxJsonArr,textBoxJsonArr,signatureJsonArr,labelJsonArr];
	for(var m=0;m<10;m++){
		splicePropertiesOfElementsInStep(nameOfElement[m],section_id,step_id);
	}
	if($(click).attr("status")=="already"){
		var step=$(click).attr("step");
		var sect=$(click).attr("sect");
		deleteAllStepHelpImage(sect,step);
		$("#step_"+step_id).remove();
	}
	else{
		var step=$(click).attr("data-Step-Del");
		var sect=$(click).attr("data-Sect-Count"); 
		deleteAllStepHelpImage(sect,step);
		$("#step_"+$(click).attr("data-AcStep-Del")).remove();
	}
	displaySaveDraft(showDivFLag,editFormFLag,flagForSaveDraft);
}

function splicePropertiesOfElementsInStep(name,section_id,step_id){
	for (var i = 0; i < name.length; i++) {
		if (section_id == name[i].sectionId) {
			if(step_id== name[i].stepId){
				name.splice(i,1);
				i=-1;
			}
		}
	}
}
function deleteAllStepHelpImage(sect,step){
	for(var i=0;i<stepArr.length;i++){
		if(stepArr[i].sectionID==sect){
			if(stepArr[i].id_==step){
				stepArr.splice(i,1);
			}
		}
	}
}