package com.ge.power.checklist.portal.serviceimpl;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.ge.power.checklist.framework.SpringApplicationContext;
import com.ge.power.checklist.mobile.dto.ChecklistDetailDto;
import com.ge.power.checklist.mobile.dto.ChecklistRecordDTO;
import com.ge.power.checklist.mobile.dto.EDSRDetailDTO;
import com.ge.power.checklist.portal.dao.ChecklistUserDao;
import com.ge.power.checklist.portal.dto.BusinessHierarchyDto;
import com.ge.power.checklist.portal.dto.ChecklistComponentDto;
import com.ge.power.checklist.portal.dto.ChecklistFormDto;
import com.ge.power.checklist.portal.dto.ChecklistPortalDto;
import com.ge.power.checklist.portal.dto.ChecklistPortalResponse;
import com.ge.power.checklist.portal.dto.ChecklistValidationRuleDTO;
import com.ge.power.checklist.portal.dto.ElementArributuesProp;
import com.ge.power.checklist.portal.dto.FormFilterSection;
import com.ge.power.checklist.portal.dto.ImageDTO;
import com.ge.power.checklist.portal.dto.PortalUserDetailDTO;
import com.ge.power.checklist.portal.dto.RecordDTO;
import com.ge.power.checklist.portal.service.ChecklistUserService;
import com.ge.power.checklist.portal.util.HostPropertyFileReader;
import com.ge.power.checklist.portal.util.PropertyFileReader;

public class ChecklistUserServiceImpl implements ChecklistUserService{

	static final Logger LOGGER = Logger.getLogger(ChecklistUserServiceImpl.class);

	private ChecklistUserDao checklistUserDao;
	
	public ChecklistUserDao getChecklistUserDao() {
		return checklistUserDao;
	}

	public void setChecklistUserDao(ChecklistUserDao checklistUserDao) {
		this.checklistUserDao = checklistUserDao;
	}	

	@Override
	public List<PortalUserDetailDTO> getUserRoleAndPermission(String ssoId) {
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");
		Map<String, ChecklistPortalResponse> detailmap = new HashMap<String,ChecklistPortalResponse>();
		ChecklistPortalResponse checklistPortalResponse = new ChecklistPortalResponse();
		
		String query = PropertyFileReader.getInstance().getProperty("portaluserroleandpermission");
		List<PortalUserDetailDTO> detaillist = checklistUserDao.getUserRoleAndPermission(ssoId, query);
		
		return detaillist;
	}	

	@Override
	public List<ChecklistComponentDto> checklistComponent() {
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");
		Map<String, ChecklistPortalResponse> componentmap = new HashMap<String,ChecklistPortalResponse>();
		ChecklistPortalResponse checklistPortalResponse = new ChecklistPortalResponse();
		
		String query = PropertyFileReader.getInstance().getProperty("checklistcomponent");
		List<ChecklistComponentDto> componentlist = checklistUserDao.checklistComponent(query);
		
		return componentlist;
	}	

	@Override
	public List<ChecklistPortalDto> loadChecklist(String ssoId, String roleName, String recordCount, String pageLimit) {
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");
		//Map<String, ChecklistPortalResponse> loadchecklistmap = new HashMap<String,ChecklistPortalResponse>();
		ChecklistPortalResponse checklistPortalResponse = new ChecklistPortalResponse();
		
		String query = PropertyFileReader.getInstance().getProperty("loadchecklist");
		String query1 = PropertyFileReader.getInstance().getProperty("loadchecklist1");
		List<ChecklistPortalDto> loadchecklist = checklistUserDao.loadChecklist(ssoId, roleName, recordCount, pageLimit, query, query1);		
		return loadchecklist;
	}

	@Override
	public List<ChecklistPortalDto> pagenationChecklist(String ssoId,
			String roleName) {
		
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");
		
		ChecklistPortalResponse checklistPortalResponse = new ChecklistPortalResponse();
		
		String query = PropertyFileReader.getInstance().getProperty("pagechecklist");
		List<ChecklistPortalDto> pagelist = checklistUserDao.pagenationChecklist(ssoId, roleName, query);
		
		return pagelist;
	}
	
