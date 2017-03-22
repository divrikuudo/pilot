<!DOCTYPE html>
<html lang="en">
<%@ page import="java.util.*"%>
<head>
<title>Dashboard</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="-1">

<!-- Bootstrap core CSS -->
<!--   <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css"/> -->
<!-- For third-generation iPad with high-resolution Retina display: -->
<link rel="apple-touch-icon-precomposed" sizes="144x144"
	href="components/brandkit/favicon/favicon-144px.png">

<!-- For iPhone with high-resolution Retina display: -->
<link rel="apple-touch-icon-precomposed" sizes="114x114"
	href="components/brandkit/favicon/favicon-114px.png">

<!-- For first- and second-generation iPad: -->
<link rel="apple-touch-icon-precomposed" sizes="72x72"
	href="components/brandkit/favicon/favicon-72px.png">

<!-- For non-Retina iPhone, iPod Touch, and Android 2.1+ devices: -->
<link rel="apple-touch-icon-precomposed"
	href="components/brandkit/favicon/favicon.png">

<link rel="icon" href="components/brandkit/favicon/favicon.ico">

<link href="iidxCss/iids.css" rel="stylesheet" type="text/css">

<link href="iidxCss/responsive.css" rel="stylesheet" type="text/css">

<link href="customCss/dataTables.responsive.css" rel="stylesheet">

<link href="customCss/customStyles.css" rel="stylesheet" type="text/css" />

<link href="css/font-awesome.css" rel="stylesheet" type="text/css" />
<link href="css/creationChecklist.css" rel="stylesheet" type="text/css" />
<link href="css/draganddrop.css" rel="stylesheet" type="text/css" />

<link rel="stylesheet" href="https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css" type="text/css" />

<script src="js/spin.js"></script>
<script type = "text/javascript">
    history.pushState(null, null, 'dashboard.jsp');
    window.addEventListener('popstate', function(event) {
    history.pushState(null, null, 'dashboard.jsp');
    });  
