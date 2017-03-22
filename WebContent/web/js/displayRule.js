/*************Display Of Rules*********************/
var ele;
var element;
var ElementNo;
var validateFlag=0;
var validateFlag_=0;
var validateFlag1=0;
var validateFlagChk=0;
function showAddRules() {
	$('.addRulesLink , .settIcon').on("click",function(){
		var RuleObject=new Object();
		var textCountID=this.id;
		var sectID=$("#"+textCountID).attr("data-Sect");
		var order=$("#"+textCountID).attr("data-Order");
		var stepID=$("#"+textCountID).attr("data-Step");
		var quesID=$("#"+textCountID).attr("data-Ques");
		var eleID=$("#"+textCountID).attr("data-ele");
		RuleObject.textCountID=textCountID;
		RuleObject.sectID=sectID;
		RuleObject.stepID=stepID;
		RuleObject.quesID=quesID;
		RuleObject.eleID=eleID;
		RuleObject.order=order;
		rulePopUp(RuleObject);
	});
}
function rulePopUp(RuleObject) {
	var flagClick=0;
	var id=RuleObject.textCountID.split("_");
	var ruleno=id[1];
	var rule_id=1;
	$("#rulesPopup").modal();
	var htmlAddress = "";
	$("#ruleHeader").empty();
	htmlAddress+="<button type=\"button\" class=\"close\" data-dismiss=\"modal\">x</button>";
	htmlAddress+="<button type=\"button\" class=\"btn btn-primary btnAddRules pull-right\" id=\"ruleNum_" +ruleno +"\" data-sect='"+RuleObject.sectID+"' data-step='"+RuleObject.stepID+"' data-ques='"+RuleObject.quesID+"' data-ele='"+RuleObject.eleID+"' data-ruleOrder='"+RuleObject.order+"'>Add Rules</button>";
	$("#ruleHeader").append(htmlAddress);
	var htmlAddress1 = "";
	$("#footer_submit").empty();
	htmlAddress1 += "<button type=\"button\" class=\"btn btn-primary submitRules pull-left\"  id=\"ruleNum_" + ruleno + "\" data-sect='" + RuleObject.sectID + "' data-step='" + RuleObject.stepID + "' data-ques='" + RuleObject.quesID + "' data-ele='" + RuleObject.eleID + "'>Submit</button>";
	htmlAddress1 += "<button type=\"button\" data-dismiss=\"modal\" class=\"btn pull-right btnCancel\"  >Cancel</button>";
	$("#footer_submit").append(htmlAddress1);
	for(var i=0;i<ruleMainArr.length;i++){
		if(RuleObject.eleID==ruleMainArr[i].elementName){
			if(ruleno==ruleMainArr[i].ruleNumber){
				$("#tableId").empty();
				var html1="";			
				html1+="<table class=\"table table-bordered table-responsive table-striped\"  id=\"addRulesPopuTable" +ruleno +"\" style=\"border-collapse:collapse;\">";
				html1+="<thead><tr><th></th><th>ID</th><th>Rules Name</th><th>Formula</th><th>Formula Data</th><th colspan=\"3\">Action</th></tr></thead>";
				html1+="<tbody ></tbody></table>";
				$("#tableId").append(html1);
				for(var k=0;k<ruleMainArr[i].RuleArr.length;k++){
					flagClick=1;
					var withoutSpace=ruleMainArr[i].RuleArr[k].nameofRule.replace(/ /g, ",");
					var html="";	
					if(ruleMainArr[i].RuleArr[k].valueofFormula=='i<a'){
						var data=ruleMainArr[i].RuleArr[k].valueofFormula.split("<");
						var angle="&lt;";
						ruleMainArr[i].RuleArr[k].valueofFormula=(data[0]+angle+data[1]);
					}
					html+="<tr id=\"row_"+ruleMainArr[i].RuleArr[k].idRule+"_"+RuleObject.order +"\"  class=\"outerTable \"> ";
					html+="<td><i class=\"checkIDIcon icon-caret-right\" id=\"collapseIcon_"+ruleMainArr[i].RuleArr[k].idRule+"\"  data-sectID='"+RuleObject.sectID+"' data-stepID='"+ RuleObject.stepID+"' data-quesID='"+RuleObject.quesID+"' data-eleID='"+ RuleObject.eleID+"' data-ruleID='"+ruleno+"'></i></td>";
					html+="<td id=\"code"+ rule_id+"\" >"+ rule_id+"</td>";
					html+="<td id=\"code1_"+ ruleMainArr[i].RuleArr[k].idRule+"\" >"+ ruleMainArr[i].RuleArr[k].nameofRule+"</td>";html+="<td id=\"code2_"+ ruleMainArr[i].RuleArr[k].idRule+"\" >"+ ruleMainArr[i].RuleArr[k].valueofFormula+"</td>";
					html+="<td id=\"code3_"+ ruleMainArr[i].RuleArr[k].idRule+"\" >"+ ruleMainArr[i].RuleArr[k].formulaData+"</td>";
					html+="<td id=\"code4_"+ ruleMainArr[i].RuleArr[k].idRule+"\" class=\"code4\"><a href=\"#\"  data-nameofRule='"+withoutSpace+"' data-id='" +  ruleMainArr[i].RuleArr[k].idRule +"'' data-sectID='"+RuleObject.sectID+"' data-stepID='"+ RuleObject.stepID+"' data-quesID='"+RuleObject.quesID+"' data-eleID='"+ RuleObject.eleID+"' data-ruleID='"+ruleno+"' onclick=\"addActionPopup($(this))\">Add Action</a></td>";
					html+="<td ><i class=\"editIcon1 icon-edit\" data-editID='"+ ruleMainArr[i].RuleArr[k].idRule+"'  data-sectID='"+RuleObject.sectID+"' data-stepID='"+ RuleObject.stepID+"' data-quesID='"+  RuleObject.quesID+"' data-eleID='"+  RuleObject.eleID+"' data-ruleID='"+ruleno+"' id=\"edit_"+ ruleMainArr[i].RuleArr[k].idRule+"\"></i></td>";
					html+="<td><i class=\"trashIcon icon-trash\"  data-ruleOrder='"+RuleObject.order+"'  data-sectID='"+RuleObject.sectID+"' data-stepID='"+ RuleObject.stepID+"' data-quesID='"+  RuleObject.quesID+"' data-eleID='"+  RuleObject.eleID+"' data-ruleID='"+ruleno+"' id=\"trash_"+ ruleMainArr[i].RuleArr[k].idRule+ "_"+RuleObject.order+ "\" ></i></td>";
					html+="</tr>";
					html+="<tr id=\"report_"+ ruleMainArr[i].RuleArr[k].idRule+"_"+RuleObject.order +"\" ><td colspan=\"5\">";
					html+="<table class=\"innerTable\" id=\"innerTable_"+ ruleMainArr[i].RuleArr[k].idRule+"\" style=\"display:none;padding-left: 80px;\">";
					html+="<tr><th style=\"width:40px;\">ID</th><th>Action Desc</th><th  style=\"width:80px;\">Tag</th><th style=\"width:80px;\">Output </th><th style=\"width:80px;\"> Action Value</th><th style=\"width:80px;padding-left: 5px;\">No of fields</th><th style=\"width:100px;\">Action</th></tr>";
					html+="</table></td></tr>";
					$('#addRulesPopuTable'+ruleno ).append(html);	
					rule_id++;
				}
			}
		}
	}	
	if(flagClick==0){
		var html="";
		$("#tableId").empty();
		html+="<table class=\"table table-bordered table-responsive table-striped\"  id=\"addRulesPopuTable" +ruleno +"\" style=\"border-collapse:collapse;\">";
		html+="<thead><tr><th></th><th>ID</th><th>Rules Name</th><th>Formula</th><th>Formula Data</th><th colspan=\"3\">Action</th></tr></thead>";
		html+="<tbody ></tbody></table>";
		$("#tableId").append(html);
	}	
}
/*************Adding Rules********************/
$(document).on('click', '.btnAddRules', function() {
	editFlag=0;
	var ruleNum=this.id.replace('ruleNum_','');
	var sect=($("#"+this.id).attr("data-sect"));
	var step=($("#"+this.id).attr("data-step"));
	var quesNum=($("#"+this.id).attr("data-ques"));
	var eleName=($("#"+this.id).attr("data-ele"));
	var order=($("#"+this.id).attr("data-ruleOrder"));
	var ruleObj=new Object();
	ruleObj.ruleNum=ruleNum;
	ruleObj.sect=sect;
	ruleObj.step=step;
	ruleObj.quesNum=quesNum;
	ruleObj.eleName=eleName;
	ruleObj.order=order;
	addRules(ruleObj);
});

