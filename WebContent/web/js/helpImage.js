var labelEditFormFlag=0;
var labelEditSectionArr=new Array();
var labelEditStepArr=new Array();
var labelEditQuesArr=new Array();
var secArr = new Array();
var stepArr = new Array();
var quesArr = new Array();
var formArr = new Array();
/*************Saving of Form Level Help Images*********************/
$(document).on('click', '.saveBtnForm', function() {
	var imageJsonNew =new Array();
	var imageArray = new Array();
	var uploadFormFlag=0;
	$("#helpPopup *").attr("disabled", "disabled").off('click');
	$(".delImageForm").prop('disabled', true);
	var labelEditFlag="add";
	var label = (document.getElementById('labelDescForm_').value);
	var templabel="";
	if(formArr.length>0){
		templabel=formArr[0].labelDescription;
	}
	if(labelEditFormFlag==1){
		labelEditFlag="update";
	}
	var secObj = {
			labelDescription: label
	};
	var len_=0;
	if(deleteFormImageFlag==1){
		var random=new Date().getTime();
		var formID=1;
		if(editFormFLag==1){
			formID=frmID;
		}
		for(var i=0;i<deleteFormImage.length;i++){
			seqNoFormImages--;	
			var image_Obj = {
					"operation": "delete",
					sequanceNo: deleteFormImage[i],
					formId: formID,
					associationId:random,
					"userSSOId":ssoId,
					imageData: "",					
					helpTextLevel: "Form",
					formStatus: baseFormId ? "14" : "11" 
			};
			imageJsonNew.push(image_Obj);
			var imageJson = $.toJSON(image_Obj);
			imageArray.push(imageJson);
		}
		deleteFormImageFlag=0;	
	}
	if(formArr.length>0){
		var lengthOFImagesAtForm=0;
		lengthOFImagesAtForm=$('#addFormImage_').children().size();
		len_=Object.keys(formArr[0].baseArr[0]).length;
		if(lengthOFImagesAtForm==len_){
			uploadFormFlag=1;
			if(addImFormFlag==0){}
			else{
				len_=(addImFormFlag.split("_")[1])-1;
				uploadFormFlag=0;
			}
		}
		else{
			uploadFormFlag=0;
		}
	}
	var baseArr = new Array();
	var baseObj = new Object();
	formArr=[];
	for (var k = 0; k < $('#addFormImage_').children().size(); k++) {
		var id_=$('#addFormImage_');
		ImageButtonSave(k,baseObj,id_);
	}
	baseArr.push(baseObj);
	secObj.baseArr = baseArr;
	formArr.push(secObj);
	var random=new Date().getTime();
	var formID=1;
	if(editFormFLag==1){
		formID=frmID;
		labelEditFlag="update";
	}
	if(uploadFormFlag==0){
		addImFormFlag=0;
		for (var i = 0; i < formArr.length; i++) {
			var len=Object.keys(formArr[i].baseArr[0]).length;
			for(var s=len_;s<len;s++){
				seqNoFormImages++;
				var imData="";
				imData=savingOfBase64(imData,s,formArr,i);
				var operation="add";
				var seq=seqNoFormImages;
				var level="Form";
				creatingImageObject(operation,seq,formID,random,ssoId,imData,level,imageJsonNew,imageArray);
			}
		}
	}
	var obj={
			helpDescription: label,
			imageDescFlag: labelEditFlag,
	};
	obj.imagesList =imageJsonNew;
	var json=$.toJSON(obj);
	var serverbaseUrl = getServerPath();
	var url_image = serverbaseUrl + "uploadhelpimages";
	if(imageArray.length>0){
		image_post(url_image,json,function(data) {
			if($(".CLName_innerDiv").find('a').eq(1).length==0){
				$(".CLName_innerDiv").append('<a rel="tooltip"  title="Help"  class="formIconHelpImage" id><img  style="margin-left:-59px;" src="images/help.png"></a> ');
			}
			labelEditFormFlag=1;
		});
	}
	else{
		if(templabel==label){
			stopLoader();
			$("#helpPopup").modal('hide');
		}
		else{
			var image_Obj = {
					"operation": "",
					sequanceNo: "",
					formId: formID,
					associationId:random,
					"userSSOId":"",
					imageData: "",					
					helpTextLevel: "Form",
			};
			imageJsonNew.push(image_Obj);
			var obj={
					helpDescription: label,
					imageDescFlag: labelEditFlag,
			};
			obj.imagesList =imageJsonNew;
			var json=$.toJSON(obj);
			var serverbaseUrl = getServerPath();
			var url_image = serverbaseUrl + "uploadhelpimages";
			labelEditFormFlag=1;
			image_post(url_image,json,function(data) {	
				if($(",CLName_innerDiv").find('a').eq(1).length==0){
					$(".CLName_innerDiv").append('<a rel="tooltip"  title="Help"  class="formIconHelpImage" id><img  style="margin-left:-59px;" src="images/help.png"></a> ');
				}
			});
			stopLoader();
			$("#helpPopup").modal('hide');
		}
	}
});

