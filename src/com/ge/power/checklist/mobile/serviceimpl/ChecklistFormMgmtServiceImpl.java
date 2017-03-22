package com.ge.power.checklist.mobile.serviceimpl;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.log4j.Logger;

import com.ge.power.checklist.framework.SpringApplicationContext;
import com.ge.power.checklist.mobile.dao.ChecklistFormMgmtDao;
import com.ge.power.checklist.mobile.dto.ChecklistDetailDto;
import com.ge.power.checklist.mobile.dto.ChecklistFormDto;
import com.ge.power.checklist.mobile.dto.ChecklistHelpTextDTO;
import com.ge.power.checklist.mobile.dto.ChecklistParamDto;
import com.ge.power.checklist.mobile.dto.ChecklistRecordDTO;
import com.ge.power.checklist.mobile.dto.ChecklistVersionDTO;
import com.ge.power.checklist.mobile.dto.EDSRDetailDTO;
import com.ge.power.checklist.mobile.dto.QuestionElement;
import com.ge.power.checklist.mobile.dto.QuestionElements;
import com.ge.power.checklist.mobile.dto.SectionElement;
import com.ge.power.checklist.mobile.dto.SectionElements;
import com.ge.power.checklist.mobile.dto.StepElements;
import com.ge.power.checklist.mobile.dto.UserDetailDTO;
import com.ge.power.checklist.mobile.service.ChecklistFormMgmtService;
import com.ge.power.checklist.portal.util.PropertyFileReader;

public class ChecklistFormMgmtServiceImpl implements ChecklistFormMgmtService{
	
	static final Logger LOGGER = Logger.getLogger(ChecklistFormMgmtServiceImpl.class);
	private ChecklistFormMgmtDao checklistFormMgmtDao;
	

	@Override
	public String authenticateUser(String ssoId) {
		checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
		return checklistFormMgmtDao.authenticateUser(ssoId);
	}
	
	@Override
	public List<ChecklistDetailDto> getBusinessHierarchyDetail(String groupId){
		checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
		String query1 = PropertyFileReader.getInstance().getProperty("checklistBusinessHierarchy1");
		String query2 = PropertyFileReader.getInstance().getProperty("checklistBusinessHierarchy2");
		String query = query1+groupId+query2;
		List<ChecklistDetailDto> checklistDetailList = checklistFormMgmtDao.getBusinessHierarchyDetail(groupId, query);
		return checklistDetailList;
		
	}
	
	@Override
	public ChecklistDetailDto getChecklistFormDetailfromId(ChecklistDetailDto detailDto1) {
		checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
		String query = PropertyFileReader.getInstance().getProperty("getChecklistFormNamefromId");
		ChecklistDetailDto checklistDetail = checklistFormMgmtDao.getChecklistFormDetailfromId(detailDto1, query);
		return checklistDetail;
	}

	@Override
	public List<ChecklistDetailDto> getChecklistDetail(String groupId, String formStatus) {
		checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
		//Map<String, ChecklistResponse> checklistDetailMap = new HashMap<String, ChecklistResponse>();
		//ChecklistResponse checklistResponse = new ChecklistResponse();
		
		String query1 = PropertyFileReader.getInstance().getProperty("checklistHierarchy1");
		String query2 = PropertyFileReader.getInstance().getProperty("checklistHierarchy2");
		String query = query1+groupId+query2;
		List<ChecklistDetailDto> checklistDetailList = checklistFormMgmtDao.getChecklistDetail(groupId, formStatus, query);
		
		return checklistDetailList;
	}
	
	@Override
	public List<ChecklistDetailDto> getChecklistMetadata(ChecklistDetailDto detailDto1) {
		checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
		//Map<String, ChecklistResponse> checklistDetailMap = new HashMap<String, ChecklistResponse>();
		//ChecklistResponse checklistResponse = new ChecklistResponse();
		
		String query = PropertyFileReader.getInstance().getProperty("getChecklistMetadata");
		List<ChecklistDetailDto> checklistDetailList = checklistFormMgmtDao.getChecklistMetadata(detailDto1, query);
		return checklistDetailList;
	}
	
