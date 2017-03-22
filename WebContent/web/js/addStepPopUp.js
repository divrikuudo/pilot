$('.addStepBtn').on('click',function(){
	stepName = $('#StepName_').val();
	var number=0;
	number = stepNumber(tempSect);
	num = qsnNumber($(this));
	stepCount_++;
	quesCountNumber_++;
	$("#sectionTab_"+tempSect).nextAll().removeClass("notExpanded").addClass("expanded");
	$("#section_"+tempSect).find('a.accrodionTitle i.accRightSideIcon').removeClass("icon-chevron-down").addClass("icon-chevron-up");
	$('#section_'+tempSect).append('<div class="stepMainDiv expanded" id="step_'+stepCount_+'" ondrop="dropping(event)" ondragover="allowDrop(event)" status="new">'+
			'<div class="newDiv" id="step123_'+stepCount_+'" style="float: left; width:100%;"  draggable="true" ondragstart="drag(event,1)">'+
			'<div class="stepName accordionHeader" id="stepTab_'+stepCount_+'"><textarea class="textareaVal2" id="stepText_'+stepCount_+'" placeholder="Enter Step Name here...">'+stepName+'</textarea>'+
			'<a rel="tooltip" title="Add_Question"  status="new" data-step ="'+number+'" data-sect="'+tempSect1+'"  data-step-plus="'+stepCount_+'" data-sect-plus="'+tempSect+'" data-stepTemp="'+stepCount_+'" id="tempsectID_'+stepCount_+'" class="stepAddBtn"><img src="images/add.png"  style="margin-left:55px;"></a> '+
			'<a rel="tooltip" title="Delete" status="new" data-Sect-Count="'+tempSect+'" data-Step-Del="'+number+'" data-AcStep-Del="'+stepCount_+'"class="toDelStep" onClick="delStep($(this));"><img src="images/delete_new.png"  style="margin-left: 12px;"></a> '+
			'<a class="accrodionTitle"><i class="icon-chevron-up accRightSideIcon"  style="float: right;padding-top:10px;padding-right:10px;color:#3693f8;"></i> </a></div>'+
			'<div class="quesMainDiv expanded" ondrop="dropping(event)" ondragover="allowDrop(event)"  status="new" >'+
			'<div class="maindiv" id="drag_'+num+'"  width="336" height="69" draggable="true" ondragstart="drag(event,1)">'+
			'<div class="ques"  id="firstQues_'+countSect+'" data-QuesStep-Count="'+number+'" status="new" data-QuesSect-Count="'+tempSect1 +'" data-Ques-Count="'+num +'" quesCountNumber_="'+quesCountNumber_ +'" helpsect="'+tempSect +'" helpstep="'+number +'">'+
			'<div class="qsnHeader" id="quesTab_'+quesCountNumber_+'"><label>Question'+num+'</label> '+
			'<a rel="tooltip" title="Edit" class="to_edit" ><img style="margin-left:60px;" src="images/edit_2.png"></a> <a rel="tooltip" title="Delete" class="toDel" id="order_'+countSect+'" data-Sect-Count="'+tempSect+'" data-Step-Count="'+number+' "  data-Ques-Count="'+num+'" ><img style="  margin-left: 11px;" src="images/delete_new.png"></a></div>'+
			'<div class="qsnText" id="firstQues1_'+countSect+'" status="new"></div></div>'+
			'<div class="ans" id="firstAns_'+countSect+'" data-QuesStep-Count="'+number+'" data-QuesSect-Count="'+tempSect +'" status="new" data-Ques-Count="'+quesCountNumber_ +'"   data-Ans-Count="'+countSect +'">'+
			'<div class="ansHeader"><label >Answer'+num+'</label></div>'+
			'<div class="ansText" id="firstAns1_'+countSect+'" data-QuesStep-Count="'+number+'" data-QuesSect-Count="'+tempSect +'" data-Ques-Count="'+quesCountNumber_ +'" status="new"></div></div></div></div></div></div>');
	$('.sectMainDiv:last-child').find("a.accrodionTitle i.accRightSideIcon").addClass("icon-chevron-up");
	var div = $(".rightPanelInner");
	if(div.prop('scrollHeight')>500){
		window.scrollBy(0,$(".rightPanel").height());
		div.scrollTop(div.prop('scrollHeight'));
	}
	dragDropFunction();
});
$('#addStepDiv input[type=text]').on('keyup',function(){
	var stepName = $('#StepName_').val();
	if(stepName == '' ||(stepName.replace(/^\s+|\s+$/g, "").length==0)) {
		$('.addStepBtn').prop('disabled', true);
	}
	else{
		$('.addStepBtn').prop('disabled', false);
	}
});
