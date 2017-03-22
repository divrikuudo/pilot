/*************Duplicating Answer Elements*********************/
$(document).on("click", ".duplicateTextArea", function(evt) {
	var edit_NoEdit= ($("#" + this.id).attr("data-edit"));
	var status= ($("#" + this.id).attr("status"));
	if(status=="present" || edit_NoEdit=="yes"){
		var stepID = ($("#" + this.id).attr("data-Step"));
		var sectID = ($("#" + this.id).attr("data-Sect"));
		var quesID = ($("#" + this.id).attr("data-Ques"));
		var ansId=($("#" + this.id).attr("data-ans"));
		ruleOrder++;
		var textAreacount=(textCountArr.length)+1;
		textCountArr.push(textAreacount);
		textArea_Count.push(textAreacount);
		$("#firstAns_"+sectID+'_'+stepID+'_'+ansId).append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
				'<div class="txtAreaAns" id="txtAreaAns_'+textAreacount+'" draggable="true" ondragstart="drag(event,1)">'+
				'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
				'<div class="ansTxtAreaSect">'+
				'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/text-area.png">'+
				'<p style="padding-right: 210px; padding-top: 2px;">Text Area</p>'+
				'<span class="qs" style="float: right;margin-top: -33px;margin-right:5px;"><img src="images/settings.png"/>'+
				'<span class="popover above" style="height:110px;margin-top:-120px;">'+
				'<img src="images/duplicate.png" class="duplicateTextArea" id="textRulesCount_' + textAreacount + '" data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '"/><span style="  color: #908796;padding-left: 5px" class="duplicateTextArea" id="textRulesCount_' + textAreacount + '"  data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '">Duplicate</span><br>'+
				'<img src="images/delete_2.png"  class="widgetDel" id="textCount1_' + textAreacount + '"  data-ele="txtAreaAns"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" /><span style="  color: #908796;padding-left: 5px"  class="widgetDel" id="textCount1_' + textAreacount + '"  data-ele="txtAreaAns"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" >Delete</span><br>'+
				'<img src="images/edit_property.png"/ class="editIconTextArea"  id="textRulesCount_' + textAreacount + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px" class="editIconTextArea"  id="textRulesCount_' + textAreacount + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" >Edit Property</span><br>'+
				'<img src="images/edit_rule.png"/ class="settIcon" id="textRulesCount12_' + textAreacount + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  data-ele="txtAreaAns"><span style="  color: #908796;padding-left: 5px"  class="settIcon" id="textRulesCount12_' + textAreacount + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  data-ele="txtAreaAns">Edit Rule</span></span></span>'+
				'</div>'+
				'<input  type="text" style=" width: 220px;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
				'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false" class="TAAddProperties"  id="textCount_' + textAreacount + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" />'+
				'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="textRulesCount12_' + textAreacount + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  data-ele="txtAreaAns"  draggable="false"/>'+
		'</div></div> ');
		showAddRules();
	}
	else{
		var textAreacount=(textCountArr.length)+1;
		ruleOrder++;
		textCountArr.push(textAreacount);
		textArea_Count.push(textAreacount);
		var stepID = ($("#" + this.id).attr("data-Step"));
		var sectID = ($("#" + this.id).attr("data-Sect"));
		var quesID = ($("#" + this.id).attr("data-Ques"));
		var idForAppend=($("#" + this.id).attr("data-ans"));
		$("#firstAns1_"+idForAppend).append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
				'<div class="txtAreaAns" id="txtAreaAns_'+textAreacount+'" draggable="true" ondragstart="drag(event,1)">'+
				'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
				'<div class="ansTxtAreaSect">'+
				'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/text-area.png">'+
				'<p style="padding-right: 240px; padding-top: 2px;">Text Area</p>'+
				'<span class="qs" style="float: right;margin-top: -33px;margin-right:5px;"><img src="images/settings.png"/>'+
				'<span class="popover above" style="height:110px;margin-top:-120px;">'+
				'<img src="images/duplicate.png" class="duplicateTextArea" id="textRulesCount_' + textAreacount + '" data-ans="' + idForAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '" data-ele="txtAreaAns"/><span style="  color: #908796;padding-left: 5px"  class="duplicateTextArea" id="textRulesCount_' + textAreacount + '" data-ans="' + idForAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '" data-ele="txtAreaAns">Duplicate</span><br>'+
				'<img src="images/delete_2.png"  class="widgetDel" id="textCount1_' + textAreacount + '" data-ele="txtAreaAns" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px"   class="widgetDel" id="textCount1_' + textAreacount + '" data-ele="txtAreaAns" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
				'<img src="images/edit_property.png"/ id="textCount_' + textAreacount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  class="editIconTextArea"><span style="  color: #908796;padding-left: 5px" id="textCount_' + textAreacount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  class="editIconTextArea">Edit Property</span><br>'+
				'<img src="images/edit_rule.png"/ class="settIcon" id="textRulesCount12_' + textAreacount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="txtAreaAns"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="textRulesCount12_' + textAreacount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="txtAreaAns">Edit Rule</span></span></span>'+
				'</div>'+
				'<input  type="text" style=" width: 220px;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
				'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false" class="TAAddProperties"  id="textCount_' + textAreacount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
				'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="textRulesCount12_' + textAreacount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '" data-ele="txtAreaAns"  draggable="false"/>'+
		'</div></div> ');
		showAddRules();
	}
});

