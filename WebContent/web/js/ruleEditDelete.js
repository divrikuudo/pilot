/*************Editing Rules*********************/
var editFlag = 0;
var rule_name;
var formula_;
var formula_data;
var recentele;
$(document).on("click", ".editIcon1", function(e) {
	var val_form="";
	var val_form1="";
	var val_form2="";
	var val_form3="";
	var divId = this.id;
	var ruleID = divId.replace('edit_', '');
	var ruleObj = new Object();
	var sect = $("#" + divId).attr("data-sectID");
	var step = $("#" + divId).attr("data-stepID");
	var ques = $("#" + divId).attr("data-quesID");
	var ele = $("#" + divId).attr("data-eleID");
	var rule = $("#" + divId).attr("data-ruleID");
	recentele = ruleID;
	editFlag = 1;
	ruleObj.sect = sect;
	ruleObj.step = step;
	ruleObj.ques = ques;
	ruleObj.ele = ele;
	ruleObj.rule = rule;
	for (var i = 0; i < ruleMainArr.length; i++) {
		if (sect == ruleMainArr[i].sectionId) {
			if (step == ruleMainArr[i].stepId) {
				if (ques == ruleMainArr[i].questionNum) {
					if (ele == ruleMainArr[i].elementName) {
						if (rule == ruleMainArr[i].ruleNumber) {
							for (var k = 0; k < ruleMainArr[i].RuleArr.length; k++) {
								if (ruleMainArr[i].RuleArr[k].idRule == ruleID) {
									rule_name = ruleMainArr[i].RuleArr[k].nameofRule;
									formula_ = ruleMainArr[i].RuleArr[k].valueofFormula;
									formula_data = ruleMainArr[i].RuleArr[k].formulaData;
									choiceId= ruleMainArr[i].RuleArr[k].choiceId;
									if(ele=="ansDrpDown" || ele=="ansRadioBtn" ||ele=="anscheckBox"){
										val_form=formula_data.split("=")[1];
									}
									else{
										val_form=(ruleMainArr[i].RuleArr[k].val_form);
										val_form1=(ruleMainArr[i].RuleArr[k].val_form1);
										val_form2=(ruleMainArr[i].RuleArr[k].val_form2);
										val_form3=(ruleMainArr[i].RuleArr[k].val_form3);
									}
								}
							}
						}
					}
				}
			}
		}
	}
	ruleObj.rule_name = rule_name;
	ruleObj.formula_ = formula_;
	ruleObj.formula_data = formula_data;
	ruleObj.choiceId = choiceId;
	ruleObj.val_form=	val_form;
	ruleObj.val_form1=	val_form1;	
	ruleObj.val_form2=	val_form2;	
	ruleObj.val_form3=	val_form3;
	addRules(ruleObj);
});
/*************Deleting Rules*********************/
$(document).on("click", ".trashIcon", function(e) {
	var divId = this.id;
	var rowID = divId.split("_");
	var ele = $("#" + this.id).attr("data-eleID");
	var rule = $("#" + divId).attr("data-ruleID");
	var order=$("#" + this.id).attr("data-ruleOrder");
	var id = 1;
	$("#row_" + rowID[1]+"_"+order).remove();
	$("#report_" + rowID[1]+"_"+order).remove();
	$('#addRulesPopuTable' + rule).find("tr.outerTable").each(function(index) {
		$("td", this).each(function(j) {
			if (j == 1) {
				var rule_id = $(this).text();
				$("#code" + rule_id).text('');
				$("#code" + rule_id).text(id);
			}
		});
		id++;
	});
	trashForRule(divId,rowID[1],ele,rule);
});
function trashForRule(divId,rowID,ele,rule){
	for(var s=0;s< ruleMainArr.length;s++){
		if (ruleMainArr[s].elementName==ele) {
			if(ruleMainArr[s].ruleNumber==rule){
				for (var k = 0; k < ruleMainArr[s].RuleArr.length; k++) {
					if (ruleMainArr[s].RuleArr[k].idRule == rowID) {
						ruleMainArr[s].RuleArr.splice(k, 1);
					}
				} 
			}
		}
	}
	for(var m=0;m<actionRulesArr.length;m++){
		if(actionRulesArr[m].elementName==ele) {
			if(actionRulesArr[m].ruleNumber==rule){
				if(actionRulesArr[m].Row==rowID){
					actionRulesArr.splice(m,1);
				}
			}
		}
	}
	for(var i=0;i<rulePropArr.length;i++){
		if(ele==rulePropArr[i].elementName){
			if(rule==rulePropArr[i].ruleNumber){
				for(var j=0;j<rulePropArr[i].rowArr.length;j++){
					if(rowID==rulePropArr[i].rowArr[j].rowID){
						rulePropArr[i].rowArr.splice(j, 1);
					}
				}
			}
		}
	}
	for(var i=0;i<ruleRadioArr.length;i++){
		if(ele==ruleRadioArr[i].elementName){
			if(rule==ruleRadioArr[i].ruleNumber){
				for(var j=0;j<ruleRadioArr[i].rowRadioArr.length;j++){
					if(rowID==ruleRadioArr[i].rowRadioArr[j].rowId){
						ruleRadioArr[i].rowRadioArr.splice(j, 1);
					}
				}
			}
		}
	}
	for(var i=0;i<ruleChkArr.length;i++){
		if(ele==ruleChkArr[i].elementName){
			if(rule==ruleChkArr[i].ruleNumber){
				for(var j=0;j<ruleChkArr[i].rowChkArr.length;j++){
					if(rowID==ruleChkArr[i].rowChkArr[j].rowID){
						ruleChkArr[i].rowChkArr.splice(j, 1);
					}
				}
			}
		}
	}
}