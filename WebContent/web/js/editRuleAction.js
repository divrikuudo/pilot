/*************Loading Rules and Action at time of Edit*********************/
var eleOrder=1;
var actionRulesArr = new Array();
var ruleMainArr=new Array();
var questionChange=new Array();
function editRulesAndAction(validations, stepID, sectID, questID, ansID, elemetName, count,elementID) {
	var flagClick=0;
	var questChangeFlag=0;
	if(questionChange.length>0){
		if(questionChange[0]==ansID){
			eleOrder++;
			questChangeFlag=1;
		}
		else{
			eleOrder=1;
			questionChange=[];
			questChangeFlag=0;
		}
	}
	if(questChangeFlag==0){
		questionChange.push(ansID);	
	}
	var idRule=0;
	var RuleArr=new Array();
	var RuleAreaObj = {
			sectionId: sectID,
			stepId: stepID,
			questionNum: questID,
			elementName: elemetName,
			ruleNumber: count
	};
	var rulename=new Array();
	for (var i=0; i < validations.length; i++) {
		if(validations[i].elementId==elementID){
			if(validations[i].elementOrder==eleOrder){
				if (ruleMainArr.length > 0) {
					for (var p = 0; p< ruleMainArr.length; p++) {
						if (sectID == ruleMainArr[p].sectionId) {
							if (stepID == ruleMainArr[p].stepId) {
								if (questID == ruleMainArr[p].questionNum) {
									if (elemetName == ruleMainArr[p].elementName) {
										if (count == ruleMainArr[p].ruleNumber) {
											var tempObj = new Object();
											idRule++;
											tempObj.ID_num = validations[i].ruleId;
											tempObj.idRule =idRule;
											tempObj.nameofRule = validations[i].ruleName;
											tempObj.valueofFormula = validations[i].ruleFormula;
											tempObj.formulaData = validations[i].formulaData;
											rulename=[];
											rulename.push(validations[i].ruleName);
											flagClick = 1;
											var len = ruleMainArr[p].RuleArr.length;
											ruleMainArr[p].RuleArr[len] = tempObj;
										}
									}
								}
							}
						}
					}
				}
				if(flagClick==0){
					var tempObj = new Object();
					idRule=1;
					tempObj.ID_num = validations[i].ruleId;
					tempObj.idRule =idRule;
					tempObj.nameofRule = validations[i].ruleName;
					tempObj.valueofFormula = validations[i].ruleFormula;
					tempObj.formulaData = validations[i].formulaData;
					rulename.push(validations[i].ruleName);
					RuleArr.push(tempObj);
					RuleAreaObj.RuleArr = RuleArr;
					ruleMainArr.push(RuleAreaObj);
				}	
			}
		}
	}
	var rowNumber=0;
	var innerId=0;
	for (var i=0; i < validations.length; i++) {
		if(validations[i].elementId==elementID){
			if(validations[i].elementOrder==eleOrder){
				var innerRow=0;
				if(validations[i].actionList.length>0){
					rowNumber++;
					var ActionRuleObj = {
							sectionId: sectID,
							stepId :stepID,
							questionNum :questID,
							elementName:elemetName,
							ruleNumber:count,
							Row:rowNumber
					}
				}
				for(var s=0;s<validations[i].actionList.length;s++){
					var idObj = new Object();
					var actionArr=new Array();
					var duplicate=0;
					innerId++;
					innerRow++;
					for (var p = 0; p < actionRulesArr.length; p++) {
						if (sectID == actionRulesArr[p].sectionId) {
							if (stepID == actionRulesArr[p].stepId) {
								if (questID == actionRulesArr[p].questionNum) {
									if (elemetName == actionRulesArr[p].elementName) {
										if (count == actionRulesArr[p].ruleNumber) {
											if (rowNumber == actionRulesArr[p].Row) {
												duplicate=1;
												var len = (actionRulesArr[p].actionArr.length);
												idObj.actionID_num = validations[i].actionList[s].ruleActionId;
												idObj.innerRow = innerRow;
												idObj.action =  validations[i].actionList[s].ruleActionDesc;
												idObj.tagValue =validations[i].actionList[s].ruleAction;
												idObj.output = validations[i].actionList[s].ruleActionOutput;
												idObj.opVal =  validations[i].actionList[s].ruleActionOutputValue;
												if(validations[i].actionList[s].noOfElement=="" ||validations[i].actionList[s].noOfElement==" "){
													idObj.fields =0;
												}
												else{
													idObj.fields = validations[i].actionList[s].noOfElement;
												}

												idObj.innerID = innerId;
												actionArr.push(idObj);	
												actionRulesArr[p].actionArr[len] = idObj;
											}
										}
									}
								}
							}
						}
					}
					if(duplicate==0){
						idObj.actionID_num = validations[i].actionList[s].ruleActionId;
						idObj.innerRow =innerRow;
						idObj.action =  validations[i].actionList[s].ruleActionDesc;
						idObj.tagValue =validations[i].actionList[s].ruleAction;
						idObj.output = validations[i].actionList[s].ruleActionOutput;
						idObj.opVal =  validations[i].actionList[s].ruleActionOutputValue;
						if(validations[i].actionList[s].noOfElement=="" ||validations[i].actionList[s].noOfElement==" "){
							idObj.fields =0;
						}
						else{
							idObj.fields = validations[i].actionList[s].noOfElement;
						}
						idObj.innerID = innerId;
						actionArr.push(idObj);	
						ActionRuleObj.actionArr = actionArr;
						actionRulesArr.push(ActionRuleObj);
					}
				}
			}
		}
	}
}
