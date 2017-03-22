/***Deleting Actions****/
$(document).on("click", ".innertrashIcon", function(e) {
	var divId = this.id;
	var innerrowID = divId.replace('innertrash_', '');
	var row = $("#" + divId).attr("data-rowID");
	for(var m=0;m<actionRulesArr.length;m++){
		if(actionRulesArr[m].elementName==$("#" + this.id).attr("data-eleID")) {
			if(actionRulesArr[m].ruleNumber==$("#" + divId).attr("data-ruleID")){
				if(actionRulesArr[m].Row==row){
					for(var f=0;f<actionRulesArr[m].actionArr.length;f++){
						if(actionRulesArr[m].actionArr[f].innerID==innerrowID){
							actionRulesArr[m].actionArr.splice(f,1);
						}
					}
				}
			}
		}
	}
	var id = 1;
	$("#innerRow_" + innerrowID).remove();
	$("#innerTable_" + row).find("tr.inner").each(function(index) {
		$("td", this).each(function(j) {
			if (j == 0) {
				var rule_id = ($(this).text());
				$("#inner1_" + rule_id).text('');
				$("#inner1_" + rule_id).text(id);
			}
		});
		id++;
	});
});
/********************Edit Actions**************/
$(document).on("click", ".editIcon_inner", function(e) {
	var nameOf_Rule="";
	var divId = this.id;
	innerFlagEdit = 1;
	var innerRuleID = divId.replace('innerEdit_', '');
	var sect = $("#" + divId).attr("data-sectID");
	var step = $("#" + divId).attr("data-stepID");
	var ques = $("#" + divId).attr("data-quesID");
	var ele = $("#" + divId).attr("data-eleID");
	var rule = $("#" + divId).attr("data-ruleID");
	var row = $("#" + divId).attr("data-rowID");
	var innerRow = $("#" + divId).attr("data-innerRow");
	var innerruleObj = new Object();
	nameOf_Rule=editInnerRule(sect,step,ques,ele,rule,row,nameOf_Rule);
	for (var i = 0; i < actionRulesArr.length; i++) {
		if (sect == actionRulesArr[i].sectionId) {
			if (step == actionRulesArr[i].stepId) {
				if (ques == actionRulesArr[i].questionNum) {
					if (ele == actionRulesArr[i].elementName) {
						if (rule == actionRulesArr[i].ruleNumber) {
							if (row == actionRulesArr[i].Row) {
								for (var k = 0; k < actionRulesArr[i].actionArr.length; k++) {
									if (actionRulesArr[i].actionArr[k].innerRow == innerRow) {
										actionID_num = actionRulesArr[i].actionArr[k].actionID_num;
										output = actionRulesArr[i].actionArr[k].output;
										opVal = actionRulesArr[i].actionArr[k].opVal;
										if(actionRulesArr[i].actionArr[k].fields=="" ||actionRulesArr[i].actionArr[k].fields==" "){
											fields=0;
										}
										else{
											fields = actionRulesArr[i].actionArr[k].fields;
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	innerruleObj.sect = sect;
	innerruleObj.step = step;
	innerruleObj.ques = ques;
	innerruleObj.ele = ele;
	innerruleObj.rule = rule;
	innerruleObj.row = row;
	innerruleObj.innerRow = innerRow;
	innerruleObj.innerRuleID = innerRuleID;
	innerruleObj.actionID_num = actionID_num;
	innerruleObj.output = output;
	innerruleObj.opVal = opVal;
	innerruleObj.fields = fields;
	innerruleObj.nameOf_Rule = nameOf_Rule;
	addActionPopup(innerruleObj);
});

function editInnerRule(sect,step,ques,ele,rule,row,nameOf_Rule){
	for (var i = 0; i < ruleMainArr.length; i++) {
		if (sect == ruleMainArr[i].sectionId) {
			if (step == ruleMainArr[i].stepId) {
				if (ques == ruleMainArr[i].questionNum) {
					if (ele == ruleMainArr[i].elementName) {
						if (rule == ruleMainArr[i].ruleNumber) {
							for (var k = 0; k < ruleMainArr[i].RuleArr.length; k++) {
								if (ruleMainArr[i].RuleArr[k].idRule == row) {
									nameOf_Rule = ruleMainArr[i].RuleArr[k].nameofRule;
								}
							}
						}
					}
				}
			}
		}
	}
	return nameOf_Rule;
}
