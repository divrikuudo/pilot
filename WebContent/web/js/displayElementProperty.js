/*************Display of Element Properties *********************/
var textAreaObject = new Object();
var textAreaJsonArr = new Array();
var imageUploadObject = new Object();
var imageUploadJsonArr = new Array();
var datePickerObject = new Object();
var datePickerJsonArr = new Array();
var buttonObject = new Object();
var buttonJsonArr = new Array();
var checkBoxObject = new Object();
var checkBoxJsonArr = new Array();
var radioButtonObject = new Object();
var radioButtonJsonArr = new Array();
var DropDownObject = new Object();
var dropDownJsonArr = new Array();
var textBoxObject = new Object();
var textBoxJsonArr = new Array();
var labelObject = new Object();
var labelJsonArr = new Array();
var signatureObject = new Object();
var signatureJsonArr = new Array();
var guideImgObject = new Object();
var guideImgJsonArr = new Array();

function savePropertiesImageUpload(ImageUpPropObject) {
	startiLoaderSpiner();
	$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
	var serverbaseUrl = getServerPath();
	$.ajax({
		type: "GET",
		url: serverbaseUrl + Application.checklistServices.elementPropertiesList + "/4",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(response) {
			stopiLoaderSpiner();
			$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
			imageUplaodFunction(response, ImageUpPropObject);
		},
	});
}
function imageUplaodFunction(response, ImageUpPropObject) {
	var name_value = "";
	var answer_label_value = "";
	var mandatory_value = "";
	var maxImages_value = "";
	var disabled_value = "";
	var imageType_value = "";
	var disFlag=0;
	var mandFlag=0;
	var imFlag=0;
	var disArr = new Array();
	var disabled_id="";
	var imageArr = new Array();
	var imageType_id="";
	var mandatoryArr =  new Array();
	var mandatory_id="";
	$("#IUaddPropertiesPopup").modal();
	var htmlAddress = "";
	$("#imageUploadId").empty();
	resultObject = response.resultSet.propertiesList;
	var imageUpNumber = ImageUpPropObject.ImageUpCountID.replace('imageUpCount_', '');
	for(var i=0;i< response.resultSet.propertiesList.length;i++){
		if(resultObject[i].attributeId=="59"){
			disArr=resultObject[i].defaultValues.split(",");
			disabled_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="44"){
			answer_label_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="31"){
			maxImages_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="58"){
			mandatoryArr=resultObject[i].defaultValues.split(",");
			mandatory_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="30"){
			imageArr=resultObject[i].defaultValues.split(",");
			imageType_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="29"){
			name_id = resultObject[i].attributeId;
		}
	}
	for (var i = 0; i < imageUploadJsonArr.length; i++) {
		if (imageUpNumber == imageUploadJsonArr[i].imageUpNum) {
			for (var k = 0; k < imageUploadJsonArr[i].imageUpPropArr.length; k++) {
				if (imageUploadJsonArr[i].imageUpPropArr[k].name == "Name") {
					name_value = imageUploadJsonArr[i].imageUpPropArr[k].value;
				} else if (imageUploadJsonArr[i].imageUpPropArr[k].name == "ImageType") {
					imageType_value = imageUploadJsonArr[i].imageUpPropArr[k].value;
				} else if (imageUploadJsonArr[i].imageUpPropArr[k].name =="MaxnoofImages") {
					maxImages_value = imageUploadJsonArr[i].imageUpPropArr[k].value;
				} else if (imageUploadJsonArr[i].imageUpPropArr[k].name == "Disabled") {
					disabled_value = imageUploadJsonArr[i].imageUpPropArr[k].value;
				} else if (imageUploadJsonArr[i].imageUpPropArr[k].name == "AnswerLabel") {
					answer_label_value = imageUploadJsonArr[i].imageUpPropArr[k].value;
				} else if (imageUploadJsonArr[i].imageUpPropArr[k].name == "Mandatory") {
					mandatory_value = imageUploadJsonArr[i].imageUpPropArr[k].value;
				} else {

				}
			}
		}
	}
	htmlAddress += "<table style=\"width: 100%;\"><tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 6px;\">Answer label</td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"text\" value='" + answer_label_value + "' id=\"answer_label_" + answer_label_id + "\"  ></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 15px;\">Image Type <span style=\"font-size:20px;\">*<span></td>"; 
	htmlAddress += "<td style=\"width: 50%;\"> <select  class=\"type_image\" id=\"imageType_" + imageType_id + "\"  style=\"width:108%;\"></select></td></tr></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;\">Max Images <span style=\"font-size:20px;\">*<span></td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"number\" min=\"1\" class=\"max_image\" value='" + maxImages_value + "' id=\"maxImages_" + maxImages_id + "\"  required=\"true\"></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 15px;\">Mandatory</td>";
	htmlAddress += "<td style=\"width: 50%;\"> <select id=\"mandatory_" + mandatory_id + "\" style=\"width:108%;\"></select></td></tr></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 32px;\">Name <span style=\"font-size:20px;\">*<span></td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"text\"  class=\"name_image\"  value='" + name_value + "' id=\"name_" + name_id + "\" required=\"true\"></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 25px;\">Disabled</td>";
	htmlAddress += "<td style=\"width: 50%;\"> <select id=\"disabled_" + disabled_id + "\"  style=\"width:108%;\"></select></td></tr></tr>";
	htmlAddress += "</table>";
	$("#imageUploadId").append(htmlAddress);
	disabledAttributeDisplay(disArr,disabled_value,disabled_id,disFlag);
	mandatoryAttributeDisplay(mandatoryArr,mandatory_value,mandatory_id,mandFlag);
	imageTypeAttributeDisplay(imageArr,imageType_value,imageType_id,imFlag);
	imageUploadObject.name_id = name_id;
	imageUploadObject.answer_label_id = answer_label_id;
	imageUploadObject.maxImages_id = maxImages_id;
	imageUploadObject.disabled_id = disabled_id;
	imageUploadObject.mandatory_id = mandatory_id;
	imageUploadObject.imageType_id = imageType_id;
	$("#imageUpFooter").empty();
	var html1 = "";
	html1 += "<button type=\"button\"  id=\"saveImageUpNum_" + imageUpNumber + "\" data-sect='" + ImageUpPropObject.sectID + "' data-step='" + ImageUpPropObject.stepID + "' data-ques='" + ImageUpPropObject.quesID + "'   class=\"btn btn-primary pull-left saveAddPropertiesImageUploadBtn\">Done</button>";
	html1 += "<button type=\"button\" data-dismiss=\"modal\" class=\"btn btnCancel pull-right\">Cancel</button>";
	$("#imageUpFooter").append(html1);
}

function savePropertiesGuideImg(guideImgPropObject) {
	startiLoaderSpiner();
	$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
	var serverbaseUrl = getServerPath();
	$.ajax({
		type: "GET",
		url: serverbaseUrl + Application.checklistServices.elementPropertiesList + "/20",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(response) {
			stopiLoaderSpiner();
			$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
			guide_imgFunction(response, guideImgPropObject);
		},
	});
}

function guide_imgFunction(response, guideImgPropObject){	
	var name_value = "";
	var imageType_value = "";
	var is_editable_value = "";
	var answer_label_value = "";
	var mandatory_value = "";
	var disabled_value = "";

	var disArr =new Array();
	var disabled_id="";

	var imageArr = new Array();
	var imageType_id="";


	var mandatoryArr = new Array();
	var mandatory_id="";

	var isEditableArr = new Array();
	var isEditable_id="";


	var disFlag=0;
	var mandFlag=0;
	var imFlag=0;
	var editFlag=0;

	$("#GuideImgPropertiesPopup").modal();
	var htmlAddress = "";
	$("#guideImgId").empty();
	resultObject = response.resultSet.propertiesList;
	var guideImgNumber = guideImgPropObject.guideImgCountID.replace('guideImgBox_', '');
	for(var i=0;i< response.resultSet.propertiesList.length;i++){
		if(resultObject[i].attributeId=="109"){
			name_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="111"){
			imageArr=resultObject[i].defaultValues.split(",");
			imageType_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="112"){
			isEditableArr=resultObject[i].defaultValues.split(",");
			isEditable_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="113"){
			answer_label_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="114"){
			mandatoryArr=resultObject[i].defaultValues.split(",");
			mandatory_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="115"){
			disArr=resultObject[i].defaultValues.split(",");
			disabled_id = resultObject[i].attributeId;
		}	
	}

	for (var i = 0; i < guideImgJsonArr.length; i++) {
		if (guideImgNumber == guideImgJsonArr[i].guideTextNum) {
			for (var k = 0; k < guideImgJsonArr[i].guidePropArr.length; k++) {
				if (guideImgJsonArr[i].guidePropArr[k].name == "Name") {
					name_value = guideImgJsonArr[i].guidePropArr[k].value;
				}
				if (guideImgJsonArr[i].guidePropArr[k].name == "ImageType") {
					imageType_value = guideImgJsonArr[i].guidePropArr[k].value;
				}
				if (guideImgJsonArr[i].guidePropArr[k].name == "isEditable") {
					is_editable_value = guideImgJsonArr[i].guidePropArr[k].value;
				}
				if (guideImgJsonArr[i].guidePropArr[k].name == "AnswerLabel") {
					answer_label_value = guideImgJsonArr[i].guidePropArr[k].value;
				}
				if (guideImgJsonArr[i].guidePropArr[k].name == "Disabled") {
					disabled_value = guideImgJsonArr[i].guidePropArr[k].value;
				}
				if (guideImgJsonArr[i].guidePropArr[k].name == "Mandatory") {
					mandatory_value = guideImgJsonArr[i].guidePropArr[k].value;
				}
			}
		}
	}


	htmlAddress += "<table style=\"width: 100%;\"><tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 40px;\">Name<span style=\"font-size:20px;\">*<span></td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"text\" name=\"name_text\" class=\"name_text\" value=\"" + name_value + "\" id='name_" + name_id + "' required=\"true\"></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 15px;\">Image Type</td>";
	htmlAddress += "<td style=\"width: 50%;\"> <select id=\"imageType_" + imageType_id + "\" style=\"width:108%;\"></select></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 15px;\">Is Editable</td>";
	htmlAddress += "<td style=\"width: 50%;\"> <select id=\"isEditable_" + isEditable_id + "\" style=\"width:108%;\"></select></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;\">Answer Label</td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"text\"  value=\"" + answer_label_value + "\" name=\"answer_label_text\" id=\"answer_label_" + answer_label_id + "\"  ></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 15px;\">Mandatory</td>";
	htmlAddress += "<td style=\"width: 50%;\"> <select id=\"mandatory_" + mandatory_id + "\" style=\"width:108%;\"></select></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 30px;\">Disabled</td>";
	htmlAddress += "<td style=\"width: 50%;\"> <select name=\"disabled_text\" id=\"disabled_" + disabled_id + "\" style=\"width:108%;\"></select></td></tr>";
	htmlAddress += "</table>";
	$("#guideImgId").append(htmlAddress);
	elmenentsPropertyDisplay(disArr,disabled_value,'disabled_',disabled_id,disFlag);
	elmenentsPropertyDisplay(mandatoryArr,mandatory_value,'mandatory_',mandatory_id,mandFlag);
	elmenentsPropertyDisplay(imageArr,imageType_value,'imageType_',imageType_id,imFlag);
	elmenentsPropertyDisplay(isEditableArr,is_editable_value,'isEditable_',isEditable_id,editFlag);
	guideImgObject.name_id = name_id;
	guideImgObject.answer_label_id = answer_label_id;
	guideImgObject.disabled_id = disabled_id;
	guideImgObject.mandatory_id = mandatory_id;
	guideImgObject.imageType_id = imageType_id;
	guideImgObject.isEditable_id = isEditable_id;
	$("#guideImgFooter").empty();
	var html2 = "";
	html2 += "<button type=\"button\"  id=\"saveGuideTextNum_" + guideImgNumber + "\" data-sect='" + guideImgPropObject.sectID + "' data-step='" + guideImgPropObject.stepID + "' data-ques='" + guideImgPropObject.quesID + "'  data-prop='" + guideImgPropObject + "' class=\"btn btn-primary pull-left saveGuideImgPropertiesBtn\">Done</button>";
	html2 += "<button type=\"button\" data-dismiss=\"modal\" class=\"btn btnCancel pull-right\">Cancel</button>";
	$("#guideImgFooter").append(html2);


}