	@Override
	public List<ChecklistPortalDto> deleteChecklist(String formId, String languageName) {
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");
		HashMap<String, Object> genericObj = new HashMap<String, Object>();	
		List<ChecklistPortalDto> deletechecklist = null;
		String deleteMetadataQuery = PropertyFileReader.getInstance().getProperty("deleteChecklistMetadata");
		String imagePathQuery = PropertyFileReader.getInstance().getProperty("getImagePathforDelete");
		
		genericObj.put("languageName", languageName);
		genericObj.put("deleteMetadataQuery", deleteMetadataQuery);
		
		List<String> imagePathList = checklistUserDao.getImagePathListforDelete(formId, languageName, imagePathQuery);
		if(imagePathList != null && imagePathList.size() > 0){
			
			for(String imagePath : imagePathList){
				File file = new File(imagePath);
	    		if(file.exists()){
	    			if(file.delete()){
	    				//count ++;
		    		}else{
		    			//failurecount ++;
		    			LOGGER.info("Delete operation is failed.");
		    		}
	    		} else{
	    			//failurecount ++;
	    			LOGGER.info("File Does not exist...");
	    		}
			}
		}
		deletechecklist = checklistUserDao.deleteChecklist(formId, genericObj);
		
		return deletechecklist;
	}
	
	@Override
	public List<BusinessHierarchyDto> businessHierarchyDetail(String ssoId, String roleName){
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");		
		String query = PropertyFileReader.getInstance().getProperty("getfunction");
		List<BusinessHierarchyDto> checklistDetailList = checklistUserDao.businessHierarchyDetail(ssoId, roleName, query);
		return checklistDetailList;
		
	}
	
	@Override
	public List<ChecklistPortalDto> searchChecklistForm(String ssoId,
			String roleName, String checklistName, String checklistTitle) {				
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");
		ChecklistPortalResponse checklistPortalResponse = new ChecklistPortalResponse();	
		String query = "";
		if ("Version".equals(checklistTitle)) {
			
			if ("0".equals(checklistName.substring(0,1)) || checklistName.contains("d") || ".".equals(checklistName)) {
				query = PropertyFileReader.getInstance().getProperty(checklistTitle);
			} else {
				query = PropertyFileReader.getInstance().getProperty(checklistTitle + "_1");
			}
		} else {
			query = PropertyFileReader.getInstance().getProperty(checklistTitle);			
		}
		List<ChecklistPortalDto> searchform = checklistUserDao.searchChecklistForm(ssoId, roleName, 
				checklistName, query, checklistTitle);			
		return searchform;
		
	}	
	
	
	@Override
	public List<BusinessHierarchyDto> subFunctionChecklist(String groupId, String dropValue) {
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");		
		String query = PropertyFileReader.getInstance().getProperty(dropValue);
		List<BusinessHierarchyDto> subFunctionChecklist = checklistUserDao.subFunctionChecklist(groupId, query);
		
		return subFunctionChecklist;
		
	}
	
	@Override
	public List<BusinessHierarchyDto> subFunctionChecklist(String groupId, String ssoId, String dropValue) {
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");		
		String query = PropertyFileReader.getInstance().getProperty(dropValue+"_1");
		
		List<BusinessHierarchyDto> subFunctionChecklist = checklistUserDao.subFunctionChecklist(groupId, ssoId, query);
		
		return subFunctionChecklist;
		
	}
	
	@Override
	public Map<String, Object> getValidationRuleList(String elementId) {
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");
		
		Map<String, Object> ruleMap = new HashMap<String, Object>();
		
		String categoryquery = PropertyFileReader.getInstance().getProperty("getRuleCategory");
		List<String> ruleCategoryList = checklistUserDao.getElementRuleCategoryList(categoryquery);
		
		String query = PropertyFileReader.getInstance().getProperty("getElementrules");
		List<ChecklistValidationRuleDTO> validationRuleList = checklistUserDao.getValidationRuleList(elementId, query);
		
		String ruleActionquery = PropertyFileReader.getInstance().getProperty("getRuleActionDetail");
		List<ChecklistValidationRuleDTO> ruleActionList = checklistUserDao.getRuleActionsDetailList(ruleActionquery);
		
		ruleMap.put("ruleCategoryList", ruleCategoryList);
		ruleMap.put("validationRuleList", validationRuleList);
		ruleMap.put("ruleActionList", ruleActionList);
		
		return ruleMap;
	}

