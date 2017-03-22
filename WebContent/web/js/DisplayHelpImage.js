var seqNoFormImages = 0;
var seqNoSectionImages =0;
var seqNoStepImages=0;
var seqNoQuestionImages=0;
/*************Display Form Level Help Images*********************/
$(document).on("click",".formIconHelpImage",function(e){
	//var clickSectHelp=this.id.replace('sectionID_','');
	//var status=$("#"+this.id).attr("status");
	//var sect=$("#"+this.id).attr("sect");
	showHelpFormImage();
	
});
function showHelpFormImage() {
	deleteFormImage=[];
	deleteFormImageFlag=0;
	var id = 1;
	if(editFormFLag==1){
		if(formArr.length > 0){
		}
		else{
			var image_obj={
					formId:frmID,
					associationId:frmID,
					helpTextLevel:"Form"
			};
			var json=$.toJSON(image_obj);
			var serverbaseUrl = getServerPath();
			var url_image=serverbaseUrl+"downloadhelpimages";
			callDownloadService(url_image,json, function(data) {
				if(data.resultSet.helpDescription==null){
					data.resultSet.helpDescription="";
				}
				var secObj = {
						labelDescription: data.resultSet.helpDescription
				};
				var baseArr = new Array();
				var baseObj = new Object();
				savingBase64(data,baseObj);
				baseArr.push(baseObj);
				secObj.baseArr = baseArr;
				formArr.push(secObj);
				for (var k = 0; k < formArr.length; k++) {
					$("#labelDescForm_").text(formArr[k].labelDescription);
				}
				formImageShow(id);
				stopLoader();
			});
		}
	}
	$("#helpPopup").modal();
	$("#formHelp").html('');
	var html = "";
	html += "<div class=\"addImgMainDiv\" >";
	html += "<div style\"background-color: white;\" class=\"addImg\"><a href=\"#\" id=\"img_input_form_help\" class=\"img_input_form_help\"><img src=\"images/icon_addImage.jpg\" />  Add Image</a>";
	html += "	<a rel=\"tooltip\" title=\"Maximum 5 Images\" class=\"infoIcon\"><i class=\"icon-info-sign\"></i></a></div></div>";
	html += "<img id=\"trialImg\" src=\"\" style=\"display: none\" /> <input type=\"file\"  id=\"file1_form_help\"\ name=\"file1\" style=\"display: none;\" /><div id=\"addFormImage_\" class=\"addImagesDynamic\"></div>	";
	$("#formHelp").append(html);
	if (formArr.length > 0) {
		formImageShow(id);
	}
	var html2 = "";
	$("#formLabel").html('');
	html2 += "<textarea cols=\"35\" rows=\"10\" id=\"labelDescForm_\"></textarea>";
	$("#formLabel").append(html2);
	for (var k = 0; k < formArr.length; k++) {
		$("#labelDescForm_").text(formArr[k].labelDescription);
	}
	$("#formFooter").html('');
	var html1 = "";
	html1 += "<button type=\"button\" id=\"saveBtnForm\" class=\"btn btn-primary saveBtnForm\">Save</button>";
	html1 += "<button type=\"button\" data-dismiss=\"modal\" class=\"btn btnCancel\">Cancel</button>";
	$("#formFooter").append(html1);
}

