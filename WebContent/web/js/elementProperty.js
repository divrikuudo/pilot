/*************Loading Element Properties*********************/
$(document).on("click", ".IUAddProperties,.editIconImageUpload", function(e) {
	var ImageUpPropObject = new Object();
	var ImageUpCountID ;
	var tempID=this.id;
	var id=(this.id.split('_'));
	if(id[4]=="" || id[4]==" " ||id[4]=="null" ||id[4]==null ||id[4]=="undefined"){
		ImageUpCountID =tempID;

	}else{
		ImageUpCountID="imageUpCount_"+id[4];
	}
	var sectID = $("#" + ImageUpCountID).attr("data-Sect");
	var stepID = $("#" + ImageUpCountID).attr("data-Step");
	var quesID = $("#" + ImageUpCountID).attr("data-Ques");
	ImageUpPropObject.ImageUpCountID = ImageUpCountID;
	ImageUpPropObject.sectID = sectID;
	ImageUpPropObject.stepID = stepID;
	ImageUpPropObject.quesID = quesID;
	savePropertiesImageUpload(ImageUpPropObject);
});
$(document).on("click", ".TAAddProperties,.editIconTextArea", function(e) {
	var textPropObject = new Object();
	var textCountID ;
	var tempID=this.id;
	var id=(this.id.split('_'));
	if(id[4]=="" || id[4]==" " ||id[4]=="null" ||id[4]==null ||id[4]=="undefined"){
		textCountID =tempID;
	}else{
		textCountID="textCount_"+id[4];
	}
	var sectID = $("#" + textCountID).attr("data-Sect");
	var stepID = $("#" + textCountID).attr("data-Step");
	var quesID = $("#" + textCountID).attr("data-Ques");
	textPropObject.textCountID = textCountID;
	textPropObject.sectID = sectID;
	textPropObject.stepID = stepID;
	textPropObject.quesID = quesID;
	savePropertiesTextArea(textPropObject);
});

$(document).on("click", ".guideImgBoxProperties,.editIconGuideImg", function(e) {
	var guideImgPropObject = new Object();
	var guideImgCountID ;
	var tempID=this.id;
	var id=(this.id.split('_'));
	if(id[4]=="" || id[4]==" " ||id[4]=="null" ||id[4]==null ||id[4]=="undefined"){
		guideImgCountID =tempID;
	}else{
		guideImgCountID= "guideImgBox_"+id[4];
	}
	var sectID = $("#" + guideImgCountID).attr("data-Sect");
	var stepID = $("#" + guideImgCountID).attr("data-Step");
	var quesID = $("#" + guideImgCountID).attr("data-Ques");
	guideImgPropObject.guideImgCountID = guideImgCountID;
	guideImgPropObject.sectID = sectID;
	guideImgPropObject.stepID = stepID;
	guideImgPropObject.quesID = quesID;
	savePropertiesGuideImg(guideImgPropObject);
});


