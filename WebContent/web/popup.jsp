<div id="createchecklistPopup" class="modal hide fade"
	style="display: none; width: 500px; left: 34%;" aria-hidden="false">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">x</button>
		<h3>Create Form</h3>
	</div>
	<div class="modal-body"
		style="padding-top: 12px; padding-left: 22px; padding-right: 22px;">
		<div>
			<div class="add-rules-body">
				<div class="addRulesDiv">
					<span>Please select the business functional hierarchy to
						which this form belongs and will be displayed</span>
					<div class="accordion-inner">
						<table style="width: 100%;" id="createChecklistPopupTable">
							<tr>
								<td style="width: 50%; padding-top: 12px;">Function<span
									style="color: red; font-size: 22px; position: relative; top: 5px;">*</span></td>
								<td style="width: 50%; padding-top: 12px;">Sub Function <span
									style="color: red; font-size: 22px; position: relative; top: 5px;">*</span></td>
							</tr>
							<tr>
								<td style="padding-top: 10px;"><select id="function"
									style="width: 90%; border-radius: 0px !important;"><option>Select
											Function</option></select></td>
								<td style="padding-top: 10px;"><select id="subfunction"
									style="width: 98%; border-radius: 0px !important;"><option>Select
											SubFunction</option></select></td>
							<tr>
								<td style="width: 50%; padding-top: 12px;">Group<span
									style="color: red; font-size: 22px; position: relative; top: 5px;">*</span></td>
								<td style="padding-top: 12px;">Link to wind farm</td>
							</tr>
							<tr>
								<td style="padding-top: 10px;"><select id="group"
									style="width:90%; border-radius: 0px !important;"><option>Select
											Group</option></select></td>
								<td style="padding-top: 10px;"><input type="radio"
									name="project_value" value="Yes">Yes <input
									type="radio" name="project_value" value="No" checked>No</td>
							</tr>
							<tr>
								<td style="padding-top: 18px;">Please Enter the form detail</td>
							</tr>
							<tr>
								<td style="width: 50%; padding-top: 18px;">Form name<span
									style="color: red; font-size: 22px; position: relative; top: 5px;">*</span></td>
								<td style="width: 50%; padding-top: 18px;">Section name<span
									style="color: red; font-size: 22px; position: relative; top: 5px;">*</span></td>
							</tr>
							<tr>
								<td style="padding-top: 10px;"><input type="text"
									style="width: 82%; border-radius: 0px !important;" maxlength="100" id="frmName" /></td>
								<td style="padding-top: 10px;"><input type="text"
									style="width: 95%; border-radius: 0px !important;" maxlength="100"
									id="sectName" disabled="true" /></td>
							</tr>
							<tr>
								<td style="width: 50%; padding-top: 12px;">Step name<span
									style="color: red; font-size: 22px; position: relative; top: 5px;">*</span></td>
							</tr>
							<tr>
								<td style="padding-top: 10px;"><input type="text"
									style="width: 82%; border-radius: 0px !important;" maxlength="100"
									id="stepName" disabled="true" /></td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">
			<button type="button" class="btn btn-primary createChecklistBtn"
				 style="margin-right: 50px;">Next</button>
			<button type="button" class="btn cancel" data-dismiss="modal"
				style="margin-right: 35px;">Cancel</button>
		</div>
	</div>
</div>

<div id="logoutPopup" class="modal hide fade" style="display: none;"
	aria-hidden="false">

	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">x</button>
		<h3>Logout</h3>
	</div>
	<div class="modal-body">
		<div>
			<div class="add-rules-body">
				<div class="addRulesDiv">
					<span>Are you sure you want to logout ?</span>
				</div>
			</div>
		</div>
	</div>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">
			<button type="button" class="btn btn-primary confirm  pull-left"
				data-dismiss="modal">Okay</button>
			<button type="button" class="btn cancel" data-dismiss="modal">Cancel</button>
		</div>
	</div>

</div>

