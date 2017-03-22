/*************Searching Records*********************/
var globalSections="";
var projList = null;
function recordServiceCall(url,success) {
	checkTableRowSelection();
	var serverbaseUrl = getServerPath();
	/*ssoId = sessionStorage.getItem("userId");*/
	roleuser = sessionStorage.getItem('role');
    $.ajax({
        type: "POST",
        url: serverbaseUrl + Application.checklistServices.checklistnames  + "/" + ssoId + "/" + roleuser,
        dataType: "json",
        contentType: "application/json; charset=utf-8",

        success: function(response) {
            showCheckListNames(response.resultSet.checklistname);
		},
    });
}

function showCheckListNames(checklistname) {

	$("#ck_name").empty();
	$("#version").empty();
	$("#turbine_id").empty();
	$("#version").append("<option id=''>Select</option>");
	$("#turbine_id").append("<option id=''>Select</option>");
	var html="<option>Select</option>";
	for(var i=0;i<checklistname.length;i++) {
		html+="<option>"+checklistname[i]+"</option>";
	}
	$("#ck_name").append(html);
}

$('#ck_name').change(function(){

	var ckName = $('#ck_name option:selected').text();
	populateVersion(ckName);
	populateProjects(ckName);
});
function populateProjects(ckName) {
	startiLoaderSpiner();
	$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
	var serverbaseUrl = getServerPath();
	$.ajax({
        type: "POST",
        url: serverbaseUrl + "populateprojects"  + "/" + ckName + "/" + ssoId,
        dataType: "json",
        contentType: "application/json; charset=utf-8",

        success: function(response) {
        	stopiLoaderSpiner();
			$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
        	 if(ckName=="Select") {
             	$("#turbine_id").empty();

             	$("#turbine_id").append("<option id=''>Select</option>");

             } else {
             	$("#turbine_id").empty();
				projList = response.resultSet.projects;
             	showProjectsDD(response.resultSet.projects);
                 
             }
        	
		},
    });
}

$('#turbine_id').click(function(){
	if(projList != null && projList.length == 0)
	{
		$("#noProjMapped").modal();
		$(this).blur();
	}
		
});

function showProjectsDD(sections) {
	//console.log(sections);
	$("#turbine_id").empty();
	var html="<option id=''>Select</option>";
	for(var i=0;i<sections.length;i++){
		html+="<option id="+sections[i].projectId+">"+sections[i].projectName+"</option>";
	}
	$("#turbine_id").append(html);
}

function populateVersion(ckName) {

	var serverbaseUrl = getServerPath();
/*	var ssoId = sessionStorage.getItem("userId");*/
	var role = sessionStorage.getItem('role');
    $.ajax({
        type: "POST",
        url: serverbaseUrl + Application.checklistServices.checklistversions  + "/" + ckName + "/" + ssoId + "/" + role,
        dataType: "json",
        contentType: "application/json; charset=utf-8",

        success: function(response) {
            if(ckName=="Select") {
            	$("#version").empty();

            	$("#version").append("<option id=''>Select</option>");

            } else {
            	$("#version").empty();
                showVersions(response.resultSet.versions);
                
            }
		},
    });
}

function showVersions(versions) {

	$("#version").empty();
	var html="<option>Select</option>";
	for(var i=0;i<versions.length;i++){
		if (versions[i]) {
			html+="<option>"+versions[i]+"</option>";
		}
	}
	$("#version").append(html);
}


