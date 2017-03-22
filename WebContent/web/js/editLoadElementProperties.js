/*************Loading Answer Elements Properties at time of Edit*********************/
var textAreaJsonArr = new Array();
var dropDownJsonArr = new Array();
var datePickerJsonArr = new Array();
var buttonJsonArr = new Array();
var checkBoxJsonArr = new Array();
var radioButtonJsonArr = new Array();
var textBoxJsonArr = new Array();
var signatureJsonArr = new Array();
var labelJsonArr = new Array();
var imageUploadJsonArr = new Array();
function editSignatureProperties(obj, stepID, sectID,questID, indicator, count,sigCount_, status) {
	if(JSON.stringify(obj).length>4){
		var tempSigObj={sectionId:sectID,stepId:stepID,questionNum:questID,signatureNum:sigCount_};
		var addPropFlag=0;
		var signaturePropArr = new Array();
		signaturePropArr=signaturePropertyJson(obj,signaturePropArr);
		for(var m=0;m<signatureJsonArr.length;m++){
			if(signatureJsonArr[m].signatureNum==sigCount_){
				addPropFlag=1;
			}
		}
		if(addPropFlag==0){
			tempSigObj.signaturePropArr=signaturePropArr;
			signatureJsonArr.push(tempSigObj);	
		}
	}
	$('#' + status + 'signatureCount_' + sectID +'_'+stepID+'_'+questID+'_'+signatureCount).click(function() {
		var signaturePropArr = new Array();
		signaturePropArr=signaturePropertyJson(obj,signaturePropArr);
		var id="signatureCount_"+sigCount_;
		var testObj = new Object();
		testObj.signatureNum=sigCount_;
		var radioBtnObject = {};
		radioBtnObject.signatureCountID = id;
		radioBtnObject.sectID = sectID;
		radioBtnObject.stepID = stepID;
		radioBtnObject.quesID =questID;
		savePropertiesSignature(radioBtnObject);
	});
}
function editTAAddProperties(obj, stepID, sectID,questID, indicator, count, ansId,section,step,ques, textAreaCount_, status) {
	if(JSON.stringify(obj).length>4){
		var tempTextAreaObj={sectionId:sectID,stepId:stepID,questionNum:questID,textAreaNum:textAreaCount_};
		var textPropArr = new Array();
		var addPropFlag=0;
		textPropArr=textAreaPropertyJson(obj,textPropArr);
		for(var m=0;m<textAreaJsonArr.length;m++){
			if(textAreaJsonArr[m].textAreaNum==textAreaCount_){
				addPropFlag=1;
			}
		}
		if(addPropFlag==0){
			tempTextAreaObj.textPropArr=textPropArr;
			textAreaJsonArr.push(tempTextAreaObj);	
		}
	}
	$('#' + status +'textCount_' + sectID +'_'+stepID+'_'+questID+'_'+textAreacount).click(function() {
		var textPropArr = new Array();
		textPropArr=textAreaPropertyJson(obj,textPropArr);
		var id="textCount_"+textAreaCount_;
		var testObj = new Object();
		testObj.textAreaNum=textAreaCount_;
		var radioBtnObject = {};
		radioBtnObject.textCountID = id;
		radioBtnObject.sectID = sectID;
		radioBtnObject.stepID = stepID;
		radioBtnObject.quesID =questID;
		savePropertiesTextArea(radioBtnObject);
	});
}

