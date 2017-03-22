/*************Rule Function Defination*********************/
function validateRuleForDropDown(nameofRule,sectID,stepID,quesNUM,element,ruleNum,recentele){
	if(nameofRule=="Validate selected value for Not Ok" || nameofRule=="Validate selected value for Ok"){
	}
	else{
		validateFlag=0;
		for(var j=0;j<rulePropArr.length;j++){
			if (sectID == rulePropArr[j].sectionId) {
				if (stepID == rulePropArr[j].stepId) {
					if (rulePropArr[j].questionNum==quesNUM) {
						if (element == rulePropArr[j].elementName) {
							if (ruleNum == rulePropArr[j].ruleNumber) {
								for (var k2 = 0; k2 < rulePropArr[j].rowArr.length; k2++){
									if( rulePropArr[j].rowArr[k2].rowId==recentele){
										rulePropArr[j].rowArr.splice(k2, 1);
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
function validateRuleForRadio(nameofRule,sectID,stepID,quesNUM,element,ruleNum,recentele){
	if(nameofRule=="Validate radio button value for NO" || nameofRule=="Validate Radio Button value for YES" ){
	}
	else{
		validateFlag_=0;
		for(var j=0;j<ruleRadioArr.length;j++){
			if (sectID == ruleRadioArr[j].sectionId) {
				if (stepID == ruleRadioArr[j].stepId) {
					if (ruleRadioArr[j].questionNum==quesNUM) {
						if (element == ruleRadioArr[j].elementName) {
							if (ruleNum == ruleRadioArr[j].ruleNumber) {
								for (var k2 = 0; k2 < ruleRadioArr[j].rowRadioArr.length; k2++){
									if( ruleRadioArr[j].rowRadioArr[k2].rowId==recentele){
										ruleRadioArr[j].rowRadioArr.splice(k2, 1);
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
function validateRuleForCheckbox(nameofRule,sectID,stepID,quesNUM,element,ruleNum,recentele){
	if(nameofRule=="Validate Checkbox Value for equal" || nameofRule=="Validate Checkbox Value for not equal" ){
	}
	else{
		validateFlagChk=0;
		for(var j=0;j<ruleChkArr.length;j++){
			if (sectID == ruleChkArr[j].sectionId) {
				if (stepID == ruleChkArr[j].stepId) {
					if (ruleChkArr[j].questionNum==quesNUM) {
						if (element == ruleChkArr[j].elementName) {
							if (ruleNum == ruleChkArr[j].ruleNumber) {
								for (var k2 = 0; k2 < ruleChkArr[j].rowChkArr.length; k2++){
									if( ruleChkArr[j].rowChkArr[k2].rowId==recentele){
										ruleChkArr[j].rowChkArr.splice(k2, 1);
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


function dropDownPopulateRulePropArr(sectID,stepID,quesNUM,element,ruleNum,tempPropObj,flagRowProp){
	for(var i=0;i<rulePropArr.length;i++){
		if(sectID==rulePropArr[i].sectionId){
			if(stepID==rulePropArr[i].stepId){
				if(quesNUM==rulePropArr[i].questionNum){
					if(element==rulePropArr[i].elementName){
						if(ruleNum==rulePropArr[i].ruleNumber){
							tempPropObj.rowId=recentele;
							var len=rulePropArr[i].rowArr.length;
							rulePropArr[i].rowArr[len]=tempPropObj;
							flagRowProp=1;
						}
					}	
				}
			}
		}
	}
	return flagRowProp;
}
function radioButtonPopulateRulePropArr(sectID,stepID,quesNUM,element,ruleNum,tempPropObj,flagRadioProp){
	for(var i=0;i<ruleRadioArr.length;i++){
		if(sectID==ruleRadioArr[i].sectionId){
			if(stepID==ruleRadioArr[i].stepId){
				if(quesNUM==ruleRadioArr[i].questionNum){
					if(element==ruleRadioArr[i].elementName){
						if(ruleNum==ruleRadioArr[i].ruleNumber){
							tempPropObj.rowId=recentele;
							var len=ruleRadioArr[i].rowRadioArr.length;
							ruleRadioArr[i].rowRadioArr[len]=tempPropObj;
							flagRadioProp=1;
						}
					}	
				}
			}
		}
	}
	return flagRadioProp;
}
function checkboxPopulateRulePropArr(sectID,stepID,quesNUM,element,ruleNum,tempPropObj,flagRadioProp){
	for(var i=0;i<ruleChkArr.length;i++){
		if(sectID==ruleChkArr[i].sectionId){
			if(stepID==ruleChkArr[i].stepId){
				if(quesNUM==ruleChkArr[i].questionNum){
					if(element==ruleChkArr[i].elementName){
						if(ruleNum==ruleChkArr[i].ruleNumber){
							tempPropObj.rowId=recentele;
							var len=ruleChkArr[i].rowChkArr.length;
							ruleChkArr[i].rowChkArr[len]=tempPropObj;
							flagChkProp=1;
						}
					}	
				}
			}
		}
	}
	return flagChkProp;
}
function rulePropArrSettingPresentFlag(sectID,stepID,quesNUM,element,ruleNum,presentFlag){
	for(var i=0;i<rulePropArr.length;i++){
		if(sectID==rulePropArr[i].sectionId){
			if(stepID==rulePropArr[i].stepId){
				if(quesNUM==rulePropArr[i].questionNum){
					if(element==rulePropArr[i].elementName){
						if(ruleNum==rulePropArr[i].ruleNumber){
							presentFlag=1;
						}
					}	
				}
			}
		}
	}
	return presentFlag;
}
function rulePropArrSettingPresentFlagDropDown(sectID,stepID,quesNUM,element,ruleNum,tempPropObj,tempObj,presentFlag,flagRowProp){
	for(var i=0;i<rulePropArr.length;i++){
		if(sectID==rulePropArr[i].sectionId){
			if(stepID==rulePropArr[i].stepId){
				if(quesNUM==rulePropArr[i].questionNum){
					if(element==rulePropArr[i].elementName){
						if(ruleNum==rulePropArr[i].ruleNumber){
							tempPropObj.rowId=tempObj.idRule;
							var len=rulePropArr[i].rowArr.length;
							rulePropArr[i].rowArr[len]=tempPropObj;
							flagRowProp=1;
							presentFlag=0;
						}
					}	
				}
			}
		}
	}
}
function rulePropArrSettingPresentFlagRadioButton(sectID,stepID,quesNUM,element,ruleNum,tempPropRadioObj,tempObj,presentFlag,flagRadioProp){
	for(var i=0;i<ruleRadioArr.length;i++){
		if(sectID==ruleRadioArr[i].sectionId){
			if(stepID==ruleRadioArr[i].stepId){
				if(quesNUM==ruleRadioArr[i].questionNum){
					if(element==ruleRadioArr[i].elementName){
						if(ruleNum==ruleRadioArr[i].ruleNumber){
							tempPropRadioObj.rowId=tempObj.idRule;
							var len=ruleRadioArr[i].rowRadioArr.length;
							ruleRadioArr[i].rowRadioArr[len]=tempPropRadioObj;
							flagRadioProp=1;
							presentFlag=0;
						}
					}	
				}
			}
		}
	}
}
function rulePropArrSettingPresentFlagCheckBox(sectID,stepID,quesNUM,element,ruleNum,tempChkObj,tempObj,presentFlag,flagChkProp){
	for(var i=0;i<ruleChkArr.length;i++){
		if(sectID==ruleChkArr[i].sectionId){
			if(stepID==ruleChkArr[i].stepId){
				if(quesNUM==ruleChkArr[i].questionNum){
					if(element==ruleChkArr[i].elementName){
						if(ruleNum==ruleChkArr[i].ruleNumber){
							tempChkObj.rowId=tempObj.idRule;
							var len=ruleChkArr[i].rowChkArr.length;
							ruleChkArr[i].rowChkArr[len]=tempChkObj;
							flagChkProp=1;
							presentFlag=0;
						}
					}	
				}
			}
		}
	}
}
function validationForRuleFormulaData(rule,globalFlagOfRule){
	if(rule=="Single Range less then" || rule=="Single Range greater then" ){
		if(document.getElementById('var1').value=="" ||document.getElementById('var1').value==" "){
			$("#AlertRuleFormulaData").modal();
			globalFlagOfRule=1;
		}
	}
	if(rule=="Multiple Range a<= I <= b" || rule=="Multiple_Range_logical_And-i>a&&i<=b" || rule=="Multiple Range"){
		if(document.getElementById('var1').value=="" ||document.getElementById('var1').value==" " ||document.getElementById('var2').value=="" ||document.getElementById('var2').value==" "){
			$("#AlertRuleFormulaData").modal();
			globalFlagOfRule=1;
		}
	}
	if(rule=="Multiple Range logical And"){
		if(document.getElementById('var1').value=="" ||document.getElementById('var1').value==" " ||document.getElementById('var2').value=="" ||document.getElementById('var2').value==" " ||document.getElementById('var3').value=="" ||document.getElementById('var3').value==" " ||document.getElementById('var4').value=="" ||document.getElementById('var4').value==" "){
			$("#AlertRuleFormulaData").modal();
			globalFlagOfRule=1;
		}
	}
	return globalFlagOfRule;
}
$(document).on('click', '.submitRules', function() {
	var eleNumber=this.id.replace('ruleNum_','');
	var eleName=($("#"+this.id).attr("data-ele"));
	var validateActionOfRuleFlag=0;
	var validFlag=0;
	var flag=1;
	for(var f=0;f<ruleMainArr.length;f++){
		if(eleName==ruleMainArr[f].elementName){
			if(eleNumber==ruleMainArr[f].ruleNumber){
				for(var n=0;n<ruleMainArr[f].RuleArr.length;n++){
					var idRule=ruleMainArr[f].RuleArr[n].idRule;
					if(actionRulesArr.length>0){
						validateActionOfRuleFlag=validationActionPresent(eleName,eleNumber,idRule,validateActionOfRuleFlag);
					}
					if(validateActionOfRuleFlag==1){
						validateActionOfRuleFlag=0;
						validFlag=1;
					}
					else{
						$("#AlertActionRequired").modal();
						validFlag=0;
						n=ruleMainArr[f].RuleArr.length;
					}
				}
			}
		}
	}
	if(validFlag==1){
		$("#rulesPopup").modal('hide');
	}
	else{
		if(ruleMainArr.length >0){
			for(var i=0;i<ruleMainArr.length;i++){
				if(eleName==ruleMainArr[i].elementName){
					if(eleNumber==ruleMainArr[i].ruleNumber){
						flag=0;
					}
				}
			}
			if(flag==1){
				$("#AlertRules").modal();
				return false;
			}
		}else{
			$("#AlertRules").modal();
			return false;
		}
	}
});

function validationActionPresent(eleName,eleNumber,idRule,validateActionOfRuleFlag){
	for(var m=0;m<actionRulesArr.length;m++){
		if(actionRulesArr[m].elementName==eleName){
			if(actionRulesArr[m].ruleNumber==eleNumber){
				if(actionRulesArr[m].Row==idRule){
					validateActionOfRuleFlag=1;
				}
			}
		}
	}
	return validateActionOfRuleFlag;
}
