package com.ge.power.checklist.portal.dto;


import java.util.Map;

public class ChecklistPortalResponse {

	 private Map resultSet;
	 private ChecklistRequestStatus requestStatus;
	
	 public Map getResultSet() {
		return resultSet;
	}
	public void setResultSet(Map resultSet) {
		this.resultSet = resultSet;
	}
	public ChecklistRequestStatus getRequestStatus() {
		return requestStatus;
	}
	public void setRequestStatus(ChecklistRequestStatus requestStatus) {
		this.requestStatus = requestStatus;
	}
	
	
		 
}
