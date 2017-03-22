package com.ge.power.checklist.mobile.dto;

import java.util.List;

public class ChecklistVersionDTO {
	private String formId;
	private String baseFormId;
	private String versionNo;
	private String isUpdateAvailable;
	private List<ChecklistVersionDTO> formsList;
	
	public String getFormId() {
		return formId;
	}
	public void setFormId(String formId) {
		this.formId = formId;
	}
	public String getBaseFormId() {
		return baseFormId;
	}
	public void setBaseFormId(String baseFormId) {
		this.baseFormId = baseFormId;
	}
	public String getVersionNo() {
		return versionNo;
	}
	public void setVersionNo(String versionNo) {
		this.versionNo = versionNo;
	}
	public String getIsUpdateAvailable() {
		return isUpdateAvailable;
	}
	public void setIsUpdateAvailable(String isUpdateAvailable) {
		this.isUpdateAvailable = isUpdateAvailable;
	}
	public List<ChecklistVersionDTO> getFormsList() {
		return formsList;
	}
	public void setFormsList(List<ChecklistVersionDTO> formsList) {
		this.formsList = formsList;
	}

}
