/*************Checklist Delete Functionality*********************/
function deletechecklist() {
	//var accessToken = $("#accessToken").val();
	$(".fa-trash-o").click(function() {
		if (roleuser != "SuperUser") {
			if ($(this).parent().parent().find('td:nth-child(7)').text() == "Draft") {
				var ele = $(this).parent().parent().find('td:nth-child(1)').text();
				var formId = sessionStorage.getItem("formIds").split(',')[ele -1];
				$("#deletePopup").modal();
				$(".confirmdelete").click(function() {
					startiLoaderSpiner();
					$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
					var serverbaseUrl = getServerPath();
					$.ajax({
						type: "POST",
						global: false,
						dataType: "json",
						contentType: "application/json; charset=utf-8",
						url: serverbaseUrl + Application.deshboardServices.deleteChecklist + "/" + formId,
						success: function(response) {                        	
							updatedPageChecklist();
						},
						error: function() {
							stopiLoaderSpiner();
						},
						Complete: function() {},
					});
				});
			} else {
				$('#deleteMsgPopup').modal();
			}
		} else {
			if ($(this).parent().parent().find('td:nth-child(8)').text() == "Draft") {
				var ele = $(this).parent().parent().find('td:nth-child(1)').text();
				var formId = sessionStorage.getItem("formIds").split(',')[ele -1];
				$("#deletePopup").modal();
				$(".confirmdelete").click(function() {
					startiLoaderSpiner();
					$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
					var param1 = {
							serviceName: "deleteChecklist"
					};
					var serverbaseUrl = getServerPath();
					$.ajax({
						type: "POST",
						global: false,
						dataType: "json",
						contentType: "application/json; charset=utf-8",
						url: serverbaseUrl + Application.deshboardServices.deleteChecklist + "/" + formId,
						success: function(response) {
							updatedPageChecklist();
						},
						error: function() {
							stopiLoaderSpiner();
						},
						Complete: function() {},
					});
				});
			} else {
				$('#deleteMsgPopup').modal();
			}
		}
	});
	$('#my-table_length select').on('change', function() {
		$(".fa-trash-o").click(function() {
			if (roleuser != "SuperUser") {
				if ($(this).parent().parent().find('td:nth-child(7)').text() == "Draft") {
					var ele = $(this).parent().parent().find('td:nth-child(1)').text();
					var formId = sessionStorage.getItem("formIds").split(',')[ele -1];
					$("#deletePopup").modal();
					$(".confirmdelete").click(function() {
						startiLoaderSpiner();
						$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
						var serverbaseUrl = getServerPath();
						$.ajax({
							type: "POST",
							global: false,
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: serverbaseUrl + Application.deshboardServices.deleteChecklist + "/" + formId,
							success: function(response) {
								updatedPageChecklist();
							},
							error: function() {
								stopiLoaderSpiner();
							},
							Complete: function() {},
						});
					});
				} else {
					$('#deleteMsgPopup').modal();
				}
			} else {
				if ($(this).parent().parent().find('td:nth-child(8)').text() == "Draft") {
					var ele = $(this).parent().parent().find('td:nth-child(1)').text();
					var formId = sessionStorage.getItem("formIds").split(',')[ele -1];
					$("#deletePopup").modal();
					$(".confirmdelete").click(function() {
						startiLoaderSpiner();
						$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
						var serverbaseUrl = getServerPath();
						$.ajax({
							type: "POST",
							global: false,
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: serverbaseUrl + Application.deshboardServices.deleteChecklist + "/" + formId,
							success: function(response) {
								updatedPageChecklist();
							},
							error: function() {
								stopiLoaderSpiner();
							},
							Complete: function() {},
						});
					});
				} else {
					$('#deleteMsgPopup').modal();
				}
			}
		});
	});
	$('#my-table_paginate ul').on('click', 'li', function() {
		$(".fa-trash-o").click(function() {
			if (roleuser != "SuperUser") {
				if ($(this).parent().parent().find('td:nth-child(7)').text() == "Draft") {
					var ele = $(this).parent().parent().find('td:nth-child(1)').text();
					var formId = sessionStorage.getItem("formIds").split(',')[ele -1];
					$("#deletePopup").modal();
					$(".confirmdelete").click(function() {
						startiLoaderSpiner();
						$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
						var serverbaseUrl = getServerPath();
						$.ajax({
							type: "POST",
							global: false,
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: serverbaseUrl + Application.deshboardServices.deleteChecklist + "/" + formId,
							success: function(response) {
								updatedPageChecklist();
							},
							error: function() {
								stopiLoaderSpiner();
							},
							Complete: function() {},
						});
					});
				} else {
					$('#deleteMsgPopup').modal();
				}
			} else {
				if ($(this).parent().parent().find('td:nth-child(8)').text() == "Draft") {
					var ele = $(this).parent().parent().find('td:nth-child(1)').text();
					var formId = sessionStorage.getItem("formIds").split(',')[ele -1];
					$("#deletePopup").modal();
					$(".confirmdelete").click(function() {
						startiLoaderSpiner();
						$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
						var serverbaseUrl = getServerPath();
						$.ajax({
							type: "POST",
							global: false,
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: serverbaseUrl + Application.deshboardServices.deleteChecklist + "/" + formId,
							success: function(response) {
								updatedPageChecklist();
							},
							error: function() {
								stopiLoaderSpiner();
							},
							Complete: function() {},
						});
					});
				} else {
					$('#deleteMsgPopup').modal();
				}
			}
		});
		selectOnlyOneRow();
	});
    $('#tablesearch_length select').on('change', function() {
    	$(".fa-trash-o").click(function() {
    		if (roleuser != "SuperUser") {
    			if ($(this).parent().parent().find('td:nth-child(7)').text() == "Draft") {
    				var ele = $(this).parent().parent().find('td:nth-child(1)').text();
    				var formId = sessionStorage.getItem("formIds").split(',')[ele -1];
    				$("#deletePopup").modal();
    				$(".confirmdelete").click(function() {
    					startiLoaderSpiner();
    					$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
    					var serverbaseUrl = getServerPath();
    					$.ajax({
    						type: "POST",
    						global: false,
    						dataType: "json",
    						contentType: "application/json; charset=utf-8",
    						url: serverbaseUrl + Application.deshboardServices.deleteChecklist + "/" + formId,
    						success: function(response) {
    							updatedPageChecklist();
    						},
    						error: function() {
    							stopiLoaderSpiner();
    						},
    						Complete: function() {},
    					});
    				});
    			} else {
    				$('#deleteMsgPopup').modal();
    			}
    		} else {
    			if ($(this).parent().parent().find('td:nth-child(8)').text() == "Draft") {
    				var ele = $(this).parent().parent().find('td:nth-child(1)').text();
    				var formId = sessionStorage.getItem("formIds").split(',')[ele -1];
    				$("#deletePopup").modal();
    				$(".confirmdelete").click(function() {                    	
    					startiLoaderSpiner();
    					$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
    					var serverbaseUrl = getServerPath();
    					$.ajax({
    						type: "POST",
    						global: false,
    						dataType: "json",
    						contentType: "application/json; charset=utf-8",
    						url: serverbaseUrl + Application.deshboardServices.deleteChecklist + "/" + formId,
    						success: function(response) {
    							updatedPageChecklist();
    						},
    						error: function() {
    							stopiLoaderSpiner();
    						},
    						Complete: function() {},
    					});
    				});
    			} else {
    				$('#deleteMsgPopup').modal();
    			}
    		}
    	});
    	selectOnlyOneRow();
    });
    $('#tablesearch_paginate ul').on('click', 'li', function() {
    	$(".fa-trash-o").click(function() {
    		if (roleuser != "SuperUser") {
    			if ($(this).parent().parent().find('td:nth-child(7)').text() == "Draft") {
    				var ele = $(this).parent().parent().find('td:nth-child(1)').text();
    				var formId = sessionStorage.getItem("formIds").split(',')[ele -1];
    				$("#deletePopup").modal();
    				$(".confirmdelete").click(function() {
    					startiLoaderSpiner();
    					$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
    					var serverbaseUrl = getServerPath();
    					$.ajax({
    						type: "POST",
    						global: false,
    						dataType: "json",
    						contentType: "application/json; charset=utf-8",
    						url: serverbaseUrl + Application.deshboardServices.deleteChecklist + "/" + formId,
    						success: function(response) {
    							updatedPageChecklist();
    						},
    						error: function() {
    							stopiLoaderSpiner();
    						},
    						Complete: function() {},
    					});
    				});
    			} else {
    				$('#deleteMsgPopup').modal();
    			}
    		} else {
    			if ($(this).parent().parent().find('td:nth-child(8)').text() == "Draft") {
    				var ele = $(this).parent().parent().find('td:nth-child(1)').text();
    				var formId = sessionStorage.getItem("formIds").split(',')[ele -1];
    				$("#deletePopup").modal();
    				$(".confirmdelete").click(function() {
    					startiLoaderSpiner();
    					$('.container').css({'opacity': '0.3', 'position': 'relative','z-index': '-1'});
    					var serverbaseUrl = getServerPath();
    					$.ajax({
    						type: "POST",
    						global: false,
    						dataType: "json",
    						contentType: "application/json; charset=utf-8",
    						url: serverbaseUrl + Application.deshboardServices.deleteChecklist + "/" + formId,
    						success: function(response) {
    							updatedPageChecklist();
    						},
    						error: function() {
    							stopiLoaderSpiner();
    						},
    						Complete: function() {},
    					});
    				});
    			} else {
    				$('#deleteMsgPopup').modal();
    			}
    		}
    	});
    });
}