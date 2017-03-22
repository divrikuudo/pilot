/*************Drag and Drop of Question Answer Elements*********************/
var quesText = 0;
var addIm=0;
var textCountArr = new Array();
var dropCountArr = new Array();
var dateCountArr = new Array();
var btnCountArr = new Array();
var radioCountArr = new Array();
var checkCountArr = new Array();
var commentCountArr = new Array();
var textBoxCountArr = new Array();
var guideImgCountArr = new Array();
var sigCountArr = new Array();
var labelCountArr = new Array();
var addimCountArr = new Array();
var imuploadCountArr = new Array();
var textAreacount = 0;
var imageUploadCount = 0;
var dropDownCount = 0;
var datePickerCount = 0;
var buttonCount = 0;
var radioButton = 0;
var checkBoxCount = 0;
var commentCount = 0;
var signatureCount = 0;
var labelCount = 0;
var textBoxCount = 0;
var guideImgCount = 0;
var tempSect1=0;


function dragDropFunction() {
	$(".FCBg").draggable({
		helper: "clone",
		revert: "invalid",
		appendTo: "body",
	});
	$(".textareaVal ").droppable({
		accept: function(e) {
			if (e.hasClass('addHelpImg')) {
				return true;
			}
			if (e.hasClass('addSection')) {
				return true;
			}
		},
		drop: function(event, ui) {
			if ($(ui.draggable).hasClass('addHelpImg')) {
				showHelpFormImage();
			}
			if (($('.CLName .textareaVal').val() == '')||($('.CLName .textareaVal').val().replace(/^\s+|\s+$/g, "").length==0)) {
				$("#AlertPopupForm").modal();
			}
			else if ($(ui.draggable).hasClass('addSection')) {
				$('#SectionName').val('');
				$('#StepName').val('');
				$("#addSectionName").modal();
			}
		}
		
	});

	$(".sectName").droppable({
		accept: function(e) {
			if (e.hasClass('addHelpImg') ) {
				return true;
			}
			if (e.hasClass('addStep')) {
				$(".sectName").nextAll().removeClass("expanded").addClass("notExpanded");	
				$(".sectName").find('a.accrodionTitle i.accRightSideIcon').removeClass("icon-chevron-up").addClass("icon-chevron-down");
				return true;
			}
		},
		drop: function(event, ui) {
			if ($(ui.draggable).hasClass('addHelpImg')) {
				var clickSectHelp=$(this).find('a').attr("data-sect-count");
				var status=$(this).find('a').attr("status");
				var sect=$(this).find('a').attr("sect");
				showHelpSectionImage(clickSectHelp,status,sect);
			}
			if ($(ui.draggable).hasClass('addStep')) {
				if($(this).parent().find('textarea').val()=="" ||$(this).parent().find('textarea').val().replace(/^\s+|\s+$/g, "").length==0)
				{
					$("#AlertPopupSection").modal();
				}
				else{
					tempSect="";
					tempSect1="";
					tempSect=$(this).find('a').attr("data-server");
					tempSect1=$(this).find('a').attr("data-sect-count");
					$('#StepName_').val('');
					$("#addStepName").modal();
					var sectionName=$("#sectionText_"+tempSect).val();
					$("#SectionName_").val(sectionName);
				}

			}
		}
	});
	$(".stepName").droppable({
		accept: function(e) {
			if (e.hasClass('addHelpImg')) {
				return true;
			}
			if (e.hasClass('addQues')) {
				$(".sectName").nextAll().removeClass("notExpanded").addClass("expanded");
				$(".sectName").find('a.accrodionTitle i.accRightSideIcon').removeClass("icon-chevron-down").addClass("icon-chevron-up");
				//$(".stepName").nextAll().removeClass("expanded").addClass("notExpanded");
				//$(".stepName").find('a.accrodionTitle i.accRightSideIcon').removeClass("icon-chevron-up").addClass("icon-chevron-down");
				return true;
			}
		},
		drop: function(event, ui) {
			if ($(ui.draggable).hasClass('addHelpImg')) {
				var clickStepHelp=$(this).find('a').attr("data-step");
				var sectionID=$(this).find('a').attr("data-sect");
				var status=$(this).find('a').attr("status");
				var labelID=$(this).find('a').attr("data-stepTemp");
				var step=$(this).find('a').attr("data-step-plus");
				showHelpStepImage(clickStepHelp,sectionID,status,labelID,step);
			}
			if ($(ui.draggable).hasClass('addQues')) {
				var step=$(this).find('.stepAddBtn').attr("data-step");
				var sect=$(this).find('.stepAddBtn').attr("data-sect");
				var stepTemp=$(this).find('.stepAddBtn').attr("data-steptemp");
				var serverStep=$(this).find('.stepAddBtn').attr("data-step-plus");
				var serverSect=$(this).find('.stepAddBtn').attr("data-step-plus");
				questionAdd(step,sect,stepTemp,serverStep,serverSect);
			}
		}
	});
	$(".maindiv").droppable({
		accept: function(e) {
			if (e.hasClass('addHelpImg')) {
				return true;
			}
		},
		drop: function(event, ui) {
			if ($(ui.draggable).hasClass('addHelpImg')) {
				var clickQuesHelp=$(this).find('div').attr("data-Ques-Count");
				var sectionID=$(this).find('div').attr("helpsect");
				var stepID=$(this).find('div').attr("helpstep");
				var labelID=$(this).find('div').attr("quesCountNumber_");
				var ques=$(this).find('div').attr("data-QuesServer-Count");
				var status=$(this).find('div').attr("status");
				showHelpQuesImage(clickQuesHelp,sectionID,stepID,labelID,status,ques);
			}
		}
	});
	
	$(".ques").droppable({
		accept: function(e) {
			if (e.hasClass('txtArea') || e.hasClass('addImg')) {
				return true;
			}
			else{
				$(".ques").attr("hoverClass","drop1");
				hoverClass: "drop";
			//$(".ques").css("border-color","red");
			}
			
		},
		hoverClass: "drop",
		drop: function(event, ui) {
			if ($(ui.draggable).hasClass('txtArea')) {
				quesText++;
				if (($(this).find(".qsnText .quesTextarea").length) == 0) {
					$(this).find(".qsnText").append('<table id="quesTextarea" ><tr><td><textarea maxlength="100"  id="quesTextarea1'+quesText+'" class="quesTextarea" style="overflow: auto;width:500px; padding:5px; margin-top:4px; margin-bottom:5px; font-family:Verdana, Arial, Helvetica, sans-serif; font-size:12px; border:#d9d9d9 solid 1px;color: #999;"></textarea></td></tr></table>');
				}
			} else if ($(ui.draggable).hasClass('addImg')) {
				addIm=(addimCountArr.length)+1;
				addimCountArr.push(addIm);
				addImage_Count.push(addIm);
				var ansDiv = ($(this).attr("id"));
				var stepID = ($("#" + ansDiv).attr("data-QuesStep-Count"));
				var sectID = ($("#" + ansDiv).attr("data-QuesSect-Count"));
				var quesID = ($("#" + ansDiv).attr("data-Ques-Count"));
				if (($(this).find(".qsnText").find(".addImgDiv").length) == 0) {
					$(this).find(".qsnText").append('<div class="addImgMainDiv"   ><div class="addImgDiv" id="quesAddImageMainDiv_'+addIm+'"  >'+
							'<div class="quesAddImgSect" id="quesAddImageMainDiv">'+
							'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/add-image.png">'+
							'<p style="padding-right: 230px; padding-top: 2px;">Add Image</p>'+
							'<span class="qs" style="float: right;margin-top: -33px;margin-right:5px;"><img src="images/settings.png"/>'+
							'<span class="popover above" style="height:60px;margin-top:-71px;">'+
							'<img src="images/delete_2.png"  class="imgWidgetDel" id="addImageCount1_' + addIm + '" data-ele="quesAddImageMainDiv" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px" class="imgWidgetDel" id="addImageCount1_' + addIm + '" data-ele="quesAddImageMainDiv" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
							'</div>'+
							'<button id="img_input_' + addIm + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  class="img_input" style=" width: 120px;border: 1px solid  #d0d4dc;margin-top: 5px;margin-left: 10px;height: 25px;float:left;  background-color: #575757;color: #979797;  border-radius: 5px;">Add Image</button>'+
							'</div><input type="file"  id="file1_'+addIm+'"  name="file1" style="display:none;" /><div  id="addImagesDynamic_'+addIm+'" class="addImagesDynamic"></div>'+
					'</div>');
				}
				$(".infoIcon ,.editIcon, .imgWidgetDel").tooltip();
			}
		}
	});
	
	$(".ans").droppable({
		 hoverClass: "drop",
		accept: function(e) {
			if (e.hasClass('imgUploadAnsr') || e.hasClass('txtAreaAnsr') || e.hasClass('drpDownAnsr') || e.hasClass('ansDatePicker') || e.hasClass('btnAnsr') || e.hasClass('checkBoxAnsr') || e.hasClass('radioBtnAnsr') || e.hasClass('commentsAnsr') || e.hasClass('textBoxAnsr') || e.hasClass('signatureAnsr') || e.hasClass('labelAnsr') || e.hasClass('addGuideImg')) {
				return true;
			}
		},
		drop: function(event, ui) {
			if ($(ui.draggable).hasClass('txtAreaAnsr')) {
				ruleOrder++;
				textAreacount=(textCountArr.length)+1;
				var ansDiv = ($(this).attr("id"));
				textCountArr.push(textAreacount);
				textArea_Count.push(textAreacount);
				var stepID = ($("#" + ansDiv).attr("data-QuesStep-Count"));
				var sectID = ($("#" + ansDiv).attr("data-QuesSect-Count"));
				var quesID = ($("#" + ansDiv).attr("data-Ques-Count"));
				var status=($("#" + ansDiv).attr("status"));
				var idToAppend=($("#" + ansDiv).attr("data-Ans-Count"));
				if (($(this).find(".ansText").find(".txtAreaAns").length) == 0 || ($(this).find(".ansText").find(".txtAreaAns").length) > 0) {
					$(this).find(".ansText").append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
							'<div class="txtAreaAns textarea" id="txtAreaAns_'+textAreacount+'"  draggable="true" ondragstart="drag(event,1)">'+
							'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
							'<div class="ansTxtAreaSect">'+
							'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/text-area.png">'+
							'<p style="padding-right: 240px; padding-top: 2px;">Text Area</p>'+
							'<span class="qs" style="float: right;margin-top: -35px;margin-right:5px;"><img src="images/settings.png"/>'+
							'<span class="popover above" style="height:110px;margin-top:-125px;">'+
							'<img src="images/duplicate.png" class="duplicateTextArea" id="textRulesCount_' + textAreacount + '" data-ans="' + idToAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '" data-ele="txtAreaAns"/><span style="color: #908796;padding-left: 5px" class="duplicateTextArea" id="textRulesCount_' + textAreacount + '" data-ans="' + idToAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '" data-ele="txtAreaAns">Duplicate</span><br>'+
							'<img src="images/delete_2.png"  class="widgetDel" id="textCount1_' + textAreacount + '" data-ele="txtAreaAns" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><a style="  color: #908796;padding-left: 5px" class="widgetDel" id="textCount1_' + textAreacount + '" data-ele="txtAreaAns" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</a><br>'+
							'<img src="images/edit_property.png"/ id="textCount_' + textAreacount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  class="editIconTextArea"><a style="  color: #908796;padding-left: 5px" id="textCount_' + textAreacount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  class="editIconTextArea">Edit Property</a><br>'+
							'<img src="images/edit_rule.png"/ class="settIcon" id="textRulesCount12_' + textAreacount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="txtAreaAns"><a style="  color: #908796;padding-left: 5px" class="settIcon" id="textRulesCount12_' + textAreacount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="txtAreaAns">Edit Rule</a></span></span>'+
							'</div>'+
							'<input  type="text" style=" width:60%;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
							'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false" class="TAAddProperties"  id="textCount_' + textAreacount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
							'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="textRulesCount12_' + textAreacount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '" data-ele="txtAreaAns"  draggable="false"/>'+
					'</div></div> ');
				}
			} else if ($(ui.draggable).hasClass('imgUploadAnsr')) {
				ruleOrder++;
				imageUploadCount=(imuploadCountArr.length)+1;
				imuploadCountArr.push(imageUploadCount);
				imageUpload_Count.push(imageUploadCount);
				var ansDiv = ($(this).attr("id"));
				var stepID = ($("#" + ansDiv).attr("data-QuesStep-Count"));
				var sectID = ($("#" + ansDiv).attr("data-QuesSect-Count"));
				var quesID = ($("#" + ansDiv).attr("data-Ques-Count"));
				var status=($("#" + ansDiv).attr("status"));
				var idToAppend=($("#" + ansDiv).attr("data-Ans-Count"));
				if (($(this).find(".ansText").find(".ansImgUploadDiv").length) == 0) {
					$(this).find(".ansText").append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
							'<div class="txtAreaAns imageupload" id="ansImgUploadMainDiv_'+imageUploadCount+ '" draggable="true" ondragstart="drag(event,1)">'+
							'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
							'<div class="ansTxtAreaSect">'+
							'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/upload-image.png">'+
							'<p style="padding-right: 210px; padding-top: 2px;">Upload Image</p>'+
							'<span class="qs" style="float: right;margin-top: -35px;margin-right:5px;"><img src="images/settings.png"/>'+
							'<span class="popover above" style="height:110px;margin-top:-125px;">'+
							'<img src="images/duplicate.png" class="duplicateImageUpload" id="imageUpCount_' + imageUploadCount + '" data-ans="' + idToAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '" data-ele="ansImgUploadMainDiv"/><span style="  color: #908796;padding-left: 5px" class="duplicateImageUpload" id="imageUpCount_' + imageUploadCount + '" data-ans="' + idToAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '" data-ele="ansImgUploadMainDiv">Duplicate</span><br>'+
							'<img src="images/delete_2.png"  class="imgWidgetDel" id="imageUpCount1_' + imageUploadCount + '"  data-ele="ansImgUploadMainDiv" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px" class="imgWidgetDel" id="imageUpCount1_' + imageUploadCount + '"  data-ele="ansImgUploadMainDiv" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
							'<img src="images/edit_property.png"/ class="editIconImageUpload"  id="imageUpCount_' + imageUploadCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px" class="editIconImageUpload"  id="imageUpCount_' + imageUploadCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Edit Property</span><br>'+
							'</div>'+
							'<input  type="text" style=" width:60%;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
							'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false" class="IUAddProperties"  id="imageUpCount_' + imageUploadCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
					'</div></div> ');
				}
			} else if ($(ui.draggable).hasClass('ansDatePicker')) {
				ruleOrder++;
				datePickerCount=(dateCountArr.length)+1;
				dateCountArr.push(datePickerCount);
				datePicker_Count.push(datePickerCount);
				var ansDiv = ($(this).attr("id"));
				var stepID = ($("#" + ansDiv).attr("data-QuesStep-Count"));
				var sectID = ($("#" + ansDiv).attr("data-QuesSect-Count"));
				var quesID = ($("#" + ansDiv).attr("data-Ques-Count"));
				var status=($("#" + ansDiv).attr("status"));
				var idToAppend=($("#" + ansDiv).attr("data-Ans-Count"));
				if (($(this).find(".ansText").find(".ansDate").length) == 0 || ($(this).find(".ansText").find(".ansDate").length) > 0) {
					$(this).find(".ansText").append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
							'<div class="txtAreaAns date_Picker" id="ansDate_'+datePickerCount+ '" draggable="true" ondragstart="drag(event,1)">'+
							'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
							'<div class="ansTxtAreaSect">'+
							'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/date-picker.png">'+
							'<p style="padding-right: 210px; padding-top: 2px;">Date Picker</p>'+
							'<span class="qs" style="float: right;margin-top: -35px;margin-right:5px;"><img src="images/settings.png"/>'+
							'<span class="popover above" style="height:110px;margin-top:-125px;">'+
							'<img src="images/duplicate.png" class="duplicateDatePicker" id="datePickerCount_' + datePickerCount + '" data-ans="' + idToAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '" /><span style="  color: #908796;padding-left: 5px" class="duplicateDatePicker" id="datePickerCount_' + datePickerCount + '" data-ans="' + idToAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '">Duplicate</span><br>'+
							'<img src="images/delete_2.png"  class="widgetDel" id="datePickerCount1_' + datePickerCount + '"  data-ele="ansDate" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px" class="widgetDel" id="datePickerCount1_' + datePickerCount + '"  data-ele="ansDate" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
							'<img src="images/edit_property.png"/ class="editIconDatePicker"  id="datePickerCount_' + datePickerCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px" class="editIconDatePicker"  id="datePickerCount_' + datePickerCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Edit Property</span><br>'+
							'<img src="images/edit_rule.png"/ class="settIcon" id="datePickerCount12_' + datePickerCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="ansDate"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="datePickerCount12_' + datePickerCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="ansDate">Edit Rule</span></span></span>'+
							'</div>'+
							'<input  type="date" class="datepicker"  id="date_'+datePickerCount+ '" style=" width: 60%;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
							'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false" class="DPAddProperties"  id="datePickerCount_' + datePickerCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
							'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="datePickerCount12_' + datePickerCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  data-Order="' + ruleOrder + '"  data-ele="ansDate"  draggable="false"/>'+
					'</div></div> ');
				}
			} else if ($(ui.draggable).hasClass('drpDownAnsr')) {
				ruleOrder++;
				dropDownCount=(dropCountArr.length)+1;
				dropCountArr.push(dropDownCount);
				dropDown_Count.push(dropDownCount);
				var ansDiv = ($(this).attr("id"));
				var stepID = ($("#" + ansDiv).attr("data-QuesStep-Count"));
				var sectID = ($("#" + ansDiv).attr("data-QuesSect-Count"));
				var quesID = ($("#" + ansDiv).attr("data-Ques-Count"));
				var status=($("#" + ansDiv).attr("status"));
				var idToAppend=($("#" + ansDiv).attr("data-Ans-Count"));
				if (($(this).find(".ansText").find(".ansDrpDown").length) == 0 || ($(this).find(".ansText").find(".ansDrpDown").length) > 0) {
					$(this).find(".ansText").append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
							'<div class="txtAreaAns dropdown" id="ansDrpDown_'+dropDownCount+ '" draggable="true" ondragstart="drag(event,1)">'+
							'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
							'<div class="ansTxtAreaSect">'+
							'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/drop-down.png">'+
							'<p style="padding-right: 210px; padding-top: 2px;">Drop Down</p>'+
							'<span class="qs" style="float: right;margin-top: -35px;margin-right:5px;"><img src="images/settings.png"/>'+
							'<span class="popover above" style="height:110px;margin-top:-125px;">'+
							'<img src="images/duplicate.png" class="duplicateDropDown" id="dropDownCount_' + dropDownCount + '" data-ans="' + idToAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '"/><span style="  color: #908796;padding-left: 5px" class="duplicateDropDown" id="dropDownCount_' + dropDownCount + '" data-ans="' + idToAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '">Duplicate</span><br>'+
							'<img src="images/delete_2.png"  class="widgetDel" id="dropDownCount1_' + dropDownCount + '"  data-ele="ansDrpDown" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px" class="widgetDel" id="dropDownCount1_' + dropDownCount + '"  data-ele="ansDrpDown" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
							'<img src="images/edit_property.png"/ class="editIconDropDown"  id="dropDownCount_' + dropDownCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px" class="editIconDropDown"  id="dropDownCount_' + dropDownCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Edit Property</span><br>'+
							'<img src="images/edit_rule.png"/ class="settIcon" id="dropDownCount12_' + dropDownCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="ansDrpDown"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="dropDownCount12_' + dropDownCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="ansDrpDown">Edit Rule</span></span></span>'+
							'</div>'+
							'<select style=" width: 60%;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"><option></option></select>'+
							'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false" class="DDAddProperties"   id="dropDownCount_' + dropDownCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
							'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="dropDownCount12_' + dropDownCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="ansDrpDown"  draggable="false"/>'+
					'</div></div> ');
				}
			} else if ($(ui.draggable).hasClass('btnAnsr')) {
				ruleOrder++;
				buttonCount=(btnCountArr.length)+1;
				btnCountArr.push(buttonCount);
				btn_Count.push(buttonCount);
				var ansDiv = ($(this).attr("id"));
				var stepID = ($("#" + ansDiv).attr("data-QuesStep-Count"));
				var sectID = ($("#" + ansDiv).attr("data-QuesSect-Count"));
				var quesID = ($("#" + ansDiv).attr("data-Ques-Count"));
				var status=($("#" + ansDiv).attr("status"));
				var idToAppend=($("#" + ansDiv).attr("data-Ans-Count"));
				if (($(this).find(".ansText").find(".ansBtn").length) == 0 || ($(this).find(".ansText").find(".ansBtn").length) > 0) {
					$(this).find(".ansText").append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
							'<div class="txtAreaAns button" id="ansBtn_'+buttonCount+ '" draggable="true" ondragstart="drag(event,1)">'+
							'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
							'<div class="ansTxtAreaSect">'+
							'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/text-box.png">'+
							'<p style="padding-right: 210px; padding-top: 2px;">Button</p>'+
							'<span class="qs" style="float: right;margin-top: -35px;margin-right:5px;"><img src="images/settings.png"/>'+
							'<span class="popover above" style="height:110px;margin-top:-125px;">'+
							'<img src="images/duplicate.png" class="duplicateButton" id="btnCount_' + buttonCount + '" data-ans="' + idToAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" /><span style="  color: #908796;padding-left: 5px" class="duplicateButton" id="btnCount_' + buttonCount + '" data-ans="' + idToAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Duplicate</span><br>'+
							'<img src="images/delete_2.png"  class="widgetDel" id="btnCount1_' + buttonCount + '"  data-ele="ansBtn" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px"  class="widgetDel" id="btnCount1_' + buttonCount + '"  data-ele="ansBtn" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
							'<img src="images/edit_property.png"/ class="editIconBtn"  id="btnCount_' + buttonCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px" class="editIconBtn"  id="btnCount_' + buttonCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Edit Property</span><br>'+
							'<img src="images/edit_rule.png"/ class="settIcon" id="btnCount12_' + buttonCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="ansBtn"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="btnCount12_' + buttonCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="ansBtn">Edit Rule</span></span></span>'+
							'</div>'+
							'<input  type="text" style=" width: 60%;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
							'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false" class="BtnAddProperties"  id="btnCount_' + buttonCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
							'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="btnCount12_' + buttonCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"  data-Order="' + ruleOrder + '" data-ele="ansBtn"  draggable="false"/>'+
					'</div></div> ');
				}
			} else if ($(ui.draggable).hasClass('radioBtnAnsr')) {
				ruleOrder++;
				radioButton=(radioCountArr.length)+1;
				radioCountArr.push(radioButton);
				radio_Count.push(radioButton);
				var ansDiv = ($(this).attr("id"));
				var stepID = ($("#" + ansDiv).attr("data-QuesStep-Count"));
				var sectID = ($("#" + ansDiv).attr("data-QuesSect-Count"));
				var quesID = ($("#" + ansDiv).attr("data-Ques-Count"));
				var status=($("#" + ansDiv).attr("status"));
				var idToAppend=($("#" + ansDiv).attr("data-Ans-Count"));
				if (($(this).find(".ansText").find(".ansRadioBtn").length) == 0 || ($(this).find(".ansText").find(".ansRadioBtn").length) > 0) {
					$(this).find(".ansText").append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
							'<div class="txtAreaAns radio_button" id="ansRadioBtn_'+radioButton+ '" draggable="true" ondragstart="drag(event,1)">'+
							'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
							'<div class="ansTxtAreaSect">'+
							'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/radio-button.png">'+
							'<p style="padding-right: 210px; padding-top: 2px;">Radio Button</p>'+
							'<span class="qs" style="float: right;margin-top: -35px;margin-right:5px;"><img src="images/settings.png"/>'+
							'<span class="popover above" style="height:110px;margin-top:-125px;">'+
							'<img src="images/duplicate.png" class="duplicateRadioButton" id="radioButtonCount_' + radioButton + '" data-ans="' + idToAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '"/><span style="  color: #908796;padding-left: 5px" class="duplicateRadioButton" id="radioButtonCount_' + radioButton + '" data-ans="' + idToAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '">Duplicate</span><br>'+
							'<img src="images/delete_2.png"  class="widgetDel" id="radioButtonCount1_' + radioButton + '"  data-ele="ansRadioBtn" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px" class="widgetDel" id="radioButtonCount1_' + radioButton + '"  data-ele="ansRadioBtn" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
							'<img src="images/edit_property.png"/ class="editIconRadioButton"  id="radioButtonCount_' + radioButton + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px" class="editIconRadioButton"  id="radioButtonCount_' + radioButton + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Edit Property</span><br>'+
							'<img src="images/edit_rule.png"/ class="settIcon" id="radioButtonCount12_' + radioButton + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="ansRadioBtn" data-Order="' + ruleOrder + '" ><span style="  color: #908796;padding-left: 5px" class="settIcon" id="radioButtonCount12_' + radioButton + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="ansRadioBtn">Edit Rule</span></span></span>'+
							'</div>'+
							'<input  type="radio" name="radio_" style=" width: 60%;border: 1px dotted #d0d4dc;margin-top:7px;margin-left: 10px;height: 25px;float:left;"/>'+
							'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false" class="RadioAddProperties"  id="radioButtonCount_' + radioButton + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
							'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="radioButtonCount12_' + radioButton + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="ansRadioBtn"  draggable="false"/>'+
					'</div></div> ');
				}
			} else if ($(ui.draggable).hasClass('checkBoxAnsr')) {
				ruleOrder++;
				checkBoxCount=(checkCountArr.length)+1;
				checkCountArr.push(checkBoxCount);
				chk_Count.push(checkBoxCount);
				var ansDiv = ($(this).attr("id"));
				var stepID = ($("#" + ansDiv).attr("data-QuesStep-Count"));
				var sectID = ($("#" + ansDiv).attr("data-QuesSect-Count"));
				var quesID = ($("#" + ansDiv).attr("data-Ques-Count"));
				var status=($("#" + ansDiv).attr("status"));
				var idToAppend=($("#" + ansDiv).attr("data-Ans-Count"));
				if (($(this).find(".ansText").find(".anscheckBox").length) == 0 || ($(this).find(".ansText").find(".anscheckBox").length) > 0) {
					$(this).find(".ansText").append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
							'<div class="txtAreaAns check_BOX" id="anscheckBox_'+checkBoxCount+ '" draggable="true" ondragstart="drag(event,1)">'+
							'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
							'<div class="ansTxtAreaSect">'+
							'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/checkbox.png">'+
							'<p style="padding-right: 210px; padding-top: 2px;">Checkbox</p>'+
							'<span class="qs" style="float: right;margin-top: -35px;margin-right:5px;"><img src="images/settings.png"/>'+
							'<span class="popover above" style="height:110px;margin-top:-125px;">'+
							'<img src="images/duplicate.png" class="duplicateCheckBox" id="checkBoxCount_' + checkBoxCount + '" data-ans="' + idToAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" /><span style="  color: #908796;padding-left: 5px" class="duplicateCheckBox" id="checkBoxCount_' + checkBoxCount + '" data-ans="' + idToAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Duplicate</span><br>'+
							'<img src="images/delete_2.png"  class="widgetDel" id="checkBoxCount1_' + checkBoxCount + '"  data-ele="anscheckBox" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px"  class="widgetDel" id="checkBoxCount1_' + checkBoxCount + '"  data-ele="anscheckBox" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
							'<img src="images/edit_property.png"/ class="editIconCheckBox"  id="checkBoxCount_' + checkBoxCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px" class="editIconCheckBox"  id="checkBoxCount_' + checkBoxCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Edit Property</span><br>'+
							'<img src="images/edit_rule.png"/ class="settIcon" id="checkBoxCount12_' + checkBoxCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="anscheckBox"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="checkBoxCount12_' + checkBoxCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="anscheckBox">Edit Rule</span></span></span>'+
							'</div>'+
							'<input  type="checkbox" name="checkbox_" style=" width: 60%;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
							'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false" class="CheckboxAddProperties"  id="checkBoxCount_' + checkBoxCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
							'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="checkBoxCount12_' + checkBoxCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '" data-ele="anscheckBox"  draggable="false"/>'+
					'</div></div> ');
				}
			} else if ($(ui.draggable).hasClass('commentsAnsr')) {
				commentCount++;
				commentCountArr.push(commentCount);
				var ansDiv=($(this ).attr("id"));
				var stepID=($("#"+ansDiv).attr("data-QuesStep-Count"));
				var sectID=($("#"+ansDiv).attr("data-QuesSect-Count"));
				var quesID=($("#"+ansDiv).attr("data-Ques-Count"));
				if (($(this).find(".ansText").find(".ansCommentBox").length) == 0 || ($(this).find(".ansText").find(".ansCommentBox").length) > 0) {
					$(this).find(".ansText").append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" ><div class="ansCommentBox" id="ansCommentBox" draggable="true" ondragstart="drag(event,1)"><div class="ansCommentBoxSect"><img src="images/comments_icon.png" /><br/><a>Comment Box</a></div><div class="addRules"></br><a  class="addRulesLink" id="commentCount_' + commentCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="ansCommentBox"  draggable="false">Add Rules</a></br><a   draggable="false" class="commentBoxAddProperties"></a></div><div class="gearEditDel"><a rel="tooltip" title="Settings" class="settIcon" id="commentCount_' + commentCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="ansCommentBox"><i class="icon-cog"></i></a><a rel="tooltip" title="Edit" class="editIcon"><i class="icon-edit"></i></a><a rel="tooltip" title="Delete" class="widgetDel" id="commentCount_' + commentCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="ansCommentBox"><i class="icon-trash"></i></a></div></div></div>');
				}
			} else if ($(ui.draggable).hasClass('textBoxAnsr')) {
				ruleOrder++;
				textBoxCount=(textBoxCountArr.length)+1;
				textBoxCountArr.push(textBoxCount);
				textbox_Count.push(textBoxCount);
				var ansDiv = ($(this).attr("id"));
				var stepID = ($("#" + ansDiv).attr("data-QuesStep-Count"));
				var sectID = ($("#" + ansDiv).attr("data-QuesSect-Count"));
				var quesID = ($("#" + ansDiv).attr("data-Ques-Count"));
				var status=($("#" + ansDiv).attr("status"));
				var idToAppend=($("#" + ansDiv).attr("data-Ans-Count"));
				if (($(this).find(".ansText").find(".textBox").length) == 0 || ($(this).find(".ansText").find(".textBox").length) > 0) {
					$(this).find(".ansText").append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
							'<div class="txtAreaAns textbox" id="textBox_'+textBoxCount+ '" draggable="true" ondragstart="drag(event,1)">'+
							'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
							'<div class="ansTxtAreaSect">'+
							'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/text-box.png">'+
							'<p style="padding-right: 210px; padding-top: 2px;">Text box</p>'+
							'<span class="qs" style="float: right;margin-top: -35px;margin-right:5px;"><img src="images/settings.png"/>'+
							'<span class="popover above" style="height:110px;margin-top:-125px;">'+
							'<img src="images/duplicate.png" class="duplicateTextBox" id="textBoxCount_' + textBoxCount + '" data-ans="' + idToAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '"/><span style="  color: #908796;padding-left: 5px" class="duplicateTextBox" id="textBoxCount_' + textBoxCount + '" data-ans="' + idToAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '">Duplicate</span><br>'+
							'<img src="images/delete_2.png"  class="widgetDel" id="textBoxCount1_' + textBoxCount + '"  data-ele="textBox" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px" class="widgetDel" id="textBoxCount1_' + textBoxCount + '"  data-ele="textBox" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
							'<img src="images/edit_property.png"/ class="editIconTextBox"  id="textBoxCount_' + textBoxCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px" class="editIconTextBox"  id="textBoxCount_' + textBoxCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Edit Property</span><br>'+
							'<img src="images/edit_rule.png"/ class="settIcon" id="textBoxCount12_' + textBoxCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="textBox"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="textBoxCount12_' + textBoxCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="textBox">Edit Rule</span></span></span>'+
							'</div>'+
							'<input  type="text" style=" width: 60%;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
							'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false" class="textBoxAddProperties"  id="textBoxCount_' + textBoxCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
							'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="textBoxCount12_' + textBoxCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '" data-ele="textBox"  draggable="false"/>'+
					'</div></div> ');
				}
			} else if ($(ui.draggable).hasClass('signatureAnsr')) {
				ruleOrder++;
				signatureCount=(sigCountArr.length)+1;
				sigCountArr.push(signatureCount);
				sig_Count.push(signatureCount);
				var ansDiv = ($(this).attr("id"));
				var stepID = ($("#" + ansDiv).attr("data-QuesStep-Count"));
				var sectID = ($("#" + ansDiv).attr("data-QuesSect-Count"));
				var quesID = ($("#" + ansDiv).attr("data-Ques-Count"));
				var status=($("#" + ansDiv).attr("status"));
				var idToAppend=($("#" + ansDiv).attr("data-Ans-Count"));
				if (($(this).find(".ansText").find(".ansSignature").length) == 0 || ($(this).find(".ansText").find(".ansSignature").length) > 0) {
					$(this).find(".ansText").append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
							'<div class="txtAreaAns signature" id="ansSignature_'+signatureCount+ '" draggable="true" ondragstart="drag(event,1)">'+
							'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
							'<div class="ansTxtAreaSect">'+
							'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/signature.png">'+
							'<p style="padding-right: 210px; padding-top: 2px;">Signature</p>'+
							'<span class="qs" style="float: right;margin-top: -35px;margin-right:5px;"><img src="images/settings.png"/>'+
							'<span class="popover above" style="height:110px;margin-top:-125px;">'+
							'<img src="images/duplicate.png" class="duplicateSignature" id="signatureCount_' + signatureCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ans="' + idToAppend + '" status="' + status + '"/><span style="  color: #908796;padding-left: 5px" class="duplicateSignature" id="signatureCount_' + signatureCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ans="' + idToAppend + '" status="' + status + '">Duplicate</span><br>'+
							'<img src="images/delete_2.png"  class="widgetDel" id="signatureCount1_' + signatureCount + '"  data-ele="ansSignature" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px" class="widgetDel" id="signatureCount1_' + signatureCount + '"  data-ele="ansSignature" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
							'<img src="images/edit_property.png"/ class="editIconSignature"  id="signatureCount_' + signatureCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px" class="editIconSignature"  id="signatureCount_' + signatureCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Edit Property</span><br>'+
							'<img src="images/edit_rule.png"/ class="settIcon" id="signatureCount12_' + signatureCount + '" data-Order="' + ruleOrder + '"  data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="ansSignature"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="signatureCount12_' + signatureCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="ansSignature">Edit Rule</span></span></span>'+
							'</div>'+
							'<input  type="text" style=" width: 60%;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
							'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false" class="signatureAddProperties"  id="signatureCount_' + signatureCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
							'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="signatureCount12_' + signatureCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '" data-ele="ansSignature"  draggable="false"/>'+
					'</div></div> ');
				}
			} else if ($(ui.draggable).hasClass('labelAnsr')) {
				ruleOrder++;
				labelCount=(labelCountArr.length)+1;
				labelCountArr.push(labelCount);
				label_Count.push(labelCount);
				var ansDiv = ($(this).attr("id"));
				var stepID = ($("#" + ansDiv).attr("data-QuesStep-Count"));
				var sectID = ($("#" + ansDiv).attr("data-QuesSect-Count"));
				var quesID = ($("#" + ansDiv).attr("data-Ques-Count"));
				var status=($("#" + ansDiv).attr("status"));
				var idToAppend=($("#" + ansDiv).attr("data-Ans-Count"));
				if (($(this).find(".ansText").find(".label").length) == 0 || ($(this).find(".ansText").find(".label").length) > 0) {
					$(this).find(".ansText").append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
							'<div class="txtAreaAns labelClass" id="label_'+labelCount+ '" draggable="true" ondragstart="drag(event,1)">'+
							'<div style="  background-color: #F2f3f4; padding-left: 365px;"><img src="images/drag-2.png"/></div>'+
							'<div class="ansTxtAreaSect">'+
							'<img style="float: left;padding-top: 5px;padding-left: 10px;" src="images/label.png">'+
							'<p style="padding-right: 210px; padding-top: 2px;">Label</p>'+
							'<span class="qs" style="float: right;margin-top: -35px;margin-right:5px;"><img src="images/settings.png"/>'+
							'<span class="popover above" style="height:110px;margin-top:-125px;">'+
							'<img src="images/duplicate.png" class="duplicateLabel" id="labelCount_' + labelCount + '" data-ans="' + idToAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" /><span style="  color: #908796;padding-left: 5px" class="duplicateLabel" id="labelCount_' + labelCount + '" data-ans="' + idToAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Duplicate</span><br>'+
							'<img src="images/delete_2.png"  class="widgetDel" id="labelCount1_' + labelCount + '"  data-ele="label"  data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px" class="widgetDel" id="labelCount1_' + labelCount + '"  data-ele="label"  data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
							'<img src="images/edit_property.png"/ class="editIconLabel"    id="labelCount_' + labelCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px" class="editIconLabel"    id="labelCount_' + labelCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" >Edit Property</span><br>'+
							'<img src="images/edit_rule.png"/ class="settIcon" id="labelCount12_' + labelCount + '" data-Order="' + ruleOrder + '"  data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-ele="label"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="labelCount12_' + labelCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="label">Edit Rule</span></span></span>'+
							'</div>'+
							'<input  type="text" style=" width: 60%;border: 1px dotted #d0d4dc;margin-top: 7px;margin-left: 10px;height: 25px;float:left;"/>'+
							'<img src="images/add_property.png" style="margin-left: 15px;margin-top: 9px;float: left;"  draggable="false"  class="labelAddProperties" id="labelCount_' + labelCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/>'+
							'<img src="images/add_rule.png" style="  margin-right: 25px;margin-top: 7px;float: right;"  Class="addRulesLink" id="labelCount12_' + labelCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '" data-ele="label"  draggable="false"/>'+
					'</div></div> ');
				}
			} else if($(ui.draggable).hasClass('addGuideImg')){
				ruleOrder++;
				guideImgCount=(guideImgCountArr.length)+1;
				guideImgCountArr.push(guideImgCount);
				guideImg_Count.push(guideImgCount);
				var ansDiv = ($(this).attr("id"));
				var stepID = ($("#" + ansDiv).attr("data-QuesStep-Count"));
				var sectID = ($("#" + ansDiv).attr("data-QuesSect-Count"));
				var quesID = ($("#" + ansDiv).attr("data-Ques-Count"));
				var status=($("#" + ansDiv).attr("status"));
				var idToAppend=($("#" + ansDiv).attr("data-Ans-Count"));
				if (($(this).find(".ansText").find(".guideImgbox").length) == 0 || ($(this).find(".ansText").find(".guideImgbox").length) > 0) {
					$(this).find(".ansText").append('<div ondrop="dropping(event)" ondragover="allowDrop(event)" >'+
							'<div class="guideImgbox" id="guidImgBox_'+guideImgCount+ '" draggable="true" ondragstart="drag(event,1)">'+
							'<div class="dragIcon"><img src="images/drag-2.png"/></div>'+
							'<div class="ansTxtAreaSect">'+
							'<img style="float: left;padding-top: 4px;padding-left: 10px;" src="images/Icon_guide-Image.png">'+
							'<p>Guide Image</p>'+
							'<span class="qs" style="float: right; margin-top: -4px;"><img src="images/settings.png"/>'+
							'<span class="popover above" style="height:110px;margin-top:-125px;">'+
							//'<img src="images/duplicate.png" class="" id="guideImgBoxCount_' + guideImgCount + '" data-ans="' + idToAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '"/><span style="  color: #908796;padding-left: 5px" class="duplicateGuideBox" id="guideImgBox_' + guideImgCount + '" data-ans="' + idToAppend + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" status="' + status + '">Duplicate</span><br>'+
							'<img src="images/delete_2.png"  class="widgetDel" id="guideImgBoxCount1_' + guideImgCount + '"  data-ele="guideImgBox" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"/><span style="  color: #908796;padding-left: 5px" class="widgetDel" id="guideImgBox1_' + guideImgCount + '"  data-ele="guideImgBox" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Delete</span><br>'+
							'<img src="images/edit_property.png"/   id="guideImgBoxCount_' + guideImgCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" ><span style="  color: #908796;padding-left: 5px" class="editIconGuideImg"  id="guideImgBox_' + guideImgCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '">Edit Property</span><br>'+
							'<img src="images/edit_rule.png"/ class="settIcon" id="guideImgBoxCount12_' + guideImgCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="textBox"><span style="  color: #908796;padding-left: 5px" class="settIcon" id="guideImgBox12_' + guideImgCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '"  data-ele="guideImgBox">Edit Rule</span></span></span>'+
							'</div>'+
							'<div class=\"addImgMainDiv addGuideImg\"><div class=\"addImg\"><a href=\"#no\" id="img_input_form_guide" class=\"btn btn-primary img_input_form_guide\">+ Add Image</a></div></div><img id=\"trialImg\" src=\"\" style=\"display: none\" /><input type=\"file\"  class="file1_form_guide" name=\"file2\" style=\"display: none;\" />'+
							'<div id=\"addFormImage_\" class=\"addImagesDynamic\"></div>'+
							'<ul class=\"propRules\"><li><a href="#no" draggable="false" class="guideImgBoxProperties"  id="guideImgBox_' + guideImgCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '"><img src="images/add_property.png" style="float: left;"/> Add Property</a></li><li><a href="#no" Class="addRulesLink" id="guideImgBox12_' + guideImgCount + '" data-Ques="' + quesID + '" data-Step="' + stepID + '" data-Sect="' + sectID + '" data-Order="' + ruleOrder + '" data-ele="guideImgBox"  draggable="false"><img src="images/add_rule.png" style="float: left;"/>Add Rule</a></li></ul>'+	
							'</div></div>');}
			}
			
            $(".settIcon ,.editIcon, .imgWidgetDel, .infoIcon").tooltip();
            showAddRules();
        }
    });

}