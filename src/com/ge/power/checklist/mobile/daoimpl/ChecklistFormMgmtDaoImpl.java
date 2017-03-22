package com.ge.power.checklist.mobile.daoimpl;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

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
import com.ge.power.checklist.portal.util.PropertyFileReader;

public class ChecklistFormMgmtDaoImpl implements ChecklistFormMgmtDao{
	
	static final Logger LOGGER = Logger.getLogger(ChecklistFormMgmtDaoImpl.class);
	private JdbcTemplate jdbcTemplate;
	private String auditId;
	private Integer sectionStepId;
	private Integer ruleAnsweId;
	
	private DataSource dataSource;
	private PlatformTransactionManager transactionManager;
	
	public void setDataSource(DataSource dataSource) {
	      this.dataSource = dataSource;
	      this.jdbcTemplate = new JdbcTemplate(dataSource);
	   }
	
	public DataSource getDataSource() {
	      return dataSource;
	      //this.jdbcTemplate = new JdbcTemplate(dataSource);
	   }

	   public void setTransactionManager(
	      PlatformTransactionManager transactionManager) {
	      this.transactionManager = transactionManager;
	   }
	   
	   public PlatformTransactionManager getTransactionManager() {
			      return transactionManager;
			      
			      
			   }


	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	
	@Override
	public String authenticateUser(String ssoId) {
		return "Hello "+ssoId+" you are reached..";
	}
	
	@Override
	public List<ChecklistDetailDto> getBusinessHierarchyDetail(String groupId,  String query){
		List<ChecklistDetailDto> detailDtos = new ArrayList<ChecklistDetailDto>();
		
		RowMapper<ChecklistDetailDto> mapper = new  RowMapper<ChecklistDetailDto>() {
			
			@Override
			public ChecklistDetailDto mapRow(ResultSet rst, int arg1) throws SQLException {
				ChecklistDetailDto beanObj = new ChecklistDetailDto();
				beanObj.setFunctionId(rst.getString("bi_group_id"));
				beanObj.setFunctionName(rst.getString("bi_bus_group_name"));
				beanObj.setGroupParentId(rst.getString("bi_bus_group_parent_id"));
				return beanObj;
			}
		};
		
		detailDtos = getJdbcTemplate().query(query, mapper);
		
		return detailDtos;
	}
	
	@Override
	public ChecklistDetailDto getChecklistFormDetailfromId(ChecklistDetailDto detailDto1, String query) {
		List<ChecklistDetailDto> detailDtos = null;
		Object[] param = new Object[4];
		param[0] = Integer.parseInt(detailDto1.getFormId());
		param[1] = detailDto1.getFormLanguage();
		param[2] = Integer.parseInt(detailDto1.getBaseFormId());
		param[3] = Double.parseDouble(detailDto1.getVersionNo());
		
		RowMapper<ChecklistDetailDto> mapper = new  RowMapper<ChecklistDetailDto>() {
			
			@Override
			public ChecklistDetailDto mapRow(ResultSet rst, int arg1) throws SQLException {
				ChecklistDetailDto beanObj = new ChecklistDetailDto();
				beanObj.setFormId(rst.getString("bfd_form_id"));
				beanObj.setFormName(rst.getString("bfd_name"));
				beanObj.setAssignedToProject(rst.getString("project_applicability"));
				beanObj.setFormHelpTextDetail(rst.getString("form_helptext"));
				beanObj.setAttributeCount(rst.getString("section_count"));
				beanObj.setPublishVersion(rst.getDouble("publish_version")+"");
				return beanObj;
			}
		};
		
		detailDtos = getJdbcTemplate().query(query, param, mapper);
		
		return detailDtos.get(0);
	}

	@Override
	public List<ChecklistDetailDto> getChecklistDetail(String groupId, String formStatus, String query) {
		List<ChecklistDetailDto> detailDtos = new ArrayList<ChecklistDetailDto>();
		Object[] param = new Object[1];
		param[0] = Integer.parseInt(formStatus);
		//param[1] = groupId;
		
		RowMapper<ChecklistDetailDto> mapper = new  RowMapper<ChecklistDetailDto>() {
			
			@Override
			public ChecklistDetailDto mapRow(ResultSet rst, int arg1) throws SQLException {
				ChecklistDetailDto beanObj = new ChecklistDetailDto();
				beanObj.setFormId(rst.getString("bfd_form_id"));
				beanObj.setBaseFormId(rst.getString("base_form_id"));
				beanObj.setFormName(rst.getString("bfd_name"));
				beanObj.setFormLanguage(rst.getString("form_language"));
				beanObj.setFormStatus(rst.getString("bfd_status"));
				beanObj.setVersionNo(rst.getString("form_version"));
				beanObj.setGroupId(rst.getString("group_id"));
				beanObj.setFormConfigured(rst.getString("created_date"));
				return beanObj;
			}
		};
		
		detailDtos = getJdbcTemplate().query(query, param, mapper);
		
		return detailDtos;
	}
	
	@Override
	public List<ChecklistDetailDto> getChecklistMetadata(ChecklistDetailDto detailDto1, String query) {
		List<ChecklistDetailDto> detailDtos = new ArrayList<ChecklistDetailDto>();
		Object[] param = new Object[4];
		param[0] = Integer.parseInt(detailDto1.getFormId());
		param[1] = detailDto1.getFormLanguage();
		param[2] = Integer.parseInt(detailDto1.getBaseFormId());
		param[3] = Double.parseDouble(detailDto1.getVersionNo());
		
		RowMapper<ChecklistDetailDto> mapper = new  RowMapper<ChecklistDetailDto>() {
			
			@Override
			public ChecklistDetailDto mapRow(ResultSet rst, int arg1) throws SQLException {
				ChecklistDetailDto beanObj = new ChecklistDetailDto();
				beanObj.setSectionId(rst.getString("bfs_section_id"));
				beanObj.setSectionName(rst.getString("bfs_section_name"));
				beanObj.setSectionLabel(rst.getString("bfs_section_label"));
				beanObj.setSectionHelpTextDetail(rst.getString("section_helptext"));
				beanObj.setStepLabel(rst.getString("step_detail"));
				return beanObj;
			}
		};
		
		detailDtos = getJdbcTemplate().query(query, param, mapper);
		
		return detailDtos;
	}
	
	@Override
	public List<ChecklistRecordDTO> getStepDetailFromStepid(String stepId, String query) {
		List<ChecklistRecordDTO> detailDtos = new ArrayList<ChecklistRecordDTO>();
		Object[] param = new Object[1];
		param[0] = Integer.parseInt(stepId);
		
		RowMapper<ChecklistRecordDTO> mapper = new  RowMapper<ChecklistRecordDTO>() {
			
			@Override
			public ChecklistRecordDTO mapRow(ResultSet rst, int arg1) throws SQLException {
				ChecklistRecordDTO beanObj = new ChecklistRecordDTO();
				beanObj.setQuestionId(rst.getString("bfs_ques_id"));
				beanObj.setSequenceNo(rst.getString("question_order"));
				beanObj.setQuestionLabel(rst.getString("ques_desc"));
				beanObj.setQuestionInputElement(rst.getString("question_element"));
				beanObj.setHelpText(rst.getString("helptext_details"));
				beanObj.setAnswerId(rst.getString("bfs_ans_id"));
				beanObj.setAnswerInputElement(rst.getString("answer_element"));
				beanObj.setAnswerValue(rst.getString("ans_desc"));
				beanObj.setValidationRules(rst.getString("validation_rule"));
				beanObj.setElementTag(rst.getString("element_tag"));
				beanObj.setElementAttribute(rst.getString("element_attribute"));
				return beanObj;
			}
		};
		
		detailDtos = getJdbcTemplate().query(query, param, mapper);
		
		return detailDtos;
	}

