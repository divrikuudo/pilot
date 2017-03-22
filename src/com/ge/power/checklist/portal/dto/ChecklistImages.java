package com.ge.power.checklist.portal.dto;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ge.power.checklist.mobile.dto.ChecklistImageDTO;

public class ChecklistImages {
	
	private String imageId;
	private String imageName;
	private String imageData;
	private String sequanceNo;
	private String sectionId;
	private String stepId;
	private String questionId;
	private String recordId;
	private String formId;
	private String imageType;
	private String userSSOId;
	private String operation;
	private String helpDescription;
	private String helpTextLevel;
	private ArrayList<ChecklistImages> imagesList;
	private String associationId;

	public String getImageId() {
		return imageId;
	}
	public void setImageId(String imageId) {
		this.imageId = imageId;
	}
	public String getImageName() {
		return imageName;
	}
	public void setImageName(String imageName) {
		this.imageName = imageName;
	}
	public String getImageData() {
		return imageData;
	}
	public void setImageData(String imageData) {
		this.imageData = imageData;
	}
	public String getSequanceNo() {
		return sequanceNo;
	}
	public void setSequanceNo(String sequanceNo) {
		this.sequanceNo = sequanceNo;
	}
	public String getSectionId() {
		return sectionId;
	}
	public void setSectionId(String sectionId) {
		this.sectionId = sectionId;
	}
	public String getStepId() {
		return stepId;
	}
	public void setStepId(String stepId) {
		this.stepId = stepId;
	}
	public String getQuestionId() {
		return questionId;
	}
	public void setQuestionId(String questionId) {
		this.questionId = questionId;
	}
	public String getRecordId() {
		return recordId;
	}
	public void setRecordId(String recordId) {
		this.recordId = recordId;
	}
	public String getFormId() {
		return formId;
	}
	public void setFormId(String formId) {
		this.formId = formId;
	}
	public String getImageType() {
		return imageType;
	}
	public void setImageType(String imageType) {
		this.imageType = imageType;
	}
	public String getUserSSOId() {
		return userSSOId;
	}
	public void setUserSSOId(String userSSOId) {
		this.userSSOId = userSSOId;
	}
	public String getOperation() {
		return operation;
	}
	public void setOperation(String operation) {
		this.operation = operation;
	}
	public String getHelpDescription() {
		return helpDescription;
	}
	public void setHelpDescription(String helpDescription) {
		this.helpDescription = helpDescription;
	}
	public String getHelpTextLevel() {
		return helpTextLevel;
	}
	public void setHelpTextLevel(String helpTextLevel) {
		this.helpTextLevel = helpTextLevel;
	}
	public ArrayList<ChecklistImages> getImagesList() {
		return imagesList;
	}
	public void setImagesList(ArrayList<ChecklistImages> imagesList) {
		this.imagesList = imagesList;
	}
	public String getAssociationId() {
		return associationId;
	}
	public void setAssociationId(String associationId) {
		this.associationId = associationId;
	}
	
}