	@Override
	public List<ChecklistRecordDTO> getStepDetailFromStepid(String stepId) {
		checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
		//Map<String, ChecklistResponse> checklistDetailMap = new HashMap<String, ChecklistResponse>();
		//ChecklistResponse checklistResponse = new ChecklistResponse();
		
		String query = PropertyFileReader.getInstance().getProperty("getStepDetailFromStepid");
		List<ChecklistRecordDTO> checklistDetailList = checklistFormMgmtDao.getStepDetailFromStepid(stepId, query);
		return checklistDetailList;
	}

	@Override
	public List<ChecklistRecordDTO> getChecklistlatestRecords(String ssoId,	String formId, String languageName, String projectId, String noofRows, String pageNo) {
		checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
		
		String query = PropertyFileReader.getInstance().getProperty("getSectionStepofLast10Records");
		List<ChecklistRecordDTO> checklistDetailList = checklistFormMgmtDao.getChecklistlatestRecords(ssoId, formId, languageName, projectId, noofRows, pageNo, query);
		return checklistDetailList;
	}
	
	@Override
	public List<ChecklistRecordDTO> getRecordDetailbyRecordIdStepId(String recordId, String stepId) {
		checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
		
		String query = PropertyFileReader.getInstance().getProperty("getRecordDetailbyRecordIdStepId");
		List<ChecklistRecordDTO> checklistDetailList = checklistFormMgmtDao.getRecordDetailbyRecordIdStepId(recordId, stepId, query);
		
		return checklistDetailList;
	}

	@Override
	public List<UserDetailDTO> getUserRoleAndPermission(String ssoId) {
		checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
		
		String query = PropertyFileReader.getInstance().getProperty("userroleandpermission");
		List<UserDetailDTO> checklistDetailList = checklistFormMgmtDao.getUserRoleAndPermission(ssoId, query);
		return checklistDetailList;
		
	}	


	@Override
	public String uploadChecklistImages(String recordId, String imageId) {
		// TODO Auto-generated method stub
		return null;
	}

	/*@Override
	public Map<String, Object> getEDSRProjectTurbineDetail() {
		checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
		Map<String, Object> edsrMap = new HashMap<String, Object>();
		String query = PropertyFileReader.getInstance().getProperty("getEDSRProjectTurbineDetail");
		String queryforTurbineId = PropertyFileReader.getInstance().getProperty("getEDSRTurbineDetailByProjectId");
		List<Map<String, Object>> projIdList = new ArrayList<Map<String, Object>>();
		List<String> turbineIdIdList = null;
		List<EDSRDetailDTO> edsrList = checklistFormMgmtDao.getEDSRProjectTurbineDetail(query);
		Map<String, Object> projJson = null;
		if(edsrList != null && edsrList.size() >0){
			for(EDSRDetailDTO dto : edsrList){
				projJson = new HashMap<String, Object>();
				String projId = dto.getProjectId();
				String sysProjId = dto.getSysProjectId();
				projJson.put("projectId", projId);
				projJson.put("projectName", dto.getProjectName());
				projIdList.add(projJson);
				//projIdList.add(projId);
				List<EDSRDetailDTO> turbineList = checklistFormMgmtDao.getEDSRTurbineDetailByProjectId(sysProjId, queryforTurbineId);
				if(turbineList != null && turbineList.size() >0){
					turbineIdIdList = new ArrayList<String>(); 
					for(EDSRDetailDTO turbdto : turbineList){
						turbineIdIdList.add(turbdto.getTurbineId());
					}
					edsrMap.put(projId, turbineIdIdList);
				}
			}
			edsrMap.put("projIdList", projIdList);
		}
		return edsrMap;
	}*/
	