function editIUAddProperties(obj, stepID, sectID,questID, indicator, count,imageUploadCount_, status) {
	if(JSON.stringify(obj).length>4){
		var tempIUADDObj={sectionId:sectID,stepId:stepID,questionNum:questID,imageUpNum:imageUploadCount_};
		var addPropFlag=0;
		var imageUpPropArr = new Array();
		imageUpPropArr=imageUploadPropertyJson(obj,imageUpPropArr);
		for(var m=0;m<imageUploadJsonArr.length;m++){
			if(imageUploadJsonArr[m].imageUpNum==imageUploadCount_){
				addPropFlag=1;
			}
		}
		if(addPropFlag==0){
			tempIUADDObj.imageUpPropArr=imageUpPropArr;
			imageUploadJsonArr.push(tempIUADDObj);	
		}
	}
	$('#' + status + 'imageUpCount1_' + sectID +'_'+stepID+'_'+questID+'_'+imageUploadCount).click(function() {
		var imageUpPropArr = new Array();
		imageUpPropArr=imageUploadPropertyJson(obj,imageUpPropArr);
		var id="imageUpCount_"+imageUploadCount_;
		var testObj = new Object();
		testObj.imageUpNum=imageUploadCount_;
		var radioBtnObject = {};
		radioBtnObject.ImageUpCountID = id;
		radioBtnObject.sectID = sectID;
		radioBtnObject.stepID = stepID;
		radioBtnObject.quesID =questID;
		savePropertiesImageUpload(radioBtnObject);
	});
}

function editRadAddProperties(obj, stepID, sectID,questID, indicator, count,radioCount_, status) {
	if(JSON.stringify(obj).length>4){
		var tempRadioObj={sectionId:sectID,stepId:stepID,questionNum:questID,radioBntNum:radioCount_};
		var addPropFlag=0;
		var radioPropArr = new Array();
		radioPropArr=radioBtnPropertyJson(obj,radioPropArr);
		for(var m=0;m<radioButtonJsonArr.length;m++){
			if(radioButtonJsonArr[m].radioBntNum==radioCount_){
				addPropFlag=1;
			}
		}
		if(addPropFlag==0){
			tempRadioObj.radioPropArr=radioPropArr;
			radioButtonJsonArr.push(tempRadioObj);	
		}
	}
	$('#' + status + 'radioCount_' + sectID +'_'+stepID+'_'+questID+'_'+radioButton).click(function() {
		var radioPropArr = new Array();
		radioPropArr=radioBtnPropertyJson(obj,radioPropArr);
		var id="radioButtonCount_"+radioCount_;
		var testObj = new Object();
		testObj.radioBntNum=radioCount_;
		var radioBtnObject = {};
		radioBtnObject.radioBtnCountID = id;
		radioBtnObject.sectID = sectID;
		radioBtnObject.stepID = stepID;
		radioBtnObject.quesID = questID;
		savePropertiesRadioButton(radioBtnObject);
	});
}
function editCheckAddProperties(obj, stepID, sectID,questID, indicator, count,checkboxCount_, status) {
	if(JSON.stringify(obj).length>4){
		var tempCheckboxObj={sectionId:sectID,stepId:stepID,questionNum:questID,checkBoxNum:checkboxCount_};
		var addPropFlag=0;
		var checkBoxPropArr = new Array();
		checkBoxPropArr=checkBoxPropertyJson(obj,checkBoxPropArr);
		for(var m=0;m<checkBoxJsonArr.length;m++){
			if(checkBoxJsonArr[m].checkBoxNum==checkboxCount_){
				addPropFlag=1;
			}
		}
		if(addPropFlag==0){
			tempCheckboxObj.checkBoxPropArr=checkBoxPropArr;
			checkBoxJsonArr.push(tempCheckboxObj);	
		}
	}
	$('#' + status + 'checkBoxCount_' + sectID +'_'+stepID+'_'+questID+'_'+checkBoxCount).click(function() {
		var checkBoxPropArr = new Array();
		checkBoxPropArr=checkBoxPropertyJson(obj,checkBoxPropArr);
		var id="checkBoxCount_"+checkboxCount_;
		var testObj = new Object();
		testObj.checkBoxNum=checkboxCount_;
		var radioBtnObject = {};
		radioBtnObject.checkBoxCountID =id;
		radioBtnObject.sectID = sectID;
		radioBtnObject.stepID = stepID;
		radioBtnObject.quesID =questID;
		savePropertiesCheckBox(radioBtnObject);
	});
}