function removeSelect()
{
	var rows = $('tr');
	 rows.on('click', function(e) {
		 var row=$(this);		 
		
		 rows.removeClass('row_selected');
		 rows.removeClass('highlightRow');
        row.removeClass('highlightRow');
	 });
	$("#rowSelectR").removeClass('highlightRow');

}
/*$('#version').change(function(){
	var ckName = $('#ck_name option:selected').text();
	var version = $('#version option:selected').text();
	populateSections(ckName, version);
});

function populateSections(ckName, version) {

	var serverbaseUrl = getServerPath();
	var ssoId = sessionStorage.getItem("userId");
    $.ajax({
        type: "POST",
        url: serverbaseUrl + "populatesections"  + "/" + ckName + "/" + ssoId + "/" + version,
        dataType: "json",
        contentType: "application/json; charset=utf-8",

        success: function(response) {
			globalSections=response.resultSet.sections;
        	showSectionsDD(globalSections);
		},
    });
}

function showSectionsDD(sections) {
	console.log(sections);
	$("#sectionDD").empty();
	var html="<option id=''>Select</option>";
	for(var i=0;i<sections.length;i++){
		html+="<option id="+sections[i].sectionId+">"+sections[i].sectionName+"</option>";
	}
	$("#sectionDD").append(html);
}

$('#sectionDD').change(function(){

	var ids = $(this).find('option:selected').attr('id');
	populateSteps(ids);
});

function populateSteps(id) {

	$("#stepDD").empty();
	var html="<option id=''>Select</option>";
	for(var i=0;i<globalSections.length;i++){
		
		if (globalSections[i].sectionId === id) {
			for (var j=0;j < globalSections[i].searchStepDetails.length;j++) {
				html+="<option id="+globalSections[i].searchStepDetails[j].stepId+">"+globalSections[i].searchStepDetails[j].stepName+"</option>";
			}
		}		
	}
	$("#stepDD").append(html);
}*/

function checkTableRowSelection() {
	
	 var rows = $('#checkListVersionTable tr');
	 rows.on('click', function(e) {
		 var row=$(this);
		 rows.removeClass('highlightRow'); 
	 });
}

$(document).on('click','#records', function() {

	$('#checklistManagement').addClass("checklistManagementTab");
	$('#createchecklist').addClass("checklistManagement");
	$('.checklistManagementTab').parent().removeAttr("class");
	$('#checklistManagement').parent().removeAttr("class");
	$('#dashboardcontent').hide();
	$('#createchecklist').hide();
	$(".sectionMarginSecond").css("display","none");
	recordServiceCall() 	;	
	checkTableRowSelection();
	$("#date_from").val('');
	$("#date_to").val('');
	$('#recordsManagementContent').css("display","block");
	$('#records').parent().attr("class","active");	            
});

$(document).on('click', '.recordSearchClear_', function() {
	checkTableRowSelection();
	removeSelect();
	$("#ck_name").val('Select');
	$("#version").val('Select');
	$("#turbine_id").val('Select');
	$("#date_from").val('');
	$("#date_to").val('');
	$(".sectionMarginSecond").css("display","none");
	$("#first_row").css("display","none");	
});

$(document).on('click', '.recordSearch_', function() {

	var checkListName=$("#ck_name").val();
	var versionNumber=$("#version").val();
	var fromDate=$("#date_from").val();
	var toDate=$("#date_to").val();
	var projectId=$('#turbine_id').find('option:selected').attr('id');
	checkTableRowSelection();
	removeSelect();
	if(checkListName=="Select" || fromDate=='' || toDate=='' || fromDate==' ' || toDate==' '||versionNumber=="Select") {
		$("#AlertSearch").modal();
	} else {
		$("#displayCheckListName").html(checkListName);
		var searchJson={"formId":"354","formName":checkListName,"formVersionNo":versionNumber,"formLanguage":"English","fromDate":fromDate,"toDate":toDate, "projectId":projectId};
		var jsonfy = $.toJSON(searchJson);
		var serverbaseUrl = getServerPath();
		var url = serverbaseUrl + Application.checklistServices.searchrecords;
		postRecordServiceCall(url, jsonfy, function(data) {
			showRecordTable(data.resultSet.records); 
		});
	}
});

function postRecordServiceCall(url, jsonfy, success) {
	startiLoaderSpiner();
	$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
    $.ajax({
        type: "POST",
        url: url,
        data: jsonfy,
        dataType: "json",
        restful: true,
        contentType: 'application/json',
        cache: false,
        timeout: 20000,
        async: true,
        beforeSend: function(data) {},
        success: function(data) {
        	stopiLoaderSpiner();
        	$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
            success.call(this, data);
        },
        error: function(data) {
        	stopiLoaderSpiner();
        	$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
            alert("Error In Connecting");
        }
    });
}
    
