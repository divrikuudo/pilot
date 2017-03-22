package com.ge.power.checklist.portal.service;

import java.util.List;
import java.util.Map;

import com.ge.power.checklist.mobile.dto.ChecklistDetailDto;
import com.ge.power.checklist.mobile.dto.ChecklistRecordDTO;
import com.ge.power.checklist.mobile.dto.EDSRDetailDTO;
import com.ge.power.checklist.portal.dto.BusinessHierarchyDto;
import com.ge.power.checklist.portal.dto.ChecklistComponentDto;
import com.ge.power.checklist.portal.dto.ChecklistFormDto;
import com.ge.power.checklist.portal.dto.ChecklistPortalDto;
import com.ge.power.checklist.portal.dto.ElementArributuesProp;
import com.ge.power.checklist.portal.dto.FormFilterSection;
import com.ge.power.checklist.portal.dto.ImageDTO;
import com.ge.power.checklist.portal.dto.PortalUserDetailDTO;
import com.ge.power.checklist.portal.dto.RecordDTO;

public interface ChecklistUserService {	

	public List<PortalUserDetailDTO> getUserRoleAndPermission(String ssoId);			

	public List<ChecklistComponentDto> checklistComponent();	

	public List<ChecklistPortalDto> loadChecklist(String ssoId,
			String roleName, String recordCount, String pageLimit);

	public List<ChecklistPortalDto> pagenationChecklist(String ssoId,
			String roleName);

	public List<ChecklistPortalDto> deleteChecklist(String formId, String languagename);

	public List<BusinessHierarchyDto> businessHierarchyDetail(String ssoId,
			String roleName);

	public List<ChecklistPortalDto> searchChecklistForm(String ssoId,
			String roleName, String checklistName, String checklistTitle);	

	public List<BusinessHierarchyDto> subFunctionChecklist(String groupId, String dropValue);
	
	public List<BusinessHierarchyDto> subFunctionChecklist(String groupId, String ssoId, String dropValue);
		
	public Map<String, Object> getValidationRuleList(String elementId);

	public List<ElementArributuesProp> getPropertiesList(String elementId);

	public Map<String, Object> saveMetadata(ChecklistFormDto jsonObject) throws Exception;

	public List<FormFilterSection> sectionDetail(FormFilterSection jsonObject);

	public List<FormFilterSection> stepDetail(FormFilterSection jsonObject);

	public List<FormFilterSection> quesDetail(FormFilterSection jsonObject);
	
	public List<ChecklistDetailDto> getChecklistMetadataForEdit(String formId);

	public ChecklistDetailDto getChecklistFormDetailfromId(String formId);
	
	public List<ChecklistRecordDTO> getStepDetailFromStepid(String stepId);
	
	public String checklistPublishment(String formId);
	
	public String checklistAuditTrail(ChecklistFormDto dto, String json);
	
	public List<String> getChecklistNames(String ssoId, String role);
	
	public List<String> getChecklistVersion(String formname, String ssoId, String rolename);
	
	public List<EDSRDetailDTO> getChecklistProjects(String formname, String ssoId);
	
	public List<RecordDTO> searchRecords(ChecklistFormDto dto);
	
	public List<String> getSectionDetails(String formname, String ssoId, String version);
	
	public Map<String, List<String>> checkFormForEdit(ChecklistFormDto dto);
	
	public String uploadHelpImages(List<ImageDTO> dtos);
	
	public Map<String, Object> downloadHelpImages(ChecklistFormDto dto);
	
	public String ischecklistnameexists(ChecklistFormDto dto);	
}
