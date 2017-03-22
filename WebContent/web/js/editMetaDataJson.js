/*************Generating Metadata Json at time of Edit*********************/
var stepNameFlag=0;
var sectionNameFlag=0;
var formNameFlag=0;
var quesTextAreaFlag = 0;
var quesFlag = 0;
var ansFlag = 0;
var quesTextAreaCompulsoryFlag=0;
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
function generateSaveMetadataJson() {
	var sectionElementAr = new Array();
	var sectionId=0;
	var quesAnsIndex=0;
	var clientID=0;
	var quesTemp=0;
	var indexForAnswer=-1;
	var indexForQuestion=-1;
	var indexForStep=-1;
	var step_id;
	var sect_id;
	var indexForSection=-1;
	var indexForQuestionMain=-1;
	var stepID=0;
	var quesIDD=0;
	$('.sectMainDiv').each(function(){
		indexForSection++;
		var sectTempid=0;
		sect_id=$(".sectMainDiv").eq(indexForSection).attr("id").replace("section_","");
		var stepElementAr = new Array();
		sectionId++;
		if($(".sectMainDiv").eq(indexForSection).attr("status")=="present"){
			sectTempid=sect_id;
		}
		else{
			sectTempid=sessionStorage.getItem('section_' + sectionId);
		}

		var sectionName=( $(this).find('.sectName .textareaVal1').val());
		if (sectionName.trim()=="") {
			sectionNameFlag = 1;
		}
		var sectionListAr = new Array();
		var sectionEleAr = {sectionElement : sectionListAr };
		var stepChange="no";
		$(this).find('.stepMainDiv').each(function(){
			stepChange="yes";
		});
		var sectionObj = {
				"sectionId":sect_id,
				sectionTempId:  sectTempid ? sectTempid : "0",
						"sectionChange": "Yes",
						stepLevelChange: stepChange,
						sectionLabel: sectionName,
						"sectionName": sectionName,
						"sectionOrder": sectionId,
						"outOfScopeSection": false,
						"punchListSection": "",
						"isDeleted": "no",
						stepElements: stepElementAr

		};
		$(this).find('.stepMainDiv').each(function() {
			stepID++;
			indexForStep++;
			var stepTempId=0;
			step_id=$(".stepMainDiv").eq(indexForStep).find("a").attr("data-step-plus");
			if($(".stepMainDiv").eq(indexForStep).attr("status")=="present"){
				stepTempId=step_id;
			}
			else{
				stepTempId=sessionStorage.getItem('step_' + stepID);
			}
			var stepName=$(this).find('.stepName .textareaVal2').val();
			if (stepName.trim()=="") {
				stepNameFlag = 1;
			}
			var stepElementsAr = new Array();				
			var quesListAr = new Array();
			var stepobj = new Object();	
			var questChange="no";
			var quesIDCount=1;
			$(this).find('.quesMainDiv').each(function() {
				questChange="yes";
			});	
			var stepElementObj = {
					"stepId":step_id,
					stepTempId: stepTempId ? stepTempId : "0",
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
				var quesNumber = quesName.replace('Question', '');
				if(questionText=="" || questionText==" " ||questionText=="null" ||questionText==null){
					questionText="";
				}
				var quesTempId=0;
				if($(".quesMainDiv").eq(indexForQuestionMain).attr("status")=="present"){
					quesTempId=ques_id;
				}
				else{
					quesTempId=sessionStorage.getItem('ques_' + quesIDD);
				}
				var questionAr = new Array();
				var quesImmagesAr = new Array();
				var quesElementsAr=new Array();
				var elementsAr = new Array();
				var questionDetailsObj = {
						questionId:ques_id,
						questionClientUid: quesIDCount,
						quesAssocId:quesTempId ? quesTempId : "0",
								questionName: quesName,
								"questionDescription": questionText,
								"questionAccessibility": "Standarad",
								"isPunchListQuestion": "f",
								"questionOrder": quesNumber,
								"isDeleted": "no ",
								images: quesImmagesAr,
								"answerId": ques_id,
								answerClientUid: quesIDCount,
								elements: elementsAr
				};
				$(this).find('.ques').each(function(){
					var quesEleOrder = 0;
					indexForQuestion++;
					var status= $(".ques").eq(indexForQuestion).find("div").eq(1).attr("status");
					if(status=="new")
					{
						var ID=$(".ques").eq(indexForQuestion).find("div").eq(1).attr("id");
						if($('#'+ID).children().size() >0){
							if ($('#'+ID).children().find('textarea').eq(0).attr('id') == undefined){
								quesTextAreaCompulsoryFlag=1;
							}
							else
							{
								quesT=$('#'+ID).children().find('textarea').eq(0).attr('id').replace('quesTextarea1','');
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
											"clientUid": clientID,
											"clientClass": "Textarea",
											"imageTempId": " ",
											"imageTempUrl": "",
											"elementType": "QuestionType",
											"isDeleted": "no"
									};
								}
								var elementObj = {
										element: elementDetailsAr

								};
								elementDetailsAr.push(elementDetailObj);
								elementsAr.push(elementObj);
							}
							if ($('#'+ID).children().find('div').eq(0).attr('id') == undefined) {} else {
								clientID++;
								quesEleOrder++;
								var nameOfElementArr=$('#'+ID).children().find('div').eq(0).attr('id').split("_");
								var nameOfElement=nameOfElementArr[1];
								var elementDetailsAr = new Array();
								var elementDetailObj = {
										"elementId": sessionStorage.getItem("elementIdAddImage"),
										"elementOrder": quesEleOrder,
										"elementMapId": "",
										"clientUid": clientID,
										"clientClass": "AddImage",
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
						else{
							quesFlag = 1;
						}
					}
					else{
						var ID=$(".ques").eq(indexForQuestion).find("div").eq(1).attr("id");
						if($('#'+ID).children().size() >0){
							if($("#"+ID).children().find('textarea').eq(0).attr('id') == undefined){
								quesTextAreaCompulsoryFlag=1;
							}
							else{
								quesT=$("#"+ID).children().find('textarea').eq(0).attr('id').replace('quesTextarea1','');
								clientID++;
								quesEleOrder++;
								var elementDetailsAr = new Array();
								if (document.getElementById('quesTextarea1' + quesT).value == "") {
									quesTextAreaFlag = 1;

								} 
								else 
								{
									var elementDetailObj = {
											"elementId": sessionStorage.getItem("elementIdTextArea1"),
											"elementMapId": "",
											"elementOrder": quesEleOrder,
											"clientUid": clientID,
											"clientClass": "Textarea",
											"imageTempId": " ",
											"imageTempUrl": "",
											"elementType": "QuestionType",
											"isDeleted": "no"
									};
								}
								var elementObj = {
										element: elementDetailsAr
								};
								elementDetailsAr.push(elementDetailObj);
								elementsAr.push(elementObj);

							}
							if ($("#"+ID).children().find('div').eq(0).attr('id') == undefined) {} 
							else
							{
								clientID++;
								quesEleOrder++;
								var nameOfElementArr=$("#"+ID).children().find('div').eq(0).attr('id').split("_");
								var nameOfElement=nameOfElementArr[1];
								var elementDetailsAr = new Array();
								var elementDetailObj = {
										"elementId": sessionStorage.getItem("elementIdAddImage"),
										"elementOrder": quesEleOrder,
										"elementMapId": "",
										"clientUid": clientID,
										"clientClass": "AddImage",
										"imageTempId": " ",
										"imageTempUrl": "",
										"elementType": "QuestionType",
										// elementArributuesProp: elementAttrPropArray,
										"isDeleted": "no"
								};
								var elementObj = {
										element: elementDetailsAr
								};
								elementDetailsAr.push(elementDetailObj);

								elementsAr.push(elementObj);
							}
						}
						else{
							quesFlag = 1;
						}
					}
				});
				$(this).find('.ans').each(function() {
					indexForAnswer++;
					var elementOrder = new Array();
					var eleOrder=0;
					var k=0;
					var eleName=0;
					quesTemp++;
					var idOfElement=new Array();
					var indexOfOrder=0;
					var status= $(".ans").eq(indexForAnswer).find("div").eq(1).attr("status");
					if(status=="new"){
						var ID=$(".ans").eq(indexForAnswer).find("div").eq(1).attr("id");
						if($("#"+ID).children().size() >0){
							for(var i=0;i<$("#"+ID).children().size();i++){
								idOfElement.push($("#"+ID).children().find('div').eq(eleName).attr('id'));
								var nameOfElementArr=$("#"+ID).children().find('div').eq(eleName).attr('id').split("_");
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
								eleName=eleName+3;
							}
						}else{
							ansFlag = 1;
						}
					}else{
						var ID=$(".ans").eq(indexForAnswer).find("div").eq(1).attr("id");
						if($("#"+ID).children().size() >0){
							for(var i=0;i<$("#"+ID).children().size();i++){
								idOfElement.push($("#"+ID).children().find('div').eq(k).attr('id'));
								var nameOfElementArr=$("#"+ID).children().find('div').eq(k).attr('id').split("_");
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
								k=k+3;
							}
						}
						else{
							ansFlag = 1;
						}
					}
					elementPropertiesRuleJson(elementOrder,clientID,eleOrder,idOfElement,indexOfOrder,elementsAr);
				});
				var questionObj = { questionAnswerElement: questionAr };
				questionAr.push(questionDetailsObj);
				quesListAr.push(questionObj);
				quesElementsAr.push(quesListAr);
				quesAnsIndex++;
				quesIDCount++;
			});
			stepobj = { stepElement : stepElementsAr };
			stepElementAr.push(stepobj);
			stepElementsAr.push(stepElementObj);
		});
		sectionListAr.push(sectionObj);
		sectionElementAr.push(sectionEleAr);
	});
	return sectionElementAr;
}