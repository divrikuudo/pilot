/*************Constructing New Section Div*********************/
dragDropFunction();/* for initializing the drag and drop first*/
$(document).on("click",".formAddBtn",function(e) {
	if (($(this).parent().parent().parent().find('.CLName .textareaVal').val() == '')||($(this).parent().parent().parent().find('.CLName .textareaVal').val().replace(/^\s+|\s+$/g, "").length==0)) {
		$("#AlertPopupForm").modal();
	} else {
		$('#SectionName').val('');
		$('#StepName').val('');
		$("#addSectionName").modal();
	}
	$(".CLCBtnDiv").show();
	$('.CLCBtnDiv_').hide();
	$(".addBtnIcon , .to_edit , .toDel").tooltip();
	dragDropFunction();
});
/*************Deleting Section*********************/
function delSection(click) {
	var flagForSaveDraft=0;
	var section_id=$(click).attr("data-sect-del");
	var nameOfElement=new Array();
	nameOfElement=[textAreaJsonArr,imageUploadJsonArr,dropDownJsonArr,datePickerJsonArr,buttonJsonArr,radioButtonJsonArr,checkBoxJsonArr,textBoxJsonArr,signatureJsonArr,labelJsonArr];
	for(var m=0;m<10;m++){
		splicePropertiesOfElementsInSection(nameOfElement[m],section_id);
	}
	for(var i=0;i<secArr.length;i++){
		if(secArr[i].id_== $(click).attr("data-Sect-Del")){
			secArr.splice(i,1);
		}
	}
	if($(click).attr("status")=="already"){
		$("#section_"+section_id).remove();
	}else{
		$("#section_"+$(click).attr("data-Sect-Del")).remove();
	}
	displaySaveDraft(showDivFLag,editFormFLag,flagForSaveDraft);
}

function splicePropertiesOfElementsInSection(name,section_id){
	for (var i = 0; i < name.length; i++) {
		if (section_id == name[i].sectionId) {
			name.splice(i,1);
			i=-1;
		}
	}
}
