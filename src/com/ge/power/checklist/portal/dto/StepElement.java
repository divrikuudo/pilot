package com.ge.power.checklist.portal.dto;

import java.util.ArrayList;

public class StepElement {
	
	//private QuestionAnswerElements[] questionAnswerElements;
	
    private ArrayList<QuestionAnswerElements> questionAnswerElements = null;

    private Images[] images;

    private String isDeleted;

    private String imagesDesc;

    private String stepId;

    private String stepName;
    private String stepLabel;
    private String stepOrder;
    private String stepTempId;
    private String stepChange;
    private String questionLevelChange;
    private String imagesDescLevel;

	public ArrayList<QuestionAnswerElements> getQuestionAnswerElements() {
		return questionAnswerElements;
	}

	public void setQuestionAnswerElements(
			ArrayList<QuestionAnswerElements> questionAnswerElements) {
		this.questionAnswerElements = questionAnswerElements;
	}

	public Images[] getImages() {
		return images;
	}

	public void setImages(Images[] images) {
		this.images = images;
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

	public String getStepLabel() {
		return stepLabel;
	}

	public void setStepLabel(String stepLabel) {
		this.stepLabel = stepLabel;
	}

	public String getStepOrder() {
		return stepOrder;
	}

	public void setStepOrder(String stepOrder) {
		this.stepOrder = stepOrder;
	}

	public String getStepTempId() {
		return stepTempId;
	}

	public void setStepTempId(String stepTempId) {
		this.stepTempId = stepTempId;
	}

	public String getStepChange() {
		return stepChange;
	}

	public void setStepChange(String stepChange) {
		this.stepChange = stepChange;
	}

	public String getQuestionLevelChange() {
		return questionLevelChange;
	}

	public void setQuestionLevelChange(String questionLevelChange) {
		this.questionLevelChange = questionLevelChange;
	}

	public String getImagesDescLevel() {
		return imagesDescLevel;
	}

	public void setImagesDescLevel(String imagesDescLevel) {
		this.imagesDescLevel = imagesDescLevel;
	}

}
