<div class="container mainContent" id="createchecklist">
	<section class="module sectionMargin">
		<div class="leftPanel">
			<div class="accordion marginB10" id="accordion">
				<div class="accordion-group">
					<div class="accordion-heading accordionHeader" id="devi" style="color:#FFFFFF;">
						<a class="accordion-toggle accrodionTitle" data-parent="#accordion" href="#collapseOne"> <span>Filter</span>
							<i class="accIcon icon-chevron-right pull-right"></i>
						</a>
					</div>
					<div id="collapseOne" class="accordion-body collapse notExpanded" style="  background-color: #414141;">
						<div class="accordion-inner">
							<label class="marginB0" style="  color: #FFFFFF; margin-left: 10px;">Sections</label> <select style="width: 200px; margin-left: 10px;" id="sections">
							</select> <label class="marginB0" style="  color: #FFFFFF; margin-left: 10px;">Steps</label> <select style="width: 200px; margin-left: 10px;" id="steps">
							</select> <label class="marginB0" style="  color: #FFFFFF; margin-left: 10px;">Questions</label> <select style="width: 200px; margin-left: 10px;" id="questions">
							</select>
							<div class="btnSection" style="margin-top: 10px;margin-left: 10px;padding-bottom: 10px;">
								<button class="btn" id="applyReset">Reset</button>
								<button class="btn btn-primary" id="applyFilter">Apply Filters</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="accordion-group">
				<div class="accordion-heading accordionHeader" style="background-color: #;">
					<a class="accordion-toggle accrodionTitle" data-parent="#accordion" href="#collapseTwo"> 
						<span style="color:#FFFFFF;">Form Control</span>
						<i class="accIcon icon-chevron-right pull-right" style="color:#FFFFFF;"></i>
					</a>
				</div>
				<div id="collapseTwo" class="accordion-body collapse notExpanded">
				
					<div class="accordion-group">
						<div class="accordion-heading accordionHeader" style="background-color: #1d1d1d;">
							<a class="accordion-toggle accrodionTitle" data-parent="#accordion" href="#collapseForForms"> 
								<span style="color:#FFFFFF;">Controls for Forms</span>
								<i class="accIcon icon-chevron-right pull-right" style="color:#FFFFFF;"></i>
							</a>
						</div>
						<div id="collapseForForms" class="accordion-body collapse notExpanded">
							<div class="ui-sortable-handle" id="addSection">
								<div class="FCBg addSection"></div>
							</div>
							<div class="ui-sortable-handle" id="addStep">
								<div class="FCBg addStep"></div>
							</div>
							<div class="ui-sortable-handle" id="addQues">
								<div class="FCBg addQues"></div>
							</div>
							<div class="ui-sortable-handle" id="addHelpImg">
								<div class="FCBg addHelpImg"></div>
							</div>
							<div class="ui-sortable-handle" id="addGuideImg">
								<div class="FCBg addGuideImg"></div>
							</div>
							
						</div>
					</div>
					
					<div class="accordion-group">
						<div class="accordion-heading accordionHeader" style="background-color: #1d1d1d;">
							<a class="accordion-toggle accrodionTitle" data-parent="#accordion" href="#collapseForQuestion"> 
								<span style="color:#FFFFFF;">Controls for Question</span>
								<i class="accIcon icon-chevron-right pull-right" style="color:#FFFFFF;"></i>
							</a>
						</div>
						<div id="collapseForQuestion" class="accordion-body collapse notExpanded">
							<div class="ui-sortable-handle" id="addImg">
								<div class="FCBg addImg"></div>
							</div>
							<div class="ui-sortable-handle" id="quesTxtArea">
								<div class="FCBg txtArea"></div>
							</div>
						</div>
					</div>
					<div class="accordion-group">
						<div class="accordion-heading accordionHeader" style="background-color: #1d1d1d;">
							<a class="accordion-toggle accrodionTitle" data-parent="#accordion" href="#collapseForAnswer"> 
								<span style="color:#FFFFFF;">Controls for Answer</span>
								<i class="accIcon icon-chevron-right pull-right" style="color:#FFFFFF;"></i>
							</a>
						</div>
						<div id="collapseForAnswer" class="accordion-body collapse notExpanded">
							<div class="ui-sortable-handle" id="ansImgUpload">
								<div class="FCBg imgUploadAnsr"></div>
							</div>
							<div class="ui-sortable-handle" id="ansTxtArea">
								<div class="FCBg txtAreaAnsr"> </div>
							</div>
							<div class="ui-sortable-handle" id="dropDown">
								<div class="FCBg drpDownAnsr"> </div>
							</div>
							<div class="ui-sortable-handle" id="datePickerAns">
								<div class="FCBg ansDatePicker"> </div>
							</div>
							 <!-- <div class="ui-sortable-handle" id="ansButn">
								<div class="FCBg btnAnsr"> </div>
							</div> -->
							 <div class="ui-sortable-handle" id="ckckBox">
								<div class="FCBg checkBoxAnsr"> </div>
							</div> 
							<div class="ui-sortable-handle" id="radioBtn">
								<div class="FCBg radioBtnAnsr"> </div>
							</div>
							<div class="ui-sortable-handle" id="ansTextBox">
								<div class="FCBg textBoxAnsr"> </div>
							</div>
							<div class="ui-sortable-handle" id="sign">
								<div class="FCBg signatureAnsr"> </div>
							</div>
							<!-- <div class="ui-sortable-handle" id="ansLabel">
								<div class="FCBg labelAnsr"> </div>
							</div> -->
						</div>
					</div>
					
					<div class="accordion-group">
						<div class="accordion-heading accordionHeader" style="background-color: #1d1d1d;">
							<a class="accordion-toggle accrodionTitle" data-parent="#accordion" href="#collapseForCustomized"> 
								<span style="color:#FFFFFF;">Customized Section</span>
								<i class="accIcon icon-chevron-right pull-right" style="color:#FFFFFF;"></i>
							</a>
						</div>
						<div id="collapseForCustomized" class="accordion-body collapse notExpanded">
							<div class="ui-sortable-handle" id="toDoList">
								<div class="FCBg "></div>
							</div>
							<div class="ui-sortable-handle" id="punchlist">
								<div class="FCBg "> </div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="rightPanel">
			<div class="rightPanelInner">
				<div class="CLMain">
					<div class="FSGDiv"></div>					
					<div class="CLName" id="CLName">
						<!-- <div class="CLName_innerDiv">
							<textarea  class="textareaVal dropTxtarea" style="  opacity: 1;" placeholder="Enter the name of the Checklist Here..." id="myTextArea"></textarea>
							<a rel="tooltip" title="Preview" ><img src="images/preview.png"></a>
							 <a rel="tooltip" title="Help" class="helpBtnIcon" onClick="showHelpFormImage();"><img src="images/help.png"></a>
							<a rel="tooltip" title="Add Section" class="addBtnIcon"><img src="images/add-section.png"></a>

							<a rel="tooltip" title="Edit" class="to_edit_form" ><img src="images/edit_1.png" id="editFormName"></a>
						</div> -->
					</div>
				</div>
				<div class="clearBoth"></div>
			</div>
			<div class="pull-right CLCBtnDiv" style="display:none;  margin-top: 90px;">
				<button type="button" class="btn btn-primary btnSaveDraft">Save Draft</button>
				
				<!-- button type="button"  class="btn CCBtnCancel">Cancel</button-->
			
			</div>
			<div class="pull-right backDiv" style="display:none;  margin-top: 71px;">
				<button type="button" class="btn backBtns" style="float:right;height:30px;width:60px;  margin-top:19px;">Back</button>
			</div>
			<div class="pull-right CLCBtnDiv_" style="display:none;  margin-top:92px;">
				<button type="button" class="btn btn-primary btnSaveDraft_">Save Draft</button>
			<div class="pull-right CLCBtnDiv12_" style="display:none;">
				<button type="button" class="btn btn-primary btnPublish" >Publish</button>
				<!-- button type="button"  class="btn CCBtnCancel_">Cancel</button-->	
				</div>			
			</div>
		</div>
	</section>
</div>
