/*************Loading Section Div at time of Edit*********************/
var sectionArr = new Array();
var stepsArr = new Array();
var stepArr = new Array();
var questArr = new Array();
function loadSections(formdto) {
	var sections = formdto.formElements;
	var sectCount = 0;
	var ruleSection=1;
	$('.CLName .sectMainDiv').remove();
	sectionArr = new Array();
	stepsArr = new Array();
	stepArr = new Array();
	questArr = new Array();
	var tempSect=0;
	for (var i = 0; i < sections.length; i++) {
		tempSect++;
		sect_Count++;
		var section = new Object();
		var sectionCount = "section_" + sections[i].sectionId;
		var sectID=sectionCount.replace("section_","");
		$('.CLName').append('<div class="sectMainDiv expanded" id="'+sectionCount+'" status="present" >'+
				'<div class="sectName accordionHeader" id="sectionTab_'+sectID+'">'+
				'<textarea class="textareaVal1" id="sectionText_'+sectID+'" placeholder="Enter Section Name here..."></textarea>'+
				'<a rel="tooltip" title="Help" id="sectionID_'+tempSect+'" sect="'+sectID+'" data-sect-count="'+tempSect+'" status="present" data-server="'+sectID+'" class="sectIconHelpImage" ><img style="margin-left: 35px;" src="images/help_2.png"></a>  '+
				'<a rel="tooltip" title="Add Step"  id="sectionID_'+sectID+'"  status="present" data="'+sectCount+'" data-Sect-Count="'+tempSect+'" data-server="'+sectID+'" class="sectionAddBtn"><img src="images/add.png" style="margin-left: 9px;"></a> '+
				'<a rel="tooltip" title="Delete"   id="sectDelete_'+tempSect+'"  data-sect-del="'+sectID+'"  status="already" onClick="delSection($(this));" ><img src="images/delete_new.png" style="margin-left: 10px;"></a> '+
				'<a class="accrodionTitle"><i class="icon-chevron-up accRightSideIcon" id="filterSectionContent" style="float: right;padding-top:10px;padding-right:10px;color:#3693f8;"></i></a> '+ 
				'</div>'+
		'</div>');
	//	var secID="sectionText_"+sectCount;
		$('#sectionText_'+sectID).val(sections[i].sectionName);
		section.name = sections[i].sectionName;
		section.id = sections[i].sectionId;
		sectionArr.push(section);
		loadSteps(sections[i], sectionCount, i,sectCount,tempSect);
		sectCount++;
		ruleSection++;
	}
	constructSections(sectionArr);
}
function constructSections(sectionArr) {
	$(".accordion-inner #sections").empty();
	$("#sections option").remove();
	$(".accordion-inner #steps").empty();
	$(".accordion-inner #steps").append('<option  value="">Select</option>');
	$(".accordion-inner #questions").empty();
	$(".accordion-inner #questions").append('<option  value="">Select</option>');
	var sectionSelect = $(".accordion-inner #sections");
	sectionSelect.append('<option  value="">Select</option>');
	for (var i = 0; i < sectionArr.length; i++) {
		$('<option value="' + sectionArr[i].id+ '">' +sectionArr[i].name+ '</option>').appendTo(sectionSelect);
	}
}