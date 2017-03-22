package com.ge.power.checklist.portal.dto;

import java.util.ArrayList;
//import org.postgresql.util.PGobject;


public class ChecklistFormDto {//extends PGobject{
	
	
	/*private static final long serialVersionUID = 1L;
	ChecklistFormDto(){
		PGobject pGobject = new PGobject();
		String formName = "test56";
		try{
		setType("form_details");
		//setValue("("'"test)");
		pGobject.setValue(formName);
		}catch(Exception e){
			e.printStackTrace();
		}
	}*/

	private String subFunction;

    private String updatedDate;

    private String formName;

    private ArrayList<SectionElements> sectionElements = null;
    
    //private SectionElements[] sectionElements;

    private String imagesDesc;

    private String function;

    private String updatedBy;

    private String groupId;

    private String formId;

    private String subFunctionId;
    
    private ArrayList<Images> images = null;

    //private Images[] images;

    private String functionId;

    private String group;

    private String submittedBy;

    private String createdDate;
    
    private String comments;
    
    private String formStatus;
    
    private String formStatusId;
    
    private String isFormConfigured;
    
    private String formFooterDetails;
    
    private String formHeaderDetails;
    
    private String formLanguage;
    
    private String formLanguageId;
    
    private String isActive;
    
    private String formVersionNo;
    private String imagesDescLevel;
    private String formChange;
    private String sectionLevelChange;
    private String assignedToProject;
    private String formStatusVersion;
    private String publishVersion;
    private String draftVersion;
    private String formAction;
    private String baseFormId;
    private String minMajor;
    private String fromDate;
    private String toDate;
    private String sectionId;
    private String stepId;
    private String projectId;
    private String tempFormId;
    private String associationId;
    private String helpTextLevel;
    
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

	public String getTempFormId() {
		return tempFormId;
	}

	public void setTempFormId(String tempFormId) {
		this.tempFormId = tempFormId;
	}

	public String getProjectId() {
		return projectId;
	}

	public void setProjectId(String projectId) {
		this.projectId = projectId;
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

	public String getFromDate() {
		return fromDate;
	}

	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}

	public String getToDate() {
		return toDate;
	}

	public void setToDate(String toDate) {
		this.toDate = toDate;
	}

	public String getMinMajor() {
		return minMajor;
	}

	public void setMinMajor(String minMajor) {
		this.minMajor = minMajor;
	}

	public String getBaseFormId() {
		return baseFormId;
	}

	public void setBaseFormId(String baseFormId) {
		this.baseFormId = baseFormId;
	}

	public String getDraftVersion() {
		return draftVersion;
	}

	public void setDraftVersion(String draftVersion) {
		this.draftVersion = draftVersion;
	}

	public String getFormAction() {
		return formAction;
	}

	public void setFormAction(String formAction) {
		this.formAction = formAction;
	}

	public String getPublishVersion() {
		return publishVersion;
	}

	public void setPublishVersion(String publishVersion) {
		this.publishVersion = publishVersion;
	}

	public String getFormStatusVersion() {
		return formStatusVersion;
	}

	public void setFormStatusVersion(String formStatusVersion) {
		this.formStatusVersion = formStatusVersion;
	}

	public String getAssignedToProject() {
		return assignedToProject;
	}

	public void setAssignedToProject(String assignedToProject) {
		this.assignedToProject = assignedToProject;
	}

	public String getSubFunction ()
    {
        return subFunction;
    }

    public void setSubFunction (String subFunction)
    {
        this.subFunction = subFunction;
    }

    public String getUpdatedDate ()
    {
        return updatedDate;
    }

    public void setUpdatedDate (String updatedDate)
    {
        this.updatedDate = updatedDate;
    }

    public String getFormName ()
    {
        return formName;
    }

    public void setFormName (String formName)
    {
        this.formName = formName;
    }
   

    public String getImagesDesc ()
    {
        return imagesDesc;
    }