/*************Display Section Level Help Images*********************/
$(document).on("click",".sectIconHelpImage",function(e){
	var clickSectHelp=this.id.replace('sectionID_','');
	var status=$("#"+this.id).attr("status");
	var sect=$("#"+this.id).attr("sect");
	showHelpSectionImage(clickSectHelp,status,sect);
	
});
function showHelpSectionImage(clickSectHelp,status,sect) {
	seqNoSectionImages=0;
	deleteSectionImage=[];
	deleteSectionImageFlag=0;
	//var clickSectHelp = "";
	//clickSectHelp = ($(clickedElement).attr("data-Sect-Count"));
	//var sect=$(clickedElement).attr("data-org");
	$("#sectHelp").html('');
	$("#helpSectionPopup").modal();
	var html = "";
	html += "<div class=\"addImgMainDiv\" >";
	html += "<div class=\" addImg\"><a href=\"#\" id=\"img_input_section_help" + clickSectHelp + "\" class=\"img_input_section_help\"><img src=\"images/icon_addImage.jpg\" />  Add Image</a>";
	html += "	<a rel=\"tooltip\" title=\"Maximum 5 Images\" class=\"infoIcon\"><i class=\"icon-info-sign\"></i></a></div></div>";
	html += "<img id=\"trialImg\" src=\"\" style=\"display: none\" /> <input type=\"file\"  id=\"file1_section_help" + clickSectHelp + "\" name=\"file1\" style=\"display: none;\" /><div id=\"addSectionImage_" + clickSectHelp + "\" class=\"addImagesDynamic\"></div>	";
	$("#sectHelp").append(html);
	var id = 1;
	//var status=$(clickedElement).attr("status");
	if(editFormFLag==1){
		if(secArr.length>0){
			var flag_=0;
			for(var i=0;i<secArr.length;i++){
				if(secArr[i].id_==clickSectHelp){
					flag_=1;
				}
			}
			if(status=="present"){
				if(flag_==1){
				}else{
					sectionDownloadJson(sect,"Section",clickSectHelp);
				}
			}
		}
		else{
			if(status=="present"){
				sectionDownloadJson(sect,"Section",clickSectHelp);
			}
		}
	}
	if(secArr.length>0){
		sectionImageShow(clickSectHelp,id);
	}
	seqNoSectionImages=$('#addSectionImage_' + clickSectHelp).children().size();
	var html2 = "";
	$("#sectLabel").html('');
	html2 += "<textarea cols=\"35\" rows=\"10\" id=\"labelDesc_" + clickSectHelp + "\"></textarea>";
	$("#sectLabel").append(html2);
	for (var k = 0; k < secArr.length; k++) {
		if (secArr[k].id_ == clickSectHelp) {
			$("#labelDesc_" + clickSectHelp).text(secArr[k].labelDescription);
		}
	}
	$("#sectFooter").html('');
	var html1 = "";
	html1 += "<button type=\"button\" id=\"saveBtn_" + clickSectHelp + "\" sect-org-id='" + sect + "' status='" + status + "' class=\"btn btn-primary saveBtnSection\">Save</button>";
	html1 += "<button type=\"button\" data-dismiss=\"modal\" class=\"btn btnCancel\">Cancel</button>";
	$("#sectFooter").append(html1);
}

