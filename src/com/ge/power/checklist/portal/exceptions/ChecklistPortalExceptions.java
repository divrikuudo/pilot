package com.ge.power.checklist.portal.exceptions;

public class ChecklistPortalExceptions extends RuntimeException {
	
	private String errorCode;
	private String errorMessage;
	private Exception objException;

	public ChecklistPortalExceptions() {

	}

	public ChecklistPortalExceptions(String errorCode, String errorMsg) {
		this.errorCode = errorCode;
		this.errorMessage = errorMsg;
	}

	public ChecklistPortalExceptions(String errorCode, String errorMsg,
			Exception exception) {
		this.errorCode = errorCode;
		this.errorMessage = errorMsg;
		this.objException = exception;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public Exception getObjException() {
		return objException;
	}

	public void setObjException(Exception objException) {
		this.objException = objException;
	}

}
