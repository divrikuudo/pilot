function updatedPageChecklist() {
    var accessToken = $("#accessToken").val();
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
            updateDatagridpage(dataArrayO);
        },

        error: function() {},
        Complete: function() {},
    });
}

function updateDatagridpage(result) {
	stopiLoaderSpiner();
	$('.container').css({'opacity': '1', 'position': 'relative','z-index': '0'});
	$('#tablesearch_wrapper').remove();
	$('#my-table_wrapper').remove();
    $('#dashboardcontent .sectionMargin').append('<table id="my-table" cellpadding="0" cellspacing="0" border="0" class="table table-bordered dashTable" data-table-name="dt-dom"></table>');
    $('table[data-table-name="dt-dom"]').iidsBasicDataGrid({

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
        'isResponsive': true,
        'excludes': {
            'phone': true
        },
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
    populateActions();
    deletechecklist();
    editCheckList();
    selectOnlyOneRow();
}
