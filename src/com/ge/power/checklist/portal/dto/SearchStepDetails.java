package com.ge.power.checklist.portal.dto;

import java.util.List;

public class SearchStepDetails {

	private String stepId;
	private String stepName;
	private List<SearchQuestDetails> searchQuestDetails;
	
	
	public List<SearchQuestDetails> getSearchQuestDetails() {
		return searchQuestDetails;
	}
	public void setSearchQuestDetails(List<SearchQuestDetails> searchQuestDetails) {
		this.searchQuestDetails = searchQuestDetails;
	}
	public String getStepId() {
		return stepId;
	}
	public void setStepId(String stepId) {
		this.stepId = stepId;
	}
	public String getStepName() {
		return stepName;
	}
	public void setStepName(String stepName) {
		this.stepName = stepName;
	}
	
	
}