$(document).on("click", ".duplicateImageUpload", function(evt) {
	var edit_NoEdit= ($("#" + this.id).attr("data-edit"));
	var status= ($("#" + this.id).attr("status"));
	if(status=="present" || edit_NoEdit=="yes"){
		var stepID = ($("#" + this.id).attr("data-Step"));
		var sectID = ($("#" + this.id).attr("data-Sect"));
		var quesID = ($("#" + this.id).attr("data-Ques"));
		var ansId=($("#" + this.id).attr("data-ans"));
		ruleOrder++;
		var imageUploadCount=(imuploadCountArr.length)+1;
		imuploadCountArr.push(imageUploadCount);
		imageUpload_Count.push(imageUploadCount);
		$("#firstAns_"+sectID+'_'+stepID+'_'+ansId).append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
				'<div class="txtAreaAns" id="ansImgUploadMainDiv_'+imageUploadCount+ '" draggable="true" ondragstart="drag(event,1)">'+
				'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
				'<div class="ansTxtAreaSect">'+
				'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/upload-image.png">'+
				'<p style="padding-right: 210px; padding-top: 2px;">Upload Image</p>'+
				'<span class="qs" style="float: right;margin-top: -33px;margin-right:5px;"><img src="images/settings.png"/>'+
				'<span class="popover above" style="height:110px;margin-top:-125px;">'+
				'<img src="images/duplicate.png" class="duplicateImageUpload" id="imageUpCount_'+imageUploadCount + '" status="' + status + '" data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="ansImgUploadMainDiv"/><span style="  color: #908796;padding-left: 5px" class="duplicateImageUpload" id="imageUpCount_'+imageUploadCount + '" status="' + status + '"data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="ansImgUploadMainDiv">Duplicate</span><br>'+
				'<img src="images/delete_2.png"  class="imgWidgetDel" id="imageUpCount1_'+imageUploadCount + '"  data-ele="ansImgUploadMainDiv" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px" class="imgWidgetDel" id="imageUpCount1_' + imageUploadCount + '" data-ele="ansImgUploadMainDiv" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
				'<img src="images/edit_property.png"/  class="editIconImageUpload"  id="imageUpCount_' + imageUploadCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  ><span style="  color: #908796;padding-left: 5px" class="editIconImageUpload"  id="imageUpCount_' + imageUploadCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" >Edit Property</span><br>'+
				'</div>'+
				'<input  type="text" style=" width: 60%;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
				'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false"   class="editIconImageUpload"  id="imageUpCount_' + imageUploadCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
				'</div></div> '
		)
		showAddRules();
	}
	else{
		ruleOrder++;
		var imageUploadCount=(imuploadCountArr.length)+1;
		imuploadCountArr.push(imageUploadCount);
		imageUpload_Count.push(imageUploadCount);
		var stepID = ($("#" + this.id).attr("data-Step"));
		var sectID = ($("#" + this.id).attr("data-Sect"));
		var quesID = ($("#" + this.id).attr("data-Ques"));
		var idForAppend=($("#" + this.id).attr("data-ans"));
		$("#firstAns1_"+idForAppend).append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
				'<div class="txtAreaAns" id="ansImgUploadMainDiv_' + imageUploadCount + '"  draggable="true" ondragstart="drag(event,1)">'+
				'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
				'<div class="ansTxtAreaSect">'+
				'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/upload-image.png">'+
				'<p style="padding-right: 210px; padding-top: 2px;">Upload Image</p>'+
				'<span class="qs" style="float: right;margin-top: -33px;margin-right:5px;"><img src="images/settings.png"/>'+
				'<span class="popover above" style="height:110px;margin-top:-120px;">'+
				'<img src="images/duplicate.png" class="duplicateImageUpload" id="imageUpCount_' + imageUploadCount + '" status="' + status + '" data-ans="' + idForAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="ansImgUploadMainDiv"/><span style="  color: #908796;padding-left: 5px" class="duplicateImageUpload" id="imageUpCount_' + imageUploadCount + '" data-ans="' + idForAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '" data-ele="ansImgUploadMainDiv">Duplicate</span><br>'+
				'<img src="images/delete_2.png"  class="imgWidgetDel" id="imageUpCount1_' + imageUploadCount + '"  data-ele="ansImgUploadMainDiv" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px" class="imgWidgetDel" id="imageUpCount1_' + imageUploadCount + '"  data-ele="ansImgUploadMainDiv" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
				'<img src="images/edit_property.png"/ class="editIconImageUpload"  id="imageUpCount_' + imageUploadCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px"  class="editIconImageUpload"  id="imageUpCount_' + imageUploadCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" >Edit Property</span><br>'+
				'</div>'+
				'<input  type="text" style=" width: 220px;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
				'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false" class="IUAddProperties"  id="imageUpCount_' + imageUploadCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+

		'</div></div> ');
		showAddRules();
	}

});
$(document).on("click", ".duplicateDatePicker", function(evt) {
	var edit_NoEdit= ($("#" + this.id).attr("data-edit"));
	var status= ($("#" + this.id).attr("status"));
	if(status=="present" || edit_NoEdit=="yes"){
		var stepID = ($("#" + this.id).attr("data-Step"));
		var sectID = ($("#" + this.id).attr("data-Sect"));
		var quesID = ($("#" + this.id).attr("data-Ques"));
		var ansId=($("#" + this.id).attr("data-ans"));
		ruleOrder++;
		var datePickerCount=(dateCountArr.length)+1;
		dateCountArr.push(datePickerCount);
		datePicker_Count.push(datePickerCount);
		$("#firstAns_"+sectID+'_'+stepID+'_'+ansId).append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
				'<div class="txtAreaAns" id="ansDate_' + datePickerCount + '"  draggable="true" ondragstart="drag(event,1)">'+
				'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
				'<div class="ansTxtAreaSect">'+
				'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/date-picker.png">'+
				'<p style="padding-right: 210px; padding-top: 2px;">Date Picker</p>'+
				'<span class="qs" style="float: right;margin-top: -33px;margin-right:5px;"><img src="images/settings.png"/>'+
				'<span class="popover above" style="height:110px;margin-top:-120px;">'+
				'<img src="images/duplicate.png" class="duplicateDatePicker" id="datePickerCount_' + datePickerCount + '"   data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" status="' + status + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" /><span style="  color: #908796;padding-left: 5px" class="duplicateDatePicker" id="datePickerCount_' + datePickerCount + '"  status="' + status + '" data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '">Duplicate</span><br>'+
				'<img src="images/delete_2.png"  class="widgetDel" id="datePickerCount1_' + datePickerCount + '"  data-ele="ansDate"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" /><span style="  color: #908796;padding-left: 5px" class="widgetDel" id="datePickerCount1_' + datePickerCount + '"  data-ele="ansDate"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" >Delete</span><br>'+
				'<img src="images/edit_property.png"/ class="editIconDatePicker"  id="datePickerCount_' + datePickerCount + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  ><span style="  color: #908796;padding-left: 5px" class="editIconDatePicker"  id="datePickerCount_' + datePickerCount + '" data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" >Edit Property</span><br>'+
				'<img src="images/edit_rule.png"/ class="settIcon" id="datePickerCount12_' + datePickerCount + '" data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  data-ele="ansDate"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="datePickerCount12_' + datePickerCount + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  data-ele="ansDate">Edit Rule</span></span></span>'+
				'</div>'+
				'<input  type="text" class="datepicker" id="date_'+datePickerCount+ '" style=" width: 220px;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
				'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false" class="DPAddProperties"  id="datePickerCount_' + datePickerCount + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" />'+
				'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="datePickerCount12_' + datePickerCount + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  data-ele="ansDate"  draggable="false"/>'+
		'</div></div> ');
		showAddRules();
	}
	else{
		var datePickerCount=(dateCountArr.length)+1;
		ruleOrder++;
		dateCountArr.push(datePickerCount);
		datePicker_Count.push(datePickerCount);
		var stepID = ($("#" + this.id).attr("data-Step"));
		var sectID = ($("#" + this.id).attr("data-Sect"));
		var quesID = ($("#" + this.id).attr("data-Ques"));
		var idForAppend=($("#" + this.id).attr("data-ans"));
		$("#firstAns1_"+idForAppend).append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
				'<div class="txtAreaAns" id="ansDate_' + datePickerCount + '" draggable="true" ondragstart="drag(event,1)">'+
				'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
				'<div class="ansTxtAreaSect">'+
				'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/date-picker.png">'+
				'<p style="padding-right: 210px; padding-top: 2px;">Date Picker</p>'+
				'<span class="qs" style="float: right;margin-top: -33px;margin-right:5px;"><img src="images/settings.png"/>'+
				'<span class="popover above" style="height:110px;margin-top:-120px;">'+
				'<img src="images/duplicate.png" class="duplicateDatePicker" id="datePickerCount_' + datePickerCount + '" data-ans="' + idForAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '"/><span style="  color: #908796;padding-left: 5px" class="duplicateDatePicker" id="datePickerCount_' + datePickerCount + '" data-ans="' + idForAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '">Duplicate</span><br>'+
				'<img src="images/delete_2.png"  class="widgetDel" id="datePickerCount1_' + datePickerCount + '"  data-ele="ansDate" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px" class="widgetDel" id="datePickerCount1_' + datePickerCount + '"  data-ele="ansDate" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
				'<img src="images/edit_property.png"/ class="editIconDatePicker"  id="datePickerCount_' + datePickerCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px"  class="editIconDatePicker"  id="datePickerCount_' + datePickerCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Edit Property</span><br>'+
				'<img src="images/edit_rule.png"/ class="settIcon" id="datePickerCount12_' + datePickerCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="ansDate"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="datePickerCount12_' + datePickerCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="ansDate">Edit Rule</span></span></span>'+
				'</div>'+
				'<input  type="date" class="datepicker" id="date_'+datePickerCount+ '" style=" width: 220px;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
				'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false" class="DPAddProperties"  id="datePickerCount_' + datePickerCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
				'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="datePickerCount12_' + datePickerCount + '" data-Order="' + ruleOrder + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="ansDate"  draggable="false"/>'+
		'</div></div> ');
		showAddRules();
	}
});
$(document).on("click", ".duplicateDropDown", function(evt) {
	var edit_NoEdit= ($("#" + this.id).attr("data-edit"));
	var status= ($("#" + this.id).attr("status"));
	if(status=="present" || edit_NoEdit=="yes"){
		var stepID = ($("#" + this.id).attr("data-Step"));
		var sectID = ($("#" + this.id).attr("data-Sect"));
		var quesID = ($("#" + this.id).attr("data-Ques"));
		var ansId=($("#" + this.id).attr("data-ans"));
		ruleOrder++;
		var dropDownCount=(dropCountArr.length)+1;
		dropCountArr.push(dropDownCount);
		dropDown_Count.push(dropDownCount);
		$("#firstAns_"+sectID+'_'+stepID+'_'+ansId).append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
				'<div class="txtAreaAns" id="ansDrpDown_' + dropDownCount + '" draggable="true" ondragstart="drag(event,1)">'+
				'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
				'<div class="ansTxtAreaSect">'+
				'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/drop-down.png">'+
				'<p style="padding-right: 210px; padding-top: 2px;">drop down</p>'+
				'<span class="qs" style="float: right;margin-top: -33px;margin-right:5px;"><img src="images/settings.png"/>'+
				'<span class="popover above" style="height:110px;margin-top:-120px;">'+
				'<img src="images/duplicate.png" class="duplicateDropDown" id="dropDownCount_' + dropDownCount + '"  status="' + status + '" data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" /><span style="  color: #908796;padding-left: 5px" class="duplicateDropDown" id="dropDownCount_' + dropDownCount + '"  data-edit="yes" data-ans="'+ansId +'" status="' + status + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Duplicate</span><br>'+
				'<img src="images/delete_2.png"  class="widgetDel" id="dropDownCount1_' + dropDownCount + '"  data-ele="ansDrpDown"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" /><span style="  color: #908796;padding-left: 5px"  class="widgetDel" id="dropDownCount1_' + dropDownCount + '"  data-ele="ansDrpDown"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" >Delete</span><br>'+
				'<img src="images/edit_property.png"/ class="editIconDropDown" id="dropDownCount_' + dropDownCount + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  ><span style="  color: #908796;padding-left: 5px"  class="editIconDropDown" id="dropDownCount_' + dropDownCount + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  >Edit Property</span><br>'+
				'<img src="images/edit_rule.png"/ class="settIcon" id="dropDownCount12_' + dropDownCount + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  data-ele="ansDrpDown"><span style="  color: #908796;padding-left: 5px"  class="settIcon" id="dropDownCount12_' + dropDownCount + '" data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  data-ele="ansDrpDown">Edit Rule</span></span></span>'+
				'</div>'+
				'<input  type="text" style=" width: 220px;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
				'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false" class="DDAddProperties"  id="dropDownCount_' + datePickerCount + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" />'+
				'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="dropDownCount12_' + datePickerCount + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  data-ele="ansDrpDown"  draggable="false"/>'+
		'</div></div> ');
		showAddRules();
	}
	else{
		var dropDownCount=(dropCountArr.length)+1;
		ruleOrder++;
		dropCountArr.push(dropDownCount);
		dropDown_Count.push(dropDownCount);
		var stepID = ($("#" + this.id).attr("data-Step"));
		var sectID = ($("#" + this.id).attr("data-Sect"));
		var quesID = ($("#" + this.id).attr("data-Ques"));
		var idForAppend=($("#" + this.id).attr("data-ans"));
		$("#firstAns1_"+idForAppend).append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
				'<div class="txtAreaAns" id="ansDrpDown_' + dropDownCount + '" draggable="true" ondragstart="drag(event,1)">'+
				'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
				'<div class="ansTxtAreaSect">'+
				'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/drop-down.png">'+
				'<p style="padding-right: 210px; padding-top: 2px;">Drop Down</p>'+
				'<span class="qs" style="float: right;margin-top: -33px;margin-right:5px;"><img src="images/settings.png"/>'+
				'<span class="popover above" style="height:110px;margin-top:-120px;">'+
				'<img src="images/duplicate.png" class="duplicateDropDown" id="dropDownCount_' + dropDownCount + '" status="' + status + '" data-ans="' + idForAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" /><span style="  color: #908796;padding-left: 5px"  class="duplicateDropDown" id="dropDownCount_' + dropDownCount + '" data-ans="' + idForAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '">Duplicate</span><br>'+
				'<img src="images/delete_2.png"  class="widgetDel" id="dropDownCount1_' + dropDownCount + '"  data-ele="ansDrpDown" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px"  class="widgetDel" id="dropDownCount1_' + dropDownCount + '"  data-ele="ansDrpDown" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
				'<img src="images/edit_property.png"/ class="editIconDropDown"  id="dropDownCount_' + dropDownCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px" class="editIconDropDown"  id="dropDownCount_' + dropDownCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" >Edit Property</span><br>'+
				'<img src="images/edit_rule.png"/ class="settIcon" id="dropDownCount12_' + dropDownCount + '" data-Order="' + ruleOrder + '"  data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="ansDrpDown"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="dropDownCount12_' + dropDownCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="ansDrpDown">Edit Rule</span></span></span>'+
				'</div>'+
				'<select style=" width: 220px;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"><option></option></select>'+
				'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false" class="DDAddProperties"   id="dropDownCount_' + dropDownCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
				'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="dropDownCount12_' + dropDownCount + '" data-Order="' + ruleOrder + '"  data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="ansDrpDown"  draggable="false"/>'+
		'</div></div> ');
		showAddRules();
	}
});
$(document).on("click", ".duplicateRadioButton", function(evt) {
	var edit_NoEdit= ($("#" + this.id).attr("data-edit"));
	var status= ($("#" + this.id).attr("status"));
	if(status=="present" || edit_NoEdit=="yes"){
		var stepID = ($("#" + this.id).attr("data-Step"));
		var sectID = ($("#" + this.id).attr("data-Sect"));
		var quesID = ($("#" + this.id).attr("data-Ques"));
		var ansId=($("#" + this.id).attr("data-ans"));
		var radioButton=(radioCountArr.length)+1;
		radioCountArr.push(radioButton);
		radio_Count.push(radioButton);
		$("#firstAns_"+sectID+'_'+stepID+'_'+ansId).append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
				'<div class="txtAreaAns" id="ansRadioBtn_' + radioButton + '" draggable="true" ondragstart="drag(event,1)">'+
				'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
				'<div class="ansTxtAreaSect">'+
				'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/radio-button.png">'+
				'<p style="padding-right: 210px; padding-top: 2px;">radio Button</p>'+
				'<span class="qs" style="float: right;margin-top: -33px;margin-right:5px;"><img src="images/settings.png"/>'+
				'<span class="popover above" style="height:110px;margin-top:-120px;">'+
				'<img src="images/duplicate.png" class="duplicateRadioButton" id="radioButtonCount_' + radioButton + '" status="' + status + '" data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" /><span style="  color: #908796;padding-left: 5px" class="duplicateRadioButton" id="radioButtonCount_' + radioButton + '"   data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '">Duplicate</span><br>'+
				'<img src="images/delete_2.png"  class="widgetDel" id="radioButtonCount1_' + radioButton + '"  data-ele="ansRadioBtn"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" /><span style="  color: #908796;padding-left: 5px"  class="widgetDel" id="radioButtonCount1_' + radioButton + '"  data-ele="ansRadioBtn"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" >Delete</span><br>'+
				'<img src="images/edit_property.png"/ class="editIconRadioButton"  id="radioButtonCount_' + radioButton + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  ><span style="  color: #908796;padding-left: 5px" class="editIconRadioButton"  id="radioButtonCount_' + radioButton + '" data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" >Edit Property</span><br>'+
				'<img src="images/edit_rule.png"/ class="settIcon" id="radioButtonCount12_' + radioButton + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  data-ele="ansRadioBtn"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="radioButtonCount12_' + radioButton + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  data-ele="ansRadioBtn">Edit Rule</span></span></span>'+
				'</div>'+
				'<input  type="text" style=" width: 220px;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
				'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false" class="RadioAddProperties"  id="radioButtonCount_' + radioButton + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" />'+
				'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="radioButtonCount12_' + radioButton + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  data-ele="ansRadioBtn"  draggable="false"/>'+
		'</div></div> ');
		showAddRules();
	}
	else{
		var radioButton=(radioCountArr.length)+1;
		ruleOrder++;
		radioCountArr.push(radioButton);
		radio_Count.push(radioButton);
		var stepID = ($("#" + this.id).attr("data-Step"));
		var sectID = ($("#" + this.id).attr("data-Sect"));
		var quesID = ($("#" + this.id).attr("data-Ques"));
		var idForAppend=($("#" + this.id).attr("data-ans"));
		$("#firstAns1_"+idForAppend).append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
				'<div class="txtAreaAns" id="ansRadioBtn_' + radioButton + '" draggable="true" ondragstart="drag(event,1)">'+
				'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
				'<div class="ansTxtAreaSect">'+
				'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/radio-button.png">'+
				'<p style="padding-right: 210px; padding-top: 2px;">Radio Button</p>'+
				'<span class="qs" style="float: right;margin-top: -33px;margin-right:5px;"><img src="images/settings.png"/>'+
				'<span class="popover above" style="height:110px;margin-top:-120px;">'+
				'<img src="images/duplicate.png" class="duplicateRadioButton" id="radioButtonCount_' + radioButton + '" status="' + status + '" data-ans="' + idForAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" /><span style="  color: #908796;padding-left: 5px" class="duplicateRadioButton" id="radioButtonCount_' + radioButton + '" data-ans="' + idForAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '">Duplicate</span><br>'+
				'<img src="images/delete_2.png"  class="widgetDel" id="radioButtonCount1_' + radioButton + '"  data-ele="ansRadioBtn" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px" class="widgetDel" id="radioButtonCount1_' + radioButton + '"  data-ele="ansRadioBtn" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
				'<img src="images/edit_property.png"/ class="editIconRadioButton"  id="radioButtonCount_' + radioButton + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px" class="editIconRadioButton"  id="radioButtonCount_' + radioButton + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Edit Property</span><br>'+
				'<img src="images/edit_rule.png"/ class="settIcon" id="radioButtonCount12_' + radioButton + '" data-Order="' + ruleOrder + '"  data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="ansRadioBtn"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="radioButtonCount12_' + radioButton + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="ansRadioBtn">Edit Rule</span></span></span>'+
				'</div>'+
				'<input  type="radio" name="radio_" style=" width: 220px;border: 1px dotted #d0d4dc;margin-top:7px;margin-left: 10px;height: 25px;float:left;"/>'+
				'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false" class="RadioAddProperties"  id="radioButtonCount_' + radioButton + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
				'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="radioButtonCount12_' + radioButton + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="ansRadioBtn"  draggable="false"/>'+
		'</div></div> ');
		showAddRules();
	}
});
$(document).on("click", ".duplicateCheckBox", function(evt) {
	var edit_NoEdit= ($("#" + this.id).attr("data-edit"));
	var status= ($("#" + this.id).attr("status"));
	if(status=="present" || edit_NoEdit=="yes"){
		var stepID = ($("#" + this.id).attr("data-Step"));
		var sectID = ($("#" + this.id).attr("data-Sect"));
		var quesID = ($("#" + this.id).attr("data-Ques"));
		var ansId=($("#" + this.id).attr("data-ans"));
		ruleOrder++;
		var checkBoxCount=(checkCountArr.length)+1;
		checkCountArr.push(checkBoxCount);
		chk_Count.push(checkBoxCount);
		$("#firstAns_"+sectID+'_'+stepID+'_'+ansId).append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
				'<div class="txtAreaAns" id="anscheckBox_' + checkBoxCount + '" draggable="true" ondragstart="drag(event,1)">'+
				'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
				'<div class="ansTxtAreaSect">'+
				'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/checkbox.png">'+
				'<p style="padding-right: 210px; padding-top: 2px;">Checkbox</p>'+
				'<span class="qs" style="float: right;margin-top: -33px;margin-right:5px;"><img src="images/settings.png"/>'+
				'<span class="popover above" style="height:110px;margin-top:-120px;">'+
				'<img src="images/duplicate.png" class="duplicateCheckBox" id="checkBoxCount_' + checkBoxCount + '"  data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" /><span style="  color: #908796;padding-left: 5px" class="duplicateCheckBox" id="checkBoxCount_' + checkBoxCount + '"  data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Duplicate</span><br>'+
				'<img src="images/delete_2.png"  class="widgetDel" id="checkBoxCount1_' + checkBoxCount + '"  data-ele="anscheckBox"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" /><span style="  color: #908796;padding-left: 5px"  class="widgetDel" id="checkBoxCount1_' + checkBoxCount + '"  data-ele="anscheckBox"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" >Delete</span><br>'+
				'<img src="images/edit_property.png"/ class="editIconCheckBox"  id="checkBoxCount_' + checkBoxCount + '" data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  ><span style="  color: #908796;padding-left: 5px"  class="editIconCheckBox"  id="checkBoxCount_' + checkBoxCount + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" >Edit Property</span><br>'+
				'<img src="images/edit_rule.png"/ class="settIcon" id="checkBoxCount12_' + checkBoxCount + '" data-Ques="' + quesCount + '" data-Step="' + stepCount + '" data-Sect="' + sectCount + '" data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  data-ele="anscheckBox"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="checkBoxCount12_' + checkBoxCount + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  data-ele="anscheckBox">Edit Rule</span></span></span>'+
				'</div>'+
				'<input  type="text" style=" width: 220px;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
				'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false" class="CheckboxAddProperties"  id="checkBoxCount_' + checkBoxCount + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" />'+
				'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="checkBoxCount12_' + checkBoxCount + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  data-ele="textBox"  draggable="false"/>'+
		'</div></div> ');
		showAddRules();
	}
	else{
		var checkBoxCount=(checkCountArr.length)+1;
		ruleOrder++;
		checkCountArr.push(checkBoxCount);
		chk_Count.push(checkBoxCount);
		var stepID = ($("#" + this.id).attr("data-Step"));
		var sectID = ($("#" + this.id).attr("data-Sect"));
		var quesID = ($("#" + this.id).attr("data-Ques"));
		var idForAppend=($("#" + this.id).attr("data-ans"));
		$("#firstAns1_"+idForAppend).append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
				'<div class="txtAreaAns" id="anscheckBox_' + checkBoxCount + '" draggable="true" ondragstart="drag(event,1)">'+
				'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
				'<div class="ansTxtAreaSect">'+
				'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/checkbox.png">'+
				'<p style="padding-right: 210px; padding-top: 2px;">Checkbox</p>'+
				'<span class="qs" style="float: right;margin-top: -33px;margin-right:5px;"><img src="images/settings.png"/>'+
				'<span class="popover above" style="height:110px;margin-top:-120px;">'+
				'<img src="images/duplicate.png" class="duplicateCheckBox" id="checkBoxCount_' + checkBoxCount + '" data-ans="' + idForAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" /><span style="  color: #908796;padding-left: 5px" class="duplicateCheckBox" id="checkBoxCount_' + checkBoxCount + '" data-ans="' + idForAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Duplicate</span><br>'+
				'<img src="images/delete_2.png"  class="widgetDel" id="checkBoxCount1_' + checkBoxCount + '"  data-ele="anscheckBox" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px" class="widgetDel" id="checkBoxCount1_' + checkBoxCount + '"  data-ele="anscheckBox" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
				'<img src="images/edit_property.png"/ class="editIconCheckBox"  id="checkBoxCount_' + checkBoxCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px" class="editIconCheckBox"  id="checkBoxCount_' + checkBoxCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Edit Property</span><br>'+
				'<img src="images/edit_rule.png"/ class="settIcon" id="checkBoxCount12_' + checkBoxCount + '" data-Order="' + ruleOrder + '"  data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="anscheckBox"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="checkBoxCount12_' + checkBoxCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="anscheckBox">Edit Rule</span></span></span>'+
				'</div>'+
				'<input  type="checkbox" name="checkbox_" style=" width: 220px;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
				'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false" class="CheckboxAddProperties"  id="checkBoxCount_' + checkBoxCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
				'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="checkBoxCount12_' + checkBoxCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="anscheckBox"  draggable="false"/>'+

		'</div></div> ');
		showAddRules();
	}
});