/*************Saving of Section Level Help Images*********************/
$(document).on('click', '.saveBtnSection', function() {
	$("#helpSectionPopup *").attr("disabled", "disabled").off('click');
	$(".delImageSect").prop('disabled', true);
	var imageJsonNew =new Array();
	var imageArray = new Array();
	var uploadSectionFlag=0;
	var secId = this.id;
	var id = secId.replace('saveBtn_', '');
	var labelEditFlag="add";
	var len_=0;
	var label = (document.getElementById('labelDesc_' + id).value);
	var templabel="";
	if(secArr.length>0){
		for(var i=0;i<secArr.length;i++){
			if(secArr[i].id_==id){
				templabel=secArr[i].labelDescription;
			}
		}
	}
	if(labelEditSectionArr.length>0){
		for(var i=0;i<labelEditSectionArr.length;i++){
			if(labelEditSectionArr[i]==id){
				labelEditFlag="update";
			}
		}	
	}
	if(deleteSectionImageFlag==1){
		var random=0;
		var formID=1;
		if(editFormFLag==1){
			formID=frmID;
			if($("#saveBtn_"+id).attr("status")=="present"){
				random=$("#saveBtn_"+id).attr("sect-org-id");
			}
			else{
				if(sessionStorage.getItem('section_' + id)=="null" || sessionStorage.getItem('section_' + id)==null){
					random=new Date().getTime();
					sessionStorage.setItem("section_" + id, random);
				}
				else{
					random=sessionStorage.getItem('section_' + id);
				}
			}
		}
		else{
			if(sessionStorage.getItem('section_' + id)=="null" || sessionStorage.getItem('section_' + id)==null){
				random=new Date().getTime();
				sessionStorage.setItem("section_" + id, random);
			}
			else{
				random=sessionStorage.getItem('section_' + id);
			}
		}
		for(var i=0;i<deleteSectionImage.length;i++){
			seqNoSectionImages--;
			var image_Obj = {
					"operation": "delete",
					sequanceNo: deleteSectionImage[i],
					formId: formID,
					associationId:random,
					"userSSOId":ssoId,
					imageData: "",					
					helpTextLevel: "Section",
					formStatus: baseFormId ? "14" : "11" 
			};
			imageJsonNew.push(image_Obj);
			var imageJson = $.toJSON(image_Obj);
			imageArray.push(imageJson);
		}
		deleteSectionImageFlag=0;
	}
	var secObj = {
			id_: id,
			labelDescription: label
	};
	if(secArr.length>0){
		for(var i=0;i<secArr.length;i++){
			if(secArr[i].id_==id){
				var lengthOFImagesAtSection=0;
				lengthOFImagesAtSection=$('#addSectionImage_' + id).children().size();
				len_=Object.keys(secArr[i].baseArr[0]).length;
				if(lengthOFImagesAtSection==len_){
					uploadSectionFlag=1;
					if(addImSectionFlag==0){}
					else{
						len_=(addImSectionFlag.split("_")[1])-1;
						uploadSectionFlag=0;
					}
				}
				else{
					uploadSectionFlag=0;
				}
			}
		}
	}
	var baseArr = new Array();
	var baseObj = new Object();
	for(var i=0;i<secArr.length;i++){
		if(secArr[i].id_==id){
			secArr.splice(i,1);
		}
	}
	for (var k = 0; k < $('#addSectionImage_' + id).children().size(); k++) {
		var id_=$('#addSectionImage_' + id);
		ImageButtonSave(k,baseObj,id_);
	}
	baseArr.push(baseObj);
	secObj.baseArr = baseArr;
	secArr.push(secObj);
	var random=0;
	var formID=1;
	if(editFormFLag==1){
		formID=frmID;
		labelEditFlag="update";
		if($("#saveBtn_"+id).attr("status")=="present"){
			random=$("#saveBtn_"+id).attr("sect-org-id");
		}
		else{
			if(sessionStorage.getItem('section_' + id)=="null" || sessionStorage.getItem('section_' + id)==null){
				random=new Date().getTime();
				sessionStorage.setItem("section_" + id, random);
			}
			else{
				random=sessionStorage.getItem('section_' + id);
			}
		}
	}
	else{
		if(sessionStorage.getItem('section_' + id)=="null" || sessionStorage.getItem('section_' + id)==null){
			random=new Date().getTime();
			sessionStorage.setItem("section_" + id, random);
		}
		else{
			random=sessionStorage.getItem('section_' + id);
		}
	}
	if(uploadSectionFlag==0 ){
		addImSectionFlag=0;
		for (var i = 0; i < secArr.length; i++) {
			var secId=secArr[i].id_;
			if(secId==id){
				var len=Object.keys(secArr[i].baseArr[0]).length;
				for(var s=len_;s<len;s++){
					seqNoSectionImages++;
					var imData="";
					imData=savingOfBase64(imData,s,secArr,i);
					var operation="add";
					var seq=seqNoSectionImages;
					var level="Section";
					creatingImageObject(operation,seq,formID,random,ssoId,imData,level,imageJsonNew,imageArray);
				}
			}	
		}
	}
	var obj={
			helpDescription: label,
			imageDescFlag: labelEditFlag,
	};
	obj.imagesList =imageJsonNew;
	var json=$.toJSON(obj);
	var serverbaseUrl = getServerPath();
	var url_image = serverbaseUrl + "uploadhelpimages";
	if(imageArray.length>0){
		labelEditSectionArr.push(id);
		image_post(url_image,json,function(data) {	
			if($("#sectionTab_"+id).find('a').eq(3).length==0){
				$("#sectionTab_"+id).append('<a rel="tooltip"  title="Help"  id="sectionID_'+id+'" sect="'+id+'" status="new"  class="sectIconHelpImage" id><img  style="margin-left:-65px;" src="images/help_2.png"></a> ');
			}
			$("#helpSectionPopup").modal('hide');
		});
	}
	else{
		if(templabel==label){
			stopLoader();
			$("#helpSectionPopup").modal('hide');
		}
		else{
			var image_Obj = {
					"operation": "",
					sequanceNo: "",
					formId: formID,
					associationId:random,
					"userSSOId":"",
					imageData: "",					
					helpTextLevel: "Section",
			};
			imageJsonNew.push(image_Obj);
			var obj={
					helpDescription: label,
					imageDescFlag: labelEditFlag,
			};
			obj.imagesList =imageJsonNew;
			var json=$.toJSON(obj);
			var serverbaseUrl = getServerPath();
			var url_image = serverbaseUrl + "uploadhelpimages";
			labelEditSectionArr.push(id);
			image_post(url_image,json,function(data) {
				if($("#sectionTab_"+id).find('a').eq(3).length==0){
					$("#sectionTab_"+id).append('<a rel="tooltip"  title="Help"  id="sectionID_'+id+'" sect="'+id+'" status="new"  class="sectIconHelpImage" ><img  style="margin-left:-65px;" src="images/help_2.png"></a> ');
				}				
				$("#helpSectionPopup").modal('hide');
			});
		}
	}
});

