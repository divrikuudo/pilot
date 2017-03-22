/*************Loading Question Div at time of Edit*********************/
var quesCountNumber_=0;
var ansIDCount=0;
function loadQuesandAns(steps, stepDiv, sectionId, indicator,stepCount,sectCount,tempStep,tempSect) {
	var num_ = 0;
	var stepID = steps.stepId;
	var sectID = sectionId;
	var countSect = 1;
	var queAndAns = steps.stepElements;
	if (queAndAns === undefined) return;
	var stps = new Object();
	stps.id = stepID;
	stps.ques = new Array();
	var quesCount=0;
	for (var i = 0; i < queAndAns.length; i++) {
		quesCountNumber_++;
		ansIDCount++;
		quesCount++;
		num++;
		num_++;
		var quesMainDiv = 'quesMainDiv_' + queAndAns[i].questionDetail.questionId;
		var ansSection = 'firstAns_'+queAndAns[i].questionDetail.questionId;
		var quesSection = 'firstQues_'+queAndAns[i].questionDetail.questionId;
		var quesId = queAndAns[i].questionDetail.questionId;
		var ansId = queAndAns[i].answerDetail.answerId;
		var step=stepDiv.replace('step_','');
		$('#step123_' + step).append('<div class="quesMainDiv expanded" id="'+quesMainDiv+'" ondrop="dropping(event)" ondragover="allowDrop(event)" status="present" >'+
				'<div class="maindiv" id="drag1"  width="336" height="69" draggable="true" ondragstart="drag(event,1)">'+
				'<div class="ques"  id="'+quesSection+'" data-QuesStep-Count="'+stepID+'" data-QuesServer-Count="'+quesId+'" data-QuesSect-Count="'+sectID +'" data-Ques-Count="'+num +'" quesCountNumber_="'+quesCountNumber_ +'" status="present" helpsect="'+tempSect +'" helpstep="'+tempStep +'">'+
				'<div class="qsnHeader">'+
				'<label>Question'+num_+'</label>'+ 
				'<a rel="tooltip" title="Help" id="quesID_'+quesCountNumber_+'"ques="'+quesCount+'"  step="'+tempStep+'" sect="'+tempSect+'"  data-QuesServer-Count="'+quesId+'" status="present" class="quesIconHelpImage" ><img style="margin-left: 30px;" src="images/help_2.png"></a>'+ 
				'<a rel="tooltip" title="Edit" class="to_edit" style="padding-left: 18px;"><img src="images/edit_2.png"></a> <a rel="tooltip" title="Delete" id="order_'+quesId+'" data-step-count="'+stepID+'" data-sect-count="'+sectID+'" data-Ques-Count="'+quesCount+'" data-QuesServer-Count="'+quesId+'"  data-AnsServer-Count="'+ansId+'" class="toDel" style="padding-left: 18px;"><img style="margin-left: -5px;" src="images/delete_new.png"></a>'+
				'</div>'+
				'<div class="qsnText" id="firstQues_'+sectionId+'_'+stepID+'_'+quesId+'" status="already"></div>'+
				'</div>'+
				'<div class="ans" id="'+ansSection+'" data-QuesStep-Count="'+stepID+'" data-QuesSect-Count="'+sectID +'" status="present" data-Ques-Count="'+quesId +'" data-Ans-Count="'+ansId +'">'+
				'<div class="ansHeader"><label >Answer'+num_+'</label></div>'+
				'<div class="ansText" id="firstAns_'+sectionId+'_'+stepID+'_'+ansId+'" data-QuesStep-Count="'+stepID+'" data-QuesSect-Count="'+sectID +'" data-Ques-Count="'+quesId +'" status="already"></div>'+
				'</div>'+
				'</div>'+
		'</div>');
		dragDropFunction();
		var quesObj = new Object();
		quesObj.name = queAndAns[i].questionDetail.questionTitle;
		quesObj.id = queAndAns[i].questionDetail.questionId;		
		stps.ques.push(quesObj);
		loadAnsElement(queAndAns[i].answerDetail, ansSection, stepID, sectID, queAndAns[i].questionDetail.questionId, indicator, countSect, ansId,stepCount,sectCount,ansIDCount,quesCount);
		loadQuesElement(queAndAns[i].questionDetail, quesSection, stepID, sectID, quesId, indicator, countSect,ansId,stepCount,sectCount,ansIDCount,quesCount);
		countSect++;
	}
	questArr.push(stps);
}

$(".accordion-inner #steps").on("change", function() {	
	constructQues(this.value);
});
function constructQues(value) {
	$(".accordion-inner #questions").empty();
	$("#questions option").remove();
	var quesSelect = $(".accordion-inner #questions");
	quesSelect.append('<option  value="">Select</option>');
	for (var j = 0; j < questArr.length; j++) {
		if (questArr[j].id === value) {
			for (var i = 0; i < questArr[j].ques.length; i++) {
				$('<option value="' + questArr[j].ques[i].id+'">' +questArr[j].ques[i].name+ '</option>').appendTo(quesSelect);
			}
		}
	}
}
