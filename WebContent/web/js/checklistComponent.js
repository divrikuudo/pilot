/*************Element controls*********************/
var selElementId = null;
function checklistcomponent() {
	//var accessToken = $("#accessToken").val();
	var serverbaseUrl = getServerPath();
	$.ajax({
		type: "POST",
		global: false,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		url: serverbaseUrl + Application.checklistServices.checklistComponent,
		success: function(response) {
			sessionStorage.setItem("com.ge.smartoutage.homepage", JSON.stringify(response));
			var jsonVal = JSON.stringify(response);
			var JSONObject = JSON.parse(jsonVal);
			//var dataArray = [];
			//var dataArrayComp = [];
			for (var key in JSONObject) {
				if (JSONObject.hasOwnProperty(key)) {
					selElementId = JSONObject[key]["elementId"];
					if (JSONObject[key]["iconName"] == "icon_punchlist") {
						//var value = JSONObject[key]["iconImage"];
						$('#punchlist .FCBg').append('<img id="scope"  src="images/punchlist.png"><span>Punchlist</span><img src="images/drag.png"/>');
					}
					if (JSONObject[key]["iconName"] == "Out of Scope") {
						//var value = JSONObject[key]["iconImage"];
						$('#toDoList .FCBg').append('<img id="scope"  src="images/outof-scope.png"><span>To Do List</span><img src="images/drag.png"/>');
					}
					if (JSONObject[key]["iconName"] == "Signature") {
						var elementIdSignature = JSONObject[key]["elementId"];
						sessionStorage.setItem("elementIdSignature", elementIdSignature);
						//var value = JSONObject[key]["iconImage"];
						$('#sign .FCBg').append('<img id="scope"  src="images/iconSignature.png"><span>Signature</span><img src="images/drag.png"/>');
					}
					if (JSONObject[key]["iconName"] == "Radio Button") {
						var elementIdRadio = JSONObject[key]["elementId"];
						sessionStorage.setItem("elementIdRadioButton", elementIdRadio);
						//var value = JSONObject[key]["iconImage"];
						$('#radioBtn .FCBg').append('<img id="scope"  src="images/radio-button.png"><span>Radio Button</span><img src="images/drag.png"/>');
					}
					if (JSONObject[key]["iconName"] == "Checkbox") {
						var elementIdCheckBox = JSONObject[key]["elementId"];
						sessionStorage.setItem("elementIdCheckBox", elementIdCheckBox);
						//var value = JSONObject[key]["iconImage"];
						$('#ckckBox .FCBg').append('<img id="scope"  src="images/checkbox.png"><span>Checkbox</span><img src="images/drag.png"/>');
					}
					if (JSONObject[key]["iconName"] == "Drop Down") {
						var elementIdDropDown = JSONObject[key]["elementId"];
						sessionStorage.setItem("elementIdDropDown", elementIdDropDown);
						//var value = JSONObject[key]["iconImage"];
						$('#dropDown .FCBg').append('<img id="scope"  src="images/drop-down.png"><span>Drop Down</span><img src="images/drag.png"/>');
					}
					if (JSONObject[key]["iconName"] == "Date Picker") {
						var elementIdDatePicker = JSONObject[key]["elementId"];
						sessionStorage.setItem("elementIdDatePicker", elementIdDatePicker);
						//var value = JSONObject[key]["iconImage"];
						$('#datePickerAns .FCBg').append('<img id="scope" src="images/date-picker.png"><span>Date Picker</span><img src="images/drag.png"/>');
					}
					if (JSONObject[key]["iconName"] == "Button") {
						var elementIdButton = JSONObject[key]["elementId"];
						sessionStorage.setItem("elementIdButton", elementIdButton);
						//var value = JSONObject[key]["iconImage"];
						$('#ansButn .FCBg').append('<img id="scope"  src="images/text-area.png"><span>Button</span><img src="images/drag.png"/>');
					}
					if (JSONObject[key]["iconName"] == "Text Area") {
						var elementIdTextArea = JSONObject[key]["elementId"];
						sessionStorage.setItem("elementIdTextArea", elementIdTextArea);
						//var value = JSONObject[key]["iconImage"];
						$('#ansTxtArea .FCBg').append('<img id="scope"  src="images/text-area.png"><span>Text Area</span><img src="images/drag.png"/>');
					}
					if (JSONObject[key]["iconName"] == "Image Upload") {
						var elementIdImageUpload = JSONObject[key]["elementId"];
						sessionStorage.setItem("elementIdImageUpload", elementIdImageUpload);
						//var value = JSONObject[key]["iconImage"];
						$('#ansImgUpload .FCBg').append('<img id="scope" src="images/upload-image.png"><span>Image Upload</span><img src="images/drag.png"/>');
					}
					if (JSONObject[key]["iconName"] == "Text Area") {
						var elementIdTextArea = JSONObject[key]["elementId"];
						sessionStorage.setItem("elementIdTextArea1", elementIdTextArea);
						//var value = JSONObject[key]["iconImage"];
						$('#quesTxtArea .FCBg').append('<img id="scope"  src="images/text-area.png"><span>Text Area</span><img src="images/drag.png"/>');
					}
					if (JSONObject[key]["iconName"] == "Add Image") {
						var elementIdAddImage = JSONObject[key]["elementId"];
						sessionStorage.setItem("elementIdAddImage", elementIdAddImage);
						//var value = JSONObject[key]["iconImage"];
						$('#addImg .FCBg').append('<img id="scope" src="images/add-image.png"><span>Add Image</span><img src="images/drag.png"/>');
					}
					if (JSONObject[key]["iconName"] == "Textbox") {
						var elementIdTextBox = JSONObject[key]["elementId"];
						sessionStorage.setItem("elementIdTextBox", elementIdTextBox);
						//var value = JSONObject[key]["iconImage"];
						$('#ansTextBox .FCBg').append('<img id="scope" src="images/text-box.png"><span>Text Box</span><img src="images/drag.png"/>');
					}
					if (JSONObject[key]["iconName"] == "Label") {
						var elementIdLabel = JSONObject[key]["elementId"];
						sessionStorage.setItem("elementIdLabel", elementIdLabel);
						//var value = JSONObject[key]["iconImage"];
						$('#ansLabel .FCBg').append('<img id="scope" src="images/iconLabel.png" ><span>Label</span><img src="images/drag.png"/>');
					}
					if (JSONObject[key]["iconName"] == "Add Section") {
						var elementIdAddSection = JSONObject[key]["elementId"];
						sessionStorage.setItem("elementIdLabel", elementIdAddSection);
						//var value = JSONObject[key]["iconImage"];

						$('#addSection .FCBg').append('<img id="scope" src="images/Add-Section_Icon.png"><span>Add Section</span><img src="images/drag.png"/>');

					}
					if (JSONObject[key]["iconName"] == "Add Step") {
						var elementIdAddStep = JSONObject[key]["elementId"];
						sessionStorage.setItem("elementIdLabel", elementIdAddStep);
						//var value = JSONObject[key]["iconImage"];

						$('#addStep .FCBg').append('<img id="scope" src="images/Add-Step_Icon.png"><span>Add Step</span><img src="images/drag.png"/>');

					}
					if (JSONObject[key]["iconName"] == "Add Question") {
						var elementIdAddQues = JSONObject[key]["elementId"];
						sessionStorage.setItem("elementIdLabel", elementIdAddQues);
						//var value = JSONObject[key]["iconImage"];

						$('#addQues .FCBg').append('<img id="scope" src="images/Add-question.png"><span>Add Question</span><img src="images/drag.png"/>');

					}
					if (JSONObject[key]["iconName"] == "Help Image") {
						var elementIdAddHelpImg = JSONObject[key]["elementId"];
						sessionStorage.setItem("elementIdLabel", elementIdAddHelpImg);
						//var value = JSONObject[key]["iconImage"];

						$('#addHelpImg .FCBg').append('<img id="scope" src="images/Add-help-image.png"><span>Help Image</span><img src="images/drag.png"/>');

					}
					if (JSONObject[key]["iconName"] == "Guide Image") {
						var elementIdGuideImg = JSONObject[key]["elementId"];
						sessionStorage.setItem("elementIdLabel", elementIdGuideImg);
						//var value = JSONObject[key]["iconImage"];

						$('#addGuideImg .FCBg').append('<img id="scope" src="images/Icon_guide-Image.png"><span>Guide Image</span><img src="images/drag.png"/>');

					}
				}
			}
		},
		error: function() {},
		Complete: function() {},
	});
}