function editDDAddProperties(obj, stepID, sectID,questID, indicator, count,ansId,dropDownCount_, status) {
	if(JSON.stringify(obj).length>4){
		var tempDropDownObj={sectionId:sectID,stepId:stepID,questionNum:questID,dropDownNum:dropDownCount_};
		var addPropFlag=0;
		var dropDownPropArr = new Array();
		dropDownPropArr=dropDownPropertyJson(obj,dropDownPropArr);
		for(var m=0;m<dropDownJsonArr.length;m++){
			if(dropDownJsonArr[m].dropDownNum==dropDownCount_){
				addPropFlag=1;
			}
		}
		if(addPropFlag==0){
			tempDropDownObj.dropDownPropArr=dropDownPropArr;
			dropDownJsonArr.push(tempDropDownObj);	
		}
	}
	$('#'+ status + 'dropDownCount_' + sectID +'_'+stepID+'_'+questID+'_'+dropDownCount).click(function() {
		var dropDownPropArr = new Array();
		dropDownPropArr=dropDownPropertyJson(obj,dropDownPropArr);
		var id="dropDownCount_"+dropDownCount_;
		var testObj = new Object();
		testObj.dropDownNum=dropDownCount_;
		var radioBtnObject = {};
		radioBtnObject.dropDownCountID = id;
		radioBtnObject.sectID = sectID;
		radioBtnObject.stepID = stepID;
		radioBtnObject.quesID =questID;
		savePropertiesDropDown(radioBtnObject);
	});
}
function editTextBoxProperties(obj, stepID, sectID, questID, indicator, count,textboxCount_, status) {
	if(JSON.stringify(obj).length>4){
		var tempTextBoxObj={sectionId:sectID,stepId:stepID,questionNum:questID,textBoxNum:textboxCount_};
		var addPropFlag=0;
		textBoxPropArr = new Array();		
		textBoxPropArr=textBoxPropertyJson(obj,textBoxPropArr);
		for(var m=0;m<textBoxJsonArr.length;m++){
			if(textBoxJsonArr[m].textBoxNum==textboxCount_){
				addPropFlag=1;
			}
		}
		if(addPropFlag==0){
			tempTextBoxObj.textBoxPropArr=textBoxPropArr;
			textBoxJsonArr.push(tempTextBoxObj);	
		}
	}
	$('#' + status + 'textBoxCount_' + sectID +'_'+stepID+'_'+questID+'_'+textBoxCount).click(function() {
		textBoxPropArr = new Array();		
		textBoxPropArr=textBoxPropertyJson(obj,textBoxPropArr);
		var id="textBoxCount_"+textboxCount_;
		var testObj = new Object();
		testObj.textBoxNum=textboxCount_;
		var radioBtnObject = {};
		radioBtnObject.textBoxCountID = id;
		radioBtnObject.sectID = sectID;
		radioBtnObject.stepID = stepID;
		radioBtnObject.quesID = questID;
		savePropertiesTextBox(radioBtnObject);
	});
}

function editDPAddProperties (obj, stepID, sectID,questID, indicator, count,datePickerCount_, status) {
	if(JSON.stringify(obj).length>4){
		var tempDatePickerObj={sectionId:sectID,stepId:stepID,questionNum:questID,datePickerNum:datePickerCount_};
		var addPropFlag=0;
		var datePickerPropArr = new Array();
		datePickerPropArr=datePickerPropertyJson(obj,datePickerPropArr);
		for(var m=0;m<datePickerJsonArr.length;m++){
			if(datePickerJsonArr[m].datePickerNum==datePickerCount_){
				addPropFlag=1;
			}
		}
		if(addPropFlag==0){
			tempDatePickerObj.datePickerPropArr=datePickerPropArr;
			datePickerJsonArr.push(tempDatePickerObj);	
		}
	}
	$('#' + status + 'datePickerCount_' + sectID +'_'+stepID+'_'+questID+'_'+datePickerCount).click(function() {
		datePickerPropArr = new Array();
		datePickerPropArr=datePickerPropertyJson(obj,datePickerPropArr);
		var id="datePickerCount_"+datePickerCount_;
		var testObj = new Object();
		testObj.datePickerNum='datePickerCount_';
		var radioBtnObject = {};
		radioBtnObject.datePickerCountID = id;
		radioBtnObject.sectID = sectID;
		radioBtnObject.stepID = stepID;
		radioBtnObject.quesID = questID;
		savePropertiesDatePicker(radioBtnObject);
	});
}