/*************Searching of Checklist*********************/
var sessionForm=new Array();
function searchcriteria() {
	
    var accessToken = $("#accessToken").val();
    var checklistTitle = $('#clmn_name option:selected').val();

    var searchKey = $.trim($("#kwd_search").val());
    
	if (searchKey == '.') {
		searchKey = '%2E';
	}

    $("#searchgrid").attr("disabled", true);
    
    if (searchKey != "") {
    	
        $("#searchgrid").attr("disabled", true);
        
        if ($('#tablesearch_wrapper').children().length == 0) {
        	sessionForm=[];
        	 sessionForm= sessionStorage.getItem("formIds");
            $("#searchgrid").attr("disabled", true);
            var ssoId = $("#sso").val();
            var roleuser = sessionStorage.getItem("role");
            var serverbaseUrl = getServerPath();
            
            $.ajax({
                type: "POST",
                dataType: "json",
                global: false,
                contentType: "application/json; charset=utf-8",
                url: serverbaseUrl + Application.deshboardServices.searchChecklistForm + "/" + ssoId + "/" + roleuser + "/" + encodeURIComponent(searchKey) + "/" + checklistTitle,
                success: function(response) {

                    sessionStorage.setItem("searchres", JSON.stringify(response));
                    var jsonValue = JSON.stringify(response);
                    var JSONObject = JSON.parse(jsonValue);
                    var dataArray = [];
                    var dataArrayS = [];
                    var formIds = new Array();
                    for (var key in JSONObject) {
                    	
                    	var checklistVersion = 'Draft';
                    	
                    	if (JSONObject[key]["formStatus"] === 'Draft') {
                    		checklistVersion = JSONObject[key]["draftVersion"];
                    	} else {
                    		checklistVersion = JSONObject[key]["publishVersion"];
                    	}

                    	
                        if (JSONObject.hasOwnProperty(key) && roleuser == "SuperUser") {

                            dataArray.push(JSONObject[key][""]);
                            dataArray.push(JSONObject[key]["formName"]);
                            dataArray.push(JSONObject[key]["formLanguage"]);
                            dataArray.push(JSONObject[key]["authorname"]);
                            dataArray.push(JSONObject[key]["functionName"]);
                            dataArray.push(JSONObject[key]["createDate"]);
                            dataArray.push(checklistVersion);
                            dataArray.push(JSONObject[key]["formStatus"]);
                            dataArray.push(JSONObject[key][""]);
                            dataArrayS.push((dataArray));
                            dataArray = [];
                        } else {

                            dataArray.push(JSONObject[key][""]);
                            dataArray.push(JSONObject[key]["formName"]);
                            dataArray.push(JSONObject[key]["formLanguage"]);
                            dataArray.push(JSONObject[key]["authorname"]);
                            //dataArray.push(JSONObject[key]["functionName"]); 
                            dataArray.push(JSONObject[key]["createDate"]);
                            dataArray.push(checklistVersion);
                            dataArray.push(JSONObject[key]["formStatus"]);
                            dataArray.push(JSONObject[key][""]);
                            dataArrayS.push((dataArray));
                            dataArray = [];
                        }
                        
                        var formId = JSONObject[key]["formId"];
                        formIds.push(formId);
                    }
                    
                    sessionStorage.setItem("formIds", formIds);
                    initDatagridpagesearch(dataArrayS);
                    $("#searchgrid").attr("disabled", false);
                },

                error: function(jqXHR, textStatus, errorThrown) {
                },
                Complete: function() {},
            });
        } else {
        	sessionForm=[];
       	 	sessionForm= sessionStorage.getItem("formIds");
            $("#searchgrid").attr("disabled", true);
            $('#tablesearch_wrapper:last-child').before().hide();
            var accessToken = $("#accessToken").val();
            var ssoId = $("#sso").val();
            var roleuser = sessionStorage.getItem("role");
            var serverbaseUrl = getServerPath();
            
            $.ajax({
                type: "POST",
                dataType: "json",
                global: false,
                contentType: "application/json; charset=utf-8",
                url: serverbaseUrl + Application.deshboardServices.searchChecklistForm + "/" + ssoId + "/" + roleuser + "/" + encodeURIComponent(searchKey) + "/" + checklistTitle,
                success: function(response) {

                    sessionStorage.setItem("searchres", JSON.stringify(response));
                    var jsonValue = JSON.stringify(response);

                    var JSONObject = JSON.parse(jsonValue);
                    var dataArray = [];
                    var dataArrayS = [];
                    var formIds = new Array();
                    
                    for (var key in JSONObject) {
                    	
                    	var checklistVersion = 'Draft';
                    	
                    	if (JSONObject[key]["formStatus"] === 'Draft') {
                    		checklistVersion = JSONObject[key]["draftVersion"];
                    	} else {
                    		checklistVersion = JSONObject[key]["publishVersion"];
                    	}

                    	
                        if (JSONObject.hasOwnProperty(key) && roleuser == "SuperUser") {

                            dataArray.push(JSONObject[key][""]);
                            dataArray.push(JSONObject[key]["formName"]);
                            dataArray.push(JSONObject[key]["formLanguage"]);
                            dataArray.push(JSONObject[key]["authorname"]);
                            dataArray.push(JSONObject[key]["functionName"]);
                            dataArray.push(JSONObject[key]["createDate"]);
                            dataArray.push(checklistVersion);
                            dataArray.push(JSONObject[key]["formStatus"]);
                            dataArray.push(JSONObject[key][""]);
                            dataArrayS.push((dataArray));
                            dataArray = [];
                        } else {

                            dataArray.push(JSONObject[key][""]);
                            dataArray.push(JSONObject[key]["formName"]);
                            dataArray.push(JSONObject[key]["formLanguage"]);
                            dataArray.push(JSONObject[key]["authorname"]);
                            //dataArray.push(JSONObject[key]["functionName"]); 
                            dataArray.push(JSONObject[key]["createDate"]);
                            dataArray.push(checklistVersion);
                            dataArray.push(JSONObject[key]["formStatus"]);
                            dataArray.push(JSONObject[key][""]);
                            dataArrayS.push((dataArray));
                            dataArray = [];
                        }
                        
                        var formId = JSONObject[key]["formId"];
                        formIds.push(formId);
                    }

                    sessionStorage.setItem("formIds", formIds);
                    initDatagridpagesearch(dataArrayS);
                    $("#searchgrid").attr("disabled", false);
                },

                error: function(jqXHR, textStatus, errorThrown) {
                },
                Complete: function() {},
            });
        }
    } else {
    	 sessionStorage.setItem("formIds", sessionForm);
        $("#searchgrid").attr("disabled", false);
        $('#tablesearch_wrapper:nth-child(n)').hide();
        $('#my-table_wrapper').show();

    }
}