    public void setImagesDesc (String imagesDesc)
    {
        this.imagesDesc = imagesDesc;
    }

    public String getFunction ()
    {
        return function;
    }

    public void setFunction (String function)
    {
        this.function = function;
    }

    public String getUpdatedBy ()
    {
        return updatedBy;
    }

    public void setUpdatedBy (String updatedBy)
    {
        this.updatedBy = updatedBy;
    }

    public String getGroupId ()
    {
        return groupId;
    }

    public void setGroupId (String groupId)
    {
        this.groupId = groupId;
    }

    public String getFormId ()
    {
        return formId;
    }

    public void setFormId (String formId)
    {
        this.formId = formId;
    }

    public String getSubFunctionId ()
    {
        return subFunctionId;
    }

    public void setSubFunctionId (String subFunctionId)
    {
        this.subFunctionId = subFunctionId;
    }
   

    public String getFunctionId ()
    {
        return functionId;
    }

    public void setFunctionId (String functionId)
    {
        this.functionId = functionId;
    }

    public String getGroup ()
    {
        return group;
    }

    public void setGroup (String group)
    {
        this.group = group;
    }

    public String getSubmittedBy ()
    {
        return submittedBy;
    }

    public void setSubmittedBy (String submittedBy)
    {
        this.submittedBy = submittedBy;
    }

    public String getCreatedDate ()
    {
        return createdDate;
    }

    public void setCreatedDate (String createdDate)
    {
        this.createdDate = createdDate;
    }

	public ArrayList<SectionElements> getSectionElements() {
		return sectionElements;
	}

	public void setSectionElements(ArrayList<SectionElements> sectionElements) {
		this.sectionElements = sectionElements;
	}

	public ArrayList<Images> getImages() {
		return images;
	}

	public void setImages(ArrayList<Images> images) {
		this.images = images;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getFormStatus() {
		return formStatus;
	}

	public void setFormStatus(String formStatus) {
		this.formStatus = formStatus;
	}

	public String getFormStatusId() {
		return formStatusId;
	}

	public void setFormStatusId(String formStatusId) {
		this.formStatusId = formStatusId;
	}

	public String getIsFormConfigured() {
		return isFormConfigured;
	}

	public void setIsFormConfigured(String isFormConfigured) {
		this.isFormConfigured = isFormConfigured;
	}

	public String getFormFooterDetails() {
		return formFooterDetails;
	}

	public void setFormFooterDetails(String formFooterDetails) {
		this.formFooterDetails = formFooterDetails;
	}

	public String getFormHeaderDetails() {
		return formHeaderDetails;
	}

	public void setFormHeaderDetails(String formHeaderDetails) {
		this.formHeaderDetails = formHeaderDetails;
	}

	public String getFormLanguage() {
		return formLanguage;
	}

	public void setFormLanguage(String formLanguage) {
		this.formLanguage = formLanguage;
	}

	public String getFormLanguageId() {
		return formLanguageId;
	}

	public void setFormLanguageId(String formLanguageId) {
		this.formLanguageId = formLanguageId;
	}

	public String getIsActive() {
		return isActive;
	}

	public void setIsActive(String isActive) {
		this.isActive = isActive;
	}

	public String getFormVersionNo() {
		return formVersionNo;
	}

	public void setFormVersionNo(String formVersionNo) {
		this.formVersionNo = formVersionNo;
	}

	public String getImagesDescLevel() {
		return imagesDescLevel;
	}

	public void setImagesDescLevel(String imagesDescLevel) {
		this.imagesDescLevel = imagesDescLevel;
	}

	public String getFormChange() {
		return formChange;
	}

	public void setFormChange(String formChange) {
		this.formChange = formChange;
	}

	public String getSectionLevelChange() {
		return sectionLevelChange;
	}

	public void setSectionLevelChange(String sectionLevelChange) {
		this.sectionLevelChange = sectionLevelChange;
	}

	
	
	

}