	@Override
	public Map<String, Object> getEDSRProjectTurbineDetail() {
		checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
		Map<String, Object> edsrMap = new HashMap<String, Object>();
		String query = PropertyFileReader.getInstance().getProperty("getEDSRProjectTurbineDetail");
		//String queryforTurbineId = PropertyFileReader.getInstance().getProperty("getEDSRTurbineDetailByProjectId");
		List<Map<String, Object>> projIdList = new ArrayList<Map<String, Object>>();
		List<String> turbineIdIdList = null;
		List<EDSRDetailDTO> edsrList = checklistFormMgmtDao.getEDSRProjectTurbineDetail(query);
		Map<String, Object> projJson = null;
		if(edsrList != null && edsrList.size() >0){
			
			String tempsysProjId = "";
			
			for(EDSRDetailDTO dto : edsrList){
				String projId = dto.getProjectId();
				//String sysProjId = dto.getSysProjectId();
				if(! tempsysProjId.equals(projId)){
					projJson = new HashMap<String, Object>();
					projJson.put("projectId", projId);
					projJson.put("projectName", dto.getProjectName());
					projJson.put("systemProjId", projId);
					projIdList.add(projJson);
					
					turbineIdIdList = new ArrayList<String>(); 
					tempsysProjId = projId;
					turbineIdIdList.add(dto.getTurbineId());
					edsrMap.put(projId, turbineIdIdList);
				} else{
					turbineIdIdList.add(dto.getTurbineId());
				}
			}
			edsrMap.put("projIdList", projIdList);
		}
		return edsrMap;
	}

	@Override
	public String updateImagePath(ChecklistHelpTextDTO dto, String token, String imageFor) {
		checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
		String query = "";
		if("Add".equals(token)){
			if("RecordImages".equalsIgnoreCase(imageFor)){
				query = PropertyFileReader.getInstance().getProperty("insertAnswerImagePath");
			} else{
				query = PropertyFileReader.getInstance().getProperty("insertQuestionAndHelpImagePath");
			}
		}else{
			if("RecordImages".equalsIgnoreCase(imageFor)){
				query = PropertyFileReader.getInstance().getProperty("updateAnswerImagePath");
			} else{
				query = PropertyFileReader.getInstance().getProperty("updateQuestionAndHelpImagePath");
			}
		}
		String checklistDetailList = checklistFormMgmtDao.updateImagePath(dto, token, imageFor, query);
		return checklistDetailList;
	}

	@Override
	public Map<String, Object> insertRecordDetail(ChecklistFormDto jsonObject)throws Exception {

		checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
		List<ChecklistFormDto> insertRecordDetailList = null;		
		String query = PropertyFileReader.getInstance().getProperty("insertrecordentry");
		String query1 = PropertyFileReader.getInstance().getProperty("recordnumber");
		String query2 = PropertyFileReader.getInstance().getProperty("languageid");		
		//String query2 = PropertyFileReader.getInstance().getProperty("insertimage");
		Integer recordId=null;
		Integer languageId=null;
		Integer qaassocid = null;
		HashMap<String, Object> genericObj=null;
		
		try{
			
			 genericObj = new HashMap<String, Object>();
			 
			 genericObj.put("formId", jsonObject.getFormId());
			 genericObj.put("language", jsonObject.getLanguage());
			 genericObj.put("actionFLG", "INSERT");
			recordId = checklistFormMgmtDao.getRecord(genericObj, query1);
			languageId = checklistFormMgmtDao.getLanguage(genericObj, query2);//step//section			
			//qaassocid = checklistFormMgmtDao.getQesAssocId(jsonObject,genericObj, query3);
			jsonObject.setServerRecordId(recordId.toString());
			jsonObject.setLanguageId(languageId.toString());
			//jsonObject.setQaassocid(qaassocid.toString());
			genericObj.put("submittedBy", jsonObject.getSubmittedBy());
			genericObj.put("createdDate", jsonObject.getCreatedDate());
			genericObj.put("modifiedDate", jsonObject.getModifiedDate());
			genericObj.put("syncStatus", jsonObject.getSyncStatus());
			genericObj.put("isDeleted", jsonObject.getIsDeleted());
			genericObj.put("recordStatus", jsonObject.getRecordStatus());
			genericObj.put("serverRecordId", recordId);
			genericObj.put("languageId", languageId);
			//genericObj.put("qaassocid", qaassocid);
			
			String queryInsertQuestion = PropertyFileReader.getInstance().getProperty("insertrecord");
			String queryAnsVal = PropertyFileReader.getInstance().getProperty("insertruleansvalue");
			String queryRecordStatus = PropertyFileReader.getInstance().getProperty("recordstatus");
			String qesAssocId = PropertyFileReader.getInstance().getProperty("qaassocid");
			
			//String queryInsertQuestion = PropertyFileReader.getInstance().getProperty("insertrecord");
			//String queryInsertQuestion = PropertyFileReader.getInstance().getProperty("insertrecord");
			genericObj.put("INSERTQUESIONQRY", queryInsertQuestion);
			genericObj.put("INSERTANSVALQRY", queryAnsVal);
			genericObj.put("RECORDSTATUS", queryRecordStatus);
			genericObj.put("QESASSOCID", qesAssocId);
				
		insertRecordDetailList = checklistFormMgmtDao.insertRecordEntry(jsonObject, query,genericObj); //record //comments ->issue clarify
		
		//comments ->issue clarify
		//Map<String, Object> genericObj = new HashMap<String, Object>();
		
		//LOGGER.info("insert record id is *********"+jsonObject.getLocalRecordId());
			//ChecklistFormDto record =  insertRecord.get(i);
		//iterateDTO(jsonObject,genericObj);//question&images
		
		//insertRecordDetailList = checklistFormMgmtDao.insertRecordImage1(jsonObject, query2);
		}catch(Exception r){
			r.printStackTrace();
			throw new Exception("error in insert Record");
			
		}
		//checklistFormMgmtDao.
		return genericObj;
	}
	
	
	
