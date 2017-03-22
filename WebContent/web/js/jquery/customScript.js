require(['iids','jquery','datepicker','datatables', 'dataTables-responsive', 'dataTables-bootstrap'],function() {
		
	$('.dataTable').DataTable( {
        responsive: true,
		bFilter:false,
		"sPaginationType": "bootstrap",
		"dom": 'rtl<"pull-right"ip>',
		"oLanguage": {
			"sInfo": '_START_ - _END_ of _TOTAL_',
			"sInfoEmpty": 'No entries to show',
			"sEmptyTable": "No Sources found currently, please add at least one.",
		},
		columnDefs: [{
				targets: "datatable-nosort",
				orderable: false
			}]
    } );
	
});		