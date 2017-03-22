/*************Deleting Element*********************/
$(document).on('click', '.widgetDel', function() {
	var divId=this.id;
	var ele=$("#"+this.id).attr("data-ele");
	elementDelete(ele,divId);
	$("#" + this.id).parent().parent().parent().parent().parent().remove();
});
$(document).on('click', '.imgWidgetDel', function() {
	var divId=this.id;
	var ele=$("#"+this.id).attr("data-ele");
	elementDelete(ele,divId);
	$("#" + this.id).parent().parent().parent().parent().parent().remove();
});
function elementDelete(ele,divId){
	if (ele == "txtAreaAns") {
		var eleID = divId.replace('textCount1_','');
		for (var i = 0; i < textAreaJsonArr.length; i++) {
			if (eleID == textAreaJsonArr[i].textAreaNum) {
				textAreaJsonArr.splice(i,1);
			}
		}
	} else if(ele==="ansDrpDown"){
		var eleID=divId.replace("dropDownCount1_","");
		for (var i = 0; i < dropDownJsonArr.length; i++) {
			if (eleID == dropDownJsonArr[i].dropDownNum) {
				dropDownJsonArr.splice(i,1);
			}
		}
	}else if (ele == "ansDate") {
		var eleID = divId.replace('datePickerCount1_', '');
		for (var i = 0; i < datePickerJsonArr.length; i++) {
			if (eleID == datePickerJsonArr[i].datePickerNum) {
				datePickerJsonArr.splice(i,1);
			}
		}
	} /*else if (ele == "ansBtn") {
		var eleID = divId.replace('btnCount1_', '');
		for (var i = 0; i < buttonJsonArr.length; i++) {
			if (eleID == buttonJsonArr[i].buttonNum) {
				buttonJsonArr.splice(i,1);
			}
		}
	} */else if (ele == "ansRadioBtn") {
		var eleID =divId.replace('radioButtonCount1_', '');
		for (var i = 0; i < radioButtonJsonArr.length; i++) {
			if (eleID == radioButtonJsonArr[i].radioBntNum) {
				radioButtonJsonArr.splice(i,1);
			}
		}
	} else if (ele == "anscheckBox") {
		var eleID = divId.replace('checkBoxCount1_', '');
		for (var i = 0; i < checkBoxJsonArr.length; i++) {
			if (eleID == checkBoxJsonArr[i].checkBoxNum) {
				checkBoxJsonArr.splice(i,1);
			}
		}
	} else if (ele == "textBox") {
		var eleID =divId.replace('textBoxCount1_', '');
		for (var i = 0; i < textBoxJsonArr.length; i++) {
			if (eleID == textBoxJsonArr[i].textBoxNum) {
				textBoxJsonArr.splice(i,1);
			}
		}
	} else if (ele == "ansSignature") {
		var eleID = divId.replace('signatureCount1_', '');
		for (var i = 0; i < signatureJsonArr.length; i++) {
			if (eleID == signatureJsonArr[i].signatureNum) {
				signatureJsonArr.splice(i,1);
			}
		}
	}/* else if (ele == "label") {
		var eleID = divId.replace('labelCount1_', '');
		for (var i = 0; i < labelJsonArr.length; i++) {
			if (eleID == labelJsonArr[i].labelNum) {
				labelJsonArr.splice(i,1);
			}
		}
	}*/
	else if (ele == "ansImgUploadMainDiv") {
		var eleID = divId.replace('imageUpCount1_','');
		for (var i = 0; i < imageUploadJsonArr.length; i++) {
			if (eleID == imageUploadJsonArr[i].imageUpNum) {
				imageUploadJsonArr.splice(i,1);
			}
		}
	} 
}