$(document).on("click", ".duplicateTextBox", function(evt) {
	var edit_NoEdit= ($("#" + this.id).attr("data-edit"));
	var status= ($("#" + this.id).attr("status"));
	if(status=="present" || edit_NoEdit=="yes"){
		var stepID = ($("#" + this.id).attr("data-Step"));
		var sectID = ($("#" + this.id).attr("data-Sect"));
		var quesID = ($("#" + this.id).attr("data-Ques"));
		var ansId=($("#" + this.id).attr("data-ans"));
		var textBoxCount=(textBoxCountArr.length)+1;
		textBoxCountArr.push(textBoxCount);
		textbox_Count.push(textBoxCount);
		$("#firstAns_"+sectID+'_'+stepID+'_'+ansId).append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
				'<div class="txtAreaAns" id="textBox_' + textBoxCount + '" draggable="true" ondragstart="drag(event,1)">'+
				'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
				'<div class="ansTxtAreaSect">'+
				'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/text-box.png">'+
				'<p style="padding-right: 210px; padding-top: 2px;">Text box</p>'+
				'<span class="qs" style="float: right;margin-top: -33px;margin-right:5px;"><img src="images/settings.png"/>'+
				'<span class="popover above" style="height:110px;margin-top:-120px;">'+
				'<img src="images/duplicate.png" class="duplicateTextBox" id="textBoxCount_' + textBoxCount + '" status="' + status + '" data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" /><span style="  color: #908796;padding-left: 5px" class="duplicateTextBox" id="textBoxCount_' + textBoxCount + '"    data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '">Duplicate</span><br>'+
				'<img src="images/delete_2.png"  class="widgetDel" id="textBoxCount1_' + textBoxCount + '"  data-ele="textBox"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" /><span style="  color: #908796;padding-left: 5px"  class="widgetDel" id="textBoxCount1_' + textBoxCount + '"  data-ele="textBox"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" >Delete</span><br>'+
				'<img src="images/edit_property.png"/ class="editIconTextBox"  id="textBoxCount_' + textBoxCount + '" data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px" class="editIconTextBox"  id="textBoxCount_' + textBoxCount + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" >Edit Property</span><br>'+
				'<img src="images/edit_rule.png"/ class="settIcon" id="textBoxCount12_' + textBoxCount + '" data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="textBox"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="textBoxCount12_' + textBoxCount + '" data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  data-ele="textBox">Edit Rule</span></span></span>'+
				'</div>'+
				'<input  type="text" style=" width: 220px;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
				'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false" class="textBoxAddProperties"  id="textBoxCount_' + textBoxCount + '" data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
				'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="textBoxCount12_' + textBoxCount + '" data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  data-ele="textBox"  draggable="false"/>'+
				'</div></div> ');
		showAddRules();
	}
	else{
		textBoxCount=(textBoxCountArr.length)+1;
		ruleOrder++;
		textBoxCountArr.push(textBoxCount);
		textbox_Count.push(textBoxCount);
		var stepID = ($("#" + this.id).attr("data-Step"));
		var sectID = ($("#" + this.id).attr("data-Sect"));
		var quesID = ($("#" + this.id).attr("data-Ques"));
		var idForAppend=($("#" + this.id).attr("data-ans"));
		$("#firstAns1_"+idForAppend).append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
				'<div class="txtAreaAns" id="textBox_' + textBoxCount + '" draggable="true" ondragstart="drag(event,1)">'+
				'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
				'<div class="ansTxtAreaSect">'+
				'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/text-box.png">'+
				'<p style="padding-right: 210px; padding-top: 2px;">Text box</p>'+
				'<span class="qs" style="float: right;margin-top: -33px;margin-right:5px;"><img src="images/settings.png"/>'+
				'<span class="popover above" style="height:110px;margin-top:-120px;">'+
				'<img src="images/duplicate.png" class="duplicateTextBox" id="textBoxCount_' + textBoxCount + '" status="' + status + '" data-ans="' + idForAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" /><span style="  color: #908796;padding-left: 5px" class="duplicateTextBox" id="textBoxCount_' + textBoxCount + '" data-ans="' + idForAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '">Duplicate</span><br>'+
				'<img src="images/delete_2.png"  class="widgetDel" id="textBoxCount1_' + textBoxCount + '"  data-ele="textBox" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px"  class="widgetDel" id="textBoxCount1_' + textBoxCount + '"  data-ele="textBox" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
				'<img src="images/edit_property.png"/ class="editIconTextBox"  id="textBoxCount_' + textBoxCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px" class="editIconTextBox"  id="textBoxCount_' + textBoxCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" >Edit Property</span><br>'+
				'<img src="images/edit_rule.png"/ class="settIcon" id="textBoxCount12_' + textBoxCount + '" data-Order="' + ruleOrder + '"  data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="textBox"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="textBoxCount12_' + textBoxCount + '" data-Order="' + ruleOrder + '"  data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="textBox">Edit Rule</span></span></span>'+
				'</div>'+
				'<input  type="text" style=" width: 220px;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
				'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false" class="textBoxAddProperties"  id="textBoxCount_' + textBoxCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
				'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="textBoxCount12_' + textBoxCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="textBox"  draggable="false"/>'+
		'</div></div> ');
		showAddRules();
	}
});