<div id="createChecklistErrorPopup" class="modal hide fade"
	style="display: none;" aria-hidden="false">

	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">x</button>
		<h3>Create Checklist</h3>
	</div>
	<div class="modal-body">
		<div>
			<div class="add-rules-body">
				<div class="addRulesDiv">
					<span>Error in Create Checklist. Please provide the valuable
						meta data information</span>
				</div>
			</div>
		</div>
	</div>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">
			<button type="button" class="btn cancel" data-dismiss="modal">Cancel</button>
		</div>
	</div>

</div>


<div id="sessionExpirePopup" class="modal hide fade"
	style="display: none;" aria-hidden="false">

	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">x</button>
		<h3>Session Expire</h3>
	</div>
	<div class="modal-body">
		<div>
			<div class="add-rules-body">
				<div id="sessionExpMsg" class="addRulesDiv"></div>
			</div>
		</div>
	</div>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">
			<button type="button"
				class="btn btn-primary confirm  pull-left sessionok"
				data-dismiss="modal">Okay</button>
			<button type="button" class="btn cancel sessionCancel"
				data-dismiss="modal">Cancel</button>
		</div>
	</div>

</div>


<div id="deletePopup" class="modal hide fade" style="display: none;"
	aria-hidden="false">

	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">x</button>
		<h3>Delete Checklist</h3>
	</div>
	<div class="modal-body">
		<div>
			<div class="add-rules-body">
				<div class="addRulesDiv">
					<span>Are you sure you want to delete this checklist?</span>
				</div>
			</div>
		</div>
	</div>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">
			<button type="button"
				class="btn btn-primary confirmdelete  pull-left"
				data-dismiss="modal">Okay</button>
			<button type="button" class="btn cancel" data-dismiss="modal">Cancel</button>
		</div>
	</div>

</div>

<div id="deleteMsgPopup" class="modal hide fade" style="display: none;"
	aria-hidden="false">

	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">x</button>
		<h3>Checklist</h3>
	</div>
	<div class="modal-body">
		<div>
			<div class="add-rules-body">
				<div class="addRulesDiv">
					<span>User can not delete approved checklist. User can
						delete draft mode checklist only</span>
				</div>
			</div>
		</div>
	</div>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">
			<button type="button" class="btn cancel" data-dismiss="modal">Cancel</button>
		</div>
	</div>

</div>


<!-- Add rules 	Popup-->

<div id="rulesPopup" class="modal hide fade" style="display: none;">
	<div class="modal-header"
		style="float: left; background-color: #fff; padding: 10px 10px 0px; width: 97.5%;"
		id="ruleHeader"></div>

	<div class="modal-body">
		<div class="modal_body_inner">
			<div class="modal-header">
				<h3>Rules</h3>
			</div>
			<div id="tableId"></div>
		</div>
	</div>
	<div class="modal-footer">
		<div class="modal_footer_innerDiv" id="footer_submit"></div>
	</div>
</div>

<!-- End of Add Rules Popup-->

<!--rules popup-->
<div id="addRulesPopup" class="modal12 hide fade"
	style="display: none; width: 475px; left: 35%;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">x</button>
		<div class="modal-header" style="padding: 0px;">
			<h3>Add Rules</h3>
		</div>
	</div>
	<div class="modal-body">
		<div>
			<ul>
				<li><label>Rule Category</label> <select id="rulesCategoryDD"></select>
				</li>
				<li><label>Rule Name</label> <select id="rulesNameDD"></select>
				</li>
				<li><label>Rule Description</label> <label id="rulesDesc"></label>
				</li>
				<li><label>Rule Formula</label> <label id="rulesFormula"></label>
				</li>
				<li><label>Rule Formula Data</label>
					<div id="rulesFormulaData"></div></li>
			</ul>
		</div>
	</div>
	<div class="modal-footer">
		<div class="modal_footer_innerDiv" id="saveAddRulesFooter"></div>
	</div>
</div>
<!--end of rules popup-->

<!--Add Action Popup-->

