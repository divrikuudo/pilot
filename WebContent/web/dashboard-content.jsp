<div class="container mainContent" id="dashboardcontent">

	<section class="module sectionMargin">
		<p>Search</p>
		<form class="form-search pull-left">

			<div class="input-append">

				<select id="clmn_name" style="width: 150px; margin-right: 10px;">

					<option>ChecklistName</option>
					<option>Language</option>
					<option>Author</option>
					<option>Function</option>
					<option>Version</option>
					<option>Status</option>
				</select> <input type="text" id="kwd_search"
					class="input-medium search-query" placeholder="Search here">
				<button id="searchgrid" class="btn btn-icon"
					onclick="searchcriteria();return false;"
					style="background-color: #3f4145; color: #ffffff;">
					<!-- <i class="icon-search"></i> -->
					Search
				</button>
				</input>
			</div>
		</form>
		<div id="Backbtn">
			<button class=" btn btn-info pull-right">Create Checklist</button>
		</div>
		<table id="my-table" cellpadding="0" cellspacing="0" border="0"
			class="table table-bordered dashTable"
			data-table-name="dt-dom">
		</table>
	</section>
</div>