function addRules(ruleObj) {
	ele=ruleObj.eleName;
	element=ruleObj.ele;
	$("#addRulesPopup").modal();
	var serverbaseUrl = getServerPath();
	if(editFlag==1){
		ElementNo=ruleObj.rule;
		$("#saveAddRulesFooter").empty();
		var html1="";
		html1+="<button type=\"button\"  style=\"margin-left:35px;\"  id=\"saveRuleNum_" +ruleObj.rule +"\" data-sect='"+ruleObj.sect+"' data-step='"+ruleObj.step+"' data-ques='"+ruleObj.ques+"' data-ele='"+ruleObj.ele+"' data-ruleOrder='"+ruleObj.order+"' class=\"btn btn-primary saveAddRulesBtn pull-left\">Save</button>";
		html1+="<button type=\"button\" data-dismiss=\"modal\" style=\"margin-right:35px;\" class=\"btn pull-right btnCancel\">Cancel</button>";
		$("#saveAddRulesFooter").append(html1);
	}
	else{
		ElementNo=ruleObj.ruleNum;
		$("#saveAddRulesFooter").empty();
		var html1="";
		html1+="<button type=\"button\" style=\"margin-left:35px;\"  id=\"saveRuleNum_" +ruleObj.ruleNum +"\" data-sect='"+ruleObj.sect+"' data-step='"+ruleObj.step+"' data-ques='"+ruleObj.quesNum+"' data-ele='"+ruleObj.eleName+"' data-ruleOrder='"+ruleObj.order+"' class=\"btn btn-primary saveAddRulesBtn pull-left\">Save</button>";
		html1+="<button type=\"button\" data-dismiss=\"modal\"  style=\"margin-right:35px;\"  class=\"btn pull-right btnCancel\">Cancel</button>";
		$("#saveAddRulesFooter").append(html1);
	}
	startiLoaderSpiner();
	$('.container').css({'opacity': '0.3','z-index': '-1'});
	$('.modal-backdrop.fade.in').css({'z-index': '-1'});
	$("#addRulesPopup *").attr("disabled", "disabled").off('click');
	$.ajax({
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		url: serverbaseUrl + Application.deshboardServices.getvalidationrulelist,
		success: function(response) {
			stopiLoaderSpiner();
			$('.container').css({'opacity': '1','z-index': '0'});
			$('.modal-backdrop.fade.in').css({'z-index': '0'});
			$("#addRulesPopup *").prop('disabled', false);
			$('#rulesCategoryDD').html('');
			$("#rulesNameDD").html('');
			$('#rulesDesc').html('');
			$('#rulesFormula').html('');
			if(editFlag==1){
				var html="";
				var rule_name=ruleObj.rule_name;
				html+="<option value='"+rule_name + "' >"+rule_name+"</option>";
				$("#rulesNameDD").append(html);
				$('#rulesDesc').html('');
				$('#rulesFormulaData').html('');
				$('#rulesCategoryDD').html('');
				$('#rulesCategoryDD').append('<option>Data Centric</option>');
				$(response.resultSet.validationRuleList).each(function(index){
					if (response.resultSet.validationRuleList[index].ruleCategory  == "Data Centric"){
						if(response.resultSet.validationRuleList[index].ruleName==rule_name){
							ID_num=(response.resultSet.validationRuleList[index].ruleId);
						}
						else{
							$('#rulesNameDD').append('<option>'+response.resultSet.validationRuleList[index].ruleName+'</option>');

						}
					}
					if(response.resultSet.validationRuleList[index].ruleName == rule_name){
						$('#rulesDesc').append(response.resultSet.validationRuleList[index].ruleDescription);
						if(response.resultSet.validationRuleList[index].ruleFormula=='i<a'){
							var data=response.resultSet.validationRuleList[index].ruleFormula.split("<");
							var angle="&lt;";
							$('#rulesFormula').append(data[0]+angle+data[1]);
						}
						else{
							$('#rulesFormula').append(response.resultSet.validationRuleList[index].ruleFormula);
						}
					}
				});	
				if(rule_name=="Single Range less then"){
					$('#rulesFormulaData').append("i<"+"<input type=\"number\"  id=\"var1\" style=\"width:8%;\" >");
					$('#var1').val(ruleObj.val_form);
					validateFlag1=1;
				}
				if(rule_name=="Single Range greater then"){
					$('#rulesFormulaData').append("i>"+"<input type=\"number\"  id=\"var1\" style=\"width:8%;\">");
					$('#var1').val(ruleObj.val_form);
					validateFlag1=1;
				}
				if(rule_name=="Multiple_Range_logical_And-i>a&&i<=b"){
					$('#rulesFormulaData').append("i>"+"<input type=\"number\"  id=\"var1\" style=\"width:8%;\">"+"&& i<="+"<input type=\"number\"  id=\"var2\" style=\"width:8%;\">");
					$('#var1').val(ruleObj.val_form);
					$('#var2').val(ruleObj.val_form1);
					validateFlag1=1;
				}
				if(rule_name=="Multiple Range a<= I <= b"){
					$('#rulesFormulaData').append("<input type=\"number\"  id=\"var1\" style=\"width:8%;\"> <= I <= <input type=\"number\"  id=\"var2\" style=\"width:8%;\">");
					$('#var1').val(ruleObj.val_form);
					$('#var2').val(ruleObj.val_form1);
					validateFlag1=1;
				}
				if( rule_name=="Validate selected value for Not Ok" ||  rule_name=="Validate selected value for Ok"){
					validateFlag=1;
					$('div#rulesFormulaData').append("I!=" + "<select  id=\"select_id\" style=\"width:20%;\"></select>");
					var html="";
					html += "<option value='" + ruleObj.val_form + "' >" + ruleObj.val_form + "</option>";
					$("select#select_id").append(html);
					var drp_array="";
					drp_array=DropDownruleValuePopulate(dropDownJsonArr,drp_array);
					$(drp_array).each(function(index) {
						if(drp_array[index].trim()==ruleObj.val_form){
						}
						else{
							$('select#select_id').append('<option>' + drp_array[index]+ '</option>');
						}
					});
				}
				if(rule_name=="Validate radio button value for NO" ||rule_name=="Validate Radio Button value for YES"){
					//validateFlag_=1;
					$('div#rulesFormulaData').append("I="+ "<select  id=\"select_id_radio\" style=\"width:20%;\"></select>");
					var html="";
					html += "<option id=\"radioChoice_"+ruleObj.choiceId + "\" value='" + ruleObj.val_form + "' >" + ruleObj.val_form + "</option>";
					$("select#select_id_radio").append(html);
					for(var i=0;i<radioButtonJsonArr.length;i++){
						if(radioButtonJsonArr[i].radioBntNum==ElementNo){
							for(var m=0;m<radioButtonJsonArr[i].radioValueArr.length;m++){
								if(radioButtonJsonArr[i].radioValueArr[m].value.replace(/^\s+|\s+$/g, "").length!=0 && radioButtonJsonArr[i].radioValueArr[m].value!=ruleObj.val_form ){
									$('select#select_id_radio').append("<option id=\"radioChoice_"+radioButtonJsonArr[i].radioValueArr[m].order+ "\">"+ radioButtonJsonArr[i].radioValueArr[m].value+ "</option>");
								}
							}
							
						}
					}
					//$('#rulesFormulaData').append("<input type=\"text\"  value='" + ruleObj.val_form  + "' id=\"var1\" readonly style=\"width:20%;\" ></input>");
				}
				if(rule_name=="Validate Checkbox Value for equal" || rule_name=="Validate Checkbox Value for not equal"){
				//	if(element=="anscheckBox"){
						//validateFlagChk=1;
						//$('#rulesFormulaData').append("<input type=\"text\"  value='" + ruleObj.val_form  + "' id=\"var1\" readonly style=\"width:20%;\" ></input>");
					//}
					$('div#rulesFormulaData').append("I="+ "<select  id=\"select_id_checkbox\" style=\"width:20%;\"></select>");
					var html="";
					html += "<option id=\"checkboxChoice_"+ruleObj.choiceId + "\" value='" + ruleObj.val_form + "' >" + ruleObj.val_form + "</option>";
					$("select#select_id_checkbox").append(html);
					for(var i=0;i<checkBoxJsonArr.length;i++){
						if(checkBoxJsonArr[i].checkBoxNum==ElementNo){
							for(var m=0;m<checkBoxJsonArr[i].checkValueArr.length;m++){
								if(checkBoxJsonArr[i].checkValueArr[m].value.replace(/^\s+|\s+$/g, "").length!=0 && checkBoxJsonArr[i].checkValueArr[m].value!=ruleObj.val_form ){
									$('select#select_id_checkbox').append("<option id=\"checkboxChoice_"+checkBoxJsonArr[i].checkValueArr[m].order+ "\">"+ checkBoxJsonArr[i].checkValueArr[m].value+ "</option>");
								}
							}
							
						}
					}
				}
				if(rule_name=="Multiple Range"){
					$('#rulesFormulaData').append("<input type=\"number\"  id=\"var1\" style=\"width:8%;\">"+"<= I =>"+"<input type=\"number\"  id=\"var2\" style=\"width:8%;\">");
					$('#var1').val(ruleObj.val_form);
					$('#var2').val(ruleObj.val_form1);
					validateFlag1=1;
				}
				if(rule_name=="Multiple Range logical And"){
					$('#rulesFormulaData').append("<input type=\"number\"  id=\"var1\" style=\"width:8%;\"> < I  > <input type=\"number\"  id=\"var2\" style=\"width:8%;\"> && <input type=\"number\"  id=\"var3\" style=\"width:8%;\"> < I > <input type=\"number\"  id=\"var4\" style=\"width:8%;\">");					
					$('#var1').val(ruleObj.val_form);
					$('#var2').val(ruleObj.val_form1);
					$('#var3').val(ruleObj.val_form2);
					$('#var4').val(ruleObj.val_form3);
					validateFlag1=1;
				}
			}
			else{
				$('#rulesCategoryDD').append('<option>'+"Data Centric"+'</option>');
				$(response.resultSet.validationRuleList).each(function(index){
					if (response.resultSet.validationRuleList[index].ruleCategory == "Data Centric"){
						$('#rulesNameDD').append('<option>'+response.resultSet.validationRuleList[index].ruleName+'</option>');
					}
				});	
				var ruleCategoryVal = $('#rulesCategoryDD option:selected').text();
				var rulesNameVal = $('#rulesNameDD option:selected').text();
				addRileDecForm(response,ruleCategoryVal,rulesNameVal);
				$('#rulesNameDD').change(function(){
					rulesNameVal = $('#rulesNameDD option:selected').text();
					addRileDecForm(response,ruleCategoryVal,rulesNameVal);
				});	
			}		
		},
		error:function(){
			stopiLoaderSpiner();
			$('.container').css({'opacity': '1','z-index': '0'});
			$('.modal-backdrop.fade.in').css({'z-index': '0'});
			$("#addRulesPopup *").prop('disabled', false);
		},
		Complete:function(){
		},                         
	});	   
}