function savePropertiesTextArea(textPropObject) {
	startiLoaderSpiner();
	$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
	var serverbaseUrl = getServerPath();
	$.ajax({
		type: "GET",
		url: serverbaseUrl + Application.checklistServices.elementPropertiesList + "/5",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(response) {
			stopiLoaderSpiner();
			$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
			text_areaFunction(response, textPropObject)
		},
	});
}

function text_areaFunction(response, textPropObject) {
	var name_value = "";
	var answer_label_value = "";
	var max_length_value = "";
	var disabled_value = "";
	var defaultValue_value = "";
	var mandatory_value = "";
	var visible_val = "";
	var action_tag_value = "";
	var valueText_value = "";
	var disArr =new Array();
	var disabled_id="";
	var mandatoryArr = new Array();
	var mandatory_id="";
	var visibleArr = new Array();
	var visible_id="";
	var disFlag=0;
	var mandFlag=0;
	var visFlag=0;
	$("#TAaddPropertiesPopup").modal();
	var htmlAddress = "";
	$("#textAreaId").empty();
	resultObject = response.resultSet.propertiesList;
	var textNumber = textPropObject.textCountID.replace('textCount_', '');
	for(var i=0;i< response.resultSet.propertiesList.length;i++){
		if(resultObject[i].attributeId=="61"){
			disArr=resultObject[i].defaultValues.split(",");
			disabled_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="45"){
			answer_label_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="41"){
			max_length_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="60"){
			mandatoryArr=resultObject[i].defaultValues.split(",");
			mandatory_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="64"){
			visibleArr=resultObject[i].defaultValues.split(",");
			visible_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="40"){
			name_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="62"){
			action_tag_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="65"){
			defaultValue_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="63"){
			valueText_id = resultObject[i].attributeId;
		}
	}




	for (var i = 0; i < textAreaJsonArr.length; i++) {
		if (textNumber == textAreaJsonArr[i].textAreaNum) {
			for (var k = 0; k < textAreaJsonArr[i].textPropArr.length; k++) {
				if (textAreaJsonArr[i].textPropArr[k].name == "Name") {
					name_value = textAreaJsonArr[i].textPropArr[k].value;
				}
				if (textAreaJsonArr[i].textPropArr[k].name == "MaxLength") {
					max_length_value = textAreaJsonArr[i].textPropArr[k].value;
				}
				if (textAreaJsonArr[i].textPropArr[k].name == "AnswerLabel") {
					answer_label_value = textAreaJsonArr[i].textPropArr[k].value;
				}
				if (textAreaJsonArr[i].textPropArr[k].name == "Disabled") {
					disabled_value = textAreaJsonArr[i].textPropArr[k].value;
				}
				if (textAreaJsonArr[i].textPropArr[k].name == "DefaultValue") {
					defaultValue_value = textAreaJsonArr[i].textPropArr[k].value;
				}
				if (textAreaJsonArr[i].textPropArr[k].name == "Mandatory") {
					mandatory_value = textAreaJsonArr[i].textPropArr[k].value;
				}
				if (textAreaJsonArr[i].textPropArr[k].name == "Visible") {
					visible_val = textAreaJsonArr[i].textPropArr[k].value;
				}
				if (textAreaJsonArr[i].textPropArr[k].name == "ActionTag") {
					action_tag_value = textAreaJsonArr[i].textPropArr[k].value;
				}
				if (textAreaJsonArr[i].textPropArr[k].name == "Value") {
					valueText_value = textAreaJsonArr[i].textPropArr[k].value;
				}
			}
		}
	}
	htmlAddress += "<table style=\"width: 100%;\"><tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 40px;\">Name<span style=\"font-size:20px;\">*<span></td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"text\" name=\"name_text\" class=\"name_text\" value=\"" + name_value + "\" id='name_" + name_id + "' required=\"true\"></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;\">Answer Label</td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"text\"  value=\"" + answer_label_value + "\" name=\"answer_label_text\" id=\"answer_label_" + answer_label_id + "\"  ></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;\">Max Length <span style=\"font-size:20px;\">*<span></td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"number\" min=\"1\" class=\"max_length\"  value=\"" + max_length_value + "\"  name=\"max_length_text\" id=\"max_length_" + max_length_id + "\" required=\"true\" ></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 30px;\">Disabled</td>";
	htmlAddress += "<td style=\"width: 50%;\"> <select name=\"disabled_text\" id=\"disabled_" + disabled_id + "\" style=\"width:108%;\"></select></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 5px;\">Default Value</td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"text\" value=\"" + defaultValue_value + "\" name=\"default_value_text\" id=\"defaultValue_" + defaultValue_id + "\"  ></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 15px;\">Mandatory</td>";
	htmlAddress += "<td style=\"width: 50%;\"> <select id=\"mandatory_" + mandatory_id + "\" style=\"width:108%;\"></select></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 40px;\">Visible</td>";
	htmlAddress += "<td style=\"width: 50%;\"> <select id=\"visible_" + visible_id + "\" style=\"width:108%;\"></select></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 15px;\">Action Tag</td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"text\" value='" + action_tag_value + "' name=\"actionTag_text\" id=\"action_tag_" + action_tag_id + "\"  ></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 35px;\">Value</td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"text\" value='" + valueText_value + "' name=\"valueText_text\" id=\"valueText_" + valueText_id + "\"  ></td></tr>";
	htmlAddress += "</table>";
	$("#textAreaId").append(htmlAddress);
	disabledAttributeDisplay(disArr,disabled_value,disabled_id,disFlag);
	mandatoryAttributeDisplay(mandatoryArr,mandatory_value,mandatory_id,mandFlag);
	visibleAttributeDisplay(visibleArr,visible_val,visible_id,visFlag);
	textAreaObject.name_id = name_id;
	textAreaObject.answer_label_id = answer_label_id;
	textAreaObject.max_length_id = max_length_id;
	textAreaObject.disabled_id = disabled_id;
	textAreaObject.defaultValue_id = defaultValue_id;
	textAreaObject.mandatory_id = mandatory_id;
	textAreaObject.visible_id = visible_id;
	textAreaObject.action_tag_id = action_tag_id;
	textAreaObject.valueText_id = valueText_id;
	$("#textAreaFooter").empty();
	var html1 = "";
	html1 += "<button type=\"button\"  id=\"saveTextNum_" + textNumber + "\" data-sect='" + textPropObject.sectID + "' data-step='" + textPropObject.stepID + "' data-ques='" + textPropObject.quesID + "'  data-prop='" + textAreaObject + "' class=\"btn btn-primary pull-left saveAddPropertiesTextAreaBtn\">Done</button>";
	html1 += "<button type=\"button\" data-dismiss=\"modal\" class=\"btn btnCancel pull-right\">Cancel</button>";
	$("#textAreaFooter").append(html1);
}

