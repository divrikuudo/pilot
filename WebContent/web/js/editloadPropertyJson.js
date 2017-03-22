/************Json for proeprties of Element at time of Edit*********************/
function signaturePropertyJson(obj,signaturePropArr){
	var signatureProp = new Object();
	signatureProp.name = 'ActionTag';
	if(obj[0].ActionTag =="" ||obj[0].ActionTag ==" " ||obj[0].ActionTag =="null" ||obj[0].ActionTag ==null){
		signatureProp.value="";
	}else{
		signatureProp.value = obj[0].ActionTag.split('~')[1];
		signatureProp.id = obj[0].ActionTag.split('~')[0];
	}
	signaturePropArr.push(signatureProp);
	var signatureProp1 = new Object();
	signatureProp1.name = 'Mandatory';
	if(obj[0].Mandatory =="" ||obj[0].Mandatory ==" " ||obj[0].Mandatory =="null" ||obj[0].Mandatory ==null){
		signatureProp1.value ="";
	}else{
		signatureProp1.value = obj[0].Mandatory.split('~')[1];
		signatureProp1.id = obj[0].Mandatory.split('~')[0];
	}
	signaturePropArr.push(signatureProp1);
	var signatureProp2 = new Object();
	signatureProp2.name = 'AnswerLabel';
	if(obj[0].AnswerLabel =="" ||obj[0].AnswerLabel ==" " ||obj[0].AnswerLabel =="null" ||obj[0].AnswerLabel ==null || obj[0].AnswerLabel =="undefined" ||obj[0].AnswerLabel ==undefined){
		signatureProp2.value = "";
	}else{
		signatureProp2.value = obj[0].AnswerLabel.split('~')[1];
		signatureProp2.id = obj[0].AnswerLabel.split('~')[0];
	}
	signaturePropArr.push(signatureProp2);
	var signatureProp3 = new Object();
	signatureProp3.name = 'Disabled';
	if(obj[0].Disabled =="" ||obj[0].Disabled ==" " ||obj[0].Disabled =="null" ||obj[0].Disabled ==null){
		signatureProp3.value ="";
	}else{
		signatureProp3.value = obj[0].Disabled.split('~')[1];
		signatureProp3.id = obj[0].Disabled.split('~')[0];
	}
	signaturePropArr.push(signatureProp3);
	var signatureProp4 = new Object();
	signatureProp4.name = 'Name';
	if(obj[0].Name =="" ||obj[0].Name ==" " ||obj[0].Name =="null" ||obj[0].Name ==null){
		signatureProp4.value ="";
	}else{
		signatureProp4.value = obj[0].Name.split('~')[1];
		signatureProp4.id = obj[0].Name.split('~')[0];
	}
	signaturePropArr.push(signatureProp4);
	var signatureProp5 = new Object();
	signatureProp5.name = 'Visible';
	if(obj[0].Visible =="" ||obj[0].Visible ==" " ||obj[0].Visible =="null" ||obj[0].Visible ==null){
		signatureProp5.value = "";
	}else{
		signatureProp5.value = obj[0].Visible.split('~')[1];
		signatureProp5.id = obj[0].Visible.split('~')[0];
	}
	signaturePropArr.push(signatureProp5);		
	var signatureProp6 = new Object();
	signatureProp6.name = 'Color';
	if(obj[0].Color =="" ||obj[0].Color ==" " ||obj[0].Color =="null" ||obj[0].Color ==null){
		signatureProp6.value = "";
	}else{
		signatureProp6.value = obj[0].Color.split('~')[1];
		signatureProp6.id = obj[0].Color.split('~')[0];
	}
	signaturePropArr.push(signatureProp6);
	return signaturePropArr;
}
function textAreaPropertyJson(obj,textPropArr){
	var textProp = new Object();
	textProp.name = 'ActionTag';
	if(obj[0].ActionTag =="" ||obj[0].ActionTag ==" " ||obj[0].ActionTag =="null" ||obj[0].ActionTag ==null){
		textProp.value="";
	}else{
		textProp.value = obj[0].ActionTag.split('~')[1];
		textProp.id = obj[0].ActionTag.split('~')[0];
	}
	textPropArr.push(textProp);
	var textProp1 = new Object();
	textProp1.name = 'DefaultValue';
	if(obj[0].DefaultValue =="" ||obj[0].DefaultValue ==" " ||obj[0].DefaultValue =="null" ||obj[0].DefaultValue ==null){
		textProp1.value="";
	}else{
		textProp1.value = obj[0].DefaultValue.split('~')[1];
		textProp1.id = obj[0].DefaultValue.split('~')[0];
	}
	textPropArr.push(textProp1);
	var textProp2 = new Object();
	textProp2.name = 'Mandatory';
	if(obj[0].Mandatory =="" ||obj[0].Mandatory ==" " ||obj[0].Mandatory =="null" ||obj[0].Mandatory ==null){
		textProp2.value="";
	}else{
		textProp2.value = obj[0].Mandatory.split('~')[1];
		textProp2.id = obj[0].Mandatory.split('~')[0];
	}
	textPropArr.push(textProp2);
	var textProp3 = new Object();
	textProp3.name = 'Value';
	if(obj[0].Value =="" ||obj[0].Value ==" " ||obj[0].Value =="null" ||obj[0].Value ==null){
		textProp3.value="";
	}else{
		textProp3.value = obj[0].Value.split('~')[1];
		textProp3.id = obj[0].Value.split('~')[0];
	}
	textPropArr.push(textProp3);
	var textProp5 = new Object();
	textProp5.name = 'AnswerLabel';
	if(obj[0].AnswerLabel =="" ||obj[0].AnswerLabel ==" " ||obj[0].AnswerLabel =="null" ||obj[0].AnswerLabel ==null ||obj[0].AnswerLabel =="undefined" ||obj[0].AnswerLabel ==undefined){
		textProp5.value="";
	}else{
		textProp5.value = obj[0].AnswerLabel.split('~')[1];
		textProp5.id = obj[0].AnswerLabel.split('~')[0];
	}
	textPropArr.push(textProp5);
	var textProp4 = new Object();
	textProp4.name = 'Disabled';
	if(obj[0].Disabled =="" ||obj[0].Disabled ==" " ||obj[0].Disabled =="null" ||obj[0].Disabled ==null){
		textProp4.value="";
	}else{
		textProp4.value = obj[0].Disabled.split('~')[1];
		textProp4.id = obj[0].Disabled.split('~')[0];
	}
	textPropArr.push(textProp4);
	var textProp6 = new Object();
	textProp6.name = 'Name';
	if(obj[0].Name =="" ||obj[0].Name ==" " ||obj[0].Name =="null" ||obj[0].Name ==null){
		textProp6.value="";
	}else{
		textProp6.value = obj[0].Name.split('~')[1];
		textProp6.id = obj[0].Name.split('~')[0];
	}
	textPropArr.push(textProp6);
	var textProp7 = new Object();
	textProp7.name = 'Visible';
	if(obj[0].Visible =="" ||obj[0].Visible ==" " ||obj[0].Visible =="null" ||obj[0].Visible ==null){
		textProp7.value="";
	}else{
		textProp7.value = obj[0].Visible.split('~')[1];
		textProp7.id = obj[0].Visible.split('~')[0];
	}
	textPropArr.push(textProp7);
	var textProp8 = new Object();
	textProp8.name = 'MaxLength';
	if(obj[0].MaxLength =="" ||obj[0].MaxLength ==" " ||obj[0].MaxLength =="null" ||obj[0].MaxLength ==null){
		textProp8.value="";
	}else{
		textProp8.value = obj[0].MaxLength.split('~')[1];
		textProp8.id = obj[0].MaxLength.split('~')[0];
	}
	textPropArr.push(textProp8);
	return textPropArr;
}
function imageUploadPropertyJson(obj,imageUpPropArr){
	var imageUpProp = new Object();
	imageUpProp.name = 'Disabled';
	if(obj[0].Disabled =="" ||obj[0].Disabled ==" " ||obj[0].Disabled =="null" ||obj[0].Disabled ==null){
		imageUpProp.value="";
	}else{
		imageUpProp.value = obj[0].Disabled.split('~')[1];
		imageUpProp.id = obj[0].Disabled.split('~')[0];
	}
	imageUpPropArr.push(imageUpProp);
	var imageUpProp1 = new Object();
	imageUpProp1.name = 'AnswerLabel';
	if(obj[0].AnswerLabel =="" ||obj[0].AnswerLabel ==" " ||obj[0].AnswerLabel =="null" ||obj[0].AnswerLabel ==null || obj[0].AnswerLabel =="undefined" ||obj[0].AnswerLabel ==undefined){
		imageUpProp1.value="";
	}else{
		imageUpProp1.value = obj[0].AnswerLabel.split('~')[1];
		imageUpProp1.id = obj[0].AnswerLabel.split('~')[0];
	}
	imageUpPropArr.push(imageUpProp1);
	var imageUpProp2 = new Object();
	imageUpProp2.name = 'MaxnoofImages';
	if(obj[0].MaxnoofImages =="" ||obj[0].MaxnoofImages ==" " ||obj[0].MaxnoofImages =="null" ||obj[0].MaxnoofImages ==null){
		imageUpProp2.value="";
	}else{
		imageUpProp2.value = obj[0].MaxnoofImages.split('~')[1];
		imageUpProp2.id = obj[0].MaxnoofImages.split('~')[0];
	}
	imageUpPropArr.push(imageUpProp2);
	var imageUpProp3 = new Object();
	imageUpProp3.name = 'Mandatory';
	if(obj[0].Mandatory =="" ||obj[0].Mandatory ==" " ||obj[0].Mandatory =="null" ||obj[0].Mandatory ==null){
		imageUpProp3.value="";
	}else{
		imageUpProp3.value = obj[0].Mandatory.split('~')[1];
		imageUpProp3.id = obj[0].Mandatory.split('~')[0];
	}
	imageUpPropArr.push(imageUpProp3);
	var imageUpProp4 = new Object();
	imageUpProp4.name = 'ImageType';
	if(obj[0].ImageType =="" ||obj[0].ImageType ==" " ||obj[0].ImageType =="null" ||obj[0].ImageType ==null){
		imageUpProp4.value="";
	}else{
		imageUpProp4.value = obj[0].ImageType.split('~')[1];
		imageUpProp4.id = obj[0].ImageType.split('~')[0];
	}
	imageUpPropArr.push(imageUpProp4);
	var imageUpProp5 = new Object();
	imageUpProp5.name = 'Name';
	var name_=obj[0]["Name"]==undefined?obj[0]["name"]:obj[0]["Name"];
	if(name_ =="" ||name_ ==" " ||name_ =="null" ||name_ ==null){
		imageUpProp5.value="";
	}else{
		imageUpProp5.value = name_.split('~')[1];
		imageUpProp5.id =name_.split('~')[0];
	}
	imageUpPropArr.push(imageUpProp5);
	return imageUpPropArr;
}
function radioBtnPropertyJson(obj,radioPropArr){
	var radioProp = new Object();
	radioProp.name = 'ActionTag';
	if(obj[0].ActionTag =="" ||obj[0].ActionTag ==" " ||obj[0].ActionTag =="null" ||obj[0].ActionTag ==null){
		radioProp.value="";
	}else{
		radioProp.value = obj[0].ActionTag.split('~')[1];
		radioProp.id = obj[0].ActionTag.split('~')[0];
	}
	radioPropArr.push(radioProp);
	var radioProp2 = new Object();
	radioProp2.name = 'Default Value';
	var DefaultValue=obj[0]["Default Value"]==undefined?obj[0]["DefaultValue"]:obj[0]["Default Value"];
	if(DefaultValue =="" ||DefaultValue ==" " ||DefaultValue =="null" ||DefaultValue ==null){
		radioProp2.value="";
	}else{
		radioProp2.value = DefaultValue.split('~')[1];
		radioProp2.id = DefaultValue.split('~')[0];
	}
	radioPropArr.push(radioProp2);
	var radioProp3 = new Object();
	radioProp3.name = 'Mandatory';
	if(obj[0].Mandatory =="" ||obj[0].Mandatory ==" " ||obj[0].Mandatory =="null" ||obj[0].Mandatory ==null){
		radioProp3.value="";
	}else{
		radioProp3.value = obj[0].Mandatory.split('~')[1];
		radioProp3.id = obj[0].Mandatory.split('~')[0];
	}
	radioPropArr.push(radioProp3);
	var radioProp4 = new Object();
	radioProp4.name = 'Value';
	if(obj[0].Value =="" ||obj[0].Value ==" " ||obj[0].Value =="null" ||obj[0].Value ==null){
		radioProp4.value="";
	}else{
		radioProp4.value = obj[0].Value.split('~')[1];
		radioProp4.id = obj[0].Value.split('~')[0];
	}
	radioPropArr.push(radioProp4);
	var radioProp5 = new Object();
	radioProp5.name = 'AnswerLabel';
	if(obj[0].AnswerLabel =="" ||obj[0].AnswerLabel ==" " ||obj[0].AnswerLabel =="null" ||obj[0].AnswerLabel ==null || obj[0].AnswerLabel =="undefined" ||obj[0].AnswerLabel ==undefined){
		radioProp5.value="";
	}else{
		radioProp5.value = obj[0].AnswerLabel.split('~')[1];
		radioProp5.id = obj[0].AnswerLabel.split('~')[0];
	}
	radioPropArr.push(radioProp5);
	var radioProp6 = new Object();
	radioProp6.name = 'Disabled';
	if(obj[0].Disabled =="" ||obj[0].Disabled ==" " ||obj[0].Disabled =="null" ||obj[0].Disabled ==null){
		radioProp6.value="";
	}else{
		radioProp6.value = obj[0].Disabled.split('~')[1];
		radioProp6.id = obj[0].Disabled.split('~')[0];
	}
	radioPropArr.push(radioProp6);
	var radioProp7 = new Object();
	radioProp7.name = 'Name';
	if(obj[0].Name =="" ||obj[0].Name ==" " ||obj[0].Name =="null" ||obj[0].Name ==null){
		radioProp7.value="";
	}else{
		radioProp7.value = obj[0].Name.split('~')[1];
		radioProp7.id = obj[0].Name.split('~')[0];
	}
	radioPropArr.push(radioProp7);
	var radioProp8 = new Object();
	radioProp8.name = 'Visible';
	if(obj[0].Visible =="" ||obj[0].Visible ==" " ||obj[0].Visible =="null" ||obj[0].Visible ==null){
		radioProp8.value="";
	}else{
		radioProp8.value = obj[0].Visible.split('~')[1];
		radioProp8.id = obj[0].Visible.split('~')[0];
	}
	radioPropArr.push(radioProp8);
	return radioPropArr;
}
function checkBoxPropertyJson(obj,checkBoxPropArr){
	var checkBoxProp = new Object();
	checkBoxProp.name = 'ActionTag';
	if(obj[0].ActionTag =="" ||obj[0].ActionTag ==" " ||obj[0].ActionTag =="null" ||obj[0].ActionTag ==null){
		checkBoxProp.value="";
	}else{
		checkBoxProp.value = obj[0].ActionTag.split('~')[1];
		checkBoxProp.id = obj[0].ActionTag.split('~')[0];
	}
	checkBoxPropArr.push(checkBoxProp);
	var checkBoxProp1 = new Object();
	checkBoxProp1.name = 'DefaultValue';
	if(obj[0].DefaultValue =="" ||obj[0].DefaultValue ==" " ||obj[0].DefaultValue =="null" ||obj[0].DefaultValue ==null){
		checkBoxProp1.value="";
	}else{
		checkBoxProp1.value = obj[0].DefaultValue.split('~')[1];
		checkBoxProp1.id = obj[0].DefaultValue.split('~')[0];
	}
	checkBoxPropArr.push(checkBoxProp1);
	var checkBoxProp2 = new Object();
	checkBoxProp2.name = 'Disabled';
	if(obj[0].Disabled =="" ||obj[0].Disabled ==" " ||obj[0].Disabled =="null" ||obj[0].Disabled ==null){
		checkBoxProp2.value="";
	}else{
		checkBoxProp2.value = obj[0].Disabled.split('~')[1];
		checkBoxProp2.id = obj[0].Disabled.split('~')[0];
	}
	checkBoxPropArr.push(checkBoxProp2);
	var checkBoxProp3 = new Object();
	checkBoxProp3.name = 'Mandatory';
	if(obj[0].Mandatory =="" ||obj[0].Mandatory ==" " ||obj[0].Mandatory =="null" ||obj[0].Mandatory ==null){
		checkBoxProp3.value="";
	}else{
		checkBoxProp3.value = obj[0].Mandatory.split('~')[1];
		checkBoxProp3.id = obj[0].Mandatory.split('~')[0];
	}
	checkBoxPropArr.push(checkBoxProp3);
	var checkBoxProp4 = new Object();
	checkBoxProp4.name = 'Value';
	if(obj[0].Value =="" ||obj[0].Value ==" " ||obj[0].Value =="null" ||obj[0].Value ==null){
		checkBoxProp4.value="";
	}else{
		checkBoxProp4.value = obj[0].Value.split('~')[1];
		checkBoxProp4.id = obj[0].Value.split('~')[0];
	}
	checkBoxPropArr.push(checkBoxProp4);
	var checkBoxProp5 = new Object();
	checkBoxProp5.name = 'Visible';
	if(obj[0].Visible =="" ||obj[0].Visible ==" " ||obj[0].Visible =="null" ||obj[0].Visible ==null){
		checkBoxProp5.value="";
	}else{
		checkBoxProp5.value = obj[0].Visible.split('~')[1];
		checkBoxProp5.id = obj[0].Visible.split('~')[0];
	}
	checkBoxPropArr.push(checkBoxProp5);
	var checkBoxProp6 = new Object();
	checkBoxProp6.name = 'Name';
	if(obj[0].Name =="" ||obj[0].Name ==" " ||obj[0].Name =="null" ||obj[0].Name ==null){
		checkBoxProp6.value="";
	}else{
		checkBoxProp6.value = obj[0].Name.split('~')[1];
		checkBoxProp6.id = obj[0].Name.split('~')[0];
	}
	checkBoxPropArr.push(checkBoxProp6);
	var checkBoxProp7 = new Object();
	checkBoxProp7.name = 'AnswerLabel';
	if(obj[0].AnswerLabel =="" ||obj[0].AnswerLabel ==" " ||obj[0].AnswerLabel =="null" ||obj[0].AnswerLabel ==null || obj[0].AnswerLabel =="undefined" ||obj[0].AnswerLabel ==undefined){
		checkBoxProp7.value="";
	}else{
		checkBoxProp7.value = obj[0].AnswerLabel.split('~')[1];
		checkBoxProp7.id = obj[0].AnswerLabel.split('~')[0];
	}
	checkBoxPropArr.push(checkBoxProp7);
	return checkBoxPropArr;
}
function dropDownPropertyJson(obj,dropDownPropArr){
	var dropDownProp = new Object();
	dropDownProp.name = 'ActionTag';
	if(obj[0].ActionTag=="" || obj[0].ActionTag==" " ||obj[0].ActionTag=="null" ||obj[0].ActionTag==null){
		dropDownProp.value="";
	}else{
		dropDownProp.value = obj[0].ActionTag.split('~')[1];
		dropDownProp.id=obj[0].ActionTag.split('~')[0];
	}
	dropDownPropArr.push(dropDownProp);
	var dropDownProp1 = new Object();
	dropDownProp1.name = 'Disabled';
	if(obj[0].Disabled=="" || obj[0].Disabled==" " ||obj[0].Disabled=="null" ||obj[0].Disabled==null){
		dropDownProp1.value="";
	}else{
		dropDownProp1.value = obj[0].Disabled.split('~')[1];
		dropDownProp1.id=obj[0].Disabled.split('~')[0];
	}
	dropDownPropArr.push(dropDownProp1);
	var dropDownProp2 = new Object();
	dropDownProp2.name = 'Mandatory';
	if(obj[0].Mandatory=="" || obj[0].Mandatory==" " ||obj[0].Mandatory=="null" ||obj[0].Mandatory==null){
		dropDownProp2.value="";
	}else{
		dropDownProp2.value = obj[0].Mandatory.split('~')[1];
		dropDownProp2.id=obj[0].Mandatory.split('~')[0];
	}
	dropDownPropArr.push(dropDownProp2);
	var dropDownProp3 = new Object();
	dropDownProp3.name = 'Multiple';
	if(obj[0].Multiple=="" || obj[0].Multiple==" " ||obj[0].Multiple=="null" ||obj[0].Multiple==null){
		dropDownProp3.value="";
	}else{
		dropDownProp3.value = obj[0].Multiple.split('~')[1];
		dropDownProp3.id=obj[0].Multiple.split('~')[0];
	}
	dropDownPropArr.push(dropDownProp3);		
	var dropDownProp4 = new Object();
	dropDownProp4.name = 'Name';
	if(obj[0].Name=="" || obj[0].Name==" " ||obj[0].Name=="null" ||obj[0].Name==null){
		dropDownProp4.value="";
	}else{
		dropDownProp4.value = obj[0].Name.split('~')[1];
		dropDownProp4.id=obj[0].Name.split('~')[0];
	}
	dropDownPropArr.push(dropDownProp4);
	var dropDownProp5 = new Object();
	dropDownProp5.name = 'Searchable';
	if(obj[0].Searchable=="" || obj[0].Searchable==" " ||obj[0].Searchable=="null" ||obj[0].Searchable==null){
		dropDownProp5.value="";
	}else{
		dropDownProp5.value = obj[0].Searchable.split('~')[1];
		dropDownProp5.id=obj[0].Searchable.split('~')[0];
	}
	dropDownPropArr.push(dropDownProp5);
	var dropDownProp6 = new Object();
	dropDownProp6.name = 'Value';
	if(obj[0].Value=="" || obj[0].Value==" " ||obj[0].Value=="null" ||obj[0].Value==null){
		dropDownProp6.value="";
	}else{
		dropDownProp6.value = obj[0].Value.split('~')[1];
		dropDownProp6.id=obj[0].Value.split('~')[0];
	}
	dropDownPropArr.push(dropDownProp6);
	var dropDownProp7 = new Object();
	dropDownProp7.name = 'Visible';
	if(obj[0].Visible=="" || obj[0].Visible==" " ||obj[0].Visible=="null" ||obj[0].Visible==null){
		dropDownProp7.value="";
	}else{
		dropDownProp7.value = obj[0].Visible.split('~')[1];
		dropDownProp7.id=obj[0].Visible.split('~')[0];
	}
	dropDownPropArr.push(dropDownProp7);
	var dropDownProp8 = new Object();
	dropDownProp8.name = 'AnswerLabel';
	if(obj[0].AnswerLabel=="" || obj[0].AnswerLabel==" " ||obj[0].AnswerLabel=="null" ||obj[0].AnswerLabel==null || obj[0].AnswerLabel =="undefined" ||obj[0].AnswerLabel ==undefined){
		dropDownProp8.value="";
	}else{
		dropDownProp8.value = obj[0].AnswerLabel.split('~')[1];
		dropDownProp8.id=obj[0].AnswerLabel.split('~')[0];
	}
	dropDownPropArr.push(dropDownProp8);
	return dropDownPropArr;
}
function textBoxPropertyJson(obj,textBoxPropArr){
	var textBoxProp = new Object();
	textBoxProp.name = 'ActionTag';
	if(obj[0].ActionTag =="" ||obj[0].ActionTag ==" " ||obj[0].ActionTag =="null" ||obj[0].ActionTag ==null){
		textBoxProp.value="";
	}else{
		textBoxProp.value = obj[0].ActionTag.split('~')[1];
		textBoxProp.id = obj[0].ActionTag.split('~')[0];
	}	
	textBoxPropArr.push(textBoxProp);
	var textBoxProp1 = new Object();
	textBoxProp1.name = 'BarcodeScanner';
	if(obj[0].BarcodeScanner =="" ||obj[0].BarcodeScanner ==" " ||obj[0].BarcodeScanner =="null" ||obj[0].BarcodeScanner ==null){
		textBoxProp1.value="";
	}else{
		textBoxProp1.value = obj[0].BarcodeScanner.split('~')[1];
		textBoxProp1.id = obj[0].BarcodeScanner.split('~')[0];
	}
	textBoxPropArr.push(textBoxProp1);
	var textBoxProp2 = new Object();
	textBoxProp2.name = 'DataType';
	if(obj[0].DataType =="" ||obj[0].DataType ==" " ||obj[0].DataType =="null" ||obj[0].DataType ==null){
		textBoxProp2.value="";
	}else{
		textBoxProp2.value = obj[0].DataType.split('~')[1];
		textBoxProp2.id = obj[0].DataType.split('~')[0];
	}
	textBoxPropArr.push(textBoxProp2);
	var textBoxProp3 = new Object();
	textBoxProp3.name = 'DefaultValue';
	if(obj[0].DefaultValue =="" ||obj[0].DefaultValue ==" " ||obj[0].DefaultValue =="null" ||obj[0].DefaultValue ==null){
		textBoxProp3.value="";
	}else{
		textBoxProp3.value = obj[0].DefaultValue.split('~')[1];
		textBoxProp3.id = obj[0].DefaultValue.split('~')[0];
	}
	textBoxPropArr.push(textBoxProp3);
	var textBoxProp4 = new Object();
	textBoxProp4.name = 'Disabled';
	if(obj[0].Disabled =="" ||obj[0].Disabled ==" " ||obj[0].Disabled =="null" ||obj[0].Disabled ==null){
		textBoxProp4.value="";
	}else{
		textBoxProp4.value = obj[0].Disabled.split('~')[1];
		textBoxProp4.id = obj[0].Disabled.split('~')[0];
	}
	textBoxPropArr.push(textBoxProp4);
	var textBoxProp5 = new Object();
	textBoxProp5.name = 'Mandatory';
	if(obj[0].Mandatory =="" ||obj[0].Mandatory ==" " ||obj[0].Mandatory =="null" ||obj[0].Mandatory ==null){
		textBoxProp5.value="";
	}else{
		textBoxProp5.value = obj[0].Mandatory.split('~')[1];
		textBoxProp5.id = obj[0].Mandatory.split('~')[0];
	}
	textBoxPropArr.push(textBoxProp5);
	var textBoxProp6 = new Object();
	textBoxProp6.name = 'MaxLength';
	if(obj[0].MaxLength =="" ||obj[0].MaxLength ==" " ||obj[0].MaxLength =="null" ||obj[0].MaxLength ==null){
		textBoxProp6.value="";
	}else{
		textBoxProp6.value = obj[0].MaxLength.split('~')[1];
		textBoxProp6.id = obj[0].MaxLength.split('~')[0];
	}
	textBoxPropArr.push(textBoxProp6);
	var textBoxProp7 = new Object();
	textBoxProp7.name = 'Name';
	if(obj[0].Name =="" ||obj[0].Name ==" " ||obj[0].Name =="null" ||obj[0].Name ==null){
		textBoxProp7.value="";
	}else{
		textBoxProp7.value = obj[0].Name.split('~')[1];
		textBoxProp7.id = obj[0].Name.split('~')[0];
	}
	textBoxPropArr.push(textBoxProp7);
	var textBoxProp8 = new Object();
	textBoxProp8.name = 'Value';
	if(obj[0].Value =="" ||obj[0].Value ==" " ||obj[0].Value =="null" ||obj[0].Value ==null){
		textBoxProp8.value="";
	}else{
		textBoxProp8.value = obj[0].Value.split('~')[1];
		textBoxProp8.id = obj[0].Value.split('~')[0];
	}
	textBoxPropArr.push(textBoxProp8);
	var textBoxProp9 = new Object();
	textBoxProp9.name = 'Visible';
	if(obj[0].Visible =="" ||obj[0].Visible ==" " ||obj[0].Visible =="null" ||obj[0].Visible ==null){
		textBoxProp9.value="";
	}else{
		textBoxProp9.value = obj[0].Visible.split('~')[1];
		textBoxProp9.id = obj[0].Visible.split('~')[0];
	}
	textBoxPropArr.push(textBoxProp9);
	var textBoxProp10 = new Object();
	textBoxProp10.name = 'AnswerLabel';
	if(obj[0].AnswerLabel =="" ||obj[0].AnswerLabel ==" " ||obj[0].AnswerLabel =="null" ||obj[0].AnswerLabel ==null || obj[0].AnswerLabel =="undefined" ||obj[0].AnswerLabel ==undefined){
		textBoxProp10.value="";
	}else{
		textBoxProp10.value = obj[0].AnswerLabel.split('~')[1];
		textBoxProp10.id = obj[0].AnswerLabel.split('~')[0];
	}
	textBoxPropArr.push(textBoxProp10);
	return textBoxPropArr;
}
function datePickerPropertyJson(obj,datePickerPropArr){
	var radioPropObj = new Object();
	if(obj[0].AnswerLabel=="" || obj[0].AnswerLabel==" " ||obj[0].AnswerLabel=="null" || obj[0].AnswerLabel==null || obj[0].AnswerLabel =="undefined" ||obj[0].AnswerLabel ==undefined){
		radioPropObj.value="";
	}else{
		radioPropObj.value = obj[0].AnswerLabel.split('~')[1];
		radioPropObj.id = obj[0].AnswerLabel.split('~')[0];
	}

	radioPropObj.name = "AnswerLabel";
	datePickerPropArr.push(radioPropObj);

	var radioPropObj1 = new Object();
	if( obj[0].Name=="" || obj[0].Name==" " ||obj[0].Name=="null" || obj[0].Name==null){
		radioPropObj1.value="";
	}else{
		radioPropObj1.value = obj[0].Name.split('~')[1];
		radioPropObj1.id = obj[0].Name.split('~')[0];
	}

	radioPropObj1.name = "Name";
	datePickerPropArr.push(radioPropObj1);

	var radioPropObj2 = new Object();
	if( obj[0].ActionTag=="" || obj[0].ActionTag==" " ||obj[0].ActionTag=="null" || obj[0].ActionTag==null){
		radioPropObj2.value="";
	}else{
		radioPropObj2.value = obj[0].ActionTag.split('~')[1];
		radioPropObj2.id = obj[0].ActionTag.split('~')[0];
	}

	radioPropObj2.name = "ActionTag";
	datePickerPropArr.push(radioPropObj2);

	var radioPropObj3 = new Object();
	radioPropObj3.name = "DateFormat";
	if(obj[0].DateFormat=="" || obj[0].DateFormat==" " ||obj[0].DateFormat=="null" || obj[0].DateFormat==null){
		radioPropObj3.value="";
	}else{
		radioPropObj3.value =obj[0].DateFormat.split('~')[1];
		radioPropObj3.id = obj[0].DateFormat.split('~')[0];
	}
	datePickerPropArr.push(radioPropObj3);
	
	var radioPropObj31 = new Object();
	radioPropObj31.name = "DefaultValue";
	if(obj[0].DefaultValue=="" || obj[0].DefaultValue==" " ||obj[0].DefaultValue=="null" || obj[0].DefaultValue==null){
		radioPropObj31.value="";
	}else{
		radioPropObj31.value =obj[0].DefaultValue.split('~')[1];
		radioPropObj31.id = obj[0].DefaultValue.split('~')[0];
	}
	datePickerPropArr.push(radioPropObj31);


	var radioPropObj4 = new Object();
	if( obj[0].Disabled=="" || obj[0].Disabled==" " ||obj[0].Disabled=="null" || obj[0].Disabled==null){
		radioPropObj4.value="";
	}else{
		radioPropObj4.value = obj[0].Disabled.split('~')[1];
		radioPropObj4.id = obj[0].Disabled.split('~')[0];
	}

	radioPropObj4.name = "Disabled";
	datePickerPropArr.push(radioPropObj4);

	var radioPropObj5 = new Object();
	if( obj[0].Mandatory=="" || obj[0].Mandatory==" " ||obj[0].Mandatory=="null" || obj[0].Mandatory==null){
		radioPropObj5.value="";
	}else{
		radioPropObj5.value = obj[0].Mandatory.split('~')[1];
		radioPropObj5.id = obj[0].Mandatory.split('~')[0];
	}

	radioPropObj5.name = "Mandatory";
	datePickerPropArr.push(radioPropObj5);

	var radioPropObj6 = new Object();
	if( obj[0].Value=="" || obj[0].Value==" " ||obj[0].Value=="null" || obj[0].Value==null){
		radioPropObj6.value="";
	}else{
		radioPropObj6.value = obj[0].Value.split('~')[1];
		radioPropObj6.id = obj[0].Value.split('~')[0];
	}

	radioPropObj6.name = "Value";
	datePickerPropArr.push(radioPropObj6);

	var radioPropObj7 = new Object();
	if( obj[0].Visible=="" || obj[0].Visible==" " ||obj[0].Visible=="null" || obj[0].Visible==null){
		radioPropObj7.value="";
	}else{
		radioPropObj7.value = obj[0].Visible.split('~')[1];
		radioPropObj7.id = obj[0].Visible.split('~')[0];
	}
	radioPropObj7.name = "Visible";
	datePickerPropArr.push(radioPropObj7);
	return datePickerPropArr;
}