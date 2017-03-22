package com.ge.power.checklist.portal.dto;

import java.util.Map;

import org.codehaus.jackson.map.annotate.JsonSerialize;

@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
public class ChecklistPortalDto {

	private String functionId;
	private String subFunctionId;
	private String groupId;
	private String groupParentId;
	private String formId;
	private String sectionId;
	private String stepId;	
	private String functionName;
	private String subFunctionName;
	private String groupName;
	private String formName;
	private String sectionName;
	private String stepName;	
	private String versionNo;
	private String headerName;
	private String footerName;
	private String formConfigured;
	private String formStatus;
	private String formLanguage;
	private String formType;
	private String formAccess;
	private String ruleId;
	private String ruleName;
	private String ruleDesc;
	private String formLanguageId;	
	private String ruleRange;
	private String ruleApplicability;
	private String formStatusId;
	private String createdBy;
	private String createDate;
	private String authorname;
	private String elementId;
	private String elementName;
	private String elementType;
	private String elementValue;	
	private String iconName;
	private String iconImage;
	private ChecklistRequestStatus requestStatus;
	private Map resultSet;
	private String rownum;
	private String draftVersion;
	private String publishVersion;
	private String baseFormId;
	
	public String getDraftVersion() {
		return draftVersion;
	}

	public void setDraftVersion(String draftVersion) {
		this.draftVersion = draftVersion;
	}

	public String getPublishVersion() {
		return publishVersion;
	}

	public void setPublishVersion(String publishVersion) {
		this.publishVersion = publishVersion;
	}

	public String getBaseFormId() {
		return baseFormId;
	}

	public void setBaseFormId(String baseFormId) {
		this.baseFormId = baseFormId;
	}

	public String getFunctionId() {
		return functionId;
	}

	public void setFunctionId(String functionId) {
		this.functionId = functionId;
	}

	public String getSubFunctionId() {
		return subFunctionId;
	}

	public void setSubFunctionId(String subFunctionId) {
		this.subFunctionId = subFunctionId;
	}

	public String getGroupId() {
		return groupId;
	}

	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}

	public String getGroupParentId() {
		return groupParentId;
	}

	public void setGroupParentId(String groupParentId) {
		this.groupParentId = groupParentId;
	}

	public String getFormId() {
		return formId;
	}

	public void setFormId(String formId) {
		this.formId = formId;
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

	public String getSubFunctionName() {
		return subFunctionName;
	}

	public void setSubFunctionName(String subFunctionName) {
		this.subFunctionName = subFunctionName;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getSectionName() {
		return sectionName;
	}

	public void setSectionName(String sectionName) {
		this.sectionName = sectionName;
	}

	public String getStepName() {
		return stepName;
	}

	public void setStepName(String stepName) {
		this.stepName = stepName;
	}

	public String getHeaderName() {
		return headerName;
	}

	public void setHeaderName(String headerName) {
		this.headerName = headerName;
	}

	public String getFooterName() {
		return footerName;
	}

	public void setFooterName(String footerName) {
		this.footerName = footerName;
	}

	public String getFormConfigured() {
		return formConfigured;
	}

	public void setFormConfigured(String formConfigured) {
		this.formConfigured = formConfigured;
	}

	public String getFormType() {
		return formType;
	}

	public void setFormType(String formType) {
		this.formType = formType;
	}

	public String getFormAccess() {
		return formAccess;
	}

	public void setFormAccess(String formAccess) {
		this.formAccess = formAccess;
	}

	public String getRuleId() {
		return ruleId;
	}

	public void setRuleId(String ruleId) {
		this.ruleId = ruleId;
	}

	public String getRuleName() {
		return ruleName;
	}

	public void setRuleName(String ruleName) {
		this.ruleName = ruleName;
	}

	public String getRuleDesc() {
		return ruleDesc;
	}

	public void setRuleDesc(String ruleDesc) {
		this.ruleDesc = ruleDesc;
	}

	public String getFormLanguageId() {
		return formLanguageId;
	}

	public void setFormLanguageId(String formLanguageId) {
		this.formLanguageId = formLanguageId;
	}

	public String getRuleRange() {
		return ruleRange;
	}

	public void setRuleRange(String ruleRange) {
		this.ruleRange = ruleRange;
	}

	public String getRuleApplicability() {
		return ruleApplicability;
	}

	public void setRuleApplicability(String ruleApplicability) {
		this.ruleApplicability = ruleApplicability;
	}

	public String getFormStatusId() {
		return formStatusId;
	}

	public void setFormStatusId(String formStatusId) {
		this.formStatusId = formStatusId;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getFunctionName() {
		return functionName;
	}

	public void setFunctionName(String functionName) {
		this.functionName = functionName;
	}

	public String getFormName() {
		return formName;
	}

	public void setFormName(String formName) {
		this.formName = formName;
	}

	public String getVersionNo() {
		return versionNo;
	}

	public void setVersionNo(String versionNo) {
		this.versionNo = versionNo;
	}

	public String getFormStatus() {
		return formStatus;
	}

	public void setFormStatus(String formStatus) {
		this.formStatus = formStatus;
	}

	public String getFormLanguage() {
		return formLanguage;
	}

	public void setFormLanguage(String formLanguage) {
		this.formLanguage = formLanguage;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}	

	public String getAuthorname() {
		return authorname;
	}

	public void setAuthorname(String authorname) {
		this.authorname = authorname;
	}

	public String getElementId() {
		return elementId;
	}

	public void setElementId(String elementId) {
		this.elementId = elementId;
	}

	public String getElementName() {
		return elementName;
	}

	public void setElementName(String elementName) {
		this.elementName = elementName;
	}

	public String getElementType() {
		return elementType;
	}

	public void setElementType(String elementType) {
		this.elementType = elementType;
	}

	public String getElementValue() {
		return elementValue;
	}

	public void setElementValue(String elementValue) {
		this.elementValue = elementValue;
	}

	public String getIconName() {
		return iconName;
	}

	public void setIconName(String iconName) {
		this.iconName = iconName;
	}

	public String getIconImage() {
		return iconImage;
	}

	public void setIconImage(String iconImage) {
		this.iconImage = iconImage;
	}

	public ChecklistRequestStatus getRequestStatus() {
		return requestStatus;
	}

	public void setRequestStatus(ChecklistRequestStatus requestStatus) {
		this.requestStatus = requestStatus;
	}

	public Map getResultSet() {
		return resultSet;
	}

	public void setResultSet(Map resultSet) {
		this.resultSet = resultSet;
	}

	public String getRownum() {
		return rownum;
	}

	public void setRownum(String rownum) {
		this.rownum = rownum;
	}
	

}
