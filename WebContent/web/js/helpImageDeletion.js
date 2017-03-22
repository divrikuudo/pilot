/*************Deleting Help Images*********************/
var deleteFormImageFlag=0;
var deleteSectionImageFlag=0;
var deleteQuesImageFlag=0;
var deleteStepImageFlag=0;
var deleteFormImage=new Array();
var deleteSectionImage=new Array();
var deleteStepImage=new Array();
var deleteQuesImage=new Array();
var addImSectionFlag=0;
var addImQuesFlag=0;
var addImStepFlag=0;
var addImFormFlag=0;
$(document).on('click', '.delImageForm', function() {
	if(formArr.length==0){
		$(this).parent().parent().parent().find('#file1_form_help').val('');
		$(this).parent().parent().parent().find('.file1_form_guide').val('');
		$(this).parent().remove();
		
		
	}else{
		deleteFormImageFlag=1;
		var imageId=this.id.replace("delForm_","");
		deleteFormImage.push(imageId);
		var label = (document.getElementById('labelDescForm_').value);
		if(formArr.length>0){
			if(Object.keys(formArr[0].baseArr[0]).length!=$('#addFormImage_').children().size()){
				addImFormFlag=1+"_"+(Object.keys(formArr[0].baseArr[0]).length);
			}
		}
		$(this).parent().remove();
		var secObj = {
				labelDescription: label
		};
		var baseArr = new Array();
		var baseObj = new Object();
		formArr=[];
		for (var k = 0; k < $('#addFormImage_').children().size(); k++) {
			var id_=$('#addFormImage_');
			ImageButtonSave(k,baseObj,id_);
		}
		baseArr.push(baseObj);
		secObj.baseArr = baseArr;
		formArr.push(secObj);}	
});



$(document).on('click', '.delImageSect', function() {
	var sectionid=$("#"+this.id).attr("data-Sect");
	var flag=0;
	for(var i=0;i<secArr.length;i++){
		if(secArr[i].id_== sectionid){
			flag=1;
		}
	}
	if(flag==0){
		$(this).parent().remove();
	}else{
		deleteSectionImageFlag=1;
		var imageId=this.id.replace("delSect_","");
		var label = (document.getElementById('labelDesc_' + sectionid).value);
		for(var i=0;i<secArr.length;i++){
			if(secArr[i].id_== sectionid){
				if(Object.keys(secArr[i].baseArr[0]).length!=$('#addSectionImage_' + sectionid).children().size()){
					addImSectionFlag=1+"_"+(Object.keys(secArr[i].baseArr[0]).length);
				}
				deleteSectionImage.push(imageId);
				secArr.splice(i,1);
			}
		}
		$(this).parent().remove();
		var secObj = {
				id_: sectionid,
				labelDescription: label
		};
		var baseArr = new Array();
		var baseObj = new Object();
		for (var k = 0; k < $('#addSectionImage_' + sectionid).children().size(); k++) {
			var id_=$('#addSectionImage_' + sectionid);
			ImageButtonSave(k,baseObj,id_);
		}
		baseArr.push(baseObj);
		secObj.baseArr = baseArr;
		secArr.push(secObj);
	}
});
$(document).on('click', '.delImageStep', function() {
	var sectionid=$("#"+this.id).attr("data-Sect");
	var stepid=$("#"+this.id).attr("data-Step");
	var flag=0;
	for(var i=0;i<stepArr.length;i++){
		if(stepArr[i].sectionID==sectionid){
			if(stepArr[i].id_==stepid){
				flag=1;
			}
		}
	}
	if(flag==0){
		$(this).parent().remove();
	}else{
		deleteStepImageFlag=1;
		var tempstepID=$("#"+this.id).attr("data-tempstep");
		var imageid=this.id.replace("delStep_","");
		for(var i=0;i<stepArr.length;i++){
			if(stepArr[i].sectionID==sectionid){
				if(stepArr[i].id_==stepid){
					if(Object.keys(stepArr[i].baseArr[0]).length!= $('#addStepImage_' + stepid).children().size()){
						addImStepFlag=1+"_"+(Object.keys(stepArr[i].baseArr[0]).length);
					}
					deleteStepImage.push(imageid);
					stepArr.splice(i,1);
				}
			}
		}
		$(this).parent().remove();
		var label = (document.getElementById('labelDesc1_' + tempstepID).value);
		var secObj = {
				sectionID: sectionid,
				id_: stepid,
				tempstep:tempstepID,
				labelDescription: label
		};
		var baseArr = new Array();
		var baseObj = new Object();
		for (var k = 0; k < $('#addStepImage_' + stepid).children().size(); k++) {
			var id_=$('#addStepImage_' + stepid);
			ImageButtonSave(k,baseObj,id_);
		}
		baseArr.push(baseObj);
		secObj.baseArr = baseArr;
		stepArr.push(secObj);
	}
});
$(document).on('click', '.delImageQues', function() {
	var sect=$("#"+this.id).attr("data-Sect");
	var step=$("#"+this.id).attr("data-Step");
	var ques=$("#"+this.id).attr("data-Ques");
	var flag=0;
	for(var i=0;i<quesArr.length;i++){
		if(quesArr[i].sectionID==sect){
			if(quesArr[i].stepID==step){
				if(quesArr[i].id_==ques){
					flag=1;
				}
			}
		}
	}
	if(flag==0){
		$(this).parent().remove();
	}else{
		deleteQuesImageFlag=1;
		var tempques=$("#"+this.id).attr("data-tempQues");
		var imageid=this.id.replace("delQues_","");
		var label = (document.getElementById('labelDescQues_' + tempques).value);
		for(var i=0;i<quesArr.length;i++){
			if(quesArr[i].sectionID==sect){
				if(quesArr[i].stepID==step){
					if(quesArr[i].id_==ques){
						if(Object.keys(quesArr[i].baseArr[0]).length!= $('#addQuesImage_' + ques).children().size()){
							addImQuesFlag=1+"_"+(Object.keys(quesArr[i].baseArr[0]).length);
						}
						deleteQuesImage.push(imageid);
						quesArr.splice(i,1);
					}
				}
			}
		}
		$(this).parent().remove();
		var secObj = {
				sectionID:sect,
				stepID: step,
				id_: ques,
				tempQuesId:tempques,
				labelDescription: label
		};
		var baseArr = new Array();
		var baseObj = new Object();
		for (var k = 0; k < $('#addQuesImage_' + ques).children().size(); k++) {
			var id_=$('#addQuesImage_' + ques);
			ImageButtonSave(k,baseObj,id_);
		}
		baseArr.push(baseObj);
		secObj.baseArr = baseArr;
		quesArr.push(secObj);
	}
});