	@Override
	public List<ChecklistRecordDTO> getChecklistlatestRecords(String ssoId, String formId, String languageName, String projectId, String noofRows, String pageNo, String query) {
		List<ChecklistRecordDTO> detailDtos = new ArrayList<ChecklistRecordDTO>();
		Object[] param = new Object[6];
		param[0] = Integer.parseInt(formId);
		param[1] = Integer.parseInt(formId);
		param[2] = languageName;
		param[3] = projectId;
		param[4] = Integer.parseInt(noofRows);
		param[5] = Integer.parseInt(pageNo);
		
		RowMapper<ChecklistRecordDTO> mapper = new  RowMapper<ChecklistRecordDTO>() {
			
			@Override
			public ChecklistRecordDTO mapRow(ResultSet rst, int arg1) throws SQLException {
				ChecklistRecordDTO beanObj = new ChecklistRecordDTO();
				beanObj.setRecordId(rst.getString("record_id"));
				beanObj.setChecklistId(rst.getString("form_id"));
				beanObj.setRecordStatus(rst.getString("recordstatus"));
				beanObj.setCreatedBySSO(rst.getString("created_by"));
				beanObj.setCreatedDate(rst.getString("created_date"));
				beanObj.setCreatedByName(rst.getString("created_by_name"));
				beanObj.setModifiedBySSO(rst.getString("updated_by"));
				beanObj.setModifiedDate(rst.getString("updated_date"));
				beanObj.setModifiedByName(rst.getString("modifiedby_name"));
				beanObj.setSyncStatus(rst.getString("syncstatus"));
				beanObj.setProjectId(rst.getString("project_id"));
				beanObj.setProjectName(rst.getString("project_name"));
				beanObj.setTurbineId(rst.getString("turbine_id"));
				beanObj.setVersionNo(rst.getDouble("record_version_no")+"");
				return beanObj;
			}
		};
		
		detailDtos = getJdbcTemplate().query(query, param, mapper);
		
		return detailDtos;
	}
	
	@Override
	public List<ChecklistRecordDTO> getRecordDetailbyRecordIdStepId(String recordId, String stepId, String query) {
		List<ChecklistRecordDTO> detailDtos = new ArrayList<ChecklistRecordDTO>();
		Object[] param = new Object[1];
		param[0] = Integer.parseInt(recordId);
		//param[1] = Integer.parseInt(stepId);
		
		RowMapper<ChecklistRecordDTO> mapper = new  RowMapper<ChecklistRecordDTO>() {
			
			@Override
			public ChecklistRecordDTO mapRow(ResultSet rst, int arg1) throws SQLException {
				ChecklistRecordDTO beanObj = new ChecklistRecordDTO();
				beanObj.setSectionId(rst.getString("section_id"));
				beanObj.setStepId(rst.getString("step_id"));
				beanObj.setQuestionId(rst.getString("bfs_ques_id"));
				beanObj.setAnswerId(rst.getString("bfs_ans_id"));
				beanObj.setAnswerValue(rst.getString("ans_desc"));
				beanObj.setComments(rst.getString("comments"));
				beanObj.setAnswerImages(rst.getString("image_array"));
				beanObj.setRuleImages(rst.getString("ruleimage_array"));
				beanObj.setAdditionalFields(rst.getString("additional_fields"));
				beanObj.setElementId(rst.getString("element_id"));
				beanObj.setElementSequense(rst.getString("sequesnce_no"));
				beanObj.setElementName(rst.getString("element_name"));
				beanObj.setNameAttribValue(rst.getString("name_attrib_value"));
				return beanObj;
			}
		};
		
		detailDtos = getJdbcTemplate().query(query, param, mapper);
		
		return detailDtos;
	}

	@Override
	public List<UserDetailDTO> getUserRoleAndPermission(String ssoId, String query) {
		
		List<UserDetailDTO> detailDtos = new ArrayList<UserDetailDTO>();
		Object[] param = new Object[1];
		param[0] = ssoId;
		
		RowMapper<UserDetailDTO> mapper = new  RowMapper<UserDetailDTO>() {
			
			@Override
			public UserDetailDTO mapRow(ResultSet rst, int arg1) throws SQLException {
				UserDetailDTO beanObj = new UserDetailDTO();
				beanObj.setLastName(rst.getString("bi_user_Lname"));
				beanObj.setFirstName(rst.getString("bi_user_Fname"));
				beanObj.setSsoId(rst.getString("bi_user_sso"));
				beanObj.setRoleName(rst.getString("role_name"));
				beanObj.setGroupId(rst.getString("bi_group_id"));
				beanObj.setIsChecklistAppUser(rst.getString("ischecklistappuser"));
				return beanObj;
			}
		};
		detailDtos = getJdbcTemplate().query(query, param, mapper);
		
		// TODO Auto-generated method stub
		return detailDtos;
	}
	
	
	
	public void insertQuestionElement(QuestionElement objqe1, Map<String, Object> genericObj, String query)throws Exception{
		List<ChecklistFormDto> insertRecordDto = new ArrayList<ChecklistFormDto>();		
		Object[] param = new Object[12];
		param[0] = genericObj.get("serverRecordId");
		param[1] = genericObj.get("sectionId");			
		param[2] = genericObj.get("stepId");
		param[3] = genericObj.get("QESAccoId");
		param[4] = objqe1.getComments();		
		param[5] = genericObj.get("submittedBy");	
		param[6] = genericObj.get("createdDate");
		param[7] = genericObj.get("modifiedDate");
		param[8] = genericObj.get("isDeleted");
		
		ArrayList<HashMap<String, Object>> ansValues = objqe1.getAnswerValue();
		
		TransactionDefinition def = new DefaultTransactionDefinition();
        TransactionStatus status = transactionManager.getTransaction(def);
        
		try{
			
			for(int i=0; i < ansValues.size(); i++){
				
				HashMap<String, Object> elemDetails = ansValues.get(i);
				
				param[9] = elemDetails.get("answerElementValue");
				param[10] = Integer.parseInt((String)elemDetails.get("answerInputElementId"));
				param[11] = Integer.parseInt((String)elemDetails.get("sequesnceId"));
				int recordEntry = getJdbcTemplate().update(query, param);
				insertSectionAndStepAuditTrail(genericObj, param);
				
				ArrayList<HashMap<String, String>> objse = (ArrayList<HashMap<String, String>>)elemDetails.get("rulesAnswerValues");
				if(objse != null && objse.size() > 0){
					iterateRulesAnswer(objqe1, genericObj, objse);
				}
				
				/*genericObj.put("answerInputElementId", (String)elemDetails.get("answerInputElementId"));
				genericObj.put("sequesnceId", (String)elemDetails.get("sequesnceId"));
			
				if(elemDetails.containsKey("answerImages")){
					ArrayList<HashMap<String, String>> ansImageThumbnailList = (ArrayList<HashMap<String, String>>)elemDetails.get("answerImages");
					if(ansImageThumbnailList != null && ansImageThumbnailList.size() > 0){
						
						insertThumbnailImageData(objqe1, genericObj, ansImageThumbnailList);
					}
				}
				
				if(elemDetails.containsKey("rulesAnswerImages")){
					ArrayList<HashMap<String, String>> ruleImageThumbnailList = (ArrayList<HashMap<String, String>>)elemDetails.get("rulesAnswerImages");
					if(ruleImageThumbnailList != null && ruleImageThumbnailList.size() > 0){
						insertThumbnailImageData(objqe1, genericObj, ruleImageThumbnailList);
					}
				}*/
			}
			transactionManager.commit(status);
			}catch(Exception objex){	
				//objex.printStackTrace();
				LOGGER.info(objex.getMessage());
				transactionManager.rollback(status);
				throw new Exception("error on insert of record");
			}
		
	}
	
