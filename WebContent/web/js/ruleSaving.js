/*************Saving of Rules*********************/
var ID_num=0;
var ruleMainArr = new Array();
var rulePropArr=new Array();
var ruleRadioArr=new Array();
var ruleChkArr=new Array();
var flagRowProp=0;
var flagRadioProp=0;
$(document).on('click', '.saveAddRulesBtn', function() {
	var globalFlagOfRule=0;
	var rule=$('#rulesNameDD option:selected').text();
	globalFlagOfRule=validationForRuleFormulaData(rule,globalFlagOfRule);
	if(globalFlagOfRule==0){
		$("#addRulesPopup").modal('hide');
		var flagClick = 0;
		var idRule = 1;
		var flagRule = 0;
		var rule_row="";;
		var formulaData="";
		var select_val="";
		var select_val1="";
		var select_val2="";
		var select_val3="";
		var choice="";
		var ruleNum = this.id.replace('saveRuleNum_', '');
		var sectID = ($("#" + this.id).attr("data-sect"));
		var stepID = ($("#" + this.id).attr("data-step"));
		var quesNUM = ($("#" + this.id).attr("data-ques"));
		var element = ($("#" + this.id).attr("data-ele"));
		var order=($("#" + this.id).attr("data-ruleOrder"));
		var RuleAreaObj = {
				sectionId: sectID,
				stepId: stepID,
				questionNum: quesNUM,
				elementName: element,
				ruleNumber: ruleNum,
				submit:0
		};
		var rowObj={
				sectionId:sectID, 
				stepId:stepID,
				questionNum:quesNUM,
				elementName:element,
				ruleNumber:ruleNum
		};
		var rowRadioObj={
				sectionId:sectID, 
				stepId:stepID,
				questionNum:quesNUM,
				elementName:element,
				ruleNumber:ruleNum
		};
		var rowChkObj={
				sectionId:sectID, 
				stepId:stepID,
				questionNum:quesNUM,
				elementName:element,
				ruleNumber:ruleNum
		};
		var rowArr=new Array();
		var rowRadioArr=new Array();
		var rowChkArr=new Array();
		var RuleArr=new Array();
		if (editFlag == 1) {
			var nameofRule = $('#rulesNameDD option:selected').text();
			var withoutSpace = nameofRule.replace(/ /g, ",");
			$("#code1_" + recentele).text(" ");
			$("#code1_" + recentele).text(nameofRule);
			$("#code2_" + recentele).text(" ");
			$("#code2_" + recentele).text($('#rulesFormula').text());
			$("#code4_" + recentele).text(" ");
			var html = "";
			html += "<a href=\"#\" data-nameofRule='" + withoutSpace + "' data-id='" + recentele + "'   data-nameofRule='" + withoutSpace + "'  data-sectID='" + sectID + "' data-stepID='" + stepID + "' data-quesID='" + quesNUM + "' data-eleID='" + element + "' data-ruleID='" + ruleNum + "'onclick=\"addActionPopup($(this))\">Add Action</a>";
			$("#code4_" + recentele).append(html);
			$("#code3_" + recentele).text(" ");
			if(validateFlag==1){
				validateRuleForDropDown(nameofRule,sectID,stepID,quesNUM,element,ruleNum,recentele);
			}
			if(validateFlag_==1){
				validateRuleForRadio(nameofRule,sectID,stepID,quesNUM,element,ruleNum,recentele);
			}
			if(validateFlagChk==1){
				validateRuleForCheckbox(nameofRule,sectID,stepID,quesNUM,element,ruleNum,recentele);
			}
			if (nameofRule == "Single Range less then") {
				select_val=document.getElementById('var1').value;
				formulaData = $('#rulesFormulaData').text() + document.getElementById('var1').value;
				$("#code3_" + recentele).text($('#rulesFormulaData').text() + document.getElementById('var1').value);
			} else if (nameofRule == "Validate selected value for Not Ok" ||nameofRule == "Validate selected value for Ok") {
				if(validateFlag1==1){
					select_val=($('select#select_id option:selected').text());
					formulaData="I!="+select_val;
					$("#code3_"+recentele).text(formulaData);
					var tempPropObj=new Object();
					if(flagRowProp==1){
						flagRowProp=dropDownPopulateRulePropArr(sectID,stepID,quesNUM,element,ruleNum,tempPropObj,flagRowProp);
					}
					if(flagRowProp==0){
						tempPropObj.rowId=recentele;
						rowArr.push(tempPropObj);
						rowObj.rowArr=rowArr;
						rulePropArr.push(rowObj);
						flagRowProp=1;
					}
					validateFlag1=0;
				}
				else{
					select_val=($('select#select_id option:selected').text());
					formulaData="I!="+select_val;
					$("#code3_"+recentele).text(formulaData);
				}
			} 
			else if (nameofRule == "Validate radio button value for NO" ||nameofRule == "Validate Radio Button value for YES") {
				select_val=($('select#select_id_radio option:selected').text());
				choice=$('select#select_id_radio option:selected').attr("id").replace("radioChoice_","");
				//tempObj.val_form=val_form;
				//tempObj.choiceId=choiceId;
				formulaData =  "I="+$('select#select_id_radio option:selected').text();
				$("#code3_"+recentele).text(formulaData);
				/*if(validateFlag_==1){
					select_val=document.getElementById('var1').value;
					formulaData = "I!="+ document.getElementById('var1').value;
					$("#code3_"+recentele).text(formulaData);
					var tempPropObj=new Object();
					if(flagRadioProp==1){
						flagRadioProp=radioButtonPopulateRulePropArr(sectID,stepID,quesNUM,element,ruleNum,tempPropObj,flagRadioProp);
					}
					if(flagRadioProp==0){
						tempPropObj.rowId=recentele;
						rowRadioArr.push(tempPropObj);
						rowRadioObj.rowRadioArr=rowRadioArr;
						ruleRadioArr.push(rowRadioObj);
						flagRadioProp=1;
					}
					validateFlag_=0;
				}*/
			}
			else if (nameofRule == "Validate Checkbox Value for not equal" || nameofRule == "Validate Checkbox Value for equal") {
				//if(element=="anscheckBox" ){
					/*if(validateFlagChk==1){
						select_val=document.getElementById('var1').value;
						formulaData =  document.getElementById('var1').value;
						$("#code3_"+recentele).text(formulaData);
						var tempPropObj=new Object();
						if(flagChkProp==1){
							flagChkProp=checkboxPopulateRulePropArr(sectID,stepID,quesNUM,element,ruleNum,tempPropObj,flagChkProp);
						}
						if(flagChkProp==0){
							tempPropObj.rowId=recentele;
							rowChkArr.push(tempPropObj);
							rowChkObj.rowChkArr=rowChkArr;
							ruleChkArr.push(rowChkObj);
							flagChkProp=1;
						}
						validateFlagChk=0;
					}*/
				//}
				select_val=($('select#select_id_checkbox option:selected').text());
				choice=$('select#select_id_checkbox option:selected').attr("id").replace("checkboxChoice_","");
				formulaData =  "I="+$('select#select_id_checkbox option:selected').text();
				$("#code3_"+recentele).text(formulaData);
			}
			else if (nameofRule == "Single Range greater then") {
				select_val=document.getElementById('var1').value;
				formulaData = $('#rulesFormulaData').text() + document.getElementById('var1').value;
				$("#code3_" + recentele).text($('#rulesFormulaData').text() + document.getElementById('var1').value);
			} else if (nameofRule == "Multiple Range a<= I <= b") {
				select_val=document.getElementById('var1').value;
				select_val1=document.getElementById('var2').value;
				formulaData=document.getElementById('var1').value +"<= I <="+document.getElementById('var2').value;
				$("#code3_" + recentele).text(formulaData);
			} else if (nameofRule == "Multiple_Range_logical_And-i>a&&i<=b") {
				select_val=document.getElementById('var1').value;
				select_val1=document.getElementById('var2').value;
				formulaData = "i>" + document.getElementById('var1').value + " && i<= " + document.getElementById('var2').value;
				$("#code3_" + recentele).text("i>" + document.getElementById('var1').value + " && i<= " + document.getElementById('var2').value);
			} else if (nameofRule == "Multiple Range") {
				select_val=document.getElementById('var1').value;
				select_val1=document.getElementById('var2').value;
				formulaData = document.getElementById('var1').value + $('div#rulesFormulaData').text() + document.getElementById('var2').value;
				$("#code3_" + recentele).text(document.getElementById('var1').value + $('#rulesFormulaData').text() + document.getElementById('var2').value);
			}
			else if (nameofRule == "Multiple Range logical And") {
				select_val=document.getElementById('var1').value;
				select_val1=document.getElementById('var2').value;
				select_val2=document.getElementById('var3').value;
				select_val3=document.getElementById('var4').value;
				formulaData = document.getElementById('var1').value + "< I >" + document.getElementById('var2').value + "&&" + document.getElementById('var3').value + "< I >" + document.getElementById('var4').value;
				$("#code3_" + recentele).text(formulaData);
			} 
			if(ruleMainArr.length>0){
				for(var i=0;i<ruleMainArr.length;i++){
					if(element==ruleMainArr[i].elementName){
						if(ruleNum==ruleMainArr[i].ruleNumber){
							for(var k=ruleMainArr[i].RuleArr.length-1;k>=0;k--){
								if(recentele==ruleMainArr[i].RuleArr[k].idRule){
									ruleMainArr[i].RuleArr[k].ID_num=ID_num;
									ruleMainArr[i].RuleArr[k].nameofRule=nameofRule;
									ruleMainArr[i].RuleArr[k].valueofFormula=$('label#rulesFormula').text();
									ruleMainArr[i].RuleArr[k].formulaData=formulaData;
									ruleMainArr[i].RuleArr[k].val_form=select_val;
									ruleMainArr[i].RuleArr[k].choiceId=choice;
									ruleMainArr[i].RuleArr[k].val_form1=select_val1;
									ruleMainArr[i].RuleArr[k].val_form2=select_val2;
									ruleMainArr[i].RuleArr[k].val_form3=select_val3;
								}
							}
						}
					}
				}
			}
		} else {
			var tempObj = new Object();
			var tempPropObj=new Object();
			var tempPropRadioObj=new Object();
			var tempChkObj=new Object();
			if (ruleMainArr.length > 0) {
				for (var i = 0; i < ruleMainArr.length; i++) {
					if (element == ruleMainArr[i].elementName) {
						if (ruleNum == ruleMainArr[i].ruleNumber) {
							flagRule = 1;
							var len = ruleMainArr[i].RuleArr.length;
							if (len == 0) {
								tempObj.idRule = 1;
							} else {
								tempObj.idRule = ruleMainArr[i].RuleArr[len - 1].idRule + 1;
							}
						}
					}
				}
			}
			var nameofRule = $('#rulesNameDD option:selected').text();
			var withoutSpace = nameofRule.replace(/ /g, ",");
			var valueofFormula = $('#rulesFormula').text();
			if (flagRule == 0) {
				tempObj.idRule = idRule;
			}
			tempObj.ID_num = ID_num;
			tempObj.nameofRule = nameofRule;
			tempObj.valueofFormula = valueofFormula;
			if (nameofRule == "Single Range less then") {
				var val_form=document.getElementById('var1').value;
				tempObj.val_form=val_form;
				formulaData=$('div#rulesFormulaData').text()+document.getElementById('var1').value;
			}  
			else if (nameofRule == "Validate selected value for Not Ok" || nameofRule == "Validate selected value for Ok") {
				var presentFlag=0;
				var val_form=($('select#select_id option:selected').text());
				tempObj.val_form=val_form;
				formulaData="I!="+val_form;
				if(rulePropArr.length>0){
					presentFlag=rulePropArrSettingPresentFlag(sectID,stepID,quesNUM,element,ruleNum,presentFlag);
				}	
				if(presentFlag==1){
					rulePropArrSettingPresentFlagDropDown(sectID,stepID,quesNUM,element,ruleNum,tempPropObj,tempObj,presentFlag,flagRowProp);
				}	
				else{
					tempPropObj.rowId=tempObj.idRule;
					rowArr.push(tempPropObj);
					rowObj.rowArr=rowArr;
					rulePropArr.push(rowObj);
					flagRowProp=1;
				}
			} else if (nameofRule == "Single Range greater then") {
				var val_form=document.getElementById('var1').value;
				tempObj.val_form=val_form;
				formulaData = $('#rulesFormulaData').text() + document.getElementById('var1').value;
			} 
			else if (nameofRule == "Validate radio button value for NO" ||nameofRule == "Validate Radio Button value for YES") {
				//var presentFlag=0;
				var val_form=($('select#select_id_radio option:selected').text());
				var choiceId=$('select#select_id_radio option:selected').attr("id").replace("radioChoice_","");
				tempObj.val_form=val_form;
				tempObj.choiceId=choiceId;
				formulaData =  "I="+$('select#select_id_radio option:selected').text();
				/*if(ruleRadioArr.length>0){
					presentFlag=rulePropArrSettingPresentFlag(sectID,stepID,quesNUM,element,ruleNum,presentFlag);
				}	
				if(presentFlag==1){
					rulePropArrSettingPresentFlagRadioButton(sectID,stepID,quesNUM,element,ruleNum,tempPropRadioObj,tempObj,rulePropArrSettingPresentFlagDropDownpresentFlag,flagRadioProp);

				}	
				else{
					tempPropRadioObj.rowId=tempObj.idRule;
					rowRadioArr.push(tempPropRadioObj);
					rowRadioObj.rowRadioArr=rowRadioArr;
					ruleRadioArr.push(rowRadioObj);
					flagRadioProp=1;
				}*/
			}
			else if (nameofRule == "Validate Checkbox Value for equal" ||nameofRule == "Validate Checkbox Value for not equal") {
				/*//if(element=="anscheckBox" ){
					var presentFlag=0;
					var val_form=document.getElementById('var1').value;
					tempObj.val_form=val_form;
					formulaData =  document.getElementById('var1').value;
					if(ruleChkArr.length>0){
						presentFlag=rulePropArrSettingPresentFlag(sectID,stepID,quesNUM,element,ruleNum,presentFlag);
					}	
					if(presentFlag==1){
						rulePropArrSettingPresentFlagCheckBox(sectID,stepID,quesNUM,element,ruleNum,tempChkObj,tempObj,presentFlag,flagChkProp);	
					}	
					else{
						tempChkObj.rowId=tempObj.idRule;
						rowChkArr.push(tempChkObj);
						rowChkObj.rowChkArr=rowChkArr;
						ruleChkArr.push(rowChkObj);
						flagChkProp=1;
					}
				//}*/
				var val_form=($('select#select_id_checkbox option:selected').text());
				var choiceId=$('select#select_id_checkbox option:selected').attr("id").replace("checkboxChoice_","");
				tempObj.val_form=val_form;
				tempObj.choiceId=choiceId;
				formulaData =  "I="+$('select#select_id_checkbox option:selected').text();
				
			}
			else if (nameofRule == "Multiple Range a<= I <= b") {
				var val_form=document.getElementById('var1').value;
				tempObj.val_form=val_form;	
				var val_form1=document.getElementById('var2').value;
				tempObj.val_form1=val_form1;
				tempObj.choiceId="";
				formulaData = document.getElementById('var1').value + "<= I <= " + document.getElementById('var2').value;
			} else if (nameofRule == "Multiple_Range_logical_And-i>a&&i<=b") {
				var val_form=document.getElementById('var1').value;
				tempObj.val_form=val_form;	
				var val_form1=document.getElementById('var2').value;
				tempObj.val_form1=val_form1;
				tempObj.choiceId="";
				formulaData = "i>" + document.getElementById('var1').value + " && i<= " + document.getElementById('var2').value;
			} else if (nameofRule == "Multiple Range") {
				var val_form=document.getElementById('var1').value;
				tempObj.val_form=val_form;	
				var val_form1=document.getElementById('var2').value;
				tempObj.val_form1=val_form1;
				tempObj.choiceId="";
				formulaData = document.getElementById('var1').value + $('#rulesFormulaData').text() + document.getElementById('var2').value;
			} 
			else if (nameofRule == "Multiple Range logical And") {
				var val_form=document.getElementById('var1').value;
				tempObj.val_form=val_form;	
				var val_form1=document.getElementById('var2').value;
				tempObj.val_form1=val_form1;
				var val_form2=document.getElementById('var3').value;
				tempObj.val_form2=val_form2;	
				var val_form3=document.getElementById('var4').value;
				tempObj.val_form3=val_form3;
				tempObj.choiceId="";
				formulaData = document.getElementById('var1').value + "< I >" + document.getElementById('var2').value + "&&" + document.getElementById('var3').value + "< I >" + document.getElementById('var4').value;
			} 
			tempObj.formulaData = formulaData;
			if (ruleMainArr.length > 0) {
				for (var i = 0; i < ruleMainArr.length; i++) {
					if (element == ruleMainArr[i].elementName) {
						if (ruleNum == ruleMainArr[i].ruleNumber) {
							flagClick = 1;
							var len = ruleMainArr[i].RuleArr.length;
							ruleMainArr[i].RuleArr[len] = tempObj;
						}
					}
				}
			}
			if (flagClick == 0) {
				RuleArr.push(tempObj);
				RuleAreaObj.RuleArr = RuleArr;
				ruleMainArr.push(RuleAreaObj);
			}
			$('#addRulesPopuTable' + ruleNum).find("tr.outerTable").each(function(index) {
				$("td", this).each(function(j) {
					if (j == 1) {
						rule_row = ($(this).text());
					}
				});
			});
			if (rule_row == undefined) {
				rule_row = 1;
			} else {
				rule_row++;
			}
			for (var i = 0; i < ruleMainArr.length; i++) {
				if (element == ruleMainArr[i].elementName) {
					if (ruleNum == ruleMainArr[i].ruleNumber) {
						for (var k = ruleMainArr[i].RuleArr.length - 1; k >= 0; k--) {
							var rule = ruleMainArr[i].RuleArr[k].idRule;
							var html = "";
							if(ruleMainArr[i].RuleArr[k].valueofFormula=='i<a'){
								var data=ruleMainArr[i].RuleArr[k].valueofFormula.split("<");
								var angle="&lt;";
								ruleMainArr[i].RuleArr[k].valueofFormula=(data[0]+angle+data[1]);
							}
							html += "<tr id=\"row_" + rule +"_"+order+ "\"  class=\"outerTable \"> ";
							html += "<td><i class=\"checkIDIcon icon-caret-right\" id=\"collapseIcon_" + rule + "\"   data-save=\"block\" data-sectID='" + sectID + "' data-stepID='" + stepID + "' data-quesID='" + quesNUM + "' data-eleID='" + element + "' data-ruleID='" + ruleNum + "'></i></td>";
							html += "<td id=\"code" + rule_row + "\" >" + rule_row + "</td>";
							html += "<td id=\"code1_" + rule + "\" >" + ruleMainArr[i].RuleArr[k].nameofRule + "</td>";
							html += "<td id=\"code2_" + rule + "\" >" + ruleMainArr[i].RuleArr[k].valueofFormula + "</td>";
							html += "<td id=\"code3_" + rule + "\" >" + ruleMainArr[i].RuleArr[k].formulaData + "</td>";
							html += "<td id=\"code4_" + rule + "\" class=\"code4\"><a href=\"#\" data-nameofRule='" + withoutSpace + "' data-id='" + rule + "' data-sectID='" + sectID + "' data-stepID='" + stepID + "' data-quesID='" + quesNUM + "' data-eleID='" + element + "' data-ruleID='" + ruleNum + "'  onclick=\"addActionPopup($(this))\">Add Action</a></td>";
							html += "<td ><i class=\"editIcon1 icon-edit\" data-editID='" + ruleMainArr[i].RuleArr[k].idRule + "'  data-sectID='" + sectID + "' data-stepID='" + stepID + "' data-quesID='" + quesNUM + "' data-eleID='" + element + "' data-ruleID='" + ruleNum + "' id=\"edit_" + ruleMainArr[i].RuleArr[k].idRule + "\"></i></td>";
							html += "<td><i class=\"trashIcon icon-trash\"   data-ruleOrder='"+order+ "' data-sectID='" + sectID + "' data-stepID='" + stepID + "' data-quesID='" + quesNUM + "' data-eleID='" + element + "' data-ruleID='" + ruleNum + "' id=\"trash_" + ruleMainArr[i].RuleArr[k].idRule +"_"+order+ "\" ></i></td>";
							html += "</tr>";
							html += "<tr id=\"report_" + rule +"_"+order+ "\" ><td colspan=\"5\">";
							html += "<table class=\"innerTable\" id=\"innerTable_" + rule + "\" style=\"display:none;padding-left: 80px;;\">";
							html += "<tr><th style=\"width:40px;\">ID</th><th>Action Desc</th><th  style=\"width:80px;\">Tag</th><th style=\"width:80px;\">Output </th><th style=\"width:80px;\"> Action Value</th><th style=\"width:80px;padding-left: 5px;\">No of fields</th><th style=\"width:100px;\">Action</th></tr>";
							html += "</table></td></tr>";
							$('#addRulesPopuTable' + ruleNum).append(html);
							k = -1;
						}
					}
				}
			}
		}
	}
});


