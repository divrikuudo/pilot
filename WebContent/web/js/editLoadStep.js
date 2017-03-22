/*************Loading Step Div at time of Edit*********************/
var stepCount_=0;
function loadSteps(section, sectionCount, indicator,sectCount,tempSect) {
	var steps = section.sectionElements;
	var sectionId = section.sectionId;
	var stepCount = 0;
	var number = 1;	
	var secs = new Object();
	secs.id = sectionId;
	secs.steps = new Array();
	var tempStep=0;
	for (var i = 0; i < steps.length; i++) {
		tempStep++;
		stepCount_++;
		var stepDiv = 'step_'+steps[i].stepId;
		var stepDIV=stepDiv.replace("step_","");
		$('#' + sectionCount).append('<div class="stepMainDiv expanded" id="'+stepDiv+'" status="present" >'+
				'<div class="newDiv" id="step123_'+stepDIV+'" style="float: left; width:100%;" ">'+
				'<div class="stepName accordionHeader" id="stepTab_'+stepCount_+'">'+
				'<textarea class="textareaVal2" id="stepText_'+indicator+'_'+stepCount+'" placeholder="Enter Step Name here..."></textarea>'+
				'<a rel="tooltip" title="Help"  id="stepID_'+stepCount_+'" data-step-plus="'+stepDIV+'" data-step ="'+tempStep+'" data-sect="'+tempSect+'" step="'+tempStep+'" sect="'+tempSect+'" data-stepTemp="'+stepCount_+'" status="present" class="stepIconHelpImage" ><img style="margin-left:35px;" src="images/help_2.png"></a>  '+ 
				'<a rel="tooltip" title="Add Question"  status="present" data="'+indicator+'_'+stepCount+'" data-step="'+tempStep+'" data-sect="'+tempSect+'" data-step-plus="'+stepDIV+'" data-sect-plus="'+sectionId+'" data-stepTemp="'+stepCount_+'" id="tempsectID_'+stepDIV+'" class="stepAddBtn"><img src="images/add.png"  style="margin-left:7px;"></a> '+ 
				'<a rel="tooltip" title="Delete"  id="step_'+stepCount_+'"  data-step-del="'+stepDIV+'" data-sect-count="'+sectionId+'" step="'+tempStep+'"  sect="'+tempSect+'"  status="already"  onClick="delStep($(this));"><img src="images/delete_new.png"  style="margin-left: 13px;"></a> '+  
				'<a class="accrodionTitle" id="filterStepContent"><i class="icon-chevron-up accRightSideIcon" style="float: right;padding-top:10px;padding-right:10px;color:#3693f8;"></i></a> '+
				'</div>'+
		'</div></div>');
		var stepName = steps[i].stepName.replace(/"/g, '');
		$('#stepText_'+indicator+'_'+stepCount).val(stepName);
		var stepObj = new Object();
		stepObj.name = stepName;
		stepObj.id = steps[i].stepId;
		secs.steps.push(stepObj);
		loadQuesandAns(steps[i], stepDiv, sectionId, i,stepCount,sectCount,tempStep,tempSect);
		stepCount++;
		number++;
	}
	stepsArr.push(secs);	
}
$(".accordion-inner #sections").on("change", function() {	
	constructSteps(this.value);
});
function constructSteps(value) {
	$(".accordion-inner #steps").empty();
	$(".accordion-inner #questions").empty();
	$(".accordion-inner #questions").append('<option  value="">Select</option>');
	$("#steps option").remove();
	var stepSelect = $(".accordion-inner #steps");
	stepSelect.append('<option  value="">Select</option>');
	for (var j = 0; j < stepsArr.length; j++) {
		if (stepsArr[j].id === value) {
			for (var i = 0; i < stepsArr[j].steps.length; i++) {
				$('<option value="' + stepsArr[j].steps[i].id+ '">' +stepsArr[j].steps[i].name+ '</option>').appendTo(stepSelect);
			}
		}
	}
}