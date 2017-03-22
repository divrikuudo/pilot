/*************Saving of Element Properties *********************/
$(document).on("click", ".saveAddPropertiesImageUploadBtn", function(e) {
	var imageUpCount = this.id.replace('saveImageUpNum_', '');
	var sectionNum = $("#" + this.id).attr("data-sect");
	var stepNum = $("#" + this.id).attr("data-step");
	var quesNum = $("#" + this.id).attr("data-ques");
	var duplicate = 0;
	var imageUpObj = {
			sectionId: sectionNum,
			stepId: stepNum,
			questionNum: quesNum,
			imageUpNum: imageUpCount
	};
	var imageUpPropArr = new Array();
	for (var i = 0; i < imageUploadJsonArr.length; i++) {
		if (imageUpCount == imageUploadJsonArr[i].imageUpNum) {
			duplicate = 1;
			for (var k = 0; k < imageUploadJsonArr[i].imageUpPropArr.length; k++) {
				if (imageUploadJsonArr[i].imageUpPropArr[k].name == "Name") {
					if ((document.getElementById('name_' + imageUploadObject.name_id).value) == "") {
						if ((document.getElementById('imageType_' + imageUploadObject.imageType_id).value) != ""){
							$('.type_imageValidation').remove();
						}if ((document.getElementById('maxImages_' + imageUploadObject.maxImages_id).value) != ""){
							$('.maxLengthValidation').remove();
						} 
						nameValidation();
					}  else {
						imageUploadJsonArr[i].imageUpPropArr[k].value = document.getElementById('name_' + imageUploadObject.name_id).value;
						imageUploadJsonArr[i].imageUpPropArr[k].id = imageUploadObject.name_id;
					}
				} 
				else if (imageUploadJsonArr[i].imageUpPropArr[k].name == "ImageType") {
					if ((document.getElementById('imageType_' + imageUploadObject.imageType_id).value) == "") {
						if ((document.getElementById('name_' + imageUploadObject.name_id).value) != ""){
							$('.name_imagetValidation').remove();   
						}
						if ((document.getElementById('maxImages_' + imageUploadObject.maxImages_id).value) != ""){
							$('.maxLengthValidation').remove();
						} 
						imageTypeValidation();
					} else {
						imageUploadJsonArr[i].imageUpPropArr[k].id = imageUploadObject.imageType_id;
						imageUploadJsonArr[i].imageUpPropArr[k].value = document.getElementById('imageType_' + imageUploadObject.imageType_id).value;
					}
				} else if (imageUploadJsonArr[i].imageUpPropArr[k].name == "MaxnoofImages") {
					if ((document.getElementById('maxImages_' + imageUploadObject.maxImages_id).value) == "") {
						if ((document.getElementById('name_' + imageUploadObject.name_id).value) != ""){
							$('.name_imagetValidation').remove();   
						} 
						if ((document.getElementById('imageType_' + imageUploadObject.imageType_id).value) != ""){
							$('.type_imageValidation').remove();
						}
						maxImageValidation()
					}else {
						imageUploadJsonArr[i].imageUpPropArr[k].id = imageUploadObject.maxImages_id;
						imageUploadJsonArr[i].imageUpPropArr[k].value = document.getElementById('maxImages_' + imageUploadObject.maxImages_id).value;
					}
				} else if (imageUploadJsonArr[i].imageUpPropArr[k].name == "Disabled") {
					imageUploadJsonArr[i].imageUpPropArr[k].id = imageUploadObject.disabled_id;
					imageUploadJsonArr[i].imageUpPropArr[k].value = document.getElementById('disabled_' + imageUploadObject.disabled_id).value;
				} else if (imageUploadJsonArr[i].imageUpPropArr[k].name == "AnswerLabel") {
					imageUploadJsonArr[i].imageUpPropArr[k].id = imageUploadObject.answer_label_id;
					imageUploadJsonArr[i].imageUpPropArr[k].value = document.getElementById('answer_label_' + imageUploadObject.answer_label_id).value;
				} else if (imageUploadJsonArr[i].imageUpPropArr[k].name == "Mandatory") {
					imageUploadJsonArr[i].imageUpPropArr[k].id = imageUploadObject.mandatory_id;
					imageUploadJsonArr[i].imageUpPropArr[k].value = document.getElementById('mandatory_' + imageUploadObject.mandatory_id).value;
				} else {

				}
			}
		}
	}
	if (duplicate == 0) {
		if ((document.getElementById('answer_label_' + imageUploadObject.answer_label_id).value) == "") {
			var imageUpPropObj = new Object();
			imageUpPropObj.value = " ";
			imageUpPropObj.id = imageUploadObject.answer_label_id;
			imageUpPropObj.name = "AnswerLabel";
			imageUpPropArr.push(imageUpPropObj);
		} else {
			var imageUpPropObj = new Object();
			imageUpPropObj.value = document.getElementById('answer_label_' + imageUploadObject.answer_label_id).value;
			imageUpPropObj.id = imageUploadObject.answer_label_id;
			imageUpPropObj.name = "AnswerLabel";
			imageUpPropArr.push(imageUpPropObj);
		}
		if ((document.getElementById('imageType_' + imageUploadObject.imageType_id).selectedIndex) == 0) {
			if ((document.getElementById('name_' + imageUploadObject.name_id).value) != ""){
				$('.name_imagetValidation').remove();   
			}
			if ((document.getElementById('maxImages_' + imageUploadObject.maxImages_id).value) != ""){
				$('.maxLengthValidation').remove();
			} 
			imageTypeValidation();
		} else {
			var imageUpPropObj = new Object();
			imageUpPropObj.value = document.getElementById('imageType_' + imageUploadObject.imageType_id).value;
			imageUpPropObj.id = imageUploadObject.imageType_id;
			imageUpPropObj.name = "ImageType";
			imageUpPropArr.push(imageUpPropObj);
		}
		if ((document.getElementById('maxImages_' + imageUploadObject.maxImages_id).value) == "") {
			if ((document.getElementById('name_' + imageUploadObject.name_id).value) != ""){
				$('.name_imagetValidation').remove();   
			} 
			if ((document.getElementById('imageType_' + imageUploadObject.imageType_id).value) != ""){
				$('.type_imageValidation').remove();
			}
			maxImageValidation(); 
		} else {
			var imageUpPropObj = new Object();
			imageUpPropObj.value = document.getElementById('maxImages_' + imageUploadObject.maxImages_id).value;
			imageUpPropObj.id = imageUploadObject.maxImages_id;
			imageUpPropObj.name = "MaxnoofImages";
			imageUpPropArr.push(imageUpPropObj);
		}
		if ((document.getElementById('mandatory_' + imageUploadObject.mandatory_id).value) == "") {

			var imageUpPropObj = new Object();
			imageUpPropObj.value = " ";
			imageUpPropObj.id = imageUploadObject.mandatory_id;
			imageUpPropObj.name = "Mandatory";
			imageUpPropArr.push(imageUpPropObj);
		} else {

			var imageUpPropObj = new Object();
			imageUpPropObj.value = document.getElementById('mandatory_' + imageUploadObject.mandatory_id).value;
			imageUpPropObj.id = imageUploadObject.mandatory_id;
			imageUpPropObj.name = "Mandatory";
			imageUpPropArr.push(imageUpPropObj);
		}
		if ((document.getElementById('name_' + imageUploadObject.name_id).value) == "") {
			if ((document.getElementById('imageType_' + imageUploadObject.imageType_id).value) != ""){
				$('.type_imageValidation').remove();
			}
			if ((document.getElementById('maxImages_' + imageUploadObject.maxImages_id).value) != ""){
				$('.maxLengthValidation').remove();
			} 
			nameValidation();
		} else {
			var imageUpPropObj = new Object();
			imageUpPropObj.value = document.getElementById('name_' + imageUploadObject.name_id).value;
			imageUpPropObj.id = imageUploadObject.name_id;
			imageUpPropObj.name = "Name";
			imageUpPropArr.push(imageUpPropObj);
		}
		if ((document.getElementById('disabled_' + imageUploadObject.disabled_id).value) == "") {
			var imageUpPropObj = new Object();
			imageUpPropObj.value = " ";
			imageUpPropObj.id = imageUploadObject.disabled_id;
			imageUpPropObj.name = "Disabled";
			imageUpPropArr.push(imageUpPropObj);
		} else {
			var imageUpPropObj = new Object();
			imageUpPropObj.value = document.getElementById('disabled_' + imageUploadObject.disabled_id).value;
			imageUpPropObj.id = imageUploadObject.disabled_id;
			imageUpPropObj.name = "Disabled";
			imageUpPropArr.push(imageUpPropObj);
		}
		if ( (document.getElementById('name_' + imageUploadObject.name_id).value) == "" ||(document.getElementById('maxImages_' + imageUploadObject.maxImages_id).value) == "" || (document.getElementById('imageType_' + imageUploadObject.imageType_id).selectedIndex) == 0){
		}
		else{
			imageUpObj.imageUpPropArr = imageUpPropArr;
			imageUploadJsonArr.push(imageUpObj);
		}
	}
	if ( (document.getElementById('name_' + imageUploadObject.name_id).value) != "" && (document.getElementById('maxImages_' + imageUploadObject.maxImages_id).value) != "" && (document.getElementById('imageType_' + imageUploadObject.imageType_id).value) != "choose an option") {
		var regCheck =/^[1-9]+[0-9]*$/;
		if(regCheck.test(document.getElementById('maxImages_' + imageUploadObject.maxImages_id).value))
		{
			$('.maxImageValidation').remove();
			$("#IUaddPropertiesPopup").modal('hide');
		}
	} 
});