//$(document).on("click", ".duplicateGuideBox", function(evt) {
//	var edit_NoEdit= ($("#" + this.id).attr("data-edit"));
//	var status= ($("#" + this.id).attr("status"));
//	if(status=="present" || edit_NoEdit=="yes"){
//		var stepID = ($("#" + this.id).attr("data-Step"));
//		var sectID = ($("#" + this.id).attr("data-Sect"));
//		var quesID = ($("#" + this.id).attr("data-Ques"));
//		var ansId=($("#" + this.id).attr("data-ans"));
//		var guideImgCount=(guideImgCountArr.length)+1;
//		guideImgCountArr.push(guideImgCount);
//		guideImg_Count.push(guideImgCount);
//		$("#firstAns_"+sectID+'_'+stepID+'_'+ansId).append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
//		'<div class="guideImgbox" id="guidImgBox_'+guideImgCount+ '" draggable="true" ondragstart="drag(event,1)">'+
//		//'<div style="  background-color: #F2f3f4; padding-left: 320px;"><img src="images/drag-2.png"/></div>'+
//		'<div class="ansTxtAreaSect">'+
//		'<img style="float: left;padding-top: 4px;padding-left: 10px;" src="images/Icon_guide-Image.png">'+
//		'<p>Guide Image</p>'+
//		'<span class="qs" style="float: right;margin-top: -3px;"><img src="images/settings.png"/>'+
//		'<span class="popover above" style="height:110px;margin-top:-125px;">'+
//		'<img src="images/duplicate.png"  id="guideImgBoxCount_' + guideImgCount + '" data-ans="' + ansId + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '"/><span style="  color: #908796;padding-left: 5px" class="duplicateGuideBox" id="guideImgBox_' + guideImgCount + '" data-ans="' + ansId + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '">Duplicate</span><br>'+
//		'<img src="images/delete_2.png"  class="widgetDel" id="guideImgBoxCount1_' + guideImgCount + '"  data-ele="guideImgBox" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px" class="widgetDel" id="guideImgBox1_' + guideImgCount + '"  data-ele="guideImgBox" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
//		'<img src="images/edit_property.png"/   id="guideImgBoxCount_' + guideImgCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px" class="editIconGuideImg"  id="guideImgBox_' + guideImgCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Edit Property</span><br>'+
//		'<img src="images/edit_rule.png"/ class="settIcon" id="guideImgBoxCount12_' + guideImgCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="textBox"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="guideImgBox12_' + guideImgCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="guideImgBox">Edit Rule</span></span></span>'+
//		'</div>'+
//		'<div class=\"addImgMainDiv addGuideImg\"><div class=\"addImg\"><a href=\"#no\" id=\"img_input_form_guide\" class=\"btn btn-primary img_input_form_guide\">+ Add Image</a></div></div><img id=\"trialImg\" src=\"\" style=\"display: none\" /><input type=\"file\"  id=\"file1_form_guide\"\ name=\"file2\" style=\"display: none;\" />'+
//		'<div id=\"addFormImage_\" class=\"addImagesDynamic\"></div>'+
//		'<ul class=\"propRules\"><li><a href="#no" draggable="false" class="guideImgBoxProperties"  id="guideImgBox_' + guideImgCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"><img src="images/add_property.png" style="float: left;"/> Add Property</a></li><li><a href="#no" Class="addRulesLink" id="guideImgBox12_' + guideImgCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '" data-ele="guideImgBox"  draggable="false"><img src="images/add_rule.png" style="float: left;"/>Add Rule</a></li></ul>'+	
//		'</div></div>');
//		showAddRules();
//	}
//	else{
//		guideImgCount=(guideImgCountArr.length)+1;
//		ruleOrder++;
//		guideImgCountArr.push(guideImgCount);
//		guideImg_Count.push(guideImgCount);
//		var stepID = ($("#" + this.id).attr("data-Step"));
//		var sectID = ($("#" + this.id).attr("data-Sect"));
//		var quesID = ($("#" + this.id).attr("data-Ques"));
//		var idForAppend=($("#" + this.id).attr("data-ans"));
//		$("#firstAns1_"+idForAppend).append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
//				'<div class="guideImgbox" id="guidImgBox_'+guideImgCount+ '" draggable="true" ondragstart="drag(event,1)">'+
//				//'<div style="  background-color: #F2f3f4; padding-left: 320px;"><img src="images/drag-2.png"/></div>'+
//				'<div class="ansTxtAreaSect">'+
//				'<img style="float: left;padding-top: 4px;padding-left: 10px;" src="images/Icon_guide-Image.png">'+
//				'<p>Guide Image</p>'+
//				'<span class="qs" style="float: right;margin-top: -3px;"><img src="images/settings.png"/>'+
//				'<span class="popover above" style="height:110px;margin-top:-125px;">'+
//				'<img src="images/duplicate.png"  id="guideImgBoxCount_' + guideImgCount + '" data-ans="' + idForAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '"/><span style="  color: #908796;padding-left: 5px" class="duplicateGuideBox" id="guideImgBox_' + guideImgCount + '" data-ans="' + idForAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '">Duplicate</span><br>'+
//				'<img src="images/delete_2.png"  class="widgetDel" id="guideImgBoxCount1_' + guideImgCount + '"  data-ele="guideImgBox" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px" class="widgetDel" id="guideImgBox1_' + guideImgCount + '"  data-ele="guideImgBox" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
//				'<img src="images/edit_property.png"/ class=""  id="guideImgBoxCount_' + guideImgCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px" class="editIconGuideImg"  id="guideImgBox_' + guideImgCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Edit Property</span><br>'+
//				'<img src="images/edit_rule.png"/ class="settIcon" id="guideImgBoxCount12_' + guideImgCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="textBox"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="guideImgBox12_' + guideImgCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="guideImgBox">Edit Rule</span></span></span>'+
//				'</div>'+
//				'<div class=\"addImgMainDiv addGuideImg\"><div class=\"addImg\"><a href=\"#no\" id=\"img_input_form_guide\" class=\"btn btn-primary img_input_form_guide\">+ Add Image</a></div></div><img id=\"trialImg\" src=\"\" style=\"display: none\" /><input type=\"file\"  id=\"file1_form_guide\"\ name=\"file2\" style=\"display: none;\" />'+
//				'<div id=\"addFormImage_\" class=\"addImagesDynamic\"></div>'+
//				'<ul class=\"propRules\"><li><a href="#no" draggable="false" class="guideImgBoxProperties"  id="guideImgBox_' + guideImgCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"><img src="images/add_property.png" style="float: left;"/> Add Property</a></li><li><a href="#no" Class="addRulesLink" id="guideImgBox12_' + guideImgCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '" data-ele="guideImgBox"  draggable="false"><img src="images/add_rule.png" style="float: left;"/>Add Rule</a></li></ul>'+	
//				'</div></div>');
//		showAddRules();
//	}
//});