	private Integer getRecordSectionStepId() {
		
		RowCallbackHandler rch = new RowCallbackHandler() {
			
			@Override
			public void processRow(ResultSet res) throws SQLException {
				sectionStepId = (Integer)res.getInt(1);					
			}
		};
		
		getJdbcTemplate().query(PropertyFileReader.getInstance().getProperty("recordsectionstepid"), rch);

		return sectionStepId;
	}

	public void editQuestionElement(final QuestionElement objqe1, final Map<String, Object> genericObj, String query)throws Exception{
		
		 String deletequery=(String)genericObj.get("DELETEANSVALQRY");
		
		Object[] param = null;
		
		final ArrayList<HashMap<String, Object>> ansValues = objqe1.getAnswerValue();
		
		TransactionDefinition def = new DefaultTransactionDefinition();
		TransactionStatus status = transactionManager.getTransaction(def);
		try{
			//LOGGER.info("from entry query is ----------"+query);
			getJdbcTemplate().batchUpdate(query, new BatchPreparedStatementSetter() {
				
				@Override
				public void setValues(PreparedStatement ps, int i) throws SQLException {
					HashMap<String, Object> elemValues = ansValues.get(i);
					//LOGGER.info(elemValues.get("answerInputElementId")+" ----- "+elemValues.get("sequesnceId")+" ----- "+elemValues.get("answerElementValue"));
					ps.setInt(1, Integer.parseInt(genericObj.get("sectionId").toString()));		
					ps.setInt(2, Integer.parseInt(genericObj.get("stepId").toString()));
					ps.setInt(3, Integer.parseInt(genericObj.get("QESAccoId").toString()));
					ps.setString(4, objqe1.getComments());		
					ps.setString(5, genericObj.get("submittedBy").toString());	
					ps.setString(6, genericObj.get("isDeleted").toString());
					ps.setString(7, (String)elemValues.get("answerElementValue"));
					ps.setInt(8, Integer.parseInt(elemValues.get("answerInputElementId").toString()));
					ps.setInt(9, Integer.parseInt(elemValues.get("sequesnceId").toString()));	
					ps.setInt(10, Integer.parseInt(genericObj.get("serverRecordId").toString()));
					ps.setString(11, objqe1.getQuestionId());
					ps.setString(12, elemValues.get("sequesnceId").toString());
				}
				@Override
				public int getBatchSize() {
					return ansValues.size();
				}
			  });
			
			transactionManager.commit(status);
			for(int i = 0; i < ansValues.size(); i++){
				HashMap<String, Object> elemValues = ansValues.get(i);
				ArrayList<HashMap<String, String>> objse = (ArrayList<HashMap<String, String>>)elemValues.get("rulesAnswerValues");
				if(objse != null && objse.size() > 0){
					//LOGGER.info("Rule answers found.....................");
					deleteRulesAnswer(objqe1, genericObj, deletequery);
					iterateEditRulesAnswer(objqe1, genericObj, objse);
				}
				
				/*genericObj.put("answerInputElementId", (String)elemValues.get("answerInputElementId"));
				genericObj.put("sequesnceId", (String)elemValues.get("sequesnceId"));
				
				if(elemValues.containsKey("answerImages")){
					ArrayList<HashMap<String, String>> ansImageThumbnailList = (ArrayList<HashMap<String, String>>)elemValues.get("answerImages");
					if(ansImageThumbnailList != null && ansImageThumbnailList.size() > 0){
						genericObj.put("serverRecordId", Integer.parseInt(genericObj.get("serverRecordId").toString()));
						deleteThumbnailImageData(objqe1, genericObj, "RuleImage");
						insertThumbnailImageData(objqe1, genericObj, ansImageThumbnailList);
					}
				}
				
				if(elemValues.containsKey("rulesAnswerImages")){
					ArrayList<HashMap<String, String>> ruleImageThumbnailList = (ArrayList<HashMap<String, String>>)elemValues.get("rulesAnswerImages");
					if(ruleImageThumbnailList != null && ruleImageThumbnailList.size() > 0){
						genericObj.put("serverRecordId", Integer.parseInt(genericObj.get("serverRecordId").toString()));
						deleteThumbnailImageData(objqe1, genericObj, "RuleImage");
						insertThumbnailImageData(objqe1, genericObj, ruleImageThumbnailList);
					}
				}*/
				
			}
			//getJdbcTemplate().batchUpdate(query, inputList);
		}catch(Exception objex){	
			objex.printStackTrace();
			LOGGER.info(objex.getMessage());
			transactionManager.rollback(status);
			throw new Exception("error on insert of record");
		}
		
	}
	
	
	public List<ChecklistFormDto> insertRecordEntry(ChecklistFormDto obj, final String query,HashMap<String, Object> objHashMap)throws Exception {
		List<ChecklistFormDto> insertRecordDto = new ArrayList<ChecklistFormDto>();
		Integer recordId=Integer.parseInt(obj.getServerRecordId());
		String languageId = obj.getLanguageId();
		String recordStatus = obj.getRecordStatus();
		String submittedBy = obj.getSubmittedBy();
		String createdDate = obj.getCreatedDate();
		String syncStatus = obj.getSyncStatus();
		String projectId = obj.getProjectId();
		String turbineId = obj.getTurbineId();
		String versionNo = obj.getVersionNo();
		
		Object[] param = new Object[11];
		param[0] = recordId;
		param[1] = languageId;
		param[2] = recordStatus;		
		param[3] = submittedBy;
		param[4] = createdDate;
		param[5] = submittedBy;
		param[6] = createdDate;
		param[7] = syncStatus;
		param[8] = projectId;
		param[9] = turbineId;
		param[10] = Double.parseDouble(versionNo);
		
		TransactionDefinition def = new DefaultTransactionDefinition();
        TransactionStatus status = transactionManager.getTransaction(def);
		
		try{
			
			objHashMap.put("actionFLG", "INSERT");	
			int recordEntry = getJdbcTemplate().update(query, param);
			objHashMap.put("auditId", auditId);
			objHashMap.put("ruleAudit", PropertyFileReader.getInstance().getProperty("insertrecordrulesaudit"));
			objHashMap.put("sectionStepAudit", PropertyFileReader.getInstance().getProperty("insertrecordsectionaudit"));
			insertRecordAuditEntry(obj, "Create");
			iterateDTO(obj,objHashMap);	
			obj.setSyncStatus("Synced");
			insertRecordAuditFormEntry(obj,"Synced","Create");
			transactionManager.commit(status);
		}catch(Exception objex){				
			LOGGER.info("Error in creating record, rolling back");
			 LOGGER.info(objex.getMessage());
	         transactionManager.rollback(status);

			throw new Exception("error on insert of record");
		}
		
		return insertRecordDto;
	}

	private String getAuditId(String auditIdQuery) throws Exception {
		
		RowCallbackHandler rch = new RowCallbackHandler() {
			
			@Override
			public void processRow(ResultSet res) throws SQLException {
				auditId = res.getString(1);					
			}
		};
		
		getJdbcTemplate().query(auditIdQuery, rch);

		return auditId;
	}
	