/*************Display Step Level Help Images*********************/
$(document).on("click",".stepIconHelpImage",function(e){
	var labelID=$("#"+this.id).attr("data-stepTemp");
	var clickStepHelp=$("#"+this.id).attr("step");
	var status=$("#"+this.id).attr("status");
	var sectionID=$("#"+this.id).attr("sect");
	var step=$("#"+this.id).attr("data-step-plus");
	showHelpStepImage(clickStepHelp,sectionID,status,labelID,step);
	
});
function showHelpStepImage(clickStepHelp,sectionID,status,labelID,step){
	seqNoStepImages=0;
	deleteStepImage=[];
	deleteStepImageFlag=0;
	//var clickStepHelp = "";
	//clickStepHelp = ($(clickedElement).attr("data-Step-Count"));
	//var labelID=($(clickedElement).attr("data-StepTemp-Count"));
	//var sectionID=$(clickedElement).attr("data-Sect-Count");
	//var step=$(clickedElement).attr("data-step-plus");
	var id = 1;
	$("#helpStepPopup").modal();
	$("#stepHelp").html('');
	var html = "";
	html += "<div class=\"addImgMainDiv\" >";
	html += "<div class=\" addImg\"><a href=\"#\" id=\"img_input_step_help" + clickStepHelp + "\"  data-tempstep='" + labelID + "'  data-sect='" + sectionID + "' class=\"img_input_step_help\"><img src=\"images/icon_addImage.jpg\" />  Add Image</a>";
	html += "	<a rel=\"tooltip\" title=\"Maximum 5 Images\" class=\"infoIcon\"><i class=\"icon-info-sign\"></i></a></div></div>";
	html += "<img id=\"trialImg\" src=\"\" style=\"display: none\" /> <input type=\"file\"  id=\"file1_step_help" + clickStepHelp + "\" name=\"file1\" style=\"display: none;\" /><div id=\"addStepImage_" + clickStepHelp + "\" class=\"addImagesDynamic\"></div>	";
	$("#stepHelp").append(html);
	//var status=$(clickedElement).attr("status");
	if(editFormFLag==1){
		if(stepArr.length>0){
			var flag_=0;
			for(var i=0;i<stepArr.length;i++){
				if(stepArr[i].sectionID==sectionID){
					if(stepArr[i].id_==clickStepHelp){
						flag_=1;
					}
				}
			}
			if(status=="present"){
				if(flag_==1){

				}else{
					stepDownloadJson(step,sectionID,labelID,"Step",clickStepHelp);
				}
			}
		}	
		else{
			if(status=="present"){
				stepDownloadJson(step,sectionID,labelID,"Step",clickStepHelp);
			}
		}
	}
	if(stepArr.length>0){
		stepImageShow(clickStepHelp,sectionID,id,labelID);
	}
	seqNoStepImages=$('#addStepImage_' + clickStepHelp).children().size();
	var html2 = "";
	$("#stepLabel").html('');
	html2 += "<textarea cols=\"35\" rows=\"10\" id=\"labelDesc1_" + labelID + "\"></textarea>";
	$("#stepLabel").append(html2);
	for (var k = 0; k < stepArr.length; k++) {
		if (stepArr[k].sectionID == sectionID) {
			if (stepArr[k].id_ == clickStepHelp) {
				$("#labelDesc1_" + labelID).text(stepArr[k].labelDescription);
			}
		}
	}
	$("#stepFooter").html('');
	var html1 = "";
	html1 += "<button type=\"button\" id=\"saveStepBtn_" + clickStepHelp + "\"  step-org-id='" + step + "' status='" + status + "' data-sect='" + sectionID + "' data-step='" + labelID + "' class=\"btn btn-primary saveBtnStep\">Save</button>";
	html1 += "<button type=\"button\" data-dismiss=\"modal\" class=\"btn btnCancel\">Cancel</button>";
	$("#stepFooter").append(html1);
}

