	<div class="container mainContent" id="recordsManagementContent" style="display:none">
		<section class="module sectionMargin" style="  margin-top: 10%;  height: 220px;">
			<p>Search</p>
			<form class="form-search pull-left">
			<table id="checkListVersionTable">
				<tr>
					
<!-- 					<th style="width:280px;"><label style="float:left;  padding-left: 8px;">Project Name<span style="color:red;">*</span></label></th> -->
					<th style="width:280px;"><label style="float:left;  padding-left: 8px;">Date From<span style="color:red;">*</span></label></th>
					<th style="width:280px;"><label style="float:left;  padding-left: 8px;">Date To<span style="color:red;">*</span></label></th>
					<th style="width:280px;"><label style="float:left;  padding-left: 8px;">Checklist Name<span style="color:red;">*</span></label></th>
					<th style="width:280px;"><label style="float:left;  padding-left: 8px;">Version<span style="color:red;">*</span></label></th>
				</tr>
				<tr>
					<td><input type="date" id="date_from" class="datepicker" style="width: 250px;"/>
					
					</td>
					<td><input type="date" id="date_to" class="datepicker" style="width: 250px;"/>
							
					</td>
					<td><select id="ck_name" style="width: 250px;">
						
						</select>
					</td>
					<td><select id="version" style="width: 250px;">
						</select>
					</td>
				</tr>
				<tr>
					<td  style="width:280px;"><label style="float:left;  padding-left: 8px;  padding-top: 5px;">Project Name</label></td>
				</tr>
				<tr>
					
					<td><select id="turbine_id" style="width: 250px;">
							<option></option>
						</select>
					</td>
					<td style="padding-top: 10px;"><button type="button" class="btn btn-primary search_ recordSearch_">Search</button>&nbsp;&nbsp;<button type="button" class="btn btn-primary search_ recordSearchClear_">Clear</button></td>
				</tr>
				
				
			</table>
			</section>
			<section  class="module sectionMarginSecond" style="margin-top: -4%;height: 590px;display:none;">
			<div id="first_row" style="display:none;">
				<div style="  padding-top: 10px;">
					<label style="  font-size: 18px;">Search Result</label>
					<table onclick="removeSelect()">
					<tr id="rowSelectR">
						<td width="20%">Checklist Name:</td>
						<td width="70%" id="displayCheckListName"></td>
						<td width="30%"><button style="float:right;" type="button" class="btn btn-primary search_ exportToExcel_">Export to excel</button></td>
					</tr>
					</table>
					
				<table id="search_table">
					
				</table>
			</div>
			</section>
		</form>

</div>