</script>
</head>
<body>
	<%@ include file="popup.jsp" %>
	<%@ include file="create-checklist.jsp" %>
	<%@ include file="dashboard-content.jsp" %>
	<%@ include file="record-management.jsp" %>
	<script src="js/vendor/require-jquery.js"></script>
	<script src="components/modernizr/modernizr.js"></script>
	<script src="js/jquery/jquery.filtertable.js"></script>
	<script src="js/jquery/ourjs.js"></script>
	<script src="js/vendor/modernizr-respond.js"></script>
	<script type="text/javascript" src="js/userLogin.js"></script>
	<script src="js/config.js"></script>
	<script src="js/search.js"></script>
	<script src="requirejs/require.js"></script>
	<script src="requirejs/require.config.js"></script>
	<script src="js/jquery/jquery-1.7.2.js"></script>
	<script src="respond/respond.src.js"></script>
	<script src="js/jquery/customScript.js"></script>
	<script src="js/jquery/jquery-ui.min.js"></script>
	<script src="js/jquery/jquery.json-2.2.min.js"></script>
	
	<script src="js/metadataHandeler.js"></script>
	<script src="js/editChecklist.js"></script>
	<script src="js/cookieHandeler.js"></script>
	<script src="js/saveDraft.js"></script>
	<script src="js/recordSearch.js"></script>
	<script src="js/helpImage.js"></script>
	<script src="js/helpImageDeletion.js"></script>
	<script src="js/reOrder.js"></script>
	<script src="js/dragDrop.js"></script>
	<script src="js/elementProperty.js"></script> 
	<script src="js/elementPropertySaving.js"></script>  
	<script src="js/elementDelete.js"></script>  
	<script src="js/duplicateElement.js"></script>
	<script src="js/ruleSaving.js"></script>
	<script src="js/ruleEditDelete.js"></script>
	<script src="js/actionSave.js"></script>
	<script src="js/displayRule.js"></script>
	<script src="js/displayAction.js"></script>
	<script src="js/actionEditDelete.js"></script>
	<script src="js/addHelpImage.js"></script>
	<script src="js/createChecklistPopUp.js"></script>
	<script src="js/addSectionPopUp.js"></script>
	<script src="js/addStepPopUp.js"></script>
	<script src="js/deleteChecklist.js"></script>
	<script src="js/checklistComponent.js"></script>
	<script src="js/checklistPage.js"></script>
	<script src="js/sectionAddDelete.js"></script>
	<script src="js/stepAddDelete.js"></script>
	<script src="js/questionAddDelete.js"></script>
	<script src="js/resetVariable.js"></script>
	<script src="js/updatePageChecklist.js"></script>
	<script src="js/elementPropertiesRuleJson.js"></script>
	<script src="js/DisplayHelpImage.js"></script>
	<script src="js/displayElementProperty.js"></script>
	<script src="js/propertyValidation.js"></script>
	<script src="js/editloadPropertyJson.js"></script>
	<script src="js/ruleSavingFunction.js"></script>
	
	<script src="js/editMetaDataJson.js"></script>
	<script src="js/editPublishButton.js"></script>
	<script src="js/editSaveDraftButton.js"></script>
	<script src="js/editLoadSection.js"></script>
	<script src="js/editLoadStep.js"></script>
	<script src="js/editLoadQuestion.js"></script>
	<script src="js/editLoadQuesAnsElement.js"></script>
	<script src="js/editLoadElementProperties.js"></script>
	<script src="js/editRuleAction.js"></script>
	<script src="js/filterFunction.js"></script>	
	
	<script src="js/nextButtonFunction.js"></script>

	<%
		String accessToken = request.getServerName();
		String sso = "501313614";//Superuser
		//String sso = "501272213";// Group Admin
		
		//String sso = "";
		Enumeration headerNames = request.getHeaderNames();
		//System.out.println("jsp"+request.getHeaderNames());
		while (headerNames.hasMoreElements()) {
			String key = (String) headerNames.nextElement();
			String value = request.getHeader(key);
			//System.out.println(key+" ===== "+value);
			if ("GE_SUB".equalsIgnoreCase(key) || "oidc_claim_sub".equalsIgnoreCase(key)) {
				sso = request.getHeader(key);
			}
		} 
	%>
	<iframe id="downloadFrame" style="display:none"></iframe>
	<input type="hidden" id="accessToken" value="<%=accessToken%>" />
	<input type="hidden" id="sso" value="<%=sso%>" />
	<div class="navbar navbar-fixed-top">
		<div class="navbar-inner">
			<div id="headerCheck" >

				<!-- .btn-navbar is used as the toggle for collapsed navbar content -->
				<a class="btn btn-navbar" data-toggle="collapse"
					data-target=".nav-collapse"> <span class="icon-bar"></span> <span
					class="icon-bar"></span> <span class="icon-bar"></span>
				</a> <a class="brand" href="../web/dashboard.jsp"><span class="ge-logo"></span><span>DIGIFORM PORTAL<small><i>(V
								1.0) Powered by GE Power</small></span></a>
				<div class="pull-right">
					<div class="btn-toolbar pull-left formCtrlGroup">
						<div class="btn-group">
							<button class="btn btn-inverse dropdown-toggle"
								data-toggle="dropdown">
								<i class="icon-user"></i><span class="user-name"></span> <i
									class="icon-chevron-down"></i>
							</button>
							<ul class="dropdown-menu">
								<li id="logout"><a href="#"> Logout</a></li>

							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="primary-navbar nav-collapse collapse">
			<div class="container">
						 <ul class="nav">
			<li ><a href="#" id="checklistManagement">Checklist Management</a></li>
			<li class="dropdown"><a class="dropdown-toggle" href="#" data-toggle="dropdown" id="userManagement">User Management</a>
			<li class="dropdown"><a class="dropdown-toggle" href="#" data-toggle="dropdown"  id="rolesPerm">Roles and Permission</a>
			<li><a href="#" id="records">Records</a></li>
		<!-- 	<li><a href="#" id="settings">Settings</a></li> -->
				</ul>
			</div>
		</div>
	</div>
	<div class="footer">
		<div class="primary">
			<div class="container">
				<div class="block pull-right">
					<ul>
						<li><a href="https://powergen.gepower.com/privacy-policy.html" target="_blank">Privacy</a></li>
						<li><a href="http://www.ge.com/terms" target="_blank">Terms</a></li>
						<li><a href="http://www.ge.com/contact/general" target="_blank">Contact</a></li>
						<li><a href="http://www.ge.com/accessibility" target="_blank">Accessibility</a></li>
						<li><a href="http://www.ge.com/cookies/en" target="_blank">Cookies</a></li>
						<li class="copyright">&copy; 2015 General Electric</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
		
</body>
</html>