/*************Display Question Level Help Images*********************/
$(document).on("click",".quesIconHelpImage",function(e){
	var labelID=this.id.replace('quesID_','');
	var clickQuesHelp=$("#"+this.id).attr("ques");
	var status=$("#"+this.id).attr("status");
	var sectionID=$("#"+this.id).attr("sect");
	var stepID=$("#"+this.id).attr("step");
	var ques=$("#"+this.id).attr("data-QuesServer-Count");
	showHelpQuesImage(clickQuesHelp,sectionID,stepID,labelID,status,ques);
	
});
function showHelpQuesImage(clickQuesHelp,sectionID,stepID,labelID,status,ques) {
	seqNoQuestionImages=0;
	deleteQuesImageFlag=0;
	deleteQuesImage=[];
	//var clickQuesHelp = "";
	//clickQuesHelp = ($(clickedElement).attr("data-Ques-Count"));
	//var sectionID= $(clickedElement).attr("data-Sect-Count");
	//var stepID=$(clickedElement).attr("data-Step-Count");
	///var labelID= $(clickedElement).attr("data-QuesTemp-Count");
	//var ques=$(clickedElement).attr("data-QuesServer-Count");
	$("#helpQuesPopup").modal();
	var id = 1;
	$("#quesHelp").html('');
	var html = "";
	html += "<div class=\"addImgMainDiv\" >";
	html += "<div class=\"addImg\"><a href=\"#\" id=\"img_input_ques_help" + clickQuesHelp + "\" class=\"img_input_ques_help\" data-Sect='" +sectionID+ "'  data-Step='" +stepID + "' data-tempques='" +labelID + "'><img src=\"images/icon_addImage.jpg\" />  Add Image</a>";
	html += "	<a rel=\"tooltip\" title=\"Maximum 5 Images\" class=\"infoIcon\"><i class=\"icon-info-sign\"></i></a></div></div>";
	html += "<img id=\"trialImg\" src=\"\" style=\"display: none\" /> <input type=\"file\"  id=\"file1_ques_help" + clickQuesHelp + "\" name=\"file1\" style=\"display: none;\" /><div id=\"addQuesImage_" + clickQuesHelp + "\" class=\"addImagesDynamic\"></div>	";
	$("#quesHelp").append(html);
	//var status=$(clickedElement).attr("status");
	if(editFormFLag==1){
		if(quesArr.length>0){
			var flag_=0;
			
			for(var i=0;i<quesArr.length;i++){
				if (quesArr[i].sectionID == sectionID) {
					if (quesArr[i].stepID ==stepID) {
						if (quesArr[i].id_ == clickQuesHelp) {
							flag_=1;
						}
					}
				}
			}
			if(status=="present"){
				if(flag_==1){
				}else{
					quesDownloadJson(ques,sectionID,stepID,labelID,"Question",clickQuesHelp);
				}
			}
		}	
		else{
		
			if(status=="present"){
				quesDownloadJson(ques,sectionID,stepID,labelID,"Question",clickQuesHelp);	
			}
		}
	}
	if(quesArr.length>0){
		questionImageShow(clickQuesHelp,sectionID,stepID,id,labelID);
	}
	seqNoQuestionImages=$('#addQuesImage_' + clickQuesHelp).children().size();
	var html2 = "";
	$("#quesLabel").html('');
	html2 += "<textarea cols=\"35\" rows=\"10\" id=\"labelDescQues_" + labelID+ "\"></textarea>";
	$("#quesLabel").append(html2);
	for (var k = 0; k < quesArr.length; k++) {
		if (quesArr[k].sectionID == sectionID) {
			if (quesArr[k].stepID == stepID) {
				if (quesArr[k].id_ == clickQuesHelp) {
					$("#labelDescQues_" +labelID).text(quesArr[k].labelDescription);
				}
			}
		}
	}
	$("#quesFooter").html('');
	var html1 = "";
	html1 += "<button type=\"button\" id=\"saveQuesBtn_" + clickQuesHelp + "\"  ques-org-id='" + ques + "' status='" + status + "' data-sect='" + sectionID + "' data-step='" + stepID + "' data-ques='" + labelID + "' class=\"btn btn-primary saveBtnQues\">Save</button>";
	html1 += "<button type=\"button\" data-dismiss=\"modal\" class=\"btn btnCancel\">Cancel</button>";
	$("#quesFooter").append(html1);
}
function formImageShow(id){
	for (var k = 0; k < formArr.length; k++) {
		if (formArr[k].baseArr[0].image1 == undefined || formArr[k].baseArr[0].image1 == null){
		} else {
			$("#addFormImage_").append("<div class=\"imgDimensions\" id=\"image_" + id + "\" ><img src=\"data:image/png;base64," + formArr[k].baseArr[0].image1 + "\"  id=\"idForm_" + 1 + "\"/><i class=\"icon-trash delImageForm\" id=\"delForm_" + 1 + "\" ></i></div>");
		}
		if (formArr[k].baseArr[0].image2 == undefined || formArr[k].baseArr[0].image2 == "" || formArr[k].baseArr[0].image2 == null){
		} else {
			$("#addFormImage_").append("<div class=\"imgDimensions\" id=\"image_" + id + "\" ><img src=\"data:image/png;base64," + formArr[k].baseArr[0].image2 + "\"  id=\"idForm_" + 2+ "\" /><i class=\'icon-trash delImageForm\' id=\"delForm_" + 2 + "\" ></i></div>");
		}
		if (formArr[k].baseArr[0].image3 == undefined || formArr[k].baseArr[0].image3 == null){
		} else {
			$("#addFormImage_").append("<div class=\"imgDimensions\" id=\"image_" + id + "\" ><img src=\"data:image/png;base64," + formArr[k].baseArr[0].image3 + "\" id=\"idForm_" + 3+ "\" /><i class=\'icon-trash delImageForm\' id=\"delForm_" + 3 + "\" ></i></div>");
		}
		if (formArr[k].baseArr[0].image4 == undefined || formArr[k].baseArr[0].image4 == null){
		} else {
			$("#addFormImage_").append("<div class=\"imgDimensions\" id=\"image_" + id + "\" ><img src=\"data:image/png;base64," + formArr[k].baseArr[0].image4 + "\" id=\"idForm_" + 4+ "\" /><i class=\'icon-trash delImageForm\' id=\"delForm_" + 4 + "\" ></i></div>");
		}
		if (formArr[k].baseArr[0].image5 == undefined || formArr[k].baseArr[0].image5 == null){
		} else {
			$("#addFormImage_").append("<div class=\"imgDimensions\" id=\"image_" + id + "\" ><img src=\"data:image/png;base64," + formArr[k].baseArr[0].image5 + "\" id=\"idForm_" + 5+ "\" /><i class=\'icon-trash delImageForm\' id=\"delForm_" + 5 + "\" ></i></div>");
		}
	}
}
function sectionImageShow(clickSectHelp,id){
	for (var k = 0; k < secArr.length; k++) {
		if (secArr[k].id_ == clickSectHelp) {
			if (secArr[k].baseArr[0].image1 == undefined || secArr[k].baseArr[0].image1 == null){
			} else {
				$("#addSectionImage_" + clickSectHelp).append("<div class=\"imgDimensions\" id=\"image_" + id + "\" ><img src=\"data:image/png;base64," + secArr[k].baseArr[0].image1 + "\" /><i class=\'icon-trash delImageSect\' id=\"delSect_" + 1 + "\" data-Sect='" + clickSectHelp + "' ></i></div>");
			}
			if (secArr[k].baseArr[0].image2 == undefined || secArr[k].baseArr[0].image2 == null){
			} else {
				$("#addSectionImage_" + clickSectHelp).append("<div class=\"imgDimensions\" id=\"image_" + id + "\" ><img src=\"data:image/png;base64," + secArr[k].baseArr[0].image2 + "\" /><i class=\'icon-trash delImageSect\' id=\"delSect_" + 2 + "\" data-Sect='" + clickSectHelp + "' ></i></div>");
			}
			if (secArr[k].baseArr[0].image3 == undefined || secArr[k].baseArr[0].image3 == null){
			} else {
				$("#addSectionImage_" + clickSectHelp).append("<div class=\"imgDimensions\" id=\"image_" + id + "\" ><img src=\"data:image/png;base64," + secArr[k].baseArr[0].image3 + "\" /><i class=\'icon-trash delImageSect\' id=\"delSect_" + 3 + "\" data-Sect='" + clickSectHelp + "' ></i></div>");
			}
			if (secArr[k].baseArr[0].image4 == undefined || secArr[k].baseArr[0].image4 == null){
			} else {
				$("#addSectionImage_" + clickSectHelp).append("<div class=\"imgDimensions\" id=\"image_" + id + "\" ><img src=\"data:image/png;base64," + secArr[k].baseArr[0].image4 + "\" /><i class=\'icon-trash delImageSect\' id=\"delSect_" + 4 + "\" data-Sect='" + clickSectHelp + "' ></i></div>");
			}
			if (secArr[k].baseArr[0].image5 == undefined || secArr[k].baseArr[0].image5 == null){
			} else {
				$("#addSectionImage_" + clickSectHelp).append("<div class=\"imgDimensions\" id=\"image_" + id + "\" ><img src=\"data:image/png;base64," + secArr[k].baseArr[0].image5 + "\" /><i class=\'icon-trash delImageSect\' id=\"delSect_" + 5 + "\" data-Sect='" + clickSectHelp + "' ></i></div>");
			}
		}
	}
}
function stepImageShow(clickStepHelp,sectionID,id,labelID){
	for (var k = 0; k < stepArr.length; k++) {
		if (stepArr[k].sectionID == sectionID) {
			if (stepArr[k].id_ == clickStepHelp) {
				if (stepArr[k].baseArr[0].image1 == undefined || stepArr[k].baseArr[0].image1 == null){
				} else {
					$("#addStepImage_" + clickStepHelp).append("<div class=\"imgDimensions\" id=\"image_" + id + "\" ><img src=\"data:image/png;base64," + stepArr[k].baseArr[0].image1 + "\" /><i  class=\'icon-trash delImageStep\' id=\"delStep_" + 1 + "\" data-Sect='" + sectionID + "' data-Step='" + clickStepHelp + "' data-tempstep='" + labelID + "'></i></div>");
				}
				if (stepArr[k].baseArr[0].image2 == undefined || stepArr[k].baseArr[0].image2 == null){
				} else {
					$("#addStepImage_" + clickStepHelp).append("<div class=\"imgDimensions\" id=\"image_" + id + "\" ><img src=\"data:image/png;base64," + stepArr[k].baseArr[0].image2 + "\" /><i class=\'icon-trash delImageStep\' id=\"delStep_" + 2 + "\" data-Sect='" + sectionID + "' data-Step='" + clickStepHelp + "' data-tempstep='" + labelID + "'></i></div>");
				}
				if (stepArr[k].baseArr[0].image3 == undefined || stepArr[k].baseArr[0].image3 == null){
				} else {
					$("#addStepImage_" + clickStepHelp).append("<div class=\"imgDimensions\" id=\"image_" + id + "\" ><img src=\"data:image/png;base64," + stepArr[k].baseArr[0].image3 + "\" /><i class=\'icon-trash delImageStep\' id=\"delStep_" + 3 + "\" data-Sect='" + sectionID + "' data-Step='" + clickStepHelp + "' data-tempstep='" + labelID + "'></i></div>");
				}
				if (stepArr[k].baseArr[0].image4 == undefined || stepArr[k].baseArr[0].image4 == null){
				} else {
					$("#addStepImage_" + clickStepHelp).append("<div class=\"imgDimensions\" id=\"image_" + id + "\" ><img src=\"data:image/png;base64," + stepArr[k].baseArr[0].image4 + "\" /><i class=\'icon-trash delImageStep\' id=\"delStep_" + 4 + "\" data-Sect='" + sectionID + "' data-Step='" + clickStepHelp + "' data-tempstep='" + labelID + "'></i></div>");
				}
				if (stepArr[k].baseArr[0].image5 == undefined || stepArr[k].baseArr[0].image5 == null){
				} else {
					$("#addStepImage_" + clickStepHelp).append("<div class=\"imgDimensions\" id=\"image_" + id + "\" ><img src=\"data:image/png;base64," + stepArr[k].baseArr[0].image5 + "\" /><i class=\'icon-trash delImageStep\' id=\"delStep_" + 5 + "\" data-Sect='" + sectionID + "' data-Step='" + clickStepHelp + "' data-tempstep='" + labelID + "'></i></div>");
				}
			}
		}
	}
}
function questionImageShow(clickQuesHelp,sectionID,stepID,id,labelID){
	for (var k = 0; k < quesArr.length; k++) {
		if (quesArr[k].sectionID == sectionID) {
			if (quesArr[k].stepID ==stepID) {
				if (quesArr[k].id_ == clickQuesHelp) {
					if (quesArr[k].baseArr[0].image1 == undefined || quesArr[k].baseArr[0].image1 == null){
					} else {
						$("#addQuesImage_" + clickQuesHelp).append("<div class=\"imgDimensions\" id=\"image_" + id + "\" ><img src=\"data:image/png;base64," + quesArr[k].baseArr[0].image1 + "\" /><i class=\'icon-trash delImageQues\' id=\"delQues_" + 1 + "\"  data-Sect='" +sectionID+ "'  data-Step='" +stepID + "' data-Ques='" +clickQuesHelp + "'  data-tempQues='" +labelID + "'></i></div>");
					}
					if (quesArr[k].baseArr[0].image2 == undefined || quesArr[k].baseArr[0].image2 == null){
					} else {
						$("#addQuesImage_" + clickQuesHelp).append("<div class=\"imgDimensions\" id=\"image_" + id + "\" ><img src=\"data:image/png;base64," + quesArr[k].baseArr[0].image2 + "\" /><i class=\'icon-trash delImageQues\' id=\"delQues_" + 2 + "\" data-Sect='" +sectionID + "' data-Step='" +stepID + "' data-Ques='" +clickQuesHelp + "' data-tempQues='" +labelID + "'></i></div>");
					}
					if (quesArr[k].baseArr[0].image3 == undefined || quesArr[k].baseArr[0].image3 == null){
					} else {
						$("#addQuesImage_" + clickQuesHelp).append("<div class=\"imgDimensions\" id=\"image_" + id + "\" ><img src=\"data:image/png;base64," + quesArr[k].baseArr[0].image3 + "\" /><i class=\'icon-trash delImageQues\' id=\"delQues_" + 3 + "\"  data-Sect='" +sectionID+ "' data-Step='" +stepID + "' data-Ques='" +clickQuesHelp + "' data-tempQues='" +labelID + "'></i></div>");
					}
					if (quesArr[k].baseArr[0].image4 == undefined || quesArr[k].baseArr[0].image4 == null){
					} else {
						$("#addQuesImage_" + clickQuesHelp).append("<div class=\"imgDimensions\" id=\"image_" + id + "\" ><img src=\"data:image/png;base64," + quesArr[k].baseArr[0].image4 + "\" /><i class=\'icon-trash delImageQues\' id=\"delQues_" + 4 + "\"  data-Sect='" +sectionID + "' data-Step='" +stepID+ "' data-Ques='" +clickQuesHelp + "' data-tempQues='" +labelID + "'></i></div>");
					}
					if (quesArr[k].baseArr[0].image5 == undefined || quesArr[k].baseArr[0].image5 == null){
					} else {
						$("#addQuesImage_" + clickQuesHelp).append("<div class=\"imgDimensions\" id=\"image_" + id + "\" ><img src=\"data:image/png;base64," + quesArr[k].baseArr[0].image5 + "\" /><i class=\'icon-trash delImageQues\' id=\"delQues_" + 5 + "\"  data-Sect='" +sectionID+ "' data-Step='" +stepID + "' data-Ques='" +clickQuesHelp + "' data-tempQues='" +labelID + "'></i></div>");
					}
				}
			}
		}
	}
}
function sectionDownloadJson(clickSectHelp,level,tempSect){
	var image_obj={
			formId:frmID,
			associationId:clickSectHelp,
			helpTextLevel:level
	};
	var json=$.toJSON(image_obj);
	var serverbaseUrl = getServerPath();
	var url_image=serverbaseUrl+"downloadhelpimages";
	callDownloadService(url_image,json, function(data) {
		var secObj = {
				id_: tempSect,
				labelDescription: data.resultSet.helpDescription
		};
		var baseArr = new Array();
		var baseObj = new Object();
		savingBase64(data,baseObj);
		baseArr.push(baseObj);
		secObj.baseArr = baseArr;
		secArr.push(secObj);
		sectionImageShow(tempSect,1);
		seqNoSectionImages=$('#addSectionImage_' + tempSect).children().size();
		for (var k = 0; k < secArr.length; k++) {
			if (secArr[k].id_ == tempSect) {
				$("#labelDesc_" + tempSect).text(secArr[k].labelDescription);
			}
		}
	});
}
function stepDownloadJson(clickStepHelp,sectionID,labelID,level,step){
	var image_obj={
			formId:frmID,
			associationId:clickStepHelp,
			helpTextLevel:level
	};
	var json=$.toJSON(image_obj);
	var serverbaseUrl = getServerPath();
	var url_image=serverbaseUrl+"downloadhelpimages";
	callDownloadService(url_image,json, function(data) {
		var secObj = {
				sectionID: sectionID,
				id_: step,
				tempstep:labelID,
				labelDescription:  data.resultSet.helpDescription
		};
		var baseArr = new Array();
		var baseObj = new Object();
		savingBase64(data,baseObj);
		baseArr.push(baseObj);
		secObj.baseArr = baseArr;
		stepArr.push(secObj);
		stepImageShow(step,sectionID,1,labelID);
		seqNoStepImages=$('#addStepImage_' + clickStepHelp).children().size(); 
		for (var k = 0; k < stepArr.length; k++) {
			if (stepArr[k].sectionID == sectionID) {
				if (stepArr[k].id_ == step) {
					$("#labelDesc1_" + labelID).text(stepArr[k].labelDescription);
				}
			}
		}
	});
}
function quesDownloadJson(clickQuesHelp,sectionID,stepID,labelID,level,ques){
	var image_obj={
			formId:frmID,
			associationId:clickQuesHelp,
			helpTextLevel:level
	};
	var json=$.toJSON(image_obj);
	var serverbaseUrl = getServerPath();
	var url_image=serverbaseUrl+"downloadhelpimages";
	callDownloadService(url_image,json, function(data) {
		var secObj = {
				sectionID:sectionID,
				stepID: stepID,
				id_: ques,
				tempQuesId:labelID,
				labelDescription:  data.resultSet.helpDescription
		};
		var baseArr = new Array();
		var baseObj = new Object();
		savingBase64(data,baseObj);
		baseArr.push(baseObj);
		secObj.baseArr = baseArr;
		quesArr.push(secObj);
		questionImageShow(ques,sectionID,stepID,1,labelID);
		for (var k = 0; k < quesArr.length; k++) {
			if (quesArr[k].sectionID == sectionID) {
				if (quesArr[k].stepID == stepID) {
					if (quesArr[k].id_ == ques) {
						$("#labelDescQues_" + labelID).text(quesArr[k].labelDescription);
					}
				}
			}
		}
	});
}
function savingBase64(data,baseObj){
	for (var k = 0; k < data.resultSet.images.length; k++) {
		if (k == 0) {
			baseObj.image1 =  data.resultSet.images[k];
		}
		if (k == 1) {
			baseObj.image2 = data.resultSet.images[k];
		}
		if (k == 2) {
			baseObj.image3 =data.resultSet.images[k];
		}
		if (k == 3) {
			baseObj.image4 = data.resultSet.images[k];
		}
		if (k == 4) {
			baseObj.image5 =data.resultSet.images[k];
		}
	}
}
function stopLoader(){
	stopiLoaderSpiner();
	$('.container').css({'opacity': '1','z-index': '0'});
	$('.modal-backdrop.fade.in').css({'z-index': '0'});
}