$(document).on("click", ".saveGuideImgPropertiesBtn", function(e) {
	var guideImgCount = this.id.replace('saveGuideTextNum_', '');
	var sectionNum = $("#" + this.id).attr("data-sect");
	var stepNum = $("#" + this.id).attr("data-step");
	var quesNum = $("#" + this.id).attr("data-ques");
	var duplicate = 0;
	var guideImgObj = {
			sectionId: sectionNum,
			stepId: stepNum,
			questionNum: quesNum,
			guideTextNum: guideImgCount
	};
	var guidePropArr = new Array();
	for (var i = 0; i < guideImgJsonArr.length; i++){	
		if (guideImgCount == guideImgJsonArr[i].guideTextNum) {
			duplicate = 1;
			for (var k = 0; k < guideImgJsonArr[i].guidePropArr.length; k++) {
				if (guideImgJsonArr[i].guidePropArr[k].name == "Name") {
					if ((document.getElementById('name_' + guideImgObject.name_id).value) == "" || (document.getElementById('name_' + guideImgObject.name_id).value.replace(/^\s+|\s+$/g, "")).length==0) {
						nameValidationTextarea();
					}  else {
						guideImgJsonArr[i].guidePropArr[k].value = document.getElementById('name_' + guideImgObject.name_id).value;
						guideImgJsonArr[i].guidePropArr[k].id =guideImgObject.name_id;
					}
				} else if (guideImgJsonArr[i].guidePropArr[k].name == "AnswerLabel") {
					guideImgJsonArr[i].guidePropArr[k].id =guideImgObject.answer_label_id;
					guideImgJsonArr[i].guidePropArr[k].value = (document.getElementById('answer_label_' + guideImgObject.answer_label_id).value);
				} 
				else if (guideImgJsonArr[i].guidePropArr[k].name == "ImageType") {
					guideImgJsonArr[i].guidePropArr[k].id =guideImgObject.imageType_id;
					guideImgJsonArr[i].guidePropArr[k].value = (document.getElementById('imageType_' + guideImgObject.imageType_id).value);
				}
				else if (guideImgJsonArr[i].guidePropArr[k].name == "isEditable") {
					guideImgJsonArr[i].guidePropArr[k].id =guideImgObject.imageType_id;
					guideImgJsonArr[i].guidePropArr[k].value = (document.getElementById('isEditable_' + guideImgObject.isEditable_id).value);
				}
				else if (guideImgJsonArr[i].guidePropArr[k].name == "Disabled") {
					guideImgJsonArr[i].guidePropArr[k].id =guideImgObject.disabled_id;
					guideImgJsonArr[i].guidePropArr[k].value = (document.getElementById('disabled_' + guideImgObject.disabled_id).value);
				}
				else if (guideImgJsonArr[i].guidePropArr[k].name == "Mandatory") {
					guideImgJsonArr[i].guidePropArr[k].id =guideImgObject.mandatory_id;
					guideImgJsonArr[i].guidePropArr[k].value = (document.getElementById('mandatory_' + guideImgObject.mandatory_id).value);
				} else {

				}
			}
		}
		
		
	}
	
	if (duplicate == 0) {
		if ((document.getElementById('name_' + guideImgObject.name_id).value) == "" || (document.getElementById('name_' + guideImgObject.name_id).value.replace(/^\s+|\s+$/g, "")).length==0) {
			nameValidationTextarea();
		} else {
			var guideImgPropObj = new Object();
			guideImgPropObj.value = document.getElementById('name_' + guideImgObject.name_id).value;
			guideImgPropObj.id = guideImgObject.name_id;
			guideImgPropObj.name = "Name";
			guidePropArr.push(guideImgPropObj);
		}
		
		if ((document.getElementById('imageType_' + guideImgObject.imageType_id).value) == "") {
			var guideImgPropObj = new Object();
			guideImgPropObj.value = " ";
			guideImgPropObj.id = guideImgObject.imageType_id;
			guideImgPropObj.name = "ImageType";
			guidePropArr.push(guideImgPropObj);
		} else {
			var guideImgPropObj = new Object();
			guideImgPropObj.value = (document.getElementById('imageType_' + guideImgObject.imageType_id).value);
			guideImgPropObj.id = guideImgObject.imageType_id;
			guideImgPropObj.name = "ImageType";
			guidePropArr.push(guideImgPropObj);
		}
			
		if ((document.getElementById('answer_label_' + guideImgObject.answer_label_id).value) == "") {
			var guideImgPropObj = new Object();
			guideImgPropObj.value = " ";
			guideImgPropObj.id = guideImgObject.answer_label_id;
			guideImgPropObj.name = "AnswerLabel";
			guidePropArr.push(guideImgPropObj);
		} else {
			var guideImgPropObj = new Object();
			guideImgPropObj.value = (document.getElementById('answer_label_' + guideImgObject.answer_label_id).value);
			guideImgPropObj.id = guideImgObject.answer_label_id;
			guideImgPropObj.name = "AnswerLabel";
			guidePropArr.push(guideImgPropObj);
		}
		if ((document.getElementById('disabled_' + guideImgObject.disabled_id).value) == "") {
			var guideImgPropObj = new Object();
			guideImgPropObj.value = " ";
			guideImgPropObj.id = guideImgObject.disabled_id;
			guideImgPropObj.name = "Disabled";
			guidePropArr.push(guideImgPropObj);
		} else {
			var guideImgPropObj = new Object();
			guideImgPropObj.value = (document.getElementById('disabled_' + guideImgObject.disabled_id).value);
			guideImgPropObj.id = guideImgObject.disabled_id;
			guideImgPropObj.name = "Disabled";
			guidePropArr.push(guideImgPropObj);
		}
		if ((document.getElementById('mandatory_' + guideImgObject.mandatory_id).value) == "") {
			var guideImgPropObj = new Object();
			guideImgPropObj.value = " ";
			guideImgPropObj.id = guideImgObject.mandatory_id;
			guideImgPropObj.name = "Mandatory";
			guidePropArr.push(guideImgPropObj);
		} else {
			var guideImgPropObj = new Object();
			guideImgPropObj.value = (document.getElementById('mandatory_' + guideImgObject.mandatory_id).value);
			guideImgPropObj.id = guideImgObject.mandatory_id;
			guideImgPropObj.name = "Mandatory";
			guidePropArr.push(guideImgPropObj);
		}
		
		if ((document.getElementById('isEditable_' + guideImgObject.isEditable_id).value) == "") {
			var guideImgPropObj = new Object();
			guideImgPropObj.value = " ";
			guideImgPropObj.id = guideImgObject.isEditable_id;
			guideImgPropObj.name = "isEditable";
			guidePropArr.push(guideImgPropObj);
		} else {
			var guideImgPropObj = new Object();
			guideImgPropObj.value = (document.getElementById('isEditable_' + guideImgObject.isEditable_id).value);
			guideImgPropObj.id = guideImgObject.isEditable_id;
			guideImgPropObj.name = "isEditable";
			guidePropArr.push(guideImgPropObj);
		}

		if ((document.getElementById('name_' + guideImgObject.name_id).value) == ""){
			
		}else{
			guideImgObj.guidePropArr = guidePropArr;
			guideImgJsonArr.push(guideImgObj);
		}
	}
		
		if ((document.getElementById('name_' + guideImgObject.name_id).value) != "") {
			$("#GuideImgPropertiesPopup").modal('hide');
		} 
	
		
});

$(document).on("click", ".saveAddPropertiesTextAreaBtn", function(e) {
	var textAreaCount = this.id.replace('saveTextNum_', '');
	var sectionNum = $("#" + this.id).attr("data-sect");
	console.log(sectionNum);
	var stepNum = $("#" + this.id).attr("data-step");
	var quesNum = $("#" + this.id).attr("data-ques");
	var duplicate = 0;
	var textAreaObj = {
			sectionId: sectionNum,
			stepId: stepNum,
			questionNum: quesNum,
			textAreaNum: textAreaCount
	};
	var textPropArr = new Array();
	for (var i = 0; i < textAreaJsonArr.length; i++) {
		if (textAreaCount == textAreaJsonArr[i].textAreaNum) {
			duplicate = 1;
			for (var k = 0; k < textAreaJsonArr[i].textPropArr.length; k++) {
				if (textAreaJsonArr[i].textPropArr[k].name == "Name") {
					if ((document.getElementById('name_' + textAreaObject.name_id).value) == "" || (document.getElementById('name_' + textAreaObject.name_id).value.replace(/^\s+|\s+$/g, "")).length==0) {
						if ((document.getElementById('max_length_' + textAreaObject.max_length_id).value) != "") {
							$('.maxLengthValidation').remove();
						} 
						nameValidationTextarea();
					}  else {
						textAreaJsonArr[i].textPropArr[k].value = document.getElementById('name_' + textAreaObject.name_id).value;
						textAreaJsonArr[i].textPropArr[k].id =textAreaObject.name_id;
					}
				} else if (textAreaJsonArr[i].textPropArr[k].name == "MaxLength") {
					if ((document.getElementById('max_length_' + textAreaObject.max_length_id).value) == "") {
						if ((document.getElementById('name_' + textAreaObject.name_id).value) !=""){
							$('.name_textValidation').remove();
						} 
						maxLengthValidationTextArea();
					}else {
						textAreaJsonArr[i].textPropArr[k].id =textAreaObject.max_length_id;
						textAreaJsonArr[i].textPropArr[k].value = document.getElementById('max_length_' + textAreaObject.max_length_id).value;
					}
				} else if (textAreaJsonArr[i].textPropArr[k].name == "AnswerLabel") {
					textAreaJsonArr[i].textPropArr[k].id =textAreaObject.answer_label_id;
					textAreaJsonArr[i].textPropArr[k].value = (document.getElementById('answer_label_' + textAreaObject.answer_label_id).value);
				} else if (textAreaJsonArr[i].textPropArr[k].name == "Disabled") {
					textAreaJsonArr[i].textPropArr[k].id =textAreaObject.disabled_id;
					textAreaJsonArr[i].textPropArr[k].value = (document.getElementById('disabled_' + textAreaObject.disabled_id).value);
				} else if (textAreaJsonArr[i].textPropArr[k].name == "DefaultValue") {
					textAreaJsonArr[i].textPropArr[k].id =textAreaObject.defaultValue_id;
					textAreaJsonArr[i].textPropArr[k].value = (document.getElementById('defaultValue_' + textAreaObject.defaultValue_id).value);
				} else if (textAreaJsonArr[i].textPropArr[k].name == "Mandatory") {
					textAreaJsonArr[i].textPropArr[k].id =textAreaObject.mandatory_id;
					textAreaJsonArr[i].textPropArr[k].value = (document.getElementById('mandatory_' + textAreaObject.mandatory_id).value);
				} else if (textAreaJsonArr[i].textPropArr[k].name == "Visible") {
					textAreaJsonArr[i].textPropArr[k].id =textAreaObject.visible_id;
					textAreaJsonArr[i].textPropArr[k].value = (document.getElementById('visible_' + textAreaObject.visible_id).value);
				} else if (textAreaJsonArr[i].textPropArr[k].name == "ActionTag") {
					textAreaJsonArr[i].textPropArr[k].id =textAreaObject.action_tag_id;
					textAreaJsonArr[i].textPropArr[k].value = (document.getElementById('action_tag_' + textAreaObject.action_tag_id).value);
				} else if (textAreaJsonArr[i].textPropArr[k].name == "Value") {
					textAreaJsonArr[i].textPropArr[k].id =textAreaObject.valueText_id;
					textAreaJsonArr[i].textPropArr[k].value = (document.getElementById('valueText_' + textAreaObject.valueText_id).value);
				} else {

				}
			}
		}
	}
	if (duplicate == 0) {
		if ((document.getElementById('name_' + textAreaObject.name_id).value) == "" || (document.getElementById('name_' + textAreaObject.name_id).value.replace(/^\s+|\s+$/g, "")).length==0) {
			if ((document.getElementById('max_length_' + textAreaObject.max_length_id).value) != "") {
				$('.maxLengthValidation').remove();
			} 
			nameValidationTextarea();
		} else {
			var textPropObj = new Object();
			textPropObj.value = document.getElementById('name_' + textAreaObject.name_id).value;
			textPropObj.id = textAreaObject.name_id;
			textPropObj.name = "Name";
			textPropArr.push(textPropObj);
		}
		if ((document.getElementById('answer_label_' + textAreaObject.answer_label_id).value) == "") {
			var textPropObj = new Object();
			textPropObj.value = " ";
			textPropObj.id = textAreaObject.answer_label_id;
			textPropObj.name = "AnswerLabel";
			textPropArr.push(textPropObj);
		} else {
			var textPropObj = new Object();
			textPropObj.value = (document.getElementById('answer_label_' + textAreaObject.answer_label_id).value);
			textPropObj.id = textAreaObject.answer_label_id;
			textPropObj.name = "AnswerLabel";
			textPropArr.push(textPropObj);
		}
		if ((document.getElementById('max_length_' + textAreaObject.max_length_id).value) == ""  || (document.getElementById('max_length_' + textAreaObject.max_length_id).value.replace(/^\s+|\s+$/g, "")).length==0) {
			if ((document.getElementById('name_' + textAreaObject.name_id).value) !=""){
				$('.name_textValidation').remove();
			} 
			maxLengthValidationTextArea();
		}else {
			var textPropObj = new Object();
			textPropObj.value = (document.getElementById('max_length_' + textAreaObject.max_length_id).value);
			textPropObj.id = textAreaObject.max_length_id;
			textPropObj.name = "MaxLength";
			textPropArr.push(textPropObj);
		}
		if ((document.getElementById('disabled_' + textAreaObject.disabled_id).value) == "") {
			var textPropObj = new Object();
			textPropObj.value = " ";
			textPropObj.id = textAreaObject.disabled_id;
			textPropObj.name = "Disabled";
			textPropArr.push(textPropObj);
		} else {
			var textPropObj = new Object();
			textPropObj.value = (document.getElementById('disabled_' + textAreaObject.disabled_id).value);
			textPropObj.id = textAreaObject.disabled_id;
			textPropObj.name = "Disabled";
			textPropArr.push(textPropObj);
		}
		if ((document.getElementById('defaultValue_' + textAreaObject.defaultValue_id).value) == "") {
			var textPropObj = new Object();
			textPropObj.value = " ";
			textPropObj.id = textAreaObject.defaultValue_id;
			textPropObj.name = "DefaultValue";
			textPropArr.push(textPropObj);
		} else {
			var textPropObj = new Object();
			textPropObj.value = (document.getElementById('defaultValue_' + textAreaObject.defaultValue_id).value);
			textPropObj.id = textAreaObject.defaultValue_id;
			textPropObj.name = "DefaultValue";
			textPropArr.push(textPropObj);
		}
		if ((document.getElementById('mandatory_' + textAreaObject.mandatory_id).value) == "") {
			var textPropObj = new Object();
			textPropObj.value = " ";
			textPropObj.id = textAreaObject.mandatory_id;
			textPropObj.name = "Mandatory";
			textPropArr.push(textPropObj);
		} else {
			var textPropObj = new Object();
			textPropObj.value = (document.getElementById('mandatory_' + textAreaObject.mandatory_id).value);
			textPropObj.id = textAreaObject.mandatory_id;
			textPropObj.name = "Mandatory";
			textPropArr.push(textPropObj);
		}
		if ((document.getElementById('visible_' + textAreaObject.visible_id).value) == "") {
			var textPropObj = new Object();
			textPropObj.value = " ";
			textPropObj.id = textAreaObject.visible_id;
			textPropObj.name = "Visible";
			textPropArr.push(textPropObj);
		} else {
			var textPropObj = new Object();
			textPropObj.value = (document.getElementById('visible_' + textAreaObject.visible_id).value);
			textPropObj.id = textAreaObject.visible_id;
			textPropObj.name = "Visible";
			textPropArr.push(textPropObj);
		}
		if ((document.getElementById('action_tag_' + textAreaObject.action_tag_id).value) == "") {
			var textPropObj = new Object();
			textPropObj.value = " ";
			textPropObj.id = textAreaObject.action_tag_id;
			textPropObj.name = "ActionTag";
			textPropArr.push(textPropObj);

		} else {
			var textPropObj = new Object();
			textPropObj.value = (document.getElementById('action_tag_' + textAreaObject.action_tag_id).value);
			textPropObj.id = textAreaObject.action_tag_id;
			textPropObj.name = "ActionTag";
			textPropArr.push(textPropObj);
		}
		if ((document.getElementById('valueText_' + textAreaObject.valueText_id).value) == "") {
			var textPropObj = new Object();
			textPropObj.value = " ";
			textPropObj.id = textAreaObject.valueText_id;
			textPropObj.name = "Value";
			textPropArr.push(textPropObj);
		} else {
			var textPropObj = new Object();
			textPropObj.value = (document.getElementById('valueText_' + textAreaObject.valueText_id).value);
			textPropObj.id = textAreaObject.valueText_id;
			textPropObj.name = "Value";
			textPropArr.push(textPropObj);
		}
		if ((document.getElementById('name_' + textAreaObject.name_id).value) == "" || (document.getElementById('max_length_' + textAreaObject.max_length_id).value) == ""){

		}else{
			textAreaObj.textPropArr = textPropArr;
			textAreaJsonArr.push(textAreaObj);
		}
	}

	if ((document.getElementById('name_' + textAreaObject.name_id).value) != "" && (document.getElementById('max_length_' + textAreaObject.max_length_id).value) != "") {
		var regCheck =/^[1-9]+[0-9]*$/;
		if(regCheck.test(document.getElementById('max_length_' + textAreaObject.max_length_id).value))
		{
			$('.maxLengthTextAreaValidation').remove();
			$("#TAaddPropertiesPopup").modal('hide');
		}
	} 
});


