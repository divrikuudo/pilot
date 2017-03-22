/*************Constructing New Question Div*********************/
var quesOrderNo=new Array();
$(document).on("click",".stepAddBtn",function(e) {
	quesCountNumber_++;
	if($(this).parent().find('textarea').val()=="" ||$(this).parent().find('textarea').val().replace(/^\s+|\s+$/g, "").length==0){
		$("#AlertPopupStep").modal();
	}
	else {
		countSect++;
		var tempstepID=this.id;
		quesOrderNo.push(countSect);
		var sectID=($("#"+tempstepID).attr("data-sect-plus"));
		var stepID=($("#"+tempstepID).attr("data-step-plus"));
		var helpstep=($("#"+tempstepID).attr("data-step"));
		var helpsect=($("#"+tempstepID).attr("data-sect"));
		step=tempstepID.replace('tempsectID_','');
		num = qsnNumber(step);
		$(this).parent().find("a.accrodionTitle").find("i.accRightSideIcon").removeClass("icon-chevron-up").addClass("icon-chevron-up");
		$(this).parent().parent().append('<div class="quesMainDiv expanded" ondrop="dropping(event)" ondragover="allowDrop(event)"  status="new" >'+
				'<div class="maindiv" id="drag_'+num+'"  width="336" height="69" draggable="true" ondragstart="drag(event,1)">'+
				'<div class="ques"  id="firstQues_'+countSect+'" data-QuesStep-Count="'+stepID+'" status="new" data-QuesSect-Count="'+sectID +'" data-Ques-Count="'+num +'" quesCountNumber_="'+quesCountNumber_ +'" helpsect="'+helpsect +'" helpstep="'+helpstep +'">'+
				'<div class="qsnHeader" id="quesTab_'+quesCountNumber_+'"><label>Question'+num+'</label> '+
				/*'<a rel="tooltip" title="Help" data-Ques-Count="'+num+'"  data-Step-Count="'+helpstep+'" status="new"  data-Sect-Count="'+helpsect+'" data-QuesTemp-Count="'+quesCountNumber_+'" class="helpBtnIcon3"  onClick="showHelpQuesImage($(this));"><img src="images/help_2.png"></a>'+*/
				'<a rel="tooltip" title="Edit" class="to_edit" ><img style="margin-left:60px;" src="images/edit_2.png"></a> <a rel="tooltip" title="Delete" class="toDel" id="order_'+countSect+'" data-Sect-Count="'+sectID+'" data-Step-Count="'+stepID+' "  data-Ques-Count="'+num+'" ><img style="  margin-left: 11px;" src="images/delete_new.png"></a></div>'+
				'<div class="qsnText" id="firstQues1_'+countSect+'" status="new"></div></div>'+
				'<div class="ans" id="firstAns_'+countSect+'" data-QuesStep-Count="'+stepID+'" data-QuesSect-Count="'+sectID +'" status="new" data-Ques-Count="'+quesCountNumber_ +'"   data-Ans-Count="'+countSect +'">'+
				'<div class="ansHeader" ><label >Answer'+num+'</label></div>'+
				'<div class="ansText" id="firstAns1_'+countSect+'" data-QuesStep-Count="'+stepID+'" data-QuesSect-Count="'+sectID +'" data-Ques-Count="'+quesCountNumber_ +'" status="new"></div></div></div></div>');

	}
	$(".helpBtnIcon , .to_edit , .toDel").tooltip();
	if(editFormFLag==1){
		$(".CLCBtnDiv").hide();
		$('.CLCBtnDiv_').show();
	}
	else{
		$('.CLCBtnDiv_').hide();
		$(".CLCBtnDiv").show();
	}
	dragDropFunction();
});
function qsnNumber(thisElement) {
	var qsnnum = $("#step_"+thisElement).find(".quesMainDiv").length;
	qsnnum++;
	return qsnnum;
}
/*************Deleting Question********************/
$(document).on('click', '.quesMainDiv .qsnHeader .toDel', function() {
	var flagForSaveDraft=0;
	var step_id=$("#"+this.id).attr("data-Step-Count");
	var section_id=$("#"+this.id).attr("data-Sect-Count");
	var quesID=$("#"+this.id).attr("data-Ques-Count");
	var ques_id=this.id.replace('order_','');
	var nameOfElement=new Array();
	nameOfElement=[textAreaJsonArr,imageUploadJsonArr,dropDownJsonArr,datePickerJsonArr,buttonJsonArr,radioButtonJsonArr,checkBoxJsonArr,textBoxJsonArr,signatureJsonArr,labelJsonArr];
	for(var m=0;m<10;m++){
		splicePropertiesOfElementsInQues(nameOfElement[m],section_id,step_id,ques_id);
	}
	deleteAllQuesHelpImage(section_id,step_id,quesID);
	var qsnParent = $(this).parent().parent().parent().parent().parent();
	$(this).parent().parent().parent().parent().remove();
	for(var i=0;i<quesOrderNo.length;i++){
		if(quesOrderNo[i]==this.id.replace('order_','')){
			quesOrderNo.splice(i,1);
		}
	}
	qsnNumberArrange(qsnParent);
	displaySaveDraft(showDivFLag,editFormFLag,flagForSaveDraft);
});

