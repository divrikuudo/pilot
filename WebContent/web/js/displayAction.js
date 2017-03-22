/*************Display Of Action*********************/
var innerFlagEdit = 0;
var actionID_num=0;
var clickedRow;
var desc;
var tag;
$(document).on("click", ".checkIDIcon", function(e) {
	var divId = this.id;
	var temp = divId.replace('collapseIcon_', '');
	var sect = ($("#" + divId).attr("data-sectID"));
	var step = ($("#" + divId).attr("data-stepID"));
	var ques = ($("#" + divId).attr("data-quesID"));
	var ele = ($("#" + divId).attr("data-eleID"));
	var rule = ($("#" + divId).attr("data-ruleID"));
	var flag = ($("#" + divId).attr("data-save"));
	if ($("#" + divId).hasClass('icon-caret-right')) {
		$("#" + divId).removeClass("icon-caret-right").addClass("icon-caret-down");
		if (flag == "block") {
			$("#innerTable_" + temp).css("display", "block");
		} else {
			creatingActionTable(sect,step,ques,ele,rule,temp);
		}
	} else {
		$("#" + divId).removeClass("icon-caret-down").addClass("icon-caret-right");
		$("#innerTable_" + temp).css("display", "none");
	}
});
function creatingActionTable(sect,step,ques,ele,rule,temp){
	for (var i = 0; i < actionRulesArr.length; i++) {
		if (sect == actionRulesArr[i].sectionId) {
			if (step == actionRulesArr[i].stepId) {
				if (ques == actionRulesArr[i].questionNum) {
					if (ele == actionRulesArr[i].elementName) {
						if (rule == actionRulesArr[i].ruleNumber) {
							if (temp == actionRulesArr[i].Row) {
								$("#innerTable_" + temp).empty();
								var html1 = "";
								html1 += "<tr><th style=\"width:40px;\">ID</th><th>Action Desc</th><th  style=\"width:80px;\">Tag</th><th style=\"width:80px;\">Output </th><th style=\"width:80px;\"> Action Value</th><th style=\"width:80px;padding-left: 5px;\">No of fields</th><th style=\"width:100px;\">Action</th></tr>";
								$("#innerTable_" + temp).append(html1);
								$("#innerTable_" + temp).css("display", "block");
								for (var k = 0; k < actionRulesArr[i].actionArr.length; k++) {
									var html = "";
									var k1 = k + 1;
									html += "<tr id=\"innerRow_" + actionRulesArr[i].actionArr[k].innerID + "\" class=\"inner\"> ";
									html += "<td id=\"inner1_" + k1 + "\" >" + k1 + "</td>";
									html += "<td id=\"inner2_" + actionRulesArr[i].actionArr[k].innerID + "\">" + actionRulesArr[i].actionArr[k].action + "</td>";
									html += "<td id=\"inner3_" + actionRulesArr[i].actionArr[k].innerID + "\">" + actionRulesArr[i].actionArr[k].tagValue + "</td>";
									html += "<td id=\"inner4_" + actionRulesArr[i].actionArr[k].innerID + "\">" + actionRulesArr[i].actionArr[k].output + "</td>";
									html += "<td id=\"inner5_" + actionRulesArr[i].actionArr[k].innerID + "\" >" + actionRulesArr[i].actionArr[k].opVal + "</td>";
									html += "<td id=\"inner6_" + actionRulesArr[i].actionArr[k].innerID + "\">" + actionRulesArr[i].actionArr[k].fields + "</td>";
									html += "<td ><i class=\"editIcon_inner icon-edit\" data-sectID='" + sect + "'  data-stepID='" + step + "'   data-quesID='" + ques + "'   data-eleID='" + ele + "'   data-ruleID='" + rule + "'   data-rowID='" + temp + "'  data-innerRow='" + actionRulesArr[i].actionArr[k].innerRow + "'  id=\"innerEdit_" + actionRulesArr[i].actionArr[k].innerID + "\"></i>";
									html += "<i  class=\"innertrashIcon icon-trash\" data-sectID='" + sect + "'  data-stepID='" + step + "'   data-quesID='" + ques + "'   data-eleID='" + ele + "'   data-ruleID='" + rule + "'   data-rowID='" + temp + "'  id=\"innertrash_" + actionRulesArr[i].actionArr[k].innerID + "\" ></i></td>";
									html += "</tr>";
									$("#innerTable_" + temp).append(html);
									$("#innerTable_" + temp).css("display", "block");
								}
							}
						}
					}
				}
			}
		}
	}
}
/*************Adding Actions*********************/
function addActionPopup(clickedElement) {
	var serverbaseUrl = getServerPath();
	if (innerFlagEdit == 1) {
		var sect = clickedElement.sect;
		var step = clickedElement.step;
		var ques = clickedElement.ques;
		var ele = clickedElement.ele;
		var rule = clickedElement.rule;
		var outerRow = clickedElement.row;
		var innerTableRow = clickedElement.innerRow;
		var innerTable_Row = clickedElement.innerRuleID;
		var actionID = clickedElement.actionID_num;
		var output = clickedElement.output;
		var ouputValue = clickedElement.opVal;
		var fields = clickedElement.fields;
		var nameofrule = clickedElement.nameOf_Rule;
		innerFlagEdit = 0;
		$('#actionOP').val(output);
		$('#actionOpVal').val(ouputValue);
		$('#actionNoField').val(fields);
		$('#addActionpopupWindow').modal();
		$("#saveActionFooter").empty();
		var html = "";
		html += "<button type=\"button\"  data-rule='" + rule + "'  data-sect='" + sect + "'   data-step='" + step + "'   data-ques='" + ques + "'   data-ele='" + ele + "'    data-id='" + outerRow + "' data-innerid='" + innerTableRow + "' data-innerTableid='" + innerTable_Row + "' data-save=\"inner\" class=\"btn btn-primary  pull-left\" onclick=\"saveAddAction($(this))\">Save</button>";
		html += "<button type=\"button\" data-dismiss=\"modal\" class=\"btn pull-right btnCancel\">Cancel</button>";
		$("#saveActionFooter").append(html);
		var actionDesc;
		var actionTag;
		startiLoaderSpiner();
		$('.container').css({'opacity': '0.3','z-index': '-1'});
		$('.modal-backdrop.fade.in').css({'z-index': '-1'});
		$("#addActionpopupWindow *").attr("disabled", "disabled").off('click');
		$.ajax({
			type: "POST",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			url: serverbaseUrl + Application.deshboardServices.getvalidationrulelist,
			success: function(response) {
				stopiLoaderSpiner();
				$('.container').css({'opacity': '1','z-index': '0'});
				$('.modal-backdrop.fade.in').css({'z-index': '0'});
				$("#addActionpopupWindow *").prop('disabled', false);
				$('label#actionRuleName').html('');
				$('label#actionRuleName').append(nameofrule);
				$('select#actionDesc').html('');
				$('label#actionTag').html('');
				$(response.resultSet.ruleActionList).each(function(index) {
					if (response.resultSet.ruleActionList[index].ruleActionId == actionID) {
						actionDesc = response.resultSet.ruleActionList[index].ruleActionDesc;
						actionTag = response.resultSet.ruleActionList[index].ruleActionTag;
						actionID_num = (response.resultSet.ruleActionList[index].ruleActionId);
					}
				});
				$('select#actionDesc').append('<option>' + actionDesc + '</option>');
				$('label#actionTag').append(actionTag);
				$(response.resultSet.ruleActionList).each(function(index) {
					if (response.resultSet.ruleActionList[index].ruleActionDesc == actionDesc) {

					} else {
						$('select#actionDesc').append('<option>' + response.resultSet.ruleActionList[index].ruleActionDesc + '</option>');
					}
				});
				var ruleActionDescVal = $('select#actionDesc option:selected').text();
				$('select#actionDesc').change(function() {
					ruleActionDescVal = $('select#actionDesc option:selected').text();
					addActionTag(response, ruleActionDescVal);
				});
			},
		});
    } else {
        var nameOfRule = $(clickedElement).attr("data-nameofRule");
        clickedRow = ($(clickedElement).attr("data-id"));
        var sect = ($(clickedElement).attr("data-sectID"));
        var step = ($(clickedElement).attr("data-stepID"));
        var ques = ($(clickedElement).attr("data-quesID"));
        var ele = ($(clickedElement).attr("data-eleID"));
        var rule = ($(clickedElement).attr("data-ruleID"));
        var withSpace = nameOfRule.replace(/,/g, " ");
        //actionDe = withSpace;
        document.getElementById('actionOP').value = "";
        document.getElementById('actionOpVal').value = "";
        document.getElementById('actionNoField').value = "";
        $('#addActionpopupWindow').modal();
        $("#saveActionFooter").empty();
        var html = "";
        html += "<button type=\"button\"   data-rule='" + rule + "'  data-sect='" + sect + "'   data-step='" + step + "'   data-ques='" + ques + "'   data-ele='" + ele + "'    data-id='" + clickedRow + "' class=\"btn btn-primary  pull-left\" onclick=\"saveAddAction($(this))\">Save</button>";
        html += "<button type=\"button\" data-dismiss=\"modal\" class=\"btn pull-right btnCancel\">Cancel</button>";
        $("#saveActionFooter").append(html);
        startiLoaderSpiner();
		$('.container').css({'opacity': '0.3','z-index': '-1'});
		$('.modal-backdrop.fade.in').css({'z-index': '-1'});
		$("#addActionpopupWindow *").attr("disabled", "disabled").off('click');
        $.ajax({
        	type: "POST",
        	dataType: "json",
        	contentType: "application/json; charset=utf-8",
        	url: serverbaseUrl + Application.deshboardServices.getvalidationrulelist,
        	success: function(response) {
        		stopiLoaderSpiner();
				$('.container').css({'opacity': '1','z-index': '0'});
				$('.modal-backdrop.fade.in').css({'z-index': '0'});
				$("#addActionpopupWindow *").prop('disabled', false);
        		$('label#actionRuleName').html('');
        		$('label#actionRuleName').append(withSpace);
        		$('select#actionDesc').html('');
        		$('label#actionTag').html('');
        		$('select#actionDesc').append('<option>Select a option</option');
        		$(response.resultSet.ruleActionList).each(function(index) {
        			$('select#actionDesc').append('<option>' + response.resultSet.ruleActionList[index].ruleActionDesc + '</option>');
        		});
        		var ruleActionDescVal = $('select#actionDesc option:selected').text();
        		$('select#actionDesc').change(function() {
        			ruleActionDescVal = $('select#actionDesc option:selected').text();
        			addActionTag(response, ruleActionDescVal);
        		});
        	},
        });
    }
}
function addActionTag(response, ruleActionDescVal) {
	desc = ruleActionDescVal;
	if(desc=="Select a option"){
		$('label#actionTag').html('');
		tag="";
	}else{
		$(response.resultSet.ruleActionList).each(function(index) {
			if (response.resultSet.ruleActionList[index].ruleActionDesc == ruleActionDescVal) {
				$('label#actionTag').html('');
				tag = (response.resultSet.ruleActionList[index].ruleActionTag);
				$('label#actionTag').append(response.resultSet.ruleActionList[index].ruleActionTag);
				actionID_num = (response.resultSet.ruleActionList[index].ruleActionId);
			} 
		});
	}
}