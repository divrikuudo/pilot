/*************Validation of Mandatory Element Properties *********************/
var maxLenVal; 
var regCheck;
$(document).on('keyup', '.name_text ', function() {
	if (!this.value ||this.value.replace(/^\s+|\s+$/g, "").length==0||this.value=="" ||this.value==" ") {
		if ($(".name_text").parent().next(".validation").length == 0) {
			$(".name_text").parents("tr").after("<tr class='name_textValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter name</td></tr>");
		}
		$(".name_text").val("");
	}
	else{
		$('.name_textValidation').remove();
	}
});
$(document).on('keyup', '.max_length ', function() {
	regCheck="";
	regCheck =/^[1-9]+[0-9]*$/;
	if (!this.value ||this.value.replace(/^\s+|\s+$/g, "").length==0||this.value=="" ||this.value==" ") {
		$('.maxLengthValidation').remove();
		$('.maxLengthTextAreaValidation').remove();
		if ($(".max_length").parent().next(".validation").length == 0) {
			$(".max_length").parents("tr").after("<tr class='maxLengthValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter max length</td></tr>");
		}
		$(".max_length").val("");
		if(regCheck.test(this.value)){
			$('.maxLengthTextAreaValidation').remove();
		}
		else{
			$('.maxLengthTextAreaValidation').remove();
			if ($(".max_length").parent().next(".validation").length == 0){
				$(".max_length").parents("tr").after("<tr class='maxLengthTextAreaValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter non-zero digit.</td></tr>");
			}
			$(".max_length").val("");
		}
	}
	else{
		$('.maxLengthValidation').remove();
		$('.maxLengthTextAreaValidation').remove();
	}
});
$(document).on('keyup', '.name_image ', function() {
	if (!this.value ||this.value.replace(/^\s+|\s+$/g, "").length==0||this.value=="" ||this.value==" ") {
		$('.name_imagetValidation').remove();
		if ($(".name_image").parent().next(".validation").length == 0) {
			$(".name_image").parents("tr").after("<tr class='name_imagetValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter name</td></tr>");
		}
		$(".name_image").val("");
	}
	else{
		$('.name_imagetValidation').remove();
	}
});
$(document).on('keyup', '.type_image ', function() {
	if (!this.value ||this.value.replace(/^\s+|\s+$/g, "").length==0||this.value=="" ||this.value==" ") {
		$('.type_imageValidation').remove();
		if ($(".type_image").parent().next(".validation").length == 0){
			$(".type_image").parents("tr").after("<tr class='type_imageValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter image type</td></tr>");
		}
		$(".type_image").val("");
	}
	else{
		$('.type_imageValidation').remove();
	}
});
$(document).on('keyup', '.max_image ', function() {
	regCheck="";
	regCheck =/^[1-9]+[0-9]*$/;
	if (!this.value ||this.value.replace(/^\s+|\s+$/g, "").length==0||this.value=="" ||this.value==" ") {
		$('.maxLengthValidation').remove();
		$('.maxImageValidation').remove();
		if ($(".max_image").parent().next(".validation").length == 0){
			$(".max_image").parents("tr").after("<tr class='maxLengthValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter max images</td></tr>");
		}
		$(".max_image").val("");
		if(regCheck.test(this.value)){
			$('.maxImageValidation').remove();
		}
		else{
			$('.maxImageValidation').remove();
			if ($(".max_image").parent().next(".validation").length == 0) {
				$(".max_image").parents("tr").after("<tr class='maxImageValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter non-zero digit</td></tr>");
			}
			$(".max_image").val("");
		}
	}
	else{
		$('.maxLengthValidation').remove();
		$('.maxImageValidation').remove();
	}
});
$(document).on('keyup', '.name_radio ', function() {
	if (!this.value ||this.value.replace(/^\s+|\s+$/g, "").length==0||this.value=="" ||this.value==" ") {
		$('.name_radioValidation').remove();
		if ($(".name_radio").parent().next(".validation").length == 0) {
			$(".name_radio").parents("tr").after("<tr class='name_radioValidation'><td> </td><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter name</td></tr>");
		}
		$(".name_radio").val("");
	}
	else{
		$('.name_radioValidation').remove();
	}
});
$(document).on('keyup', '.name_chk ', function() {
	if (!this.value ||this.value.replace(/^\s+|\s+$/g, "").length==0||this.value=="" ||this.value==" ") {
		$('.maxLengthValidation').remove();
		if ($(".name_chk").parent().next(".validation").length == 0) {
			$(".name_chk").parents("tr").after("<tr class='maxLengthValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter name</td></tr>");
		}
		$(".name_chk").val("");
	}
	else{
		$('.maxLengthValidation').remove();
	}
});
$(document).on('keyup', '.name_drop ', function() {
	if (!this.value ||this.value.replace(/^\s+|\s+$/g, "").length==0||this.value=="" ||this.value==" ") {
		$('.name_dropValidation').remove();
		if ($(".name_drop").parent().next(".validation").length == 0) {
			$(".name_drop").parents("tr").after("<tr class='name_dropValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter name</td></tr>");
		}
		$(".name_drop").val("");
	}
	else{
		$('.name_dropValidation').remove();
	}
});
$(document).on('keyup', '.value_drop ', function() {
	if (!this.value ||this.value.replace(/^\s+|\s+$/g, "").length==0||this.value=="" ||this.value==" ") {
		$('.value_dropValidations').remove();
		if ($(".value_drop").parent().next(".validation").length == 0) {
			$(".value_drop").parents("tr").after("<tr class='value_dropValidations'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter Value that should be | separated </td></tr>");
		}
		$(".value_drop").val("");
	}
	else{
		$('.value_dropValidations').remove();
	}
});
$(document).on('keyup', '.name_date ', function() {
	if (!this.value ||this.value.replace(/^\s+|\s+$/g, "").length==0||this.value=="" ||this.value==" ") {
		$('.name_dateValidation').remove();
		if ($(".name_date").parent().next(".validation").length == 0) {
			$(".name_date").parents("tr").after("<tr class='name_dateValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter name</td></tr>");
		}
		$(".name_date").val("");
	}
	else{
		$('.name_dateValidation').remove();
	}
});
$(document).on('keyup', '.name_sig ', function() {
	if (!this.value ||this.value.replace(/^\s+|\s+$/g, "").length==0||this.value=="" ||this.value==" ") {
		$('.name_sigValidation').remove();
		if ($(".name_sig").parent().next(".validation").length == 0) {
			$(".name_sig").parents("tr").after("<tr class='name_sigValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter name</td></tr>");
		}
		$(".name_sig").val("");
	}
	else{
		$('.name_sigValidation').remove();
	}
});
$(document).on('keyup', '.name_textbox ', function() {
	if (!this.value ||this.value.replace(/^\s+|\s+$/g, "").length==0||this.value=="" ||this.value==" ") {
		$('.name_textboxValidation').remove();
		if ($(".name_textbox").parent().next(".validation").length == 0) {
			$(".name_textbox").parents("tr").after("<tr class='name_textboxValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter name</td></tr>");
		}
		$(".name_textbox").val("");
	}
	else{
		$('.name_textboxValidation').remove();
	}
});
$(document).on('keyup', '.max_length_textbox ', function() {
	regCheck="";
	regCheck =/^[1-9]+[0-9]*$/;
	if (!this.value ||this.value.replace(/^\s+|\s+$/g, "").length==0||this.value=="" ||this.value==" ") {
		$('.maxLengthTextBoxValidation').remove();
		$('.maxLengthValidation').remove();
		if ($(".max_length_textbox").parent().next(".validation").length == 0) {
			$(".max_length_textbox").parents("tr").after("<tr class='maxLengthValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter max-length.</td></tr>");
		}
		$(".max_length_textbox").val("");
		if(regCheck.test(this.value)){
			$('.maxLengthValidation').remove();
		}
		else{
			$('.maxLengthTextBoxValidation').remove();
			if ($(".max_length_textbox").parent().next(".validation").length == 0) {
				$(".max_length_textbox").parents("tr").after("<tr class='maxLengthTextBoxValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter non-zero digit.</td></tr>");
			}
			$(".max_length_textbox").val("");
		}
	}
	else{
		$('.maxLengthTextBoxValidation').remove();
		$('.maxLengthValidation').remove();
	}
});
/*$(document).on('blur', '.max_length_textbox ', function() {
	maxLenVal="";
	regCheck="";
	maxLenVal=$(".max_length_textbox").val();
	regCheck =/^[1-9]+[0-9]*$/;
	if(regCheck.test(maxLenVal)){
		$('.maxLengthTextBoxValidation').remove();
		$('.maxLengthValidation').remove();
	}
	else{
		$('.maxLengthTextBoxValidation').remove();
		if ($(".max_length_textbox").parent().next(".validation").length == 0) {
			$(".max_length_textbox").parents("tr").after("<tr class='maxLengthTextBoxValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter non-zero digit.</td></tr>");
		}
		$(".max_length_textbox").val("");
		focusSet = true; 
	}
});*/
/*$(document).on('blur', '.max_image ', function() {
	maxLenVal="";
	regCheck="";
	maxLenVal=$(".max_image").val();
	regCheck =/^[1-9]+[0-9]*$/;
	if(regCheck.test(maxLenVal)){
		$('.maxImageValidation').remove();
		$('.maxLengthValidation').remove();
	}
	else{
		$('.maxImageValidation').remove();
		if ($(".max_image").parent().next(".validation").length == 0) {
			$(".max_image").parents("tr").after("<tr class='maxImageValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter non-zero digit</td></tr>");
		}
		$(".max_image").val("");
		focusSet = true; 
	}
});*/
function imageTypeValidation(){
	$('.type_imageValidation').remove();
	if ($(".type_image").parent().next(".validation").length == 0){
		$(".type_image").parents("tr").after("<tr class='type_imageValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter image type</td></tr>");
	}
	$(".type_image").val("");
	focusSet = true;
}
function maxImageValidation(){
	$('.maxLengthValidation').remove();
	if ($(".max_image").parent().next(".validation").length == 0){
		$(".max_image").parents("tr").after("<tr class='maxLengthValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter max images</td></tr>");
	}
	$(".max_image").val("");
	focusSet = true;
}
function nameValidation(){
	$('.name_imagetValidation').remove();
	if ($(".name_image").parent().next(".validation").length == 0) {
		$(".name_image").parents("tr").after("<tr class='name_imagetValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter name</td></tr>");
	}
	$(".name_image").val("");
	focusSet = true;
}
function nameValidationTextarea(){
	$('.name_textValidation').remove();
	if ($(".name_text").parent().next(".validation").length == 0) {
		$(".name_text").parents("tr").after("<tr class='name_textValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter name</td></tr>");
	}
	$(".name_text").val("");
	focusSet = true;
}

