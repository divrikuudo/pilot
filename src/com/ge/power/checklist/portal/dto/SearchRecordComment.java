/**
 * 
 */
package com.ge.power.checklist.portal.dto;

/**
 * @author MR836436
 *
 */
public class SearchRecordComment {

	private String questionId;
	private String answerId;
	private String ansDesc;
	private String comments;
	private String origComments;
	private String recordId;
	
	
	
	public String getRecordId() {
		return recordId;
	}
	public void setRecordId(String recordId) {
		this.recordId = recordId;
	}
	public String getQuestionId() {
		return questionId;
	}
	public void setQuestionId(String questionId) {
		this.questionId = questionId;
	}
	public String getAnswerId() {
		return answerId;
	}
	public void setAnswerId(String answerId) {
		this.answerId = answerId;
	}
	public String getAnsDesc() {
		return ansDesc;
	}
	public void setAnsDesc(String ansDesc) {
		this.ansDesc = ansDesc;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	public String getOrigComments() {
		return origComments;
	}
	public void setOrigComments(String origComments) {
		this.origComments = origComments;
	}
	
	
}