$(document).on("click", ".saveAddPropertiesDropDownBtn", function(e) {
	var dropDownCount = this.id.replace('savedropDownNum_', '');
	var sectionNum = $("#" + this.id).attr("data-sect");
	var stepNum = $("#" + this.id).attr("data-step");
	var quesNum = $("#" + this.id).attr("data-ques");
	var duplicate = 0;
	var dropDownObj = {
			sectionId: sectionNum,
			stepId: stepNum,
			questionNum: quesNum,
			dropDownNum: dropDownCount
	};
	var dropDownPropArr = new Array();
	var rows=new Array();
	for (var i = 0; i < dropDownJsonArr.length; i++) {
		if (dropDownCount == dropDownJsonArr[i].dropDownNum) {
			duplicate = 1;
			for (var k = 0; k < dropDownJsonArr[i].dropDownPropArr.length; k++) {
				if (dropDownJsonArr[i].dropDownPropArr[k].name == "Name") {
					if ((document.getElementById('name_' + DropDownObject.name_id).value) == "") {
						if ((document.getElementById('valueText_' + DropDownObject.valueText_id).value) != ""){
							$('.value_dropValidations').remove();
						}
						nameDropDown();	
					}
					else{
						dropDownJsonArr[i].dropDownPropArr[k].value = document.getElementById('name_' + DropDownObject.name_id).value; 
						dropDownJsonArr[i].dropDownPropArr[k].id =DropDownObject.name_id; 
					}
				} else if (dropDownJsonArr[i].dropDownPropArr[k].name == "Multiple") {
					dropDownJsonArr[i].dropDownPropArr[k].id =DropDownObject.multiple_id; 
					dropDownJsonArr[i].dropDownPropArr[k].value = document.getElementById('multiple_' + DropDownObject.multiple_id).value;
				} else if (dropDownJsonArr[i].dropDownPropArr[k].name == "Searchable") {
					dropDownJsonArr[i].dropDownPropArr[k].id =DropDownObject.searchable_id; 
					dropDownJsonArr[i].dropDownPropArr[k].value = document.getElementById('searchable_' + DropDownObject.searchable_id).value;
				} else if (dropDownJsonArr[i].dropDownPropArr[k].name == "Visible") {
					dropDownJsonArr[i].dropDownPropArr[k].id =DropDownObject.visible_id; 
					dropDownJsonArr[i].dropDownPropArr[k].value = document.getElementById('visible_' + DropDownObject.visible_id).value;
				} else if (dropDownJsonArr[i].dropDownPropArr[k].name == "AnswerLabel") {
					dropDownJsonArr[i].dropDownPropArr[k].id =DropDownObject.answer_label_id; 
					dropDownJsonArr[i].dropDownPropArr[k].value = document.getElementById('answer_label_' + DropDownObject.answer_label_id).value;
				} else if (dropDownJsonArr[i].dropDownPropArr[k].name == "Disabled") {
					dropDownJsonArr[i].dropDownPropArr[k].id =DropDownObject.disabled_id; 
					dropDownJsonArr[i].dropDownPropArr[k].value = document.getElementById('disabled_' + DropDownObject.disabled_id).value;
				} else if (dropDownJsonArr[i].dropDownPropArr[k].name == "Mandatory") {
					dropDownJsonArr[i].dropDownPropArr[k].id =DropDownObject.mandatory_id; 
					dropDownJsonArr[i].dropDownPropArr[k].value = document.getElementById('mandatory_' + DropDownObject.mandatory_id).value;
				} else if (dropDownJsonArr[i].dropDownPropArr[k].name == "ActionTag") {
					dropDownJsonArr[i].dropDownPropArr[k].id =DropDownObject.action_tag_id; 
					dropDownJsonArr[i].dropDownPropArr[k].value = document.getElementById('action_tag_' + DropDownObject.action_tag_id).value;
				} else if (dropDownJsonArr[i].dropDownPropArr[k].name == "Value") {
					if ((document.getElementById('valueText_' + DropDownObject.valueText_id).value) == "") {
						if((document.getElementById('name_' + DropDownObject.name_id).value) != "" ){
							$('.name_dropValidation').remove();
						}
						valueDropDown();
					} 
					else{
						dropDownJsonArr[i].dropDownPropArr[k].id =DropDownObject.valueText_id; 
						dropDownJsonArr[i].dropDownPropArr[k].value = document.getElementById('valueText_' + DropDownObject.valueText_id).value;
					}
					for(var j=0;j<rulePropArr.length;j++){
     			 		if (sectionNum == rulePropArr[j].sectionId) {
                			if (stepNum == rulePropArr[j].stepId) {
                				if (rulePropArr[j].questionNum==quesNum) {
                        			if ("ansDrpDown" == rulePropArr[j].elementName) {
                           				 if (dropDownCount == rulePropArr[j].ruleNumber) {
                           				 	for (var k2 = 0; k2 < rulePropArr[j].rowArr.length; k2++) {
                           				 		rows.push(rulePropArr[j].rowArr[k2].rowId);
          									}
          								}
          							}
          						}
          					}
          				}
          			}
            		if(editDrop==1){
            			var index=0;
                   		if(valueDrop!=document.getElementById('valueText_'+DropDownObject.valueText_id).value){
                      		for (var d = 0; d < ruleMainArr.length; d++) {
            					if (sectionNum == ruleMainArr[d].sectionId) {
                					if (stepNum == ruleMainArr[d].stepId) {
                						if (ruleMainArr[d].questionNum==quesNum) {
                        					if ("ansDrpDown" == ruleMainArr[d].elementName) {
                           				 		if (dropDownCount == ruleMainArr[d].ruleNumber) {
                               						for (var k1 = 0; k1 < ruleMainArr[d].RuleArr.length; k1++) {
                                    					if (ruleMainArr[d].RuleArr[k1].idRule == rows[index]) {
                                    						ruleMainArr[d].RuleArr.splice(k1, 1);
                                        					rulePropArr[d].rowArr.splice(0, 1);
                                        					for(var m=0;m<actionRulesArr.length;m++){
                                    							if(actionRulesArr[m].elementName=="ansDrpDown"){
                                    								if(actionRulesArr[m].ruleNumber==dropDownCount){
                                    									if(actionRulesArr[m].Row==rows[index]){
                                    										actionRulesArr.splice(m,1);
                                    										m=actionRulesArr.length;
                                    									}
                                    								}
                                    							}
                                    						}
                                        					editDrop=0;
                                        					index++;
                                        					k1=-1;
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
				} else {
				}
			}
		}
	}
	if (duplicate == 0) {
		if ((document.getElementById('disabled_' + DropDownObject.disabled_id).value) == "") {
			var dropDownPropObj = new Object();
			dropDownPropObj.value = " ";
			dropDownPropObj.id = DropDownObject.disabled_id;
			dropDownPropObj.name = "Disabled";
			dropDownPropArr.push(dropDownPropObj);
		} else {
			var dropDownPropObj = new Object();
			dropDownPropObj.value = document.getElementById('disabled_' + DropDownObject.disabled_id).value;
			dropDownPropObj.id = DropDownObject.disabled_id;
			dropDownPropObj.name = "Disabled";
			dropDownPropArr.push(dropDownPropObj);
		}
		if ((document.getElementById('multiple_' + DropDownObject.multiple_id).value) == "") {
			var dropDownPropObj = new Object();
			dropDownPropObj.value = " ";
			dropDownPropObj.id = DropDownObject.multiple_id;
			dropDownPropObj.name = "Multiple";
			dropDownPropArr.push(dropDownPropObj);
		} else {
			var dropDownPropObj = new Object();
			dropDownPropObj.value = document.getElementById('multiple_' + DropDownObject.multiple_id).value;
			dropDownPropObj.id = DropDownObject.multiple_id;
			dropDownPropObj.name = "Multiple";
			dropDownPropArr.push(dropDownPropObj);
		}
		if ((document.getElementById('name_' + DropDownObject.name_id).value) == "") {
			if ((document.getElementById('valueText_' + DropDownObject.valueText_id).value) != ""){
				$('.value_dropValidations').remove();
			}
			nameDropDown();
		} else {
			var dropDownPropObj = new Object();
			dropDownPropObj.value = document.getElementById('name_' + DropDownObject.name_id).value;
			dropDownPropObj.id = DropDownObject.name_id;
			dropDownPropObj.name = "Name";
			dropDownPropArr.push(dropDownPropObj);
		}
		if ((document.getElementById('answer_label_' + DropDownObject.answer_label_id).value) == "") {
			var dropDownPropObj = new Object();
			dropDownPropObj.value = " ";
			dropDownPropObj.id = DropDownObject.answer_label_id;
			dropDownPropObj.name = "AnswerLabel";
			dropDownPropArr.push(dropDownPropObj);
		} else {
			var dropDownPropObj = new Object();
			dropDownPropObj.value = document.getElementById('answer_label_' + DropDownObject.answer_label_id).value;
			dropDownPropObj.id = DropDownObject.answer_label_id;
			dropDownPropObj.name = "AnswerLabel";
			dropDownPropArr.push(dropDownPropObj);
		}
		if ((document.getElementById('mandatory_' + DropDownObject.mandatory_id).value) == "") {
			var dropDownPropObj = new Object();
			dropDownPropObj.value = " ";
			dropDownPropObj.id = DropDownObject.mandatory_id;
			dropDownPropObj.name = "Mandatory";
			dropDownPropArr.push(dropDownPropObj);
		} else {
			var dropDownPropObj = new Object();
			dropDownPropObj.value = document.getElementById('mandatory_' + DropDownObject.mandatory_id).value;
			dropDownPropObj.id = DropDownObject.mandatory_id;
			dropDownPropObj.name = "Mandatory";
			dropDownPropArr.push(dropDownPropObj);
		}
		if ((document.getElementById('searchable_' + DropDownObject.searchable_id).value) == "") {
			var dropDownPropObj = new Object();
			dropDownPropObj.value = " ";
			dropDownPropObj.id = DropDownObject.searchable_id;
			dropDownPropObj.name = "Searchable";
			dropDownPropArr.push(dropDownPropObj);
		} else {
			var dropDownPropObj = new Object();
			dropDownPropObj.value = document.getElementById('searchable_' + DropDownObject.searchable_id).value;
			dropDownPropObj.id = DropDownObject.searchable_id;
			dropDownPropObj.name = "Searchable";
			dropDownPropArr.push(dropDownPropObj);;
		}
		if ((document.getElementById('visible_' + DropDownObject.visible_id).value) == "") {
			var dropDownPropObj = new Object();
			dropDownPropObj.value = " ";
			dropDownPropObj.id = DropDownObject.visible_id;
			dropDownPropObj.name = "Visible";
			dropDownPropArr.push(dropDownPropObj);
		} else {
			var dropDownPropObj = new Object();
			dropDownPropObj.value = document.getElementById('visible_' + DropDownObject.visible_id).value;
			dropDownPropObj.id = DropDownObject.visible_id;
			dropDownPropObj.name = "Visible";
			dropDownPropArr.push(dropDownPropObj);
		}
		if ((document.getElementById('action_tag_' + DropDownObject.action_tag_id).value) == "") {
			var dropDownPropObj = new Object();
			dropDownPropObj.value = " ";
			dropDownPropObj.id = DropDownObject.action_tag_id;
			dropDownPropObj.name = "ActionTag";
			dropDownPropArr.push(dropDownPropObj);
		} else {
			var dropDownPropObj = new Object();
			dropDownPropObj.value = document.getElementById('action_tag_' + DropDownObject.action_tag_id).value;
			dropDownPropObj.id = DropDownObject.action_tag_id;
			dropDownPropObj.name = "ActionTag";
			dropDownPropArr.push(dropDownPropObj);
		}
		if ((document.getElementById('valueText_' + DropDownObject.valueText_id).value) == "") {
			if((document.getElementById('name_' + DropDownObject.name_id).value) != "" ){
				$('.name_dropValidation').remove();
			}
			valueDropDown();
		} else {
			var dropDownPropObj = new Object();
			dropDownPropObj.value = document.getElementById('valueText_' + DropDownObject.valueText_id).value;
			dropDownPropObj.id = DropDownObject.valueText_id;
			dropDownPropObj.name = "Value";
			dropDownPropArr.push(dropDownPropObj);
		}
		if((document.getElementById('name_' + DropDownObject.name_id).value) == "" || (document.getElementById('valueText_' + DropDownObject.valueText_id).value) == ""){
		}
		else{
			dropDownObj.dropDownPropArr = dropDownPropArr;
			dropDownJsonArr.push(dropDownObj);
		}
	}
	if ((document.getElementById('name_' + DropDownObject.name_id).value) != "" && (document.getElementById('valueText_' + DropDownObject.valueText_id).value) != "") {
		var regCheck =/^([ a-z A-Z 0-9 ]*)(\|*[ a-z A-Z 0-9 ]+)+$/;
		if(regCheck.test(document.getElementById('valueText_' + DropDownObject.valueText_id).value)){
			$('.value_dropValidations').remove();
			$("#DDaddPropertiesPopup").modal('hide');
		}
		else{
			valueDropDown();
		}
	}
});


$(document).on("click", ".saveAddPropertiesDatePickerBtn", function(e) {
	var datePickerCount = this.id.replace('saveDatePickerNum_', '');
	var sectionNum = $("#" + this.id).attr("data-sect");
	var stepNum = $("#" + this.id).attr("data-step");
	var quesNum = $("#" + this.id).attr("data-ques");
	var duplicate = 0;
	var datePickerObj = {
			sectionId: sectionNum,
			stepId: stepNum,
			questionNum: quesNum,
			datePickerNum: datePickerCount
	};
	var datePickerPropArr = new Array();
	for (var i = 0; i < datePickerJsonArr.length; i++) {
		if (datePickerCount == datePickerJsonArr[i].datePickerNum) {
			duplicate = 1;
			for (var k = 0; k < datePickerJsonArr[i].datePickerPropArr.length; k++) {
				if (datePickerJsonArr[i].datePickerPropArr[k].name == "Name") {
					if ((document.getElementById('name_' + datePickerObject.name_id).value) == "") {
						nameDatePicker();
					}
					else{
						datePickerJsonArr[i].datePickerPropArr[k].value = document.getElementById('name_' + datePickerObject.name_id).value;
						datePickerJsonArr[i].datePickerPropArr[k].id =datePickerObject.name_id;
					}
				} else if (datePickerJsonArr[i].datePickerPropArr[k].name == "AnswerLabel") {
					datePickerJsonArr[i].datePickerPropArr[k].id =datePickerObject.answer_label_id;
					datePickerJsonArr[i].datePickerPropArr[k].value = document.getElementById('answer_label_' + datePickerObject.answer_label_id).value;
				} else if (datePickerJsonArr[i].datePickerPropArr[k].name == "Disabled") {
					datePickerJsonArr[i].datePickerPropArr[k].id =datePickerObject.disabled_id;
					datePickerJsonArr[i].datePickerPropArr[k].value = document.getElementById('disabled_' + datePickerObject.disabled_id).value;
				} else if (datePickerJsonArr[i].datePickerPropArr[k].name == "Mandatory") {
					datePickerJsonArr[i].datePickerPropArr[k].id =datePickerObject.mandatory_id;
					datePickerJsonArr[i].datePickerPropArr[k].value = document.getElementById('mandatory_' + datePickerObject.mandatory_id).value;
				} else if (datePickerJsonArr[i].datePickerPropArr[k].name == "DateFormat") {
					datePickerJsonArr[i].datePickerPropArr[k].id =datePickerObject.dateFormat_id;
					datePickerJsonArr[i].datePickerPropArr[k].value = document.getElementById('dateFormat_' + datePickerObject.dateFormat_id).value;
				} else if (datePickerJsonArr[i].datePickerPropArr[k].name == "DefaultValue") {
					datePickerJsonArr[i].datePickerPropArr[k].id =datePickerObject.defaultValue_id;
					datePickerJsonArr[i].datePickerPropArr[k].value = document.getElementById('defaultValue_' + datePickerObject.defaultValue_id).value;
				} else if (datePickerJsonArr[i].datePickerPropArr[k].name == "Visible") {
					datePickerJsonArr[i].datePickerPropArr[k].id =datePickerObject.visible_id;
					datePickerJsonArr[i].datePickerPropArr[k].value = document.getElementById('visible_' + datePickerObject.visible_id).value;
				} else if (datePickerJsonArr[i].datePickerPropArr[k].name == "ActionTag") {
					datePickerJsonArr[i].datePickerPropArr[k].id =datePickerObject.action_tag_id;
					datePickerJsonArr[i].datePickerPropArr[k].value = document.getElementById('action_tag_' + datePickerObject.action_tag_id).value;
				} else if (datePickerJsonArr[i].datePickerPropArr[k].name == "Value") {
					datePickerJsonArr[i].datePickerPropArr[k].id =datePickerObject.valueText_id;
					datePickerJsonArr[i].datePickerPropArr[k].value = document.getElementById('valueText_' + datePickerObject.valueText_id).value;
				} else {

				}
			}
		}
	}
	if (duplicate == 0) {
		if ((document.getElementById('answer_label_' + datePickerObject.answer_label_id).value) == "") {
			var datePickerPropObj = new Object();
			datePickerPropObj.value = " ";
			datePickerPropObj.id = datePickerObject.answer_label_id;
			datePickerPropObj.name = "AnswerLabel";
			datePickerPropArr.push(datePickerPropObj);
		} else {
			var datePickerPropObj = new Object();
			datePickerPropObj.value = document.getElementById('answer_label_' + datePickerObject.answer_label_id).value;
			datePickerPropObj.id = datePickerObject.answer_label_id;
			datePickerPropObj.name = "AnswerLabel";
			datePickerPropArr.push(datePickerPropObj);
		}
		if ((document.getElementById('name_' + datePickerObject.name_id).value) == "") {
			nameDatePicker();
		} else {
			var datePickerPropObj = new Object();
			datePickerPropObj.value = document.getElementById('name_' + datePickerObject.name_id).value;
			datePickerPropObj.id = datePickerObject.name_id;
			datePickerPropObj.name = "Name";
			datePickerPropArr.push(datePickerPropObj);
		}
		if ((document.getElementById('disabled_' + datePickerObject.disabled_id).value) == "") {
			var datePickerPropObj = new Object();
			datePickerPropObj.value = " ";
			datePickerPropObj.id = datePickerObject.disabled_id;
			datePickerPropObj.name = "Disabled";
			datePickerPropArr.push(datePickerPropObj);
		} else {
			var datePickerPropObj = new Object();
			datePickerPropObj.value = document.getElementById('disabled_' + datePickerObject.disabled_id).value;
			datePickerPropObj.id = datePickerObject.disabled_id;
			datePickerPropObj.name = "Disabled";
			datePickerPropArr.push(datePickerPropObj);
		}
		if ((document.getElementById('mandatory_' + datePickerObject.mandatory_id).value) == "") {
			var datePickerPropObj = new Object();
			datePickerPropObj.value = " ";
			datePickerPropObj.id = datePickerObject.answer_label_id;
			datePickerPropObj.name = "Mandatory";
			datePickerPropArr.push(datePickerPropObj);
		} else {
			var datePickerPropObj = new Object();
			datePickerPropObj.value = document.getElementById('mandatory_' + datePickerObject.mandatory_id).value;
			datePickerPropObj.id = datePickerObject.mandatory_id;
			datePickerPropObj.name = "Mandatory";
			datePickerPropArr.push(datePickerPropObj);
		}
		if ((document.getElementById('dateFormat_' + datePickerObject.dateFormat_id).value) == "") {
			var datePickerPropObj = new Object();
			datePickerPropObj.value = " ";
			datePickerPropObj.id = datePickerObject.dateFormat_id;
			datePickerPropObj.name = "DateFormat";
			datePickerPropArr.push(datePickerPropObj);
		} else {
			var datePickerPropObj = new Object();
			datePickerPropObj.value = document.getElementById('dateFormat_' + datePickerObject.dateFormat_id).value;
			datePickerPropObj.id = datePickerObject.dateFormat_id;
			datePickerPropObj.name = "DateFormat";
			datePickerPropArr.push(datePickerPropObj);
		}
		if ((document.getElementById('defaultValue_' + datePickerObject.defaultValue_id).value) == "") {
			var datePickerPropObj = new Object();
			datePickerPropObj.value = " ";
			datePickerPropObj.id = datePickerObject.defaultValue_id;
			datePickerPropObj.name = "DefaultValue";
			datePickerPropArr.push(datePickerPropObj);
		} else {
			var datePickerPropObj = new Object();
			datePickerPropObj.value = document.getElementById('defaultValue_' + datePickerObject.defaultValue_id).value;
			datePickerPropObj.id = datePickerObject.defaultValue_id;
			datePickerPropObj.name = "DefaultValue";
			datePickerPropArr.push(datePickerPropObj);
		}
		if ((document.getElementById('visible_' + datePickerObject.visible_id).value) == "") {
			var datePickerPropObj = new Object();
			datePickerPropObj.value = " ";
			datePickerPropObj.id = datePickerObject.visible_id;
			datePickerPropObj.name = "Visible";
			datePickerPropArr.push(datePickerPropObj);
		} else {
			var datePickerPropObj = new Object();
			datePickerPropObj.value = document.getElementById('visible_' + datePickerObject.visible_id).value;
			datePickerPropObj.id = datePickerObject.visible_id;
			datePickerPropObj.name = "Visible";
			datePickerPropArr.push(datePickerPropObj);
		}
		if ((document.getElementById('action_tag_' + datePickerObject.action_tag_id).value) == "") {
			var datePickerPropObj = new Object();
			datePickerPropObj.value = " ";
			datePickerPropObj.id = datePickerObject.action_tag_id;
			datePickerPropObj.name = "ActionTag";
			datePickerPropArr.push(datePickerPropObj);
		} else {
			var datePickerPropObj = new Object();
			datePickerPropObj.value = document.getElementById('action_tag_' + datePickerObject.action_tag_id).value;
			datePickerPropObj.id = datePickerObject.action_tag_id;
			datePickerPropObj.name = "ActionTag";
			datePickerPropArr.push(datePickerPropObj);
		}
		if ((document.getElementById('valueText_' + datePickerObject.valueText_id).value) == "") {
			var datePickerPropObj = new Object();
			datePickerPropObj.value = " ";
			datePickerPropObj.id = datePickerObject.valueText_id;
			datePickerPropObj.name = "Value";
			datePickerPropArr.push(datePickerPropObj);
		} else {
			var datePickerPropObj = new Object();
			datePickerPropObj.value = document.getElementById('valueText_' + datePickerObject.valueText_id).value;
			datePickerPropObj.id = datePickerObject.valueText_id;
			datePickerPropObj.name = "Value";
			datePickerPropArr.push(datePickerPropObj);
		}
		if ((document.getElementById('name_' + datePickerObject.name_id).value) == ""){

		}else{
			datePickerObj.datePickerPropArr = datePickerPropArr;
			datePickerJsonArr.push(datePickerObj);
		}
	}
	if ((document.getElementById('name_' + datePickerObject.name_id).value) != "") {
		$("#DPaddPropertiesPopup").modal('hide');
	}
});
$(document).on("click", ".saveAddPropertiesCheckBoxBtn", function(e) {
	var checkBoxCount = this.id.replace('saveCheckBoxNum_', '');
	var sectionNum = $("#" + this.id).attr("data-sect");
	var stepNum = $("#" + this.id).attr("data-step");
	var quesNum = $("#" + this.id).attr("data-ques");
	var duplicate = 0;
	var checkBoxObj = {
			sectionId: sectionNum,
			stepId: stepNum,
			questionNum: quesNum,
			checkBoxNum: checkBoxCount
	};
	var checkBoxPropArr = new Array();
	var checkValueArr=new Array();
	var rows=new Array();
	var choiceValidateFlag=1;
	for (var i = 0; i < checkBoxJsonArr.length; i++) {
		if (checkBoxCount == checkBoxJsonArr[i].checkBoxNum) {
			duplicate = 1;
			$(".choiceCheckbox tr").each(function(){
				$("td", this).each(function(){
				var chkObject=new Object();
				var val1=$(this).find('input[type=text]').val();
				var order1=$(this).find('input[type=text]').attr("id").replace('text_','');
				chkObject.value=val1;
				chkObject.order=order1;
				checkValueArr.push(chkObject);
				});
			});
			for(var m=0;m<checkValueArr.length;m++){
				if(checkValueArr[m].value.replace(/^\s+|\s+$/g, "").length!=0){
					choiceValidateFlag=0;
				}
			}
			if(choiceValidateFlag==1){
				$(".checkBovValueVAlidation").remove();
				$(".addValidateCheckbox").append("<span class=\"checkBovValueVAlidation\" style=\"padding-left:10px;color:red;\">Please Enter Choice</span>");
			}
			else{
				$(".checkBovValueVAlidation").remove();
				checkBoxJsonArr[i].checkValueArr=[];
				checkBoxJsonArr[i].checkValueArr= checkValueArr;
			}
		
			for (var k = 0; k < checkBoxJsonArr[i].checkBoxPropArr.length; k++) {
				if (checkBoxJsonArr[i].checkBoxPropArr[k].name == "Name") {
					if ((document.getElementById('name_' + checkBoxObject.name_id).value) == "") {
						/*if ((document.getElementById('valueText_' + checkBoxObject.valueText_id).value) != ""){
							$('.value_chkValidation').remove();
							var focusSet= false;   
						} */
						$('.maxLengthValidation').remove();
						var focusSet= false;
						if ($(".name_chk").parent().next(".validation").length == 0)
						{
							$(".name_chk").parents("tr").after("<tr class='maxLengthValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter name</td></tr>");
						}
						$(".name_chk").val("");
						focusSet = true; 
					}
					else{
						checkBoxJsonArr[i].checkBoxPropArr[k].value = document.getElementById('name_' + checkBoxObject.name_id).value; 
					}
				} else if (checkBoxJsonArr[i].checkBoxPropArr[k].name == "AnswerLabel") {
					checkBoxJsonArr[i].checkBoxPropArr[k].value = (document.getElementById('answer_label_' + checkBoxObject.answer_label_id).value);
				} else if (checkBoxJsonArr[i].checkBoxPropArr[k].name == "Disabled") {
					checkBoxJsonArr[i].checkBoxPropArr[k].value = (document.getElementById('disabled_' + checkBoxObject.disabled_id).value);
				} else if (checkBoxJsonArr[i].checkBoxPropArr[k].name == "DefaultValue") {
					checkBoxJsonArr[i].checkBoxPropArr[k].value = (document.getElementById('defaultValue_' + checkBoxObject.defaultValue_id).value);
				} else if (checkBoxJsonArr[i].checkBoxPropArr[k].name == "Mandatory") {
					checkBoxJsonArr[i].checkBoxPropArr[k].value = (document.getElementById('mandatory_' + checkBoxObject.mandatory_id).value);
				} else if (checkBoxJsonArr[i].checkBoxPropArr[k].name == "Visible") {
					checkBoxJsonArr[i].checkBoxPropArr[k].value = (document.getElementById('visible_' + checkBoxObject.visible_id).value);
				} else if (checkBoxJsonArr[i].checkBoxPropArr[k].name == "ActionTag") {
					checkBoxJsonArr[i].checkBoxPropArr[k].value = (document.getElementById('action_tag_' + checkBoxObject.action_tag_id).value);
				} /*else if (checkBoxJsonArr[i].checkBoxPropArr[k].name == "Value") {
					if ((document.getElementById('valueText_' + checkBoxObject.valueText_id).value) == "") {
						if ((document.getElementById('name_' + checkBoxObject.name_id).value) != ""){
							$('.maxLengthValidation').remove();
						}
						$('.value_chkValidation').remove();
						var focusSet= false;
						if ($(".value_chk").parent().next(".validation").length == 0) 
						{
							$(".value_chk").parents("tr").after("<tr class='value_chkValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter value</td></tr>");
						}
						$(".value_chk").val("");
						focusSet = true;
					}
					else{
						checkBoxJsonArr[i].checkBoxPropArr[k].value = (document.getElementById('valueText_' + checkBoxObject.valueText_id).value);

					}
					for(var j=0;j<ruleChkArr.length;j++){
						if (sectionNum == ruleChkArr[j].sectionId) {
							if (stepNum == ruleChkArr[j].stepId) {
								if (ruleChkArr[j].questionNum==quesNum) {
									if ("anscheckBox" == ruleChkArr[j].elementName) {
										if (checkBoxCount == ruleChkArr[j].ruleNumber) {
											for (var k2 = 0; k2 < ruleChkArr[j].rowChkArr.length; k2++) {
												rows.push(ruleChkArr[j].rowChkArr[k2].rowId);
											}
										}
									}
								}
							}
						}
					}
					if(editCheckBox==1){
						var index=0;
						if(valueCheck!=document.getElementById('valueText_'+checkBoxObject.valueText_id).value){
							for (var d = 0; d < ruleMainArr.length; d++) {
								if (sectionNum == ruleMainArr[d].sectionId) {
									if (stepNum == ruleMainArr[d].stepId) {
										if (ruleMainArr[d].questionNum==quesNum) {
											if ("anscheckBox" == ruleMainArr[d].elementName) {
												if (checkBoxCount == ruleMainArr[d].ruleNumber) {
													for (var k1 = 0; k1 < ruleMainArr[d].RuleArr.length; k1++) {
														if (ruleMainArr[d].RuleArr[k1].idRule == rows[index]) {
															ruleMainArr[d].RuleArr.splice(k1, 1);
															ruleChkArr[d].rowChkArr.splice(0, 1);
															for(var m=0;m<actionRulesArr.length;m++){
																if(actionRulesArr[m].elementName=="anscheckBox"){
																	if(actionRulesArr[m].ruleNumber==checkBoxCount){
																		if(actionRulesArr[m].Row==rows[index]){
																			actionRulesArr.splice(m,1);
																			m=actionRulesArr.length;
																		}
																	}
																}
															}
															editCheckBox=0;
															index++;
															k1=-1;
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
				} else {

				}*/
			}
		}
	}
	if (duplicate == 0) {
		$(".choiceCheckbox tr").each(function(){
			$("td", this).each(function(){
			var chkObject=new Object();
			var val1=$(this).find('input[type=text]').val();
			var order1=$(this).find('input[type=text]').attr("id").replace('text_','');
			chkObject.value=val1;
			chkObject.order=order1;
			checkValueArr.push(chkObject);
			});
		});
		for(var m=0;m<checkValueArr.length;m++){
			if(checkValueArr[m].value.replace(/^\s+|\s+$/g, "").length!=0){
				choiceValidateFlag=0;
			}
		}
		if(choiceValidateFlag==1){
			$(".checkBovValueVAlidation").remove();
			$(".addValidateCheckbox").append("<span class=\"checkBovValueVAlidation\" style=\"padding-left:10px;color:red;\">Please Enter Choice</span>");
		}
		else{
			$(".checkBovValueVAlidation").remove();
		}
		if ((document.getElementById('answer_label_' + checkBoxObject.answer_label_id).value) == "") {
			var checkBoxPropObj = new Object();
			checkBoxPropObj.value = " ";
			checkBoxPropObj.id = checkBoxObject.answer_label_id;
			checkBoxPropObj.name = "AnswerLabel";
			checkBoxPropArr.push(checkBoxPropObj);
		} else {
			var checkBoxPropObj = new Object();
			checkBoxPropObj.value = document.getElementById('answer_label_' + checkBoxObject.answer_label_id).value;
			checkBoxPropObj.id = checkBoxObject.answer_label_id;
			checkBoxPropObj.name = "AnswerLabel";
			checkBoxPropArr.push(checkBoxPropObj);
		}
		if ((document.getElementById('name_' + checkBoxObject.name_id).value) == "") {
			$('.maxLengthValidation').remove();
			if ($(".name_chk").parent().next(".validation").length == 0) // only add if not added
			{
				$(".name_chk").parents("tr").after("<tr class='maxLengthValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter name</td></tr>");
			}
			$(".name_chk").val("");
			focusSet = true; 
		} else {
			var checkBoxPropObj = new Object();
			checkBoxPropObj.value = document.getElementById('name_' + checkBoxObject.name_id).value;
			checkBoxPropObj.id = checkBoxObject.name_id;
			checkBoxPropObj.name = "Name";
			checkBoxPropArr.push(checkBoxPropObj);
		}
		if ((document.getElementById('disabled_' + checkBoxObject.disabled_id).value) == "") {
			var checkBoxPropObj = new Object();
			checkBoxPropObj.value = " ";
			checkBoxPropObj.id = checkBoxObject.disabled_id;
			checkBoxPropObj.name = "Disabled";
			checkBoxPropArr.push(checkBoxPropObj);
		} else {
			var checkBoxPropObj = new Object();
			checkBoxPropObj.value = document.getElementById('disabled_' + checkBoxObject.disabled_id).value;
			checkBoxPropObj.id = checkBoxObject.disabled_id;
			checkBoxPropObj.name = "Disabled";
			checkBoxPropArr.push(checkBoxPropObj);
		}
		if ((document.getElementById('defaultValue_' + checkBoxObject.defaultValue_id).value) == "") {
			var checkBoxPropObj = new Object();
			checkBoxPropObj.value = " ";
			checkBoxPropObj.id = checkBoxObject.defaultValue_id;
			checkBoxPropObj.name = "DefaultValue";
			checkBoxPropArr.push(checkBoxPropObj);
		} else {
			var checkBoxPropObj = new Object();
			checkBoxPropObj.value = document.getElementById('defaultValue_' + checkBoxObject.defaultValue_id).value;
			checkBoxPropObj.id = checkBoxObject.defaultValue_id;
			checkBoxPropObj.name = "DefaultValue";
			checkBoxPropArr.push(checkBoxPropObj);
		}
		if ((document.getElementById('mandatory_' + checkBoxObject.mandatory_id).value) == "") {
			var checkBoxPropObj = new Object();
			checkBoxPropObj.value = " ";
			checkBoxPropObj.id = checkBoxObject.mandatory_id;
			checkBoxPropObj.name = "Mandatory";
			checkBoxPropArr.push(checkBoxPropObj);
		} else {
			var checkBoxPropObj = new Object();
			checkBoxPropObj.value = document.getElementById('mandatory_' + checkBoxObject.mandatory_id).value;
			checkBoxPropObj.id = checkBoxObject.mandatory_id;
			checkBoxPropObj.name = "Mandatory";
			checkBoxPropArr.push(checkBoxPropObj);
		}
		if ((document.getElementById('visible_' + checkBoxObject.visible_id).value) == "") {
			var checkBoxPropObj = new Object();
			checkBoxPropObj.value = " ";
			checkBoxPropObj.id = checkBoxObject.visible_id;
			checkBoxPropObj.name = "Visible";
			checkBoxPropArr.push(checkBoxPropObj);
		} else {
			var checkBoxPropObj = new Object();
			checkBoxPropObj.value = document.getElementById('visible_' + checkBoxObject.visible_id).value;
			checkBoxPropObj.id = checkBoxObject.visible_id;
			checkBoxPropObj.name = "Visible";
			checkBoxPropArr.push(checkBoxPropObj);
		}
		if ((document.getElementById('action_tag_' + checkBoxObject.action_tag_id).value) == "") {
			var checkBoxPropObj = new Object();
			checkBoxPropObj.value = " ";
			checkBoxPropObj.id = checkBoxObject.action_tag_id;
			checkBoxPropObj.name = "ActionTag";
			checkBoxPropArr.push(checkBoxPropObj);
		} else {
			var checkBoxPropObj = new Object();
			checkBoxPropObj.value = document.getElementById('action_tag_' + checkBoxObject.action_tag_id).value;
			checkBoxPropObj.id = checkBoxObject.action_tag_id;
			checkBoxPropObj.name = "ActionTag";
			checkBoxPropArr.push(checkBoxPropObj);
		}
		/*if ((document.getElementById('valueText_' + checkBoxObject.valueText_id).value) == "") {
			if ((document.getElementById('name_' + checkBoxObject.name_id).value) != ""){
				$('.maxLengthValidation').remove();
			}
			$('.value_chkValidation').remove();
			if ($(".value_chk").parent().next(".validation").length == 0) {
				$(".value_chk").parents("tr").after("<tr class='value_chkValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter value</td></tr>");
			}
			$(".value_chk").val("");
			focusSet = true;
		} else {
			var checkBoxPropObj = new Object();
			checkBoxPropObj.value = document.getElementById('valueText_' + checkBoxObject.valueText_id).value;
			checkBoxPropObj.id = checkBoxObject.valueText_id;
			checkBoxPropObj.name = "Value";
			checkBoxPropArr.push(checkBoxPropObj);
		}*/
		if ((document.getElementById('name_' + checkBoxObject.name_id).value) == "" || choiceValidateFlag==1) {
		}
		else{
			checkBoxObj.checkBoxPropArr = checkBoxPropArr;
			checkBoxObj.checkValueArr = checkValueArr;
			checkBoxJsonArr.push(checkBoxObj);
		}
	}
	if ((document.getElementById('name_' + checkBoxObject.name_id).value) != "" && choiceValidateFlag!=1) {
		$("#checkAddPropertiesPopup").modal('hide');
	} else {}
});
$(document).on("click", ".saveAddPropertiesRadioBtn", function(e) {
	var radioBtnCount = this.id.replace('saveRadioNum_', '');
	var sectionNum = $("#" + this.id).attr("data-sect");
	var stepNum = $("#" + this.id).attr("data-step");
	var quesNum = $("#" + this.id).attr("data-ques");
	var duplicate = 0;
	var radioButtonObj = {
			sectionId: sectionNum,
			stepId: stepNum,
			questionNum: quesNum,
			radioBntNum: radioBtnCount
	};
	var radioPropArr = new Array();
	var radioValueArr=new Array();
	var rows=new Array();
	var choiceValidateFlag=1;
	for (var i = 0; i < radioButtonJsonArr.length; i++) {
		if (radioBtnCount == radioButtonJsonArr[i].radioBntNum) {
			duplicate = 1;
			$(".choice tr").each(function(){
				$("td", this).each(function(){
				var radioObject=new Object();
				var val1=$(this).find('input[type=text]').val();
				var order1=$(this).find('input[type=text]').attr("id").replace('text_','');
				radioObject.value=val1;
				radioObject.order=order1;
				radioValueArr.push(radioObject);
				});
			});
			for(var m=0;m<radioValueArr.length;m++){
				if(radioValueArr[m].value.replace(/^\s+|\s+$/g, "").length!=0){
					choiceValidateFlag=0;
				}
			}
			if(choiceValidateFlag==1){
				$(".radioValueVAlidation").remove();
				$(".addValidate").append("<span class=\"radioValueVAlidation\" style=\"padding-left:10px;color:red;\">Please Enter Value</span>");
			}
			else{
				$(".radioValueVAlidation").remove();
				radioButtonJsonArr[i].radioValueArr=[];
				radioButtonJsonArr[i].radioValueArr= radioValueArr;
			}
		
			for (var k = 0; k < radioButtonJsonArr[i].radioPropArr.length; k++) {
				if (radioButtonJsonArr[i].radioPropArr[k].name == "Name") {
					if ((document.getElementById('name_' + radioButtonObject.name_id).value) == "") {
						/*if ((document.getElementById('valueText_' + radioButtonObject.valueText_id).value) != ""){
							$('.value_radioValidation').remove();
						}*/
						nameValidationRadioBtn();
					} 
					else{
						radioButtonJsonArr[i].radioPropArr[k].value = document.getElementById('name_' + radioButtonObject.name_id).value; 
						radioButtonJsonArr[i].radioPropArr[k].id =radioButtonObject.name_id; 
					}
				} else if (radioButtonJsonArr[i].radioPropArr[k].name == "AnswerLabel" ||radioButtonJsonArr[i].radioPropArr[k].name == "answerLabel") {
					radioButtonJsonArr[i].radioPropArr[k].value = (document.getElementById('answer_label_' + radioButtonObject.answer_label_id).value);
					radioButtonJsonArr[i].radioPropArr[k].id =  radioButtonObject.answer_label_id;
				} else if (radioButtonJsonArr[i].radioPropArr[k].name == "Disabled") {
					radioButtonJsonArr[i].radioPropArr[k].id =radioButtonObject.disabled_id; 
					radioButtonJsonArr[i].radioPropArr[k].value = (document.getElementById('disabled_' + radioButtonObject.disabled_id).value);
				} else if (radioButtonJsonArr[i].radioPropArr[k].name == "Default Value" || radioButtonJsonArr[i].radioPropArr[k].name == "DefaultValue") {
					radioButtonJsonArr[i].radioPropArr[k].id =radioButtonObject.defaultValue_id; 
					radioButtonJsonArr[i].radioPropArr[k].value = (document.getElementById('defaultValue_' + radioButtonObject.defaultValue_id).value);
				} else if (radioButtonJsonArr[i].radioPropArr[k].name == "Mandatory") {
					radioButtonJsonArr[i].radioPropArr[k].id =radioButtonObject.mandatory_id;
					radioButtonJsonArr[i].radioPropArr[k].value = (document.getElementById('mandatory_' + radioButtonObject.mandatory_id).value);
				} else if (radioButtonJsonArr[i].radioPropArr[k].name == "Visible") {
					radioButtonJsonArr[i].radioPropArr[k].id =radioButtonObject.visible_id;
					radioButtonJsonArr[i].radioPropArr[k].value = (document.getElementById('visible_' + radioButtonObject.visible_id).value);
				} else if (radioButtonJsonArr[i].radioPropArr[k].name == "ActionTag") {
					radioButtonJsonArr[i].radioPropArr[k].id =radioButtonObject.action_tag_id;
					radioButtonJsonArr[i].radioPropArr[k].value = (document.getElementById('action_tag_' + radioButtonObject.action_tag_id).value);
				}
			}
		}
	}
	if (duplicate == 0) {
		$(".choice tr").each(function(){
			$("td", this).each(function(){
			var radioObject=new Object();
			var val1=$(this).find('input[type=text]').val();
			var order1=$(this).find('input[type=text]').attr("id").replace('text_','');
			radioObject.value=val1;
			radioObject.order=order1;
			radioValueArr.push(radioObject);
			});
		});
		for(var i=0;i<radioValueArr.length;i++){
			if(radioValueArr[i].value.replace(/^\s+|\s+$/g, "").length!=0){
				choiceValidateFlag=0;
			}
		}
		if(choiceValidateFlag==1){
			$(".radioValueVAlidation").remove();
			$(".addValidate").append("<span class=\"radioValueVAlidation\" style=\"padding-left:10px;color:red;\">Please Enter Value</span>");
		}
		else{
			$(".radioValueVAlidation").remove();
		}
		if ((document.getElementById('disabled_' + radioButtonObject.disabled_id).value) == "") {
			var radioPropObj = new Object();
			radioPropObj.value = " ";
			radioPropObj.id = radioButtonObject.disabled_id;
			radioPropObj.name = "Disabled";
			radioPropArr.push(radioPropObj);
		} else {
			var radioPropObj = new Object();
			radioPropObj.value = document.getElementById('disabled_' + radioButtonObject.disabled_id).value;
			radioPropObj.id = radioButtonObject.disabled_id;
			radioPropObj.name = "Disabled";
			radioPropArr.push(radioPropObj);
		}
		if ((document.getElementById('defaultValue_' + radioButtonObject.defaultValue_id).value) == "") {
			var radioPropObj = new Object();
			radioPropObj.value = " ";
			radioPropObj.id = radioButtonObject.defaultValue_id;
			radioPropObj.name = "Default Value";
			radioPropArr.push(radioPropObj);
		} else {
			var radioPropObj = new Object();
			radioPropObj.value = (document.getElementById('defaultValue_' + radioButtonObject.defaultValue_id).value);
			radioPropObj.id = radioButtonObject.defaultValue_id;
			radioPropObj.name = "Default Value";
			radioPropArr.push(radioPropObj);
		}
		if ((document.getElementById('answer_label_' + radioButtonObject.answer_label_id).value) == "") {

			var radioPropObj = new Object();
			radioPropObj.value = " ";
			radioPropObj.id = radioButtonObject.answer_label_id;
			radioPropObj.name = "AnswerLabel";
			radioPropArr.push(radioPropObj);
		} else {
			var radioPropObj = new Object();
			radioPropObj.value = document.getElementById('answer_label_' + radioButtonObject.answer_label_id).value;
			radioPropObj.id = radioButtonObject.answer_label_id;
			radioPropObj.name = "AnswerLabel";
			radioPropArr.push(radioPropObj);
		}
		if ((document.getElementById('mandatory_' + radioButtonObject.mandatory_id).value) == "") {
			var radioPropObj = new Object();
			radioPropObj.value = " ";
			radioPropObj.id = radioButtonObject.mandatory_id;
			radioPropObj.name = "Mandatory";
			radioPropArr.push(radioPropObj);
		} else {
			var radioPropObj = new Object();
			radioPropObj.value = document.getElementById('mandatory_' + radioButtonObject.mandatory_id).value;
			radioPropObj.id = radioButtonObject.mandatory_id;
			radioPropObj.name = "Mandatory";
			radioPropArr.push(radioPropObj);
		}
		if ((document.getElementById('name_' + radioButtonObject.name_id).value) == "") {
			/*if ((document.getElementById('valueText_' + radioButtonObject.valueText_id).value) != ""){
				$('.value_radioValidation').remove();
			}*/
			nameValidationRadioBtn();
		} else {
			var radioPropObj = new Object();
			radioPropObj.value = document.getElementById('name_' + radioButtonObject.name_id).value;
			radioPropObj.id = radioButtonObject.name_id;
			radioPropObj.name = "Name";
			radioPropArr.push(radioPropObj);
		}
		if ((document.getElementById('visible_' + radioButtonObject.visible_id).value) == "") {
			var radioPropObj = new Object();
			radioPropObj.value = " ";
			radioPropObj.id = radioButtonObject.visible_id;
			radioPropObj.name = "Visible";
			radioPropArr.push(radioPropObj);
		} else {
			var radioPropObj = new Object();
			radioPropObj.value = document.getElementById('visible_' + radioButtonObject.visible_id).value;
			radioPropObj.id = radioButtonObject.visible_id;
			radioPropObj.name = "Visible";
			radioPropArr.push(radioPropObj);
		}
		if ((document.getElementById('action_tag_' + radioButtonObject.action_tag_id).value) == "") {
			var radioPropObj = new Object();
			radioPropObj.value = " ";
			radioPropObj.id = radioButtonObject.action_tag_id;
			radioPropObj.name = "ActionTag";
			radioPropArr.push(radioPropObj);
		} else {
			var radioPropObj = new Object();
			radioPropObj.value = (document.getElementById('action_tag_' + radioButtonObject.action_tag_id).value);
			radioPropObj.id = radioButtonObject.action_tag_id;
			radioPropObj.name = "ActionTag";
			radioPropArr.push(radioPropObj);
		}
		//if(.find('input[type=text]').val();)
		/*if ((document.getElementById('valueText_' + radioButtonObject.valueText_id).value) == "") {
			if ((document.getElementById('name_' + radioButtonObject.name_id).value) != ""){
				$('.name_radioValidation').remove();
			}
			valueValidationRadioBtn();
		} else {
			var radioPropObj = new Object();
			radioPropObj.value = document.getElementById('valueText_' + radioButtonObject.valueText_id).value;
			radioPropObj.id = radioButtonObject.valueText_id;
			radioPropObj.name = "Value";
			radioPropArr.push(radioPropObj);
		}*/
		if ((document.getElementById('name_' + radioButtonObject.name_id).value) == "" || choiceValidateFlag==1){
		}else{
			radioButtonObj.radioPropArr = radioPropArr;
			radioButtonObj.radioValueArr = radioValueArr;
			radioButtonJsonArr.push(radioButtonObj);
		}
	}
	console.log(JSON.stringify(radioButtonJsonArr));
	if ((document.getElementById('name_' + radioButtonObject.name_id).value) != "" && choiceValidateFlag!=1) {
		$("#radioAddPropertiesPopup").modal('hide');
	} else {
	}
});
$(document).on("click", ".saveAddPropertiesTextBoxBtn", function(e) {
	var textBoxCount = this.id.replace('saveTextBoxNum_', '');
	var sectionNum = $("#" + this.id).attr("data-sect");
	var stepNum = $("#" + this.id).attr("data-step");
	var quesNum = $("#" + this.id).attr("data-ques");
	var duplicate = 0;
	var textBoxObj = {
			sectionId: sectionNum,
			stepId: stepNum,
			questionNum: quesNum,
			textBoxNum: textBoxCount
	};
	var textBoxPropArr = new Array();
	for (var i = 0; i < textBoxJsonArr.length; i++) {
		if (textBoxCount == textBoxJsonArr[i].textBoxNum) {
			duplicate = 1;
			for (var k = 0; k < textBoxJsonArr[i].textBoxPropArr.length; k++) {
				if (textBoxJsonArr[i].textBoxPropArr[k].name == "Name") {
					if ((document.getElementById('name_' + textBoxObject.name_id).value) == "") {
						if ((document.getElementById('max_length_' + textBoxObject.max_length_id).value) != "") {
							$('.maxLengthValidation').remove();
						}
						if ((document.getElementById('dataType_' + textBoxObject.dataType_id).value) != ""){
							$('.type_textboxValidation').remove();
						}
						nameValidationTextBox();
					}else{
						textBoxJsonArr[i].textBoxPropArr[k].value = document.getElementById('name_' + textBoxObject.name_id).value;
						textBoxJsonArr[i].textBoxPropArr[k].id =  textBoxObject.name_id;
					}
				} else if (textBoxJsonArr[i].textBoxPropArr[k].name == "AnswerLabel") {
					textBoxJsonArr[i].textBoxPropArr[k].id =  textBoxObject.answer_label_id;
					textBoxJsonArr[i].textBoxPropArr[k].value = (document.getElementById('answer_label_' + textBoxObject.answer_label_id).value);
				} else if (textBoxJsonArr[i].textBoxPropArr[k].name == "Disabled") {
					textBoxJsonArr[i].textBoxPropArr[k].id =  textBoxObject.disabled_id;
					textBoxJsonArr[i].textBoxPropArr[k].value = (document.getElementById('disabled_' + textBoxObject.disabled_id).value);
				} else if (textBoxJsonArr[i].textBoxPropArr[k].name == "DefaultValue") {
					textBoxJsonArr[i].textBoxPropArr[k].id =  textBoxObject.defaultValue_id;
					textBoxJsonArr[i].textBoxPropArr[k].value = (document.getElementById('defaultValue_' + textBoxObject.defaultValue_id).value);
				} else if (textBoxJsonArr[i].textBoxPropArr[k].name == "Mandatory") {
					textBoxJsonArr[i].textBoxPropArr[k].id =  textBoxObject.mandatory_id;
					textBoxJsonArr[i].textBoxPropArr[k].value = (document.getElementById('mandatory_' + textBoxObject.mandatory_id).value);
				} else if (textBoxJsonArr[i].textBoxPropArr[k].name == "BarcodeScanner") {
					textBoxJsonArr[i].textBoxPropArr[k].id =  textBoxObject.barcodeScanner_id;
					textBoxJsonArr[i].textBoxPropArr[k].value = (document.getElementById('barCode_' + textBoxObject.barcodeScanner_id).value);
				} else if (textBoxJsonArr[i].textBoxPropArr[k].name == "ActionTag") {
					textBoxJsonArr[i].textBoxPropArr[k].id =  textBoxObject.action_tag_id;
					textBoxJsonArr[i].textBoxPropArr[k].value = (document.getElementById('action_tag_' + textBoxObject.action_tag_id).value);
				} else if (textBoxJsonArr[i].textBoxPropArr[k].name == "Value") {
					textBoxJsonArr[i].textBoxPropArr[k].id =  textBoxObject.valueText_id;
					textBoxJsonArr[i].textBoxPropArr[k].value = (document.getElementById('valueText_' + textBoxObject.valueText_id).value);
				} else if (textBoxJsonArr[i].textBoxPropArr[k].name == "DataType") {
					if ((document.getElementById('dataType_' + textBoxObject.dataType_id).value) == "choose an option") {
						if ((document.getElementById('name_' + textBoxObject.name_id).value) != "") {
							$('.name_textboxValidation').remove();
						}
						if ((document.getElementById('max_length_' + textBoxObject.max_length_id).value) != "") {
							$('.maxLengthValidation').remove();
						}
						datatypeValidationTextbox();	
					} 
					else{
						textBoxJsonArr[i].textBoxPropArr[k].id =  textBoxObject.dataType_id;
						textBoxJsonArr[i].textBoxPropArr[k].value = (document.getElementById('dataType_' + textBoxObject.dataType_id).value);
					}
				} else if (textBoxJsonArr[i].textBoxPropArr[k].name == "Visible") {
					textBoxJsonArr[i].textBoxPropArr[k].id =  textBoxObject.visible_id;
					textBoxJsonArr[i].textBoxPropArr[k].value = (document.getElementById('visible_' + textBoxObject.visible_id).value);
				} else if (textBoxJsonArr[i].textBoxPropArr[k].name == "MaxLength") {
					if ((document.getElementById('max_length_' + textBoxObject.max_length_id).value) == "") {
						if ((document.getElementById('name_' + textBoxObject.name_id).value) != "") {
							$('.name_textboxValidation').remove();
						}
						if ((document.getElementById('dataType_' + textBoxObject.dataType_id).value) != ""){
							$('.type_textboxValidation').remove();
						}
						maxLengthValidationTextBox();
					} 
					else{
						textBoxJsonArr[i].textBoxPropArr[k].id =  textBoxObject.max_length_id;
						textBoxJsonArr[i].textBoxPropArr[k].value = (document.getElementById('max_length_' + textBoxObject.max_length_id).value);

					}
				} else {
				}
			}
		}
	}
	if (duplicate == 0) {
		if ((document.getElementById('dataType_' + textBoxObject.dataType_id).value) == "choose an option") {
			if ((document.getElementById('name_' + textBoxObject.name_id).value) != "") {
				$('.name_textboxValidation').remove();
			}
			if ((document.getElementById('max_length_' + textBoxObject.max_length_id).value) != "") {
				$('.maxLengthValidation').remove();
			}
			datatypeValidationTextbox();
		} else {
			var textBoxPropObj = new Object();
			textBoxPropObj.value = document.getElementById('dataType_' + textBoxObject.dataType_id).value;
			textBoxPropObj.id = textBoxObject.dataType_id;
			textBoxPropObj.name = "DataType";
			textBoxPropArr.push(textBoxPropObj);
		}
		if ((document.getElementById('disabled_' + textBoxObject.disabled_id).value) == "") {
			var textBoxPropObj = new Object();
			textBoxPropObj.value = " ";
			textBoxPropObj.id = textBoxObject.disabled_id;
			textBoxPropObj.name = "Disabled";
			textBoxPropArr.push(textBoxPropObj);
		} else {
			var textBoxPropObj = new Object();
			textBoxPropObj.value = document.getElementById('disabled_' + textBoxObject.disabled_id).value;
			textBoxPropObj.id = textBoxObject.disabled_id;
			textBoxPropObj.name = "Disabled";
			textBoxPropArr.push(textBoxPropObj);

		}
		if ((document.getElementById('max_length_' + textBoxObject.max_length_id).value) == "") {
			if ((document.getElementById('name_' + textBoxObject.name_id).value) != "") {
				$('.name_textboxValidation').remove();
			}
			if ((document.getElementById('dataType_' + textBoxObject.dataType_id).value) != ""){
				$('.type_textboxValidation').remove();
			}
			maxLengthValidationTextBox();
		} else {
			var textBoxPropObj = new Object();
			textBoxPropObj.value = document.getElementById('max_length_' + textBoxObject.max_length_id).value;
			textBoxPropObj.id = textBoxObject.max_length_id;
			textBoxPropObj.name = "MaxLength";
			textBoxPropArr.push(textBoxPropObj);
		}
		if ((document.getElementById('defaultValue_' + textBoxObject.defaultValue_id).value) == "") {
			var textBoxPropObj = new Object();
			textBoxPropObj.value = " ";
			textBoxPropObj.id = textBoxObject.defaultValue_id;
			textBoxPropObj.name = "DefaultValue";
			textBoxPropArr.push(textBoxPropObj);
		} else {
			var textBoxPropObj = new Object();
			textBoxPropObj.value = document.getElementById('defaultValue_' + textBoxObject.defaultValue_id).value;
			textBoxPropObj.id = textBoxObject.defaultValue_id;
			textBoxPropObj.name = "DefaultValue";
			textBoxPropArr.push(textBoxPropObj);
		}
		if ((document.getElementById('answer_label_' + textBoxObject.answer_label_id).value) == "") {
			var textBoxPropObj = new Object();
			textBoxPropObj.value = " ";
			textBoxPropObj.id = textBoxObject.answer_label_id;
			textBoxPropObj.name = "AnswerLabel";
			textBoxPropArr.push(textBoxPropObj);
		} else {
			var textBoxPropObj = new Object();
			textBoxPropObj.value = document.getElementById('answer_label_' + textBoxObject.answer_label_id).value;
			textBoxPropObj.id = textBoxObject.answer_label_id;
			textBoxPropObj.name = "AnswerLabel";
			textBoxPropArr.push(textBoxPropObj);
		}
		if ((document.getElementById('mandatory_' + textBoxObject.mandatory_id).value) == "") {
			var textBoxPropObj = new Object();
			textBoxPropObj.value = " ";
			textBoxPropObj.id = textBoxObject.mandatory_id;
			textBoxPropObj.name = "Mandatory";
			textBoxPropArr.push(textBoxPropObj);
		} else {
			var textBoxPropObj = new Object();
			textBoxPropObj.value = document.getElementById('mandatory_' + textBoxObject.mandatory_id).value;
			textBoxPropObj.id = textBoxObject.mandatory_id;
			textBoxPropObj.name = "Mandatory";
			textBoxPropArr.push(textBoxPropObj);
		}
		if ((document.getElementById('name_' + textBoxObject.name_id).value) == "") {
			if ((document.getElementById('max_length_' + textBoxObject.max_length_id).value) != "") {
				$('.maxLengthValidation').remove();
			}
			if ((document.getElementById('dataType_' + textBoxObject.dataType_id).value) != ""){
				$('.type_textboxValidation').remove();
			}
			nameValidationTextBox();
		} else {
			var textBoxPropObj = new Object();
			textBoxPropObj.value = document.getElementById('name_' + textBoxObject.name_id).value;
			textBoxPropObj.id = textBoxObject.name_id;
			textBoxPropObj.name = "Name";
			textBoxPropArr.push(textBoxPropObj);
		}
		if ((document.getElementById('barCode_' + textBoxObject.barcodeScanner_id).value) == "") {
			var textBoxPropObj = new Object();
			textBoxPropObj.value = " ";
			textBoxPropObj.id = textBoxObject.barcodeScanner_id;
			textBoxPropObj.name = "BarcodeScanner";
			textBoxPropArr.push(textBoxPropObj);
		} else {
			var textBoxPropObj = new Object();
			textBoxPropObj.value = document.getElementById('barCode_' + textBoxObject.barcodeScanner_id).value;
			textBoxPropObj.id = textBoxObject.barcodeScanner_id;
			textBoxPropObj.name = "BarcodeScanner";
			textBoxPropArr.push(textBoxPropObj);
		}
		if ((document.getElementById('visible_' + textBoxObject.visible_id).value) == "") {
			var textBoxPropObj = new Object();
			textBoxPropObj.value = " ";
			textBoxPropObj.id = textBoxObject.visible_id;
			textBoxPropObj.name = "Visible";
			textBoxPropArr.push(textBoxPropObj);
		} else {
			var textBoxPropObj = new Object();
			textBoxPropObj.value = document.getElementById('visible_' + textBoxObject.visible_id).value;
			textBoxPropObj.id = textBoxObject.visible_id;
			textBoxPropObj.name = "Visible";
			textBoxPropArr.push(textBoxPropObj);
		}
		if ((document.getElementById('action_tag_' + textBoxObject.action_tag_id).value) == "") {
			var textBoxPropObj = new Object();
			textBoxPropObj.value = " ";
			textBoxPropObj.id = textBoxObject.action_tag_id;
			textBoxPropObj.name = "ActionTag";
			textBoxPropArr.push(textBoxPropObj);
		} else {
			var textBoxPropObj = new Object();
			textBoxPropObj.value = document.getElementById('action_tag_' + textBoxObject.action_tag_id).value;
			textBoxPropObj.id = textBoxObject.action_tag_id;
			textBoxPropObj.name = "ActionTag";
			textBoxPropArr.push(textBoxPropObj)
		}
		if ((document.getElementById('valueText_' + textBoxObject.valueText_id).value) == "") {
			var textBoxPropObj = new Object();
			textBoxPropObj.value = " ";
			textBoxPropObj.id = textBoxObject.valueText_id;
			textBoxPropObj.name = "Value";
			textBoxPropArr.push(textBoxPropObj);
		} else {
			var textBoxPropObj = new Object();
			textBoxPropObj.value = document.getElementById('valueText_' + textBoxObject.valueText_id).value;
			textBoxPropObj.id = textBoxObject.valueText_id;
			textBoxPropObj.name = "Value";
			textBoxPropArr.push(textBoxPropObj);
		}
		if ((document.getElementById('dataType_' + textBoxObject.dataType_id).value) == "choose an option" || (document.getElementById('max_length_' + textBoxObject.max_length_id).value) == "" || (document.getElementById('name_' + textBoxObject.name_id).value) == "")  
		{
		}
		else{
			textBoxObj.textBoxPropArr = textBoxPropArr;
			textBoxJsonArr.push(textBoxObj);	
		}
	}
	if ((document.getElementById('dataType_' + textBoxObject.dataType_id).value) != "choose an option" && (document.getElementById('max_length_' + textBoxObject.max_length_id).value) != "" && (document.getElementById('name_' + textBoxObject.name_id).value) != "")  {
		var regCheck =/^[1-9]+[0-9]*$/;
		if(regCheck.test( document.getElementById('max_length_' + textBoxObject.max_length_id).value))
		{
			$('.maxLengthTextBoxValidation').remove();
			$("#textBoxAddPropertiesPopup").modal('hide');
		}
	} 
});
$(document).on("click", ".saveAddPropertiesSignatureBtn", function(e) {
	var signatureCount = this.id.replace('saveSignatureNum_', '');
	var sectionNum = $("#" + this.id).attr("data-sect");
	var stepNum = $("#" + this.id).attr("data-step");
	var quesNum = $("#" + this.id).attr("data-ques");
	var duplicate = 0;
	var signatureObj = {
			sectionId: sectionNum,
			stepId: stepNum,
			questionNum: quesNum,
			signatureNum: signatureCount
	};
	var signaturePropArr = new Array();
	for (var i = 0; i < signatureJsonArr.length; i++) {
		if (signatureCount == signatureJsonArr[i].signatureNum) {
			duplicate = 1;
			for (var k = 0; k < signatureJsonArr[i].signaturePropArr.length; k++) {
				if (signatureJsonArr[i].signaturePropArr[k].name == "Name") {
					if ((document.getElementById('name_' + signatureObject.name_id).value) == "") {
						nameValidationSignature();
					} else{
						signatureJsonArr[i].signaturePropArr[k].value = document.getElementById('name_' + signatureObject.name_id).value;  
						signatureJsonArr[i].signaturePropArr[k].id = signatureObject.name_id;  
					}
				} else if (signatureJsonArr[i].signaturePropArr[k].name == "AnswerLabel") {
					signatureJsonArr[i].signaturePropArr[k].id = signatureObject.answer_label_id;  
					signatureJsonArr[i].signaturePropArr[k].value = (document.getElementById('answer_label_' + signatureObject.answer_label_id).value);
				} else if (signatureJsonArr[i].signaturePropArr[k].name == "Disabled") {
					signatureJsonArr[i].signaturePropArr[k].id = signatureObject.disabled_id;  
					signatureJsonArr[i].signaturePropArr[k].value = (document.getElementById('disabled_' + signatureObject.disabled_id).value);
				} else if (signatureJsonArr[i].signaturePropArr[k].name == "Mandatory") {
					signatureJsonArr[i].signaturePropArr[k].id = signatureObject.mandatory_id;  
					signatureJsonArr[i].signaturePropArr[k].value = (document.getElementById('mandatory_' + signatureObject.mandatory_id).value);
				} else if (signatureJsonArr[i].signaturePropArr[k].name == "Visible") {
					signatureJsonArr[i].signaturePropArr[k].id = signatureObject.visible_id;  
					signatureJsonArr[i].signaturePropArr[k].value = (document.getElementById('visible_' + signatureObject.visible_id).value);
				} else if (signatureJsonArr[i].signaturePropArr[k].name == "ActionTag") {
					signatureJsonArr[i].signaturePropArr[k].id = signatureObject.action_tag_id;  
					signatureJsonArr[i].signaturePropArr[k].value = (document.getElementById('action_tag_' + signatureObject.action_tag_id).value);
				} else if (signatureJsonArr[i].signaturePropArr[k].name == "Color") {
					signatureJsonArr[i].signaturePropArr[k].id = signatureObject.color_id;  
					signatureJsonArr[i].signaturePropArr[k].value = (document.getElementById('color_' + signatureObject.color_id).value);
				} else {
				}
			}
		}
	}
	if (duplicate == 0) {
		if ((document.getElementById('name_' + signatureObject.name_id).value) == "") {
			nameValidationSignature();
		} else {
			var signaturePropObj = new Object();
			signaturePropObj.value = document.getElementById('name_' + signatureObject.name_id).value;
			signaturePropObj.id = signatureObject.name_id;
			signaturePropObj.name = "Name";
			signaturePropArr.push(signaturePropObj);
		}
		if ((document.getElementById('answer_label_' + signatureObject.answer_label_id).value) == "") {
			var signaturePropObj = new Object();
			signaturePropObj.value = "";
			signaturePropObj.id = signatureObject.answer_label_id;
			signaturePropObj.name = "AnswerLabel";
			signaturePropArr.push(signaturePropObj);
		} else {
			var signaturePropObj = new Object();
			signaturePropObj.value = document.getElementById('answer_label_' + signatureObject.answer_label_id).value;
			signaturePropObj.id = signatureObject.answer_label_id;
			signaturePropObj.name = "AnswerLabel";
			signaturePropArr.push(signaturePropObj);
		}
		if ((document.getElementById('color_' + signatureObject.color_id).value) == "") {
			var signaturePropObj = new Object();
			signaturePropObj.value = "";
			signaturePropObj.id = signatureObject.color_id;
			signaturePropObj.name = "Color";
			signaturePropArr.push(signaturePropObj);
		} else {
			var signaturePropObj = new Object();
			signaturePropObj.value = document.getElementById('color_' + signatureObject.color_id).value;
			signaturePropObj.id = signatureObject.color_id;
			signaturePropObj.name = "Color";
			signaturePropArr.push(signaturePropObj);
		}
		if ((document.getElementById('disabled_' + signatureObject.disabled_id).value) == "") {
			var signaturePropObj = new Object();
			signaturePropObj.value = "";
			signaturePropObj.id = signatureObject.disabled_id;
			signaturePropObj.name = "Disabled";
			signaturePropArr.push(signaturePropObj);
		} else {
			var signaturePropObj = new Object();
			signaturePropObj.value = document.getElementById('disabled_' + signatureObject.disabled_id).value;
			signaturePropObj.id = signatureObject.disabled_id;
			signaturePropObj.name = "Disabled";
			signaturePropArr.push(signaturePropObj);
		}
		if ((document.getElementById('mandatory_' + signatureObject.mandatory_id).value) == "") {
			var signaturePropObj = new Object();
			signaturePropObj.value = "";
			signaturePropObj.id = signatureObject.mandatory_id;
			signaturePropObj.name = "Mandatory";
			signaturePropArr.push(signaturePropObj);
		} else {
			var signaturePropObj = new Object();
			signaturePropObj.value = document.getElementById('mandatory_' + signatureObject.mandatory_id).value;
			signaturePropObj.id = signatureObject.mandatory_id;
			signaturePropObj.name = "Mandatory";
			signaturePropArr.push(signaturePropObj);
		}
		if ((document.getElementById('visible_' + signatureObject.visible_id).value) == "") {
			var signaturePropObj = new Object();
			signaturePropObj.value = "";
			signaturePropObj.id = signatureObject.visible_id;
			signaturePropObj.name = "Visible";
			signaturePropArr.push(signaturePropObj);
		} else {
			var signaturePropObj = new Object();
			signaturePropObj.value = document.getElementById('visible_' + signatureObject.visible_id).value;
			signaturePropObj.id = signatureObject.visible_id;
			signaturePropObj.name = "Visible";
			signaturePropArr.push(signaturePropObj);
		}
		if ((document.getElementById('action_tag_' + signatureObject.action_tag_id).value) == "") {
			var signaturePropObj = new Object();
			signaturePropObj.value = "";
			signaturePropObj.id = signatureObject.action_tag_id;
			signaturePropObj.name = "ActionTag";
			signaturePropArr.push(signaturePropObj);
		} else {
			var signaturePropObj = new Object();
			signaturePropObj.value = document.getElementById('action_tag_' + signatureObject.action_tag_id).value;
			signaturePropObj.id = signatureObject.action_tag_id;
			signaturePropObj.name = "ActionTag";
			signaturePropArr.push(signaturePropObj);
		}
		if ((document.getElementById('name_' + signatureObject.name_id).value) == ""){      	
		}else{
			signatureObj.signaturePropArr = signaturePropArr;
			signatureJsonArr.push(signatureObj);
		}
	}
	if ((document.getElementById('name_' + signatureObject.name_id).value) != "") {
		$("#signatureaddPropertiesPopup").modal('hide');

	}
});

