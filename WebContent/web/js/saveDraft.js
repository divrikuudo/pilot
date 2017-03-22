/*************Constructing Metadata Json *********************/
var globalImageObj;
var assignProjectValue=$('input[name=project_value]:checked').val();
$('input[name=project_value]').change(function(){
	assignProjectValue=$('input[name=project_value]:checked').val();
});

function saveDraft() {
	$(document).on("click", ".btnSaveDraft", function(e) {
		var quesFlag = 0;
		var quesTextAreaCompulsoryFlag=0;
		var stepNameFlag=0;
		var sectionNameFlag=0;
		var formNameFlag=0;
		var ansFlag = 0;
		var quesTextAreaFlag = 0;
		var quesT = 0;
		var sectionId=0;
		var countOFText=0;
		var countOFDrop=0;
		var countOFBtn=0;
		var countOFDate=0;
		var countOFRadio=0;
		var countOFCheck=0;
		var countOFTBox=0;
		var countOFLabel=0;
		var countOFSig=0;
		var countOFIm=0;
		var countOFAi=0;
		var indexForAnswer=-1;
		var indexForQuestion=-1;
		var indexForStep=-1;
		//var step_id;
		//var sect_id;
		var indexForSection=-1;
		var indexForQuestionMain=-1;
		e.preventDefault();
        var checkListName = $('.CLName_innerDiv .textareaVal').val();
        if(checkListName.trim()==""){
        	formNameFlag=1;
        }
        var sectionElementAr = new Array();
       // var j = 1;
        var clientID = 0;
        var sec_index=0;
        var stepID = 0;
        var quesIDD=0;
        $('.sectMainDiv').each(function() {
        	indexForSection++;
        	sect_id=$(".sectMainDiv").eq(indexForSection).attr("id").replace("section_","");
        	var step_Id=new Array();
        	var step_index=0;
        	var stepId=0;
        	sectionId++;
        	var sectionName = $(this).find('.sectName .textareaVal1').val();
        	if (sectionName.trim()=="") {
        		sectionNameFlag = 1;
        	}
        	var sectionListAr = new Array();
        	var sectionEleAr = {
        			sectionElement: sectionListAr
        	};
        	var stepElementAr = new Array();
        	var stepChange = "no";
        	$(this).find('.stepMainDiv').each(function() {
        		stepChange = "yes";
        	});
        	var sectionObj = {
        			"sectionId": "",
        			sectionTempId: sessionStorage.getItem('section_' + sectionId) ? sessionStorage.getItem('section_' + sectionId) : "0" ,
        			sectionName: sectionName,
        			"sectionChange": "Yes",
        			stepLevelChange: stepChange,
        			sectionLabel: sectionName,
        			"sectionOrder": sectionId,
        			"outOfScopeSection": false,
        			"punchListSection": "",
        			"isDeleted": " ",
        			"isDeleted": "no",
        			stepElements: stepElementAr
        	};
        	$(this).find('.stepMainDiv').each(function() {
        		indexForStep++;
        		step_id=$(".stepMainDiv").eq(indexForStep).find("a").attr("data-step-count");
        		stepId=(step_Id[step_index]);
        		var index_num=0;
        		var index_num1=0;
        		stepID++;
        		var stepName = $(this).find('.stepName .textareaVal2').val();
        		if (stepName.trim()=="") {
        			stepNameFlag = 1;
        		}
        		var quesListAr = new Array();
        		var stepElementsAr = new Array();
        		var stepElementObj = new Object();
        		var stepobj = new Object();
        		var questChange = "no";
        		$(this).find('.quesMainDiv').each(function() {
        			questChange = "yes";
        		});
        		stepElementObj = {
        				"stepId": "",
        				stepTempId: sessionStorage.getItem('step_' + stepID) ? sessionStorage.getItem('step_' + stepID) : "0",
        				stepName: stepName,
        				stepLabel: stepName,
        				"stepOrder": stepID,
        				"stepChange": "yes",
        				questionLevelChange: questChange,
        				"isDeleted": "no ",
        				questionAnswerElements: quesListAr
        		};
        		$(this).find('.quesMainDiv').each(function() {
        			indexForQuestionMain++;
        			quesIDD++;
        			var ques_id=$(".quesMainDiv").eq(indexForQuestionMain).find("div").eq(1).attr("id").replace("firstQues_","");
        			var questionText = $(this).find('.qsnText textarea').val();
        			var quesAns = ($(this).find('.ansHeader label').html());
        			var quesName = ($(this).find('.qsnHeader label').html());
        			var quesNumber = quesName.replace('Question','');
        			var questionAr = new Array();
        			var quesImmagesAr = new Array();
        			var quesElementsAr = new Array();
        			var elementsAr = new Array();
        			var random=new Date().getTime();
        			var questionDetailsObj = {
        					questionId: "",
        					questionClientUid: quesNumber,
        					quesAssocId:sessionStorage.getItem('ques_' + quesIDD) ? sessionStorage.getItem('ques_' + quesIDD) : "0",
        					questionName: quesName,
        					"questionDescription": questionText,
        					"questionAccessibility": "Standarad",
        					"isPunchListQuestion": "f",
        					"questionChange": "Yes",
        					"questionOrder": quesNumber,
        					"isDeleted": "no ",
        					images: quesImmagesAr,
        					"answerId": "",
        					answerClientUid: quesAns,
        					elements: elementsAr
        			};
        			var questionObj = {
        					questionAnswerElement: questionAr
        			};
        			questionAr.push(questionDetailsObj);
        			var addImageArray = new Array();
        			var imageArr = new Array();
        			//var imageObj = imageArr;
        			//var quesEleOrder = 0;
        			$(this).find('.ques').each(function() {
        				indexForQuestion++;
        				//var index1=new Array();
        				var ID=$(".ques").eq(indexForQuestion).attr('id').replace("firstQues_","");
        				if ($('#firstQues1_' +ID).children().size() > 0) {
        					var quesEleOrder = 0;
        					if ($('#firstQues1_' + ID).children().find('div').eq(0).attr('id') == undefined) {} else {
        						clientID++;
        						quesEleOrder++;
        						var seqNo=0;
        						var nameOfElementArr=$('#firstQues1_' + ID).children().find('div').eq(0).attr('id').split("_");
        						//var nameOfElement=nameOfElementArr[1];
        						countOFAi++;
        						var elementDetailsAr = new Array();
        						var elementDetailObj = {
        								"elementId": sessionStorage.getItem("elementIdAddImage"),
        								"elementOrder": quesEleOrder,
        								"elementMapId": "",
        								clientUid: clientID,
        								"clientClass": "AddImage",
        								"imageTempId": " ",
        								"imageTempUrl": "",
        								"elementType": "QuestionType",
        								//elementArributuesProp: elementAttrPropArray,
        								"isDeleted": "no"
        						};
        						var elementObj = {
        								element: elementDetailsAr
        						};
        						elementDetailsAr.push(elementDetailObj);
        						elementsAr.push(elementObj);
        						for (var k = 0; k < $('#addImagesDynamic_' + ID).children().size(); k++) {
        							seqNo++;
        							var src = ($('#addImagesDynamic_' + ID).find('img').eq(k).attr('src'));
        							var image_Obj = {
        									questionId: quesName,
        									helpDescription: "",
        									"operation": "add",
        									sequanceNo: seqNo,
        									formId: 1,
        									sectionId: sectionId,
        									stepId: stepID,
        									"userSSOId": ssoId,
        									imageData: src.replace('data:image/png;base64,',''),
        									helpTextLevel: "Question Image"
        							};
        							var imageJson = $.toJSON(image_Obj);
        							addImageArray.push(imageJson);
        						}
        					}
        					if ($('#firstQues1_' + ID).children().find('textarea').eq(0).attr('id') == undefined) {
        						quesTextAreaCompulsoryFlag=1;
        					} else {
        						quesT=$('#firstQues1_'+ID).children().find('textarea').eq(0).attr('id').replace('quesTextarea1','');
        						clientID++;
        						quesEleOrder++;
        						var elementDetailsAr = new Array();
        						if (document.getElementById('quesTextarea1' + quesT).value == "") {
        							quesTextAreaFlag = 1;
        						} else {
        							var elementDetailObj = {
        									"elementId": sessionStorage.getItem("elementIdTextArea1"),
        									"elementMapId": "",
        									"elementOrder": quesEleOrder,
        									clientUid: clientID,
        									"clientClass": "Textarea",
        									"imageTempId": " ",
        									"imageTempUrl": "",
        									"elementType": "QuestionType",
        									"isDeleted": "no"
        							};
        							var elementObj = {
        									element: elementDetailsAr
        							};
        							elementDetailsAr.push(elementDetailObj);
        							elementsAr.push(elementObj);
        						}
        					}
        				} else {
        					quesFlag = 1;
        				}
        				index_num++;
        			});
        			$(this).find('.ans').each(function() {
        				indexForAnswer++;
        				var idOfElement=new Array();
        				var indexOfOrder=0;
        				var ID=$(".ans").eq(indexForAnswer).attr('id').replace("firstAns_","");
        				if ($('#firstAns1_'+ID).children().size() > 0) {
        					var eleOrder = 0;
        					var i = 0;
        					var elementOrder = new Array();
        					for (var k = 0; k < $('#firstAns1_'+ID).children().size(); k++) {
        						idOfElement.push($('#firstAns1_'+ID).children().find('div').eq(i).attr('id'));
        						var nameOfElementArr=$('#firstAns1_'+ID).children().find('div').eq(i).attr('id').split("_");
        						var nameOfElement=nameOfElementArr[0];
        						if(nameOfElement=="txtAreaAns"){
        							countOFText++;
        						}
        						if(nameOfElement=="ansDrpDown"){
        							countOFDrop++;
        						}
        						if(nameOfElement=="ansDate"){
        							countOFDate++;
        						}
        						if(nameOfElement=="ansBtn"){
        							countOFBtn++;
        						}
        						if(nameOfElement=="ansRadioBtn"){
        							countOFRadio++;
        						}
        						if(nameOfElement=="anscheckBox"){
        							countOFCheck++;
        						}
        						if(nameOfElement=="textBox"){
        							countOFTBox++;
        						}
        						if(nameOfElement=="label"){
        							countOFLabel++;
        						}
        						if(nameOfElement=="ansSignature"){
        							countOFSig++;
        						}
        						if(nameOfElement=="ansImgUploadMainDiv"){
        							countOFIm++;
        						}
        						elementOrder.push(nameOfElement);
        						i = i + 3;
        					}
        					elementPropertiesRuleJson(elementOrder,clientID,eleOrder,idOfElement,indexOfOrder,elementsAr);
        				} else {
        					ansFlag = 1;
        				}
        				index_num1++;
        			});
        			quesListAr.push(questionObj);
        			quesElementsAr.push(quesListAr);
        		});
        		stepobj = {
        				stepElement: stepElementsAr
        		};
        		stepElementAr.push(stepobj);
        		stepElementsAr.push(stepElementObj);
        		step_index++;
        	});
        	sectionListAr.push(sectionObj);
        	sectionElementAr.push(sectionEleAr);
        	sec_index++;
        });
        var finalResult = {
            formName: checkListName,
            tempFormId:1,
            functionId: sessionStorage.getItem("functionId"),
            subFunctionId: sessionStorage.getItem("subfunctionId"),
            groupId: sessionStorage.getItem("groupId"),
            "formLanguage": "English",
            "createdDate": "2015-08-06",
            "isActive": "Y",
            "formStatusId": "11",
            "isFormConfigured": 'Y',
            "submittedBy": $("#sso").val(),
            "formVersionNo": "1.0",
            "assignedToProject" : assignProjectValue,
            sectionElements: sectionElementAr
        };
        var jsonfy = $.toJSON(finalResult);
        //var encodedata = encodeURIComponent(jsonfy);
        var serverbaseUrl = getServerPath();
        var url = serverbaseUrl + Application.checklistServices.saveMetadata;
        if (sectionNameFlag == 1) {
        	$("#AlertPopupSection").modal();
        	return false;        	
        } else if (stepNameFlag == 1) {
        	$("#AlertPopupStep").modal();
        	return false;
        }else if(formNameFlag==1){
        	$("#AlertPopupForm").modal();
        	return false;
        } 
        else if (quesFlag == 1 && ansFlag == 1) {
            $("#AlertSaveDraft").modal();
            return false;
        } else if (quesFlag == 1) {
        	$("#AlertSaveDraft1").modal();
        	return false;
        } else if (ansFlag == 1) {
        	$("#AlertSaveDraft2").modal();
        	return false;
        } else if(quesTextAreaCompulsoryFlag==1){
        	$("#AlertSaveDraft5").modal();
        	return false;
        }else if (quesTextAreaFlag == 1) {
        	$("#AlertSaveDraft3").modal();
        	return false;
        } else if(imageUploadJsonArr.length!=countOFIm || textAreaJsonArr.length!=countOFText || datePickerJsonArr.length!=countOFDate|| buttonJsonArr.length!=countOFBtn || checkBoxJsonArr.length!=countOFCheck || radioButtonJsonArr.length!=countOFRadio || textBoxJsonArr.length!=countOFTBox || signatureJsonArr.length!=countOFSig || labelJsonArr.length!=countOFLabel ||dropDownJsonArr.length!=countOFDrop ){
        	$("#AlertSaveDraft4").modal();
        	return false;
        } else {
        	post_data(url, jsonfy, function(data) {
        		$("#createchecklist").hide();
        		$('.CLCBtnDiv').hide();
        		$('#createchecklist').fadeOut('medium', function() {
        			$("#tablesearch_wrapper").empty();
        			$('#tablesearch_wrapper').hide();
        			$("#kwd_search").val("");
        			$("#collapseTwo").removeClass("expanded").addClass("notExpanded");
        			$(".accIcon").removeClass("icon-chevron-up").addClass("icon-chevron-right");
        			updatedPageChecklist();
        			$('#dashboardcontent').show();
        		});
        	});
        }
	});
}