/*************Saving of Step Level Help Images*********************/
$(document).on('click', '.saveBtnStep', function() {
	$("#helpStepPopup *").attr("disabled", "disabled").off('click');
	$(".delImageStep").prop('disabled', true);
	var imageJsonNew =new Array();
	var imageArray = new Array();
	var secId = this.id;
	var sectID = ($("#" + secId).attr("data-sect"));
	var stepTempID= ($("#" + secId).attr("data-step"));
	var id = secId.replace('saveStepBtn_', '');
	var uploadStepFlag=0;
	var labelEditFlag="add";
	var label = (document.getElementById('labelDesc1_' + stepTempID).value);
	var templabel="";
	if(stepArr.length>0){
		for(var i=0;i<stepArr.length;i++){
			if(stepArr[i].sectionID==sectID){
				if(stepArr[i].id_==id){
					templabel=stepArr[i].labelDescription;
				}
			}
		}
	}
	if(labelEditStepArr.length>0){
		for(var i=0;i<labelEditStepArr.length;i++){
			if(labelEditStepArr[i]==stepTempID){
				labelEditFlag="update";
			}
		}
	}	
	if(deleteStepImageFlag==1){
		var random=0;
		var formID=1;
		if(editFormFLag==1){
			formID=frmID;
			if($("#saveStepBtn_"+id).attr("status")=="present"){
				random=$("#saveStepBtn_"+id).attr("step-org-id");
			}
			else{
				if(sessionStorage.getItem('step_' + stepTempID)=="null" || sessionStorage.getItem('step_' + stepTempID)==null){
					random=new Date().getTime();
					sessionStorage.setItem("step_" + stepTempID, random);
				}
				else{
					random=sessionStorage.getItem('step_' + stepTempID);
				}
			}
		}
		else{
			if(sessionStorage.getItem('step_' + stepTempID)=="null" || sessionStorage.getItem('step_' + stepTempID)==null){
				random=new Date().getTime();
				sessionStorage.setItem("step_" + stepTempID, random);
			}
			else{
				random=sessionStorage.getItem('step_' + stepTempID);
			}
		}
		for(var i=0;i<deleteStepImage.length;i++){
			seqNoStepImages--;
			var image_Obj = {
					"operation": "delete",
					sequanceNo: deleteStepImage[i],
					formId: formID,
					associationId:random,
					"userSSOId":ssoId,
					imageData: "",					
					helpTextLevel:"Step",
					formStatus: baseFormId ? "14" : "11" 
			};
			imageJsonNew.push(image_Obj);
			var imageJson = $.toJSON(image_Obj);
			imageArray.push(imageJson);
		}
		deleteStepImageFlag=0;
	}
	var len_=0;
	var secObj = {
			sectionID: sectID,
			id_: id,
			tempstep:stepTempID,
			labelDescription: label
	};
	if(stepArr.length>0){
		for(var i=0;i<stepArr.length;i++){
			if(stepArr[i].sectionID==sectID){
				if(stepArr[i].id_==id){
					var lengthOFImagesAtStep=0;
					lengthOFImagesAtStep=$('#addStepImage_' + id).children().size();
					len_=Object.keys(stepArr[i].baseArr[0]).length;
					if(lengthOFImagesAtStep==len_){
						uploadStepFlag=1;
						if(addImStepFlag==0){}
						else{
							len_=(addImStepFlag.split("_")[1])-1;
							uploadStepFlag=0;
						}
					}
					else{
						uploadStepFlag=0;
					}
				}
			}
		}
	}
	var baseArr = new Array();
	var baseObj = new Object();
	for(var i=0;i<stepArr.length;i++){
		if(stepArr[i].sectionID==sectID){
			if(stepArr[i].id_==id){
				stepArr.splice(i,1);
			}
		}
	}
	for (var k = 0; k < $('#addStepImage_' + id).children().size(); k++) {
		var id_=$('#addStepImage_' + id);
		ImageButtonSave(k,baseObj,id_);
	}
	baseArr.push(baseObj);
	secObj.baseArr = baseArr;
	stepArr.push(secObj);
	var random=0;
	var formID=1;
	if(editFormFLag==1){
		formID=frmID;
		if($("#saveStepBtn_"+id).attr("status")=="present"){
			random=$("#saveStepBtn_"+id).attr("step-org-id");
		}
		else{
			if(sessionStorage.getItem('step_' + stepTempID)=="null" || sessionStorage.getItem('step_' + stepTempID)==null){
				random=new Date().getTime();
				sessionStorage.setItem("step_" + stepTempID, random);
			}
			else{
				random=sessionStorage.getItem('step_' + stepTempID);
			}
		}
	}
	else{
		if(sessionStorage.getItem('step_' + stepTempID)=="null" || sessionStorage.getItem('step_' + stepTempID)==null){
			random=new Date().getTime();
			sessionStorage.setItem("step_" + stepTempID, random);
		}
		else{
			random=sessionStorage.getItem('step_' + stepTempID);
		}
	}
	if(uploadStepFlag==0){
		addImStepFlag=0;
		for (var i = 0; i < stepArr.length; i++) {
			if(stepArr[i].sectionID==sectID){
				if(stepArr[i].id_==id){
					var len=Object.keys(stepArr[i].baseArr[0]).length;
					for(var s=len_;s<len;s++){
						seqNoStepImages++;
						var imData="";
						imData=savingOfBase64(imData,s,stepArr,i);
						var operation="add";
						var seq=seqNoStepImages;
						var level="Step";
						creatingImageObject(operation,seq,formID,random,ssoId,imData,level,imageJsonNew,imageArray);
					}
				}
			}

		}
	}
	else{}
	if(editFormFLag==1){
		labelEditFlag="update";
	}
	var obj={
			helpDescription: label,
			imageDescFlag: labelEditFlag,
	};
	obj.imagesList =imageJsonNew;
	var json=$.toJSON(obj);
	var serverbaseUrl = getServerPath();
	var url_image = serverbaseUrl + "uploadhelpimages";
	if(imageArray.length>0){
		labelEditStepArr.push(stepTempID);
		image_post(url_image,json,function(data) {	
			if($("#stepTab_"+stepTempID).find('a').eq(3).length==0){
				$("#stepTab_"+stepTempID).append('<a rel="tooltip"  title="Help"  id="stepID_'+stepTempID+'" sect="'+sectID+'" step="'+id+'"  data-stepTemp="'+stepTempID+'" status="new"  class="stepIconHelpImage" id><img  style="margin-left:-67px;" src="images/help_2.png"></a> ');
			}
			$("#helpStepPopup").modal('hide');
		});
	}
	else{
		if(templabel==label){
			stopLoader();
			$("#helpStepPopup").modal('hide');
		}
		else{
			var image_Obj = {
					"operation": "",
					sequanceNo: "",
					formId: formID,
					associationId:random,
					"userSSOId":"",
					imageData: "",					
					helpTextLevel: "Step",
			};
			imageJsonNew.push(image_Obj);
			var obj={
					helpDescription: label,
					imageDescFlag: labelEditFlag,
			};
			obj.imagesList =imageJsonNew;
			var json=$.toJSON(obj);
			var serverbaseUrl = getServerPath();
			var url_image = serverbaseUrl + "uploadhelpimages";
			labelEditStepArr.push(stepTempID);
			image_post(url_image,json,function(data) {	
				if($("#stepTab_"+stepTempID).find('a').eq(3).length==0){
					$("#stepTab_"+stepTempID).append('<a rel="tooltip"  title="Help"  id="stepID_'+stepTempID+'" sect="'+sectID+'" step="'+id+'"  data-stepTemp="'+stepTempID+'"status="new"  class="stepIconHelpImage" id><img  style="margin-left:-67px;" src="images/help_2.png"></a> ');				}
				$("#helpStepPopup").modal('hide');
			});
		}
	}
});