	private void insertRecordAuditFormEntry(ChecklistFormDto obj, String status, String action) {
		
		String queryInsertQuestion = PropertyFileReader.getInstance().getProperty("insertrecordformaudit");
		
		Object[] param = new Object[9];
		param[0] = obj.getServerRecordId();
		param[1] = auditId;
		param[2] = obj.getSubmittedBy();
		if("Create".equals(action)){
			param[3] = obj.getCreatedDate();
		}else{
			param[3] = obj.getModifiedDate();
		}
		param[4] = status;
		param[5] = obj.getProjectId();
		param[6] = obj.getTurbineId();
		param[7] = obj.getRecordStatus();
		param[8] = ""; //comments
		getJdbcTemplate().update(queryInsertQuestion, param);		
	}

	private void insertRecordAuditEntry(ChecklistFormDto obj, String action) throws Exception {
		
		getAuditId(PropertyFileReader.getInstance().getProperty("auditidquery"));
		String queryInsertQuestion = PropertyFileReader.getInstance().getProperty("insertrecordaudit");
		Object[] param = new Object[11];
		param[0] = auditId;
		param[1] = obj.getServerRecordId();
		param[2] = new Timestamp(new Date().getTime());//sync start time
		param[3] = new Timestamp(new Date().getTime()); //sync end time
		param[4] = "";//eroor log
		param[5] = obj.getRecordStatus();
		param[6] = obj.getSubmittedBy();
		if("Create".equals(action)){
			param[7] = obj.getCreatedDate();
		}else{
			param[7] = obj.getModifiedDate();
		}
		param[8] = Double.parseDouble(obj.getVersionNo());// record version no
		param[9] = action;
		param[10] = obj.getFormId();
		getJdbcTemplate().update(queryInsertQuestion, param);
	}

	public List<ChecklistFormDto> editRecordEntry(ChecklistFormDto obj, final String query,HashMap<String, Object> objHashMap)throws Exception {
		List<ChecklistFormDto> insertRecordDto = new ArrayList<ChecklistFormDto>();
		Integer recordId=Integer.parseInt(obj.getServerRecordId());
		String languageId = obj.getLanguageId();
		String recordStatus = obj.getRecordStatus();
		String submittedBy = obj.getSubmittedBy();
		String createdDate = obj.getModifiedDate();
		String syncStatus = obj.getSyncStatus();
		String versionNo = obj.getVersionNo();
		
		Object[] param = new Object[7];
		param[0] = languageId;
		param[1] = recordStatus;		
		param[2] = submittedBy;
		param[3] = createdDate;
		param[4] = syncStatus;
		param[5] = Double.parseDouble(versionNo);
		param[6] = recordId;
		
		
		TransactionDefinition def = new DefaultTransactionDefinition();
        TransactionStatus status = transactionManager.getTransaction(def);
		
		try{
			
		//LOGGER.info("from entry query is ----------"+query);
		objHashMap.put("actionFLG", "EDIT");	
		int recordEntry = getJdbcTemplate().update(query, param);	
		objHashMap.put("auditId", auditId);
		objHashMap.put("ruleAudit", PropertyFileReader.getInstance().getProperty("insertrecordrulesaudit"));
		objHashMap.put("sectionStepAudit", PropertyFileReader.getInstance().getProperty("insertrecordsectionaudit"));
		insertRecordAuditEntry(obj, "Update");
		iterateDTO(obj,objHashMap);
		obj.setSyncStatus("Synced");
		insertRecordAuditFormEntry(obj,"Synced","Update");
		
		//LOGGER.info("recordEntry -------"+recordEntry);
		transactionManager.commit(status);
		}catch(Exception objex){				
			//objex.printStackTrace();
			//insertRecordAuditFormEntry(obj,"notSynced");
			LOGGER.info("Error in creating record, rolling back");
			 LOGGER.info(objex.getMessage());
	         transactionManager.rollback(status);

			throw new Exception("error on insert of record");
		}
		return insertRecordDto;
	}
	
	
	@Override
	public Integer getRecord(final Map<String, Object> genericObj, String query1)throws Exception {
		Integer recordId=null;
		try{		
		
		recordId = jdbcTemplate.queryForObject(query1, Integer.class);
		}catch(Exception e){
		//	e.printStackTrace();
			 LOGGER.info(e.getMessage());
		}
		return recordId;
	}
	

	public List<EDSRDetailDTO> getEDSRProjectTurbineDetail(String query) {
		List<EDSRDetailDTO> detailDtos = new ArrayList<EDSRDetailDTO>();
		
		RowMapper<EDSRDetailDTO> mapper = new  RowMapper<EDSRDetailDTO>() {
			
			@Override
			public EDSRDetailDTO mapRow(ResultSet rst, int arg1) throws SQLException {
				EDSRDetailDTO beanObj = new EDSRDetailDTO();
				beanObj.setProjectId(rst.getString("project_id"));
				beanObj.setProjectName(rst.getString("project_name"));
				//beanObj.setSysProjectId(rst.getString("sys_project_id"));
				beanObj.setTurbineId(rst.getString("turbine_id"));
				return beanObj;
			}
		};
		detailDtos = getJdbcTemplate().query(query, mapper);
		
		// TODO Auto-generated method stub
		return detailDtos;
	}
	
	@Override
	public List<EDSRDetailDTO> getEDSRTurbineDetailByProjectId(String projectId, String query) {
		List<EDSRDetailDTO> detailDtos = new ArrayList<EDSRDetailDTO>();
		Object[] param = new Object[1];
		param[0] = Integer.parseInt(projectId);
		RowMapper<EDSRDetailDTO> mapper = new  RowMapper<EDSRDetailDTO>() {
			
			@Override
			public EDSRDetailDTO mapRow(ResultSet rst, int arg1) throws SQLException {
				EDSRDetailDTO beanObj = new EDSRDetailDTO();
				beanObj.setTurbineId(rst.getString("turbine_id"));
			//	beanObj.setProjectName(rst.getString("project_name"));
				return beanObj;
			}
		};
		detailDtos = getJdbcTemplate().query(query, param, mapper);
		
		// TODO Auto-generated method stub
		return detailDtos;
	}
	
