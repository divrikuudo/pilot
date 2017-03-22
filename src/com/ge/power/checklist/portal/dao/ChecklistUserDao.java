package com.ge.power.checklist.portal.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ge.power.checklist.mobile.dto.ChecklistDetailDto;
import com.ge.power.checklist.mobile.dto.ChecklistRecordDTO;
import com.ge.power.checklist.mobile.dto.EDSRDetailDTO;
import com.ge.power.checklist.portal.dto.AddAction;
import com.ge.power.checklist.portal.dto.BusinessHierarchyDto;
import com.ge.power.checklist.portal.dto.ChecklistComponentDto;
import com.ge.power.checklist.portal.dto.ChecklistFormDto;
import com.ge.power.checklist.portal.dto.ChecklistPortalDto;
import com.ge.power.checklist.portal.dto.ChecklistValidationRuleDTO;
import com.ge.power.checklist.portal.dto.Element;
import com.ge.power.checklist.portal.dto.ElementArributuesProp;
import com.ge.power.checklist.portal.dto.FormFilterSection;
import com.ge.power.checklist.portal.dto.ImageDTO;
import com.ge.power.checklist.portal.dto.Images;
import com.ge.power.checklist.portal.dto.PortalUserDetailDTO;
import com.ge.power.checklist.portal.dto.QuestionAnswerElement;
import com.ge.power.checklist.portal.dto.RecordDTO;
import com.ge.power.checklist.portal.dto.Rule;
import com.ge.power.checklist.portal.dto.SectionElement;
import com.ge.power.checklist.portal.dto.StepElement;

public interface ChecklistUserDao {

	public List<PortalUserDetailDTO> getUserRoleAndPermission(String ssoId,
			String query);

	public List<ChecklistComponentDto> checklistComponent(String query);

	public List<ChecklistPortalDto> loadChecklist(String ssoId, String roleName, String recordCount, String pageLimit, String query, String query1);

	public List<ChecklistPortalDto> pagenationChecklist(String ssoId,
			String roleName, String query);

	public List<ChecklistPortalDto> deleteChecklist(String formId, HashMap<String, Object> genericObj);

	public List<BusinessHierarchyDto> businessHierarchyDetail(String ssoId,
			String roleName, String query);

	public List<ChecklistPortalDto> searchChecklistForm(String ssoId,
			String roleName, String checklistName,  String query, String checklistTitle);
	
	public List<BusinessHierarchyDto> subFunctionChecklist(String groupId, String query);
	
	public List<BusinessHierarchyDto> subFunctionChecklist(String groupId, String ssoId, String query);
	
	public List<ChecklistValidationRuleDTO> getValidationRuleList(String elementId, String query);

	public List<ElementArributuesProp> getPropertiesList(String elementId, String query);

	public Map<String, Object> saveMetadata(ChecklistFormDto jsonObject,	String imagePath)throws Exception;

	public Integer getForm(String formidquery)throws Exception;

	public Integer getLanguage(ChecklistFormDto jsonObject, HashMap<String, Object> genericObj, String languageIdquery)throws Exception;

	public List<ChecklistFormDto> saveGroupAssociation(ChecklistFormDto jsonObject, HashMap<String, Object> genericObj,
			String groupAccocation)throws Exception;

	public List<ChecklistFormDto> saveLanguageMap(ChecklistFormDto jsonObject, HashMap<String, Object> genericObj, String languagemap)throws Exception;

	public List<ChecklistFormDto> saveFormVersion(ChecklistFormDto jsonObject,
			HashMap<String, Object> genericObj, String formVersion)throws Exception;

	public Integer getSectionId(String sectionidquery)throws Exception;

	public void saveSection(SectionElement objsec1,	HashMap<String, Object> genericObj, String query)throws Exception;

	public Integer getStepId(String stepidquery)throws Exception;

	public void saveStep(StepElement objsec1,
			HashMap<String, Object> genericObj, String query)throws Exception;

	public Integer getQuestionId(String questionIdQuery)throws Exception;

	public Integer getAnswerId(String answerIdQuery)throws Exception;

	public void saveQuestion(QuestionAnswerElement objsec1,
			HashMap<String, Object> genericObj, String query)throws Exception;

	public void saveAnswer(QuestionAnswerElement objsec1,
			HashMap<String, Object> genericObj, String query)throws Exception;	

	public void saveQuestionAnswerMap(QuestionAnswerElement objsec1,
			HashMap<String, Object> genericObj, String answerquery)throws Exception;

	public void saveElementMap(Element objsec1,
			HashMap<String, Object> genericObj, String elementmap)throws Exception;

	//public Integer getQuesAssocId(String quesassocidquery)throws Exception;

	public void saveAttributeProb(ElementArributuesProp objse1,
			HashMap<String, Object> genericObj, String attributeProb)throws Exception;

	public void saveRule(Rule objse1,
			HashMap<String, Object> genericObj, String rule)throws Exception;

	public void saveRuleAction(AddAction objse1,
			HashMap<String, Object> genericObj, String addAction)throws Exception;

	public List<String> getElementRuleCategoryList(String query);
	
	public List<ChecklistValidationRuleDTO> getRuleActionsDetailList(String query);

	public void saveTagMap(QuestionAnswerElement objsec1,
			HashMap<String, Object> genericObj, String quesanswermap)throws Exception;

	public void saveHelpImage(Images objse1,
			HashMap<String, Object> genericObj, String helpImage)throws Exception;

	public List<FormFilterSection> sectionDetail(FormFilterSection jsonObject, String query);

	public List<FormFilterSection> stepDetail(FormFilterSection jsonObject, String query);

	public List<FormFilterSection> quesDetail(FormFilterSection jsonObject, String query);
	
	public ChecklistDetailDto getChecklistFormDetailfromId(String formId, String query);
	
	public List<ChecklistDetailDto> getChecklistMetadataForEdit(String formId, String query);
	
	public List<ChecklistRecordDTO> getStepDetailFromStepid(String stepId, String query); 
	
	public List<String> getImagePathListforDelete(String formId, String languageName, String query);
	
	public String checklistPublishment(String formId, String query);
	
	public String checklistAuditTrail(ChecklistFormDto dto, String json, String query);
	
	public List<String> getChecklistNames(String ssoId, String role, String query);
	
	public List<String> getChecklistVersion(String formname, String ssoId, String query, String rolename);
	
	public List<EDSRDetailDTO> getChecklistProjects(String formname, String ssoId);
		
	public List<RecordDTO> searchRecords(ChecklistFormDto dto, String query);
	
	public List<String> getSectionDetails(String formname, String ssoId, String version);
	
	public Map<String, List<String>> checkFormForEdit(ChecklistFormDto dto);
	
	public String uploadHelpImages(List<ImageDTO> dtos);
	
	public Map<String, Object> downloadHelpImages(ChecklistFormDto dto);
	
	public String ischecklistnameexists(ChecklistFormDto dto);	
}
