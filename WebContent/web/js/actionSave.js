/********************Saving Action **************/
var innerID = 0;
var action;
var tagValue;
var opVal;
var fields;
var output;
var actionRulesArr = new Array();
function saveAddAction(clickedElement) {
	var innerRow = 1;
	if ($(clickedElement).attr("data-save") == "inner") {
		if($('select#actionDesc option:selected').text()=="" ||$('label#actionTag').text()==""){
			$("#actionValidationAlert").modal();
		}
		else{
			var row = ($(clickedElement).attr("data-id"));
			var sect = ($(clickedElement).attr("data-sect"));
			var step = ($(clickedElement).attr("data-step"));
			var ques = ($(clickedElement).attr("data-ques"));
			var ele = ($(clickedElement).attr("data-ele"));
			var rule = ($(clickedElement).attr("data-rule"));
			var innerRow = ($(clickedElement).attr("data-innerid"));
			var innerTableRow = ($(clickedElement).attr("data-innerTableid"));
			$("#inner2_" + innerTableRow).text('');
			$("#inner2_" + innerTableRow).text($('select#actionDesc option:selected').text());
			$("#inner3_" + innerTableRow).text('');
			$("#inner3_" + innerTableRow).text($('label#actionTag').text());
			$("#inner4_" + innerTableRow).text('');
			$("#inner4_" + innerTableRow).text(document.getElementById('actionOP').value);
			$("#inner5_" + innerTableRow).text('');
			$("#inner5_" + innerTableRow).text(document.getElementById('actionOpVal').value);
			$("#inner6_" + innerTableRow).text('');
			if(document.getElementById('actionNoField').value=="" ||document.getElementById('actionNoField').value==" "){
				$("#inner6_" + innerTableRow).text(0);
			}
			else{
				$("#inner6_" + innerTableRow).text(document.getElementById('actionNoField').value);
			}
			for (var i = 0; i < actionRulesArr.length; i++) {
				if (sect == actionRulesArr[i].sectionId) {
					if (step == actionRulesArr[i].stepId) {
						if (ques == actionRulesArr[i].questionNum) {
							if (ele == actionRulesArr[i].elementName) {
								if (rule == actionRulesArr[i].ruleNumber) {
									if (row == actionRulesArr[i].Row) {
										for (var k = 0; k < actionRulesArr[i].actionArr.length; k++) {
											if (actionRulesArr[i].actionArr[k].innerRow == innerRow) {
												actionRulesArr[i].actionArr[k].action = $('select#actionDesc option:selected').text();
												actionRulesArr[i].actionArr[k].tagValue = $('label#actionTag').text();
												actionRulesArr[i].actionArr[k].output = document.getElementById('actionOP').value;
												actionRulesArr[i].actionArr[k].opVal = document.getElementById('actionOpVal').value;
												if(document.getElementById('actionNoField').value=="" ||document.getElementById('actionNoField').value==" " ||document.getElementById('actionNoField').value==null||document.getElementById('actionNoField').value=="null"){
													actionRulesArr[i].actionArr[k].fields=0;
												}
												else{
													actionRulesArr[i].actionArr[k].fields = (document.getElementById('actionNoField').value);	
												}
												actionRulesArr[i].actionArr[k].actionID_num = actionID_num;
											}
										}
									}
								}
							}
						}
					}
				}
			}
			document.getElementById('actionOP').value = "";
			document.getElementById('actionOpVal').value = "";
			document.getElementById('actionNoField').value = "";	
			$("#addActionpopupWindow").modal('hide');
		}
		
	} else
	{
		if(desc=="" ||tag==""){
			$("#actionValidationAlert").modal();
		}
		else{
			var row = ($(clickedElement).attr("data-id"));
			var sect = ($(clickedElement).attr("data-sect"));
			var step = ($(clickedElement).attr("data-step"));
			var ques = ($(clickedElement).attr("data-ques"));
			var ele = ($(clickedElement).attr("data-ele"));
			var rule = ($(clickedElement).attr("data-rule"));
			var actionObj = {
					sectionId: sect,
					stepId: step,
					questionNum: ques,
					elementName: ele,
					ruleNumber: rule,
					Row: row
			};
			var idObj = new Object();
			var duplicate = 0;
			var actionArr = new Array();
			innerID++;
			action = (desc);
			tagValue = (tag);
			output = (document.getElementById('actionOP').value);
			opVal = (document.getElementById('actionOpVal').value);
			fields = (document.getElementById('actionNoField').value);
			if(fields=="" ||fields==" " ||fields=="null" ||fields==null){
				fields=0;
			}
			for (var i = 0; i < actionRulesArr.length; i++) {
				if (sect == actionRulesArr[i].sectionId) {
					if (step == actionRulesArr[i].stepId) {
						if (ques == actionRulesArr[i].questionNum) {
							if (ele == actionRulesArr[i].elementName) {
								if (rule == actionRulesArr[i].ruleNumber) {
									if (row == actionRulesArr[i].Row) {
										duplicate = 1;
										var len = (actionRulesArr[i].actionArr.length);
										idObj.actionID_num = actionID_num;
										if (len == 0) {
											idObj.innerRow = 1;
										} else {
											idObj.innerRow = actionRulesArr[i].actionArr[len - 1].innerRow + 1;
										}
										idObj.action = action;
										idObj.tagValue = tagValue;
										idObj.output = output;
										idObj.opVal = opVal;
										idObj.fields = fields;
										idObj.innerID = innerID;
										actionRulesArr[i].actionArr[len] = idObj;
									}
								}
							}
						}
					}
				}
			}
			if (duplicate == 0) {
				idObj.actionID_num = actionID_num;
				idObj.innerRow = innerRow;
				idObj.action = action;
				idObj.tagValue = tagValue;
				idObj.output = output;
				idObj.opVal = opVal;
				idObj.fields = fields;
				idObj.innerID = innerID;
				actionArr.push(idObj);
				actionObj.actionArr = actionArr;
				actionRulesArr.push(actionObj);
			}
			var length=0;
			length=actionArrayLength(sect,step,ques,ele,rule,row,length);
			var html = "";
			html += "<tr id=\"innerRow_" + innerID + "\" class=\"inner\"> ";
			html += "<td  id=\"inner1_" + length + "\" >" + length + "</td>";
			html += "<td  id=\"inner2_" + innerID + "\">" + action + "</td>";
			html += "<td  id=\"inner3_" + innerID + "\">" + tagValue + "</td>";
			html += "<td  id=\"inner4_" + innerID + "\">" + output + "</td>";
			html += "<td  id=\"inner5_" + innerID + "\">" + opVal + "</td>";
			html += "<td  id=\"inner6_" + innerID + "\">" + fields + "</td>";
			html += "<td ><i class=\"editIcon_inner icon-edit\" data-sectID='" + sect + "'  data-stepID='" + step + "'   data-quesID='" + ques + "'   data-eleID='" + ele + "'   data-ruleID='" + rule + "'   data-rowID='" + row + "' data-innerRow='" + idObj.innerRow + "'  id=\"innerEdit_" + innerID + "\"></i>";
			html += "<i  class=\"innertrashIcon icon-trash\" data-sectID='" + sect + "'  data-stepID='" + step + "'   data-quesID='" + ques + "'   data-eleID='" + ele + "'   data-ruleID='" + rule + "'   data-rowID='" + row + "'  id=\"innertrash_" + innerID+ "\" ></i></td>";
			html += "</tr>";
			$("#innerTable_" + clickedRow).append(html);
			document.getElementById('actionOP').value = "";
			document.getElementById('actionOpVal').value = "";
			document.getElementById('actionNoField').value = "";
			$("#addActionpopupWindow").modal('hide');
		}
		
	}
}
function actionArrayLength(sect,step,ques,ele,rule,row,length){
	 for (var i = 0; i < actionRulesArr.length; i++) {
    	if (sect == actionRulesArr[i].sectionId) {
    		if (step == actionRulesArr[i].stepId) {
    			if (ques == actionRulesArr[i].questionNum) {
    				if (ele == actionRulesArr[i].elementName) {
    					if (rule == actionRulesArr[i].ruleNumber) {
    						if (row == actionRulesArr[i].Row) {
    							length = actionRulesArr[i].actionArr.length;
    						}
    					}
    				}
    			}
    		}
    	}
    }
	 return length;
}