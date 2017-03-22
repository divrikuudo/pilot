function pagechecklist() {
	//var accessToken = $("#accessToken").val();
	roleuser = sessionStorage.getItem('role');
	var serverbaseUrl = getServerPath();
	$.ajax({
		type: "POST",
		global: false,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		url: serverbaseUrl + Application.deshboardServices.pageChecklist + "/" + ssoId + "/" + roleuser,
		success: function(response) {
			sessionStorage.setItem("com.ge.smartoutage.homepage", JSON.stringify(response));
			var jsonVal = JSON.stringify(response);
			var JSONObject = JSON.parse(jsonVal);
			var dataArray = [];
			var dataArrayO = [];
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
					dataArrayO.push((dataArray));
					dataArray = [];
				} else {
					dataArray.push(JSONObject[key][""]);
					dataArray.push(JSONObject[key]["formName"]);
					dataArray.push(JSONObject[key]["formLanguage"]);
					dataArray.push(JSONObject[key]["authorname"]);
					dataArray.push(JSONObject[key]["createDate"]);
					dataArray.push(checklistVersion);
					dataArray.push(JSONObject[key]["formStatus"]);
					dataArray.push(JSONObject[key][""]);
					dataArrayO.push((dataArray));
					dataArray = [];
				}
				var formId = JSONObject[key]["formId"];
				formIds.push(formId);
			}
			var formId = JSONObject[key]["formId"];
			sessionStorage.setItem("formId", formId);
			sessionStorage.setItem("formIds", formIds);
			initDatagridpage(dataArrayO);
		},
		error: function() {},
		Complete: function() {},
	});
}
function initDatagridpage(result) {
	var grid = $('table[data-table-name="dt-dom"]').iidsBasicDataGrid({
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
		},

		],
		'aaData': result,
		'sAjaxDataProp': '',
		'useFloater': false,
		'excludes': {
			'phone': true
		},
		'orderable': false,
		'targets': 0,
		'order': [[1, 'asc']],
		'sort': true,
		          /**'fnDrawCallback':function(nRow, aData, iDisplayIndex){
                $("td:first", nRow).html(iDisplayIndex +1);
               return nRow;
            }**/
		          'fnRowCallback': function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		        	  $('td:eq(0)', nRow).html(iDisplayIndexFull + 1);
		          }
	});
	

    
	populateActions();
	deletechecklist();
	editCheckList();
	selectOnlyOneRow();
	$("#tablesearch_wrapper").empty();
	$("#kwd_search").val("");
}

function populateActions() {
	if (roleuser != "SuperUser") {
		if ($('#my-table tbody tr td').is(':last-child')) {
			$('#my-table tbody tr td:last-child').remove();
		}
		$('#my-table thead th:nth-child(5)').hide();
		$('#my-table tbody tr td:nth-child(8)').append('<i class="fa fa-pencil-square-o" style="padding-right: 15px;font-size: 18px;"></i><i class="fa fa-trash-o" style="font-size: 18px;"></i>');
		$('#my-table_length select').on('change', function() {
			$('#my-table tbody tr td:nth-child(9)').remove();
			$('#my-table tbody tr td:nth-child(8)').empty();
			$('#my-table tbody tr td:nth-child(8)').append('<i class="fa fa-pencil-square-o" style="padding-right: 15px;font-size: 18px;"></i><i class="fa fa-trash-o" style="font-size: 18px;"></i>');
		});
		$('#my-table_paginate ul').on('click', 'li', function() {
			if ($(this).is(':first-child')) {

			} else {
				if ($(this).is(':hidden')) {
					$('#my-table tbody tr td:nth-child(8)').empty();
					$('#my-table tbody tr td:nth-child(8)').append('<i class="fa fa-pencil-square-o" style="padding-right: 15px;font-size: 18px;"></i><i class="fa fa-trash-o" style="font-size: 18px;"></i>');
					$('#my-table tbody tr td:nth-child(9)').hide();
				} else {
				}
			}
		});
	} else {
		$('#my-table tbody tr td:nth-child(9)').append('<i class="fa fa-pencil-square-o" style="padding-right: 15px;font-size: 18px;"></i><i class="fa fa-trash-o" style="font-size: 18px;"></i>');
		$('#my-table_length select').on('change', function() {
			$('#my-table tbody tr td:nth-child(9)').empty();
			$('#my-table tbody tr td:nth-child(9)').append('<i class="fa fa-pencil-square-o" style="padding-right: 15px;font-size: 18px;"></i><i class="fa fa-trash-o" style="font-size: 18px;"></i>');
		});
		$('#my-table_paginate ul').on('click', 'li', function() {
			if ($(this).is(':first-child')) {
			} else {
				if ($(this).is(':hidden')) {
					$('#my-table tbody tr td:nth-child(9)').empty();
					$('#my-table tbody tr td:nth-child(9)').append('<i class="fa fa-pencil-square-o" style="padding-right: 15px;font-size: 18px;"></i><i class="fa fa-trash-o" style="font-size: 18px;"></i>');
				} else {
				}
			}
		});
	}
	stopiLoaderSpiner();
	$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
	$("#checklistManagement").parent().attr("class","active");	 
}