function showRecordTable(records) {

	var resultArray = new Array();
	if(records.length == 0) {
		$('.exportToExcel_').hide();
	} else {
		$('.exportToExcel_').show();
	}
	var seq = 0;
	for(var i=0;i<records.length;i++){
		
		var seqnum = seq + 1;
		var resultArray1 = new Array();
		resultArray1.push("");
		resultArray1.push(seqnum);
		resultArray1.push(records[i].recordName);
		resultArray1.push(records[i].recordDate);
		resultArray1.push(records[i].recordVersioNo);
		resultArray1.push(records[i].projectName);
		resultArray1.push(records[i].recordStatus);
		resultArray1.push(seq);
		resultArray.push(resultArray1);		
		seq++;
	}
	var viewOrderStatusesTable = '';
	
	$(".sectionMarginSecond").css("display","block");
	$("#first_row").css("display","block");
	var sequence_no=0;
	$("#search_table").empty();
	$("#search_table").append('<table class="table table-bordered table-striped searchRecTable" style="table-layout: fixed;" data-table-name="order-status-table"><thead><tr><th style="width:3%;"></th><th>S.No</th><th>Name</th> <th>Date</th> <th>Version</th><th>Project Name</th> <th>Status</th></tr></thead><tbody></tbody></table>');
	$("table[data-table-name='order-status-table']>tbody").html("");
	
	viewOrderStatusesTable= $("table[data-table-name='order-status-table']").iidsBasicDataGrid({
	'isResponsive' : true,
	'useFloater' : false,
	"bAutoWidth" : false,				
	"bDestroy" : true,
	"bAutoWidth" : false,
	"aaSorting": [],
	"aaData" : resultArray,
	"aoColumns":[{"sTitle": ""},
				 {"sTitle": "S.No"},
				 {"sTitle": "Name"},
				 {"sTitle": "Date"},
				 {"sTitle": "Version"},
				 {"sTitle": "Project Name"},
				 {"sTitle": "Status"}],
				 "fnRowCallback": function( nRow, aData, iDisplayIndex,k) {							
					var showHideHtml = "<a><i class='icon-plus' id='showHideId' data-orderno='"+aData[7]+"'></i> </a>"
					$('td:eq(0)', nRow).html(showHideHtml);	
				 }
	});
	viewOrderStatusesTable = $("table[data-table-name='order-status-table']").dataTable();
		 $('[rel=tooltip]').tooltip({
	         container: 'body'
	     });
		 selectOnlyOneRow(); 
	viewOrderStatusesTable.$('tr').on("click", function(event){
		var showHideId = $(event.target).attr("id");
		var recno = $(event.target).attr("data-orderno");
		var sections = records[recno].searchSectionDetails;
		var sectionDetails = iterateSections(sections);
		
		if(showHideId == 'showHideId') {
			
			if ( viewOrderStatusesTable.fnIsOpen(this) ) {
				viewOrderStatusesTable.fnClose( this );
				$(event.target).attr("class",'icon-plus'); //Close icon
			} else {
			
				var rows = $(".searchRecTable").dataTable().fnGetNodes();
				for(var i=0;i<rows.length;i++) {
				
					if(viewOrderStatusesTable.fnIsOpen(rows[i])){
						viewOrderStatusesTable.fnClose(rows[i]);
						$(rows[i]).find('td:eq(0)').find('a i').attr('class','icon-plus'); //Close icon in all row
					}
				}
				
				var subColData = '';
				$(event.target).attr("class",'icon-minus');
				var subLineTable = "<table class='table table-bordered table-striped sub' data-table-name='suborderstatustable' style='white-space:normal; width:100% !important'><thead> <th style='background-color:#0042C5'></th><th style='background-color:#0042C5'></th><th style='background-color:#0042C5'></th><th style='background-color:#0042C5'></th><th style='background-color:#0042C5'></th><th style='background-color:#0042C5'></th> </thead><tbody></tbody></table>";
				var collapseDivHtml = '<div class="subOrderTableId"> '+subLineTable+' </div>';
				viewOrderStatusesTable.fnOpen( this, collapseDivHtml , "info_row" );
				
				$subOrderStatusTable= $("table[data-table-name='suborderstatustable']").iidsBasicDataGrid({
								'isResponsive' : true,
								'useFloater' : false,
								"bDestroy" : true,
								"bInfo": false,
								"scrollY":200,
								"bAutoWidth": false, 
								"bFilter": false,
								"bPaginate": false,
								"aaSorting": [],
								"aaData": sectionDetails,
						        "aoColumns":  [{"sTitle": "Section"},
						        			  {"sTitle": "Step"},
						                      {"sTitle": "Q.No"},
						                      {"sTitle": "Question"},
						                      {"sTitle": "Answer"},						                      
						                      {"sTitle": "Comments"}],

						        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {									
								},
								"fnDrawCallback": function ( oSettings ) {
								}				
							});
							
							$subOrderStatusTable = $("table[data-table-name='suborderstatustable']").dataTable();
			}
		}
	});	
	
	selectOnlyOneRow();
	checkTableRowSelection();
}

