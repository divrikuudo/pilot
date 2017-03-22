/*************Display of ComboBox Element Properties Attribute*********************/

function elmenentsPropertyDisplay(elementArr,elementArr_value,elementArr_idPrefix,elementArr_id,elementArr_flag){
	
	for(var i=0;i<elementArr.length;i++){
		if(elementArr[i].toUpperCase()==elementArr_value.toUpperCase()){
			$('#'+elementArr_idPrefix + elementArr_id ).append('<option>'+elementArr_value+'</option>');
			elementArr_flag=1;
		}
	}
	for(var i=0;i<elementArr.length;i++){
		if(elementArr[i].toUpperCase()!=elementArr_value.toUpperCase()){
			if(elementArr_flag==0 && i==0){
				$('#'+elementArr_idPrefix + elementArr_id ).append('<option>choose an option</option>');
			}
			$('#'+elementArr_idPrefix + elementArr_id ).append('<option>'+elementArr[i]+'</option>');
		}
	}	
}

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

function isEditableAttributeDisplay(isEditableArr,is_editable_value,isEditable_id,editFlag){
	for(var i=0;i<isEditableArr.length;i++){
		if(isEditableArr[i].toUpperCase()==is_editable_value.toUpperCase()){
			$('#isEditable_'+ isEditable_id ).append('<option>'+is_editable_value+'</option>');
			editFlag=1;
		}
	}
	for(var i=0;i<isEditableArr.length;i++){
		if(isEditableArr[i].toUpperCase()!=is_editable_value.toUpperCase()){
			if(editFlag==0 && i==0){
				$('#isEditable_'+ isEditable_id ).append('<option>choose an option</option>');
			}
			$('#isEditable_'+ isEditable_id ).append('<option>'+isEditableArr[i]+'</option>');
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