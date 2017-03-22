/*************Adding Help Images*********************/
$(document).on('click', '.img_input_form_help', function() {
	if ($(file1_form_help).parent().find(".addImagesDynamic img").length == 5) {
		$("#AlertPopupImage_").modal({ backdrop:'static'});
		return false;
	}
	$("#file1_form_help").trigger("click");
	$("#file1_form_help").unbind().on("change", function() {
		var imgSize = $(file1_form_help).parent().find(".addImagesDynamic img").length;
		if (imgSize < 5) {
			readHelpFormImage(this, imgSize);
		}
	});
});


/*************Adding Guide Image*********************/
$(document).on('click', '.img_input_form_guide', function() {
	
	if ($(this).parents('.guideImgbox').find(".addImagesDynamic img").length == 1) {
		$("#AlertGuidePopupImage_").modal({ backdrop:'static'});
		return false;
	}
	$(this).parents('.guideImgbox').find(".file1_form_guide").trigger("click");
	$(this).parents('.guideImgbox').find(".file1_form_guide").unbind().on("change", function() {
		var imgSize = $(this).parents('.guideImgbox').find(".addImagesDynamic img").length;
		if (imgSize < 1) {
			readHelpFormImage(this, imgSize);
		}
	});
});


$(document).on('click', '.img_input_section_help', function() {
	var img_id = this.id;
	var id = img_id.replace('img_input_section_help', '');
	if ($("#file1_section_help" + id).parent().find(".addImagesDynamic img").length == 5) {
		$("#AlertPopupImage_").modal({ backdrop:'static'});
		return false;
	}
	$("#file1_section_help" + id).trigger("click");
	$("#file1_section_help" + id).unbind().on("change", function() {
		var imgSize = $("#file1_section_help" + id).parent().find(".addImagesDynamic img").length;
		if (imgSize < 5) {
			readHelpSectionImage(this, id, imgSize);
		}
	});
});
$(document).on('click', '.img_input_step_help', function() {
	var img_id = this.id;
	var sectID = ($("#" + img_id).attr("data-sect"));
	var tempstep=($("#"+img_id).attr("data-tempstep"));
	var id = img_id.replace('img_input_step_help', '');
	if ($("#file1_step_help" + id).parent().find(".addImagesDynamic img").length == 5) {
		$("#AlertPopupImage_").modal({ backdrop:'static'});
		return false;
	}
	$("#file1_step_help" + id).trigger("click");
	$("#file1_step_help" + id).unbind().on("change", function() {
		var imgSize = $("#file1_step_help" + id).parent().find(".addImagesDynamic img").length;
		if (imgSize < 5) {
			readHelpStepImage(this, id, sectID, tempstep,imgSize);
		}
	});
});
$(document).on('click', '.img_input_ques_help', function() {
	var img_id = this.id;
	var sect=$("#"+this.id).attr("data-Sect");
	var step=$("#"+this.id).attr("data-Step");
	var tempQues=$("#"+this.id).attr("data-tempques");
	var id = img_id.replace('img_input_ques_help','');
	if ($("#file1_ques_help" + id).parent().find(".addImagesDynamic img").length == 5) {
		$("#AlertPopupImage_").modal({ backdrop:'static'});
		return false;
	}
	$("#file1_ques_help" + id).trigger("click");
	$("#file1_ques_help" + id).unbind().on("change", function() {
		var imgSize = $("#file1_ques_help" + id).parent().find(".addImagesDynamic img").length;
		if (imgSize < 5) {
			readHelpQuesImage(this, id,sect,step ,tempQues, imgSize);
		}
	});
});
function readHelpFormImage(input, imgSize) {
	var delID = imgSize + 1; 
	if (input.files && input.files[0]) {
		var FR = new FileReader();
		
		if( input.files[0].type !== "image/jpeg" && input.files[0].type !== "image/png" ){
			$("#AlertImgTypePopup").modal({ backdrop:'static'});
		}
		else if(input.files[0].size > 1e+6){
			$("#AlertImgSizePopup").modal({ backdrop:'static'});
		} 
		else{
			FR.onload = function(e) {
				$(input).parent().parent().find("#addFormImage_").append("<div class=\'imgDimensions\'><img  src='" + e.target.result + "'  id=\"idForm_" + delID + "\"/><i class=\'icon-trash delImageForm\' id=\"delForm_" + delID + "\" ></i></div>");		
			};
			FR.readAsDataURL(input.files[0]);
		}
		
	}
}


function readHelpSectionImage(input, id, imgSize) {
	var delSectID = imgSize + 1;
	if (input.files && input.files[0]) {
		var FR = new FileReader();
		FR.onload = function(e) {
			$(input).parent().parent().find("#addSectionImage_" + id).append("<div class=\'imgDimensions\' id='image_" + id + "' ><img src='" + e.target.result + "' value='" + e.target.result + "'/><i class=\'icon-trash delImageSect\' id=\"delSect_" + delSectID + "\"  data-Sect='" + id + "'></i></div>");
		};
		FR.readAsDataURL(input.files[0]);
	}
}
function readHelpStepImage(input, id, sectID,tempstep, imgSize) {
	var delStepID = imgSize + 1;
	if (input.files && input.files[0]) {
		var FR = new FileReader();
		FR.onload = function(e) {
			$(input).parent().parent().find("#addStepImage_" + id).append("<div class=\'imgDimensions\' id='image_" + id + "' ><img src='" + e.target.result + "' value='" + e.target.result + "'/><i class=\'icon-trash delImageStep\' id=\"delStep_" + delStepID + "\"  data-Sect='" + sectID + "' data-Step='" + id + "' data-tempstep='" + tempstep + "'></i></div>");
		};
		FR.readAsDataURL(input.files[0]);
	}
}
function readHelpQuesImage(input, id,sect,step ,tempQues,imgSize) {
	var delQuesID = imgSize + 1;
	if (input.files && input.files[0]) {
		var FR = new FileReader();
		FR.onload = function(e) {
			$(input).parent().parent().find("#addQuesImage_" + id).append("<div class=\'imgDimensions\' id='image_" + id + "' ><img src='" + e.target.result + "' value='" + e.target.result + "'/><i class=\'icon-trash delImageQues\' id=\"delQues_" + delQuesID + "\" data-Sect='" +sect+ "' data-Step='" +step + "' data-Ques='" +id + "' data-tempQues='" +tempQues + "'></i></div>");
		};
		FR.readAsDataURL(input.files[0]);
	}
}