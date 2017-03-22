var sect_Count=0;
var number=0;
var stepCount_=0;
var quesCountNumber_=0;
var countSect=0;
var num=0;
$(".createChecklistBtn").on("click", function() {
	var funValue = $("select#function option:selected").text()
	var frmName=$("#frmName").val();
	var sso=$("#sso").val();
	var obj={"formName":frmName,
			"functionId":funValue,
			"submittedBy":sso};
	var json = $.toJSON(obj);
	var serverbaseUrl = getServerPath();
	var url = serverbaseUrl + Application.checklistServices.checklistnameexists;
	duplicateName(url,json,function(data){
		if(data.resultSet.Result=="Checklist name not exists."){
			//duplicateFlag=0;
			$("#createchecklistPopup").modal('hide');
			$('.sectMainDiv').remove();
			$('.FSGDiv').remove();
			$('#devi').hide();
			showDivFLag=1;
			editFormFLag=0;
			$("#myTextArea").val('');
			$("textarea").prop('disabled', false);
			intialize();
			intialize_1();
			$("#createchecklistPopup .accordion-inner #function option:selected").each(function() {
				if (this.value != '') {
					$("#createchecklistPopup").hide();
					$(".CLCBtnDiv").hide();
					$('.CLCBtnDiv_').hide();
					$('#dashboardcontent').fadeOut('medium', function() {
						$('.backDiv').show();
						$('#createchecklist').show();
						var tempSect=1;
						var section_id=1;
						var funId = $("select#function option:selected").val();
						var subFununId = $("select#subfunction option:selected").val();
						var grpId = $("select#group option:selected").val();
						sessionStorage.setItem("functionId", funId);
						sessionStorage.setItem("subfunctionId", subFununId);
						sessionStorage.setItem("groupId", grpId);
						var funValue = $("select#function option:selected").text();
						var subFununValue = $("select#subfunction option:selected").text();
						var grpValue = $("select#group option:selected").text();
						$('#FSGDiv').empty();
						$('.CLMain').prepend('<div id ="FSGDiv" class="FSGDiv"><span>Function</span> - <span>' + funValue + '</span> > <span>Sub function</span> - <span>' + subFununValue + '</span> > <span>Group</span> - <span>' + grpValue + '</span></div>');
						$('#userManagement').addClass("userManagementTab");
						$('#records').addClass("recordsManagementTab");
						$('#checklistManagement').addClass("checklistManagementTab");
						$("#CLName").empty();
						$("#CLName").append('<div class="CLName_innerDiv">'+
						'<textarea  class="textareaVal dropTxtarea" maxlength="100" style="opacity: 1;" placeholder="Enter the name of the Checklist Here..." id="myTextArea"></textarea>'+
								'<a rel="tooltip" title="Add_Section" class="formAddBtn"><img style="padding-left:66px;" src="images/add-section.png"></a>'+
						'</div>');
						$(".textareaVal").text($("#frmName").val());
						sect_Count++;
						$(".formAddBtn").parent().parent().append('<div class="sectMainDiv expanded"  id="section_'+sect_Count+'" status="new">'+
						'<div class="sectName accordionHeader " id="sectionTab_'+sect_Count+'"><textarea maxlength="100" class="textareaVal1" id="sectionText_'+sect_Count+'" placeholder="Enter Section Name here..."></textarea>'+
								'<a rel="tooltip" title="Add Step"  id="sectionID_'+sect_Count+'"  status="new" data-Sect-Count="'+sect_Count+'" data-server="'+sect_Count+'" class="sectionAddBtn"><img src="images/add.png" style="margin-left: 55px;"></a>'+
								'<a rel="tooltip" title="Delete"  id="sectDelete_'+sect_Count+'" status="new" data-Sect-Del="'+sect_Count+'" class="toDelSection" onClick="delSection($(this));"><img src="images/delete_new.png" style="margin-left: 15px;"></a> '+
						'<a class="accrodionTitle"><i class="icon-chevron-up accRightSideIcon" style="float: right;padding-top:10px;padding-right:10px;color:#3693f8;"></i></a> </div></div>');
						$(".textareaVal1").text($("#sectName").val());
						number++;
						stepCount_++;
						$(".sectionAddBtn").parent().parent().append('<div class="stepMainDiv expanded" id="step_'+stepCount_+'" ondrop="dropping(event)" ondragover="allowDrop(event)" status="new">'+
								'<div class="newDiv" id="step123_'+stepCount_+'" style="float: left; width:100%;"  draggable="true" ondragstart="drag(event,1)">'+
						'<div class="stepName accordionHeader" id="stepTab_'+stepCount_+'" ><textarea maxlength="100" class="textareaVal2" id="stepText_'+stepCount_+'" placeholder="Enter Step Name here..."></textarea>'+
								'<a rel="tooltip" title="Add_Question"  status="new" data-step ="'+number+'" data-sect="'+tempSect+'"  data-step-plus="'+stepCount_+'" data-sect-plus="'+tempSect+'" data-stepTemp="'+stepCount_+'" id="tempsectID_'+stepCount_+'" class="stepAddBtn"><img src="images/add.png"  style="margin-left:55px;"></a> '+
								'<a rel="tooltip" title="Delete" status="new" data-Sect-Count="'+section_id+'" data-Step-Del="'+number+'" data-AcStep-Del="'+stepCount_+'"class="toDelStep" onClick="delStep($(this));"><img src="images/delete_new.png"  style="margin-left: 12px;"></a> '+
						'<a class="accrodionTitle"><i class="icon-chevron-up accRightSideIcon"  style="float: right;padding-top:10px;padding-right:10px;color:#3693f8;"></i> </a></div></div>');
						$(".textareaVal2").text($("#stepName").val());
						num++;
						countSect++;
						var sectID=1;
						var stepID=1;
						var helpstep=1;
						var helpsect=1;quesCountNumber_++;
						$(".stepAddBtn").parent().parent().append('<div class="quesMainDiv expanded" ondrop="dropping(event)" ondragover="allowDrop(event)"  status="new" >'+
								'<div class="maindiv" id="drag_'+num+'"  width="336" height="69" draggable="true" ondragstart="drag(event,1)">'+
								'<div class="ques"  id="firstQues_'+countSect+'" data-QuesStep-Count="'+stepID+'" data-QuesSect-Count="'+sectID +'" data-Ques-Count="'+num +'" quesCountNumber_="'+quesCountNumber_ +'" helpsect="'+helpsect +'" helpstep="'+helpstep +'">'+
								'<div class="qsnHeader" id="quesTab_'+quesCountNumber_+'"><label>Question'+num+'</label> '+
								'<a rel="tooltip" title="Edit" class="to_edit" ><img style="margin-left: 60px;" src="images/edit_2.png"></a> <a rel="tooltip" title="Delete" class="toDel" id="order_'+countSect+'" data-Sect-Count="'+sectID+'" data-Step-Count="'+stepID+' "  data-Ques-Count="'+num+'"><img  style="  margin-left:11px;" src="images/delete_new.png"></a></div>'+
								'<div class="qsnText" id="firstQues1_'+countSect+'" status="new"></div></div>'+
								'<div class="ans" id="firstAns_'+countSect+'" data-QuesStep-Count="'+stepID+'" data-QuesSect-Count="'+sectID +'" status="new" data-Ques-Count="'+quesCountNumber_ +'"   data-Ans-Count="'+countSect +'">'+
								'<div class="ansHeader"><label >Answer'+num+'</label></div>'+
								'<div class="ansText" id="firstAns1_'+countSect+'" data-QuesStep-Count="'+stepID+'" data-QuesSect-Count="'+sectID +'" data-Ques-Count="'+quesCountNumber_ +'" status="new"></div></div></div></div>');
						dragDropFunction();
						$(".CLCBtnDiv").show(); 
					});

				} else {
					$('.CLCBtnDiv_').hide();
					$(".CLCBtnDiv").hide();
					$("#AlertPopup5").modal();
					$("#confirmfun").click(function() {
						$("#createchecklistPopup").modal();
					});
				}
			});	
		}
		else if(data.resultSet.Result=="Checklist name already exists."){
			$("#checklistDuplicate").modal();
			$("#frmName").val('');
			$('.createChecklistBtn').attr("disabled","disabled");
			$('#sectName').attr("disabled","disabled");
		}


	});
});
$(".cancel").on("click", function() {
	$("#createchecklistPopup").fadeOut();
});