function savePropertiesDropDown(dropDownPropObject) {
	startiLoaderSpiner();
	$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
	var serverbaseUrl = getServerPath();
	$.ajax({
		type: "GET",
		url: serverbaseUrl + Application.checklistServices.elementPropertiesList + "/10",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(response) {
			stopiLoaderSpiner();
			$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
			dropDownFunction(response, dropDownPropObject);
		},
	});
}
var rowsRuleDrop_=new Array();
var valueDropID;
var setFocusDropFlag=0;
var editDrop=0;
var valueDrop=0;
function dropDownFunction(response, dropDownPropObject) {
	var name_value = "";
	var answer_label_value = "";
	var multiple_value = "";
	var disabled_value = "";
	var searchable_value = "";
	var mandatory_value = "";
	var visible_val = "";
	var action_tag_value = "";
	var valueText_value = "";
	var multipleArr = new Array();
	var multiple_id = "";
	var searchableArr = new Array();
	var disArr=new Array();
	var disabled_id="";
	var mandatoryArr = new Array();
	var mandatory_id="";
	var visibleArr = new Array();
	var visible_id="";
	var disFlag=0;
	var mandFlag=0;
	var visFlag=0;
	var multFlag=0;
	var searchFlag=0;
	$("#DDaddPropertiesPopup").modal();
	var htmlAddress = "";
	$("#dropDownId").empty();
	resultObject = response.resultSet.propertiesList;
	var dropDownNumber = dropDownPropObject.dropDownCountID.replace('dropDownCount_', '');
	for(var i=0;i< response.resultSet.propertiesList.length;i++){
		if(resultObject[i].attributeId=="87"){
			disArr=resultObject[i].defaultValues.split(",");
			disabled_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="50"){
			answer_label_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="88"){
			mandatoryArr=resultObject[i].defaultValues.split(",");
			mandatory_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="38"){
			visibleArr=resultObject[i].defaultValues.split(",");
			visible_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="36"){
			multipleArr=resultObject[i].defaultValues.split(",");
			multiple_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="37"){
			searchableArr=resultObject[i].defaultValues.split(",");
			searchable_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="35"){
			name_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="89"){
			action_tag_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="90"){
			valueText_id = resultObject[i].attributeId;
			valueDropID=valueText_id;
		}
	}
	for (var i = 0; i < dropDownJsonArr.length; i++) {
		if (dropDownNumber == dropDownJsonArr[i].dropDownNum) {
			for (var k = 0; k < dropDownJsonArr[i].dropDownPropArr.length; k++) {
				if (dropDownJsonArr[i].dropDownPropArr[k].name == "Name") {
					name_value = dropDownJsonArr[i].dropDownPropArr[k].value;
				}
				if (dropDownJsonArr[i].dropDownPropArr[k].name == "Multiple") {
					multiple_value = dropDownJsonArr[i].dropDownPropArr[k].value;
				}
				if (dropDownJsonArr[i].dropDownPropArr[k].name == "Searchable") {
					searchable_value = dropDownJsonArr[i].dropDownPropArr[k].value;
				}
				if (dropDownJsonArr[i].dropDownPropArr[k].name == "Visible") {
					visible_val = dropDownJsonArr[i].dropDownPropArr[k].value;
				}
				if (dropDownJsonArr[i].dropDownPropArr[k].name == "AnswerLabel") {
					answer_label_value = dropDownJsonArr[i].dropDownPropArr[k].value;
				}
				if (dropDownJsonArr[i].dropDownPropArr[k].name == "Disabled") {
					disabled_value = dropDownJsonArr[i].dropDownPropArr[k].value;
				}
				if (dropDownJsonArr[i].dropDownPropArr[k].name == "Mandatory") {
					mandatory_value = dropDownJsonArr[i].dropDownPropArr[k].value;
				}
				if (dropDownJsonArr[i].dropDownPropArr[k].name == "ActionTag") {
					action_tag_value = dropDownJsonArr[i].dropDownPropArr[k].value;
				}
				if (dropDownJsonArr[i].dropDownPropArr[k].name == "Value") {
					valueText_value = dropDownJsonArr[i].dropDownPropArr[k].value;
				}
			}
		}
	}
	htmlAddress += "<table style=\"width: 100%;\"><tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 30px;\">Disabled</td>";
	htmlAddress += "<td style=\"width: 50%;\"> <select name=\"disabled_text\" id=\"disabled_" + disabled_id + "\" style=\"width:108%;\"></select></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 35px;\">isMultipleSelect</td>";
	htmlAddress += "<td style=\"width: 50%;\"> <select id=\"multiple_" + multiple_id + "\" style=\"width:108%;\"></select></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 34px;\">Name<span style=\"font-size:20px;\">*<span></td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"text\" class=\"name_drop\" name=\"name_text\" value=\"" + name_value + "\" id='name_" + name_id + "' required=\"true\"></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;\">Answer label</td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"text\"  value=\"" + answer_label_value + "\" name=\"answer_label_text\" id=\"answer_label_" + answer_label_id + "\"  ></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 12px;\">Mandatory</td>";
	htmlAddress += "<td style=\"width: 50%;\"> <select id=\"mandatory_" + mandatory_id + "\" style=\"width:108%;\"></select></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 12px;\">isSearchable</td>";
	htmlAddress += "<td style=\"width: 50%;\"> <select id=\"searchable_" + searchable_id + "\" style=\"width:108%;\"></select></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right:44px;\">Visible</td>";
	htmlAddress += "<td style=\"width: 50%;\"> <select id=\"visible_" + visible_id + "\" style=\"width:108%;\"></select></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 16px;\">Action tag</td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"text\"  value='" + action_tag_value + "' name=\"actionTag_text\" id=\"action_tag_" + action_tag_id + "\"  ></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 40px;\">Value<span style=\"font-size:20px;\">*<span></td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"text\" class=\"value_drop\" value='" + valueText_value + "' name=\"valueText_text\" id=\"valueText_" + valueText_id + "\"  ></td></tr>";
	htmlAddress += "</table>";
	$("#dropDownId").append(htmlAddress);
	disabledAttributeDisplay(disArr,disabled_value,disabled_id,disFlag);
	mandatoryAttributeDisplay(mandatoryArr,mandatory_value,mandatory_id,mandFlag);
	visibleAttributeDisplay(visibleArr,visible_val,visible_id,visFlag);
	multipledAttributeDisplay(multipleArr,multiple_value,multiple_id,multFlag);
	searchableAttributeDisplay(searchableArr,searchable_value,searchable_id,searchFlag);
	DropDownObject.disabled_id = disabled_id;
	DropDownObject.multiple_id = multiple_id;
	DropDownObject.name_id = name_id;
	DropDownObject.answer_label_id = answer_label_id;
	DropDownObject.mandatory_id = mandatory_id;
	DropDownObject.searchable_id = searchable_id;
	DropDownObject.visible_id = visible_id;
	DropDownObject.action_tag_id = action_tag_id;
	DropDownObject.valueText_id = valueText_id;
	$("#dropDownFooter").empty();
	var html1 = "";
	html1 += "<button type=\"button\"  id=\"savedropDownNum_" + dropDownNumber + "\" data-sect='" + dropDownPropObject.sectID + "' data-step='" + dropDownPropObject.stepID + "' data-ques='" + dropDownPropObject.quesID + "'   class=\"btn btn-primary pull-left saveAddPropertiesDropDownBtn\">Done</button>";
	html1 += "<button type=\"button\" data-dismiss=\"modal\" class=\"btn btnCancel pull-right\">Cancel</button>";
	$("#dropDownFooter").append(html1);
	valueDrop=valueText_value;
	$(".value_drop" ).focus(function()  {
		$('.value_dropValidations').remove();
		if ($(".value_drop").parent().next(".validation").length == 0) {
			$(".value_drop").parents("tr").after("<tr class='value_dropValidations'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter Value that should be | separated </td></tr>");
		}
		focusSet = true;
		if(setFocusDropFlag==0){
			if(valueText_value=="" || valueText_value==" " ||valueText_value=="null" ||valueText_value==null){
			}
			else{
				rowsRuleDrop_=[];
				for(var j=0;j<rulePropArr.length;j++){
					if ("ansDrpDown" == rulePropArr[j].elementName) {
						if (dropDownNumber == rulePropArr[j].ruleNumber) {
							for (var k2 = 0; k2 < rulePropArr[j].rowArr.length; k2++) {
								rowsRuleDrop_.push(rulePropArr[j].rowArr[k2].rowId);
							}
						}
					}
				}
				if(rowsRuleDrop_.length>0){
					$("#AlertPopupRule").modal();
					$("#againFooter").empty();
					var html2="";
					html2+="<button type=\"button\"  class=\"btn btn-primary\" id=\"dropOk\" style=\"margin-right:50px;margin-top:20px;\">OK</button>";
					$("#againFooter").append(html2);
				}
			}
		}
		else{
			setFocusDropFlag=0;
		}
	});
}
$(document).on("click","#dropOk",function(e){
	$("#AlertPopupRule").modal('hide');
	setFocusDropFlag=1;
	editDrop=1;
	$("#valueText_"+valueDropID ).focus();

}); 
function savePropertiesDatePicker(datePickerPropObject) {
	startiLoaderSpiner();
	$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
	var serverbaseUrl = getServerPath();
	$.ajax({
		type: "GET",
		url: serverbaseUrl + Application.checklistServices.elementPropertiesList + "/14",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(response) {
			stopiLoaderSpiner();
			$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
			datePickerFunction(response, datePickerPropObject);
		},

	});
}
function datePickerFunction(response, datePickerPropObject) {
	var name_value = "";
	var answer_label_value = "";
	var dateFormat_val = "";
	var disabled_value = "";
	var defaultValue_value = "";
	var defaultValue_id="";
	var mandatory_value = "";
	var visible_val = "";
	var action_tag_value = "";
	var valueText_value = "";
	var disArr=new Array();
	var disabled_id="";
	var mandatoryArr = new Array();
	var mandatory_id="";
	var visibleArr = new Array();
	var visible_id="";
	var dateFormatArr =new Array();
	var disFlag=0;
	var mandFlag=0;
	var visFlag=0;
	var dateFlag=0;
	$("#DPaddPropertiesPopup").modal();
	var htmlAddress = "";
	$("#datePickerId").empty();
	resultObject = response.resultSet.propertiesList;
	var datePickerNumber = datePickerPropObject.datePickerCountID.replace('datePickerCount_', '');
	for(var i=0;i< response.resultSet.propertiesList.length;i++){
		if(resultObject[i].attributeId=="102"){
			disArr=resultObject[i].defaultValues.split(",");
			disabled_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="53"){
			answer_label_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="105"){
			dateFormatArr=resultObject[i].defaultValues.split(",");
			dateFormat_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="104"){
			mandatoryArr=resultObject[i].defaultValues.split(",");
			mandatory_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="106"){
			visibleArr=resultObject[i].defaultValues.split(",");
			visible_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="42"){
			name_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="103"){
			action_tag_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="108"){
			defaultValue_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="107"){
			valueText_id = resultObject[i].attributeId;
		}
	}
	for (var i = 0; i < datePickerJsonArr.length; i++) {
		if (datePickerNumber == datePickerJsonArr[i].datePickerNum) {
			for (var k = 0; k < datePickerJsonArr[i].datePickerPropArr.length; k++) {
				if (datePickerJsonArr[i].datePickerPropArr[k].name == "Name") {
					name_value = datePickerJsonArr[i].datePickerPropArr[k].value;
				} else if (datePickerJsonArr[i].datePickerPropArr[k].name == "AnswerLabel") {
					answer_label_value = datePickerJsonArr[i].datePickerPropArr[k].value;
				} else if (datePickerJsonArr[i].datePickerPropArr[k].name == "Disabled") {
					disabled_value = datePickerJsonArr[i].datePickerPropArr[k].value;
				} else if (datePickerJsonArr[i].datePickerPropArr[k].name == "Mandatory") {
					mandatory_value = datePickerJsonArr[i].datePickerPropArr[k].value;
				} else if (datePickerJsonArr[i].datePickerPropArr[k].name == "DateFormat") {
					dateFormat_val = datePickerJsonArr[i].datePickerPropArr[k].value;
				} else if (datePickerJsonArr[i].datePickerPropArr[k].name == "DefaultValue") {
					defaultValue_value = datePickerJsonArr[i].datePickerPropArr[k].value;
				} else if (datePickerJsonArr[i].datePickerPropArr[k].name == "Visible") {
					visible_val = datePickerJsonArr[i].datePickerPropArr[k].value;
				} else if (datePickerJsonArr[i].datePickerPropArr[k].name == "ActionTag") {
					action_tag_value = datePickerJsonArr[i].datePickerPropArr[k].value;
				} else if (datePickerJsonArr[i].datePickerPropArr[k].name == "Value") {
					valueText_value = datePickerJsonArr[i].datePickerPropArr[k].value;
				} else {

				}
			}
		}
	}
	htmlAddress += "<table style=\"width: 100%;\"><tr>";
	htmlAddress += "<td style=\"width: 50%;\">Answer label</td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"text\"  value=\"" + answer_label_value + "\" name=\"answer_label_text\" id=\"answer_label_" + answer_label_id + "\"  ></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 30px;\">Name <span style=\"font-size:20px;\">*<span></td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"text\" name=\"name_text\" class=\"name_date\" value=\"" + name_value + "\" id='name_" + name_id + "' required=\"true\"></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 25px;\">Disabled</td>";
	htmlAddress += "<td style=\"width: 50%;\"> <select name=\"disabled_text\" id=\"disabled_" + disabled_id + "\" style=\"width:108%;\"></select></td></tr></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 15px;\">Mandatory</td>";
	htmlAddress += "<td style=\"width: 50%;\"> <select id=\"mandatory_" + mandatory_id + "\" style=\"width:108%;\"></select></td></tr></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 5px;\">Date Format</td>";
	htmlAddress += "<td style=\"width: 50%;\"> <select id=\"dateFormat_" + dateFormat_id + "\" style=\"width:108%;\"></select></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress+="<td style=\"width: 50%;\">Default Value</td>";
	if(defaultValue_value=="systemDate"){
		htmlAddress+="<td style=\"width: 50%;\"> <select id=\"defaultValue_"+defaultValue_id+"\"  style=\"width:108%;\"><option value=\"systemDate\" >systemDate</option><option value=\"blank\" >blank</option></select></td></tr>";
	}
	else if(defaultValue_value=="blank"){
		htmlAddress+="<td style=\"width: 50%;\"> <select id=\"defaultValue_"+defaultValue_id+"\"  style=\"width:108%;\"><option value=\"blank\" >blank</option><option value=\"systemDate\" >systemDate</option></select></td></tr>";
	}
	else{
		htmlAddress+="<td style=\"width: 50%;\"> <select id=\"defaultValue_"+defaultValue_id+"\" style=\"width:108%;\"><option value=\"systemDate\">systemDate</option><option value=\"blank\" >blank</option></select></td></tr>";
	}
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 35px;\">Visible</td>";
	htmlAddress += "<td style=\"width: 50%;\"> <select id=\"visible_" + visible_id + "\" style=\"width:108%;\"></select></td></tr></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 15px;\">Action Tag</td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"text\" value='" + action_tag_value + "' name=\"actionTag_text\" id=\"action_tag_" + action_tag_id + "\"  ></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 40px;\">Value</td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"text\" value='" + valueText_value + "' name=\"valueText_text\" id=\"valueText_" + valueText_id + "\"  ></td></tr>";
	htmlAddress += "</table>";
	$("#datePickerId").append(htmlAddress);
	disabledAttributeDisplay(disArr,disabled_value,disabled_id,disFlag);
	mandatoryAttributeDisplay(mandatoryArr,mandatory_value,mandatory_id,mandFlag);
	visibleAttributeDisplay(visibleArr,visible_val,visible_id,visFlag);
	dateFormatAttributeDisplay(dateFormatArr,dateFormat_val,dateFormat_id,dateFlag);
	datePickerObject.name_id = name_id;
	datePickerObject.answer_label_id = answer_label_id;
	datePickerObject.dateFormat_id = dateFormat_id;
	datePickerObject.disabled_id = disabled_id;
	datePickerObject.defaultValue_id = defaultValue_id;
	datePickerObject.mandatory_id = mandatory_id;
	datePickerObject.visible_id = visible_id;
	datePickerObject.action_tag_id = action_tag_id;
	datePickerObject.valueText_id = valueText_id;
	$("#datePickerFooter").empty();
	var html1 = "";
	html1 += "<button type=\"button\"  id=\"saveDatePickerNum_" + datePickerNumber + "\" data-sect='" + datePickerPropObject.sectID + "' data-step='" + datePickerPropObject.stepID + "' data-ques='" + datePickerPropObject.quesID + "'   class=\"btn btn-primary pull-left saveAddPropertiesDatePickerBtn\">Done</button>";
	html1 += "<button type=\"button\" data-dismiss=\"modal\" class=\"btn btnCancel pull-right\">Cancel</button>";
	$("#datePickerFooter").append(html1);
}
var rowsRule_=new Array();
var valueRadioID;
var setFocusRadioFlag=0;
var editRadio=0;
var valueRadio=0;

