package com.ge.power.checklist.mobile.dto;

import java.util.Map;

//import com.ge.power.checklist.mobile.exceptions.ChecklistMobileExceptions;

public class ChecklistResponse {

	 private Object resultSet;
	 private ChecklistRequestStatus requestStatus; 
	// private ChecklistMobileExceptions exceptions; 
	
	 public Object getResultSet() {
		return resultSet;
	}
	public void setResultSet(Object resultSet) {
		this.resultSet = resultSet;
	}
	public ChecklistRequestStatus getRequestStatus() {
		return requestStatus;
	}
	public void setRequestStatus(ChecklistRequestStatus requestStatus) {
		this.requestStatus = requestStatus;
	}
	
	/*public ChecklistMobileExceptions getExceptions() {
		return exceptions;
	}
	public void setExceptions(ChecklistMobileExceptions exceptions) {
		this.exceptions = exceptions;
	}*/
	
	 
}