function iterateSections(sections) {

	var aar = new Array();
	for (var i = 0; i < sections.length; i++) {
	
		var steps = sections[i].searchStepDetails;
		var sectionName = sections[i].sectionName; 
		for (var j = 0; j < steps.length; j++) {
		
			var ques = steps[j].searchQuestDetails;
			var stepName = steps[j].stepName; 
			for (var k = 0; k < ques.length; k++) {
			
				var aar1 = new Array();
				aar1.push(sectionName);
				aar1.push(stepName);
				aar1.push(ques[k].questionOrder);
				aar1.push(ques[k].questionName);
				aar1.push(ques[k].answerName);
				aar1.push(ques[k].comments);
				aar.push(aar1);
			}
		}
	}
	return aar;
}

$(document).on("click", ".checkIDIcon_", function(e) {

	if ($("#" + this.id).hasClass('icon-caret-right')) {
		$("#" +  this.id).removeClass("icon-caret-right").addClass("icon-caret-down");
		$("#innerTable1_" + this.id.replace('collapseIcon1_','')).css("display", "block");
	} else {
		$("#" + this.id).removeClass("icon-caret-down").addClass("icon-caret-right");
		$("#innerTable1_" + this.id.replace('collapseIcon1_','')).css("display", "none");
	}
});
 
$(document).on('click', '.exportToExcel_', function() {

	startiLoaderSpiner();
	$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
	var link = $(this);
	var checkListName=$("#ck_name").val();
	var versionNumber=$("#version").val();
	var fromDate=$("#date_from").val();
	var toDate=$("#date_to").val();	
	var projectId=$('#turbine_id').find('option:selected').attr('id');
	var excelJson={"formId":"354","formName":checkListName,"formVersionNo":versionNumber,"formLanguage":"English","fromDate":fromDate,"toDate":toDate,"submittedBy": $("#sso").val(),"projectId":projectId};
	var jsonfy = $.toJSON(excelJson);
	var serverbaseUrl = getServerPath();
	
	$.ajax({
		type: "POST",
		url: serverbaseUrl + Application.checklistServices.exportxls,
		data: jsonfy, 
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		complete: function() {
			callDownloadServices();
		}
	});
});

function callDownloadServices() {    		
	showExportPopup();
}

function showExportPopup() {

	stopiLoaderSpiner();
	$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
   var serverbaseUrl = getServerPath();

  $('#downloadFrame').remove(); // This shouldn't fail if frame doesn't exist
  $('body').append('<iframe id="downloadFrame" style="display:none"></iframe>');
  $('#downloadFrame').attr('src',serverbaseUrl + "exportxls\\" + $("#sso").val());
}