	@Override
	public List<ElementArributuesProp> getPropertiesList(String elementId) {
		
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");
		
		String query = PropertyFileReader.getInstance().getProperty("getelementproperties");
		List<ElementArributuesProp> propertiesList = checklistUserDao.getPropertiesList(elementId, query);
		return propertiesList;
	}

	@Override
	public Map<String, Object> saveMetadata(ChecklistFormDto checklistFormDto) {
		
		
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");
		try {
			
			String imagePath = HostPropertyFileReader.getInstance().getProperty("imagePath");
			
			Map<String, Object> map = checklistUserDao.saveMetadata(checklistFormDto, imagePath);
			return map;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/*@Override
	public Map<String, Object> saveMetadata(ChecklistFormDto jsonObject)throws Exception {
		
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");
		List<ChecklistFormDto> saveMetadataList = null;
		List<ChecklistFormDto> saveGroupAssociation = null;
		List<ChecklistFormDto> savelanguagemap = null;
		List<ChecklistFormDto> saveFormVersion = null;		
		String formidquery = PropertyFileReader.getInstance().getProperty("formid");
		String query = PropertyFileReader.getInstance().getProperty("saveformdetails");		
		String groupAssociation = PropertyFileReader.getInstance().getProperty("savegroupassociation");
		String languagemap = PropertyFileReader.getInstance().getProperty("savelanguagemap");
		String formVersion = PropertyFileReader.getInstance().getProperty("saveformversion");
		String languageIdquery = PropertyFileReader.getInstance().getProperty("getlanguage");
		String languageFormId = PropertyFileReader.getInstance().getProperty("languageid");
		//Transaction roll back start
		String sectionidquery = PropertyFileReader.getInstance().getProperty("sectionidquery");
		String savesection = PropertyFileReader.getInstance().getProperty("savesectiondetails");
		String stepidquery = PropertyFileReader.getInstance().getProperty("stepidquery");
		String savestep = PropertyFileReader.getInstance().getProperty("savestepdetails");
		String questionIdQuery = PropertyFileReader.getInstance().getProperty("questionidquery");
		String answerIdQuery = PropertyFileReader.getInstance().getProperty("answeridquery");
		String questionquery = PropertyFileReader.getInstance().getProperty("savequestiondetails");
		String answerquery = PropertyFileReader.getInstance().getProperty("saveanswerdetails");
		String quesanswermap = PropertyFileReader.getInstance().getProperty("quesanswermap");
		String quesassocidquery = PropertyFileReader.getInstance().getProperty("getquesassocid");
		String tagMap = PropertyFileReader.getInstance().getProperty("savetagmap");
		String attributeProb = PropertyFileReader.getInstance().getProperty("saveelementattributemap");
		String rule = PropertyFileReader.getInstance().getProperty("saverule");
		String ansRuleMapIdQuery = PropertyFileReader.getInstance().getProperty("getansrulemapid");
		String addAction = PropertyFileReader.getInstance().getProperty("saveaction");
		String ansmapidquery = PropertyFileReader.getInstance().getProperty("ansmapid");
		String qesmapidquery = PropertyFileReader.getInstance().getProperty("qesmapid");
		String formimagepathquery = PropertyFileReader.getInstance().getProperty("getFormTempImagePath");
		String sectionimagepathquery = PropertyFileReader.getInstance().getProperty("getSectionTempImagePath");
		String stepimagepathquery = PropertyFileReader.getInstance().getProperty("getStepTempImagePath");
		String questionimagepathquery = PropertyFileReader.getInstance().getProperty("getQuestionTempImagePath");
		String insertmetadataimages = PropertyFileReader.getInstance().getProperty("insertmetadataimages");
		String removeTempImagePath = PropertyFileReader.getInstance().getProperty("removeTempImagePath");
		//Transaction roll back end
		Integer formId=null;
		Integer languageId=null;
		HashMap<String, Object> genericObj=null;
		try{
			genericObj = new HashMap<String, Object>();	
			genericObj.put("formLanguage", jsonObject.getFormLanguage());
			formId = checklistUserDao.getForm(formidquery);
			jsonObject.setFormId(formId.toString());
			jsonObject.setFormStatusId("11");
			genericObj.put("formId", formId);
			//Transaction roll back start
			genericObj.put("submittedBy", jsonObject.getSubmittedBy());
			genericObj.put("createdDate", jsonObject.getCreatedDate());	
			genericObj.put("GROUPASSOCIATION", groupAssociation);
			genericObj.put("LANGUAGEMAP", languagemap);
			genericObj.put("FORMVERSION", formVersion);
			genericObj.put("LANGUAGEID", languageIdquery);
			genericObj.put("LANGUAGEFORMID", languageFormId);
			genericObj.put("SECTIONIDQUERY", sectionidquery);
			genericObj.put("SAVESECTION", savesection);
			genericObj.put("STEPIDQUERY", stepidquery);
			genericObj.put("SAVESTEP", savestep);
			genericObj.put("QUESTIONIDQUERY", questionIdQuery);
			genericObj.put("ANSWERIDQUERY", answerIdQuery);
			genericObj.put("QUESTIONQUERY", questionquery);
			genericObj.put("ANSWERQUERY", answerquery);
			genericObj.put("QUESANSWERMAP", quesanswermap);
			genericObj.put("QUESASSOCIDQUERY", quesassocidquery);
			genericObj.put("TAGMAP", tagMap);
			//genericObj.put("ELEMENTQRY", "questionelemap");
			//String elementmap = PropertyFileReader.getInstance().getProperty((String)genericObj.get("ELEMENTQRY"));
			//genericObj.put("ELEMENTMAP", elementmap);
			genericObj.put("ANSMAPID", ansmapidquery);
			genericObj.put("QESMAPID", qesmapidquery);
			genericObj.put("ATTRIBUTEPROB", attributeProb);
			genericObj.put("RULE", rule);
			genericObj.put("ANSRULEMAPIDQUERY", ansRuleMapIdQuery);			
			genericObj.put("ADDACTION", addAction);
			genericObj.put("getFormTempImagePath", formimagepathquery);
			genericObj.put("getSectionTempImagePath", sectionimagepathquery);
			genericObj.put("getStepTempImagePath", stepimagepathquery);
			genericObj.put("insertmetadataimages", insertmetadataimages);
			genericObj.put("getQuestionTempImagePath", questionimagepathquery);
			genericObj.put("removeTempImagePath", removeTempImagePath);
			//Transaction roll back end
			saveMetadataList = checklistUserDao.saveMetadata(jsonObject, genericObj, query );
					
		
		}catch(Exception r){
			r.printStackTrace();
			throw new Exception("error in insert Record");
		}
		return genericObj;
	}
	
	 private void iterateImage(ChecklistFormDto obj,
			HashMap<String, Object> genericObj) {
		 ArrayList<Images> objse=obj.getImages();
		 String helpImage = PropertyFileReader.getInstance().getProperty("saveimage");
		 try{
			 for(int i=0;i<objse.size();i++){
		         	LOGGER.info("-------"+ objse.size()); 
		         	Images objse1=objse.get(i);
		         	genericObj.put("imagesDesc", obj.getImagesDesc());
		         	genericObj.put("imagesDescLevel", obj.getImagesDescLevel());
		         	checklistUserDao.saveHelpImage(objse1, genericObj, helpImage);
			 }			 
		 }catch(Exception e){
			 e.printStackTrace();
		 }
		
		
	}*/

	/*public void iterateSection(ChecklistFormDto obj,HashMap<String, Object> genericObj)throws Exception {
		 		 
		 ArrayList<SectionElements> objse=obj.getSectionElements();
		 String sectionidquery = PropertyFileReader.getInstance().getProperty("getesctionid");
		 String query = PropertyFileReader.getInstance().getProperty("savesectiondetails");
		 Integer sectionId=null;		 
		 try{
		 for(int i=0;i<objse.size();i++){
         	SectionElements objse1=objse.get(i);
         	ArrayList<SectionElement> obj1=objse1.getSectionElement();
         	sectionId = checklistUserDao.getSectionId(sectionidquery);		
         	 for(int j=0;j<obj1.size();j++){
        		 SectionElement objsec1=obj1.get(j);
        		 objsec1.setSectionId(sectionId.toString());
        		 genericObj.put("sectionId", sectionId);
        		 checklistUserDao.saveSection(objsec1, genericObj, query);
        		 iterateStep(objsec1,genericObj);
         	 }
         	
		 }
		 }catch(Exception e){
			 e.printStackTrace();
		 }
	 }

	public void iterateStep(SectionElement obj,	HashMap<String, Object> genericObj)throws Exception{
		ArrayList<StepElements> objse=obj.getStepElements();
		String stepidquery = PropertyFileReader.getInstance().getProperty("stepidquery");
		String query = PropertyFileReader.getInstance().getProperty("savestepdetails");
		 Integer stepId=null;
		 try{
		for(int i=0;i<objse.size();i++){
			StepElements objse1=objse.get(i);
			ArrayList<StepElement> obj1=objse1.getStepElement();
			stepId = checklistUserDao.getStepId(stepidquery);
			for(int j=0;j<obj1.size();j++){
       			      	
	      	StepElement objsec1=obj1.get(j);
	      	objsec1.setStepId(stepId.toString());
	      	genericObj.put("stepId", stepId);
	      	checklistUserDao.saveStep(objsec1, genericObj, query);
	      	iterateQuesAnsElement(objsec1,genericObj);
			}
		}
		 }catch(Exception e){
			 e.printStackTrace();
		 }
	}

	private void iterateQuesAnsElement(StepElement obj,
			HashMap<String, Object> genericObj)throws Exception{
		ArrayList<QuestionAnswerElements> objse=obj.getQuestionAnswerElements();
		String questionIdQuery = PropertyFileReader.getInstance().getProperty("questionidquery");
		String answerIdQuery = PropertyFileReader.getInstance().getProperty("answeridquery");
		String questionquery = PropertyFileReader.getInstance().getProperty("savequestiondetails");
		String answerquery = PropertyFileReader.getInstance().getProperty("saveanswerdetails");
		String quesanswermap = PropertyFileReader.getInstance().getProperty("quesanswermap");
		String quesassocidquery = PropertyFileReader.getInstance().getProperty("getquesassocid");
		String tagMap = PropertyFileReader.getInstance().getProperty("savetagmap");
		Integer questionId=null;
		Integer answerId=null;
		Integer quesAssocId=null;
		try{
			for(int i=0;i<objse.size();i++){
				QuestionAnswerElements objse1=objse.get(i);
				ArrayList<QuestionAnswerElement> obj1=objse1.getQuestionAnswerElement();
				//questionId = checklistUserDao.getQuestionId(questionIdQuery);
				//answerId = checklistUserDao.getAnswerId(answerIdQuery);
				//quesAssocId = checklistUserDao.getQuesAssocId(quesassocidquery);
				for(int j=0;j<obj1.size();j++){
   			      	
			      	QuestionAnswerElement objsec1=obj1.get(j);
			      	
			      	questionId = checklistUserDao.getQuestionId(questionIdQuery);
			      	objsec1.setQuestionId(questionId.toString());			      	
			      	genericObj.put("questionId", questionId);
			      	answerId = checklistUserDao.getAnswerId(answerIdQuery);
			      	objsec1.setAnswerId(questionId.toString());
			      	genericObj.put("answerId", answerId);
			      	
			      	checklistUserDao.saveQuestion(objsec1, genericObj, questionquery);
			      	//quesAssocId = checklistUserDao.getQuesAssocId(quesassocidquery);
			      	objsec1.setQuesAssocId(quesAssocId.toString());
			      	genericObj.put("quesAssocId", quesAssocId);
			      	checklistUserDao.saveQuestionAnswerMap(objsec1, genericObj, quesanswermap);
			      	checklistUserDao.saveTagMap(objsec1, genericObj, tagMap);
			      	//iterateImage(obj,genericObj);
			      	genericObj.put("ELEMENTQRY", "questionelemap");
			      	iterateElement(objsec1,genericObj);			      			      				      	
			      	checklistUserDao.saveAnswer(objsec1, genericObj, answerquery);
			      	genericObj.put("ELEMENTQRY", "answerelemap");
			      	iterateElement(objsec1,genericObj);			      	
			      	
				}
				
			}
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
	}

	private void iterateElement(QuestionAnswerElement obj,
			HashMap<String, Object> genericObj)throws Exception{
		ArrayList<Elements> objse=obj.getElements();
		String elementmap = PropertyFileReader.getInstance().getProperty((String)genericObj.get("ELEMENTQRY"));		
		try{
			for(int i=0;i<objse.size();i++){
				Elements objse1=objse.get(i);
				ArrayList<Element> obj1=objse1.getElement();
				for(int j=0;j<obj1.size();j++){		      	
			      	Element objsec1=obj1.get(j);
			      	genericObj.put("elementId", objsec1.getElementId());
			      	checklistUserDao.saveElementMap(objsec1, genericObj, elementmap);
			      	iterateAttributeProb(objsec1, genericObj);
			      	iterateAttributeVal(objsec1, genericObj);
			      	iterateRule(objsec1, genericObj);
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}		
	}

	private void iterateAttributeProb(Element obj,
			HashMap<String, Object> genericObj)throws Exception {
		ArrayList<ElementArributuesProp> objse=obj.getElementArributuesProp();
		String attributeProb = PropertyFileReader.getInstance().getProperty("saveelementattributemap");	
		try{
			for(int i=0;i<objse.size();i++){
				ElementArributuesProp objse1=objse.get(i);
				checklistUserDao.saveAttributeProb(objse1, genericObj, attributeProb);
			}
		}catch(Exception e){
			e.printStackTrace();
		}		
	}
	
	private void iterateAttributeVal(Element obj,
			HashMap<String, Object> genericObj)throws Exception {
		try{
			
		}catch(Exception e){
			e.printStackTrace();
		}	
		
	}
	
	private void iterateRule(Element obj, HashMap<String, Object> genericObj)throws Exception {
		ArrayList<Rule> objse=obj.getRule();
		String rule = PropertyFileReader.getInstance().getProperty("saverule");
		String ansRuleMapIdQuery = PropertyFileReader.getInstance().getProperty("getansrulemapid");
		Integer ansRuleMapId=null;
		try{
			for(int i=0;i<objse.size();i++){
				Rule objse1=objse.get(i);
				ansRuleMapId = checklistUserDao.getQuestionId(ansRuleMapIdQuery);							      	
		      	objse1.setAnsRuleMapId(ansRuleMapId.toString());
		      	genericObj.put("ansRuleMapId", ansRuleMapId);
				checklistUserDao.saveRule(objse1, genericObj, rule);
				iterateAction(objse1, genericObj);
			}
		}catch(Exception e){
			e.printStackTrace();
		}	
		
	}

	private void iterateAction(Rule obj, HashMap<String, Object> genericObj)throws Exception{
		ArrayList<AddAction> objse=obj.getAddAction();
		String addAction = PropertyFileReader.getInstance().getProperty("saveaction");
		try{
			for(int i=0;i<objse.size();i++){
				AddAction objse1=objse.get(i);
				checklistUserDao.saveRuleAction(objse1, genericObj, addAction);				
			}
		}catch(Exception e){
			e.printStackTrace();
		}	
	}*/

	@Override
	public List<FormFilterSection> sectionDetail(FormFilterSection jsonObject) {
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");		
		
		String query = PropertyFileReader.getInstance().getProperty("getsectionlist");
		List<FormFilterSection> sectionDetail = checklistUserDao.sectionDetail(jsonObject, query);
		return sectionDetail;
	}

	@Override
	public List<FormFilterSection> stepDetail(FormFilterSection jsonObject) {
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");		
		
		String query = PropertyFileReader.getInstance().getProperty("getsteplist");
		List<FormFilterSection> stepDetail = checklistUserDao.stepDetail(jsonObject, query);
		return stepDetail;
	}

	@Override
	public List<FormFilterSection> quesDetail(FormFilterSection jsonObject) {
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");		
		
		String query = PropertyFileReader.getInstance().getProperty("getquestionlist");
		List<FormFilterSection> quesDetail = checklistUserDao.quesDetail(jsonObject, query);
		return quesDetail;
	}

	@Override
	public ChecklistDetailDto getChecklistFormDetailfromId(String formId) {
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");		
		String query = PropertyFileReader.getInstance().getProperty("getChecklistDetailfromId");
		ChecklistDetailDto checklistDetail = checklistUserDao.getChecklistFormDetailfromId(formId, query);
		return checklistDetail;
	}

	@Override
	public List<ChecklistDetailDto> getChecklistMetadataForEdit(String formId) {
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");	
		String query = PropertyFileReader.getInstance().getProperty("getChecklistMetadataDetail");
		List<ChecklistDetailDto> checklistDetailList = checklistUserDao.getChecklistMetadataForEdit(formId, query);
		return checklistDetailList;
	}

	@Override
	public List<ChecklistRecordDTO> getStepDetailFromStepid(String stepId) {
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");	
		String query = PropertyFileReader.getInstance().getProperty("getStepDetailFromStepid_1");
		List<ChecklistRecordDTO> checklistDetailList = checklistUserDao.getStepDetailFromStepid(stepId, query);
		return checklistDetailList;
	}

	@Override
	public String checklistPublishment(String formId) {
		
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");	
		String query = PropertyFileReader.getInstance().getProperty("checklistpublish");
		return checklistUserDao.checklistPublishment(formId, query);
	}

	@Override
	public String checklistAuditTrail(ChecklistFormDto dto, String json) {
		
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");
		String query = PropertyFileReader.getInstance().getProperty("checklistaudittrail");		
		return checklistUserDao.checklistAuditTrail(dto, json, query);
	}

	@Override
	public List<String> getChecklistNames(String ssoId, String role) {
		
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");
		String query = PropertyFileReader.getInstance().getProperty("selectchecklistname");		
		return checklistUserDao.getChecklistNames(ssoId, role, query);		
	}

	@Override
	public List<String> getChecklistVersion(String formname, String ssoId, String rolename) {
		
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");
		String query = PropertyFileReader.getInstance().getProperty("selectpublishversion");		
		return checklistUserDao.getChecklistVersion(formname, ssoId, query, rolename);
	}

	@Override
	public List<RecordDTO> searchRecords(ChecklistFormDto dto) {
		
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");
		String query = PropertyFileReader.getInstance().getProperty("recordsearchquery");		
		return checklistUserDao.searchRecords(dto, query);
	}

	@Override
	public List<String> getSectionDetails(String formname,
			String ssoId, String version) {
		
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");
		return checklistUserDao.getSectionDetails(formname,ssoId, version);
	}

	@Override
	public List<EDSRDetailDTO> getChecklistProjects(String formname, String ssoId) {
		
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");
		return checklistUserDao.getChecklistProjects(formname,ssoId);
	}

	@Override
	public Map<String, List<String>> checkFormForEdit(ChecklistFormDto dto) {
		
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");
		return checklistUserDao.checkFormForEdit(dto);
	}

	@Override
	public String uploadHelpImages(List<ImageDTO> dtos) {
		
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");
		return checklistUserDao.uploadHelpImages(dtos);
	}

	@Override
	public Map<String, Object> downloadHelpImages(ChecklistFormDto dto) {
		
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");
		return checklistUserDao.downloadHelpImages(dto);
	}

	@Override
	public String ischecklistnameexists(ChecklistFormDto dto) {
		
		checklistUserDao = (ChecklistUserDao)SpringApplicationContext.getBean("checklistUserDaoImpl");
		return checklistUserDao.ischecklistnameexists(dto);
	}
}