	 public void iterateDTO(ChecklistFormDto obj,Map<String, Object> genericObj)throws Exception {
		 ArrayList<SectionElements> objse=obj.getRecordElements().get(0).getSectionElements();           
		 genericObj.put("submittedBy", obj.getSubmittedBy());
		 genericObj.put("createdDate", obj.getCreatedDate());
		 genericObj.put("modifiedDate", obj.getModifiedDate());
		 genericObj.put("syncStatus", obj.getSyncStatus());
		 genericObj.put("isDeleted", obj.getIsDeleted());
		 genericObj.put("recordStatus", obj.getRecordStatus());
		 //genericObj.put("serverRecordId", obj.getServerRecordId());
		 genericObj.put("localRecordId", obj.getLocalRecordId());
                for(int i=0;i<objse.size();i++){
                	SectionElements objse1=objse.get(i);
                	ArrayList<SectionElement> obj1=objse1.getSectionElement();
                	 for(int j=0;j<obj1.size();j++){
                		 genericObj.put("sectionId",(obj1.get(j).getSectionId()));
                		 SectionElement objsec1=obj1.get(j);
                		 iterateStepElement(objsec1,genericObj);
                	 }                	
                }                 
	 }
  

  public void iterateStepElement(SectionElement obj,Map<String, Object> genericObj)throws Exception {
	  ArrayList<StepElements> objse=obj.getStepElements();
	  for(int i=0;i<objse.size();i++){
      	StepElements objse1=objse.get(i); 
      	genericObj.put("stepId",(objse1.getStepId()));
      	if(("INSERT").equals(genericObj.get("actionFLG")))
      		iterateQuestionElement(objse1,genericObj);
      	else
      		iterateEditQuestionElement(objse1,genericObj);
      	 }
  }
  

  public void iterateQuestionElement(StepElements obj,Map<String, Object> genericObj)throws Exception {
	  checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
	  String query = PropertyFileReader.getInstance().getProperty("insertrecord");
	  ArrayList<QuestionElements> objse=obj.getQuestionElements();
	  try{
         for(int i=0;i<objse.size();i++){
        	 //StepElements objse1=objse.get(i);
        	QuestionElements obj1=objse.get(i);
        	ArrayList<QuestionElement> objQE1=obj1.getQuestionElement();
         	 for(int j=0;j<objQE1.size();j++){
         		QuestionElement objqe1=objQE1.get(j);
         		
         		checklistFormMgmtDao.insertQuestionElement(objqe1, genericObj, query);
         		iterateRulesAnswer(objqe1, genericObj);
         	 }
         	
         }  
	  }catch(Exception e){
		  e.printStackTrace();
	  }

  }
  public void iterateEditQuestionElement(StepElements obj,Map<String, Object> genericObj)throws Exception {
	  checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
	  String query = PropertyFileReader.getInstance().getProperty("insertrecord");
	  ArrayList<QuestionElements> objse=obj.getQuestionElements();
	  try{
         for(int i=0;i<objse.size();i++){
        	 //StepElements objse1=objse.get(i);
        	QuestionElements obj1=objse.get(i);
        	ArrayList<QuestionElement> objQE1=obj1.getQuestionElement();
         	 for(int j=0;j<objQE1.size();j++){
         		QuestionElement objqe1=objQE1.get(j);
         		
         		checklistFormMgmtDao.insertQuestionElement(objqe1, genericObj, query);
         		iterateEditRulesAnswer(objqe1, genericObj);
         	 }
         	
         }  
	  }catch(Exception e){
		  e.printStackTrace();
	  }

  }
  