<div id="addActionpopupWindow" class="modal12 hide fade"
	style="display: none; width: 475px; left: 35%;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">x</button>
		<div class="modal-header" style="padding: 0px;">
			<h3>Add Action</h3>
		</div>
	</div>
	<div class="modal-body">
		<div>
			<ul>
				<li><label>Rule Name</label> <label style="width: 50%;"
					id="actionRuleName"></label></li>
				<li><label>Action Desc</label> <select id="actionDesc"><option>--
							select --</option></select></li>
				<li><label>Action Tag</label> <label id="actionTag"></label></li>
				<li><label>Rule action Output</label> <input id="actionOP" />
				</li>
				<li><label>Rule action Output value</label> <input
					id="actionOpVal" /></li>
				<li><label>Number of field to Add</label> <input
					id="actionNoField" /></li>
			</ul>
		</div>
	</div>
	<div class="modal-footer">
		<div class="modal_footer_innerDiv" id="saveActionFooter"></div>
	</div>
</div>
<!-- End of Add Action Popup-->

<!--start of Checklistname pop-->

<div id="AlertPopupForm" class="modal hide fade" style="display: none;">
	<div class="modal-header">

		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="close" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Create Checklist</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; padding-left: 20px; margin-top: 7px;">Please
		enter Checklist Name</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>
<!--End of checklistname pop-->

<!--start of Section name pop-->
<div id="AlertPopupSection" class="modal hide fade"
	style="display: none;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Create Checklist</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; padding-left: 20px; margin-top: 7px;">Please
		enter Section Name</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>
<!--End of Sectionn name pop-->

<!--start of step name pop-->
<div id="AlertPopupStep" class="modal hide fade" style="display: none;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Create Checklist</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; padding-left: 20px; margin-top: 7px;">Please
		enter Step Name</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>
<!--End of step name pop-->

<div id="AlertPopupDigit" class="modal12 hide fade"
	style="display: none; z-index: 9998; width: 300px;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; padding-left: 20px; margin-top: 7px;">Enter
		digit only</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>

<!--start of Text area Name And max pop-->
<div id="AlertPopupText1" class="modal12 hide fade"
	style="display: none; z-index: 9998; width: 300px;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; padding-left: 20px; margin-top: 7px;">Enter
		name and max length</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>

<!--start of Text area Name And max pop-->
<div id="AlertPopupText2" class="modal12 hide fade"
	style="display: none; z-index: 9998; width: 300px;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; padding-left: 20px; margin-top: 7px;">Enter
		name</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>
<!--End of Text area Name And max name pop-->


<!--start of Text area Name And max pop-->
<div id="AlertPopupText3" class="modal12 hide fade"
	style="display: none; z-index: 9998; width: 300px;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; padding-left: 20px; margin-top: 7px;">Enter
		max length</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>
<!--End of Text area Name And max name pop-->

<div id="AlertPopupTextBox1" class="modal12 hide fade"
	style="display: none; z-index: 9998; width: 300px;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; padding-left: 20px; margin-top: 7px;">Enter
		data type,name and max length</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>
<div id="AlertPopupTextBox2" class="modal12 hide fade"
	style="display: none; z-index: 9998; width: 300px;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; padding-left: 20px; margin-top: 7px;">Enter
		name and data type</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>
<div id="AlertPopupTextBox3" class="modal12 hide fade"
	style="display: none; z-index: 9998; width: 300px;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; padding-left: 20px; margin-top: 7px;">Enter
		data type</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>

<!--Start of Alert for Add image And image Upload-->

<div id="AlertPopupImage" class="modal12 hide fade"
	style="display: none; z-index: 9998; width: 300px;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; padding-left: 20px; margin-top: 7px;">Enter
		image type ,max images and name</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>
<div id="AlertPopupImage1" class="modal12 hide fade"
	style="display: none; z-index: 9998; width: 300px;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; padding-left: 20px; margin-top: 7px;">Enter
		image type and max images</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>