function savePropertiesRadioButton(radioBtnObject) {
	startiLoaderSpiner();
	$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
	var serverbaseUrl = getServerPath();
	$.ajax({
		type: "GET",
		url: serverbaseUrl + Application.checklistServices.elementPropertiesList + "/3",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(response) {
			stopiLoaderSpiner();
			$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
			radioButtonFunction(response, radioBtnObject);
		},
	});
}

function radioButtonFunction(response, radioBtnObject) {
	var name_value = "";
	var answer_label_value = "";
	var disabled_value = "";
	var defaultValue_value = "";
	var mandatory_value = "";
	var visible_val = "";
	var action_tag_value = "";
	var valueText_value = "";
	var disabled_id="";
	var answer_label_id="";
	var mandatory_id="";
	var visible_id="";
	var name_id="";
	var action_tag_id="";
	var defaultValue_id="";
	var valueText_id="";
	var disArr=new Array();
	var mandatoryArr = new Array();
	var visibleArr = new Array();
	var defaultArr =new Array();
	var disFlag=0;
	var mandFlag=0;
	var visFlag=0;
	var defaultFlag=0;
	$("#radioAddPropertiesPopup").modal();
	var htmlAddress = "";
	$("#radioButtonId").empty();
	resultObject = response.resultSet.propertiesList;
	var radioNumber = radioBtnObject.radioBtnCountID.replace('radioButtonCount_', '');
	for(var i=0;i< response.resultSet.propertiesList.length;i++){
		if(resultObject[i].attributeName=="Disabled"){
			disArr=resultObject[i].defaultValues.split(",");
			disabled_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeName=="AnswerLabel" || resultObject[i].attributeName=="answerLabel" ){
			answer_label_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeName=="Mandatory"){
			mandatoryArr=resultObject[i].defaultValues.split(",");
			mandatory_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeName=="Visible"){
			visibleArr=resultObject[i].defaultValues.split(",");
			visible_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeName=="Name" ||resultObject[i].attributeName=="name" ){
			name_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeName=="ActionTag"){
			action_tag_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeName=="DefaultValue" || resultObject[i].attributeName=="Default Value"){
			defaultArr=resultObject[i].defaultValues.split(",");
			defaultValue_id = resultObject[i].attributeId;
		}
	}
	var len=6;
	for (var i = 0; i < radioButtonJsonArr.length; i++) {
		if (radioNumber == radioButtonJsonArr[i].radioBntNum) {
			if(radioButtonJsonArr[i].radioValueArr.length<=6){
				len=radioButtonJsonArr[i].radioValueArr.length;
			}
			for (var k = 0; k < radioButtonJsonArr[i].radioPropArr.length; k++) {
				if (radioButtonJsonArr[i].radioPropArr[k].name == "Name") {
					name_value = radioButtonJsonArr[i].radioPropArr[k].value;
				} else if (radioButtonJsonArr[i].radioPropArr[k].name == "AnswerLabel" || radioButtonJsonArr[i].radioPropArr[k].name == "answerLabel") {
					answer_label_value = radioButtonJsonArr[i].radioPropArr[k].value;
				} else if (radioButtonJsonArr[i].radioPropArr[k].name == "Disabled") {
					disabled_value = radioButtonJsonArr[i].radioPropArr[k].value;
				} else if (radioButtonJsonArr[i].radioPropArr[k].name == "Default Value" ||radioButtonJsonArr[i].radioPropArr[k].name == "DefaultValue") {
					defaultValue_value = radioButtonJsonArr[i].radioPropArr[k].value;
				} else if (radioButtonJsonArr[i].radioPropArr[k].name == "Mandatory") {
					mandatory_value = radioButtonJsonArr[i].radioPropArr[k].value;
				} else if (radioButtonJsonArr[i].radioPropArr[k].name == "Visible") {
					visible_val = radioButtonJsonArr[i].radioPropArr[k].value;
				} else if (radioButtonJsonArr[i].radioPropArr[k].name == "ActionTag") {
					action_tag_value = radioButtonJsonArr[i].radioPropArr[k].value;
				}
			}
		}
	}
	var idChoice=0;
	htmlAddress += "<table style=\"width: 100%;\"><tr>";
	htmlAddress += "<td style=\"width: 35%;\">Disabled</td>";
	htmlAddress += "<td style=\"width: 35%;\">Default Value</td>";
	htmlAddress += "<td style=\"width: 30%;\">Answer Label</td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 35%;\"> <select name=\"disabled_text\" id=\"disabled_" + disabled_id + "\" style=\"width:87%;\"></select></td>";
	htmlAddress += "<td style=\"width: 35%;\"> <select id=\"defaultValue_" + defaultValue_id + "\" style=\"width:87%;\"></select></td>";
	htmlAddress += "<td style=\"width: 30%;\"><input type= \"text\" style=\"width: 90%;\" value=\"" + answer_label_value + "\" name=\"answer_label_text\" id=\"answer_label_" + answer_label_id + "\"  ></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 35%;padding-top: 10px;\">Mandatory</td>";
	htmlAddress += "<td style=\"width: 30%;padding-top: 10px;\">Visible</td>";
	htmlAddress += "<td style=\"width: 35%;padding-top: 10px;\">Name<span style=\"font-size:20px;\">*<span></td>";
	htmlAddress += "</tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 35%;\"> <select id=\"mandatory_" + mandatory_id + "\" style=\"width:87%;\"></select></td>";
	htmlAddress += "<td style=\"width: 30%;\"> <select id=\"visible_" + visible_id + "\" style=\"width:87%;\"></select></td>";
	htmlAddress += "<td style=\"width: 35%;\"><input type= \"text\" style=\"width: 90%;\" class=\"name_radio\"name=\"name_text\" value=\"" + name_value + "\" id='name_" + name_id + "' required=\"true\"></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 35%;padding-top: 10px;\">Action Tag</td></tr>";
	htmlAddress += "<tr><td style=\"width: 35%;\"><input type= \"text\" style=\"width: 90%;\" value='" + action_tag_value + "' name=\"actionTag_text\" id=\"action_tag_" + action_tag_id + "\"  ></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td class=\"addValidate\" style=\"width: 35%;padding-top: 10px;\">Value<span style=\"font-size:20px;\">*<span></td></tr>";
	htmlAddress += "</table>";
	htmlAddress += "<div style=\"width:100%;overflow-y: scroll;height: 85px;\">";
	htmlAddress += "<table class=\"choice\" id='choiceTableID_" + radioNumber + "'>";
	htmlAddress += "<tr>";
	for(var i=1;i<=len;i++){	
		idChoice++;
		if(i==3|| i==5){
			htmlAddress += "<tr>";	
		}
		htmlAddress += "<td id='colID_" + idChoice + "'>"+idChoice+ "<input type=\"radio\" name=\"choice\" value=\"\" > <input type=\"text\" id='text_" + idChoice + "'/><i class=\"icon-trash deletion\" id='delete_" + idChoice + "' tableNumber=\"" + radioNumber + "\"></i> <i class=\"icon-plus-sign addition\" tableNumber=\"" + radioNumber + "\"></i></td>";
		if(i==2|| i==4){
			htmlAddress += "</tr>";	
		}
	}
	htmlAddress += "</table></div>";
	htmlAddress += "<div><a href=\"#\" id='clearID_" + radioNumber + "' class=\"clearChoiceTable\">Clear Default<a></div>";
	$("#radioButtonId").append(htmlAddress);
	if(radioButtonJsonArr!=""){
		for (var s = 0; s < radioButtonJsonArr.length; s++) {
			if (radioNumber == radioButtonJsonArr[s].radioBntNum) {
				for(var i=0;i<radioButtonJsonArr[s].radioValueArr.length;i++){
					if(i<6){
						var id=radioButtonJsonArr[s].radioValueArr[i].order;
						$("#text_"+id).val(radioButtonJsonArr[s].radioValueArr[i].value);
					}
					else{
						if(i%2==0){
							var id=radioButtonJsonArr[s].radioValueArr[i].order;
							$(".choice").append("<tr><td id='colID_" + id + "'>"+id+"<input type=\"radio\" name=\"choice\" value=\"\" ><input type=\"text\"  id='text_" + id + "'/><i class=\"icon-trash deletion\" id='delete_" + idChoice + "' tableNumber=\"" + radioNumber + "\"></i><i class=\"icon-plus-sign addition\" tableNumber=\"" + radioNumber + "\"></i></td></tr>");
							$("#text_"+id).val(radioButtonJsonArr[s].radioValueArr[i].value);
						}else{
							var id=radioButtonJsonArr[s].radioValueArr[i].order;
							$(".choice tr:last").append("<td id='colID_" + id + "'>"+id+"<input type=\"radio\" name=\"choice\" value=\"\" ><input type=\"text\"  id='text_" + id + "'/><i class=\"icon-trash deletion\" id='delete_" + idChoice + "' tableNumber=\"" + radioNumber + "\"></i><i class=\"icon-plus-sign addition\" tableNumber=\"" + radioNumber + "\"></i></td>");
							$("#text_"+id).val(radioButtonJsonArr[s].radioValueArr[i].value);
						}
					}
				}
			}
		}
	}

	disabledAttributeDisplay(disArr,disabled_value,disabled_id,disFlag);
	mandatoryAttributeDisplay(mandatoryArr,mandatory_value,mandatory_id,mandFlag);
	visibleAttributeDisplay(visibleArr,visible_val,visible_id,visFlag);
	deafultAttributeDisplay(defaultArr,defaultValue_value,defaultValue_id,defaultFlag);
	radioButtonObject.name_id = name_id;
	radioButtonObject.answer_label_id = answer_label_id;
	radioButtonObject.disabled_id = disabled_id;
	radioButtonObject.defaultValue_id = defaultValue_id;
	radioButtonObject.mandatory_id = mandatory_id;
	radioButtonObject.visible_id = visible_id;
	radioButtonObject.action_tag_id = action_tag_id;
	radioButtonObject.valueText_id = valueText_id;
	$("#RadioFooter").empty();
	var html1 = "";
	html1 += "<button type=\"button\"  id=\"saveRadioNum_" + radioNumber + "\" data-sect='" + radioBtnObject.sectID + "' data-step='" + radioBtnObject.stepID + "' data-ques='" + radioBtnObject.quesID + "'  data-prop='" + radioBtnObject + "' class=\"btn btn-primary pull-left saveAddPropertiesRadioBtn\">Done</button>";
	html1 += "<button type=\"button\" data-dismiss=\"modal\" class=\"btn btnCancel pull-right\">Cancel</button>";
	$("#RadioFooter").append(html1);
}
$(document).on("click",".clearChoiceTable",function(e){
	var tableId=this.id.replace("clearID_",'');
	$("#choiceTableID_"+tableId ).find("tr").each(function(){
		$("td", this).each(function(){
			var id=$(this).find('input[type=text]').attr("id").replace("text_","");
			$("#text_"+id).val(" ");
			/*for (var i = 0; i < radioButtonJsonArr.length; i++) {
				if (tableId == radioButtonJsonArr[i].radioBntNum) {
					radioButtonJsonArr[i].radioValueArr=[]
				}
			}*/	
		});
	});
}); 
$(document).on("click",".addition",function(e){
	var radioNumber=$("#"+this.id).attr("tableNumber");
	if($( ".choice tr:last td" ).length==1){
		var serialNo=$( ".choice tr td" ).length;
		serialNo++;
		$(".choice tr:last").append("<td id='colID_" + serialNo + "'>"+serialNo+"<input type=\"radio\" name=\"choice\" value=\"\" ><input type=\"text\"  id='text_" + serialNo + "'/><i class=\"icon-trash deletion\" id='delete_" + serialNo + "' tableNumber=\"" + radioNumber + "\"></i> <i class=\"icon-plus-sign addition\" tableNumber=\"" + radioNumber + "\"></i></td>");

	}else if($( ".choice tr:last td" ).length==2){
		var serialNo=$( ".choice tr td" ).length;
		serialNo++;
		$(".choice").append("<tr><td id='colID_" + serialNo + "'>"+serialNo+"<input type=\"radio\" name=\"choice\" value=\"\" ><input type=\"text\"  id='text_" + serialNo + "'/><i class=\"icon-trash deletion\" id='delete_" + serialNo + "' tableNumber=\"" + radioNumber + "\"></i> <i class=\"icon-plus-sign addition\" tableNumber=\"" + radioNumber + "\"></i></td></tr>");
	}
}); 
$(document).on("click",".deletion",function(e){
	if($( ".choice tr td" ).length<3){
		
	}else{
		var id=this.id.replace("delete_",'');
		var tableId=$("#"+this.id).attr("tableNumber");
		var deleteArr=new Array();
		$("#choiceTableID_"+tableId ).find("tr").each(function(){
			$("td", this).each(function(){
				deleteArr.push($(this).find('input[type=text]').val());	
			});
		});
		$("#choiceTableID_"+tableId).find("tr td").find("#text_"+id).val('');
		var j=id;
		$("#choiceTableID_"+tableId ).find("tr").each(function(){
			$("td", this).each(function(){
				if($(this).find('input[type=text]').attr("id").replace("text_","")>=id){
					$(this).find('input[type=text]').val('');
					$(this).find('input[type=text]').val(deleteArr[j]);	
					j++;
				}
			});
		});
		if($("#choiceTableID_"+tableId ).find("tr:last td").length==2){
			$("#choiceTableID_"+tableId ).find("tr:last td:last").remove();
		}else{
			$("#choiceTableID_"+tableId ).find("tr:last td:last").remove();
			$("#choiceTableID_"+tableId ).find("tr:last").remove();
		}	
	}	
}); 
/*$(document).on("click","#radioOk",function(e){
	$("#AlertPopupRule").modal('hide');
	setFocusRadioFlag=1;
	editRadio=1;
	$("#valueText_"+valueRadioID ).focus();

}); */
function savePropertiesCheckBox(checkBoxObject1) {
	startiLoaderSpiner();
	$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
	var serverbaseUrl = getServerPath();
	$.ajax({
		type: "GET",
		url: serverbaseUrl + Application.checklistServices.elementPropertiesList + "/8",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(response) {
			stopiLoaderSpiner();
			$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
			checkBoxFunction(response, checkBoxObject1);
		},
	});
}
var rowsRuleChk_=new Array();
var valueChkID;
var setFocusChkFlag=0;
var editCheckBox=0;
var valueCheck=0;
function checkBoxFunction(response, checkBoxObject1) {
	var name_value = "";
	var answer_label_value = "";
	var disabled_value = "";
	var defaultValue_value = "";
	var mandatory_value = "";
	var visible_val = "";
	var action_tag_value = "";
	var valueText_value = "";
	var disabled_id="";
	var answer_label_id="";
	var mandatory_id="";
	var visible_id="";
	var name_id="";
	var action_tag_id="";
	var defaultValue_id="";
	var valueText_id="";
	var disArr=new Array();
	var mandatoryArr = new Array();
	var visibleArr = new Array();
	var defaultArr =new Array();
	var disFlag=0;
	var mandFlag=0;
	var visFlag=0;
	var defaultFlag=0;
	$("#checkAddPropertiesPopup").modal();
	var htmlAddress = "";
	$("#checkBoxId").empty();
	resultObject = response.resultSet.propertiesList;
	var checkBoxNumber = checkBoxObject1.checkBoxCountID.replace('checkBoxCount_', '');
	for(var i=0;i< response.resultSet.propertiesList.length;i++){
		if(resultObject[i].attributeName=="Disabled"){
			disArr=resultObject[i].defaultValues.split(",");
			disabled_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeName=="AnswerLabel" || resultObject[i].attributeName=="answerLabel"){
			answer_label_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeName=="Mandatory"){
			mandatoryArr=resultObject[i].defaultValues.split(",");
			mandatory_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeName=="Visible"){
			visibleArr=resultObject[i].defaultValues.split(",");
			visible_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeName=="Name" ||resultObject[i].attributeName=="name"){
			name_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeName=="ActionTag"){
			action_tag_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeName=="DefaultValue"){
			defaultArr=resultObject[i].defaultValues.split(",");
			defaultValue_id = resultObject[i].attributeId;
		}
	}
	var len=6;
	for (var i = 0; i < checkBoxJsonArr.length; i++) {
		if (checkBoxNumber == checkBoxJsonArr[i].checkBoxNum) {
			if(checkBoxJsonArr[i].checkValueArr.length<=6){
				len=checkBoxJsonArr[i].checkValueArr.length;
			}
			for (var k = 0; k < checkBoxJsonArr[i].checkBoxPropArr.length; k++) {
				if (checkBoxJsonArr[i].checkBoxPropArr[k].name == "Name") {
					name_value = checkBoxJsonArr[i].checkBoxPropArr[k].value;
				} else if (checkBoxJsonArr[i].checkBoxPropArr[k].name == "AnswerLabel") {
					answer_label_value = checkBoxJsonArr[i].checkBoxPropArr[k].value;
				} else if (checkBoxJsonArr[i].checkBoxPropArr[k].name == "Disabled") {
					disabled_value = checkBoxJsonArr[i].checkBoxPropArr[k].value;
				} else if (checkBoxJsonArr[i].checkBoxPropArr[k].name == "DefaultValue") {
					defaultValue_value = checkBoxJsonArr[i].checkBoxPropArr[k].value;
				} else if (checkBoxJsonArr[i].checkBoxPropArr[k].name == "Mandatory") {
					mandatory_value = checkBoxJsonArr[i].checkBoxPropArr[k].value;
				} else if (checkBoxJsonArr[i].checkBoxPropArr[k].name == "Visible") {
					visible_val = checkBoxJsonArr[i].checkBoxPropArr[k].value;
				} else if (checkBoxJsonArr[i].checkBoxPropArr[k].name == "ActionTag") {
					action_tag_value = checkBoxJsonArr[i].checkBoxPropArr[k].value;
				}
			}
		}
	}
	var idChoice=0;
	htmlAddress += "<table style=\"width: 100%;\"><tr>";
	htmlAddress += "<td style=\"width: 35%;\">Answer Label</td>";
	htmlAddress += "<td style=\"width: 35%;\">Name<span style=\"font-size:20px;\">*<span></td>";
	htmlAddress += "<td style=\"width: 30%;\">Action Tag</td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 35%;\"> <input type= \"text\" style=\"width: 80%;\" value=\"" + answer_label_value + "\" name=\"answer_label_text\" id=\"answer_label_" + answer_label_id + "\"  ></td>";
	htmlAddress += "<td style=\"width: 35%;\"> <input type= \"text\" style=\"width: 80%;\" class=\"name_chk\" name=\"name_text\" value=\"" + name_value + "\" id='name_" + name_id + "' required=\"true\"></td>";
	htmlAddress += "<td style=\"width: 30%;\"><input type= \"text\" style=\"width: 85%;\" value='" + action_tag_value + "' name=\"actionTag_text\" id=\"action_tag_" + action_tag_id + "\"  ></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 35%;padding-top: 10px;\">Visible</td>";
	htmlAddress += "<td style=\"width: 30%;padding-top: 10px;\">Disabled</td>";
	htmlAddress += "<td style=\"width: 35%;padding-top: 10px;\">Mandatory<td>";
	htmlAddress += "</tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 35%;\">  <select id=\"visible_" + visible_id + "\" style=\"width:87%;\"></select></td>";
	htmlAddress += "<td style=\"width: 30%;\"> <select id=\"disabled_" + disabled_id + "\"  style=\"width:87%;\"></select></td>";
	htmlAddress += "<td style=\"width: 35%;\"><select id=\"mandatory_" + mandatory_id + "\" style=\"width:90%;\"></select></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 35%;padding-top: 10px;\">Default Value</td></tr>";
	htmlAddress += "<tr><td style=\"width: 35%;\"><select id=\"defaultValue_" + defaultValue_id + "\"  style=\"width:108%;\"></select></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td class=\"addValidateCheckbox\" style=\"width: 35%;padding-top: 10px;\">Choices<span style=\"font-size:20px;\">*<span></td></tr>";
	htmlAddress += "</table>";
	htmlAddress += "<div style=\"width:100%;overflow-y: scroll;height: 85px;\">";
	htmlAddress += "<table class=\"choiceCheckbox\" id='choiceTableIDCheckbox_" + checkBoxNumber + "'>";
	htmlAddress += "<tr>";
	for(var i=1;i<=len;i++){	
		idChoice++;
		if(i==3|| i==5){
			htmlAddress += "<tr>";	
		}
		htmlAddress += "<td id='colID_" + idChoice + "'>"+idChoice+ "<input type=\"checkbox\" name=\"choice\" value=\"\" > <input type=\"text\" id='text_" + idChoice + "'/><i class=\"icon-trash deletionCheckbox\" id='delete_" + idChoice + "' tableNumber=\"" + checkBoxNumber + "\"></i> <i class=\"icon-plus-sign additionCheckbox\" tableNumber=\"" + checkBoxNumber + "\"></i></td>";
		if(i==2|| i==4){
			htmlAddress += "</tr>";	
		}
	}
	htmlAddress += "</table></div>";
	htmlAddress += "<div><a href=\"#\" id='clearIDCheckbox_" + checkBoxNumber + "' class=\"clearChoiceTableCheckbox\">Clear Default<a></div>";
	$("#checkBoxId").append(htmlAddress);
	if(checkBoxJsonArr!=""){
		for (var s = 0; s < checkBoxJsonArr.length; s++) {
			if (checkBoxNumber == checkBoxJsonArr[s].checkBoxNum) {
				for(var i=0;i<checkBoxJsonArr[s].checkValueArr.length;i++){
					if(i<6){
						var id=checkBoxJsonArr[s].checkValueArr[i].order;
						$("#text_"+id).val(checkBoxJsonArr[s].checkValueArr[i].value);
					}
					else{
						if(i%2==0){
							var id=checkBoxJsonArr[s].checkValueArr[i].order;
							$(".choiceCheckbox").append("<tr><td id='colID_" + id + "'>"+id+"<input type=\"checkbox\" name=\"choice\" value=\"\" ><input type=\"text\"  id='text_" + id + "'/><i class=\"icon-trash deletionCheckbox\" id='delete_" + idChoice + "' tableNumber=\"" + checkBoxNumber + "\"></i><i class=\"icon-plus-sign additionCheckbox\" tableNumber=\"" + checkBoxNumber + "\"></i></td></tr>");
							$("#text_"+id).val(checkBoxJsonArr[s].checkValueArr[i].value);
						}else{
							var id=checkBoxJsonArr[s].checkValueArr[i].order;
							$(".choiceCheckbox tr:last").append("<td id='colID_" + id + "'>"+id+"<input type=\"checkbox\" name=\"choice\" value=\"\" ><input type=\"text\"  id='text_" + id + "'/><i class=\"icon-trash deletionCheckbox\" id='delete_" + idChoice + "' tableNumber=\"" + checkBoxNumber + "\"></i><i class=\"icon-plus-sign additionCheckbox\" tableNumber=\"" + checkBoxNumber + "\"></i></td>");
							$("#text_"+id).val(checkBoxJsonArr[s].checkValueArr[i].value);
						}
					}
				}
			}
		}
	}
	disabledAttributeDisplay(disArr,disabled_value,disabled_id,disFlag);
	mandatoryAttributeDisplay(mandatoryArr,mandatory_value,mandatory_id,mandFlag);
	visibleAttributeDisplay(visibleArr,visible_val,visible_id,visFlag);
	deafultAttributeDisplay(defaultArr,defaultValue_value,defaultValue_id,defaultFlag);
	checkBoxObject.name_id = name_id;
	checkBoxObject.answer_label_id = answer_label_id;
	checkBoxObject.disabled_id = disabled_id;
	checkBoxObject.defaultValue_id = defaultValue_id;
	checkBoxObject.mandatory_id = mandatory_id;
	checkBoxObject.visible_id = visible_id;
	checkBoxObject.action_tag_id = action_tag_id;
	checkBoxObject.valueText_id = valueText_id;
	$("#CheckBoxFooter").empty();
	var html1 = "";
	html1 += "<button type=\"button\"  id=\"saveCheckBoxNum_" + checkBoxNumber + "\" data-sect='" + checkBoxObject1.sectID + "' data-step='" + checkBoxObject1.stepID + "' data-ques='" + checkBoxObject1.quesID + "'  class=\"btn btn-primary pull-left saveAddPropertiesCheckBoxBtn\">Done</button>";
	html1 += "<button type=\"button\" data-dismiss=\"modal\" class=\"btn btnCancel pull-right\">Cancel</button>";
	$("#CheckBoxFooter").append(html1);
	
}
$(document).on("click",".clearChoiceTableCheckbox",function(e){
	var tableId=this.id.replace("clearIDCheckbox_",'');
	$("#choiceTableIDCheckbox_"+tableId ).find("tr").each(function(){
		$("td", this).each(function(){
			var id=$(this).find('input[type=text]').attr("id").replace("text_","");
			$("#text_"+id).val(" ");
			/*for (var i = 0; i < radioButtonJsonArr.length; i++) {
				if (tableId == radioButtonJsonArr[i].radioBntNum) {
					radioButtonJsonArr[i].radioValueArr=[]
				}
			}	*/
		});
	});
}); 
$(document).on("click",".additionCheckbox",function(e){
	var checkBoxNumber=$("#"+this.id).attr("tableNumber");
	if($( ".choiceCheckbox tr:last td" ).length==1){
		var serialNo=$( ".choiceCheckbox tr td" ).length;
		serialNo++;
		$(".choiceCheckbox tr:last").append("<td id='colID_" + serialNo + "'>"+serialNo+"<input type=\"checkbox\" name=\"choice\" value=\"\" ><input type=\"text\"  id='text_" + serialNo + "'/><i class=\"icon-trash deletionCheckbox\" id='delete_" + serialNo + "' tableNumber=\"" + checkBoxNumber + "\"></i> <i class=\"icon-plus-sign additionCheckbox\" tableNumber=\"" + checkBoxNumber + "\" ></i></td>");

	}else if($( ".choiceCheckbox tr:last td" ).length==2){
		var serialNo=$( ".choiceCheckbox tr td" ).length;
		serialNo++;
		$(".choiceCheckbox").append("<tr><td id='colID_" + serialNo + "'>"+serialNo+"<input type=\"checkbox\" name=\"choice\" value=\"\" ><input type=\"text\"  id='text_" + serialNo + "'/><i class=\"icon-trash deletionCheckbox\" id='delete_" + serialNo + "' tableNumber=\"" + checkBoxNumber + "\"></i> <i class=\"icon-plus-sign additionCheckbox\" tableNumber=\"" + checkBoxNumber + "\"></i></td></tr>");
	}
}); 
$(document).on("click",".deletionCheckbox",function(e){
	if($( ".choiceCheckbox tr td" ).length<3){
		
	}else{
		var id=this.id.replace("delete_",'');
		var tableId=$("#"+this.id).attr("tableNumber");
		var deleteArr=new Array();
		$("#choiceTableIDCheckbox_"+tableId ).find("tr").each(function(){
			$("td", this).each(function(){
				deleteArr.push($(this).find('input[type=text]').val());	
			});
		});
		$("#choiceTableIDCheckbox_"+tableId).find("tr td").find("#text_"+id).val('');
		var j=id;
		$("#choiceTableIDCheckbox_"+tableId ).find("tr").each(function(){
			$("td", this).each(function(){
				if($(this).find('input[type=text]').attr("id").replace("text_","")>=id){
					$(this).find('input[type=text]').val('');
					$(this).find('input[type=text]').val(deleteArr[j]);	
					j++;
				}
			});
		});
		if($("#choiceTableIDCheckbox_"+tableId ).find("tr:last td").length==2){
			$("#choiceTableIDCheckbox_"+tableId ).find("tr:last td:last").remove();
		}else{
			$("#choiceTableIDCheckbox_"+tableId ).find("tr:last td:last").remove();
			$("#choiceTableIDCheckbox_"+tableId ).find("tr:last").remove();
		}	
	}	
}); 
function savePropertiesTextBox(textBoxObject1) {
	startiLoaderSpiner();
	$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
	var serverbaseUrl = getServerPath();
	$.ajax({
		type: "GET",
		url: serverbaseUrl + Application.checklistServices.elementPropertiesList + "/9",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(response) {
			stopiLoaderSpiner();
			$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
			textBoxFunction(response, textBoxObject1);
		},
	});
}

