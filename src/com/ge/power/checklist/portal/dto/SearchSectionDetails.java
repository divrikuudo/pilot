package com.ge.power.checklist.portal.dto;

import java.util.List;

public class SearchSectionDetails {

	private String sectionId;
	private String sectionName;
	private List<SearchStepDetails> searchStepDetails;
	
	public List<SearchStepDetails> getSearchStepDetails() {
		return searchStepDetails;
	}
	public void setSearchStepDetails(List<SearchStepDetails> searchStepDetails) {
		this.searchStepDetails = searchStepDetails;
	}
	public String getSectionId() {
		return sectionId;
	}
	public void setSectionId(String sectionId) {
		this.sectionId = sectionId;
	}
	public String getSectionName() {
		return sectionName;
	}
	public void setSectionName(String sectionName) {
		this.sectionName = sectionName;
	}
	
	
}