<div id="AlertPopupImage2" class="modal12 hide fade"
	style="display: none; z-index: 9998; width: 300px;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; padding-left: 20px; margin-top: 7px;">Enter
		image type and name</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>
<div id="AlertPopupImage3" class="modal12 hide fade"
	style="display: none; z-index: 9998; width: 300px;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; padding-left: 20px; margin-top: 7px;">Enter
		image type</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>
<div id="AlertPopupImage4" class="modal12 hide fade"
	style="display: none; z-index: 9998; width: 300px;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; padding-left: 20px; margin-top: 7px;">Enter
		max images and name</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>
<div id="AlertPopupImage5" class="modal12 hide fade"
	style="display: none; z-index: 9998; width: 300px;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; padding-left: 20px; margin-top: 7px;">Enter
		max images</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>
<div id="AlertPopupImage6" class="modal12 hide fade"
	style="display: none; z-index: 9998; width: 300px;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; padding-left: 20px; margin-top: 7px;">Enter
		name</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>
<div id="AlertPopupLabel1" class="modal12 hide fade"
	style="display: none; z-index: 9998; width: 300px;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; padding-left: 20px; margin-top: 7px;">Enter
		name and Answer Label</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>

<!--End of Alert for Add image And image Upload-->


<div id="AlertPopupLabel2" class="modal12 hide fade"
	style="display: none; z-index: 9998; width: 300px;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; padding-left: 20px; margin-top: 7px;">Enter
		answer label</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>


<div id="AlertValue" class="modal12 hide fade"
	style="display: none; z-index: 9998; width: 300px;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; padding-left: 20px; margin-top: 7px;">Enter
		value</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>
<div id="AlertSaveDraft" class="modal hide fade"
	style="display: none; z-index: 9998;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; padding-left: 15px; margin-top: 7px;">Drag
		a question and answer element</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>


<div id="AlertSaveDraft1" class="modal hide fade"
	style="display: none; z-index: 9998;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; margin-top: 7px; padding-left: 20px;">Drag
		a question element</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>

<div id="AlertSaveDraft2" class="modal hide fade"
	style="display: none; z-index: 9998;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; margin-top: 7px; padding-left: 20px;">Drag
		a answer element</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>


<div id="AlertSaveDraft3" class="modal hide fade"
	style="display: none; z-index: 9998;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; margin-top: 7px; padding-left: 20px;">Please
		add question text in question text area.</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>

<div id="AlertSaveDraft4" class="modal hide fade"
	style="display: none; z-index: 9998;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; margin-top: 7px; padding-left: 20px;">Please
		fill properties for each element</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>
<div id="AlertSaveDraft5" class="modal hide fade"
	style="display: none; z-index: 9998;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; margin-top: 7px; padding-left: 20px;">Please
		drag a Question text area in all questions.</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>

<!--Question Edit alert popup-->
<div id="quesEditPopup" class="modal hide fade" style="display: none;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Please Drag and Drop Text Area FormControl of Question for
			Edit</h3>
	</div>

	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>
<!--end Question Edit alert popup-->


<div id="AlertPopupImage_" class="modal12 hide fade"
	style="display: none; z-index: 9998; width: 300px;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; padding-left: 10px; margin-top: 7px;">You
		cannot add more than 5 images</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>

<div id="AlertGuidePopupImage_" class="modal12 hide fade"
	style="display: none; z-index: 9998; width: 300px;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p style="font-size: 15px; font-family: verdana; padding-left: 10px; margin-top: 7px;">You
		cannot add more than 1 image</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>

<div id="AlertImgSizePopup" class="modal12 hide fade"
	style="display: none; z-index: 9998; width: 300px;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p style="font-size: 15px; font-family: verdana; padding-left: 10px; margin-top: 7px;">Please select an image lower than 1MB in size.</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>

<div id="AlertImgTypePopup" class="modal12 hide fade"
	style="display: none; z-index: 9998; width: 300px;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p style="font-size: 15px; font-family: verdana; padding-left: 10px; margin-top: 7px;">Please select only Jpeg or Png format images.</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>