function addRileDecForm(response,ruleCategoryVal,rulesNameVal){
	$('#rulesDesc , #rulesFormula,#rulesFormulaData').html('');
	$(response.resultSet.validationRuleList).each(function(index){
		if (response.resultSet.validationRuleList[index].ruleName == rulesNameVal){
			$('#rulesDesc').css("width","67%");
			$('#rulesDesc').append(response.resultSet.validationRuleList[index].ruleDescription);
			var formula_Data=response.resultSet.validationRuleList[index].ruleFormula;
			if(formula_Data=='i<a'){
				var data=formula_Data.split("<");
				var angle="&lt;";
				$('#rulesFormula').append(data[0]+angle+data[1]);
			}
			else{
				$('#rulesFormula').html(''); 
				$('#rulesFormula').append(formula_Data);
			}
			ID_num=(response.resultSet.validationRuleList[index].ruleId);
		}
	});
	if(rulesNameVal=="Single Range less then"){
		$('#rulesFormulaData').append("i<"+"<input type=\"number\"  id=\"var1\" style=\"width:8%;\">");
	}
	if(rulesNameVal=="Single Range greater then"){
		$('#rulesFormulaData').append("i>"+"<input type=\"number\"  id=\"var1\" style=\"width:8%;\">");
	}
	if(rulesNameVal=="Multiple_Range_logical_And-i>a&&i<=b"){
		$('#rulesFormulaData').append("i>"+"<input type=\"number\"  id=\"var1\" style=\"width:8%;\">"+"&& i<="+"<input type=\"number\"  id=\"var2\" style=\"width:8%;\">");
	}
	if(rulesNameVal=="Multiple Range a<= I <= b"){
		$('#rulesFormulaData').append("<input type=\"number\"  id=\"var1\" style=\"width:8%;\"> <= I <= <input type=\"number\"  id=\"var2\" style=\"width:8%;\">");
	}
	if( rulesNameVal=="Validate selected value for Not Ok" ||rulesNameVal=="Validate selected value for Ok"){
		var drp_array="";
		drp_array=DropDownruleValuePopulate(dropDownJsonArr,drp_array);
		$('div#rulesFormulaData').append("I!=" + "<select  id=\"select_id\" style=\"width:20%;\"></select>");
		$(drp_array).each(function(index) {
			$('select#select_id').append('<option>' + drp_array[index]+ '</option>');
		});
	}
	if(rulesNameVal=="Validate radio button value for NO" ||rulesNameVal=="Validate Radio Button value for YES"){
		//var radValue="";
		$('div#rulesFormulaData').append("I!="+ "<select  id=\"select_id_radio\" style=\"width:20%;\"></select>");
		for(var i=0;i<radioButtonJsonArr.length;i++){
			if(radioButtonJsonArr[i].radioBntNum==ElementNo){
				for(var m=0;m<radioButtonJsonArr[i].radioValueArr.length;m++){
					if(radioButtonJsonArr[i].radioValueArr[m].value!="" && radioButtonJsonArr[i].radioValueArr[m].value.replace(/^\s+|\s+$/g, "").length!=0){
						$('select#select_id_radio').append("<option id=\"radioChoice_"+radioButtonJsonArr[i].radioValueArr[m].order+ "\">"+ radioButtonJsonArr[i].radioValueArr[m].value+ "</option>");
					}
				}
				
			}
		}
		//radValue=populateradioButtonRuleValue(radioButtonJsonArr,radValue,ElementNo);
		//$('#rulesFormulaData').append("<input type=\"text\"  value='" + radValue + "' id=\"var1\" readonly style=\"width:20%;\" ></input>");

	}
	if(rulesNameVal=="Validate Checkbox Value for equal" ||rulesNameVal=="Validate Checkbox Value for not equal"){
		//if(ele=="anscheckBox" || element=="anscheckBox"){
			/*var chkValue="";
			chkValue=populateCheckBoxRuleValue(checkBoxJsonArr,chkValue,ElementNo);
			$('#rulesFormulaData').append("<input type=\"text\"  value='" + chkValue + "' id=\"var1\" readonly style=\"width:20%;\" ></input>");
*/
		//}
		$('div#rulesFormulaData').append("I!="+ "<select  id=\"select_id_checkbox\" style=\"width:20%;\"></select>");
		for(var i=0;i<checkBoxJsonArr.length;i++){
			if(checkBoxJsonArr[i].checkBoxNum==ElementNo){
				for(var m=0;m<checkBoxJsonArr[i].checkValueArr.length;m++){
					if(checkBoxJsonArr[i].checkValueArr[m].value!="" && checkBoxJsonArr[i].checkValueArr[m].value.replace(/^\s+|\s+$/g, "").length!=0){
						$('select#select_id_checkbox').append("<option id=\"checkboxChoice_"+checkBoxJsonArr[i].checkValueArr[m].order+ "\">"+ checkBoxJsonArr[i].checkValueArr[m].value+ "</option>");
					}
				}
				
			}
		}
	}
	if( rulesNameVal=="Multiple Range"){
		$('#rulesFormulaData').append("<input type=\"number\"  id=\"var1\" style=\"width:8%;\">"+"<= I =>"+"<input type=\"number\"  id=\"var2\" style=\"width:8%;\">");
	}
	if( rulesNameVal=="Multiple Range logical And"){
		$('#rulesFormulaData').append("<input type=\"number\"  id=\"var1\" style=\"width:8%;\"> < I  > <input type=\"number\"  id=\"var2\" style=\"width:8%;\"> && <input type=\"number\"  id=\"var3\" style=\"width:8%;\"> < I > <input type=\"number\"  id=\"var4\" style=\"width:8%;\">");
	}
}
function DropDownruleValuePopulate(dropDownJsonArr,drp_array){
	for (var i = 0; i < dropDownJsonArr.length; i++) {
		if(dropDownJsonArr[i].dropDownNum==ElementNo){
			for (var k = 0; k < dropDownJsonArr[i].dropDownPropArr.length; k++) {
				if (dropDownJsonArr[i].dropDownPropArr[k].name == "Value") {
					drp_array = dropDownJsonArr[i].dropDownPropArr[k].value.split("|");
				}
			}
		}
	}
	return drp_array;
}
function populateradioButtonRuleValue(radioButtonJsonArr,radValue,ElementNo){
	for (var i = 0; i < radioButtonJsonArr.length; i++) {
		if (radioButtonJsonArr[i].radioBntNum == ElementNo) {
			for (var k = 0; k < radioButtonJsonArr[i].radioPropArr.length; k++) {
				if (radioButtonJsonArr[i].radioPropArr[k].name == "Value") {
					radValue = radioButtonJsonArr[i].radioPropArr[k].value;
				}
			}
		}
	}
	return radValue;
}
function populateCheckBoxRuleValue(checkBoxJsonArr,chkValue,ElementNo){
	for (var i = 0; i < checkBoxJsonArr.length; i++) {
		if (checkBoxJsonArr[i].checkBoxNum == ElementNo) {
			for (var k = 0; k < checkBoxJsonArr[i].checkBoxPropArr.length; k++) {
				if (checkBoxJsonArr[i].checkBoxPropArr[k].name == "Value") {
					chkValue = checkBoxJsonArr[i].checkBoxPropArr[k].value;
				}
			}
		}
	}
	return chkValue;
}