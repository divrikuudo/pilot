/*************Generating Element Properties and Rule Json*********************/
function elementPropertiesRuleJson(elementOrder,clientID,eleOrder,idOfElement,indexOfOrder,elementsAr){
	for (var s = 0; s < elementOrder.length; s++) {
		if (elementOrder[s] == "ansImgUploadMainDiv") {
			clientID++;
			eleOrder++;
			var elementDetailsAr = new Array();
			var elementAttrPropArray = new Array();
			var elementDetailObj = {
					"elementId": sessionStorage.getItem("elementIdImageUpload"),
					"elementOrder": eleOrder,
					"elementMapId": "",
					clientUid: clientID,
					"clientClass": "ImageUpload",
					"imageTempId": " ",
					"imageTempUrl": "",
					"elementType": "AnswerType",
					elementArributuesProp: elementAttrPropArray,
					"isDeleted": "no"
			};
			var elementObj = {
					element: elementDetailsAr
			};
			elementDetailsAr.push(elementDetailObj);
			var orderNo=idOfElement[indexOfOrder].split("_");
			for (var p = 0; p < imageUploadJsonArr.length; p++) {
				if (imageUploadJsonArr[p].imageUpNum == orderNo[1]) {
					indexOfOrder++;
					for (var k = 0; k < imageUploadJsonArr[p].imageUpPropArr.length; k++) {
						if (imageUploadJsonArr[p].imageUpPropArr[k].value == " ") {} else {
							var elementPropObj = {
									attributeId: imageUploadJsonArr[p].imageUpPropArr[k].id,
									attributeName: imageUploadJsonArr[p].imageUpPropArr[k].name,
									defaultValue: imageUploadJsonArr[p].imageUpPropArr[k].value
							};
							elementAttrPropArray.push(elementPropObj);
						}
					}
					p = imageUploadJsonArr.length;
				}
			}
			elementsAr.push(elementObj);
		} else if (elementOrder[s] == "txtAreaAns") {
			var txtIndex="";
			clientID++;
			eleOrder++;
			var elementDetailsAr = new Array();
			var elementAttrPropArray = new Array();
			var ruleArray = new Array();
			var elementDetailObj = {
					"elementId": sessionStorage.getItem("elementIdTextArea"),
					"elementOrder": eleOrder,
					"elementMapId": "",
					clientUid: clientID,
					"clientClass": "Text Area",
					"imageTempId": " ",
					"imageTempUrl": "",
					"elementType": "AnswerType",
					elementArributuesProp: elementAttrPropArray,
					"isDeleted": "no",
					rule: ruleArray
			};
			var elementObj = {
					element: elementDetailsAr
			};
			elementDetailsAr.push(elementDetailObj);
			var orderNo=idOfElement[indexOfOrder].split("_");
			for (var p = 0; p < textAreaJsonArr.length; p++) {
				if (textAreaJsonArr[p].textAreaNum ==orderNo[1]) {
					indexOfOrder++;
					txtIndex=orderNo[1];
					for (var k = 0; k < textAreaJsonArr[p].textPropArr.length; k++) {
						if (textAreaJsonArr[p].textPropArr[k].value == " " || textAreaJsonArr[p].textPropArr[k].value == "" ||textAreaJsonArr[p].textPropArr[k].value == "null"||textAreaJsonArr[p].textPropArr[k].value ==null) 
						{} else {
							var elementPropObj = {
									attributeId: textAreaJsonArr[p].textPropArr[k].id,
									attributeName: textAreaJsonArr[p].textPropArr[k].name,
									defaultValue: textAreaJsonArr[p].textPropArr[k].value
							};
							elementAttrPropArray.push(elementPropObj);
						}
					}
					p = textAreaJsonArr.length;

				}
			}
			elementsAr.push(elementObj);
		} else if (elementOrder[s] == "ansDrpDown") {
			var drpIndex="";
			eleOrder++;
			clientID++;
			var elementDetailsAr = new Array();
			var elementAttrPropArray = new Array();
			var ruleArray = new Array();
			var elementDetailObj = {
					"elementId": sessionStorage.getItem("elementIdDropDown"),
					"elementOrder": eleOrder,
					"elementMapId": "",
					clientUid: clientID,
					"clientClass": "Drop Down",
					"imageTempId": " ",
					"imageTempUrl": "",
					"elementType": "AnswerType",
					elementArributuesProp: elementAttrPropArray,
					"isDeleted": "no",
					rule: ruleArray
			};
			var elementObj = {
					element: elementDetailsAr
			};
			elementDetailsAr.push(elementDetailObj);
			var orderNo=idOfElement[indexOfOrder].split("_");
			for (var p = 0; p < dropDownJsonArr.length; p++) {
				//var ques = quesName.replace('Question','');
				if (dropDownJsonArr[p].dropDownNum == orderNo[1]) {
					indexOfOrder++;
					drpIndex=orderNo[1];
					for (var k = 0; k < dropDownJsonArr[p].dropDownPropArr.length; k++) {
						if (dropDownJsonArr[p].dropDownPropArr[k].value == " " ||dropDownJsonArr[p].dropDownPropArr[k].value == "" ||dropDownJsonArr[p].dropDownPropArr[k].value == "null" ||dropDownJsonArr[p].dropDownPropArr[k].value == null) {} else {
							var elementPropObj = {
									attributeId: dropDownJsonArr[p].dropDownPropArr[k].id,
									attributeName: dropDownJsonArr[p].dropDownPropArr[k].name,
									defaultValue: dropDownJsonArr[p].dropDownPropArr[k].value
							};
							elementAttrPropArray.push(elementPropObj);
						}
					}
					p = dropDownJsonArr.length;
				}
			}
			elementsAr.push(elementObj);
			for (var i = 0; i < ruleMainArr.length; i++) {
				if ("ansDrpDown" == ruleMainArr[i].elementName) {
					if (drpIndex == ruleMainArr[i].ruleNumber){
						for (var k = 0; k < ruleMainArr[i].RuleArr.length; k++) {
							var addActionArr = new Array();
							var ruleObj = {
									ruleId: ruleMainArr[i].RuleArr[k].ID_num,
									ruleName: ruleMainArr[i].RuleArr[k].nameofRule,
									formula: ruleMainArr[i].RuleArr[k].valueofFormula,
									formulaData: ruleMainArr[i].RuleArr[k].formulaData,
									"isDeleted": "no",
									addAction: addActionArr
							};
							var row_ = ruleMainArr[i].RuleArr[k].idRule;
							for (var n = 0; n < actionRulesArr.length; n++) {
								if ("ansDrpDown" == actionRulesArr[n].elementName) {
									if (drpIndex == actionRulesArr[n].ruleNumber) {
										if (row_ == actionRulesArr[n].Row) {
											for (var m = 0; m < actionRulesArr[n].actionArr.length; m++) {
												var actionObj = {
														actionId: actionRulesArr[n].actionArr[m].actionID_num,
														actionDescription: actionRulesArr[n].actionArr[m].action,
														actionTag: actionRulesArr[n].actionArr[m].tagValue,
														actionOutput: actionRulesArr[n].actionArr[m].output,
														actionOutputValue: actionRulesArr[n].actionArr[m].opVal,
														numberOfFields: actionRulesArr[n].actionArr[m].fields,
														"isDeleted": "no"
												};
												addActionArr.push(actionObj);
											}
										}
									}
								}
							}
							ruleArray.push(ruleObj);
						}
						n = actionRulesArr.length;
						i = ruleMainArr.length;
					}
				}
			}
		} else if (elementOrder[s] == "ansDate") {
			var dateIndex="";
			clientID++;
			eleOrder++;
			var elementDetailsAr = new Array();
			var elementAttrPropArray = new Array();
			var ruleArray = new Array();
			var elementDetailObj = {
					"elementId": sessionStorage.getItem("elementIdDatePicker"),
					"elementOrder": eleOrder,
					"elementMapId": "",
					clientUid: clientID,
					"clientClass": "Date Picker",
					"imageTempId": " ",
					"imageTempUrl": "",
					"elementType": "AnswerType",
					elementArributuesProp: elementAttrPropArray,
					"isDeleted": "no",
					rule: ruleArray
			};
			var elementObj = {
					element: elementDetailsAr
			};
			elementDetailsAr.push(elementDetailObj);
			var orderNo=idOfElement[indexOfOrder].split("_");
			for (var p = 0; p < datePickerJsonArr.length; p++) {
				if (datePickerJsonArr[p].datePickerNum == orderNo[1]) {
					indexOfOrder++;
					dateIndex=orderNo[1];
					for (var k = 0; k < datePickerJsonArr[p].datePickerPropArr.length; k++) {
						if (datePickerJsonArr[p].datePickerPropArr[k].value == " " ||datePickerJsonArr[p].datePickerPropArr[k].value == "" ||datePickerJsonArr[p].datePickerPropArr[k].value == "null" ||datePickerJsonArr[p].datePickerPropArr[k].value == null) 
						{} else {
							var elementPropObj = {
									attributeId: datePickerJsonArr[p].datePickerPropArr[k].id,
									attributeName: datePickerJsonArr[p].datePickerPropArr[k].name,
									defaultValue: datePickerJsonArr[p].datePickerPropArr[k].value
							};
							elementAttrPropArray.push(elementPropObj);
						}
					}
					p = datePickerJsonArr.length;
				}
			}
			elementsAr.push(elementObj);
		} else if (elementOrder[s] == "anscheckBox") {
			var checkIndex="";
			clientID++;
			eleOrder++;
			var elementDetailsAr = new Array();
			var elementAttrPropArray = new Array();
			var ruleArray = new Array();
			//var elementValues = new Array();
			var elementDetailObj = {
					"elementId": sessionStorage.getItem("elementIdCheckBox"),
					"elementOrder": eleOrder,
					"elementMapId": "",
					clientUid: clientID,
					"clientClass": "CheckBox",
					"imageTempId": " ",
					"imageTempUrl": "",
					"elementType": "AnswerType",
					//elementValues:elementValues,
					elementArributuesProp: elementAttrPropArray,
					"isDeleted": "no",
					rule: ruleArray
			};
			var elementObj = {
					element: elementDetailsAr
			};
			elementDetailsAr.push(elementDetailObj);
			var orderNo=idOfElement[indexOfOrder].split("_");
			for (var p = 0; p < checkBoxJsonArr.length; p++) {
				if (checkBoxJsonArr[p].checkBoxNum == orderNo[1]) {
					indexOfOrder++;
					checkIndex=orderNo[1];
					for (var k = 0; k < checkBoxJsonArr[p].checkBoxPropArr.length; k++) {
						if (checkBoxJsonArr[p].checkBoxPropArr[k].value == "" ||checkBoxJsonArr[p].checkBoxPropArr[k].value.replace(/^\s+|\s+$/g, "").length == 0 ||checkBoxJsonArr[p].checkBoxPropArr[k].value == null) 
						{} else {
							var elementPropObj = {
									attributeId: checkBoxJsonArr[p].checkBoxPropArr[k].id,
									attributeName: checkBoxJsonArr[p].checkBoxPropArr[k].name,
									defaultValue: checkBoxJsonArr[p].checkBoxPropArr[k].value
							};
							elementAttrPropArray.push(elementPropObj);
						}
					}
					/*for (var m = 0; m< checkBoxJsonArr[p].checkValueArr.length; m++) {
						if (checkBoxJsonArr[p].checkValueArr[m].value == ""||checkBoxJsonArr[p].checkValueArr[m].value.replace(/^\s+|\s+$/g, "").length == 0||checkBoxJsonArr[p].checkValueArr[m].value == null) 
						{} else {
							var elementChoiceObj = {
									attributeId: "78",
									elementOrder: checkBoxJsonArr[p].checkValueArr[m].order,
									elementValue: checkBoxJsonArr[p].checkValueArr[m].value
							};
							elementValues.push(elementChoiceObj);
						}
					}*/
					p = checkBoxJsonArr.length;
				}
			}
			elementsAr.push(elementObj);
			for (var i = 0; i < ruleMainArr.length; i++) {
				if ("anscheckBox" == ruleMainArr[i].elementName) {
					if (checkIndex == ruleMainArr[i].ruleNumber) {
						for (var k = 0; k < ruleMainArr[i].RuleArr.length; k++) {
							var addActionArr = new Array();
							var ruleObj = {
									ruleId: ruleMainArr[i].RuleArr[k].ID_num,
									ruleName: ruleMainArr[i].RuleArr[k].nameofRule,
									formula: ruleMainArr[i].RuleArr[k].valueofFormula,
									formulaData: ruleMainArr[i].RuleArr[k].formulaData,
									//elementOrder:ruleMainArr[i].RuleArr[k].choiceId,
									"isDeleted": "no",
									addAction: addActionArr
							};
							var row_ = ruleMainArr[i].RuleArr[k].idRule;
							for (var n = 0; n < actionRulesArr.length; n++) {
								if ("anscheckBox" == actionRulesArr[n].elementName) {
									if (checkIndex== actionRulesArr[n].ruleNumber) {
										if (row_ == actionRulesArr[n].Row) {
											for (var m = 0; m < actionRulesArr[n].actionArr.length; m++) {
												var actionObj = {
														actionId: actionRulesArr[n].actionArr[m].actionID_num,
														actionDescription: actionRulesArr[n].actionArr[m].action,
														actionTag: actionRulesArr[n].actionArr[m].tagValue,
														actionOutput: actionRulesArr[n].actionArr[m].output,
														actionOutputValue: actionRulesArr[n].actionArr[m].opVal,
														numberOfFields: actionRulesArr[n].actionArr[m].fields,
														"isDeleted": "no"
												};
												addActionArr.push(actionObj);
											}
										}
									}
								}
							}
							ruleArray.push(ruleObj);
						}
						n = actionRulesArr.length;
						i = ruleMainArr.length;
					}
				}
			}
		} else if (elementOrder[s] == "ansRadioBtn") {
			var radioIndex="";
			clientID++;
			eleOrder++;
			var elementDetailsAr = new Array();
			var elementAttrPropArray = new Array();
			//var elementValues = new Array();
			var ruleArray = new Array();
			var elementDetailObj = {
					"elementId": sessionStorage.getItem("elementIdRadioButton"),
					"elementOrder": eleOrder,
					"elementMapId": "",
					clientUid: clientID,
					"clientClass": "Radio Button",
					"imageTempId": " ",
					"imageTempUrl": "",
					"elementType": "AnswerType",
					//elementValues:elementValues,
					elementArributuesProp: elementAttrPropArray,
					"isDeleted": "no",
					rule: ruleArray
			};
			var elementObj = {
					element: elementDetailsAr
			};
			elementDetailsAr.push(elementDetailObj);
			var orderNo=idOfElement[indexOfOrder].split("_");
			
			for (var p = 0; p < radioButtonJsonArr.length; p++) {
				if (radioButtonJsonArr[p].radioBntNum == orderNo[1]) {
					indexOfOrder++;
					radioIndex=orderNo[1];
					for (var k = 0; k < radioButtonJsonArr[p].radioPropArr.length; k++) {
						if (radioButtonJsonArr[p].radioPropArr[k].value == "" ||radioButtonJsonArr[p].radioPropArr[k].value.replace(/^\s+|\s+$/g, "").length == 0 ||radioButtonJsonArr[p].radioPropArr[k].value == null) {
						} else {
							var elementPropObj = {
									attributeId: radioButtonJsonArr[p].radioPropArr[k].id,
									attributeName: radioButtonJsonArr[p].radioPropArr[k].name,
									defaultValue: radioButtonJsonArr[p].radioPropArr[k].value
							};
							elementAttrPropArray.push(elementPropObj);
						}
					}
					/*for (var m= 0; m < radioButtonJsonArr[p].radioValueArr.length;m++) {
						if (radioButtonJsonArr[p].radioValueArr[m].value == "" ||radioButtonJsonArr[p].radioValueArr[m].value.replace(/^\s+|\s+$/g, "").length == 0 ||radioButtonJsonArr[p].radioValueArr[m].value == null) {
						} else {
							var elementChoiceObj = {
									attributeId: "57",
									elementOrder: radioButtonJsonArr[p].radioValueArr[m].order,
									elementValue: radioButtonJsonArr[p].radioValueArr[m].value
							};
							elementValues.push(elementChoiceObj);
						}
					}*/
					p = radioButtonJsonArr.length;
				}

			}
			elementsAr.push(elementObj);
			for (var i = 0; i < ruleMainArr.length; i++) {
				if ("ansRadioBtn" == ruleMainArr[i].elementName) {
					if (radioIndex == ruleMainArr[i].ruleNumber) {
						for (var k = 0; k < ruleMainArr[i].RuleArr.length; k++) {
							var addActionArr = new Array();
							var ruleObj = {
									ruleId: ruleMainArr[i].RuleArr[k].ID_num,
									ruleName: ruleMainArr[i].RuleArr[k].nameofRule,
									formula: ruleMainArr[i].RuleArr[k].valueofFormula,
									formulaData: ruleMainArr[i].RuleArr[k].formulaData,
									//elementOrder:ruleMainArr[i].RuleArr[k].choiceId,
									"isDeleted": "no",
									addAction: addActionArr
							};
							var row_ = ruleMainArr[i].RuleArr[k].idRule;
							for (var n = 0; n < actionRulesArr.length; n++) {
								if ("ansRadioBtn" == actionRulesArr[n].elementName) {
									if (radioIndex== actionRulesArr[n].ruleNumber) {
										if (row_ == actionRulesArr[n].Row) {
											for (var m = 0; m < actionRulesArr[n].actionArr.length; m++) {
												var actionObj = {
														actionId: actionRulesArr[n].actionArr[m].actionID_num,
														actionDescription: actionRulesArr[n].actionArr[m].action,
														actionTag: actionRulesArr[n].actionArr[m].tagValue,
														actionOutput: actionRulesArr[n].actionArr[m].output,
														actionOutputValue: actionRulesArr[n].actionArr[m].opVal,
														numberOfFields: actionRulesArr[n].actionArr[m].fields,
														"isDeleted": "no"
												};
												addActionArr.push(actionObj);
											}
										}
									}
								}
							}
							ruleArray.push(ruleObj);
						}
						n = actionRulesArr.length;
						i = ruleMainArr.length;
					}
				}
			}
		} else if (elementOrder[s] == "textBox") {
			var textBoxIndex="";
			clientID++;
			eleOrder++;
			var elementDetailsAr = new Array();
			var elementAttrPropArray = new Array();
			var ruleArray = new Array();
			var elementDetailObj = {
					"elementId": sessionStorage.getItem("elementIdTextBox"),
					"elementOrder": eleOrder,
					"elementMapId": "",
					clientUid: clientID,
					"clientClass": "Text Box",
					"imageTempId": " ",
					"imageTempUrl": "",
					"elementType": "AnswerType",
					elementArributuesProp: elementAttrPropArray,
					"isDeleted": "no",
					rule: ruleArray
			};
			var elementObj = {
					element: elementDetailsAr
			};
			elementDetailsAr.push(elementDetailObj);
			var orderNo=idOfElement[indexOfOrder].split("_");
			for (var p = 0; p < textBoxJsonArr.length; p++) {
				if (textBoxJsonArr[p].textBoxNum == orderNo[1]) {
					indexOfOrder++;
					textBoxIndex=orderNo[1];
					for (var k = 0; k < textBoxJsonArr[p].textBoxPropArr.length; k++) {
						if (textBoxJsonArr[p].textBoxPropArr[k].value == " " || textBoxJsonArr[p].textBoxPropArr[k].value == "" ||textBoxJsonArr[p].textBoxPropArr[k].value == "null" ||textBoxJsonArr[p].textBoxPropArr[k].value == null) {
						} else {
							var elementPropObj = {
									attributeId: textBoxJsonArr[p].textBoxPropArr[k].id,
									attributeName: textBoxJsonArr[p].textBoxPropArr[k].name,
									defaultValue: textBoxJsonArr[p].textBoxPropArr[k].value
							};
							elementAttrPropArray.push(elementPropObj);
						}
					}
					p = textBoxJsonArr.length;
				}
			}
			elementsAr.push(elementObj);
			for (var i = 0; i < ruleMainArr.length; i++) {
				if ("textBox" == ruleMainArr[i].elementName) {
					if (textBoxIndex == ruleMainArr[i].ruleNumber) {
						for (var k = 0; k < ruleMainArr[i].RuleArr.length; k++) {
							var addActionArr = new Array();
							var ruleObj = {
									ruleId: ruleMainArr[i].RuleArr[k].ID_num,
									ruleName: ruleMainArr[i].RuleArr[k].nameofRule,
									formula: ruleMainArr[i].RuleArr[k].valueofFormula,
									formulaData: ruleMainArr[i].RuleArr[k].formulaData,
									"isDeleted": "no",
									addAction: addActionArr
							};
							var row_ = ruleMainArr[i].RuleArr[k].idRule;
							for (var n = 0; n < actionRulesArr.length; n++) {
								if ("textBox" == actionRulesArr[n].elementName) {
									if (textBoxIndex == actionRulesArr[n].ruleNumber) {
										if (row_ == actionRulesArr[n].Row) {
											for (var m = 0; m < actionRulesArr[n].actionArr.length; m++) {
												var actionObj = {
														actionId: actionRulesArr[n].actionArr[m].actionID_num,
														actionDescription: actionRulesArr[n].actionArr[m].action,
														actionTag: actionRulesArr[n].actionArr[m].tagValue,
														actionOutput: actionRulesArr[n].actionArr[m].output,
														actionOutputValue: actionRulesArr[n].actionArr[m].opVal,
														numberOfFields: actionRulesArr[n].actionArr[m].fields,
														"isDeleted": "no"
												};
												addActionArr.push(actionObj);
											}
										}
									}
								}
							}
							ruleArray.push(ruleObj);
						}
						n = actionRulesArr.length;
						i = ruleMainArr.length;
					}
				}
			}
		} else if (elementOrder[s] == "ansSignature") {
			var sigIndex;
			eleOrder++;
			clientID++;
			var elementDetailsAr = new Array();
			var elementAttrPropArray = new Array();
			var ruleArray = new Array();
			var elementDetailObj = {
					"elementId": sessionStorage.getItem("elementIdSignature"),
					"elementOrder": eleOrder,
					"elementMapId": "",
					clientUid: clientID,
					"clientClass": "Signature",
					"imageTempId": " ",
					"imageTempUrl": "",
					"elementType": "AnswerType",
					elementArributuesProp: elementAttrPropArray,
					"isDeleted": "no",
					rule: ruleArray
			};
			var elementObj = {
					element: elementDetailsAr
			};
			elementDetailsAr.push(elementDetailObj);
			var orderNo=idOfElement[indexOfOrder].split("_");
			for (var p = 0; p < signatureJsonArr.length; p++) {
				if (signatureJsonArr[p].signatureNum == orderNo[1]) {
					indexOfOrder++;
					sigIndex=orderNo[1];
					for (var k = 0; k < signatureJsonArr[p].signaturePropArr.length; k++) {
						if (signatureJsonArr[p].signaturePropArr[k].value == " " ||signatureJsonArr[p].signaturePropArr[k].value == "" ||signatureJsonArr[p].signaturePropArr[k].value == "null" ||signatureJsonArr[p].signaturePropArr[k].value == null) {
						} else {
							var elementPropObj = {
									attributeId: signatureJsonArr[p].signaturePropArr[k].id,
									attributeName: signatureJsonArr[p].signaturePropArr[k].name,
									defaultValue: signatureJsonArr[p].signaturePropArr[k].value
							};
							elementAttrPropArray.push(elementPropObj);
						}
					}
					p = signatureJsonArr.length;
				}
			}
			elementsAr.push(elementObj);
		}
	}
}