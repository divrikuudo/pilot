/**
 * 
 */
package com.ge.power.checklist.portal.dto;

import java.util.List;

/**
 * @author MR836436
 *
 */
public class ImageDTO {

	private String formId;
	private String imageData;
	private String imageDescFlag;
	private String helpTextLevel;
	private String associationId;
	private String helpDescription;
	private String operation;
	private String userSSOId;
	private String helpImageUrl;
	private String thumbnailData;
	private String sequanceNo;
	private String imageId;
	private String formStatus;
	
	public String getFormStatus() {
		return formStatus;
	}
	public void setFormStatus(String formStatus) {
		this.formStatus = formStatus;
	}
	public String getImageId() {
		return imageId;
	}
	public void setImageId(String imageId) {
		this.imageId = imageId;
	}
	public String getThumbnailData() {
		return thumbnailData;
	}
	public void setThumbnailData(String thumbnailData) {
		this.thumbnailData = thumbnailData;
	}
	public String getHelpImageUrl() {
		return helpImageUrl;
	}
	public void setHelpImageUrl(String helpImageUrl) {
		this.helpImageUrl = helpImageUrl;
	}
	private List<ImageDTO> imagesList;
	
	public List<ImageDTO> getImagesList() {
		return imagesList;
	}
	public void setImagesList(List<ImageDTO> imagesList) {
		this.imagesList = imagesList;
	}
	public String getHelpTextLevel() {
		return helpTextLevel;
	}
	public void setHelpTextLevel(String helpTextLevel) {
		this.helpTextLevel = helpTextLevel;
	}
	public String getAssociationId() {
		return associationId;
	}
	public void setAssociationId(String associationId) {
		this.associationId = associationId;
	}
	public String getFormId() {
		return formId;
	}
	public void setFormId(String formId) {
		this.formId = formId;
	}
	public String getImageData() {
		return imageData;
	}
	public void setImageData(String imageData) {
		this.imageData = imageData;
	}
	public String getImageDescFlag() {
		return imageDescFlag;
	}
	public void setImageDescFlag(String imageDescFlag) {
		this.imageDescFlag = imageDescFlag;
	}
	public String getHelpDescription() {
		return helpDescription;
	}
	public void setHelpDescription(String helpDescription) {
		this.helpDescription = helpDescription;
	}
	public String getOperation() {
		return operation;
	}
	public void setOperation(String operation) {
		this.operation = operation;
	}
	public String getUserSSOId() {
		return userSSOId;
	}
	public void setUserSSOId(String userSSOId) {
		this.userSSOId = userSSOId;
	}
	public String getSequanceNo() {
		return sequanceNo;
	}
	public void setSequanceNo(String sequanceNo) {
		this.sequanceNo = sequanceNo;
	}
}