  public void iterateRulesAnswer(QuestionElement obj,Map<String, Object> genericObj)throws Exception {
	  checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
	  String query = PropertyFileReader.getInstance().getProperty("ruleansvalue");
	  ArrayList<HashMap<String, Object>> ansValues = obj.getAnswerValue();
	  for(int i=0; i < ansValues.size(); i++){
		  HashMap<String, Object> elemDetails = ansValues.get(i);
		  ArrayList<HashMap<String, String>> objse = (ArrayList<HashMap<String, String>>)elemDetails.get("rulesAnswerValues");
		  String rulesAnswerKey="";
		  String rulesAnswerVal="";
		  try{       
			  if(objse != null && objse.size() !=0 && obj != null){ 
				  genericObj.put("questionId", obj.getQuestionId());			  
				  genericObj.put("rulesAnswerValues", objse);
	         	 
				  if(objse!=null && objse.size()>0){
					for(int j=0;j<objse.size();j++){  
						HashMap<String, String> objAV=objse.get(j);
					Set<String>ruleKeys = objAV.keySet();
					for(String key:ruleKeys){
						rulesAnswerKey=key;
						rulesAnswerVal=objAV.get(key);
						checklistFormMgmtDao.insertRulesAnswer(rulesAnswerKey,rulesAnswerVal, genericObj, query);
					}
					}
				  }
				  
				  /*for(int j=0;j<objse.size();j++){
	         		String objqe1=objse.get(j);
	         		
	         		  LOGGER.info("answer values ---------"+objqe1);
	         		checklistFormMgmtDao.insertRulesAnswer(objqe1, genericObj, query);
	         	 }*/
			  }
	         	
	       
		  }catch(Exception e){
			  e.printStackTrace();
		  }
	  }

  }

  
  public void iterateEditRulesAnswer(QuestionElement obj,Map<String, Object> genericObj)throws Exception {
	  checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
	  String query = PropertyFileReader.getInstance().getProperty("ruleansvalue");
	  
	  ArrayList<HashMap<String, Object>> ansValues = obj.getAnswerValue();
	  for(int i=0; i < ansValues.size(); i++){
		  HashMap<String, Object> elemDetails = ansValues.get(i);
		  ArrayList<HashMap<String, String>> objse = (ArrayList<HashMap<String, String>>)elemDetails.get("rulesAnswerValues");
		  //ArrayList<RuleAnswerValues> objse=obj.getRulesAnswerValues();
		  String rulesAnswerKey="";
		  String rulesAnswerVal="";
		  try{       
			  if(objse != null && objse.size() !=0 && obj != null){ 
				  genericObj.put("questionId", obj.getQuestionId());			  
				  genericObj.put("rulesAnswerValues", objse);
				  checklistFormMgmtDao.deleteRulesAnswer(genericObj, query);
				  if(objse!=null && objse.size()>0){
					  
					for(int j=0;j<objse.size();j++){  
						HashMap<String, String> objAV=objse.get(j);
					Set<String>ruleKeys = objAV.keySet();
					for(String key:ruleKeys){
						rulesAnswerKey=key;
						rulesAnswerVal=objAV.get(key);
						checklistFormMgmtDao.insertRulesAnswer(rulesAnswerKey,rulesAnswerVal, genericObj, query);
					}
					}
				  }
				  
				  /*for(int j=0;j<objse.size();j++){
	         		String objqe1=objse.get(j);
	         		
	         		  LOGGER.info("answer values ---------"+objqe1);
	         		checklistFormMgmtDao.insertRulesAnswer(objqe1, genericObj, query);
	         	 }*/
			  }
	         	
	       
		  }catch(Exception e){
			  e.printStackTrace();
		  }
		  
		  
	  }
	  
	  

  }  
  
@Override
public Map<String, Object> editRecordDetail(ChecklistFormDto jsonObject)throws Exception {
	
	checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
	List<ChecklistFormDto> insertRecordDetailList = null;		
	String query = PropertyFileReader.getInstance().getProperty("updaterecordentry");	
	//String query1 = PropertyFileReader.getInstance().getProperty("recordnumber");
	String query2 = PropertyFileReader.getInstance().getProperty("languageid");
	/*String queryEditQuestion = PropertyFileReader.getInstance().getProperty("updaterecord");
	LOGGER.info("**************"+ queryEditQuestion);*/
	Integer languageId=null;
	HashMap<String, Object> genericObj=null;	
	
	try{
		
	 genericObj = new HashMap<String, Object>();
	 genericObj.put("formId", jsonObject.getFormId());
	 genericObj.put("language", jsonObject.getLanguage());
	 genericObj.put("actionFLG", "EDIT");
	
	 languageId = checklistFormMgmtDao.getLanguage(genericObj, query2);//step//section
	 //jsonObject.setServerRecordId(recordId.toString());
	 jsonObject.setLanguageId(languageId.toString());
	 genericObj.put("submittedBy", jsonObject.getSubmittedBy());
	 genericObj.put("createdDate", jsonObject.getCreatedDate());
	 genericObj.put("modifiedDate", jsonObject.getModifiedDate());
	 genericObj.put("syncStatus", jsonObject.getSyncStatus());
	 genericObj.put("isDeleted", jsonObject.getIsDeleted());
	 genericObj.put("recordStatus", jsonObject.getRecordStatus());
	 genericObj.put("serverRecordId", jsonObject.getServerRecordId());
	 genericObj.put("languageId", languageId);
	
	//Integer recordId=null; 
	
		String queryEditQuestion = PropertyFileReader.getInstance().getProperty("updaterecord");
		String queryAnsVal = PropertyFileReader.getInstance().getProperty("insertruleansvalue");		
		String queryUpdateAnsVal= PropertyFileReader.getInstance().getProperty("updateruleansvalue");
		String queryDeleteAnsVal = PropertyFileReader.getInstance().getProperty("deleteruleansvalue");		
		String queryRecordStatus = PropertyFileReader.getInstance().getProperty("recordstatus");
		String qesAssocId = PropertyFileReader.getInstance().getProperty("qaassocid");
		String ansThumbnailImage = PropertyFileReader.getInstance().getProperty("insertAnswerThumbnailImage");
		String deleteAnsThumbnailImage = PropertyFileReader.getInstance().getProperty("deleteAnswerThumbnailImage");
		
		genericObj.put("QESASSOCID", qesAssocId);
		genericObj.put("EDITQUESIONQRY", queryEditQuestion);
		genericObj.put("INSERTANSVALQRY", queryAnsVal);
		genericObj.put("UPDATEANSVALQRY", queryUpdateAnsVal);
		genericObj.put("DELETEANSVALQRY", queryDeleteAnsVal);		
		genericObj.put("RECORDSTATUS", queryRecordStatus);
		genericObj.put("ansThumbnailImage", ansThumbnailImage);
		genericObj.put("DELETEANSTHUMBNAILIMAGE", deleteAnsThumbnailImage);	
		
		//recordId = checklistFormMgmtDao.getRecord(genericObj, query1);
		//languageId = checklistFormMgmtDao.getLanguage(genericObj, query2);//step//section
		//jsonObject.setServerRecordId(recordId.toString());
		jsonObject.setLanguageId(languageId.toString());
	insertRecordDetailList = checklistFormMgmtDao.editRecordEntry(jsonObject, query,genericObj); //record //comments ->issue clarify
		
	//Map<String, Object> genericObj = new HashMap<String, Object>();
	//genericObj.put("serverRecordId", recordId);
	//genericObj.put("languageId", languageId);
	//LOGGER.info("insert record id is *********"+jsonObject.getLocalRecordId());
		//ChecklistFormDto record =  insertRecord.get(i);
	//iterateDTO(jsonObject,genericObj);//question&images
	
	//insertRecordDetailList = checklistFormMgmtDao.insertRecordImage1(jsonObject, query2);
	}catch(Exception r){
		r.printStackTrace();
		throw new Exception("error in insert Record");
		
	}
	//checklistFormMgmtDao.
	return genericObj;
	
}

@Override
public String deleteChecklistImages(String recordId, ArrayList<String> pathList) {
	 checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
	 String query = PropertyFileReader.getInstance().getProperty("deleteAnswerImagePath");
	 checklistFormMgmtDao.deleteChecklistImages(recordId, pathList, query);
	 return "";
}

@Override
public String updateImagePathByPortal(ChecklistHelpTextDTO dto, String token, String imageFor) {
	checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
	String query = "";
	//if("Add".equals(token)){
		query = PropertyFileReader.getInstance().getProperty("insertImagePathByPortal");
	/*}else{
		query = PropertyFileReader.getInstance().getProperty("updateImagePathByPortal");
	}*/
	String checklistDetailList = checklistFormMgmtDao.updateImagePathByPortal(dto, token, imageFor, query);
	return checklistDetailList;
}

@Override
public String updateRulesImagePath(ChecklistHelpTextDTO dto, String token) {
	checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
	String query = "";
	if("Add".equals(token)){
		query = PropertyFileReader.getInstance().getProperty("insertAnswerRuleImagePath");
	}else{
		query = PropertyFileReader.getInstance().getProperty("updateAnswerRuleImagePath");
	}
	String checklistDetailList = checklistFormMgmtDao.updateRulesImagePath(dto, token, query);
	return checklistDetailList;
}

@Override
public Integer getChecklistRecordCount(String ssoId, String formId,	String languageName, String projectId) {
	checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
	Integer recordCount = null;
	String query = PropertyFileReader.getInstance().getProperty("getChecklistRecordCount");
	recordCount = checklistFormMgmtDao.getChecklistRecordCount(ssoId, formId, languageName, projectId, query);
	return recordCount;
}

@Override
public List<ChecklistRecordDTO> getSingleRecordDetail(String recordId) {
	checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
	String query = PropertyFileReader.getInstance().getProperty("getSingleRecordDetail");
	List<ChecklistRecordDTO> recordDto = checklistFormMgmtDao.getSingleRecordDetail(recordId, query);
	return recordDto;
}

@Override
public String updateImagePathInBulk(ChecklistHelpTextDTO dto, String token,	String imageFor) {

	checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
	String query = "";
	if("Add".equals(token)){
		if("RecordImages".equalsIgnoreCase(imageFor)){
			query = PropertyFileReader.getInstance().getProperty("updateImagePathInBulk");
		}
	}else{
		if("RecordImages".equalsIgnoreCase(imageFor)){
			query = PropertyFileReader.getInstance().getProperty("updateImagePathInBulk");
		}
	}
	String checklistDetailList = checklistFormMgmtDao.updateImagePathInBulk(dto, token, imageFor, query);
	return checklistDetailList;

}

@Override
public String updateRulesImagePathInBulk(ChecklistHelpTextDTO dto, String token) {
	checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
	String query = "";
	if("Add".equals(token)){
		query = PropertyFileReader.getInstance().getProperty("updateImagePathInBulk");
	}else{
		query = PropertyFileReader.getInstance().getProperty("updateImagePathInBulk");
	}
	String checklistDetailList = checklistFormMgmtDao.updateRulesImagePathInBulk(dto, token, query);
	return checklistDetailList;
}

@Override
public List<ChecklistVersionDTO> getChecklistLatestVersion(List<ChecklistVersionDTO> versionDTO) {
	checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
	String query = PropertyFileReader.getInstance().getProperty("getChecklistLatestVersion");
	
	List<ChecklistVersionDTO> recordDto = checklistFormMgmtDao.getChecklistLatestVersion(versionDTO, query);
	return recordDto;
}

@Override
public List<Integer> getGroupIdsBySSOId(String ssoId) {
	checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
	String query = PropertyFileReader.getInstance().getProperty("getGroupIdsBySSOId");
	
	List<Integer> recordDto = checklistFormMgmtDao.getGroupIdsBySSOId(ssoId, query);
	return recordDto;
}

@Override
public List<ChecklistRecordDTO> getChecklistRecordSyncHistory(ChecklistParamDto paramDto) throws Exception {
	checklistFormMgmtDao = (ChecklistFormMgmtDao)SpringApplicationContext.getBean("checklistFormMgmtDaoImpl");
	String query = PropertyFileReader.getInstance().getProperty("getChecklistRecordSyncHistory");
	
	List<ChecklistRecordDTO> recordDto = checklistFormMgmtDao.getChecklistRecordSyncHistory(paramDto, query);
	return recordDto;
}






}
