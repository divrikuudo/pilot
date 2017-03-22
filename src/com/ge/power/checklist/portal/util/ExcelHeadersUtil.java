package com.ge.power.checklist.portal.util;

import java.util.ArrayList;
import java.util.List;

public class ExcelHeadersUtil {

	public static List<String> getComputeQMIHeaders(){
		List<String> headerList = new ArrayList<String>();
		headerList.add("S No");
		headerList.add("Current Estimate Walk");
		headerList.add("Prod Ln");
		//headerList.add("N/U");
		headerList.add("Orders");
		headerList.add("Sales");
		headerList.add("CM");
		headerList.add("CM %");
		headerList.add("BC (Fav)");
		headerList.add("Op Margin");
		return headerList;
	}
	public static List<String> getLineItemHeaders(){
		List<String> headerList = new ArrayList<String>();
		headerList.add("Quarter");
		headerList.add("Year");
		headerList.add("Walk Item");
		headerList.add("Classification");
		headerList.add("Service Type");
		headerList.add("Project Pl");
		headerList.add("Sub Pl");
		headerList.add("Cm Amt");
		headerList.add("Sales Amt");
		headerList.add("Cm Perc");
		headerList.add("Status");

		return headerList;
	}
	public static List<String> getYearlyErrorHeaders(){
		List<String> headerList = new ArrayList<String>();
		headerList.add("Error Code Id");
		headerList.add("Error Desc");
		headerList.add("Project Year");
		headerList.add("Project Qtr");
		headerList.add("Project Legal Entity");
		headerList.add("Project No");
		headerList.add("Project Name");
		headerList.add("Project Manager Ssoid");
		headerList.add("Project Manager Name");
		headerList.add("Customer Name");
		headerList.add("Project Classification");
		headerList.add("Project Service Type");
		headerList.add("Project P&l");
		headerList.add("Project Sub P&l");
		headerList.add("Country Code");
		headerList.add("Country Name");
		headerList.add("Project Sales Amt");
		headerList.add("Project Cm Amt");
		headerList.add("Project Cm Perct");
		headerList.add("Comments");
		headerList.add("Project GGO Region");
		headerList.add("Project O&G Region");
		headerList.add("Project D&S Region");
		headerList.add("Upload Date");
		headerList.add("Upload By");

		return headerList;
	}
	public static List<String> getProjectErrorHeaders(){
		List<String> headerList = new ArrayList<String>();
		headerList.add("Error Code Id");
		headerList.add("Error Desc");
		headerList.add("Project Legal Entity");
		headerList.add("Project No");
		headerList.add("Project Name");
		headerList.add("Customer Name");
		headerList.add("Project desc");
		headerList.add("Project Classification");
		headerList.add("Project Service Type");
		headerList.add("Project P&L");
		headerList.add("Project Sub P&L");
		headerList.add("Country Code");
		headerList.add("Country Name");
		headerList.add("Project GGO Region");
		headerList.add("Project OM");
		headerList.add("Project Sales Amt");
		headerList.add("Project Cm Amt");
		headerList.add("Project Cm Perct");
		headerList.add("Project Year");
		headerList.add("Project Qtr");
		headerList.add("Proj Output Milestone");
		headerList.add("Upload Date");
		headerList.add("Upload By");
		headerList.add("Proj Ext Int");
		headerList.add("Prj Base Cost");
		headerList.add("Curr Conv");
		headerList.add("Program Number");		
		headerList.add("Project Manager");
		headerList.add("Contractual Delivery Date");
		headerList.add("Delivery Term");
		headerList.add("Planner");
		headerList.add("Status");
		headerList.add("Category");
		headerList.add("Month Of Billing");

		return headerList;
	}	

	public static List<String> getOperatingPlanHeaders(){
		List<String> headerList = new ArrayList<String>();
		headerList.add("Year");
		headerList.add("Quarter");
		headerList.add("Classification");
		headerList.add("Service Type");
		headerList.add("Op Pl");
		headerList.add("Sub Pl");
		headerList.add("Op Order");
		headerList.add("Op Sales");
		headerList.add("Op Cm");
		headerList.add("Op Cm%");
		headerList.add("Base Cost");
		headerList.add("Status");

		return headerList;
	}

	public static List<String> getSearchHeaders(){
		List<String> headerList = new ArrayList<String>();
		headerList.add("LE ID");
		headerList.add("Year");
		headerList.add("Qtr");
		headerList.add("Program Number");
		headerList.add("Project Number");
		headerList.add("Project Name");
		headerList.add("Output Milestone");
		headerList.add("Project Description");		
		headerList.add("Customer Name");
		headerList.add("Internal/External");
		headerList.add("Classification");
		headerList.add("Project P&L");
		headerList.add("Sub P&L");
		headerList.add("Service Type");
		headerList.add("Country Code");
		headerList.add("Base Cost");
		headerList.add("Currency Conversion");
		headerList.add("Sales Amount ($)");
		headerList.add("CM Amount ($)");
		headerList.add("CM %");
		headerList.add("OM");
		headerList.add("Manager SSO ID");
		headerList.add("Contractual Delivery Date");
		headerList.add("Delivery Term");
		headerList.add("Planner");
		headerList.add("Status");
		headerList.add("Category");
		headerList.add("Month Of Billing");
		headerList.add("PO");
		headerList.add("Month of Activity");
		headerList.add("Pull-In/Pull-Out");
		headerList.add("Risk/Opp");
		headerList.add("Priority");
		headerList.add("Comments");
		headerList.add("Project Manager");
		headerList.add("Country Name");
		headerList.add("GGO Region");
		headerList.add("O&G Region");
		headerList.add("D&S Region");
		headerList.add("LE Description");
		return headerList;
	}

	public static List<String> getTotalYearRevenuePlanHeaders(){
		List<String> headerList = new ArrayList<String>();
		headerList.add("Project Name");
		headerList.add("Project Number");
		headerList.add("Legal Entity");
		headerList.add("Legal Entity Description");
		headerList.add("Customer Name");
		headerList.add("Salse Amount");							
		headerList.add("Cm Amount");
		headerList.add("Cm %");
		headerList.add("Quarter	");						
		headerList.add("Year");
		headerList.add("Classification");
		headerList.add("Service Type");
		headerList.add("P&L");
		headerList.add("Sub P&L");
		headerList.add("Country Name");
		headerList.add("GGO Region");
		headerList.add("O&G Region");
		headerList.add("D&S Region");
		return headerList;
	}
	public static List<String> getQMILineItemErrorHeader(){

		List<String> headerList = new ArrayList<String>();
		headerList.add("Error Code Id");
		headerList.add("Error Desc");
		headerList.add("Walk Item");
		headerList.add("Classification");
		headerList.add("Service Type");
		headerList.add("Project Pl");
		headerList.add("Sub Pl");
		headerList.add("CM Amount");
		headerList.add("Sales Amount");
		headerList.add("CM Perc");
		headerList.add("Quarter");
		headerList.add("Year");
		headerList.add("Status Flg");
		headerList.add("Upload By");
		headerList.add("Upload Date");

		return headerList;
	}
	
	public static List<String> getMiscItemHeaders(){
		List<String> headerList = new ArrayList<String>();
		headerList.add("Quarter");
		headerList.add("Year");
		headerList.add("Misc Item");
		headerList.add("Region");
		headerList.add("Cm Amt");
		headerList.add("Sales Amt");
		headerList.add("Cm Perc");
		headerList.add("Status");

		return headerList;
	}
}