/*************Saving of Question Level Help Images*********************/
$(document).on('click', '.saveBtnQues', function() {
	$("#helpQuesPopup *").attr("disabled", "disabled").off('click');
	$(".delImageQues").prop('disabled', true);
	var imageJsonNew =new Array();
	var imageArray = new Array();
	var secId = this.id;
	var id = secId.replace('saveQuesBtn_', '');
	var labelID=$("#"+secId).attr("data-ques");
	var section=$("#" + secId).attr("data-sect");
	var step=$("#" + secId).attr("data-step");
	var uploadQuestionFlag=0;
	var labelEditFlag="add";
	var len_=0;
	var label = (document.getElementById('labelDescQues_' + labelID).value);
	var templabel="";
	if(quesArr.length>0){
		for(var i=0;i<quesArr.length;i++){
			if (quesArr[i].sectionID == section) {
				if (quesArr[i].stepID ==step) {
					if (quesArr[i].id_ == id) {
						templabel=quesArr[i].labelDescription;
					}
				}
			}
		}
	}
	if(labelEditQuesArr.length>0){
		for(var i=0;i<labelEditQuesArr.length;i++){
			if(labelEditQuesArr[i]==labelID){
				labelEditFlag="update";
			}
		}
	}	
	if(deleteQuesImageFlag==1){
		var random=0;
		var formID=1;
		if(editFormFLag==1){
			formID=frmID;
			if($("#saveQuesBtn_"+id).attr("status")=="present"){
				random=$("#saveQuesBtn_"+id).attr("ques-org-id");
			}
			else{
				if(sessionStorage.getItem('ques_' + labelID)=="null" || sessionStorage.getItem('ques_' + labelID)==null ){
					random=new Date().getTime();
					sessionStorage.setItem("ques_" + labelID, random);
				}
				else{
					random=sessionStorage.getItem('ques_' + labelID);
				}
			}
		}
		else{
			if(sessionStorage.getItem('ques_' + labelID)=="null" || sessionStorage.getItem('ques_' + labelID)==null){
				random=new Date().getTime();
				sessionStorage.setItem("ques_" + labelID, random);
			}
			else{
				random=sessionStorage.getItem('ques_' + labelID);
			}
		}
		for(var i=0;i<deleteQuesImage.length;i++){
			seqNoQuestionImages--;
			
			var image_Obj = {
					"operation": "delete",
					sequanceNo: deleteQuesImage[i],
					formId: formID,
					associationId:random,
					"userSSOId":ssoId,
					imageData: "",					
					helpTextLevel: "Question",
					formStatus: baseFormId ? "14" : "11" 
			};
			imageJsonNew.push(image_Obj);
			var imageJson = $.toJSON(image_Obj);
			imageArray.push(imageJson);
		}
		deleteQuesImageFlag=0;
	}
	var secObj = {
			sectionID:section,
			stepID: step,
			id_: id,
			tempQuesId:labelID,
			labelDescription: label
	};
	if(quesArr.length>0){
		for(var i=0;i<quesArr.length;i++){
			if (quesArr[i].sectionID == section) {
				if (quesArr[i].stepID ==step) {
					if (quesArr[i].id_ == id) {
						var lengthOFImagesAtQues=0;
						lengthOFImagesAtQues=$('#addQuesImage_' + id).children().size();
						len_=Object.keys(quesArr[i].baseArr[0]).length;
						if(lengthOFImagesAtQues==len_){
							uploadQuestionFlag=1;
							if(addImQuesFlag==0){}
							else{
								len_=(addImQuesFlag.split("_")[1])-1;
								uploadQuestionFlag=0;
							}
						}
						else{
							uploadQuestionFlag=0;
						}
					}
				}
			}
		}
	}
	var baseArr = new Array();
	var baseObj = new Object();
	deleteAllQuesHelpImage(section,step,id);
	for (var k = 0; k < $('#addQuesImage_' + id).children().size(); k++) {
		var id_=$('#addQuesImage_' + id);
		ImageButtonSave(k,baseObj,id_);
	}
	baseArr.push(baseObj);
	secObj.baseArr = baseArr;
	quesArr.push(secObj);
	var random=0;
	var formID=1;
	if(editFormFLag==1){
		formID=frmID;
		labelEditFlag="update";
		if($("#saveQuesBtn_"+id).attr("status")=="present"){
			random=$("#saveQuesBtn_"+id).attr("ques-org-id");
		}
		else{
			if(sessionStorage.getItem('ques_' + labelID)=="null" || sessionStorage.getItem('ques_' + labelID)==null ){
				random=new Date().getTime();
				sessionStorage.setItem("ques_" + labelID, random);
			}
			else{
				random=sessionStorage.getItem('ques_' + labelID);
			}
		}
	}
	else{
		if(sessionStorage.getItem('ques_' + labelID)=="null" || sessionStorage.getItem('ques_' + labelID)==null){
			random=new Date().getTime();
			sessionStorage.setItem("ques_" + labelID, random);
		}
		else{
			random=sessionStorage.getItem('ques_' + labelID);
		}
	}
	if(uploadQuestionFlag==0){
		addImQuesFlag=0;
		for (var i = 0; i < quesArr.length; i++) {
			if (quesArr[i].sectionID == section) {
				if (quesArr[i].stepID ==step) {
					if (quesArr[i].id_ == id) {
						var len=Object.keys(quesArr[i].baseArr[0]).length;
						for(var s=len_;s<len;s++){
							seqNoQuestionImages++;
							var imData="";
							imData=savingOfBase64(imData,s,quesArr,i);
							var operation="add";
							var seq=seqNoQuestionImages;
							var level="Question";
							creatingImageObject(operation,seq,formID,random,ssoId,imData,level,imageJsonNew,imageArray);
						}
					}
				}
			}
		}
	}
	var obj={
			helpDescription: label,
			imageDescFlag: labelEditFlag,
	};
	obj.imagesList =imageJsonNew;
	var json=$.toJSON(obj);
	var serverbaseUrl = getServerPath();
	var url_image = serverbaseUrl + "uploadhelpimages";
	if(imageArray.length>0){
		labelEditQuesArr.push(labelID);
		image_post(url_image,json,function(data) {	
			if($("#quesTab_"+labelID).find('a').eq(2).length==0){
				$("#quesTab_"+labelID).append('<a rel="tooltip"  title="Help"  id="quesID_'+labelID+'" sect="'+section+'" step="'+step+'"  ques="'+id+'" status="new"  class="quesIconHelpImage" id><img  style="margin-left:-65px;" src="images/help_2.png"></a> ');
			}
			$("#helpQuesPopup").modal('hide');
		});
	}
	else{
		if(templabel==label){
			stopLoader();
			$("#helpQuesPopup").modal('hide');
		}
		else{
			var image_Obj = {
					"operation": "",
					sequanceNo: "",
					formId: formID,
					associationId:random,
					"userSSOId":"",
					imageData: "",					
					helpTextLevel: "Question",
			};
			imageJsonNew.push(image_Obj);
			var obj={
					helpDescription: label,
					imageDescFlag: labelEditFlag,
			};
			obj.imagesList =imageJsonNew;
			var json=$.toJSON(obj);
			var serverbaseUrl = getServerPath();
			var url_image = serverbaseUrl + "uploadhelpimages";
			labelEditQuesArr.push(labelID);
			image_post(url_image,json,function(data) {	
				if($("#quesTab_"+labelID).find('a').eq(2).length==0){
					$("#quesTab_"+labelID).append('<a rel="tooltip"  title="Help"  id="quesID_'+labelID+'" sect="'+section+'" step="'+step+'"  ques="'+id+'" status="new"  class="quesIconHelpImage" id><img  style="margin-left:-65px;" src="images/help_2.png"></a> ');
				}
				$("#helpQuesPopup").modal('hide');
			});
		}
	}	
});

