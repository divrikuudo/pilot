package com.ge.power.checklist.portal.dto;

import java.util.List;

public class RecordDTO {

	private String recordName;
	private String projectName;
	private String recordDate;
	private String recordStatus;
	private String recordVersioNo;
	private List<SearchSectionDetails> searchSectionDetails;
	public String getRecordName() {
		return recordName;
	}
	public void setRecordName(String recordName) {
		this.recordName = recordName;
	}
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public String getRecordDate() {
		return recordDate;
	}
	public void setRecordDate(String recordDate) {
		this.recordDate = recordDate;
	}
	public String getRecordStatus() {
		return recordStatus;
	}
	public void setRecordStatus(String recordStatus) {
		this.recordStatus = recordStatus;
	}
	public String getRecordVersioNo() {
		return recordVersioNo;
	}
	public void setRecordVersioNo(String recordVersioNo) {
		this.recordVersioNo = recordVersioNo;
	}
	public List<SearchSectionDetails> getSearchSectionDetails() {
		return searchSectionDetails;
	}
	public void setSearchSectionDetails(
			List<SearchSectionDetails> searchSectionDetails) {
		this.searchSectionDetails = searchSectionDetails;
	}
	
	
}