function textBoxFunction(response, textBoxObject1) {
	var dataType_val = "";
	var answer_label_value = "";
	var isBarCode_value = "";
	var disabled_value = "";
	var defaultValue_value = "";
	var mandatory_value = "";
	var name_value = "";
	var action_tag_value = "";
	var valueText_value = "";
	var visible_val = "";
	var max_length_value = "";
	var disArr=new Array();
	var disabled_id="";
	var mandatoryArr = new Array();
	var mandatory_id="";
	var visibleArr = new Array();
	var visible_id="";
	var dataArr=new Array();
	var dataType_id="";
	var isBarCodeArr =new Array();
	var barcodeScanner_id = "";
	var disFlag=0;
	var mandFlag=0;
	var visFlag=0;
	var dataFlag=0;
	var barCodeFlag=0;
	$("#textBoxAddPropertiesPopup").modal();
	var htmlAddress = "";
	$("#textBoxId").empty();
	resultObject = response.resultSet.propertiesList;
	var textBoxNumber = textBoxObject1.textBoxCountID.replace('textBoxCount_', '');
	for(var i=0;i< response.resultSet.propertiesList.length;i++){
		if(resultObject[i].attributeId=="82"){
			disArr=resultObject[i].defaultValues.split(",");
			disabled_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="49"){
			answer_label_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="22"){
			max_length_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="24"){
			mandatoryArr=resultObject[i].defaultValues.split(",");
			mandatory_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="25"){
			visibleArr=resultObject[i].defaultValues.split(",");
			visible_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="23"){
			name_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="83"){
			action_tag_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="85"){
			defaultValue_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="84"){
			valueText_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="21"){
			dataArr=resultObject[i].defaultValues.split(",");
			dataType_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="86"){
			isBarCodeArr=resultObject[i].defaultValues.split(",");
			barcodeScanner_id = resultObject[i].attributeId;
		}
	}
	for (var i = 0; i < textBoxJsonArr.length; i++) {
		if (textBoxNumber == textBoxJsonArr[i].textBoxNum) {
			for (var k = 0; k < textBoxJsonArr[i].textBoxPropArr.length; k++) {
				if (textBoxJsonArr[i].textBoxPropArr[k].name == "Name") {
					name_value = textBoxJsonArr[i].textBoxPropArr[k].value;
				} else if (textBoxJsonArr[i].textBoxPropArr[k].name == "AnswerLabel") {
					answer_label_value = textBoxJsonArr[i].textBoxPropArr[k].value;
				} else if (textBoxJsonArr[i].textBoxPropArr[k].name == "Disabled") {
					disabled_value = textBoxJsonArr[i].textBoxPropArr[k].value;
				} else if (textBoxJsonArr[i].textBoxPropArr[k].name == "DefaultValue") {
					defaultValue_value = textBoxJsonArr[i].textBoxPropArr[k].value;
				} else if (textBoxJsonArr[i].textBoxPropArr[k].name == "Mandatory") {
					mandatory_value = textBoxJsonArr[i].textBoxPropArr[k].value;
				} else if (textBoxJsonArr[i].textBoxPropArr[k].name == "BarcodeScanner") {
					isBarCode_value = textBoxJsonArr[i].textBoxPropArr[k].value;
				} else if (textBoxJsonArr[i].textBoxPropArr[k].name == "ActionTag") {
					action_tag_value = textBoxJsonArr[i].textBoxPropArr[k].value;
				} else if (textBoxJsonArr[i].textBoxPropArr[k].name == "Value") {
					valueText_value = textBoxJsonArr[i].textBoxPropArr[k].value;
				} else if (textBoxJsonArr[i].textBoxPropArr[k].name == "DataType") {
					dataType_val = textBoxJsonArr[i].textBoxPropArr[k].value;
				} else if (textBoxJsonArr[i].textBoxPropArr[k].name == "Visible") {
					visible_val = textBoxJsonArr[i].textBoxPropArr[k].value;
				} else if (textBoxJsonArr[i].textBoxPropArr[k].name == "MaxLength") {
					max_length_value = textBoxJsonArr[i].textBoxPropArr[k].value;
				} else {}
			}
		}
	}

	htmlAddress += "<table style=\"width: 100%;\"><tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 15px;\">Data Type <span style=\"font-size:20px;\">*<span></td>";
	htmlAddress += "<td style=\"width: 50%;\"> <select class=\"type_textbox\" name=\"dataType_text\" id=\"dataType_" + dataType_id + "\" style=\"width:108%;\"></select></td></tr></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;\">Max Length <span style=\"font-size:20px;\">*<span></td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"number\" min=\"1\" class=\"max_length_textbox\"  value=\"" + max_length_value + "\"  name=\"max_length_text\" id=\"max_length_" + max_length_id + "\" required=\"true\" ></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;\">Answer Label</td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"text\" style=\"width: 100%;\" value=\"" + answer_label_value + "\" name=\"answer_label_text\" id=\"answer_label_" + answer_label_id + "\"  ></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 15px;\">Mandatory</td>";
	htmlAddress += "<td style=\"width: 50%;\"> <select id=\"mandatory_" + mandatory_id + "\" style=\"width:108%;\"></select></td></tr></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 40px;\">Name<span style=\"font-size:20px;\">*<span></td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"text\" class=\"name_textbox\" name=\"name_text\" value=\"" + name_value + "\" id='name_" + name_id + "' required=\"true\"></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 30px;\">Disabled</td>";
	htmlAddress += "<td style=\"width: 50%;\"> <select name=\"disabled_text\" id=\"disabled_" + disabled_id + "\" style=\"width:108%;\"></select></td></tr></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right:45px;\">Visible</td>";
	htmlAddress += "<td style=\"width: 50%;\"> <select id=\"visible_" + visible_id + "\" style=\"width:108%;\"></select></td></tr></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 5px;\">Default Value</td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"text\" value=\"" + defaultValue_value + "\" name=\"default_value_text\" id=\"defaultValue_" + defaultValue_id + "\"  ></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 30px;\">isBarCodeScanner</td>";
	htmlAddress += "<td style=\"width: 50%;\"> <select name=\"barCode_text\" id=\"barCode_" + barcodeScanner_id + "\" style=\"width:108%;\"></select></td></tr></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right:30px;\">Action Tag</td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"text\" value='" + action_tag_value + "' name=\"actionTag_text\" id=\"action_tag_" + action_tag_id + "\"  ></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right:50px;\">Value</td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"text\" value='" + valueText_value + "' name=\"valueText_text\" id=\"valueText_" + valueText_id + "\"  ></td></tr>";
	htmlAddress += "</table>";
	$("#textBoxId").append(htmlAddress);
	dataAttributeDisplay(dataArr,dataType_val,dataFlag);
	barCodeAttributeDisplay(isBarCodeArr,isBarCode_value,barcodeScanner_id,barCodeFlag);
	disabledAttributeDisplay(disArr,disabled_value,disabled_id,disFlag);
	mandatoryAttributeDisplay(mandatoryArr,mandatory_value,mandatory_id,mandFlag);
	visibleAttributeDisplay(visibleArr,visible_val,visible_id,visFlag);
	textBoxObject.name_id = name_id;
	textBoxObject.answer_label_id = answer_label_id;
	textBoxObject.dataType_id = dataType_id;
	textBoxObject.disabled_id = disabled_id;
	textBoxObject.defaultValue_id = defaultValue_id;
	textBoxObject.mandatory_id = mandatory_id;
	textBoxObject.barcodeScanner_id = barcodeScanner_id;
	textBoxObject.action_tag_id = action_tag_id;
	textBoxObject.valueText_id = valueText_id;
	textBoxObject.visible_id = visible_id;
	textBoxObject.max_length_id = max_length_id;
	$("#textBoxFooter").empty();
	var html1 = "";
	html1 += "<button type=\"button\"  id=\"saveTextBoxNum_" + textBoxNumber + "\" data-sect='" + textBoxObject1.sectID + "' data-step='" + textBoxObject1.stepID + "' data-ques='" + textBoxObject1.quesID + "'   class=\"btn btn-primary pull-left saveAddPropertiesTextBoxBtn\">Done</button>";
	html1 += "<button type=\"button\" data-dismiss=\"modal\" class=\"btn btnCancel pull-right\">Cancel</button>";
	$("#textBoxFooter").append(html1);
}
function savePropertiesSignature(signaturePropObject) {
	startiLoaderSpiner();
	$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
	var serverbaseUrl = getServerPath();
	$.ajax({
		type: "GET",
		url: serverbaseUrl + Application.checklistServices.elementPropertiesList + "/12",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(response) {
			stopiLoaderSpiner();
			$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
			signatureFunction(response, signaturePropObject);
		},
	});
}