<!--Form Level Help Popup-->

<div id="helpPopup" class="modal hide fade" style="display: none;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">x</button>
		<h3>Help</h3>
	</div>
	<div class="modal-body">
		<div>
			<div class="help-body">
				<div class="helpDiv">
					<div class="helpImgDiv" id="formHelp"></div>
					<label id="formLabel">Add Description</label>

				</div>
			</div>
		</div>
	</div>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv" id="formFooter"></div>
	</div>
</div>
<!--End of Form Level Help Popup-->

<!---Section Help PopUp-->

<div id="helpSectionPopup" class="modal hide fade"
	style="display: none;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">x</button>
		<h3>Help</h3>
	</div>
	<div class="modal-body">
		<div>
			<div class="help-body">
				<div class="helpDiv">
					<div class="helpImgDiv" id="sectHelp"></div>
					<label id="sectLabel">Add Description</label>

				</div>
			</div>
		</div>
	</div>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv" id="sectFooter"></div>
	</div>
</div>

<!--End of Section Help popup-->

<!---Step Help PopUp-->

<div id="helpStepPopup" class="modal hide fade" style="display: none;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">x</button>
		<h3>Help</h3>
	</div>
	<div class="modal-body">
		<div>
			<div class="help-body">
				<div class="helpDiv">
					<div class="helpImgDiv" id="stepHelp"></div>
					<label id="stepLabel">Add Description</label>

				</div>
			</div>
		</div>
	</div>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv" id="stepFooter"></div>
	</div>
</div>

<!--End of Step Help popup-->


<!---Question Help PopUp-->

<div id="helpQuesPopup" class="modal hide fade" style="display: none;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">x</button>
		<h3>Help</h3>
	</div>
	<div class="modal-body">
		<div>
			<div class="help-body">
				<div class="helpDiv">
					<div class="helpImgDiv" id="quesHelp"></div>
					<label id="quesLabel">Add Description</label>

				</div>
			</div>
		</div>
	</div>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv" id="quesFooter"></div>
	</div>
</div>

<!--End of Question Help popup-->
<div id="AlertPopupImage" class="modal12 hide fade"
	style="display: none; z-index: 9998; width: 300px;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; padding-left: 10px; margin-top: 7px;">You
		cannot add more than 5 images</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>
<!-- Start of Add Image add properties -->
<div id="AIaddPropertiesPopup" class="modal hide fade"
	style="display: none;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="close" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Add Images Properties</h3>
	</div>
	<div class="modal-body">
		<div class="addPro-body">
			<div class="addProDiv">
				<div id="addImageId"></div>
			</div>
		</div>
	</div>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv" id="addImageFooter"></div>
	</div>
</div>

<!-- End of Add Image add properties -->

<!-- Start of Image upload add properties -->
<div id="IUaddPropertiesPopup" class="modal hide fade"
	style="display: none;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="close" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Upload Image Properties</h3>
	</div>
	<div class="modal-body">
		<div class="addPro-body">
			<div class="addProDiv">
				<div id="imageUploadId"></div>
			</div>
		</div>
	</div>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv" id="imageUpFooter"></div>
	</div>
</div>

<!-- End of Image upload add properties -->


<!-- Start of Text Area Add properties Popup-->
<div id="TAaddPropertiesPopup" class="modal hide fade"	style="display: none; position: fixed; z-index: 9950;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="close" class="addIcon"><i class="fa fa-times-circle"></i></a>
		</button>
		<h3>Text Area Properties</h3>
	</div>
	<div class="modal-body">
		<div class="addPro-body">
			<div class="addProDiv">
				<div id="textAreaId"></div>
			</div>
		</div>
	</div>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv" id="textAreaFooter"></div>
	</div>
</div>

<!--End of Text Area Add properties Popup-->


<!-- Start of Drop down Add properties Popup-->

