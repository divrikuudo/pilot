package com.ge.power.checklist.portal.dto;

public class ChecklistRequestStatus {
	
	private String responseCode = "";
	private String responseMessage = "";

	
	
	public ChecklistRequestStatus() {
		
	}

	public ChecklistRequestStatus(String responseCode, String responseMessage) {
		this.responseCode = responseCode;
		this.responseMessage = responseMessage;
	}
	
	public String getResponseCode() {
		return responseCode;
	}
	public void setResponseCode(String responseCode) {
		this.responseCode = responseCode;
	}
	public String getResponseMessage() {
		return responseMessage;
	}
	public void setResponseMessage(String responseMessage) {
		this.responseMessage = responseMessage;
	}

}