function signatureFunction(response, signaturePropObject) {
	var name_value = "";
	var answer_label_value = "";
	var disabled_value = "";
	var color_value = "";
	var mandatory_value = "";
	var visible_val = "";
	var action_tag_value = "";
	var disArr=new Array();
	var mandatoryArr = new Array();
	var visibleArr = new Array();
	var colorArr =new Array();
	var disabled_id = "";
	var answer_label_id ="";
	var name_id = "";
	var mandatory_id ="";
	var visible_id = "";
	var action_tag_id =  "";
	var color_id ="";
	var disFlag=0;
	var mandFlag=0;
	var visFlag=0;
	var colorFlag=0;
	$("#signatureaddPropertiesPopup").modal();
	var htmlAddress = "";
	$("#signatureId").empty();
	resultObject = response.resultSet.propertiesList;
	var signatureNumber = signaturePropObject.signatureCountID.replace('signatureCount_','');
	for(var i=0;i< response.resultSet.propertiesList.length;i++){
		if(resultObject[i].attributeId=="97"){
			disArr=resultObject[i].defaultValues.split(",");
			disabled_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="52"){
			answer_label_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="99"){
			mandatoryArr=resultObject[i].defaultValues.split(",");
			mandatory_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="101"){
			visibleArr=resultObject[i].defaultValues.split(",");
			visible_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="39"){
			name_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="98"){
			action_tag_id = resultObject[i].attributeId;
		}
		else if(resultObject[i].attributeId=="100"){
			colorArr=resultObject[i].defaultValues.split(",");
			color_id = resultObject[i].attributeId;
		}
	}
	for (var i = 0; i < signatureJsonArr.length; i++) {
		if (signatureNumber == signatureJsonArr[i].signatureNum) {
			for (var k = 0; k < signatureJsonArr[i].signaturePropArr.length; k++) {
				if (signatureJsonArr[i].signaturePropArr[k].name == "Name") {
					name_value = signatureJsonArr[i].signaturePropArr[k].value;
				}
				if (signatureJsonArr[i].signaturePropArr[k].name == "AnswerLabel") {
					answer_label_value = signatureJsonArr[i].signaturePropArr[k].value;
				}
				if (signatureJsonArr[i].signaturePropArr[k].name == "Disabled") {
					disabled_value = signatureJsonArr[i].signaturePropArr[k].value;
				}
				if (signatureJsonArr[i].signaturePropArr[k].name == "Color") {
					color_value = signatureJsonArr[i].signaturePropArr[k].value;
				}
				if (signatureJsonArr[i].signaturePropArr[k].name == "Mandatory") {
					mandatory_value = signatureJsonArr[i].signaturePropArr[k].value;
				}
				if (signatureJsonArr[i].signaturePropArr[k].name == "Visible") {
					visible_val = signatureJsonArr[i].signaturePropArr[k].value;
				}
				if (signatureJsonArr[i].signaturePropArr[k].name == "ActionTag") {
					action_tag_value = signatureJsonArr[i].signaturePropArr[k].value;
				}
			}
		}
	}
	htmlAddress += "<table style=\"width: 100%;\"><tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 40px;\">Name<span style=\"font-size:20px;\">*<span></td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"text\" class=\"name_sig\" name=\"name_text\" value=\"" + name_value + "\" id='name_" + name_id + "' required=\"true\"></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;\">Answer Label</td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"text\"  value=\"" + answer_label_value + "\" name=\"answer_label_text\" id=\"answer_label_" + answer_label_id + "\"  ></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 30px;\">Disabled</td>";
	htmlAddress += "<td style=\"width: 50%;\"> <select name=\"disabled_text\" id=\"disabled_" + disabled_id + "\" style=\"width:108%;\"></select></td></tr></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 15px;\">Mandatory</td>";
	htmlAddress += "<td style=\"width: 50%;\"> <select id=\"mandatory_" + mandatory_id + "\" style=\"width:108%;\"></select></td></tr></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 45px;\">Color</td>";
	htmlAddress += "<td style=\"width: 50%;\"> <select id=\"color_" + color_id + "\" style=\"width:108%;\"></select></td></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 40px;\">Visible</td>";
	htmlAddress += "<td style=\"width: 50%;\"> <select id=\"visible_" + visible_id + "\" style=\"width:108%;\"></select></td></tr></tr>";
	htmlAddress += "<tr>";
	htmlAddress += "<td style=\"width: 50%;padding-right: 15px;\">Action Tag</td>";
	htmlAddress += "<td style=\"width: 50%;\"><input type= \"text\" value='" + action_tag_value + "' name=\"actionTag_text\" id=\"action_tag_" + action_tag_id + "\"  ></td></tr>";
	htmlAddress += "</table>";
	$("#signatureId").append(htmlAddress);
	disabledAttributeDisplay(disArr,disabled_value,disabled_id,disFlag);
	mandatoryAttributeDisplay(mandatoryArr,mandatory_value,mandatory_id,mandFlag);
	visibleAttributeDisplay(visibleArr,visible_val,visible_id,visFlag);
	colorAttributeDisplay(colorArr,color_value,color_id,colorFlag);
	signatureObject.name_id = name_id;
	signatureObject.answer_label_id = answer_label_id;
	signatureObject.color_id = color_id;
	signatureObject.disabled_id = disabled_id;
	signatureObject.mandatory_id = mandatory_id;
	signatureObject.visible_id = visible_id;
	signatureObject.action_tag_id = action_tag_id;
	$("#signatureFooter").empty();
	var html1 = "";
	html1 += "<button type=\"button\"  id=\"saveSignatureNum_" + signatureNumber + "\" data-sect='" + signaturePropObject.sectID + "' data-step='" + signaturePropObject.stepID + "' data-ques='" + signaturePropObject.quesID + "'   class=\"btn btn-primary pull-left saveAddPropertiesSignatureBtn\">Done</button>";
	html1 += "<button type=\"button\" data-dismiss=\"modal\" class=\"btn btnCancel pull-right\">Cancel</button>";
	$("#signatureFooter").append(html1);
}