<div id="DDaddPropertiesPopup" class="modal hide fade"
	style="display: none;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="close" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Drop Down Properties</h3>
	</div>
	<div class="modal-body">
		<div class="addPro-body">
			<div class="addProDiv">
				<div id="dropDownId"></div>
			</div>
		</div>
	</div>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv" id="dropDownFooter"></div>
	</div>
</div>
<!--End of Drop down Add properties Popup-->

<!-- Start of DATE PICKER Add properties Popup-->
<div id="DPaddPropertiesPopup" class="modal hide fade"
	style="display: none;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="close" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Date Picker Properties</h3>
	</div>
	<div class="modal-body">
		<div class="addPro-body">
			<div class="addProDiv">
				<div id="datePickerId"></div>
			</div>
		</div>
	</div>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv" id="datePickerFooter"></div>
	</div>
</div>
<!--End of DATE PICKER Add properties Popup-->

<!--Start of Radio button Add Properties Popup-->
<div id="radioAddPropertiesPopup" class="modal hide fade"
	style="display: none;width:500px;left:35%;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="close" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Radio Button Properties</h3>
	</div>
	<div class="modal-body">
		<div class="addPro-body">
			<div class="addProDiv">
				<div id="radioButtonId"></div>
			</div>
		</div>
	</div>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv" id="RadioFooter"></div>
	</div>
</div>
<!--End of Radio button Add Properties Popup-->



<!--Start of Check Box Add Properties Popup-->
<div id="checkAddPropertiesPopup" class="modal hide fade"
	style="display: none;    width: 500px;left: 35%;" data-dismissible="false">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			onclick="closeCheckbox();">
			<a rel="tooltip" title="close" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Check Box Properties</h3>
	</div>
	<div class="modal-body">
		<div class="addPro-body">
			<div class="addProDiv">
				<div id="checkBoxId"></div>
			</div>
		</div>
	</div>

	<div class="modal-footer">
		<div class="modal_footer_innerDiv" id="CheckBoxFooter"></div>
	</div>
</div>
<!--End of  Check Box Add Properties Popup-->



<!--Button Add Properties-->
<div id="btnAddPropertiesPopup" class="modal hide fade"
	style="display: none;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="close" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Button Properties</h3>
	</div>
	<div class="modal-body">
		<div class="addPro-body">
			<div class="addProDiv">
				<div id="buttonId"></div>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<div class="modal_footer_innerDiv" id="ButtonFooter"></div>
	</div>
</div>



<!--text box Add Properties-->
<div id="textBoxAddPropertiesPopup" class="modal hide fade"
	style="display: none;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="close" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Text Box Properties</h3>
	</div>
	<div class="modal-body">
		<div class="addPro-body">
			<div class="addProDiv">
				<div id="textBoxId"></div>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<div class="modal_footer_innerDiv" id="textBoxFooter"></div>
	</div>
</div>


<!--label Add Properties-->
<div id="labelAddPropertiesPopup" class="modal hide fade"
	style="display: none;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="close" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Label Properties</h3>
	</div>
	<div class="modal-body">
		<div class="addPro-body">
			<div class="addProDiv">
				<div id="labelId"></div>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<div class="modal_footer_innerDiv" id="labelFooter"></div>
	</div>
</div>
<!--label Add Properties-->


<!-- Start of Signature  Add properties Popup-->
<div id="signatureaddPropertiesPopup" class="modal hide fade"
	style="display: none; position: fixed; z-index: 9950;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="close" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Signature Properties</h3>
	</div>
	<div class="modal-body">
		<div class="addPro-body">
			<div class="addProDiv">
				<div id="signatureId"></div>
			</div>
		</div>
	</div>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv" id="signatureFooter"></div>
	</div>
</div>
<!--start of Checklistname pop-->


