package com.ge.power.checklist.portal.dto;

import java.util.ArrayList;

public class SectionElement {
	
	private String sectionId;

	private ArrayList<Images> images = null;
	
	//private Images[] images;

    private String sectionName;

    private String isDeleted;

    private String imagesDesc;

    private ArrayList<StepElements> stepElements = null;
    
    //private StepElements[] stepElements;

    private String isCustomized;
    private String sectionLabel;
    private String sectionOrder;
    private String outOfScopeSection;
    private String punchListSection;
    private String sectionTempId;
    private String sectionChange;
    private String stepLevelChange;
    private String imagesDescLevel;
    

	public String getSectionId() {
		return sectionId;
	}

	public void setSectionId(String sectionId) {
		this.sectionId = sectionId;
	}

	public ArrayList<Images> getImages() {
		return images;
	}

	public void setImages(ArrayList<Images> images) {
		this.images = images;
	}

	public String getSectionName() {
		return sectionName;
	}

	public void setSectionName(String sectionName) {
		this.sectionName = sectionName;
	}

	public String getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(String isDeleted) {
		this.isDeleted = isDeleted;
	}

	public String getImagesDesc() {
		return imagesDesc;
	}

	public void setImagesDesc(String imagesDesc) {
		this.imagesDesc = imagesDesc;
	}

	public ArrayList<StepElements> getStepElements() {
		return stepElements;
	}

	public void setStepElements(ArrayList<StepElements> stepElements) {
		this.stepElements = stepElements;
	}

	

	public String getSectionLabel() {
		return sectionLabel;
	}

	public void setSectionLabel(String sectionLabel) {
		this.sectionLabel = sectionLabel;
	}

	public String getSectionOrder() {
		return sectionOrder;
	}

	public void setSectionOrder(String sectionOrder) {
		this.sectionOrder = sectionOrder;
	}

	
	public String getSectionTempId() {
		return sectionTempId;
	}

	public void setSectionTempId(String sectionTempId) {
		this.sectionTempId = sectionTempId;
	}

	public String getSectionChange() {
		return sectionChange;
	}

	public void setSectionChange(String sectionChange) {
		this.sectionChange = sectionChange;
	}

	public String getStepLevelChange() {
		return stepLevelChange;
	}

	public void setStepLevelChange(String stepLevelChange) {
		this.stepLevelChange = stepLevelChange;
	}

	public String getImagesDescLevel() {
		return imagesDescLevel;
	}

	public void setImagesDescLevel(String imagesDescLevel) {
		this.imagesDescLevel = imagesDescLevel;
	}

	public String getIsCustomized() {
		return isCustomized;
	}

	public void setIsCustomized(String isCustomized) {
		this.isCustomized = isCustomized;
	}

	public String getOutOfScopeSection() {
		return outOfScopeSection;
	}

	public void setOutOfScopeSection(String outOfScopeSection) {
		this.outOfScopeSection = outOfScopeSection;
	}

	public String getPunchListSection() {
		return punchListSection;
	}

	public void setPunchListSection(String punchListSection) {
		this.punchListSection = punchListSection;
	}

	
}