$(document).on("click", ".DDAddProperties,.editIconDropDown", function(e) {
	var dropDownPropObject = new Object();
	var dropDownCountID ;
	var tempID=this.id;
	var id=(this.id.split('_'));
	if(id[4]=="" || id[4]==" " ||id[4]=="null" ||id[4]==null ||id[4]=="undefined"){
		dropDownCountID =tempID;
	}else{
		dropDownCountID="dropDownCount_"+id[4];
	}
	var sectID = $("#" + dropDownCountID).attr("data-Sect");
	var stepID = $("#" + dropDownCountID).attr("data-Step");
	var quesID = $("#" + dropDownCountID).attr("data-Ques");
	dropDownPropObject.dropDownCountID = dropDownCountID;
	dropDownPropObject.sectID = sectID;
	dropDownPropObject.stepID = stepID;
	dropDownPropObject.quesID = quesID;
	savePropertiesDropDown(dropDownPropObject);
});
$(document).on("click", ".DPAddProperties,.editIconDatePicker", function(e) {
	var datePickerPropObject = new Object();
	var datePickerCountID ;
	var tempID=this.id;
	var id=(this.id.split('_'));
	if(id[4]=="" || id[4]==" " ||id[4]=="null" ||id[4]==null ||id[4]=="undefined"){
		datePickerCountID =tempID;
	}else{
		datePickerCountID="datePickerCount_"+id[4];
	}
	var sectID = $("#" + datePickerCountID).attr("data-Sect");
	var stepID = $("#" + datePickerCountID).attr("data-Step");
	var quesID = $("#" + datePickerCountID).attr("data-Ques");
	datePickerPropObject.datePickerCountID = datePickerCountID;
	datePickerPropObject.sectID = sectID;
	datePickerPropObject.stepID = stepID;
	datePickerPropObject.quesID = quesID;
	savePropertiesDatePicker(datePickerPropObject);
});
$(document).on("click", ".RadioAddProperties,.editIconRadioButton", function(e) {
	var radioBtnObject = new Object();
	var radioBtnCountID ;
	var tempID=this.id;
	var id=(this.id.split('_'));
	if(id[4]=="" || id[4]==" " ||id[4]=="null" ||id[4]==null ||id[4]=="undefined"){
		radioBtnCountID =tempID;
	}else{
		radioBtnCountID="radioButtonCount_"+id[4];
	}
	var sectID = $("#" + radioBtnCountID).attr("data-Sect");
	var stepID = $("#" + radioBtnCountID).attr("data-Step");
	var quesID = $("#" + radioBtnCountID).attr("data-Ques");
	radioBtnObject.radioBtnCountID = radioBtnCountID;
	radioBtnObject.sectID = sectID;
	radioBtnObject.stepID = stepID;
	radioBtnObject.quesID = quesID;
	savePropertiesRadioButton(radioBtnObject);
});
$(document).on("click", ".CheckboxAddProperties,.editIconCheckBox", function(e) {
	var checkBoxObject1 = new Object();
	var checkBoxCountID ;
	var tempID=this.id;
	var id=(this.id.split('_'));
	if(id[4]=="" || id[4]==" " ||id[4]=="null" ||id[4]==null ||id[4]=="undefined"){
		checkBoxCountID =tempID;
	}else{
		checkBoxCountID="checkBoxCount_"+id[4];
	}
	var sectID = $("#" + checkBoxCountID).attr("data-Sect");
	var stepID = $("#" + checkBoxCountID).attr("data-Step");
	var quesID = $("#" + checkBoxCountID).attr("data-Ques");
	checkBoxObject1.checkBoxCountID = checkBoxCountID;
	checkBoxObject1.sectID = sectID;
	checkBoxObject1.stepID = stepID;
	checkBoxObject1.quesID = quesID;
	savePropertiesCheckBox(checkBoxObject1);
});
$(document).on("click", ".BtnAddProperties,.editIconBtn", function(e) {
	var buttonPropObject = new Object();
	var buttonCountID ;
	var tempID=this.id;
	var id=(this.id.split('_'));
	if(id[4]=="" || id[4]==" " ||id[4]=="null" ||id[4]==null ||id[4]=="undefined"){
		buttonCountID =tempID;
	}else{
		buttonCountID="btnCount_"+id[4];
	}
	var sectID = $("#" + buttonCountID).attr("data-Sect");
	var stepID = $("#" + buttonCountID).attr("data-Step");
	var quesID = $("#" + buttonCountID).attr("data-Ques");
	buttonPropObject.buttonCountID = buttonCountID;
	buttonPropObject.sectID = sectID;
	buttonPropObject.stepID = stepID;
	buttonPropObject.quesID = quesID;
	savePropertiesButton(buttonPropObject);
});

$(document).on("click", ".textBoxAddProperties,.editIconTextBox", function(e) {
	var textBoxObject1 = new Object();
	var textBoxCountID ;
	var tempID=this.id;
	var id=(this.id.split('_'));
	if(id[4]=="" || id[4]==" " ||id[4]=="null" ||id[4]==null ||id[4]=="undefined"){
		textBoxCountID =tempID;
	}else{
		textBoxCountID="textBoxCount_"+id[4];
	}
	var sectID = $("#" + textBoxCountID).attr("data-Sect");
	var stepID = $("#" + textBoxCountID).attr("data-Step");
	var quesID = $("#" + textBoxCountID).attr("data-Ques");
	textBoxObject1.textBoxCountID = textBoxCountID;
	textBoxObject1.sectID = sectID;
	textBoxObject1.stepID = stepID;
	textBoxObject1.quesID = quesID;
	savePropertiesTextBox(textBoxObject1);
});

$(document).on("click", ".labelAddProperties,.editIconLabel", function(e) {
	var labelPropObject = new Object();
	var labelCountID;
	var tempID=this.id;
	var id=(this.id.split('_'));
	if(id[4]=="" || id[4]==" " ||id[4]=="null" ||id[4]==null ||id[4]=="undefined"){
		labelCountID =tempID;
	}else{
		labelCountID="labelCount_"+id[4];
	}
	var sectID = $("#" + labelCountID).attr("data-Sect");
	var stepID = $("#" + labelCountID).attr("data-Step");
	var quesID = $("#" + labelCountID).attr("data-Ques");
	labelPropObject.labelCountID = labelCountID;
	labelPropObject.sectID = sectID;
	labelPropObject.stepID = stepID;
	labelPropObject.quesID = quesID;
	savePropertiesLabel(labelPropObject);
});
$(document).on("click", ".signatureAddProperties,.editIconSignature", function(e) {
	var signaturePropObject = new Object();
	var signatureCountID ;
	var tempID=this.id;
	var id=(this.id.split('_'));
	if(id[4]=="" || id[4]==" " ||id[4]=="null" ||id[4]==null ||id[4]=="undefined"){
		signatureCountID =tempID;
	}else{
		signatureCountID="signatureCount_"+id[4];
	}
	var sectID = $("#" + signatureCountID).attr("data-Sect");
	var stepID = $("#" + signatureCountID).attr("data-Step");
	var quesID = $("#" + signatureCountID).attr("data-Ques");
	signaturePropObject.signatureCountID = signatureCountID;
	signaturePropObject.sectID = sectID;
	signaturePropObject.stepID = stepID;
	signaturePropObject.quesID = quesID;
	savePropertiesSignature(signaturePropObject);
});