function splicePropertiesOfElementsInQues(name,section_id,step_id,ques_id){
	for (var i = 0; i < name.length; i++) {
		if (section_id == name[i].sectionId) {
			if(step_id== name[i].stepId){
				if(ques_id== name[i].questionNum){
					name.splice(i,1);
					i=-1;
				}
			}
		}
	}
}
function deleteAllQuesHelpImage(section,step,ques){
	for(var i=0;i<quesArr.length;i++){
		if(quesArr[i].sectionID==section){
			if(quesArr[i].stepID==step){
				if(quesArr[i].id_==ques){
					quesArr.splice(i,1);
				}
			}
		}
	}
}
function qsnNumberArrange(thisElement) {
	var qsnLength = thisElement.find(".quesMainDiv").length;
	var i = 1;
	$(thisElement.find(".quesMainDiv")).each(function(index) {
		if (i <= qsnLength) {
			$(this).find(".qsnHeader").find("label").html("Question" + i);
			$(this).find(".ansHeader").find("label").html("Answer" + i);
		}
		i++;
	});
}
/*************Editing Question********************/
$(document).on('click', '.qsnHeader .to_edit', function() {
	$("textarea").prop('disabled', false);
	if ($('.qsnText').children().size() == 0) {
		$("#quesEditPopup").modal();
	} else {
		$(this).parent().parent().parent().find('.qsnText').find('textarea').focus();
	}
});
function questionAdd(step,sect,stepTemp,serverStep,serverSect){
	num="";
	num = qsnNumber(serverStep);
	countSect++;
	quesCountNumber_++;
	$("#stepTab_"+serverStep).nextAll().removeClass("notExpanded").addClass("expanded");
	$("#step123_"+serverStep).find('a.accrodionTitle i.accRightSideIcon').removeClass("icon-chevron-down").addClass("icon-chevron-up");
	$('#step123_'+serverStep).append('<div class="quesMainDiv expanded" ondrop="dropping(event)" ondragover="allowDrop(event)"  status="new" >'+
			'<div class="maindiv" id="drag_'+num+'"  width="336" height="69" draggable="true" ondragstart="drag(event,1)">'+
			'<div class="ques"  id="firstQues_'+countSect+'" data-QuesStep-Count="'+step+'" status="new" data-QuesSect-Count="'+sect +'" data-Ques-Count="'+num +'" quesCountNumber_="'+quesCountNumber_ +'" helpsect="'+sect +'" helpstep="'+step +'">'+
			'<div class="qsnHeader" id="quesTab_'+quesCountNumber_+'"><label>Question'+num+'</label> '+
			'<a rel="tooltip" title="Edit" class="to_edit" ><img style="margin-left:60px;" src="images/edit_2.png"></a> <a rel="tooltip" title="Delete" class="toDel" id="order_'+countSect+'" data-Sect-Count="'+sect+'" data-Step-Count="'+step+' "  data-Ques-Count="'+num+'" ><img style="  margin-left: 11px;" src="images/delete_new.png"></a></div>'+
			'<div class="qsnText" id="firstQues1_'+countSect+'" status="new"></div></div>'+
			'<div class="ans" id="firstAns_'+countSect+'" data-QuesStep-Count="'+step+'" data-QuesSect-Count="'+sect +'" status="new" data-Ques-Count="'+quesCountNumber_ +'"   data-Ans-Count="'+countSect +'">'+
			'<div class="ansHeader" ><label >Answer'+num+'</label></div>'+
			'<div class="ansText" id="firstAns1_'+countSect+'" data-QuesStep-Count="'+step+'" data-QuesSect-Count="'+sect +'" data-Ques-Count="'+quesCountNumber_ +'" status="new"></div></div></div></div>');
	$('.sectMainDiv:last-child').find("a.accrodionTitle i.accRightSideIcon").addClass("icon-chevron-up");
	dragDropFunction();
}