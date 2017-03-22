package com.ge.power.checklist.mobile.exceptions;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class ChecklistMobileExceptions extends RuntimeException{
	
	private String errorCode;
	private String errorMessage;
	private Exception objException;
	private HashMap<String, Object> errorMap;
	
	public ChecklistMobileExceptions(){
		
	}

	public ChecklistMobileExceptions(HashMap<String, Object> errorList,String errorCode, String errorMsg){
		this.errorMap = errorList;
		this.errorCode = errorCode;
		this.errorMessage = errorMsg;
	}
	
public ChecklistMobileExceptions(String errorCode, String errorMsg){
		this.errorCode = errorCode;
		this.errorMessage = errorMsg;
	}

public ChecklistMobileExceptions(String errorCode, String errorMsg, Exception exception){
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

public HashMap<String, Object> getErrorMap() {
	return errorMap;
}

public void setErrorMap(HashMap<String, Object> errorMap) {
	this.errorMap = errorMap;
}
	

}