	 public void iterateDTO(ChecklistFormDto obj,Map<String, Object> genericObj)throws Exception {
		 ArrayList<SectionElements> objse=obj.getRecordElements().get(0).getSectionElements();           
         for(int i=0;i<objse.size();i++){
        	SectionElements objse1=objse.get(i);
        	ArrayList<SectionElement> obj1=objse1.getSectionElement();
        	for(int j=0;j<obj1.size();j++){
        		 genericObj.put("sectionId",(obj1.get(j).getSectionId()));
        		 //LOGGER.info("Inside section loop--------- "+ obj1.get(j).getSectionId());
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
      	//LOGGER.info("Inside step loop--------- "+ objse1.getStepId());
      	if(("INSERT").equals(genericObj.get("actionFLG")))
      		iterateQuestionElement(objse1,genericObj);
      	else
      		iterateEditQuestionElement(objse1,genericObj);
      	 }
}
  

  public void iterateQuestionElement(StepElements obj,Map<String, Object> genericObj)throws Exception {
	  String query = (String)genericObj.get("INSERTQUESIONQRY");
	  String recordstatusquery = (String)genericObj.get("RECORDSTATUS");
	  String qesassocid = (String)genericObj.get("QESASSOCID");
 	  Integer qesAccoId = null; 
	  ArrayList<QuestionElements> objse=obj.getQuestionElements();
	  try{
         for(int i=0;i<objse.size();i++){
        	QuestionElements obj1=objse.get(i);
        	//LOGGER.info("Inside question element frist loop--------- "+ obj1);
        	ArrayList<QuestionElement> objQE1=obj1.getQuestionElement();
         	 for(int j=0;j<objQE1.size();j++){
         		QuestionElement objqe1=objQE1.get(j);
         		//LOGGER.info("Inside question element second loop--------- "+ objqe1);
         		qesAccoId =	getQesAssocId(objqe1, qesassocid);
         		genericObj.put("QESAccoId", qesAccoId);
         		insertQuestionElement(objqe1, genericObj, query);
         	 }
         	updateRecordStatus(genericObj, recordstatusquery);
         }  
	  }catch(Exception e){
		 // e.printStackTrace();
		  LOGGER.info(e.getMessage());
	  }

  }
  public void iterateEditQuestionElement(StepElements obj,Map<String, Object> genericObj)throws Exception {
	  String query = (String)genericObj.get("EDITQUESIONQRY");
	  String recordstatusquery = (String)genericObj.get("RECORDSTATUS");
	  String qesassocid = (String)genericObj.get("QESASSOCID");
	  Integer qesAccoId = null; 
	  ArrayList<QuestionElements> objse=obj.getQuestionElements();
	  try{
         for(int i=0;i<objse.size();i++){
        	QuestionElements obj1=objse.get(i);
        	//LOGGER.info("Inside question element frist loop--------- "+ obj1);
        	ArrayList<QuestionElement> objQE1=obj1.getQuestionElement();
         	 for(int j=0;j<objQE1.size();j++){
         		QuestionElement objqe1=objQE1.get(j);
         		//LOGGER.info("Inside question element second loop--------- "+ objqe1);
         		qesAccoId =	getQesAssocId(objqe1, qesassocid);
         		genericObj.put("QESAccoId", qesAccoId);
         		editQuestionElement(objqe1, genericObj, query);
         	 }
         }  
         updateRecordStatus(genericObj, recordstatusquery);
	  }catch(Exception e){
		 // e.printStackTrace();
		  LOGGER.info(e.getMessage());
	  }

  }
  
  public void iterateRulesAnswer(QuestionElement obj,Map<String, Object> genericObj, ArrayList<HashMap<String, String>> objse)throws Exception {
	  String query=(String)genericObj.get("INSERTANSVALQRY");
	  String rulesAnswerKey="";
	  String rulesAnswerVal="";
	  try{       
		  if(objse != null && objse.size() !=0 && obj != null){ 
			  genericObj.put("questionId", obj.getQuestionId());
			  
			  genericObj.put("rulesAnswerValues", objse);
         	 
			  if(objse!=null && objse.size()>0){
				for(int i=0;i<objse.size();i++){  
					HashMap<String, String> objAV=objse.get(i);
				Set<String>ruleKeys = objAV.keySet();
				for(String key:ruleKeys){
					rulesAnswerKey=key;
					rulesAnswerVal=objAV.get(key);
					insertRulesAnswer(rulesAnswerKey,rulesAnswerVal, genericObj, query);
				}
				}
			  }
			  
		  }
         	
       
	  }catch(Exception e){
		  //e.printStackTrace();
		  LOGGER.info(e.getMessage());
	  }

  }

  
  public void iterateEditRulesAnswer(QuestionElement obj,Map<String, Object> genericObj, ArrayList<HashMap<String, String>> objse)throws Exception {
	  String query=(String)genericObj.get("INSERTANSVALQRY");
	  String rulesAnswerKey="";
	  String rulesAnswerVal="";
	  try{       
		  if(objse != null && objse.size() !=0 && obj != null){ 
			  genericObj.put("questionId", obj.getQuestionId());
			  genericObj.put("rulesAnswerValues", objse);
         	 
			  if(objse!=null && objse.size()>0){
				for(int i=0;i<objse.size();i++){  
					HashMap<String, String> objAV=objse.get(i);
					Set<String>ruleKeys = objAV.keySet();
					for(String key:ruleKeys){
						rulesAnswerKey=key;
						rulesAnswerVal=objAV.get(key);
						insertRulesAnswer(rulesAnswerKey,rulesAnswerVal, genericObj, query);
					}
				}
			  }
		  }
	  }catch(Exception e){
		 // e.printStackTrace();
		  LOGGER.info(e.getMessage());
	  }

  }
  
	@Override
	public String updateImagePath(ChecklistHelpTextDTO helpTextDTO, String token, String imageFor, String query) {
		String updateStatus = "";
		int rownum = 0;
		String imageIdQuery = PropertyFileReader.getInstance().getProperty("getImageId");
		Integer imageId=0;
		TransactionDefinition def = new DefaultTransactionDefinition();
        TransactionStatus status = transactionManager.getTransaction(def);
		
		if("Add".equals(token)){
			final String imagePath = helpTextDTO.getImageUrl();
			final String ssoId = helpTextDTO.getUserSSOId();
			final String questionId = helpTextDTO.getQuestionId();
			final String recordId = helpTextDTO.getRecordId();
			final String helpDescription = helpTextDTO.getHelpDescription();
			final String thumbnailData = helpTextDTO.getThumbnailData();
			final String elementId = helpTextDTO.getElementId();
			final String sequenceNo = helpTextDTO.getSequanceNo();
			
			rownum = getJdbcTemplate().update(query, new PreparedStatementSetter() {
			      public void setValues(PreparedStatement ps) throws SQLException {
			    	  ps.setInt(1, Integer.parseInt(recordId));
			          ps.setString(2, imagePath);
			          ps.setString(3, helpDescription);
			          ps.setInt(4, Integer.parseInt(questionId));
			          ps.setString(5, "RecordImage");
			          ps.setString(6, thumbnailData);
			          ps.setInt(7, Integer.parseInt(elementId));
			          ps.setInt(8, Integer.parseInt(sequenceNo));
			          ps.setInt(9, Integer.parseInt(ssoId));
			        }
			      });
			transactionManager.commit(status);
			
			try{			
				imageId = jdbcTemplate.queryForObject(imageIdQuery, Integer.class);
				}catch(Exception e){
					//e.printStackTrace();
					LOGGER.info(e.getMessage());
				}
			
		} else{
			final String imagePath = helpTextDTO.getImageUrl();
			final String ssoId = helpTextDTO.getUserSSOId();
			final String questionId = helpTextDTO.getQuestionId();
			final String formId = helpTextDTO.getRecordId();
			final String thumbnailData = helpTextDTO.getThumbnailData();
			final String serverImageId = helpTextDTO.getServerImageId();
			
			rownum = getJdbcTemplate().update(query, new PreparedStatementSetter() {
			      public void setValues(PreparedStatement ps) throws SQLException {
			          ps.setString(1, imagePath);
			          ps.setString(2, thumbnailData);
			          ps.setInt(3, Integer.parseInt(ssoId));
			          ps.setInt(4, Integer.parseInt(serverImageId));
			          ps.setInt(5, Integer.parseInt(questionId));
			          ps.setInt(6, Integer.parseInt(formId));
			        }
			      });
			transactionManager.commit(status);
			imageId = Integer.parseInt(serverImageId);
			
		}
		
		if(rownum > 0){
			updateStatus = imageId+"#Image Path Updated Successfully.";
		} else{
			updateStatus = "Image Path not Updated Successfully.";
		}
		return updateStatus;
	}

	

	@Override
	public Integer getLanguage(HashMap<String, Object> genericObj, String query2)throws Exception {
		
		Object[] param = new Object[2];
		param[0] = genericObj.get("formId");		
		param[1] = genericObj.get("language");		
		
		Integer languageId=null;
		try{			
			languageId = jdbcTemplate.queryForObject(query2, param, Integer.class);
			//LOGGER.info("*** languageId*****"+ languageId);			
			}catch(Exception e){
				//e.printStackTrace();
				LOGGER.info(e.getMessage());
			}
		/*for(int j=0;j<param.length;j++)
			 LOGGER.info("Fetch Language ID----------"+param[j]);
		*/
		return languageId;
	}

	@Override
	public void insertRulesAnswer(String rulesAnswerKey, String rulesAnswerVal, Map<String, Object> genericObj, String query) throws Exception {
		
		Object[] param = new Object[4];
		param[0] = genericObj.get("QESAccoId");
		param[1] = rulesAnswerKey;
		param[2] = rulesAnswerVal;
		param[3] = genericObj.get("serverRecordId");
		
		try{
			/*for(int j=0;j<param.length;j++)
			 LOGGER.info("insert Rules Answer param is ----------"+param[j]);
			 
			LOGGER.info("insert Rules Answer query is ----------"+query);
			*/
			int insertRulesAnswer = getJdbcTemplate().update(query, param);
			insertRuleAnsAuditTrail(genericObj, param);			
			//LOGGER.info("recordEntry -------"+insertRulesAnswer);
			}catch(Exception objex){	
				//objex.printStackTrace();
				LOGGER.info(objex.getMessage());
				throw new Exception("error on insert of record");
			}
		
	}

	private void insertRuleAnsAuditTrail(Map<String, Object> genericObj, Object[] param1) {
		
		String query = (String) genericObj.get("ruleAudit");
		Integer ruleId = (Integer) getRuleAnswerId("selectRuleAnsId", genericObj);
		if (ruleId == null) return;
		
		Object[] param = new Object[8];
		param[0] = ruleId;
		param[1] = genericObj.get("serverRecordId");
		param[2] = genericObj.get("auditId");
		param[3] = genericObj.get("createdDate");
		param[4] = genericObj.get("submittedBy");
		param[5] = genericObj.get("QESAccoId");
		param[6] = param1[2];
		param[7] = param1[1];
		getJdbcTemplate().update(query, param);		
	}

	private Object getRuleAnswerId(String string, Map<String, Object> genericObj) {
		
		RowCallbackHandler rch = new RowCallbackHandler() {
			
			@Override
			public void processRow(ResultSet res) throws SQLException {
				ruleAnsweId = (Integer)res.getInt(1);			
			}
		};
		
		Object[] param = new Object[3];
		param[0] = genericObj.get("QESAccoId");
		param[1] = genericObj.get("serverRecordId");
		param[2] = genericObj.get("submittedBy");
		
		getJdbcTemplate().query(PropertyFileReader.getInstance().getProperty(string), param, rch);

		return ruleAnsweId;
	}

	private void insertSectionAndStepAuditTrail(Map<String, Object> genericObj, Object[] param1) {
		
		Object[] param = new Object[15];
		param[0] = getRecordSectionStepId();
		param[1] = genericObj.get("serverRecordId");
		param[2] = genericObj.get("auditId");
		param[3] = genericObj.get("submittedBy");
		param[4] = genericObj.get("createdDate");
		param[5] = genericObj.get("sectionId");			
		param[6] = genericObj.get("stepId");
		param[7] = genericObj.get("QESAccoId");
		param[8] = param1[9];//Ans Desc
		param[9] = ""; //SYNC Status
		param[10] = param1[4];	//comments	
		param[11] = param1[8]; //is Deleted
		param[12] = param1[10]; //Element Id
		param[13] = param1[11];
		param[14] = genericObj.get("isPunchList");
		String query = (String) genericObj.get("sectionStepAudit");
		
		getJdbcTemplate().update(query, param);
	}

	//@Override
	public void deleteRulesAnswer(QuestionElement objqe1, Map<String, Object> genericObj, String deletequery)throws Exception {
		
		Object[] param = new Object[2];
		param[0] = genericObj.get("serverRecordId");
		param[1] = genericObj.get("QESAccoId");
		//param[1] = objqe1.getQuestionId();//genericObj.get("questionId");		
		
		try{
				int deleteRulesAnswer = getJdbcTemplate().update(deletequery, param);
			}catch(Exception objex){	
				//objex.printStackTrace();
				LOGGER.info(objex.getMessage());
				throw new Exception("error on insert of record");
			}
		
	}
	
	
	
	public void updateRecordStatus(Map<String, Object> genericObj, String recordstatusquery)throws Exception {
		
		Object[] param = new Object[1];
		param[0] = genericObj.get("serverRecordId");
				
		
		try{
			int recordStatus = getJdbcTemplate().update(recordstatusquery, param);
			}catch(Exception objex){	
				//objex.printStackTrace();
				LOGGER.info(objex.getMessage());
				throw new Exception("error on insert of record");
			}
		
	}
	
public void updateRulesAnswer(String rulesAnswerKey, String rulesAnswerVal, Map<String, Object> genericObj, String queryupdateans)throws Exception {
		
	Object[] param = new Object[4];
	param[0] = rulesAnswerKey;
	param[1] = rulesAnswerVal;
	param[2] = genericObj.get("serverRecordId");
	//param[3] = genericObj.get("questionId");
	param[3] = genericObj.get("qaassocid");
	
	
	try{
		int insertRulesAnswer = getJdbcTemplate().update(queryupdateans, param);
		}catch(Exception objex){	
			//objex.printStackTrace();
			LOGGER.info(objex.getMessage());
			throw new Exception("error on insert of record");
		}
		
	}

@Override
public void deleteRulesAnswer(Map<String, Object> genericObj, String query)
		throws Exception {
	// TODO Auto-generated method stub
	
}

//@Override
public Integer getQesAssocId(QuestionElement objqe1,String query3)throws Exception{
	
	Object[] param = new Object[1];	
	param[0] = objqe1.getQuestionId();		
	
	Integer qesAsscocId=null;
	try{			
		qesAsscocId = jdbcTemplate.queryForObject(query3, param, Integer.class);
		//LOGGER.info("*** QueAsscocId*****"+ qesAsscocId);	
		
		}catch(Exception e){
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
		}
	//for(int j=0;j<param.length;j++)
		 //LOGGER.info("Fetch Language ID----------"+param[j]);	
	
	return qesAsscocId;
	
}

@Override
public void deleteChecklistImages(String recordId, final ArrayList<String> pathList, String query) {
	jdbcTemplate.batchUpdate(query, new BatchPreparedStatementSetter() {
	@Override
	public void setValues(PreparedStatement ps, int i) throws SQLException {
		int path = Integer.parseInt(pathList.get(i));
		ps.setInt(1, path);
	}
			
	@Override
	public int getBatchSize() {
		return pathList.size();
	}
  });
}

@Override
public Integer getChecklistRecordCount(String ssoId, String formId,	String languageName, String projectId, String query) {
	Integer recordCount = null;
	try {
		Object[] param = new Object[3];
		param[0] = Integer.parseInt(formId);
		param[1] = languageName;
		param[2] = projectId;
		
		recordCount = jdbcTemplate.queryForObject(query, param, Integer.class);
	} catch (Exception e) {
		//e.printStackTrace();
		LOGGER.info(e.getMessage());
	}
	return recordCount;
}

@Override
public String updateImagePathByPortal(ChecklistHelpTextDTO helpTextDTO, String token, String imageFor, String query) {
	String updateStatus = "";
	String imageIdQuery =  PropertyFileReader.getInstance().getProperty("getHelpImageId");
	try {
		TransactionDefinition def = new DefaultTransactionDefinition();
        TransactionStatus status = transactionManager.getTransaction(def);
		int rownum = 0;
		Integer imageId = 0;
		if("Add".equalsIgnoreCase(token)){
			final String imagePath = helpTextDTO.getImageUrl();
			final String ssoId = helpTextDTO.getUserSSOId();
			final String formId = helpTextDTO.getFormId();
			final String assiciationId = helpTextDTO.getAssociationId();
			final String helpDescription = helpTextDTO.getHelpDescription();
			final String helpTextLevel = helpTextDTO.getHelpTextLevel();
			
			rownum = getJdbcTemplate().update(query, new PreparedStatementSetter() {
			      public void setValues(PreparedStatement ps) throws SQLException {
			    	  ps.setInt(1, Integer.parseInt(formId));
			    	  ps.setString(2, helpDescription);
			          ps.setString(3, imagePath);
			          ps.setString(4, helpTextLevel);
			    	  ps.setInt(5, Integer.parseInt(assiciationId));
			          ps.setInt(6, Integer.parseInt(ssoId));
			        }
			      });

			transactionManager.commit(status);
		}
		
		try{			
			imageId = jdbcTemplate.queryForObject(imageIdQuery, Integer.class);
			//LOGGER.info("*** languageId*****"+ languageId);			
			}catch(Exception e){
				//e.printStackTrace();
				LOGGER.info(e.getMessage());
			}

		if(rownum > 0){
			updateStatus =  imageId+"#Image Path Updated Successfully.";
		} else{
			updateStatus = "Image Path not Updated Successfully.";
		}
	} catch (Exception e) {
		e.printStackTrace();
		LOGGER.info(e.getMessage());
	}
	return updateStatus;
}

@Override
public String updateRulesImagePath(ChecklistHelpTextDTO helpTextDTO, String token, String query) {

	String updateStatus = "";
	String imageIdQuery =  PropertyFileReader.getInstance().getProperty("getImageId");
	Integer imageId = 0;
	int rownum = 0;
	if("Add".equals(token)){
		final String imagePath = helpTextDTO.getImageUrl();
		final String ssoId = helpTextDTO.getUserSSOId();
		final String questionId = helpTextDTO.getQuestionId();
		final String recordId = helpTextDTO.getRecordId();
		final String helpDescription = helpTextDTO.getHelpDescription();
		final String elementId = helpTextDTO.getElementId();
		final String sequenceNo = helpTextDTO.getSequanceNo();
		final String thumbnailData = helpTextDTO.getThumbnailData();
		
		rownum = getJdbcTemplate().update(query, new PreparedStatementSetter() {
			      public void setValues(PreparedStatement ps) throws SQLException {
			    	  ps.setInt(1, Integer.parseInt(recordId));
			          ps.setString(2, imagePath);
			          ps.setString(3, helpDescription);
			          ps.setInt(4, Integer.parseInt(questionId));
			          ps.setString(5, "RuleImage");
			          ps.setString(6, thumbnailData);
			          ps.setInt(7, Integer.parseInt(elementId));
			          ps.setInt(8, Integer.parseInt(sequenceNo));
			          ps.setInt(9, Integer.parseInt(ssoId));
			        }
			      });
		
		try{			
			imageId = jdbcTemplate.queryForObject(imageIdQuery, Integer.class);
			//LOGGER.info("*** languageId*****"+ languageId);			
			}catch(Exception e){
				//e.printStackTrace();
				LOGGER.info(e.getMessage());
			}
		
	} else{
			final String imagePath = helpTextDTO.getImageUrl();
			final String ssoId = helpTextDTO.getUserSSOId();
			final String questionId = helpTextDTO.getQuestionId();
			final String formId = helpTextDTO.getRecordId();
			final String elementId = helpTextDTO.getElementId();
			final String sequenceNo = helpTextDTO.getSequanceNo();
			final String thumbnailData = helpTextDTO.getThumbnailData();
			
			rownum = getJdbcTemplate().update(query, new PreparedStatementSetter() {
			      public void setValues(PreparedStatement ps) throws SQLException {
			          ps.setString(1, imagePath);
			          ps.setString(2, thumbnailData);
			          ps.setInt(3, Integer.parseInt(elementId));
			          ps.setInt(4, Integer.parseInt(sequenceNo));
			          ps.setInt(5, Integer.parseInt(ssoId));
			          ps.setInt(6, Integer.parseInt(questionId));
			          ps.setInt(7, Integer.parseInt(formId));
			        }
			      });
		
	}
	
	if(rownum > 0){
		updateStatus = imageId+"#Image Path Updated Successfully.";
	} else{
		updateStatus = "Image Path not Updated Successfully.";
	}
	return updateStatus;

}

@Override
public List<ChecklistRecordDTO> getSingleRecordDetail(String recordId, String query) {
	Object[] param = new Object[1];
	param[0] = Integer.parseInt(recordId);
	
	List<ChecklistRecordDTO> detailDtos = new ArrayList<ChecklistRecordDTO>();
	RowMapper<ChecklistRecordDTO> mapper = new  RowMapper<ChecklistRecordDTO>() {
		
		@Override
		public ChecklistRecordDTO mapRow(ResultSet rst, int arg1) throws SQLException {
			ChecklistRecordDTO beanObj = new ChecklistRecordDTO();
			beanObj.setRecordId(rst.getString("record_id"));
			beanObj.setRecordStatus(rst.getString("recordstatus"));
			beanObj.setCreatedBySSO(rst.getString("created_by"));
			beanObj.setCreatedDate(rst.getString("created_date"));
			beanObj.setCreatedByName(rst.getString("created_by_name"));
			beanObj.setModifiedBySSO(rst.getString("updated_by"));
			beanObj.setModifiedDate(rst.getString("updated_date"));
			beanObj.setModifiedByName(rst.getString("modifiedby_name"));
			beanObj.setSyncStatus(rst.getString("syncstatus"));
			beanObj.setProjectId(rst.getString("project_id"));
			beanObj.setProjectName(rst.getString("project_name"));
			beanObj.setTurbineId(rst.getString("turbine_id"));
			beanObj.setVersionNo(rst.getDouble("record_version_no")+"");
			return beanObj;
		}
	};
	
	detailDtos = getJdbcTemplate().query(query, param, mapper);
	
	return detailDtos;
}	

@Override
public String updateImagePathInBulk(ChecklistHelpTextDTO helpTextDTO, String token,	String imageFor, String query) {

	String updateStatus = "";
	int rownum = 0;
	if("Add".equals(token)){
		final String imagePath = helpTextDTO.getImageUrl();
		final String ssoId = helpTextDTO.getUserSSOId();
		final String questionId = helpTextDTO.getQuestionId();
		final String recordId = helpTextDTO.getRecordId();
		final String helpDescription = helpTextDTO.getHelpDescription();
		final String elementId = helpTextDTO.getElementId();
		final String sequenceNo = helpTextDTO.getSequanceNo();
		
		if("RecordImages".equalsIgnoreCase(imageFor)){
		  rownum = getJdbcTemplate().update(query, new PreparedStatementSetter() {
	      public void setValues(PreparedStatement ps) throws SQLException {
	    	  ps.setString(1, imagePath);
	          ps.setString(2, helpDescription);
	          ps.setString(3, "RecordImage");
	          ps.setInt(4, Integer.parseInt(ssoId));
	          ps.setInt(5, Integer.parseInt(questionId));
	    	  ps.setInt(6, Integer.parseInt(recordId));
	          ps.setInt(7, Integer.parseInt(elementId));
	          ps.setInt(8, Integer.parseInt(sequenceNo));
	        }
	      });
		}
		
	} else{
		
		if("RecordImages".equalsIgnoreCase(imageFor)){
			final String imagePath = helpTextDTO.getImageUrl();
			final String ssoId = helpTextDTO.getUserSSOId();
			final String questionId = helpTextDTO.getQuestionId();
			final String helpDescription = helpTextDTO.getHelpDescription();
			final String formId = helpTextDTO.getRecordId();
			final String elementId = helpTextDTO.getElementId();
			final String sequenceNo = helpTextDTO.getSequanceNo();
			
			rownum = getJdbcTemplate().update(query, new PreparedStatementSetter() {
			      public void setValues(PreparedStatement ps) throws SQLException {
			    	  ps.setString(1, imagePath);
			          ps.setString(2, helpDescription);
			          ps.setString(3, "RecordImage");
			          ps.setInt(4, Integer.parseInt(ssoId));
			          ps.setInt(5, Integer.parseInt(questionId));
			    	  ps.setInt(6, Integer.parseInt(formId));
			          ps.setInt(7, Integer.parseInt(elementId));
			          ps.setInt(8, Integer.parseInt(sequenceNo));
			        }
			      });
		}
	}
	
	if(rownum > 0){
		updateStatus = "Image Path Updated Successfully.";
	} else{
		updateStatus = "Image Path not Updated Successfully.";
	}
	return updateStatus;
}

@Override
public String updateRulesImagePathInBulk(ChecklistHelpTextDTO helpTextDTO, String token, String query) {


	String updateStatus = "";
	int rownum = 0;
	if("Add".equals(token)){
		final String imagePath = helpTextDTO.getImageUrl();
		final String ssoId = helpTextDTO.getUserSSOId();
		final String questionId = helpTextDTO.getQuestionId();
		final String helpDescription = helpTextDTO.getHelpDescription();
		final String formId = helpTextDTO.getRecordId();
		final String elementId = helpTextDTO.getElementId();
		final String sequenceNo = helpTextDTO.getSequanceNo();
		
		rownum = getJdbcTemplate().update(query, new PreparedStatementSetter() {
		      public void setValues(PreparedStatement ps) throws SQLException {
		    	  ps.setString(1, imagePath);
		          ps.setString(2, helpDescription);
		          ps.setString(3, "RuleImage");
		          ps.setInt(4, Integer.parseInt(ssoId));
		          ps.setInt(5, Integer.parseInt(questionId));
		    	  ps.setInt(6, Integer.parseInt(formId));
		          ps.setInt(7, Integer.parseInt(elementId));
		          ps.setInt(8, Integer.parseInt(sequenceNo));
		        }
		      });
	} else{
		final String imagePath = helpTextDTO.getImageUrl();
		final String ssoId = helpTextDTO.getUserSSOId();
		final String questionId = helpTextDTO.getQuestionId();
		final String helpDescription = helpTextDTO.getHelpDescription();
		final String formId = helpTextDTO.getRecordId();
		final String elementId = helpTextDTO.getElementId();
		final String sequenceNo = helpTextDTO.getSequanceNo();
		
		rownum = getJdbcTemplate().update(query, new PreparedStatementSetter() {
		      public void setValues(PreparedStatement ps) throws SQLException {
		    	  ps.setString(1, imagePath);
		          ps.setString(2, helpDescription);
		          ps.setString(3, "RuleImage");
		          ps.setInt(4, Integer.parseInt(ssoId));
		          ps.setInt(5, Integer.parseInt(questionId));
		    	  ps.setInt(6, Integer.parseInt(formId));
		          ps.setInt(7, Integer.parseInt(elementId));
		          ps.setInt(8, Integer.parseInt(sequenceNo));
		        }
		      });
		
	}
	
	if(rownum > 0){
		updateStatus = "Image Path Updated Successfully.";
	} else{
		updateStatus = "Image Path not Updated Successfully.";
	}
	return updateStatus;
}

@Override
public List<ChecklistVersionDTO> getChecklistLatestVersion(List<ChecklistVersionDTO> list, String query) {
	List<ChecklistVersionDTO> formsList = new ArrayList<ChecklistVersionDTO>();
	List<ChecklistVersionDTO> detailDtos = null;
	ChecklistVersionDTO tempDto = null;
	Object[] param = new Object[1];
	for(ChecklistVersionDTO dto : list){
		
		String formId = dto.getBaseFormId();
		double versionNo = Double.parseDouble(dto.getVersionNo());
		param[0] = Integer.parseInt(formId);
		tempDto = new ChecklistVersionDTO();
		tempDto.setBaseFormId(formId);
		RowMapper<ChecklistVersionDTO> mapper = new  RowMapper<ChecklistVersionDTO>() {
			
			@Override
			public ChecklistVersionDTO mapRow(ResultSet rst, int arg1) throws SQLException {
				ChecklistVersionDTO beanObj = new ChecklistVersionDTO();
				beanObj.setFormId(rst.getInt("bfd_form_id")+"");
				beanObj.setVersionNo(rst.getDouble("publish_version")+"");
				return beanObj;
			}
		};
		
		detailDtos = getJdbcTemplate().query(query, param, mapper);
		boolean flag = false;
		
		for(ChecklistVersionDTO dto2 : detailDtos){
			double version = Double.parseDouble(dto2.getVersionNo());
			if(versionNo < version){
				versionNo = version;
				tempDto.setVersionNo(String.valueOf(versionNo));
				tempDto.setFormId(dto2.getFormId());
				tempDto.setIsUpdateAvailable("Yes");
				flag = true;
			}
			else{
				tempDto.setVersionNo(String.valueOf(versionNo));
				tempDto.setFormId(dto2.getFormId());
				tempDto.setIsUpdateAvailable("No");
			}
		}
		/*if(!flag){
			tempDto.setVersionNo(String.valueOf(versionNo));
			tempDto.setFormId(dto2.getFormId());
			tempDto.setIsUpdateAvailable("No");
		}*/
		formsList.add(tempDto);
	}
	
	return formsList;
}

@Override
public List<Integer> getGroupIdsBySSOId(String ssoId, String query) {
	List<Integer> detailDtos = new ArrayList<Integer>();
	Object[] param = new Object[1];
	param[0] = ssoId;
	RowMapper<Integer> mapper = new  RowMapper<Integer>() {
		
		@Override
		public Integer mapRow(ResultSet rst, int arg1) throws SQLException {
			Integer groupId = rst.getInt("bi_group_id");
			return groupId;
		}
	};
	detailDtos = getJdbcTemplate().query(query, param, mapper);
	return detailDtos;
}

@Override
public List<ChecklistRecordDTO> getChecklistRecordSyncHistory(ChecklistParamDto paramDto, String query) throws Exception {
	List<ChecklistRecordDTO> detailDtos = new ArrayList<ChecklistRecordDTO>();
	Object[] param = new Object[2];
	param[0] = Integer.parseInt(paramDto.getRecordId());
	param[1] = Double.parseDouble(paramDto.getVersionNo());
	
	RowMapper<ChecklistRecordDTO> mapper = new  RowMapper<ChecklistRecordDTO>() {
		
		@Override
		public ChecklistRecordDTO mapRow(ResultSet rst, int arg1) throws SQLException {
			ChecklistRecordDTO beanObj = new ChecklistRecordDTO();
			beanObj.setRecordId(rst.getString("record_id"));
			beanObj.setRecordStatus(rst.getString("status"));
			beanObj.setCreatedBySSO(rst.getString("created_by"));
			beanObj.setCreatedDate(rst.getString("created_date"));
			beanObj.setModifiedByName(rst.getString("created_by_name"));
			beanObj.setSyncStatus(rst.getString("syncstatus"));			
			beanObj.setProjectName(rst.getString("project_name"));
			beanObj.setTurbineId(rst.getString("turbine_id"));
			beanObj.setVersionNo(rst.getDouble("record_version_no")+"");
			beanObj.setComments(rst.getString("action"));
			beanObj.setSyncStartTime(rst.getString("sync_start_time"));
			beanObj.setSyncEndTime(rst.getString("sync_end_time"));
			return beanObj;
		}
	};
	
	detailDtos = getJdbcTemplate().query(query, param, mapper);
	
	return detailDtos;
}



}
