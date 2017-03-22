package com.ge.power.checklist.mobile.service;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.ge.power.checklist.mobile.dto.ChecklistDetailDto;
import com.ge.power.checklist.mobile.dto.ChecklistFormDto;
import com.ge.power.checklist.mobile.dto.ChecklistHelpTextDTO;
import com.ge.power.checklist.mobile.dto.ChecklistParamDto;
import com.ge.power.checklist.mobile.dto.ChecklistRecordDTO;
import com.ge.power.checklist.mobile.dto.ChecklistVersionDTO;
import com.ge.power.checklist.mobile.dto.UserDetailDTO;
import com.ge.power.checklist.mobile.exceptions.ChecklistMobileExceptions;

public interface ChecklistFormMgmtService {
	
	public String authenticateUser(String ssoId);
	
	public List<ChecklistDetailDto> getBusinessHierarchyDetail(String ssoId);
	
	public ChecklistDetailDto getChecklistFormDetailfromId(ChecklistDetailDto detailDto1);
	
	public List<ChecklistDetailDto> getChecklistDetail(String ssoId, String formStatus);
	
	public List<ChecklistDetailDto> getChecklistMetadata(ChecklistDetailDto detailDto1);
	
	public List<ChecklistRecordDTO> getStepDetailFromStepid(String stepId);
	
	public List<ChecklistRecordDTO> getChecklistlatestRecords(String ssoId, String formId, String languageName, String projectId, String noofRows, String pageNo);
	
	public List<ChecklistRecordDTO> getRecordDetailbyRecordIdStepId(String recordId, String stepId);
	
	public List<UserDetailDTO> getUserRoleAndPermission(String ssoId);	
	
	public String uploadChecklistImages(String recordId, String imageId);

	public Map<String, Object> insertRecordDetail(ChecklistFormDto jsonObject) throws Exception;	
	
	public Map<String, Object> getEDSRProjectTurbineDetail();
	
	public String updateImagePath(ChecklistHelpTextDTO dto, String token, String imageFor);
	
	public String updateRulesImagePath(ChecklistHelpTextDTO dto, String token);
	
	public String updateImagePathInBulk(ChecklistHelpTextDTO dto, String token, String imageFor);
	
	public String updateRulesImagePathInBulk(ChecklistHelpTextDTO dto, String token);

	public Map<String, Object> editRecordDetail(ChecklistFormDto jsonObject) throws Exception;
	
	public String deleteChecklistImages(String recordId, ArrayList<String> pathList);
	
	public Integer getChecklistRecordCount(String ssoId, String formId, String languageName, String projectId);
	
	public String updateImagePathByPortal(ChecklistHelpTextDTO dto, String token, String imageFor);
	
	public List<ChecklistRecordDTO> getSingleRecordDetail(String recordId);
	
	public List<ChecklistVersionDTO> getChecklistLatestVersion(List<ChecklistVersionDTO> versionDTO);
	
	public List<Integer> getGroupIdsBySSOId(String ssoId);
	
	public List<ChecklistRecordDTO> getChecklistRecordSyncHistory(ChecklistParamDto paramDto)  throws Exception; 
	
}
