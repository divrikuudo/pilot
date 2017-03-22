$(document).ready(function () {
    var $s = $('#clmn_name').on('change', filter);
    var $i = $("#kwd_search").on('keyup', filter);
    var $rows = $("#my-table tbody > tr");
    
    function filter() {
        var index = $s.prop('selectedIndex');
        var term = $.trim($i.val().toLowerCase());
        if (term.length === 0) {
            $rows.show();
            return;
        }

        $rows.hide().filter(function () {
            return this.cells[index].textContent.toLowerCase().indexOf(term) > -1;
        }).show();

    };
});