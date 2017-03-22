package com.ge.power.checklist.portal.dto;

import java.util.List;

public class SearchRecordDTO {

	private String recordName;
	private String projectName;
	private String recordDate;
	private String recordStatus;
	private String recordVersioNo;
	private String sectionArray;
	private String recordId;	
	private List<SearchSectionDetails> searchSectionDetails;
	private List<SectionElement> sectionElements;
	
	
	
	public List<SectionElement> getSectionElements() {
		return sectionElements;
	}
	public void setSectionElements(List<SectionElement> sectionElements) {
		this.sectionElements = sectionElements;
	}
	public String getRecordId() {
		return recordId;
	}
	public void setRecordId(String recordId) {
		this.recordId = recordId;
	}
	public String getSectionArray() {
		return sectionArray;
	}
	public void setSectionArray(String sectionArray) {
		this.sectionArray = sectionArray;
	}
	public List<SearchSectionDetails> getSearchSectionDetails() {
		return searchSectionDetails;
	}
	public void setSearchSectionDetails(
			List<SearchSectionDetails> searchSectionDetails) {
		this.searchSectionDetails = searchSectionDetails;
	}
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
	
	
}
