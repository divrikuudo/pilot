package com.ge.power.checklist.mobile.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ge.power.checklist.mobile.dto.ChecklistDetailDto;
import com.ge.power.checklist.mobile.dto.ChecklistFormDto;
import com.ge.power.checklist.mobile.dto.ChecklistHelpTextDTO;
import com.ge.power.checklist.mobile.dto.ChecklistParamDto;
import com.ge.power.checklist.mobile.dto.ChecklistRecordDTO;
import com.ge.power.checklist.mobile.dto.ChecklistVersionDTO;

import com.ge.power.checklist.mobile.dto.QuestionElement;

import com.ge.power.checklist.mobile.dto.EDSRDetailDTO;

import com.ge.power.checklist.mobile.dto.UserDetailDTO;

public interface ChecklistFormMgmtDao {
	
	public String authenticateUser(String ssoId);
	
	public List<ChecklistDetailDto> getBusinessHierarchyDetail(String ssoId,  String query);
	
	public ChecklistDetailDto getChecklistFormDetailfromId(ChecklistDetailDto detailDto1, String query);
	
	public List<ChecklistDetailDto> getChecklistDetail(String ssoId, String formStatus, String query);
	
	public List<ChecklistDetailDto> getChecklistMetadata(ChecklistDetailDto detailDto1, String query);
	
	public List<ChecklistRecordDTO> getStepDetailFromStepid(String stepId, String query);
	
	public List<ChecklistRecordDTO> getChecklistlatestRecords(String ssoId, String formId, String languageName, String projectId, String noofRows, String pageNo, String query);
	
	public List<ChecklistRecordDTO> getRecordDetailbyRecordIdStepId(String recordId, String stepId, String query);
	
	public List<UserDetailDTO> getUserRoleAndPermission(String ssoId, String query);	
	
	public List<ChecklistFormDto> insertRecordEntry(ChecklistFormDto obj, String query,HashMap<String, Object> objHashMap) throws Exception;	
	
	public List<EDSRDetailDTO> getEDSRProjectTurbineDetail(String query);
	
	public List<EDSRDetailDTO> getEDSRTurbineDetailByProjectId(String projectId, String query);
	
	public String updateImagePath(ChecklistHelpTextDTO textDTO, String token, String imageFor,String query);
	
	public String  updateRulesImagePath(ChecklistHelpTextDTO textDTO, String token, String query);
	
	public String updateImagePathInBulk(ChecklistHelpTextDTO textDTO, String token, String imageFor,String query);
	
	public String  updateRulesImagePathInBulk(ChecklistHelpTextDTO textDTO, String token, String query);
	
	public void insertQuestionElement(QuestionElement objqe1, Map<String, Object> genericObj, String query)throws Exception;

	public Integer getRecord(Map<String, Object> genericObj, String query1)throws Exception;

	public Integer getLanguage(HashMap<String, Object> genericObj, String query2) throws Exception;

	public void insertRulesAnswer(String rulesAnswerKey, String rulesAnswerVal, Map<String, Object> genericObj, String query) throws Exception;

	public void deleteRulesAnswer(Map<String, Object> genericObj, String query)throws Exception;

	public List<ChecklistFormDto> editRecordEntry(ChecklistFormDto obj, final String query,HashMap<String, Object> objHashMap)throws Exception;
	
	public void deleteChecklistImages(String recordId, ArrayList<String> pathList, String query);
	
	public Integer getChecklistRecordCount(String ssoId, String formId,	String languageName, String projectId, String query);
	
	public String updateImagePathByPortal(ChecklistHelpTextDTO dto, String token, String imageFor, String query);
	
	public List<ChecklistRecordDTO> getSingleRecordDetail(String recordId, String query);
	
	public List<ChecklistVersionDTO> getChecklistLatestVersion(List<ChecklistVersionDTO> versionDTO, String query);
	
	public List<Integer> getGroupIdsBySSOId(String ssoId, String query);
	
	public List<ChecklistRecordDTO> getChecklistRecordSyncHistory(ChecklistParamDto paramDto, String query)  throws Exception;

}