function initDatagridpagesearch(result1) {
	$('#tablesearch_wrapper').remove();
    $('#my-table_wrapper').hide();
    $('#dashboardcontent .sectionMargin').append('<table id="tablesearch" cellpadding="0" cellspacing="0" border="0" class="table table-bordered dashTable" data-table-name="dt-search"></table>');
    $('table[data-table-name="dt-search"]').iidsBasicDataGrid({

        'aoColumns': [{
                'sTitle': ''
            }, {
                'sTitle': 'Checklist Name'
            }, {
                'sTitle': 'Language'
            }, {
                'sTitle': 'Author'
            }, {
                'sTitle': 'Function'
            }, {
                'sTitle': 'Created Date'
            }, {
                'sTitle': 'Version'
            }, {
                'sTitle': 'Status'
            }, {
                'sTitle': 'Actions'
            }

        ],

        //'clear':true,
        'aaData': result1,

        'sAjaxDataProp': '',
        'useFloater': false,
        //'isResponsive': true,
        'excludes': {
            'phone': true
        },
        //'searchable': false,
        'orderable': false,
        'targets': 0,
        'order': [
            [1, 'asc']
        ],
        'sort': false,
        'fnRowCallback': function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            $('td:eq(0)', nRow).html(iDisplayIndexFull + 1);
        }
    });
    populategrid();
    deletechecklist();
    editCheckList();
    selectOnlyOneRow();
}

function populategrid() {
	
    if (roleuser != "SuperUser") {
    	
        $('#tablesearch tbody tr td:nth-child(9)').remove();
        $('#tablesearch thead th:nth-child(5)').hide();
        $('#tablesearch tbody tr td:nth-child(8)').append('<i class="fa fa-pencil-square-o" style="padding-right: 15px;font-size: 18px;"></i><i class="fa fa-trash-o" style="font-size: 18px;"></i>');
        $('#tablesearch_length select').on('change', function() {
            $('#tablesearch tbody tr td:nth-child(9)').remove();
            $('#tablesearch tbody tr td:nth-child(8)').empty();
            $('#tablesearch tbody tr td:nth-child(8)').append('<i class="fa fa-pencil-square-o" style="padding-right: 15px;font-size: 18px;"></i><i class="fa fa-trash-o" style="font-size: 18px;"></i>');
        });
        $('#tablesearch_paginate ul').on('click', 'li', function() {
            if ($(this).is(':first-child')) {
            } else {
                if ($(this).is(':hidden')) {
                    $('#tablesearch tbody tr td:nth-child(8)').empty();
                    $('#tablesearch tbody tr td:nth-child(8)').append('<i class="fa fa-pencil-square-o" style="padding-right: 15px;font-size: 18px;"></i><i class="fa fa-trash-o" style="font-size: 18px;"></i>');
                    $('#tablesearch tbody tr td:nth-child(9)').hide();
                } else {
                }
            }
        });
    } else {
        $('#tablesearch tbody tr td:nth-child(9)').append('<i class="fa fa-pencil-square-o" style="padding-right: 15px;font-size: 18px;"></i><i class="fa fa-trash-o" style="font-size: 18px;"></i>');
        $('#tablesearch_length select').on('change', function() {
            $('#tablesearch tbody tr td:nth-child(9)').empty();
            $('#tablesearch tbody tr td:nth-child(9)').append('<i class="fa fa-pencil-square-o" style="padding-right: 15px;font-size: 18px;"></i><i class="fa fa-trash-o" style="font-size: 18px;"></i>');
        });
        $('#tablesearch_paginate ul').on('click', 'li', function() {
            if ($(this).is(':first-child')) {
            } else {
                if ($(this).is(':hidden')) {
                    $('#tablesearch tbody tr td:nth-child(9)').empty();
                    $('#tablesearch tbody tr td:nth-child(9)').append('<i class="fa fa-pencil-square-o" style="padding-right: 15px;font-size: 18px;"></i><i class="fa fa-trash-o" style="font-size: 18px;"></i>');
                } else {
                }
            }
        });
    }
}