<!-- Start of Guide Add properties Popup-->
<div id="GuideImgPropertiesPopup" class="modal hide fade" style="display: none; position: fixed; z-index: 9950;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="close" class="addIcon"><i class="fa fa-times-circle"></i></a>
		</button>
		<h3>Guide Image Properties</h3>
	</div>
	<div class="modal-body">
		<div class="addPro-body">
			<div class="addProDiv">
				<div id="guideImgId"></div>
			</div>
		</div>
	</div>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv" id="guideImgFooter"></div>
	</div>
</div>
<!--End of Guide Add properties Popup-->



<div id="AlertPopup5" class="modal hide fade" style="display: none;">
	<div class="modal-header">

		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="close" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3 style="padding-left: 20px;">Please select the value</h3>
	</div>

	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" id="confirmfun" data-dismiss="modal"
				class="btn btn-primary"
				style="margin-right: 90px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>
<!--End of checklistname pop-->

<div id="dialogueID" class="modal hide fade" style="display: none;">
	<div class="modal-header">

		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="close" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; padding-left: 20px; margin-top: 7px;">Are
		sure you want to cancel?</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">
			<button type="button" data-dismiss="modal" class="btn CCancel">Confirm</button>
			<button type="button" data-dismiss="modal"
				class="btn btnCancel pull-right">Cancel</button>
		</div>
	</div>
</div>


<div id="dilogueBack" class="modal hide fade" style="display: none;">
	<div class="modal-header">

		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="close" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; padding-left: 20px; margin-top: 7px;">All
		data would be deleted from the cache</p>
	<p
		style="font-size: 15px; font-family: verdana; padding-left: 20px; margin-top: 7px;">Are
		sure you want to go back?</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">
			<button type="button" data-dismiss="modal" class="btn CConfirm">Confirm</button>
			<button type="button" data-dismiss="modal"
				class="btn btnCancel pull-right">Cancel</button>
		</div>
	</div>
</div>

<div id="AlertPopupRule" class="modal12  hide fade"
	style="display: none; z-index: 9998; width: 300px;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; padding-left: 20px; margin-top: 7px;">If
		you change value field its coresponding rule will get deleted</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv" id="againFooter">

			//
			<button type="button" class="btn btn-primary" id="valueOk"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>

<div id="AlertSuccess" class="modal hide fade"
	style="display: none; z-index: 9998;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; margin-top: 7px; padding-left: 20px;">Checklist
		saved successfully</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>

<div id="AlertInvalidUser" class="modal hide fade"
	style="display: none; z-index: 9998;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; margin-top: 7px; padding-left: 20px;">OOPS!
		You are not authorized for this application.</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btnInvalidUser"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>

<div id="AlertSearch" class="modal hide fade"
	style="display: none; z-index: 9998;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; margin-top: 7px; padding-left: 20px;">Please
		select all mandatory fields</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>
<div id="AlertRuleFormulaData" class="modal hide fade"
	style="display: none; z-index: 9998;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; margin-top: 7px; padding-left: 20px;">Please
		add data in rules formula data field</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>
<div id="AlertEditDatabase" class="modal hide fade"
	style="display: none; z-index: 9998;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; margin-top: 7px; padding-left: 20px;">Not
		Able to connect with database, Please try again after some time.</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>
<div id="AlertActionRequired" class="modal hide fade"
	style="display: none; z-index: 9998;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; margin-top: 7px; padding-left: 20px;">Please
		add action to all rules</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>

<div id="actionValidationAlert" class="modal hide fade"
	style="display: none; z-index: 9998;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; margin-top: 7px; padding-left: 20px;">Please
		select action description</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>
<div id="AlertRules" class="modal hide fade"
	style="display: none; z-index: 9998;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; margin-top: 7px; padding-left: 20px;">Please
		provide the rule and their actions</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">
			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>

<div id="publishPopup" class="modal hide fade" style="display: none;"
	aria-hidden="false">

	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">x</button>
		<h3>Publish</h3>
	</div>
	<div class="modal-body">
		<div>
			<div class="add-rules-body">
				<div class="addRulesDiv">
					<span>Please select version type to which this form has been
						changed by major or minor category</span><br> <input type="radio"
						name="publish_value" value="major">Major <input
						type="radio" name="publish_value" value="minor" checked>Minor
				</div>
			</div>
		</div>
	</div>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">
			<button type="button"
				class="btn btn-primary confirm  pull-left publishBtn"
				data-dismiss="modal">Okay</button>
			<button type="button" class="btn cancel" data-dismiss="modal">Cancel</button>
		</div>
	</div>

