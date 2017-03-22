/*************Loading Question Elements at time of Edit*********************/
var quesText = 0;
var addIm=0;
var addImage_Count=new Array();
var addImageCount_=0;
var addImageJsonArr = new Array();
function loadQuesElement(questionElement, quesSection, stepID, sectID, quesID, indicator, count ,ansId,stepCount,sectCount,ansIDCount,quesCount) {
	var quesName = questionElement.questionTitle;
	var questionInputElement = questionElement.questionInputElement;
	for (var i = 0; i < questionInputElement.length; i++) {	
		//var count = i + 1;		
		$("#firstQues_"+sectID+'_'+stepID+'_'+quesID).append(getQuestionElementControls(questionInputElement[i].elementName,quesID,quesName, stepID, sectID));

	}
}
function getQuestionElementControls(elementName, quesID,quesName, stepID, sectID) {
	if (elementName === 'Text Area') {
		quesText++;
		return '<table id="quesTextarea">'+
		'<tr>'+
		'<td>'+
		'<textarea id="quesTextarea1'+quesText+'"  class="quesTextarea" style="overflow: auto;width:500px; padding:5px; margin-top:4px; margin-bottom:5px; font-family:Verdana, Arial, Helvetica, sans-serif; font-size:12px; border:#d9d9d9 solid 1px;color: #999;">'+
		quesName +
		'</textarea>'+
		'</td>'+
		'</tr>'+
		'</table>';
	} else {
		addIm++;
		addimCountArr.push(addIm);
		addImage_Count.push(addIm);
		return '<div class="addImgMainDiv"   ><div class="addImgDiv"   id="quesAddImageMainDiv_'+addIm+'" >'+
		'<div class="quesAddImgSect" id="quesAddImageMainDiv">'+
		'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/add-image.png">'+
		'<p style="padding-right: 230px; padding-top: 2px;">Add Image</p>'+
		'<span class="qs" style="float: right;margin-top: -33px;margin-right:5px;"><img src="images/settings.png"/>'+
		'<span class="popover above" style="height:60px;margin-top:-71px;">'+
		'<img src="images/delete_2.png"  class="imgWidgetDel" id="addImageCount1_' + addIm + '" data-ele="quesAddImageMainDiv" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px" class="imgWidgetDel" id="addImageCount1_' + addIm + '" data-ele="quesAddImageMainDiv" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
		'</div>'+
		'<button id="img_input_' + addIm + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  class="img_input" style=" width: 120px;border: 1px solid  #d0d4dc;margin-top: 5px;margin-left: 10px;height: 25px;float:left;  background-color: #575757;color: #979797;  border-radius: 5px;">Add Image</button>'+
		//'<img src="images/add_property.png" style="margin-left: 165px;margin-top: 10px;"  draggable="false" class="AIAddProperties"  id="' + ids1 + '"  data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
		'</div><input type="file"  id="file1_'+addIm+'"  name="file1" style="display:none;" /><div  id="addImagesDynamic_'+addIm+'" class="addImagesDynamic"></div>'+
		'</div>';
	}
}
/*************Loading Answer Elements at time of Edit*********************/
var textboxCount_=0;
var checkboxCount_=0;
var btnCount_=0;
var datePickerCount_=0;
var dropDownCount_=0;
var textAreaCount_=0;
var radioCount_=0;
var labelCount_=0;
var imageUploadCount_=0;
var sigCount_=0;
var textArea_Count=new Array();
var dropDown_Count=new Array();
var datePicker_Count=new Array();
var btn_Count=new Array();
var chk_Count=new Array();
var textbox_Count=new Array();
var sig_Count=new Array();
var guideImg_Count=new Array();
var label_Count=new Array();
var imageUpload_Count=new Array();
var radio_Count=new Array();
var textBoxCount = 0;
var checkBoxCount = 0;
var buttonCount = 0;
var datePickerCount = 0;
var dropDownCount = 0;
var textAreacount = 0;
var radioButton  = 0;
var labelCount = 0;
var signatureCount = 0;
var imageUploadCount = 0;
var ruleOrder=0;
function loadAnsElement(answerElement, ansSection, stepID, sectID, questId, indicator, count, ansId,stepCount,sectCount,ansIDCount,quesCount) {
	var section=sectCount;
	var step=stepCount;
	var ques=quesCount;
	section++;
	step++;
	var answerInputElement = answerElement.answerInputElement;
	for (var i = 0; i < answerInputElement.length; i++) {	
		$("#firstAns_"+sectID+'_'+stepID+'_'+ansId).append(getFormElementControls(answerInputElement[i].elementName,stepID, sectID, questId, indicator, count,ansId,stepCount,sectCount,ansIDCount));
		if (answerInputElement[i].elementName === 'Textbox') {	
			textboxCount_++;
			editTextBoxProperties(answerInputElement[i].elementAttribute, stepID, sectID, questId, indicator, count,textboxCount_, 'edit');
			editTextBoxProperties(answerInputElement[i].elementAttribute, stepID, sectID, questId, indicator, count,textboxCount_, 'add');
			editTextBoxProperties(answerInputElement[i].elementAttribute, stepID, sectID, questId, indicator, count,textboxCount_, 'edit1');
			editRulesAndAction(answerInputElement[i].validations, stepID, sectID, questId, ansId, 'textBox', textboxCount_,'9');
		} else if (answerInputElement[i].elementName === 'Checkbox') {
			checkboxCount_++;
			editCheckAddProperties(answerInputElement[i].elementAttribute, stepID, sectID, questId, indicator, count,checkboxCount_, 'edit');
			editCheckAddProperties(answerInputElement[i].elementAttribute, stepID, sectID, questId, indicator, count,checkboxCount_, 'add');
			editCheckAddProperties(answerInputElement[i].elementAttribute, stepID, sectID, questId, indicator, count,checkboxCount_, 'edit1');
			editRulesAndAction(answerInputElement[i].validations, stepID, sectID, questId, ansId, 'anscheckBox', checkboxCount_,'8');
		} else if (answerInputElement[i].elementName === 'Button') {
			btnCount_++;
			editBtnAddProperties(answerInputElement[i].elementAttribute, stepID, sectID, questId, indicator, count,btnCount_, 'edit');
			editBtnAddProperties(answerInputElement[i].elementAttribute, stepID, sectID, questId, indicator, count,btnCount_, 'add');
			editBtnAddProperties(answerInputElement[i].elementAttribute, stepID, sectID, questId, indicator, count,btnCount_, 'edit1');
			editRulesAndAction(answerInputElement[i].validations, stepID, sectID, questId, ansId, 'ansBtn', btnCount_,'11');
		} else if (answerInputElement[i].elementName === 'Date Picker' ||answerInputElement[i].elementName =="Date") {
			datePickerCount_++;
			editDPAddProperties(answerInputElement[i].elementAttribute, stepID, sectID, questId, indicator, count,datePickerCount_, 'edit');
			editDPAddProperties(answerInputElement[i].elementAttribute, stepID, sectID, questId, indicator, count,datePickerCount_, 'add');
			editDPAddProperties(answerInputElement[i].elementAttribute, stepID, sectID, questId, indicator, count,datePickerCount_, 'edit1');
			editRulesAndAction(answerInputElement[i].validations, stepID, sectID, questId, ansId, 'ansDate', datePickerCount_,'14');
		} else if (answerInputElement[i].elementName === 'Drop Down') {
			dropDownCount_++;
			editDDAddProperties(answerInputElement[i].elementAttribute, stepID, sectID, questId, indicator, count,ansId,dropDownCount_ ,'edit');
			editDDAddProperties(answerInputElement[i].elementAttribute, stepID, sectID, questId, indicator, count,ansId,dropDownCount_, 'add');
			editDDAddProperties(answerInputElement[i].elementAttribute, stepID, sectID, questId, indicator, count,ansId,dropDownCount_ ,'edit1');
			editRulesAndAction(answerInputElement[i].validations, stepID, sectID, questId, ansId,'ansDrpDown', dropDownCount_,'10');
		} else if (answerInputElement[i].elementName === 'Text Area') {
			textAreaCount_++;
			editTAAddProperties(answerInputElement[i].elementAttribute, stepID, sectID, questId, indicator, count, ansId,section,step,ques,textAreaCount_, 'edit');
			editTAAddProperties(answerInputElement[i].elementAttribute, stepID, sectID, questId, indicator, count, ansId,section,step,ques, textAreaCount_,'add');
			editTAAddProperties(answerInputElement[i].elementAttribute, stepID, sectID, questId, indicator, count, ansId,section,step,ques,textAreaCount_, 'edit1');
			editRulesAndAction(answerInputElement[i].validations, stepID, sectID, questId, ansId, 'txtAreaAns', textAreaCount_,'5');
		} else if (answerInputElement[i].elementName === 'Radio Button') {
			radioCount_++;
			editRadAddProperties(answerInputElement[i].elementAttribute, stepID, sectID, questId, indicator, count,radioCount_, 'edit');
			editRadAddProperties(answerInputElement[i].elementAttribute, stepID, sectID, questId, indicator, count,radioCount_, 'add');
			editRadAddProperties(answerInputElement[i].elementAttribute, stepID, sectID, questId, indicator, count,radioCount_, 'edit1');
			editRulesAndAction(answerInputElement[i].validations, stepID, sectID, questId, ansId, 'ansRadioBtn', radioCount_,'3');
		} else if (answerInputElement[i].elementName === 'Label') {
			labelCount_++;
			editLabelProperties(answerInputElement[i].elementAttribute, stepID, sectID, questId, indicator, count,labelCount_, 'edit');
			editLabelProperties(answerInputElement[i].elementAttribute, stepID, sectID, questId, indicator, count, labelCount_,'add');
			editLabelProperties(answerInputElement[i].elementAttribute, stepID, sectID, questId, indicator, count,labelCount_, 'edit1');
			editRulesAndAction(answerInputElement[i].validations, stepID, sectID, questId, ansId, 'label', labelCount_,'7');
		} else if (answerInputElement[i].elementName === 'Signature') {
			sigCount_++;
			editSignatureProperties(answerInputElement[i].elementAttribute, stepID, sectID, questId, indicator, count,sigCount_, 'edit');
			editSignatureProperties(answerInputElement[i].elementAttribute, stepID, sectID, questId, indicator, count,sigCount_, 'add');
			editSignatureProperties(answerInputElement[i].elementAttribute, stepID, sectID, questId, indicator, count,sigCount_, 'edit1');
			editRulesAndAction(answerInputElement[i].validations, stepID, sectID, questId, ansId, 'ansSignature', sigCount_,'12');
		} else if (answerInputElement[i].elementName === 'Image Upload') {
			imageUploadCount_++;
			editIUAddProperties(answerInputElement[i].elementAttribute,stepID, sectID, questId, indicator, count,imageUploadCount_,'edit');
			editIUAddProperties(answerInputElement[i].elementAttribute,stepID, sectID, questId, indicator, count,imageUploadCount_,'add');
			editIUAddProperties(answerInputElement[i].elementAttribute,stepID, sectID, questId, indicator, count,imageUploadCount_,'edit1');
			editRulesAndAction(answerInputElement[i].validations, stepID, sectID, questId, ansId, 'ansImgUploadMainDiv', imageUploadCount_,'4');
		}		
		showAddRules();		
	}
}
function getFormElementControls(name, stepID, sectID, quesID, indicator, count,ansId,stepCount,sectCount,ansIDCount) {
	sectCount++;
	stepCount++;
	if (name === 'Textbox') {
		ruleOrder++;
		textBoxCount++;
		textBoxCountArr.push(textBoxCount);
		textbox_Count.push(textBoxCount);
		var ids = 'edittextBoxCount_' + sectID + '_' + stepID + '_' + quesID + '_' + textBoxCount;
		var ids1 = 'addtextBoxCount_' + sectID + '_' + stepID + '_' + quesID + '_' + textBoxCount;
		var ids2 = 'edit1textBoxCount_' + sectID + '_' + stepID + '_' + quesID + '_' + textBoxCount;
		return '<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
		'<div class="txtAreaAns" id="textBox_'+textBoxCount+ '" draggable="true" ondragstart="drag(event,1)">'+
		'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
		'<div class="ansTxtAreaSect">'+
		'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/text-box.png">'+
		'<p style="padding-right: 210px; padding-top: 2px;">Text box</p>'+
		'<span class="qs" style="float: right;margin-top: -33px;margin-right:5px;"><img src="images/settings.png"/>'+
		'<span class="popover above" style="height:110px;margin-top:-120px;">'+
		'<img src="images/duplicate.png" class="duplicateTextBox" id="textBoxCount_' + textBoxCount + '"   data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" /><span style="  color: #908796;padding-left: 5px" class="duplicateTextBox" id="textBoxCount_' + textBoxCount + '"   data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Duplicate</span><br>'+
		'<img src="images/delete_2.png"  class="widgetDel" id="textBoxCount1_' + textBoxCount + '"  data-ele="textBox" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px" class="widgetDel" id="textBoxCount1_' + textBoxCount + '"  data-ele="textBox" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
		'<img src="images/edit_property.png"/  id="' + ids + '"  data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px" class="editIconTextBox"  id="' + ids2 + '"  data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" >Edit Property</span><br>'+
		'<img src="images/edit_rule.png"/ class="settIcon" id="textBoxCount12_' + textBoxCount + '"  data-Order="' + ruleOrder + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="textBox"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="textBoxCount12_' + textBoxCount + '"  data-Order="' + ruleOrder + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="textBox">Edit Rule</span></span></span>'+
		'</div>'+
		'<input  type="text" style=" width: 60%;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
		'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false" id="' + ids1 + '"  data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
		'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="textBoxCount12_' + textBoxCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  data-Order="' + ruleOrder + '" data-ele="textBox"  draggable="false"/>'+
		'</div></div> ';
	} else if (name === 'Checkbox') {
		ruleOrder++;
		checkBoxCount++;
		checkCountArr.push(checkBoxCount);
		chk_Count.push(checkBoxCount);
		var ids = 'editcheckBoxCount_' + sectID + '_' + stepID + '_' + quesID + '_' + checkBoxCount;
		var ids1 = 'addcheckBoxCount_' + sectID + '_' + stepID + '_' + quesID + '_' + checkBoxCount;
		var ids2 = 'edit1checkBoxCount_' + sectID + '_' + stepID + '_' + quesID + '_' + checkBoxCount;
		return '<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
		'<div class="txtAreaAns" id="anscheckBox_'+checkBoxCount+ '" draggable="true" ondragstart="drag(event,1)">'+
		'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
		'<div class="ansTxtAreaSect">'+
		'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/checkbox.png">'+
		'<p style="padding-right: 210px; padding-top: 2px;">Checkbox</p>'+
		'<span class="qs" style="float: right;margin-top: -33px;margin-right:5px;"><img src="images/settings.png"/>'+
		'<span class="popover above" style="height:110px;margin-top:-120px;">'+
		'<img src="images/duplicate.png" class="duplicateCheckBox" id="checkBoxCount_' + checkBoxCount + '"   data-ansQues="' + ansIDCount + '" data-sectCount="'+sectCount +'" data-stepCount="'+stepCount +'" data-quesCount="'+count +'" data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" /><span style="  color: #908796;padding-left: 5px" class="duplicateCheckBox" id="checkBoxCount_' + checkBoxCount + '"   data-ansQues="' + ansIDCount + '" data-sectCount="'+sectCount +'" data-stepCount="'+stepCount +'" data-quesCount="'+count +'" data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Duplicate</span><br>'+
		'<img src="images/delete_2.png"  class="widgetDel" id="checkBoxCount1_' + checkBoxCount + '"  data-ele="anscheckBox" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px" class="widgetDel" id="checkBoxCount1_' + checkBoxCount + '"  data-ele="anscheckBox" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
		'<img src="images/edit_property.png"/  id="' + ids + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px" class="editIconCheckBox" id="' + ids2 + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Edit Property</span><br>'+
		'<img src="images/edit_rule.png"/ class="settIcon" id="checkBoxCount12_' + checkBoxCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '" data-ele="anscheckBox"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="checkBoxCount12_' + checkBoxCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '" data-ele="anscheckBox">Edit Rule</span></span></span>'+
		'</div>'+
		'<input  type="checkbox" name="checkbox_" style=" width: 60%;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
		'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false" id="' + ids1 + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
		'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="checkBoxCount12_' + checkBoxCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '" data-ele="anscheckBox"  draggable="false"/>'+
		'</div></div> ';
	} else if (name == 'Date Picker' || name=="Date") {
		ruleOrder++;
		datePickerCount++;
		dateCountArr.push(datePickerCount);
		datePicker_Count.push(datePickerCount);
		var ids = 'editdatePickerCount_' + sectID + '_' + stepID + '_' + quesID + '_' + datePickerCount;
		var ids1 = 'adddatePickerCount_' + sectID + '_' + stepID + '_' + quesID + '_' + datePickerCount;
		var ids2 = 'edit1datePickerCount_' + sectID + '_' + stepID + '_' + quesID + '_' + datePickerCount;
		return '<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
		'<div class="txtAreaAns" id="ansDate_'+datePickerCount+ '" draggable="true" ondragstart="drag(event,1)">'+
		'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
		'<div class="ansTxtAreaSect">'+
		'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/date-picker.png">'+
		'<p style="padding-right: 210px; padding-top: 2px;">Date Picker</p>'+
		'<span class="qs" style="float: right;margin-top: -33px;margin-right:5px;"><img src="images/settings.png"/>'+
		'<span class="popover above" style="height:110px;margin-top:-120px;">'+
		'<img src="images/duplicate.png" class="duplicateDatePicker" id="datePickerCount_' + datePickerCount + '" data-ansQues="' + ansIDCount + '" data-sectCount="'+sectCount +'" data-stepCount="'+stepCount +'" data-quesCount="'+count +'" data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" /><span style="  color: #908796;padding-left: 5px" class="duplicateDatePicker" id="datePickerCount_' + datePickerCount + '"data-ansQues="' + ansIDCount + '" data-sectCount="'+sectCount +'" data-stepCount="'+stepCount +'" data-quesCount="'+count +'" data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Duplicate</span><br>'+
		'<img src="images/delete_2.png"  class="widgetDel" id="datePickerCount1_' + datePickerCount + '"  data-ele="ansDate" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px"  class="widgetDel" id="datePickerCount1_' + datePickerCount + '"  data-ele="ansDate" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
		'<img src="images/edit_property.png"/  id="'+ids+'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px" class="editIconDatePicker"   id="'+ids2+'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" >Edit Property</span><br>'+
		'<img src="images/edit_rule.png"/ class="settIcon" id="datePickerCount12_' + datePickerCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '" data-ele="ansDate"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="datePickerCount12_' + datePickerCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '" data-ele="ansDate">Edit Rule</span></span></span>'+
		'</div>'+
		'<input  type="date" class="datepicker" id="date_'+datePickerCount+ '" style=" width: 60%;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
		'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false"  id="'+ids1+'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
		'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="datePickerCount12_' + datePickerCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '" data-ele="ansDate"  draggable="false"/>'+
		'</div></div> ';
	} else if (name === 'Drop Down') {
		ruleOrder++;
		dropDownCount++;
		dropCountArr.push(dropDownCount);
		dropDown_Count.push(dropDownCount);
		var ids = 'editdropDownCount_' + sectID + '_' + stepID + '_' + quesID + '_' + dropDownCount;
		var ids1 = 'adddropDownCount_' + sectID + '_' + stepID + '_' + quesID + '_' + dropDownCount;
		var ids2 = 'edit1dropDownCount_' + sectID + '_' + stepID + '_' + quesID + '_' + dropDownCount;
		return '<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
		'<div class="txtAreaAns" id="ansDrpDown_'+dropDownCount+ '" draggable="true" ondragstart="drag(event,1)">'+
		'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
		'<div class="ansTxtAreaSect">'+
		'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/drop-down.png">'+
		'<p style="padding-right: 210px; padding-top: 2px;">Drop Down</p>'+
		'<span class="qs" style="float: right;margin-top: -33px;margin-right:5px;"><img src="images/settings.png"/>'+
		'<span class="popover above" style="height:110px;margin-top:-120px;">'+
		'<img src="images/duplicate.png" class="duplicateDropDown" id="dropDownCount_' + dropDownCount + '" data-ansQues="' + ansIDCount + '" data-sectCount="'+sectCount +'" data-stepCount="'+stepCount +'" data-quesCount="'+count +'" data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  /><span style="  color: #908796;padding-left: 5px" class="duplicateDropDown" id="dropDownCount_' + dropDownCount + '" data-ansQues="' + ansIDCount + '" data-sectCount="'+sectCount +'" data-stepCount="'+stepCount +'" data-quesCount="'+count +'" data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" > Duplicate</span><br>'+
		'<img src="images/delete_2.png"  class="widgetDel" id="dropDownCount1_' + dropDownCount + '"  data-ele="ansDrpDown" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px" class="widgetDel" id="dropDownCount1_' + dropDownCount + '"  data-ele="ansDrpDown" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
		'<img src="images/edit_property.png"/ id="'+ids+'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px" class="editIconDropDown"   id="'+ids2+'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Edit Property</span><br>'+
		'<img src="images/edit_rule.png"/ class="settIcon" id="dropDownCount12_' + dropDownCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="ansDrpDown" data-Order="' + ruleOrder + '"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="dropDownCount12_' + dropDownCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Order="' + ruleOrder + '" data-Sect="' + sectID + '" data-ele="ansDrpDown">Edit Rule</span></span></span>'+
		'</div>'+
		'<select style=" width: 60%;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"><option></option></select>'+
		'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false"     id="'+ids1+'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
		'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="dropDownCount12_' + dropDownCount + '" data-Order="' + ruleOrder + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="ansDrpDown"  draggable="false"/>'+
		'</div></div> ';
	} else if (name === 'Text Area') {
		ruleOrder++;
		textAreacount++;
		textCountArr.push(textAreacount);
		textArea_Count.push(textAreacount);
		var ids = 'edittextCount_' + sectID + '_' + stepID + '_' + quesID + '_' + textAreacount;
		var ids1 = 'addtextCount_' + sectID + '_' + stepID + '_' + quesID + '_' + textAreacount;
		var ids2 = 'edit1textCount_' + sectID + '_' + stepID + '_' + quesID + '_' + textAreacount;
		return '<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
		'<div class="txtAreaAns" id="txtAreaAns_'+textAreacount+'" draggable="true" ondragstart="drag(event,1)">'+
		'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
		'<div class="ansTxtAreaSect">'+
		'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/text-area.png">'+
		'<p style="padding-right: 240px; padding-top: 2px;">Text Area</p>'+
		'<span class="qs" style="float: right;margin-top: -33px;margin-right:5px;"><img src="images/settings.png"/>'+
		'<span class="popover above" style="height:110px;margin-top:-120px;">'+
		'<img src="images/duplicate.png" class="duplicateTextArea" id="textRulesCount_' + textAreacount + '" data-ansQues="' + ansIDCount + '" data-sectCount="'+sectCount +'" data-stepCount="'+stepCount +'" data-quesCount="'+count +'" data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" /><span style="  color: #908796;padding-left: 5px" class="duplicateTextArea" id="textRulesCount_' + textAreacount + '" data-ansQues="' + ansIDCount + '" data-sectCount="'+sectCount +'" data-stepCount="'+stepCount +'" data-quesCount="'+count +'" data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Duplicate</span><br>'+
		'<img src="images/delete_2.png"  class="widgetDel" id="textCount1_' + textAreacount + '" data-ele="txtAreaAns" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px"  class="widgetDel" id="textCount1_' + textAreacount + '" data-ele="txtAreaAns" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
		'<img src="images/edit_property.png"/  id="' + ids + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  class="editIconTextArea"><span style="  color: #908796;padding-left: 5px"  id="' + ids2 + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  class="editIconTextArea">Edit Property</span><br>'+
		'<img src="images/edit_rule.png"/ class="settIcon" id="textRulesCount12_' + textAreacount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '" data-ele="txtAreaAns"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="textRulesCount12_' + textAreacount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '" data-ele="txtAreaAns">Edit Rule</span></span></span>'+
		'</div>'+
		'<input  type="text" style=" width: 60%;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
		'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false"    id="' + ids1 + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
		'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="textRulesCount12_' + textAreacount + '"   data-ele="txtAreaAns" data-Ques="' + ansIDCount + '" data-Step="' + stepCount + '" data-Sect="' + sectCount + '" data-Order="' + ruleOrder + '" draggable="false"/>'+
		'</div></div> ';
	} else if (name === 'Radio Button') {
		ruleOrder++;
		radioButton++;
		radioCountArr.push(radioButton);
		radio_Count.push(radioButton);
		var ids = 'editradioCount_' + sectID + '_' + stepID + '_' + quesID + '_' + radioButton;
		var ids1 = 'addradioCount_' + sectID + '_' + stepID + '_' + quesID + '_' + radioButton;
		var ids2 = 'edit1radioCount_' + sectID + '_' + stepID + '_' + quesID + '_' + radioButton;
		return '<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
		'<div class="txtAreaAns" id="ansRadioBtn_'+radioButton+ '" draggable="true" ondragstart="drag(event,1)">'+
		'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
		'<div class="ansTxtAreaSect">'+
		'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/radio-button.png">'+
		'<p style="padding-right: 210px; padding-top: 2px;">Radio Button</p>'+
		'<span class="qs" style="float: right;margin-top: -33px;margin-right:5px;"><img src="images/settings.png"/>'+
		'<span class="popover above" style="height:110px;margin-top:-120px;">'+
		'<img src="images/duplicate.png" class="duplicateRadioButton" id="radioButtonCount_' + radioButton + '" data-ansQues="' + ansIDCount + '" data-sectCount="'+sectCount +'" data-stepCount="'+stepCount +'" data-quesCount="'+count +'" data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" /><span style="  color: #908796;padding-left: 5px" class="duplicateRadioButton" id="radioButtonCount_' + radioButton + '" data-ansQues="' + ansIDCount + '" data-sectCount="'+sectCount +'" data-stepCount="'+stepCount +'" data-quesCount="'+count +'" data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Duplicate</span><br>'+
		'<img src="images/delete_2.png"  class="widgetDel" id="radioButtonCount1_' + radioButton + '"  data-ele="ansRadioBtn" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px" class="widgetDel" id="radioButtonCount1_' + radioButton + '"  data-ele="ansRadioBtn" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
		'<img src="images/edit_property.png"/  id="'+ids +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px" class="editIconRadioButton"   id="'+ids2 +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" >Edit Property</span><br>'+
		'<img src="images/edit_rule.png"/ class="settIcon" id="radioButtonCount12_' + radioButton + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '" data-ele="ansRadioBtn"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="radioButtonCount12_' + radioButton + '" data-Order="' + ruleOrder + '"data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="ansRadioBtn">Edit Rule</span></span></span>'+
		'</div>'+
		'<input  type="radio" name="radio_" style=" width: 60%;border: 1px dotted #d0d4dc;margin-top:7px;margin-left: 10px;height: 25px;float:left;"/>'+
		'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false"   id="'+ids1 +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
		'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="radioButtonCount12_' + radioButton + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Order="' + ruleOrder + '" data-Sect="' + sectID + '" data-ele="ansRadioBtn"  draggable="false"/>'+
		'</div></div> ';
	} else if (name === 'Signature') {
		ruleOrder++;
		signatureCount++;
		sigCountArr.push(signatureCount);
		sig_Count.push(signatureCount);
		var ids = 'editsignatureCount_' + sectID + '_' + stepID + '_' + quesID + '_' + signatureCount;
		var ids1 = 'addsignatureCount_' + sectID + '_' + stepID + '_' + quesID + '_' + signatureCount;
		var ids2 = 'edit1signatureCount_' + sectID + '_' + stepID + '_' + quesID + '_' + signatureCount;
		return '<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
		'<div class="txtAreaAns" id="ansSignature_'+signatureCount+'" draggable="true" ondragstart="drag(event,1)">'+
		'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
		'<div class="ansTxtAreaSect">'+
		'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/signature.png">'+
		'<p style="padding-right: 210px; padding-top: 2px;">Signature</p>'+
		'<span class="qs" style="float: right;margin-top: -33px;margin-right:5px;"><img src="images/settings.png"/>'+
		'<span class="popover above" style="height:110px;margin-top:-125px;">'+
		'<img src="images/duplicate.png" class="duplicateSignature" id="signatureCount_' + signatureCount + '"  data-ansQues="' + ansIDCount + '" data-sectCount="'+sectCount +'" data-stepCount="'+stepCount +'" data-quesCount="'+count +'" data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px" class="duplicateSignature" id="signatureCount_' + signatureCount + '"  data-ansQues="' + ansIDCount + '" data-sectCount="'+sectCount +'" data-stepCount="'+stepCount +'" data-quesCount="'+count +'" data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Duplicate</span><br>'+
		'<img src="images/delete_2.png"  class="widgetDel" id="signatureCount1_' + signatureCount + '"  data-ele="ansSignature"  data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px"  class="widgetDel" id="signatureCount1_' + signatureCount + '"  data-ele="ansSignature"  data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
		'<img src="images/edit_property.png"/   id="'+ids+'"  data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px"  class="editIconSignature"  id="'+ids2+'"  data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Edit Property</span><br>'+
		'<img src="images/edit_rule.png"/ class="settIcon" id="signatureCount12_' + signatureCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="ansSignature" data-Order="' + ruleOrder + '"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="signatureCount12_' + signatureCount + '" data-Ques="' + quesID + '" data-Order="' + ruleOrder + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="ansSignature">Edit Rule</span></span></span>'+
		'</div>'+
		'<input  type="text" style=" width: 60%;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
		'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false"  id="'+ids1+'"  data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
		'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="signatureCount12_' + signatureCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Order="' + ruleOrder + '" data-Sect="' + sectID + '" data-ele="ansSignature"  draggable="false"/>'+
		'</div></div> ';
	} else if (name === 'Image Upload') {
		ruleOrder++;
		imageUploadCount++;
		imuploadCountArr.push(imageUploadCount);
		imageUpload_Count.push(imageUploadCount);
		var ids = 'editimageUpCount1_' + sectID + '_' + stepID + '_' + quesID + '_' + imageUploadCount;
		var ids1 = 'addimageUpCount1_' + sectID + '_' + stepID + '_' + quesID + '_' + imageUploadCount;
		var ids2 = 'edit1imageUpCount1_' + sectID + '_' + stepID + '_' + quesID + '_' + imageUploadCount;
		return '<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
		'<div class="txtAreaAns" id="ansImgUploadMainDiv_'+imageUploadCount+ '" draggable="true" ondragstart="drag(event,1)">'+
		'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
		'<div class="ansTxtAreaSect">'+
		'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/upload-image.png">'+
		'<p style="padding-right: 210px; padding-top: 2px;">Upload Image</p>'+
		'<span class="qs" style="float: right;margin-top: -33px;margin-right:5px;"><img src="images/settings.png"/>'+
		'<span class="popover above" style="height:110px;margin-top:-125px;">'+
		'<img src="images/duplicate.png" class="duplicateImageUpload" id="imageUpCount_'+imageUploadCount + '" data-ansQues="' + ansIDCount + '" data-sectCount="'+sectCount +'" data-stepCount="'+stepCount +'" data-quesCount="'+count +'" data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="ansImgUploadMainDiv"/><span style="  color: #908796;padding-left: 5px" class="duplicateImageUpload" id="imageUpCount_'+imageUploadCount + '" data-ansQues="' + ansIDCount + '" data-sectCount="'+sectCount +'" data-stepCount="'+stepCount +'" data-quesCount="'+count +'" data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="ansImgUploadMainDiv">Duplicate</span><br>'+
		'<img src="images/delete_2.png"  class="imgWidgetDel" id="imageUpCount1_'+imageUploadCount + '"  data-ele="ansImgUploadMainDiv" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px" class="imgWidgetDel" id="imageUpCount1_' + imageUploadCount + '" data-ele="ansImgUploadMainDiv" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
		'<img src="images/edit_property.png"/   id="'+ids+'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  ><span style="  color: #908796;padding-left: 5px" class="editIconImageUpload"   id="'+ids2+'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" >Edit Property</span><br>'+
		'</div>'+
		'<input  type="text" style=" width: 60%;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
		'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false"    id="'+ids1+'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
		'</div></div> ';
	}
}