$(document).on("click", ".duplicateSignature", function(e) {
	var edit_NoEdit= ($("#" + this.id).attr("data-edit"));
	var status= ($("#" + this.id).attr("status"));
	if(status=="present" || edit_NoEdit=="yes"){
		var stepID = ($("#" + this.id).attr("data-Step"));
		var sectID = ($("#" + this.id).attr("data-Sect"));
		var quesID = ($("#" + this.id).attr("data-Ques"));
		var ansId=($("#" + this.id).attr("data-ans"));
		var signatureCount=(sigCountArr.length)+1;
		sigCountArr.push(signatureCount);
		sig_Count.push(signatureCount);
		$("#firstAns_"+sectID+'_'+stepID+'_'+ansId).append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
				'<div class="txtAreaAns" id="ansSignature_' + signatureCount + '" draggable="true" ondragstart="drag(event,1)">'+
				'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
				'<div class="ansTxtAreaSect">'+
				'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/signature.png">'+
				'<p style="padding-right: 210px; padding-top: 2px;">Signature</p>'+
				'<span class="qs" style="float: right;margin-top: -33px;margin-right:5px;"><img src="images/settings.png"/>'+
				'<span class="popover above" style="height:110px;margin-top:-120px;">'+
				'<img src="images/duplicate.png" class="duplicateSignature" id="signatureCount_' + signatureCount + '"  data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" status="' + status + '" data-Sect="' + sectID + '" /><span style="  color: #908796;padding-left: 5px" class="duplicateSignature" id="signatureCount_' + signatureCount + '"   data-edit="yes" data-ans="'+ansId +'" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '" >Duplicate</span><br>'+
				'<img src="images/delete_2.png"  class="widgetDel" id="signatureCount1_' + signatureCount + '"  data-ele="ansSignature"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" /><span style="  color: #908796;padding-left: 5px"  class="widgetDel" id="signatureCount1_' + signatureCount + '"  data-ele="ansSignature"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" >Delete</span><br>'+
				'<img src="images/edit_property.png"/ class="editIconSignature"  id="signatureCount_' + signatureCount + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px" class="editIconSignature"  id="signatureCount_' + signatureCount + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" >Edit Property</span><br>'+
				'<img src="images/edit_rule.png"/ class="settIcon" id="signatureCount12_' + signatureCount + '" data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  data-ele="ansSignature"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="signatureCount12_' + signatureCount + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  data-ele="ansSignature">Edit Rule</span></span></span>'+
				'</div>'+
				'<input  type="text" style=" width: 220px;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
				'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false" class="signatureAddProperties"  id="signatureCount_' + signatureCount + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" />'+
				'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="signatureCount12_' + signatureCount + '"  data-Ques="' + ansId + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="ansSignature"  draggable="false"/>'+
		'</div></div> ');
		showAddRules();
	}
	else{
		var stepID = ($("#" + this.id).attr("data-Step"));
		ruleOrder++;
		var sectID = ($("#" + this.id).attr("data-Sect"));
		var quesID = ($("#" + this.id).attr("data-Ques"));
		var idForAppend=($("#" + this.id).attr("data-ans"));
		signatureCount=(sigCountArr.length)+1;
		sigCountArr.push(signatureCount);
		sig_Count.push(signatureCount);
		$("#firstAns1_"+idForAppend).append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
				'<div class="txtAreaAns" id="ansSignature_' + signatureCount + '" draggable="true" ondragstart="drag(event,1)">'+
				'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
				'<div class="ansTxtAreaSect">'+
				'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/signature.png">'+
				'<p style="padding-right: 210px; padding-top: 2px;">Signature</p>'+
				'<span class="qs" style="float: right;margin-top: -33px;margin-right:5px;"><img src="images/settings.png"/>'+
				'<span class="popover above" style="height:110px;margin-top:-120px;">'+
				'<img src="images/duplicate.png" class="duplicateSignature" id="signatureCount_' + signatureCount + '" status="' + status + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ans="' + idForAppend + '"/><span style="  color: #908796;padding-left: 5px" class="duplicateSignature" id="signatureCount_' + signatureCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ans="' + idForAppend + '" status="' + status + '">Duplicate</span><br>'+
				'<img src="images/delete_2.png"  class="widgetDel" id="signatureCount1_' + signatureCount + '"  data-ele="ansSignature" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px"  class="widgetDel" id="signatureCount1_' + signatureCount + '"  data-ele="ansSignature" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
				'<img src="images/edit_property.png"/ class="editIconSignature"  id="signatureCount_' + signatureCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px" class="editIconSignature"  id="signatureCount_' + signatureCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Edit Property</span><br>'+
				'<img src="images/edit_rule.png"/ class="settIcon" id="signatureCount12_' + signatureCount + '" data-Order="' + ruleOrder + '"  data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="ansSignature"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="signatureCount12_' + signatureCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="ansSignature">Edit Rule</span></span></span>'+
				'</div>'+
				'<input  type="text" style=" width: 220px;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
				'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false" class="signatureAddProperties"  id="signatureCount_' + signatureCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
				'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="signatureCount12_' + signatureCount + '" data-Order="' + ruleOrder + '"  data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="ansSignature"  draggable="false"/>'+
		'</div></div> ');
		showAddRules();
	}
});