</div>

<div id="versionPopup" class="modal hide fade" style="display: none;"
	aria-hidden="false">

	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">x</button>
		<h3>ChecklistForm</h3>
	</div>
	<div class="modal-body">
		<div>
			<div class="add-rules-body">
				<div id="versionMsg" class="addRulesDiv"></div>
			</div>
		</div>
	</div>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">
			<button type="button"
				class="btn btn-primary confirm  pull-left versionPopBtn"
				data-dismiss="modal">OK</button>
			<button type="button" class="btn cancel" data-dismiss="modal">Cancel</button>
		</div>
	</div>

</div>

<div id="noProjMapped" class="modal hide fade"
	style="display: none; z-index: 9998;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; margin-top: 7px; padding-left: 20px;">No
		projects associated with this checklist.</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
	</div>
		
	<div id="addSectionName" class="modal hide fade"
		style="display: none;" aria-hidden="false">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">x</button>
			<h3>Add Section Name</h3>
		</div>
		<div class="modal-body">
			
				<div class="add-section-body">
					<div class="addSectionDiv">

						<div class="accordion-inner">
							<label>Section Name <span style="color: red;font-size: 22px;position: relative;top: 5px;">*</span></label> 
							<input type="text" maxlength="100" id="SectionName" name="sectionName"/>
								 
							
							<label>Step Name <span style="color: red;font-size: 22px;position: relative;top: 5px;">*</span></label> 
							<input type="text" maxlength="100" id="StepName" name="stepName"/>
														
						</div>
					</div>
				</div>
			
		</div>
		<div class="modal-footer ">
			<div class="modal_footer_innerDiv">
				<button type="button" class="btn btn-primary addSectionBtn" data-dismiss="modal" disabled>Go</button>
				<button type="button" class="btn cancel" data-dismiss="modal">Cancel</button>
			</div>
		</div>
	</div>
	
	<div id="addStepName" class="modal hide fade"
		style="display: none;" aria-hidden="false">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">x</button>
			<h3>Add step Name</h3>
		</div>
		<div class="modal-body">
			
				<div class="add-section-body">
					<div class="addSectionDiv" id="addStepDiv">

						<div class="accordion-inner">
							<label>Section Name <span style="color: red;font-size: 22px;position: relative;top: 5px;">*</span></label> 
							<input type="text" id="SectionName_" name="sectionName" disabled/>
								 
							
							<label>Step Name <span style="color: red;font-size: 22px;position: relative;top: 5px;">*</span></label> 
							<input type="text" id="StepName_" name="stepName"/>
														
						</div>
					</div>
				</div>
			
		</div>
		<div class="modal-footer ">
			<div class="modal_footer_innerDiv">
				<button type="button" class="btn btn-primary addStepBtn" data-dismiss="modal" disabled>Go</button>
				<button type="button" class="btn cancel" data-dismiss="modal">Cancel</button>
			</div>
		</div>
	</div>
	
	<div id="checklistDuplicate" class="modal hide fade"
	style="display: none; z-index: 9998;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">
			<a rel="tooltip" title="Add" class="addIcon"><i
				class="fa fa-times-circle"></i></a>
		</button>
		<h3>Message</h3>
	</div>
	<p
		style="font-size: 15px; font-family: verdana; margin-top: 7px; padding-left: 20px;">This Checklist name already exists under same function</p>
	<div class="modal-footer ">
		<div class="modal_footer_innerDiv">

			<button type="button" data-dismiss="modal" class="btn btn-primary"
				style="margin-right: 50px; margin-top: 20px;">OK</button>
		</div>
	</div>
</div>