function savingOfBase64(imData,s,arrayOfhelpImages,i){
	if(s==0){
		imData= arrayOfhelpImages[i].baseArr[0].image1;	
	}else if(s==1){
		imData= arrayOfhelpImages[i].baseArr[0].image2;
	}else if(s==2){
		imData= arrayOfhelpImages[i].baseArr[0].image3;
	}else if(s==3){
		imData= arrayOfhelpImages[i].baseArr[0].image4;
	}else if(s==4){
		imData= arrayOfhelpImages[i].baseArr[0].image5;
	}	
	return imData;
}
function ImageButtonSave(k,baseObj,id_){
	if (k == 0) {
		baseObj.image1 = id_.find('img').eq(k).attr('src').replace('data:image/png;base64,', '');
	}
	if (k == 1) {
		baseObj.image2 = id_.find('img').eq(k).attr('src').replace('data:image/png;base64,', '');
	}
	if (k == 2) {
		baseObj.image3 =id_.find('img').eq(k).attr('src').replace('data:image/png;base64,', '');
	}
	if (k == 3) {
		baseObj.image4 = id_.find('img').eq(k).attr('src').replace('data:image/png;base64,', '');
	}
	if (k == 4) {
		baseObj.image5 = id_.find('img').eq(k).attr('src').replace('data:image/png;base64,', '');
	}
}
function creatingImageObject(operation,seq,formID,random,ssoId,imData,level,imageJsonNew,imageArray){
	var image_Obj = {
			"operation": operation,
			sequanceNo: seq,
			formId: formID,
			associationId:random,
			"userSSOId":ssoId,
			imageData: imData,					
			helpTextLevel: level,
			formStatus: baseFormId ? "14" : "11" 
	};
	imageJsonNew.push(image_Obj);
	var imageJson = $.toJSON(image_Obj);
	imageArray.push(imageJson);
}