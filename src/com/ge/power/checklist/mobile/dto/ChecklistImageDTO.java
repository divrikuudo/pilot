package com.ge.power.checklist.mobile.dto;

import java.util.ArrayList;
import java.util.Map;

public class ChecklistImageDTO {
	
	private String imageId;
	private String imageName;
	private String imageData;
	private String sequanceNo;
	private String questionId;
	private String recordId;
	private String formId;
	private String imageType;
	private String userSSOId;
	private String operation;
	private String helpDescription;
	private String helpTextLevel;
	private String sectionId;
	private String stepId;
	private String elementId;
	private String elementSequenceNo;
	private String thumbnailData;
	private String serverImageId;
	private ArrayList<Map<String, Object>> imageUrls;
	private ArrayList<Map<String, Object>> imageDetailList;
	private ArrayList<ChecklistImageDTO> recordWiseImagesList;
	private ArrayList<ChecklistImageDTO> imagesList;
	
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
	public ArrayList<Map<String, Object>> getImageUrls() {
		return imageUrls;
	}
	public void setImageUrls(ArrayList<Map<String, Object>> imageUrls) {
		this.imageUrls = imageUrls;
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
	public String getElementId() {
		return elementId;
	}
	public void setElementId(String elementId) {
		this.elementId = elementId;
	}
	public String getElementSequenceNo() {
		return elementSequenceNo;
	}
	public void setElementSequenceNo(String elementSequenceNo) {
		this.elementSequenceNo = elementSequenceNo;
	}
	public String getThumbnailData() {
		return thumbnailData;
	}
	public void setThumbnailData(String thumbnailData) {
		this.thumbnailData = thumbnailData;
	}
	public ArrayList<Map<String, Object>> getImageDetailList() {
		return imageDetailList;
	}
	public void setImageDetailList(ArrayList<Map<String, Object>> imageDetailList) {
		this.imageDetailList = imageDetailList;
	}
	public ArrayList<ChecklistImageDTO> getRecordWiseImagesList() {
		return recordWiseImagesList;
	}
	public void setRecordWiseImagesList(
			ArrayList<ChecklistImageDTO> recordWiseImagesList) {
		this.recordWiseImagesList = recordWiseImagesList;
	}
	public ArrayList<ChecklistImageDTO> getImagesList() {
		return imagesList;
	}
	public void setImagesList(ArrayList<ChecklistImageDTO> imagesList) {
		this.imagesList = imagesList;
	}
	public String getServerImageId() {
		return serverImageId;
	}
	public void setServerImageId(String serverImageId) {
		this.serverImageId = serverImageId;
	}
}