function maxLengthValidationTextArea(){
	$('.maxLengthValidation').remove();
	if ($(".max_length").parent().next(".validation").length == 0) {
		$(".max_length").parents("tr").after("<tr class='maxLengthValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter max length</td></tr>");
	}
	$(".max_length").val("");
	focusSet = true;
}
function nameDropDown(){
	$('.name_dropValidation').remove();
	if ($(".name_drop").parent().next(".validation").length == 0) {
		$(".name_drop").parents("tr").after("<tr class='name_dropValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter name</td></tr>");
	}
	$(".name_drop").val("");
	focusSet = true;
}
function valueDropDown(){
	$('.value_dropValidations').remove();
	if ($(".value_drop").parent().next(".validation").length == 0) {
		$(".value_drop").parents("tr").after("<tr class='value_dropValidations'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter Value that should be | separated </td></tr>");
	}
	$(".value_drop").val("");
	focusSet = true;
}
function nameDatePicker(){
	$('.name_dateValidation').remove();
	if ($(".name_date").parent().next(".validation").length == 0) {
		$(".name_date").parents("tr").after("<tr class='name_dateValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter name</td></tr>");
	}
	$(".name_date").val("");
	focusSet = true;
}
function nameValidationRadioBtn(){
	$('.name_radioValidation').remove();
	if ($(".name_radio").parent().next(".validation").length == 0) {
		$(".name_radio").parents("tr").after("<tr class='name_radioValidation'><td> </td><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter name</td></tr>");
	}
	$(".name_radio").val("");
	focusSet = true;
}
/*function valueValidationRadioBtn(){
	$('.value_radioValidation').remove();
	if ($(".value_radio").parent().next(".validation").length == 0) {
		$(".value_radio").parents("tr").after("<tr class='value_radioValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter Value</td></tr>");
	}
	$(".value_radio").val("");
	focusSet = true;
}*/
function nameValidationTextBox(){
	$('.name_textboxValidation').remove();
	if ($(".name_textbox").parent().next(".validation").length == 0) {
		$(".name_textbox").parents("tr").after("<tr class='name_textboxValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter name</td></tr>");
	}
	$(".name_textbox").val("");
	focusSet = true;
}
$(document).on('change', '#dataType_21 ', function() {
	var val = $('#dataType_21 option:selected').text();
	if(val=="choose an option"){
		datatypeValidationTextbox()
	}
	else{
		$('.type_textboxValidation').remove();
	}
});
function datatypeValidationTextbox(){
	$('.type_textboxValidation').remove();
	if ($(".type_textbox").parent().next(".validation").length == 0){
		$(".type_textbox").parents("tr").after("<tr class='type_textboxValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter data type</td></tr>");
	}
	$(".type_textbox").val("");
	focusSet = true;
}
function maxLengthValidationTextBox(){
	$('.maxLengthValidation').remove();
	if ($(".max_length_textbox").parent().next(".validation").length == 0) {
		$(".max_length_textbox").parents("tr").after("<tr class='maxLengthValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter max-length.</td></tr>");
	}
	$(".max_length_textbox").val("");
	focusSet = true; 
}
function nameValidationSignature(){
	$('.name_sigValidation').remove();
	if ($(".name_sig").parent().next(".validation").length == 0) {
		$(".name_sig").parents("tr").after("<tr class='name_sigValidation'><td> </td><td class='validation' style='color:red;margin-bottom: 20px;'>Please enter name</td></tr>");
	}
	$(".name_sig").val("");
	focusSet = true;
}
/*************Display of ComboBox Element Properties Attribute*********************/
function  disabledAttributeDisplay(disArr,disabled_value,disabled_id,disFlag){
	for(var i=0;i<disArr.length;i++){
		if(disArr[i].toUpperCase()==disabled_value.toUpperCase()){
			$('#disabled_' + disabled_id ).append('<option>'+disabled_value+'</option>');
			disFlag=1;
		}
	}
	for(var i=0;i<disArr.length;i++){
		if(disArr[i].toUpperCase()!=disabled_value.toUpperCase()){
			if(disFlag==0 && i==0){
				$('#disabled_' + disabled_id ).append('<option>choose an option</option>');
			}
			$('#disabled_' + disabled_id ).append('<option>'+disArr[i]+'</option>');
		}
	}
}
function mandatoryAttributeDisplay(mandatoryArr,mandatory_value,mandatory_id,mandFlag){
	for(var i=0;i<mandatoryArr.length;i++){
		if(mandatoryArr[i].toUpperCase()==mandatory_value.toUpperCase()){
			$('#mandatory_' + mandatory_id ).append('<option>'+mandatory_value+'</option>');
			mandFlag=1;
		}
	}
	for(var i=0;i<mandatoryArr.length;i++){
		if(mandatoryArr[i].toUpperCase()!=mandatory_value.toUpperCase()){
			if(mandFlag==0 && i==0){
				$('#mandatory_' + mandatory_id ).append('<option>choose an option</option>');
			}
			$('#mandatory_' + mandatory_id ).append('<option>'+mandatoryArr[i]+'</option>');
		}
	}
}
function imageTypeAttributeDisplay(imageArr,imageType_value,imageType_id,imFlag){
	for(var i=0;i<imageArr.length;i++){
		if(imageArr[i].toUpperCase()==imageType_value.toUpperCase()){
			$('#imageType_'+ imageType_id ).append('<option>'+imageType_value+'</option>');
			imFlag=1;
		}
	}
	for(var i=0;i<imageArr.length;i++){
		if(imageArr[i].toUpperCase()!=imageType_value.toUpperCase()){
			if(imFlag==0 && i==0){
				$('#imageType_'+ imageType_id ).append('<option>choose an option</option>');
			}
			$('#imageType_'+ imageType_id ).append('<option>'+imageArr[i]+'</option>');
		}
	}
}
function visibleAttributeDisplay(visibleArr,visible_val,visible_id,visFlag){
	for(var i=0;i<visibleArr.length;i++){
		if(visibleArr[i].toUpperCase()==visible_val.toUpperCase()){
			$('#visible_' + visible_id  ).append('<option>'+visible_val+'</option>');
			visFlag=1;
		}
	}
	for(var i=0;i<visibleArr.length;i++){
		if(visibleArr[i].toUpperCase()!=visible_val.toUpperCase()){
			if(visFlag==0 && i==0){
				$('#visible_' + visible_id  ).append('<option>choose an option</option>');
			}
			$('#visible_' + visible_id).append('<option>'+visibleArr[i]+'</option>');
		}
	}
}
function multipledAttributeDisplay(multipleArr,multiple_value,multiple_id,multFlag){
	for(var i=0;i<multipleArr.length;i++){
		if(multipleArr[i].toUpperCase()==multiple_value.toUpperCase()){
			$('#multiple_' + multiple_id).append('<option>'+multiple_value+'</option>');
			multFlag=1;
		}
	}
	for(var i=0;i<multipleArr.length;i++){
		if(multipleArr[i].toUpperCase()!=multiple_value.toUpperCase()){
			if(multFlag==0 && i==0){
				$('#multiple_' + multiple_id).append('<option>choose an option</option>');
			}
			$('#multiple_' + multiple_id).append('<option>'+multipleArr[i]+'</option>');
		}
	}
}
function searchableAttributeDisplay(searchableArr,searchable_value,searchable_id,searchFlag){
	for(var i=0;i<searchableArr.length;i++){
		if(searchableArr[i].toUpperCase()==searchable_value.toUpperCase()){
			$('#searchable_'+ searchable_id ).append('<option>'+searchable_value+'</option>');
			searchFlag=1;
		}
	}
	for(var i=0;i<searchableArr.length;i++){
		if(searchableArr[i].toUpperCase()!=searchable_value.toUpperCase()){
			if(searchFlag==0 && i==0){
				$('#searchable_'+ searchable_id ).append('<option>choose an option</option>');
			}
			$('#searchable_'+ searchable_id ).append('<option>'+searchableArr[i]+'</option>');
		}
	}
}
function dateFormatAttributeDisplay(dateFormatArr,dateFormat_val,dateFormat_id,dateFlag){
	for(var i=0;i<dateFormatArr.length;i++){
		if(dateFormatArr[i]==dateFormat_val){
			$('#dateFormat_'+ dateFormat_id ).append('<option>'+dateFormat_val+'</option>');
			dateFlag=1;
		}
	}
	for(var i=0;i<dateFormatArr.length;i++){
		if(dateFormatArr[i]!=dateFormat_val){
			if(dateFlag==0 && i==0){
				$('#dateFormat_'+ dateFormat_id ).append('<option>choose an option</option>');
			}
			$('#dateFormat_'+ dateFormat_id ).append('<option>'+dateFormatArr[i]+'</option>');
		}
	}
}
function deafultAttributeDisplay(defaultArr,defaultValue_value,defaultValue_id,defaultFlag){
	for(var i=0;i<defaultArr.length;i++){
		if(defaultArr[i].toUpperCase()==defaultValue_value.toUpperCase()){
			$('#defaultValue_'+ defaultValue_id).append('<option>'+defaultValue_value+'</option>');
			defaultFlag=1;
		}
	}
	for(var i=0;i<defaultArr.length;i++){
		if(defaultArr[i].toUpperCase()!=defaultValue_value.toUpperCase()){
			if(defaultFlag==0 && i==0){
				$('#defaultValue_'+ defaultValue_id).append('<option>choose an option</option>');
			}
			$('#defaultValue_'+ defaultValue_id).append('<option>'+defaultArr[i]+'</option>');
		}
	}
}
function dataAttributeDisplay(dataArr,dataType_val,dataFlag){
	for(var i=0;i<dataArr.length;i++){
		if(dataArr[i].toUpperCase()==dataType_val.toUpperCase()){
			dataFlag=1;
			$('.type_textbox').append('<option>'+dataType_val+'</option>');
		}
	}
	for(var i=0;i<dataArr.length;i++){
		if(dataArr[i].toUpperCase()!=dataType_val.toUpperCase()){
			if(dataFlag==0 && i==0){
				$('.type_textbox').append('<option>choose an option</option>');
			}
			$('.type_textbox').append('<option>'+dataArr[i]+'</option>');
		}
	}
}
function barCodeAttributeDisplay(isBarCodeArr,isBarCode_value,barcodeScanner_id,barCodeFlag){
	for(var i=0;i<isBarCodeArr.length;i++){
		if(isBarCodeArr[i].toUpperCase()==isBarCode_value.toUpperCase()){
			$('#barCode_' + barcodeScanner_id).append('<option>'+isBarCode_value+'</option>');
			barCodeFlag=1;
		}
	}
	for(var i=0;i<isBarCodeArr.length;i++){
		if(isBarCodeArr[i].toUpperCase()!=isBarCode_value.toUpperCase()){
			if(barCodeFlag==0 && i==0){
				$('#barCode_' + barcodeScanner_id).append('<option>choose an option</option>');
			}
			$('#barCode_' + barcodeScanner_id).append('<option>'+isBarCodeArr[i]+'</option>');
		}
	}
}
function colorAttributeDisplay(colorArr,color_value,color_id,colorFlag){
	for(var i=0;i<colorArr.length;i++){
		if(colorArr[i].toUpperCase()==color_value.toUpperCase()){
			$('#color_' + color_id ).append('<option>'+color_value+'</option>');
			colorFlag=1;
		}
	}
	for(var i=0;i<colorArr.length;i++){
		if(colorArr[i].toUpperCase()!=color_value.toUpperCase()){
			if(colorFlag==0 && i==0){
				$('#color_' + color_id ).append('<option>choose an option</option>');
			}
			$('#color_' + color_id ).append('<option>'+colorArr[i]+'</option>');
		}
	}
}