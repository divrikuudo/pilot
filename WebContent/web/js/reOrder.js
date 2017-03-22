var flagEle = 0;
var flag = 0;
var reOrderFlag=0;
var swapFlag=0;
function allowDrop(ev) {
	ev.preventDefault();
	if (flagEle == 1) {
		flag = 0;
		$('#quesAddImageMainDiv').on('drop', function() {
			flag = 0;
		});
		$('.dropdown').on('drop', function() {
			flag = 1;
		});
		$('.textarea').on('drop', function() {
			flag = 1;
		});
		$('.imageupload').on('drop', function() {
			flag = 1;
		});
		$('.date_Picker').on('drop', function() {
			flag = 1;
		});
		$('.button').on('drop', function() {
			flag = 1;
		});
		$('.radio_button').on('drop', function() {
			flag = 1;
		});
		$('.check_BOX').on('drop', function() {
			flag = 1;
		});
		$('.textbox').on('drop', function() {
			flag = 1;
		});
		$('.signature').on('drop', function() {
			flag = 1;
		});
		$('.labelClass').on('drop', function() {
			flag = 1;
		});
	}
	else if(reOrderFlag==1){
		$('.maindiv').on('drop', function() {
			if(swapFlag==1){
				flag=1;
			}
			else{
				flag=0;
			}
		});
	}
}
function drag(ev, num) {
	ev.dataTransfer.setData("src", ev.target.id);
	var id=ev.target.id.split("_");
	if ("ansDate"== id[0]|| "ansBtn"  == id[0]|| "txtAreaAns" == id[0] || "ansImgUploadMainDiv" == id[0] || "ansDrpDown"== id[0] || "ansRadioBtn"  == id[0] ||"anscheckBox" == id[0]  || "textBox" == id[0] || "textBox" == id[0] ||"ansSignature" ==id[0] || "anslabel"== id[0]) {
		flagEle = 1;
	}else if("drag"==id[0]){
		reOrderFlag=1;
		swapFlag=1;
	} 
}
function dropping(ev) {
    ev.preventDefault();
    if (flag == 1 ) {
        var src = document.getElementById(ev.dataTransfer.getData("src"));
        var srcParent = src.parentNode;
        var tgt = ev.currentTarget.firstElementChild;
        ev.currentTarget.replaceChild(src, tgt);
        srcParent.appendChild(tgt);
        flag = 0;
        flagEle = 0;
        reOrderFlag=0;swapFlag=0;
    }
  
    flag = 0;
    flagEle = 0;
    reOrderFlag=0;
}