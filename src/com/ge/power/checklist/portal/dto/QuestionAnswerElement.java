package com.ge.power.checklist.portal.dto;

import java.util.ArrayList;

public class QuestionAnswerElement {

	private String answerName;
    private String questionId;
    private String questionName;
    private String answerId;
    private String answerDescription;
    private String questionDescription;
    private String questionAccessibility;
    private String isPunchListQuestion;
    private String questionOrder;
    private String imagesDescription;    
    private ArrayList<Elements> elements = null;  
    private ArrayList<Images> images = null;
    private String isDeleted;
    private String quesAssocId;
    private String questionClientUid;
    private String questionChange;
    private String imagesDescLevel;
    private String answerClientUid;

	public String getAnswerName() {
		return answerName;
	}

	public void setAnswerName(String answerName) {
		this.answerName = answerName;
	}

	public String getQuestionId() {
		return questionId;
	}

	public void setQuestionId(String questionId) {
		this.questionId = questionId;
	}	

	public String getQuestionName() {
		return questionName;
	}

	public void setQuestionName(String questionName) {
		this.questionName = questionName;
	}

	public String getAnswerId() {
		return answerId;
	}

	public void setAnswerId(String answerId) {
		this.answerId = answerId;
	}	

	public String getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(String isDeleted) {
		this.isDeleted = isDeleted;
	}

	public String getAnswerDescription() {
		return answerDescription;
	}

	public void setAnswerDescription(String answerDescription) {
		this.answerDescription = answerDescription;
	}

	public String getQuestionDescription() {
		return questionDescription;
	}

	public void setQuestionDescription(String questionDescription) {
		this.questionDescription = questionDescription;
	}

	public String getQuestionAccessibility() {
		return questionAccessibility;
	}

	public void setQuestionAccessibility(String questionAccessibility) {
		this.questionAccessibility = questionAccessibility;
	}

	

	public String getQuestionOrder() {
		return questionOrder;
	}

	public void setQuestionOrder(String questionOrder) {
		this.questionOrder = questionOrder;
	}

	public String getImagesDescription() {
		return imagesDescription;
	}

	public void setImagesDescription(String imagesDescription) {
		this.imagesDescription = imagesDescription;
	}

	public ArrayList<Elements> getElements() {
		return elements;
	}

	public void setElements(ArrayList<Elements> elements) {
		this.elements = elements;
	}

	public String getQuesAssocId() {
		return quesAssocId;
	}

	public void setQuesAssocId(String quesAssocId) {
		this.quesAssocId = quesAssocId;
	}

	public String getQuestionClientUid() {
		return questionClientUid;
	}

	public void setQuestionClientUid(String questionClientUid) {
		this.questionClientUid = questionClientUid;
	}

	public String getQuestionChange() {
		return questionChange;
	}

	public void setQuestionChange(String questionChange) {
		this.questionChange = questionChange;
	}

	public String getImagesDescLevel() {
		return imagesDescLevel;
	}

	public void setImagesDescLevel(String imagesDescLevel) {
		this.imagesDescLevel = imagesDescLevel;
	}

	public String getAnswerClientUid() {
		return answerClientUid;
	}

	public void setAnswerClientUid(String answerClientUid) {
		this.answerClientUid = answerClientUid;
	}

	public String getIsPunchListQuestion() {
		return isPunchListQuestion;
	}

	public void setIsPunchListQuestion(String isPunchListQuestion) {
		this.isPunchListQuestion = isPunchListQuestion;
	}

	public ArrayList<Images> getImages() {
		return images;
	}

	public void setImages(ArrayList<Images> images) {
		this.images = images;
	} 

}
