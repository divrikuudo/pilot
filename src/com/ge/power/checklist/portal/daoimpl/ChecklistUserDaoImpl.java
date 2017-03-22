package com.ge.power.checklist.portal.daoimpl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.aspectj.util.FileUtil;
import org.codehaus.jackson.map.ObjectMapper;
import org.postgresql.util.PGobject;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.transaction.PlatformTransactionManager;

import com.ge.power.checklist.mobile.dto.ChecklistDetailDto;
import com.ge.power.checklist.mobile.dto.ChecklistRecordDTO;
import com.ge.power.checklist.mobile.dto.EDSRDetailDTO;
import com.ge.power.checklist.portal.dao.ChecklistUserDao;
import com.ge.power.checklist.portal.dto.AddAction;
import com.ge.power.checklist.portal.dto.BusinessHierarchyDto;
import com.ge.power.checklist.portal.dto.ChecklistComponentDto;
import com.ge.power.checklist.portal.dto.ChecklistFormDto;
import com.ge.power.checklist.portal.dto.ChecklistPortalDto;
import com.ge.power.checklist.portal.dto.ChecklistValidationRuleDTO;
import com.ge.power.checklist.portal.dto.Element;
import com.ge.power.checklist.portal.dto.ElementArributuesProp;
import com.ge.power.checklist.portal.dto.FormFilterSection;
import com.ge.power.checklist.portal.dto.IdDetails;
import com.ge.power.checklist.portal.dto.ImageDTO;
import com.ge.power.checklist.portal.dto.Images;
import com.ge.power.checklist.portal.dto.PortalUserDetailDTO;
import com.ge.power.checklist.portal.dto.QuestionAnswerElement;
import com.ge.power.checklist.portal.dto.QuestionAnswerElements;
import com.ge.power.checklist.portal.dto.RecordDTO;
import com.ge.power.checklist.portal.dto.Rule;
import com.ge.power.checklist.portal.dto.SearchQuestDetails;
import com.ge.power.checklist.portal.dto.SearchRecordComment;
import com.ge.power.checklist.portal.dto.SearchRecordDTO;
import com.ge.power.checklist.portal.dto.SearchSectionDetails;
import com.ge.power.checklist.portal.dto.SearchStepDetails;
import com.ge.power.checklist.portal.dto.SectionElement;
import com.ge.power.checklist.portal.dto.SectionElements;
import com.ge.power.checklist.portal.dto.StepElement;
import com.ge.power.checklist.portal.dto.StepElements;
import com.ge.power.checklist.portal.util.PropertyFileReader;

public class ChecklistUserDaoImpl implements ChecklistUserDao {

	static final Logger LOGGER = Logger.getLogger(ChecklistUserDaoImpl.class);

	private JdbcTemplate jdbcTemplate;
	private String result = "";

	static final ResourceBundle BUNDLE = ResourceBundle
			.getBundle("com.ge.power.checklist.resources.config");

	// Transaction roll back start
	private DataSource dataSource;
	private SimpleJdbcCall jdbcCall;
	private PlatformTransactionManager transactionManager;

	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
		this.jdbcTemplate = new JdbcTemplate(dataSource);
		this.jdbcCall = new SimpleJdbcCall(dataSource).withProcedureName("");
	}

	public DataSource getDataSource() {
		return dataSource;
		// this.jdbcTemplate = new JdbcTemplate(dataSource);
	}

	public void setTransactionManager(
			PlatformTransactionManager transactionManager) {
		this.transactionManager = transactionManager;
	}

	public PlatformTransactionManager getTransactionManager() {
		return transactionManager;

	}

	// Transaction roll back end

	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	@Override
	public List<PortalUserDetailDTO> getUserRoleAndPermission(String ssoId,
			String query) {
		List<PortalUserDetailDTO> detailDtos = new ArrayList<PortalUserDetailDTO>();
		Object[] param = new Object[1];
		param[0] = ssoId;

		RowMapper<PortalUserDetailDTO> mapper = new RowMapper<PortalUserDetailDTO>() {

			@Override
			public PortalUserDetailDTO mapRow(ResultSet rst, int arg1)
					throws SQLException {
				PortalUserDetailDTO beanObj = new PortalUserDetailDTO();
				beanObj.setLastName(rst.getString("bi_user_lname"));
				beanObj.setFirstName(rst.getString("bi_user_fname"));
				beanObj.setSsoId(rst.getString("bi_user_sso"));
				beanObj.setRoleName(rst.getString("role_name"));
				beanObj.setIsAdminPortalUser(rst.getString("isadminportaluser"));
				return beanObj;
			}
		};
		detailDtos = getJdbcTemplate().query(query, param, mapper);

		return detailDtos;
	}

	@Override
	public List<ChecklistComponentDto> checklistComponent(String query) {
		List<ChecklistComponentDto> componentDto = new ArrayList<ChecklistComponentDto>();
		Object[] param = new Object[0];
		// param[0] = "";

		RowMapper<ChecklistComponentDto> mapper = new RowMapper<ChecklistComponentDto>() {

			@Override
			public ChecklistComponentDto mapRow(ResultSet rs, int arg1)
					throws SQLException {
				ChecklistComponentDto beanObj = new ChecklistComponentDto();
				beanObj.setElementId(rs.getString("bftm_element_id"));
				beanObj.setElementName(rs.getString("bftm_element_name"));
				beanObj.setElementType(rs.getString("bftm_element_type"));
				beanObj.setElementValue(rs
						.getString("bftm_element_default_value"));
				beanObj.setIconName(rs.getString("bftm_icon_name"));
				beanObj.setIconImage(rs.getString("bftm_icon_base64"));

				return beanObj;
			}
		};
		componentDto = getJdbcTemplate().query(query, param, mapper);

		return componentDto;
	}

	@Override
	public List<ChecklistPortalDto> loadChecklist(String ssoId,
			String roleName, String recordCount, String pageLimit,
			String query, String query1) {
		List<ChecklistPortalDto> loadchecklistDto = new ArrayList<ChecklistPortalDto>();
		final Object[] param = new Object[2];
		String rowNum = "";
		param[0] = ssoId;
		param[1] = roleName;
		// param[2] = pageLimit;
		// param[3] = recordCount;

		RowMapper<ChecklistPortalDto> mapper = new RowMapper<ChecklistPortalDto>() {

			@Override
			public ChecklistPortalDto mapRow(ResultSet rs, int arg1)
					throws SQLException {
				List<ChecklistPortalDto> loadchecklistDto = new ArrayList<ChecklistPortalDto>();
				ChecklistPortalDto beanObj = new ChecklistPortalDto();

				for (@SuppressWarnings("unused")
				Object listobj : param) {
					beanObj.setFormId(rs.getString("bfd_form_id"));
					beanObj.setFormName(rs.getString("bfd_name"));
					beanObj.setFormLanguage(rs.getString("bfrm_language_name"));
					beanObj.setAuthorname(rs.getString("author_name"));
					beanObj.setFormStatus(rs.getString("form_status"));
					beanObj.setDraftVersion(rs.getString("draft_version"));
					beanObj.setPublishVersion(rs.getString("publish_version"));
					beanObj.setCreateDate(rs.getString("created_date"));
					beanObj.setFunctionName(rs.getString("bi_business_name"));
					beanObj.setRownum(rs.getString("rownum"));
					//LOGGER.info("*********rownum**********"+ rs.getString("rownum"));
				}
				loadchecklistDto.add(beanObj);
				//LOGGER.info("*******************"+ loadchecklistDto.add(beanObj));

				return beanObj;
			}
		};

		if (pageLimit != null && Integer.parseInt(pageLimit) != 0) {
			rowNum = "ckschema.rowCount(" + ssoId + ") AS rownum ";

			query = query + rowNum + query1 + " LIMIT " + pageLimit
					+ " offset " + recordCount + ";";
			//LOGGER.info("load checklist query value is ---------" + query);
		}
		//LOGGER.info("load checklist query value is ---------" + query);
		loadchecklistDto = getJdbcTemplate().query(query, param, mapper);

		return loadchecklistDto;
	}

	@Override
	public List<ChecklistPortalDto> pagenationChecklist(String ssoId,
			String roleName, String query) {

		List<ChecklistPortalDto> pagelistDto = new ArrayList<ChecklistPortalDto>();
		final Object[] param = new Object[2];
		param[0] = ssoId;
		param[1] = roleName;
		// param[2] = pageLimit;
		// param[3] = recordCount;

		RowMapper<ChecklistPortalDto> mapper = new RowMapper<ChecklistPortalDto>() {

			@Override
			public ChecklistPortalDto mapRow(ResultSet rs, int arg1)
					throws SQLException {
				List<ChecklistPortalDto> pagelistDto = new ArrayList<ChecklistPortalDto>();
				ChecklistPortalDto beanObj = new ChecklistPortalDto();

				for (@SuppressWarnings("unused")
				Object listobj : param) {
					beanObj.setFormId(rs.getString("bfd_form_id"));
					beanObj.setFormName(rs.getString("bfd_name"));
					beanObj.setFormLanguage(rs.getString("bfrm_language_name"));
					beanObj.setAuthorname(rs.getString("author_name"));
					beanObj.setFormStatus(rs.getString("form_status"));
					beanObj.setDraftVersion(rs.getString("draft_version"));
					beanObj.setPublishVersion(rs.getString("publish_version"));
					beanObj.setCreateDate(rs.getString("created_date"));
					beanObj.setFunctionName(rs.getString("bi_bus_group_name"));
				}
				pagelistDto.add(beanObj);
				//LOGGER.info("*******************" + pagelistDto.add(beanObj));

				return beanObj;
			}
		};
		/*
		 * if(pageLimit!=null && Integer.parseInt(pageLimit) != 0){
		 * rowNum="ckschema.rowCount("+ssoId+") AS rownum ";
		 * 
		 * query = query+ rowNum +
		 * query1+" LIMIT "+pageLimit+" offset "+recordCount+";";
		 * LOGGER.info("load checklist query value is ---------" + query); }
		 */
		//LOGGER.info("page checklist query value is ---------" + query);
		pagelistDto = getJdbcTemplate().query(query, param, mapper);

		return pagelistDto;
	}

	@Override
	public List<ChecklistPortalDto> deleteChecklist(final String formId, final HashMap<String, Object> genericObj) {
		List<ChecklistPortalDto> deletechecklistDto = new ArrayList<ChecklistPortalDto>();
		try {
			final Object[] param = new Object[2];
			param[0] = Integer.parseInt(formId);
			param[1] = genericObj.get("languageName").toString();
			RowCallbackHandler rch = new RowCallbackHandler() {
				
				@Override
				public void processRow(ResultSet res) throws SQLException {
					result = res.getString(1);					
				}
			};
			
			getJdbcTemplate().query(genericObj.get("deleteMetadataQuery").toString(), param, rch);
			ChecklistPortalDto dto = new ChecklistPortalDto();
			dto.setFormId(result);
			deletechecklistDto.add(dto);
			
			
			/*List<SqlParameter> declaredParameters = new ArrayList<SqlParameter>();

			declaredParameters.add(new SqlOutParameter("temp_form_lang_id", Types.INTEGER));
			declaredParameters.add(new SqlParameter("form_id", Types.INTEGER));
			declaredParameters.add(new SqlParameter("lang_name", Types.VARCHAR));

			getJdbcTemplate().call(new CallableStatementCreator() {
				
				@Override
			    public CallableStatement createCallableStatement(Connection con) throws SQLException {
			        CallableStatement stmnt = con.prepareCall(genericObj.get("deleteMetadataQuery").toString());

			        stmnt.setInt(1, Integer.parseInt(formId));
			        stmnt.setString(2, genericObj.get("languageName").toString());
			        stmnt.registerOutParameter(3, Types.INTEGER);

			        return stmnt;
			    }
			}, declaredParameters);*/
			
			
			
			
		} catch (Exception objex) {
			LOGGER.info("Error in creating record, rolling back");
			LOGGER.info(objex.getMessage());
		}
		return deletechecklistDto;
	}

	@Override
	public List<BusinessHierarchyDto> businessHierarchyDetail(String ssoId,
			String roleName, String query) {
		List<BusinessHierarchyDto> detailDtos = new ArrayList<BusinessHierarchyDto>();
		final Object[] param = new Object[1];
		param[0] = ssoId;

		RowMapper<BusinessHierarchyDto> mapper = new RowMapper<BusinessHierarchyDto>() {

			@Override
			public BusinessHierarchyDto mapRow(ResultSet rst, int arg1)
					throws SQLException {
				// List<BusinessHierarchyDto> detailDtos = new
				// ArrayList<BusinessHierarchyDto>();
				BusinessHierarchyDto beanObj = new BusinessHierarchyDto();

				// for(@SuppressWarnings("unused") Object listobj:param ){
				beanObj.setFunctionId(rst.getString("bi_group_id"));
				beanObj.setFunctionName(rst.getString("bi_bus_group_name"));
				beanObj.setGroupParentId(rst
						.getString("bi_bus_group_parent_id"));
				// }
				// detailDtos.add(beanObj);
				return beanObj;
			}
		};

		detailDtos = getJdbcTemplate().query(query, param, mapper);
		return detailDtos;
	}

	@Override
	public List<ChecklistPortalDto> searchChecklistForm(String ssoId,
			String roleName, String checklistName, String query, final String checklistTitle) {
		List<ChecklistPortalDto> searchlistDto = new ArrayList<ChecklistPortalDto>();
		
		String chkName = "";
		if ("Version".equals(checklistTitle)) {
			if ("0".equals(checklistName.substring(0,1)) 
					|| checklistName.contains("d")
					|| ".".equals(checklistName)) {
				chkName = "%" + checklistName + "%";
			} else {
				chkName =  checklistName;
			}
		} else {
			chkName = "%" + checklistName + "%";
		}
		
		final Object[] param = new Object[3];
		param[0] = ssoId;
		param[1] = roleName;
		param[2] = chkName;

		RowMapper<ChecklistPortalDto> mapper = new RowMapper<ChecklistPortalDto>() {

			@Override
			public ChecklistPortalDto mapRow(ResultSet rs, int arg1)
					throws SQLException {
				List<ChecklistPortalDto> pagelistDto = new ArrayList<ChecklistPortalDto>();
				ChecklistPortalDto beanObj = new ChecklistPortalDto();

				for (@SuppressWarnings("unused")
				Object listobj : param) {
					beanObj.setFormName(rs.getString("bfd_name"));
					beanObj.setFormLanguage(rs.getString("bfrm_language_name"));
					beanObj.setAuthorname(rs.getString("author_name"));
					beanObj.setFormStatus(rs.getString("form_status"));
					beanObj.setCreateDate(rs.getString("created_date"));
					beanObj.setFunctionName(rs.getString("bi_bus_group_name"));
					beanObj.setFormId(rs.getString("bfd_form_id"));
					//if ("Version".equals(checklistTitle)) {
					//	beanObj.setDraftVersion(rs.getString("from_version"));
					//} else {
						beanObj.setDraftVersion(rs.getString("draft_version"));
						beanObj.setPublishVersion(rs.getString("publish_version"));
					//}
				}
				pagelistDto.add(beanObj);
				return beanObj;
			}
		};
		
		searchlistDto = getJdbcTemplate().query(query, param, mapper);
		return searchlistDto;
	}

	@Override
	public List<BusinessHierarchyDto> subFunctionChecklist(String groupId, String query) {
		List<BusinessHierarchyDto> detailDtos = new ArrayList<BusinessHierarchyDto>();
		final Object[] param = new Object[1];
		// param[0] = ssoId;
		// param[1] = roleName;
		param[0] = groupId;

		RowMapper<BusinessHierarchyDto> mapper = new RowMapper<BusinessHierarchyDto>() {

			@Override
			public BusinessHierarchyDto mapRow(ResultSet rs, int arg1)
					throws SQLException {
				List<BusinessHierarchyDto> detailDtos = new ArrayList<BusinessHierarchyDto>();
				BusinessHierarchyDto beanObj = new BusinessHierarchyDto();

				for (@SuppressWarnings("unused")
				Object listobj : param) {
					beanObj.setSubFunctionId(rs.getString("bi_group_id"));
					//LOGGER.info("" + rs.getString("bi_group_id"));
					beanObj.setSubFunctionName(rs
							.getString("bi_bus_group_name"));
					//LOGGER.info("" + rs.getString("bi_bus_group_name"));
				}
				detailDtos.add(beanObj);
				return beanObj;
			}
		};
		//LOGGER.info("+++++++++++++++" + query);
		detailDtos = getJdbcTemplate().query(query, param, mapper);

		return detailDtos;

	}
	
	@Override
	public List<BusinessHierarchyDto> subFunctionChecklist(String groupId, String ssoId, String query) {
		List<BusinessHierarchyDto> detailDtos = new ArrayList<BusinessHierarchyDto>();
		final Object[] param = new Object[2];
		// param[0] = ssoId;
		// param[1] = roleName;
		param[0] = groupId;
		param[1] = ssoId;

		RowMapper<BusinessHierarchyDto> mapper = new RowMapper<BusinessHierarchyDto>() {

			@Override
			public BusinessHierarchyDto mapRow(ResultSet rs, int arg1)
					throws SQLException {
				List<BusinessHierarchyDto> detailDtos = new ArrayList<BusinessHierarchyDto>();
				BusinessHierarchyDto beanObj = new BusinessHierarchyDto();

				for (@SuppressWarnings("unused")
				Object listobj : param) {
					beanObj.setSubFunctionId(rs.getString("bi_group_id"));
					//LOGGER.info("" + rs.getString("bi_group_id"));
					beanObj.setSubFunctionName(rs
							.getString("bi_bus_group_name"));
					//LOGGER.info("" + rs.getString("bi_bus_group_name"));
				}
				detailDtos.add(beanObj);
				return beanObj;
			}
		};
		//LOGGER.info("+++++++++++++++" + query);
		detailDtos = getJdbcTemplate().query(query, param, mapper);

		return detailDtos;

	}

	@Override
	public List<ChecklistValidationRuleDTO> getValidationRuleList(
			String elementId, String query) {
		List<ChecklistValidationRuleDTO> detailDtos = new ArrayList<ChecklistValidationRuleDTO>();
		/*
		 * Object[] param = new Object[1]; param[0] =
		 * Integer.parseInt(elementId);
		 */
		RowMapper<ChecklistValidationRuleDTO> mapper = new RowMapper<ChecklistValidationRuleDTO>() {
			@Override
			public ChecklistValidationRuleDTO mapRow(ResultSet rst, int arg1)
					throws SQLException {
				ChecklistValidationRuleDTO beanObj = new ChecklistValidationRuleDTO();
				beanObj.setRuleId(rst.getString("bfrm_rule_id"));
				beanObj.setRuleName(rst.getString("bfrm_rule_name"));
				beanObj.setRuleDescription(rst
						.getString("bfrm_rule_description"));
				beanObj.setRuleCategory(rst.getString("bfrm_rule_category"));
				beanObj.setRuleFormula(rst.getString("rule_formula"));
				return beanObj;
			}
		};
		detailDtos = getJdbcTemplate().query(query, mapper);

		return detailDtos;
	}

	@Override
	public List<ElementArributuesProp> getPropertiesList(String elementId,
			String query) {

		List<ElementArributuesProp> detailDtos = new ArrayList<ElementArributuesProp>();
		Object[] param = new Object[1];
		param[0] = Integer.parseInt(elementId);

		RowMapper<ElementArributuesProp> mapper = new RowMapper<ElementArributuesProp>() {

			@Override
			public ElementArributuesProp mapRow(ResultSet rst, int arg1)
					throws SQLException {
				ElementArributuesProp beanObj = new ElementArributuesProp();
				beanObj.setAttributeId(rst.getString("bftm_attrib_id"));
				beanObj.setAttributeName(rst.getString("bftm_attrib_name"));
				beanObj.setIsMendatory(rst
						.getString("bftm_attrib_is_mandatory"));
				beanObj.setDefaultValue(rst.getString("bftm_attrib_def_value"));
				return beanObj;
			}
		};
		detailDtos = getJdbcTemplate().query(query, param, mapper);

		return detailDtos;
	}

	/*
	 * public Date createDate(ChecklistFormDto jsonObject, HashMap<String,
	 * Object> genericObj){ DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	 * Date createdate=null; //HashMap<String, Object> genericObj=null; try{
	 * genericObj = new HashMap<String, Object>(); Date createDate = (Date)
	 * df.parse(jsonObject.getCreatedDate());
	 * LOGGER.info("createDate---------"+createDate);
	 * genericObj.put("createDate", createDate); }catch(Exception e){
	 * e.printStackTrace(); } return createdate;
	 * 
	 * }
	 */

	@Override
	public Map<String, Object> saveMetadata(ChecklistFormDto jsonObject, String imagePath) throws Exception {

		try {
						
			RowCallbackHandler rch = new RowCallbackHandler() {
				
				@Override
				public void processRow(ResultSet res) throws SQLException {
					result = res.getString(1);					
				}
			};
			
			String seqQuery = "select nextval('ckschema.checklist_jsontable_id_seq'::regclass)";
			getJdbcTemplate().query(seqQuery, rch);
						
			Object[] param = new Object[2];
			ObjectMapper mapper = new ObjectMapper();
			String jsonString = mapper.writeValueAsString(jsonObject);
			jsonString = jsonString.replaceAll("\"rule\":null", "\"rule\":[{}]");
			jsonString = jsonString.replaceAll("\"rule\":\\[\\]", "\"rule\":[{}]");
			jsonString = jsonString.replaceAll("\"elementArributuesProp\":null", "\"elementArributuesProp\":[{}]");
			jsonString = jsonString.replaceAll("\"elementArributuesProp\":\\[\\]", "\"elementArributuesProp\":[{}]");
						
			PGobject pg = new PGobject();
			pg.setType("json");
			pg.setValue(jsonString);
			param[0] = new Integer(result);
			param[1] = pg;
			
			getJdbcTemplate().update("insert into ckschema.tbl (tbl_id, j) values(?, ?)", param);
			
			int res = Integer.parseInt(result);
			String sql = "select ckschema.save_meta_data_test19("+res+")";
			getJdbcTemplate().query(sql, rch);
			ChecklistFormDto dto = new ChecklistFormDto();
			dto.setFormId(result);
			//Map<String, Object> results = listofIds(result);
			Map<String, Object> results = new HashMap<String, Object>();
			saveImages(jsonObject, result);
			results.put("result", dto);
			return results;
			
		} catch (Exception objex) {
			//objex.printStackTrace();
			LOGGER.info("Error in creating record, rolling back");
			LOGGER.info(objex.getMessage());
			throw new Exception("error on insert of form metadata");
		}
	}

	private void saveImages(ChecklistFormDto jsonObject, String formId) throws Exception {
		
		if (jsonObject.getBaseFormId() != null) {
			
			String formTempId = jsonObject.getTempFormId();			
			insertHelpImages(fecthFormLevelImages(formId, formTempId, "Form"));
			updateHelpImageSection(jsonObject, formId, formTempId);
			updateHelpImagePath(jsonObject, formId, formTempId);
			updateHelpImageDesc(jsonObject, formId, formTempId);
		} else {
			
			String formTempId = jsonObject.getTempFormId();
			updateHelpImageFormId(formId, formTempId);
			updateHelpImageSection(jsonObject, formId, formTempId);
			updateHelpImagePath(jsonObject, formId, formTempId);
			updateHelpImageDesc(jsonObject, formId, formTempId);
		}
	}
	
	private List<ImageDTO> fecthFormLevelImages(final String formId, String formTempId, String level) {
		
		String queryString = "SELECT help_img_url, help_text_level, help_img_thumbnail, created_by, updated_by from ckschema.checklist_help_image_details where help_text_level=? and bfs_form_lang_id=?";
		Object[] param = new Object[2];
		param[0] = level;
		param[1] = new Long(formTempId);
		List<ImageDTO> dtos = new ArrayList<ImageDTO>();
		
		RowMapper<ImageDTO> mapper = new  RowMapper<ImageDTO>() {
			
			@Override
			public ImageDTO mapRow(ResultSet rst, int arg1) throws SQLException {	
				
				ImageDTO dto = new ImageDTO();
				dto.setHelpImageUrl(rst.getString(1));
				dto.setHelpTextLevel(rst.getString(2));
				dto.setThumbnailData(rst.getString(3));
				dto.setUserSSOId(rst.getString(4));
				dto.setFormStatus(rst.getString(5));
				dto.setFormId(formId);
				dto.setAssociationId(formId);
				return dto;
			}
		};
		
		dtos = getJdbcTemplate().query(queryString, param, mapper);
		return dtos;
	}
	
	private List<ImageDTO> fecthSectionLevelImages(final String formId, String formTempId, String level, String associationId, final String origId) {
		
		String queryString = "SELECT help_img_url, help_text_level, help_img_thumbnail, created_by, updated_by,help_img_id from ckschema.checklist_help_image_details where help_text_level=? and bfs_form_lang_id=? and association_id=?";
		String deleteQuery = "delete from ckschema.checklist_help_image_details where help_img_id=?";
		Object[] param = new Object[3];
		param[0] = level;
		param[1] = new Long(formTempId);		
		param[2] = new Long(associationId);
		List<ImageDTO> dtos = new ArrayList<ImageDTO>();
		
		RowMapper<ImageDTO> mapper = new  RowMapper<ImageDTO>() {
			
			@Override
			public ImageDTO mapRow(ResultSet rst, int arg1) throws SQLException {	
				
				ImageDTO dto = new ImageDTO();
				dto.setHelpImageUrl(rst.getString(1));
				dto.setHelpTextLevel(rst.getString(2));
				dto.setThumbnailData(rst.getString(3));
				dto.setUserSSOId(rst.getString(4));
				dto.setFormStatus(rst.getString(5));
				dto.setImageId(rst.getString(6));
				dto.setFormId(formId);
				dto.setAssociationId(origId);
				return dto;
			}
		};
		
		dtos = getJdbcTemplate().query(queryString, param, mapper);
		for (ImageDTO imageDTO : dtos) {
			
			if ("add".equals(imageDTO.getFormStatus())) {
				
				Object[] par = new Object[1];
				par[0] = new Integer(imageDTO.getImageId());
				getJdbcTemplate().update(deleteQuery, par);
			}
		}
		return dtos;
	}

	private String fecthSectionLevelDesc(String formId, String formTempId, String level, String associationId) {
		
		String queryString = "SELECT help_desc from ckschema.checklist_help_text_details_1 where help_text_level=? and bfs_form_lang_id=? and association_id=?";
		Object[] param = new Object[3];
		param[0] = level;
		param[1] = new Long(formTempId);	
		param[2] = new Long(associationId);
		List<String> dtos = new ArrayList<String>();
		
		RowMapper<String> mapper = new  RowMapper<String>() {
			
			@Override
			public String mapRow(ResultSet rst, int arg1) throws SQLException {				
				return rst.getString(1);
			}
		};
		
		dtos = getJdbcTemplate().query(queryString, param, mapper);
		
		if (dtos.size() > 0) return dtos.get(0);
		return null;
	}
	
	private String fecthSectionLevelDesc_1(String formId, String formTempId, String level, String associationId) {
		
		String queryString = "SELECT help_desc,updated_by from ckschema.checklist_help_text_details_1 where help_text_level=? and bfs_form_lang_id=? and association_id=?";
		Object[] param = new Object[3];
		param[0] = level;
		param[1] = new Long(formTempId);	
		param[2] = new Long(associationId);
		List<String> dtos = new ArrayList<String>();
		
		RowMapper<String> mapper = new  RowMapper<String>() {
			
			@Override
			public String mapRow(ResultSet rst, int arg1) throws SQLException {		
				
				String s1 = rst.getString(2);
				if (s1 != null) {
					return s1;
				}
				return rst.getString(1);
			}
		};
		
		dtos = getJdbcTemplate().query(queryString, param, mapper);
		
		if (dtos.size() > 0) return dtos.get(0);
		return null;
	}
	
	private void updateHelpImageDesc(ChecklistFormDto jsonObject, String formId, String formTempId) {
		
		String queryString = "update ckschema.checklist_help_text_details_1 set bfs_form_lang_id=?,association_id=? where bfs_form_lang_id=? and association_id=? and help_text_level='Form'";
		
		if (jsonObject.getBaseFormId() != null) {
			
			String desc = fecthSectionLevelDesc(formId, formTempId, "Form", formTempId);
			ImageDTO dto = new ImageDTO();
			dto.setFormId(formId);
			dto.setAssociationId(formTempId);
			dto.setHelpTextLevel("Form");
			dto.setUserSSOId(jsonObject.getSubmittedBy());
			insertHelpDesc(dto, desc);
		} else {
			
			Object[] param = new Object[4];
			param[0] = new Long(formId);
			param[1] = new Long(formId);
			param[2] = new Long(formTempId);
			param[3] = new Long(formTempId);
			getJdbcTemplate().update(queryString, param);
		}
	}
	
	private void updateHelpImagePath(ChecklistFormDto jsonObject, String formId, String formTempId) throws Exception {
		
		String imagePath = BUNDLE.getString("imagePath");
		File oldFile = new File(imagePath + "/" + formTempId);
		if (jsonObject.getBaseFormId() != null) {

			if (oldFile.isDirectory() && oldFile.exists()) {
				
				File newFile = new File(imagePath + "/" + formId);				
				FileUtil.copyDir(oldFile, newFile);
			}

			oldFile = new File(imagePath + "/" + formTempId + "/image");
			if (oldFile.isDirectory() && oldFile.exists()) {
				
				File newFile = new File(imagePath + "/" + formId);
				FileUtil.copyDir(oldFile, newFile);
				oldFile.deleteOnExit();
			}
		} else {
			if (oldFile.isDirectory() && oldFile.exists()) {
				
				File newFile = new File(imagePath + "/" + formId);
				oldFile.renameTo(newFile);
			}
		}
		  		
		String query = "update ckschema.checklist_help_image_details set help_img_url=replace(help_img_url, 'data/'||?||'/', 'data/'||bfs_form_lang_id||'/') where bfs_form_lang_id=?";
		Object[] param = new Object[2];
		param[0] = formTempId;
		param[1] = new Long(formId);
		getJdbcTemplate().update(query, param);
	}
	
	private void updateHelpImageFormId(String formId, String formTempId) {
		
		String queryString = "update ckschema.checklist_help_image_details set bfs_form_lang_id=?,association_id=? where help_text_level='Form' and bfs_form_lang_id=?";
		Object[] param = new Object[3];
		param[0] = new Long(formId);
		param[1] = new Long(formId);
		param[2] = new Long(formTempId);
		getJdbcTemplate().update(queryString, param);
	}
	
	private void insertHelpImages(List<ImageDTO> imageDTOs) {
		
		String queryString = "INSERT INTO ckschema.checklist_help_image_details(bfs_form_lang_id, association_id, help_img_url, help_text_level, help_img_thumbnail, created_by,  created_date) VALUES (?, ?, ?, ?, ?, ?, now())";
		
		for (ImageDTO imageDTO : imageDTOs) {
			
			Object[] param = new Object[6];
			param[0] = new Long(imageDTO.getFormId());
			param[1] = new Long(imageDTO.getAssociationId());
			param[2] = imageDTO.getHelpImageUrl();
			param[3] = imageDTO.getHelpTextLevel();
			param[4] = imageDTO.getThumbnailData();
			param[5] = imageDTO.getUserSSOId();
			if (!"delete".equals(imageDTO.getFormStatus())) {
				getJdbcTemplate().update(queryString, param);
			}
		}
	}
	
	private void updateHelpImageSection(ChecklistFormDto jsonObject, String formId, String formTempId) {
		
		String queryString = "update ckschema.checklist_help_image_details set bfs_form_lang_id=?,association_id=? where help_text_level='Section' and bfs_form_lang_id=? and association_id=?";
		String queryString1 = "update ckschema.checklist_help_text_details_1 set bfs_form_lang_id=?,association_id=? where help_text_level='Section' and bfs_form_lang_id=? and association_id=?";
		List<IdDetails> ids = new ArrayList<IdDetails>();
		ids = getIds(formId, "sectionID");
		
		List<SectionElements> list = jsonObject.getSectionElements();
		for (SectionElements sectionElements : list) {
			
			List<SectionElement> elements = sectionElements.getSectionElement();
			
			for (SectionElement sectionElement : elements) {
				
				//TransactionDefinition def = new DefaultTransactionDefinition();
				//TransactionStatus status = transactionManager.getTransaction(def);
				for (IdDetails idDetails : ids) {
					
					if (sectionElement.getSectionTempId() != null) {
						if (idDetails.getAssociationId().equals(sectionElement.getSectionTempId())) {
							
							if (jsonObject.getBaseFormId() != null) {
								List<ImageDTO> dtos = fecthSectionLevelImages(formId, formTempId, "Section", sectionElement.getSectionTempId(), idDetails.getPrimaryId());
								insertHelpImages(dtos);
								String desc = fecthSectionLevelDesc_1(formId, formTempId, "Section", sectionElement.getSectionTempId());
								if (desc != null) {
									if (dtos.size() > 0) insertHelpDesc(dtos.get(0), desc);									
								}
							} else {
							
								Object[] param = new Object[4];
								param[0] = new Long(formId);
								param[1] = new Long(idDetails.getPrimaryId());
								param[2] = new Long(formTempId);
								param[3] = new Long(sectionElement.getSectionTempId());
								getJdbcTemplate().update(queryString, param);
								getJdbcTemplate().update(queryString1, param);
							}
						}
					}
				}
				updateHelpImageStep(jsonObject, formId, formTempId, sectionElement.getStepElements());				
				//transactionManager.commit(status);							
			}
		}
	}
	
	private void insertHelpDesc(ImageDTO imageDTO, String desc) {
		
		String queryString = "INSERT INTO ckschema.checklist_help_text_details_1(bfs_form_lang_id, help_desc, help_text_level, association_id, created_by, created_date) VALUES(?, ?, ?, ?, ?, now())";
		
		Object[] param = new Object[5];
		param[0] = new Long(imageDTO.getFormId());
		param[1] = desc;
		param[2] = imageDTO.getHelpTextLevel();
		if ("Form".equals(imageDTO.getHelpTextLevel())) {
			param[3] = new Long(imageDTO.getFormId());			
		} else {
			param[3] = new Long(imageDTO.getAssociationId());
		}
		param[4] = imageDTO.getUserSSOId();
		getJdbcTemplate().update(queryString, param);
	}

	private void updateHelpImageStep(ChecklistFormDto jsonObject, String formId, String formTempId, List<StepElements> steps) {
		
		String queryString = "update ckschema.checklist_help_image_details set bfs_form_lang_id=?,association_id=? where help_text_level='Step' and bfs_form_lang_id=? and association_id=?";
		String queryString1 = "update ckschema.checklist_help_text_details_1 set bfs_form_lang_id=?,association_id=? where help_text_level='Step' and bfs_form_lang_id=? and association_id=?";
		
		List<IdDetails> ids = new ArrayList<IdDetails>();
		ids = getIds(formId, "stepID");
		
		for (StepElements stepElements : steps) {
			
			List<StepElement> elements = stepElements.getStepElement();
			
			for (StepElement stepElement : elements) {
				
				for (IdDetails idDetails : ids) {
					
					if (stepElement.getStepTempId() != null) {
						if (idDetails.getAssociationId().equals(stepElement.getStepTempId())) {
							
							if (jsonObject.getBaseFormId() != null) {
								List<ImageDTO> dtos = fecthSectionLevelImages(formId, formTempId, "Step", stepElement.getStepTempId(), idDetails.getPrimaryId());
								insertHelpImages(dtos);
								String desc = fecthSectionLevelDesc_1(formId, formTempId, "Step", stepElement.getStepTempId());
								if (desc != null) {
									if (dtos.size() > 0) insertHelpDesc(dtos.get(0), desc);									
								}

							} else {

								Object[] param = new Object[4];
								param[0] = new Long(formId);
								param[1] = new Long(idDetails.getPrimaryId());
								param[2] = new Long(formTempId);
								param[3] = new Long(stepElement.getStepTempId());
								getJdbcTemplate().update(queryString, param);
								getJdbcTemplate().update(queryString1, param);
							}
						}
					}
				}
				updateHelpImageques(jsonObject, formId, formTempId, stepElement.getQuestionAnswerElements());				
			}
		}
	}
	
	private void updateHelpImageques(ChecklistFormDto jsonObject, String formId, String formTempId, List<QuestionAnswerElements> ques) {
		
		String queryString = "update ckschema.checklist_help_image_details set bfs_form_lang_id=?,association_id=? where help_text_level='Question' and bfs_form_lang_id=? and association_id=?";
		String queryString1 = "update ckschema.checklist_help_text_details_1 set bfs_form_lang_id=?,association_id=? where help_text_level='Question' and bfs_form_lang_id=? and association_id=?";
		
		List<IdDetails> ids = new ArrayList<IdDetails>();
		ids = getIds(formId, "questionID");
		
		for (QuestionAnswerElements quesElements : ques) {
			
			List<QuestionAnswerElement> elements = quesElements.getQuestionAnswerElement();
			
			for (QuestionAnswerElement quesElement : elements) {
				
				for (IdDetails idDetails : ids) {
					
					if (quesElement.getQuesAssocId() != null) {
						if (idDetails.getAssociationId().equals(quesElement.getQuesAssocId())) {
							
							if (jsonObject.getBaseFormId() != null) {
								List<ImageDTO> dtos = fecthSectionLevelImages(formId, formTempId, "Question", quesElement.getQuesAssocId(), idDetails.getPrimaryId());
								insertHelpImages(dtos);
								String desc = fecthSectionLevelDesc_1(formId, formTempId, "Question", quesElement.getQuesAssocId());
								if (desc != null) {
									if (dtos.size() > 0) insertHelpDesc(dtos.get(0), desc);									
								}

							} else {
								Object[] param = new Object[4];
								param[0] = new Long(formId);
								param[1] = new Long(idDetails.getPrimaryId());
								param[2] = new Long(formTempId);
								param[3] = new Long(quesElement.getQuesAssocId());
								getJdbcTemplate().update(queryString, param);		
								getJdbcTemplate().update(queryString1, param);
							}
						}
					}
				}
			}
		}
	}

	/*private void _saveImages(ChecklistFormDto jsonObject, String formId) throws Exception {
	
		String languageIdquery = PropertyFileReader.getInstance().getProperty("getlanguage");
		String queryLanguage = PropertyFileReader.getInstance().getProperty("languageid");
		
		HashMap<String, Object> genericObj = new HashMap<String, Object>();
		genericObj.put("formId", formId);
		genericObj.put("submittedBy",jsonObject.getSubmittedBy());
		genericObj.put("createDate", jsonObject.getCreatedDate());
		Integer languageId = getLanguage(jsonObject, genericObj, languageIdquery);
		jsonObject.setFormLanguageId(languageId.toString());
		genericObj.put("languageId", languageId);
		Integer formLanguageId = getLanguageForm(jsonObject, genericObj, queryLanguage);
		genericObj.put("formLanguageId", formLanguageId);
		genericObj.put("insertmetadataimages", PropertyFileReader.getInstance().getProperty("insertmetadataimages"));
		genericObj.put("getFormTempImagePath", PropertyFileReader.getInstance().getProperty("getFormTempImagePath"));
		genericObj.put("getSectionTempImagePath", PropertyFileReader.getInstance().getProperty("getSectionTempImagePath"));
		genericObj.put("getStepTempImagePath", PropertyFileReader.getInstance().getProperty("getStepTempImagePath"));
		genericObj.put("getQuestionTempImagePath", PropertyFileReader.getInstance().getProperty("getQuestionTempImagePath"));
		saveFormImagesinActualFolderAndUpdateImagePath(formLanguageId,jsonObject, genericObj);
		List<IdDetails> result = getFormIds(formId, "sectionID");
		
		for (int i = 0; i < result.size(); i++) {
			
			genericObj.put("sectionId", result.get(i).getPrimaryId());
			saveSectionImagesinActualFolderAndUpdateImagePath(i + 1, jsonObject, genericObj);
			List<IdDetails> result1 = getIds(formId, "stepID", result.get(i).getParentId());
			
			for (int j = 0; j < result1.size(); j++) {
				
				genericObj.put("stepId", result1.get(j).getPrimaryId());
				saveStepImagesinActualFolderAndUpdateImagePath(i + 1, j + 1, jsonObject, genericObj);
				List<IdDetails> result2 = getIds(formId, "questionID", result1.get(j).getParentId());
				
				for (int k = 0; k < result2.size(); k++) {
					
					genericObj.put("questionId", result2.get(k).getPrimaryId());
					saveQuestionImagesinActualFolderAndUpdateImagePath(k + 1, i + 1, j + 1, jsonObject, genericObj);
				}
			}
		}
		
		genericObj.put("removeTempImagePath", PropertyFileReader.getInstance().getProperty("removeTempImagePath"));
		removeImageTempPathDetail(genericObj);
	}*/
	
	/*private Map<String, Object> listofIds(String formId) {
				
		Map<String, Object> results = new HashMap<String, Object>();
		
		Map<String, List<IdDetails>> map = new HashMap<String, List<IdDetails>>();
		Map<String, List<String>> tempMap = new HashMap<String, List<String>>();
		List<IdDetails> result = getFormIds(formId, "sectionID");
		map.put("sectionIds", result);
		List<String> tempIds = new ArrayList<String>();
		List<String> tempQuesIds = new ArrayList<String>();
		List<String> tempStepIds = new ArrayList<String>(); 
		
		List<IdDetails> stepIds = new ArrayList<IdDetails>();
		List<IdDetails> quesIds = new ArrayList<IdDetails>();
		for (int i = 0; i < result.size(); i++) {
			
			tempIds.add(String.valueOf(i+1));
			List<IdDetails> result1 = getIds(formId, "stepID", result.get(i).getParentId());
			for (int j = 0; j < result1.size(); j++) {
				
				stepIds.add(result1.get(j));
				tempStepIds.add(String.valueOf(j + 1));
				List<IdDetails> result2 = getIds(formId, "questionID", result1.get(j).getParentId());
				for (int k = 0; k < result2.size(); k++) {
					
					quesIds.add(result2.get(k));
					tempQuesIds.add(String.valueOf(k + 1));
				}
				
			}
		}
		
		tempMap.put("tempStepIds", tempStepIds);			
		tempMap.put("tempQuesIds", tempQuesIds);
		map.put("quesIds", quesIds);
		map.put("stepIds", stepIds);
		tempMap.put("tempSections", tempIds);
		results.put("original", map);
		results.put("temp", tempMap);
		return results;
	}*/
	
	/*private List<IdDetails> getFormIds(String formId, String level) {
		
		List<IdDetails> detailDtos = new ArrayList<IdDetails>();
		Object[] param = new Object[2];
		param[0] = Integer.parseInt(formId);
		param[1] = level;
		
		String query = "select store_id_table_seq, id_value from store_id_table where form_id=? and group_name=?";
		
		RowMapper<IdDetails> mapper = new RowMapper<IdDetails>() {

			@Override
			public IdDetails mapRow(ResultSet rst, int arg1)
					throws SQLException {
				IdDetails details = new IdDetails();
				details.setParentId(rst.getString("store_id_table_seq"));
				details.setPrimaryId(rst.getString("id_value"));
				return details;
			}
		};
		detailDtos = getJdbcTemplate().query(query, param, mapper);
		return detailDtos;
	}*/

	
	private List<IdDetails> getIds(String formId, String level) {
		
		List<IdDetails> detailDtos = new ArrayList<IdDetails>();
		Object[] param = new Object[2];
		param[0] = Integer.parseInt(formId);
		param[1] = level;		
		
		String	query = "select store_id_table_seq,id_value,association_id from ckschema.store_id_table_1 where form_id=?::integer and group_name=?";
		
		RowMapper<IdDetails> mapper = new RowMapper<IdDetails>() {

			@Override
			public IdDetails mapRow(ResultSet rst, int arg1)
					throws SQLException {
				IdDetails details = new IdDetails();
				details.setParentId(rst.getString("store_id_table_seq"));
				details.setPrimaryId(rst.getString("id_value"));
				details.setAssociationId(rst.getString("association_id"));
				return details;
			}
		};
		detailDtos = getJdbcTemplate().query(query, param, mapper);
		return detailDtos;
	}

	
	private List<IdDetails> getIds(String formId, String level, String parentId) {
		
		List<IdDetails> detailDtos = new ArrayList<IdDetails>();
		Object[] param = new Object[3];
		param[0] = Integer.parseInt(formId);
		param[1] = level;		
		param[2] = Integer.parseInt(parentId);
		
		String	query = "select store_id_table_seq, id_value from store_id_table where form_id=? and group_name=? and parent_id=?";
		
		RowMapper<IdDetails> mapper = new RowMapper<IdDetails>() {

			@Override
			public IdDetails mapRow(ResultSet rst, int arg1)
					throws SQLException {
				IdDetails details = new IdDetails();
				details.setParentId(rst.getString("store_id_table_seq"));
				details.setPrimaryId(rst.getString("id_value"));
				return details;
			}
		};
		detailDtos = getJdbcTemplate().query(query, param, mapper);
		return detailDtos;
	}
	
	@Override
	public Integer getForm(String formidquery) throws Exception {

		Integer formId = null;
		try {

			formId = jdbcTemplate.queryForObject(formidquery, Integer.class);
			//LOGGER.info("*** formId*****" + formId);
			// detailDtos = getJdbcTemplate().query(query1, param, mapper);
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
		}
		return formId;
	}

	@Override
	public Integer getLanguage(ChecklistFormDto jsonObject,
			HashMap<String, Object> genericObj, String languageIdquery)
			throws Exception {
		Object[] param = new Object[1];
		// param[0] = genericObj.get("formId");
		param[0] = jsonObject.getFormLanguage();

		Integer languageId = null;
		try {
			languageId = jdbcTemplate.queryForObject(languageIdquery, param, Integer.class);
			//LOGGER.info("*** languageId*****" + languageId);
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
		}
		
		return languageId;
	}

	// @Override
	public Integer getLanguageForm(ChecklistFormDto jsonObject,
			HashMap<String, Object> genericObj, String queryLanguage)
			throws Exception {
		// String query = (String)genericObj.get("LANGUAGEFORMID");
		Object[] param = new Object[2];
		param[0] = genericObj.get("formId");
		param[1] = jsonObject.getFormLanguage();

		Integer languageId = null;
		try {
			languageId = jdbcTemplate.queryForObject(queryLanguage, param,
					Integer.class);
			//LOGGER.info("------ language Form Id -------" + languageId);
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
		}

		return languageId;
	}

	@Override
	public List<ChecklistFormDto> saveGroupAssociation(
			ChecklistFormDto jsonObject, HashMap<String, Object> genericObj,
			String groupAccocation) throws Exception {
		List<ChecklistFormDto> detailDtos = new ArrayList<ChecklistFormDto>();
		Object[] param = new Object[5];
		param[0] = Integer.parseInt(jsonObject.getGroupId());
		param[1] = genericObj.get("formId");
		param[2] = Boolean.valueOf(jsonObject.getIsActive());// (("").equals(jsonObject.getIsActive())?"N":"Y");
		param[3] = Integer.parseInt(jsonObject.getSubmittedBy());
		param[4] = genericObj.get("createDate");// jsonObject.getCreatedDate();

		try {
			//LOGGER.info("form group assocation query is ----------"+ groupAccocation);
			int groupSave = getJdbcTemplate().update(groupAccocation, param);
			// detailDtos = getJdbcTemplate().query(query, param, mapper);
			//LOGGER.info("save group -------" + groupSave);
		} catch (Exception objex) {
			//objex.printStackTrace();
			LOGGER.info(objex.getMessage());
			throw new Exception("error on insert of form metadata");
		}
		return detailDtos;
	}

	@Override
	public List<ChecklistFormDto> saveLanguageMap(ChecklistFormDto jsonObject,
			HashMap<String, Object> genericObj, String languagemap)
			throws Exception {
		List<ChecklistFormDto> detailDtos = new ArrayList<ChecklistFormDto>();
		Object[] param = new Object[6];
		param[0] = genericObj.get("formId");
		param[1] = genericObj.get("languageId");// jsonObject.getFormLanguageId();
		param[2] = jsonObject.getFormLanguage();
		param[3] = Boolean.valueOf(jsonObject.getIsActive());
		param[4] = Integer.parseInt(jsonObject.getSubmittedBy());
		param[5] = genericObj.get("createDate");// jsonObject.getCreatedDate();
		try {
			//LOGGER.info("form language query is ----------" + languagemap);
			int saveLanguage = getJdbcTemplate().update(languagemap, param);
			// detailDtos = getJdbcTemplate().query(query, param, mapper);
			//LOGGER.info("insert language -------" + saveLanguage);
		} catch (Exception objex) {
			//objex.printStackTrace();
			LOGGER.info(objex.getMessage());
			throw new Exception("error on insert of form metadata");
		}
		return detailDtos;
	}

	@Override
	public List<ChecklistFormDto> saveFormVersion(ChecklistFormDto jsonObject,
			HashMap<String, Object> genericObj, String formVersion)
			throws Exception {
		List<ChecklistFormDto> detailDtos = new ArrayList<ChecklistFormDto>();
		Object[] param = new Object[4];
		param[0] = jsonObject.getFormVersionNo();
		param[1] = genericObj.get("formId");
		param[2] = Integer.parseInt(jsonObject.getSubmittedBy());
		param[3] = genericObj.get("createDate");// jsonObject.getCreatedDate();
		try {
			//LOGGER.info("form version query is ----------" + formVersion);
			int saveversion = getJdbcTemplate().update(formVersion, param);
			// detailDtos = getJdbcTemplate().query(query, param, mapper);
			//LOGGER.info("saveversion -------" + saveversion);
		} catch (Exception objex) {
			//objex.printStackTrace();
			LOGGER.info(objex.getMessage());
			throw new Exception("error on insert of form metadata");
		}

		return null;
	}

	@Override
	public Integer getSectionId(String sectionidquery) throws Exception {
		Integer sectionId = null;
		try {

			sectionId = jdbcTemplate.queryForObject(sectionidquery,
					Integer.class);
			//LOGGER.info("*** sectionId*****" + sectionId);
			// detailDtos = getJdbcTemplate().query(query1, param, mapper);
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
		}

		return sectionId;
	}

	@Override
	public void saveSection(SectionElement objsec1,
			HashMap<String, Object> genericObj, String query) throws Exception {
		Object[] param = new Object[9];
		param[0] = genericObj.get("sectionId");// Integer.parseInt((String)
												// genericObj.get("sectionId"));
		param[1] = objsec1.getSectionName();
		param[2] = objsec1.getSectionLabel();
		param[3] = genericObj.get("formLanguageId");// Integer.parseInt((String)
													// genericObj.get("languageId"));
		param[4] = Boolean.valueOf(objsec1.getOutOfScopeSection());
		param[5] = Boolean.valueOf(objsec1.getPunchListSection());
		param[6] = Integer.parseInt(objsec1.getSectionOrder());
		param[7] = genericObj.get("submittedBy");
		param[8] = genericObj.get("createDate");// genericObj.get("createdDate");
		try {
			//LOGGER.info("save section query is ----------" + query);
			int saveSection = getJdbcTemplate().update(query, param);
			// detailDtos = getJdbcTemplate().query(query, param, mapper);
			//LOGGER.info("section save -------" + saveSection);
		} catch (Exception objex) {
			//objex.printStackTrace();
			LOGGER.info(objex.getMessage());
			throw new Exception("error on insert of Section");
		}

	}

	@Override
	public Integer getStepId(String stepidquery) throws Exception {
		Integer stepId = null;
		try {

			stepId = jdbcTemplate.queryForObject(stepidquery, Integer.class);
			//LOGGER.info("*** stepId*****" + stepId);
			// detailDtos = getJdbcTemplate().query(query1, param, mapper);
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
		}
		return stepId;
	}

	@Override
	public void saveStep(StepElement objsec1,
			HashMap<String, Object> genericObj, String query) throws Exception {
		//LOGGER.info("enter save step----------------------");
		Object[] param = new Object[7];
		param[0] = genericObj.get("stepId");
		//LOGGER.info("step-ID--" + genericObj.get("stepId"));
		param[1] = objsec1.getStepName();
		param[2] = objsec1.getStepLabel();
		param[3] = genericObj.get("sectionId");
		//LOGGER.info("step-order--" + objsec1.getStepOrder());
		param[4] = Integer.parseInt(objsec1.getStepOrder());
		param[5] = genericObj.get("submittedBy");
		param[6] = genericObj.get("createDate");// genericObj.get("createdDate");
		try {
			//LOGGER.info("save step query is ----------" + query);
			int saveStep = getJdbcTemplate().update(query, param);
			// detailDtos = getJdbcTemplate().query(query, param, mapper);
			//LOGGER.info("step save -------" + saveStep);
		} catch (Exception objex) {
			//objex.printStackTrace();
			LOGGER.info(objex.getMessage());
			throw new Exception("error on insert of Step");
		}

	}

	@Override
	public Integer getQuestionId(String questionIdQuery) throws Exception {
		Integer questionId = null;
		try {

			questionId = jdbcTemplate.queryForObject(questionIdQuery,
					Integer.class);
			//LOGGER.info("*** questionId*****" + questionId);
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
		}
		return questionId;
	}

	@Override
	public Integer getAnswerId(String answerIdQuery) throws Exception {
		Integer answerId = null;
		try {

			answerId = jdbcTemplate
					.queryForObject(answerIdQuery, Integer.class);
			//LOGGER.info("*** answerId*****" + answerId);
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
		}
		return answerId;
	}

	@Override
	public void saveQuestion(QuestionAnswerElement objsec1,
			HashMap<String, Object> genericObj, String query) throws Exception {
		Object[] param = new Object[9];
		param[0] = genericObj.get("questionId");
		param[1] = objsec1.getQuestionAccessibility();
		param[2] = Boolean.valueOf(objsec1.getIsPunchListQuestion());
		param[3] = Integer.parseInt(objsec1.getQuestionOrder());
		param[4] = genericObj.get("stepId");
		param[5] = genericObj.get("submittedBy");
		param[6] = genericObj.get("createDate");// genericObj.get("createdDate");
		param[7] = objsec1.getQuestionDescription();
		param[8] = objsec1.getImagesDescription();
		try {
			//LOGGER.info("insert question query is ----------" + query);
			int saveQuestion = getJdbcTemplate().update(query, param);
			// detailDtos = getJdbcTemplate().query(query, param, mapper);
			//LOGGER.info("insert question -------" + saveQuestion);
		} catch (Exception objex) {
			//objex.printStackTrace();
			LOGGER.info(objex.getMessage());
			throw new Exception("error on insert of Question");
		}

	}

	@Override
	public void saveAnswer(QuestionAnswerElement objsec1,
			HashMap<String, Object> genericObj, String query) throws Exception {
		Object[] param = new Object[4];
		param[0] = genericObj.get("answerId");
		param[1] = objsec1.getAnswerDescription();
		param[2] = genericObj.get("submittedBy");
		param[3] = genericObj.get("createDate");// genericObj.get("createdDate");
		try {
			//LOGGER.info("insert answer query is ----------" + query);
			// if()
			int saveAnswer = getJdbcTemplate().update(query, param);
			// detailDtos = getJdbcTemplate().query(query, param, mapper);
			//LOGGER.info("insert answer -------" + saveAnswer);
		} catch (Exception objex) {
			//objex.printStackTrace();
			LOGGER.info(objex.getMessage());
			throw new Exception("error on insert of Answer");
		}

	}

	@Override
	public void saveQuestionAnswerMap(QuestionAnswerElement objsec1,
			HashMap<String, Object> genericObj, String answerquery)
			throws Exception {
		Object[] param = new Object[4];
		param[0] = genericObj.get("questionId");
		param[1] = genericObj.get("answerId");
		param[2] = genericObj.get("submittedBy");
		param[3] = genericObj.get("createDate");// genericObj.get("createdDate");
		try {
			//LOGGER.info("insert question answer map query is ----------"	+ answerquery);
			int insertQuesAnsMap = getJdbcTemplate().update(answerquery, param);
			// detailDtos = getJdbcTemplate().query(query, param, mapper);
			//LOGGER.info("insert question answer map-------" + insertQuesAnsMap);
		} catch (Exception objex) {
			//objex.printStackTrace();
			LOGGER.info(objex.getMessage());
			throw new Exception("error on insert of Qes&Ans Map");
		}

	}

	@Override
	public void saveElementMap(Element objsec1,
			HashMap<String, Object> genericObj, String elementmap)
			throws Exception {
		Object[] param = new Object[5];
		param[0] = Integer.parseInt(objsec1.getElementId());
		//LOGGER.info("genericObj.get(ELEMENTQRY) ----------" + genericObj.get("ELEMENTQRY"));
		
		if (genericObj.get("ELEMENTQRY").equals("questionelemap")) {
			param[1] = genericObj.get("questionId");
		} else {
			param[1] = genericObj.get("answerId");
		}
		param[2] = Integer.parseInt(objsec1.getElementOrder());
		param[3] = genericObj.get("submittedBy");
		param[4] = genericObj.get("createDate");// genericObj.get("createdDate");
		
		//LOGGER.info("objsec1.getElementId() ----------" + objsec1.getElementId());
		//LOGGER.info("genericObj.get(answerId) ----------" + genericObj.get("answerId"));
		//LOGGER.info("objsec1.getElementOrder() ----------" + objsec1.getElementOrder());
	
		try {
			//LOGGER.info("insert element map query is ----------" + elementmap);
			
			int insertElementMap = getJdbcTemplate().update(elementmap, param);
			//LOGGER.info("insert element map-------" + insertElementMap);
		} catch (Exception objex) {
			//objex.printStackTrace();
			LOGGER.info(objex.getMessage());
			throw new Exception("error on insert of Qes&Ans element Map");
		}

	}

	// @Override
	public Integer getQuesAssocId(String quesassocidquery,
			HashMap<String, Object> genericObj) throws Exception {
		Integer quesAssocId = null;
		Object[] param = new Object[2];
		param[0] = genericObj.get("questionId");
		param[1] = genericObj.get("answerId");
		try {

			quesAssocId = jdbcTemplate.queryForObject(quesassocidquery, param,
					Integer.class);
			//LOGGER.info("*** quesAssocId*****" + quesAssocId);
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
		}
		return quesAssocId;
	}

	public Integer getAnsMapId(String ansmapidquery,
			HashMap<String, Object> genericObj) throws Exception {
		Integer ansMapId = null;
		Object[] param = new Object[3];
		param[0] = Integer.parseInt(genericObj.get("answerId").toString());
		param[1] = Integer.parseInt(genericObj.get("elementId").toString());
		param[2] = Integer.parseInt(genericObj.get("elementOrder").toString());
		try {
			ansMapId = jdbcTemplate.queryForObject(ansmapidquery, param, Integer.class);
			//LOGGER.info("*** getAnsMapId*****" + ansMapId);
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
		}
		return ansMapId;
	}

	public Integer getQesMapId(String qesmapidquery,
			HashMap<String, Object> genericObj) throws Exception {
		Integer qesMapId = null;
		Object[] param = new Object[1];
		param[0] = genericObj.get("questionId");
		try {

			qesMapId = jdbcTemplate.queryForObject(qesmapidquery, param,
					Integer.class);
			//LOGGER.info("*** getQesMapId*****" + qesMapId);
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
		}
		return qesMapId;
	}

	public Integer getAnsRuleMapId(String ansrulemapidquery) throws Exception {
		Integer ansRuleMapId = null;
		/*
		 * Object[] param = new Object[1]; param[0] =
		 * genericObj.get("answerId");
		 */
		try {

			ansRuleMapId = jdbcTemplate.queryForObject(ansrulemapidquery,
					Integer.class);
			//LOGGER.info("*** ansRuleMapId*****" + ansRuleMapId);
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
		}
		return ansRuleMapId;
	}

	@Override
	public void saveAttributeProb(ElementArributuesProp objse1,
			HashMap<String, Object> genericObj, String attributeProb)
			throws Exception {
		Object[] param = new Object[6];
		param[0] = Integer.parseInt((String) genericObj.get("elementId"));
		param[1] = Integer.parseInt(objse1.getAttributeId());
		param[2] = objse1.getDefaultValue();
		param[3] = genericObj.get("qesansMapId");
		param[4] = genericObj.get("submittedBy");
		param[5] = genericObj.get("createDate");// genericObj.get("createdDate");
		try {
			//LOGGER.info("insert element properties query is ----------"+ attributeProb);
			int insertElementPro = getJdbcTemplate().update(attributeProb,
					param);
			//LOGGER.info("insert element properties-------" + insertElementPro);
		} catch (Exception objex) {
			//objex.printStackTrace();
			LOGGER.info(objex.getMessage());
			throw new Exception("error on insert of Qes&Ans element properties");
		}

	}

	@Override
	public void saveRule(Rule objse1, HashMap<String, Object> genericObj,
			String rule) throws Exception {
		Object[] param = new Object[6];
		param[0] = genericObj.get("ansRuleMapId");
		param[1] = Integer.parseInt(objse1.getRuleId());
		param[2] = genericObj.get("answerId");
		param[3] = genericObj.get("submittedBy");
		param[4] = genericObj.get("createDate");// genericObj.get("createdDate");
		param[5] = objse1.getFormulaData();
		try {
			//LOGGER.info("insert element rule query is ----------" + rule);
			int insertRule = getJdbcTemplate().update(rule, param);
			//LOGGER.info("insert element rule-------" + insertRule);
		} catch (Exception objex) {
		//	objex.printStackTrace();
			LOGGER.info(objex.getMessage());
			throw new Exception("error on insert of Qes&Ans element rule");
		}

	}

	@Override
	public void saveRuleAction(AddAction objse1,
			HashMap<String, Object> genericObj, String addAction)
			throws Exception {
		Object[] param = new Object[8];
		param[0] = genericObj.get("ansRuleMapId");
		param[1] = Integer.parseInt(objse1.getActionId());
		param[2] = objse1.getActionOutput();
		param[3] = objse1.getActionOutputValue();
		param[4] = Integer.parseInt(objse1.getNumberOfFields());
		param[5] = Boolean.valueOf(objse1.getIsDeleted());
		param[6] = genericObj.get("submittedBy");
		param[7] = genericObj.get("createDate");
		try {
			//LOGGER.info("insert element rule Action query is ----------"	+ addAction);
			int insertRuleAction = getJdbcTemplate().update(addAction, param);
			//LOGGER.info("insert element rule action-------" + insertRuleAction);
		} catch (Exception objex) {
			//objex.printStackTrace();
			LOGGER.info(objex.getMessage());
			throw new Exception(
					"error on insert of Qes&Ans element rule action");
		}

	}

	@Override
	public List<String> getElementRuleCategoryList(String query) {
		List<String> categoryList = null;
		try {
			categoryList = jdbcTemplate.queryForList(query, String.class);
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
		}
		return categoryList;

	}

	@Override
	public List<ChecklistValidationRuleDTO> getRuleActionsDetailList(
			String query) {
		List<ChecklistValidationRuleDTO> detailDtos = new ArrayList<ChecklistValidationRuleDTO>();

		RowMapper<ChecklistValidationRuleDTO> mapper = new RowMapper<ChecklistValidationRuleDTO>() {
			@Override
			public ChecklistValidationRuleDTO mapRow(ResultSet rst, int arg1)
					throws SQLException {
				ChecklistValidationRuleDTO beanObj = new ChecklistValidationRuleDTO();
				beanObj.setRuleActionId(rst.getString("rule_action_id"));
				beanObj.setRuleActionTag(rst.getString("rule_action_tag"));
				beanObj.setRuleActionDesc(rst.getString("rule_action__desc"));
				return beanObj;
			}
		};

		detailDtos = getJdbcTemplate().query(query, mapper);

		return detailDtos;
	}

	@Override
	public void saveTagMap(QuestionAnswerElement objsec1,
			HashMap<String, Object> genericObj, String tagMap) throws Exception {
		Object[] param = new Object[5];
		param[0] = 1;// Integer.parseInt((String) genericObj.get(""));
		param[1] = genericObj.get("quesAssocId");
		param[2] = Boolean.valueOf(objsec1.getIsDeleted());
		param[3] = genericObj.get("submittedBy");
		param[4] = genericObj.get("createDate");
		try {
			//LOGGER.info("insert ques Tag Map query is ----------" + tagMap);
			int insertTagMap = getJdbcTemplate().update(tagMap, param);
			//LOGGER.info("insert tag map-------" + insertTagMap);
		} catch (Exception objex) {
			//objex.printStackTrace();
			LOGGER.info(objex.getMessage());
			throw new Exception("error on insert of tag map");
		}

	}

	@Override
	public void saveHelpImage(Images objse1,
			HashMap<String, Object> genericObj, String helpImage)
			throws Exception {
		Object[] param = new Object[6];
		param[0] = genericObj.get("languageId");
		param[1] = genericObj.get("imagesDesc");
		param[2] = objse1.getImageUrl();
		param[3] = genericObj.get("imagesDescLevel");
		param[4] = genericObj.get("submittedBy");
		param[5] = genericObj.get("createDate");
		try {
			//LOGGER.info("insert ques Tag Map query is ----------" + helpImage);
			int insertTagMap = getJdbcTemplate().update(helpImage, param);
			//LOGGER.info("insert tag map-------" + insertTagMap);
		} catch (Exception objex) {
			//objex.printStackTrace();
			LOGGER.info(objex.getMessage());
			throw new Exception("error on insert of tag map");
		}

	}

	// Transaction roll back start
	/*public void iterateSection(ChecklistFormDto obj,
			HashMap<String, Object> genericObj) throws Exception {

		ArrayList<SectionElements> objse = obj.getSectionElements();
		String sectionidquery = (String) genericObj.get("SECTIONIDQUERY");
		String query = (String) genericObj.get("SAVESECTION");
		Integer sectionId = null;
		Object[] sectionElementPro = null;
		String insertMetadata = null;
		insertMetadata = ChecklistPortalConstants.SAVE;
		TransactionDefinition def = new DefaultTransactionDefinition();
		TransactionStatus status = transactionManager.getTransaction(def);
		try {
			for (int i = 0; i < objse.size(); i++) {
				//LOGGER.info("-------" + objse.size());
				SectionElements objse1 = objse.get(i);
				ArrayList<SectionElement> obj1 = objse1.getSectionElement();
				sectionId = getSectionId(sectionidquery);
				sectionElementPro = new Object[obj1.size()][10];
				for (int j = 0; j < obj1.size(); j++) {
					// genericObj.put("sectionId", sectionId);
					//LOGGER.info("-------sectionId is *************" + sectionId);
					//LOGGER.info("-------" + obj1.size());
					SectionElement objsec1 = obj1.get(j);
					objsec1.setSectionId(sectionId.toString());
					genericObj.put("sectionId", sectionId);
					if ("JAVA".equals(insertMetadata)) {
						saveSection(objsec1, genericObj, query);
						//transactionManager.commit(status);
					}
					// transactioncommit
					// iterateImage(obj,genericObj);
					Integer tempsectionId = Integer.parseInt(objsec1.getSectionTempId());
					//saveSectionImagesinActualFolderAndUpdateImagePath(tempsectionId, obj, genericObj);
					iterateStep(objsec1, obj, genericObj);
					transactionManager.commit(status);
				}

			}
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
			LOGGER.info("Error in creating record, rolling back");
			transactionManager.rollback(status);

			throw new Exception("error on insert of form metadata");
		}
	}

	public void iterateStep(SectionElement obj, ChecklistFormDto formObj, HashMap<String, Object> genericObj) throws Exception {
		ArrayList<StepElements> objse = obj.getStepElements();
		String stepidquery = (String) genericObj.get("STEPIDQUERY");
		String query = (String) genericObj.get("SAVESTEP");
		Integer stepId = null;
		Object[][] stepElementPro = null;
		String insertMetadata = null;
		insertMetadata = ChecklistPortalConstants.SAVE;
		TransactionDefinition def = new DefaultTransactionDefinition();
		TransactionStatus status = transactionManager.getTransaction(def);
		try {
			for (int i = 0; i < objse.size(); i++) {
				//LOGGER.info("-------" + objse.size());
				StepElements objse1 = objse.get(i);
				ArrayList<StepElement> obj1 = objse1.getStepElement();
				stepId = getStepId(stepidquery);
				stepElementPro = new Object[obj1.size()][10];

				for (int j = 0; j < obj1.size(); j++) {

					//LOGGER.info("-------stepId is *************" + stepId);
					//LOGGER.info("-------" + obj1.size());
					StepElement objsec1 = obj1.get(j);
					objsec1.setStepId(stepId.toString());
					genericObj.put("stepId", stepId);
					if ("JAVA".equals(insertMetadata)) {
						saveStep(objsec1, genericObj, query);
						//transactionManager.commit(status);
					}
					// commit;
					// iterateImage(obj,genericObj);
					Integer tempSectionId = Integer.parseInt(obj.getSectionTempId());
					Integer tempStepId = Integer.parseInt(objsec1.getStepTempId());
				//	saveStepImagesinActualFolderAndUpdateImagePath(tempSectionId, tempStepId, formObj, genericObj);
					
					iterateQuesAnsElement(objsec1, tempSectionId, tempStepId, formObj, genericObj);
				}
			}
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
			LOGGER.info("Error in creating record, rolling back");
			transactionManager.rollback(status);

			throw new Exception("error on insert of form metadata");
		}
	}

	private void iterateQuesAnsElement(StepElement obj,	Integer tempSectionId, Integer tempStepId, ChecklistFormDto formDto, HashMap<String, Object> genericObj) throws Exception {
		ArrayList<QuestionAnswerElements> objse = obj
				.getQuestionAnswerElements();
		String questionIdQuery = (String) genericObj.get("QUESTIONIDQUERY");
		String answerIdQuery = (String) genericObj.get("ANSWERIDQUERY");
		String questionquery = (String) genericObj.get("QUESTIONQUERY");
		String answerquery = (String) genericObj.get("ANSWERQUERY");
		String quesanswermap = (String) genericObj.get("QUESANSWERMAP");
		String quesassocidquery = (String) genericObj.get("QUESASSOCIDQUERY");
		String tagMap = (String) genericObj.get("TAGMAP");
		Integer questionId = null;
		Integer answerId = null;
		Integer quesAssocId = null;
		// String[][] questionElement=null;
		Object[][] questionElement = null;
		String insertMetadata = null;
		insertMetadata = ChecklistPortalConstants.SAVE;
		TransactionDefinition def = new DefaultTransactionDefinition();
		TransactionStatus status = transactionManager.getTransaction(def);
		try {
			for (int i = 0; i < objse.size(); i++) {
				//LOGGER.info("-------" + objse.size());
				QuestionAnswerElements objse1 = objse.get(i);
				ArrayList<QuestionAnswerElement> obj1 = objse1.getQuestionAnswerElement();
				
				questionElement = new Object[obj1.size()][10];
				for (int j = 0; j < obj1.size(); j++) {

					//LOGGER.info("-------stepId is *************" + questionId + "," + answerId);
					//LOGGER.info("-------" + obj1.size());
					QuestionAnswerElement objsec1 = obj1.get(j);

					questionId = getQuestionId(questionIdQuery);
					objsec1.setQuestionId(questionId.toString());
					genericObj.put("questionId", questionId);
					answerId = getAnswerId(answerIdQuery);
					objsec1.setAnswerId(answerId.toString());
					genericObj.put("answerId", answerId);
					if ("JAVA".equals(insertMetadata)) {
						saveQuestion(objsec1, genericObj, questionquery);
						saveAnswer(objsec1, genericObj, answerquery);
					}
					
					saveQuestionAnswerMap(objsec1, genericObj, quesanswermap);
					quesAssocId = getQuesAssocId(quesassocidquery, genericObj);
					objsec1.setQuesAssocId(quesAssocId.toString());
					genericObj.put("quesAssocId", quesAssocId);
					saveTagMap(objsec1, genericObj, tagMap);
					
					Integer tempQuesId = Integer.parseInt(objsec1.getQuestionClientUid());
				//	saveQuestionImagesinActualFolderAndUpdateImagePath(tempQuesId, tempSectionId, tempStepId, formDto, genericObj);
					
					genericObj.put("ELEMENTQRY", "questionelemap");
					iterateElement(objsec1, genericObj);
					
					genericObj.put("ELEMENTQRY", "answerelemap");
					iterateElement(objsec1, genericObj);
				}
			}

		} catch (Exception e) {
			// id=questionid,name
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
			LOGGER.info("Error in creating record, rolling back");
			transactionManager.rollback(status);

			throw new Exception("error on insert of form metadata");
		}

	}

	private void iterateElement(QuestionAnswerElement obj, HashMap<String, Object> genericObj) throws Exception {
		ArrayList<Elements> objse = obj.getElements();
		String elementmap = null;
		String ansmapidquery = (String) genericObj.get("ANSMAPID");
		String qesmapidquery = (String) genericObj.get("QESMAPID");
		// String elementmap = (String)genericObj.get("ELEMENTMAP");
		//Object[][] element = null;
		String insertMetadata = null;
		Integer ansMapId = null;
		Integer qesMapId = null;
		insertMetadata = ChecklistPortalConstants.SAVE;
		TransactionDefinition def = new DefaultTransactionDefinition();
		TransactionStatus status = transactionManager.getTransaction(def);
		try {
			//LOGGER.info("objse.size() ------- "+objse.size());
			for (int i = 0; i < objse.size(); i++) {
				Elements objse1 = objse.get(i);
				ArrayList<Element> obj1 = objse1.getElement();
				//element = new Object[obj1.size()][10];
				//LOGGER.info("obj1.size() ------- "+obj1.size());
				for (int j = 0; j < obj1.size(); j++) {
					Element objsec1 = obj1.get(j);
					genericObj.put("elementId", objsec1.getElementId());
					genericObj.put("elementOrder", objsec1.getElementOrder());
					//LOGGER.info("Answer Element Map ------- "+elementmap);
					if ("QuestionType".equals(objsec1.getElementType())) {
						elementmap = PropertyFileReader.getInstance().getProperty("questionelemap");
						saveElementMap(objsec1, genericObj, elementmap);
					} else if ("AnswerType".equals(objsec1.getElementType())) {
						genericObj.put("ELEMENTQRY", "answerelemap");
						elementmap = PropertyFileReader.getInstance().getProperty("answerelemap");
						saveElementMap(objsec1, genericObj, elementmap);
						
						ansMapId = getAnsMapId(ansmapidquery, genericObj);
						objsec1.setElementMapId(ansMapId.toString());
						genericObj.put("qesansMapId", ansMapId);
						
						iterateAttributeProb(objsec1, genericObj);
						iterateAttributeVal(objsec1, genericObj);
						iterateRule(objsec1, genericObj);
						
					}
				}
			}
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
			LOGGER.info("Error in creating record, rolling back");
			transactionManager.rollback(status);

			throw new Exception("error on insert of form metadata");
		}
	}

	private void iterateAttributeProb(Element obj,
			HashMap<String, Object> genericObj) throws Exception {
		ArrayList<ElementArributuesProp> objse = obj.getElementArributuesProp();
		if (objse == null) {
			return;
		}
		String attributeProb = (String) genericObj.get("ATTRIBUTEPROB");

		Object[][] attributeElement = null;
		String insertMetadata = null;
		TransactionDefinition def = new DefaultTransactionDefinition();
		TransactionStatus status = transactionManager.getTransaction(def);
		insertMetadata = ChecklistPortalConstants.SAVE;
		try {
			for (int i = 0; i < objse.size(); i++) {
				//LOGGER.info("-------" + objse.size());
				ElementArributuesProp objse1 = objse.get(i);
				attributeElement = new Object[objse.size()][10];
				if ("JAVA".equals(insertMetadata)) {
					saveAttributeProb(objse1, genericObj, attributeProb);
				}
				 * else{ attributeElement[i][0] =
				 * Integer.parseInt((String)genericObj.get("elementId"));
				 * attributeElement[i][1] =
				 * Integer.parseInt(objse1.getAttributeId());
				 * attributeElement[i][2] = objse1.getAttributeName();
				 * attributeElement[i][3] = Integer.parseInt((String)
				 * genericObj.get("quesAssocId")); attributeElement[i][4] =
				 * Integer.parseInt((String) genericObj.get("submittedBy"));
				 * attributeElement[i][5] = genericObj.get("createdDate"); }
				 
			}
			//transactionManager.commit(status);
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
			LOGGER.info("Error in creating record, rolling back");
			transactionManager.rollback(status);

			throw new Exception("error on insert of form metadata");
		}
	}

	private void iterateAttributeVal(Element obj,
			HashMap<String, Object> genericObj) throws Exception {
		try {

		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
		}

	}

	private void iterateRule(Element obj, HashMap<String, Object> genericObj)
			throws Exception {
		ArrayList<Rule> objse = obj.getRule();
		if (objse == null) {
			return;
		}
		
		String rule = (String) genericObj.get("RULE");
		String ansRuleMapIdQuery = (String) genericObj.get("ANSRULEMAPIDQUERY");
		Integer ansRuleMapId = null;
		Object[][] ruleElement = null;
		String insertMetadata = null;
		insertMetadata = ChecklistPortalConstants.SAVE;
		TransactionDefinition def = new DefaultTransactionDefinition();
		TransactionStatus status = transactionManager.getTransaction(def);
		try {
			for (int i = 0; i < objse.size(); i++) {
				//LOGGER.info("-------" + objse.size());
				Rule objse1 = objse.get(i);
				ansRuleMapId = getAnsRuleMapId(ansRuleMapIdQuery);
				objse1.setAnsRuleMapId(ansRuleMapId.toString());
				genericObj.put("ansRuleMapId", ansRuleMapId);
				ruleElement = new Object[objse.size()][10];
				if ("JAVA".equals(insertMetadata)) {
					saveRule(objse1, genericObj, rule);
				}
				 * else{ ruleElement[i][0] = Integer.parseInt((String)
				 * genericObj.get("ansRuleMapId")); ruleElement[i][1] =
				 * Integer.parseInt(objse1.getRuleId()); ruleElement[i][2] =
				 * Integer.parseInt((String) genericObj.get("answerId"));
				 * ruleElement[i][3] = Integer.parseInt((String)
				 * genericObj.get("submittedBy")); ruleElement[i][4] =
				 * genericObj.get("createdDate"); }
				 
				//transactionManager.commit(status);
				iterateAction(objse1, genericObj);
			}
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
			LOGGER.info("Error in creating record, rolling back");
			transactionManager.rollback(status);

			throw new Exception("error on insert of form metadata");
		}

	}

	private void iterateAction(Rule obj, HashMap<String, Object> genericObj)
			throws Exception {
		ArrayList<AddAction> objse = obj.getAddAction();
		String addAction = (String) genericObj.get("ADDACTION");
		// String ansrulemapidquery =
		// (String)genericObj.get("ANSRULEMAPIDQUERY");
		Object[][] actionElement = null;
		String insertMetadata = null;
		Integer ansRuleMapId = null;
		insertMetadata = ChecklistPortalConstants.SAVE;
		TransactionDefinition def = new DefaultTransactionDefinition();
		TransactionStatus status = transactionManager.getTransaction(def);
		try {
			for (int i = 0; i < objse.size(); i++) {
				//LOGGER.info("-------" + objse.size());
				AddAction objse1 = objse.get(i);
				actionElement = new Object[objse.size()][10];
				
				 * ansRuleMapId = getQesMapId(ansrulemapidquery, genericObj);
				 * obj.setAnsRuleMapId(ansRuleMapId.toString());
				 * genericObj.put("ansRuleMapId", ansRuleMapId);
				 
				if ("JAVA".equals(insertMetadata)) {
					saveRuleAction(objse1, genericObj, addAction);
				}
				 * else{ actionElement[i][0] = Integer.parseInt((String)
				 * genericObj.get("ansRuleMapId")); actionElement[i][1] =
				 * Integer.parseInt(objse1.getActionId()); actionElement[i][2] =
				 * objse1.getActionOutput(); actionElement[i][3] =
				 * objse1.getActionOutputValue(); actionElement[i][4] =
				 * objse1.getNumberOfFields(); actionElement[i][5] =
				 * objse1.getIsDeleted(); actionElement[i][6] =
				 * Integer.parseInt((String) genericObj.get("submittedBy"));
				 * actionElement[i][7] = genericObj.get("createdDate"); }
				 
			}
			//transactionManager.commit(status);
		} catch (Exception e) {
		//	e.printStackTrace();
			LOGGER.info(e.getMessage());
			LOGGER.info("Error in creating record, rolling back");
			transactionManager.rollback(status);

			throw new Exception("error on insert of form metadata");
		}
	}*/

	@Override
	public List<FormFilterSection> sectionDetail(FormFilterSection jsonObject,
			String query) {
		List<FormFilterSection> detailDtos = new ArrayList<FormFilterSection>();
		final Object[] param = new Object[1];
		param[0] = Integer.parseInt(jsonObject.getFormId());

		RowMapper<FormFilterSection> mapper = new RowMapper<FormFilterSection>() {

			@Override
			public FormFilterSection mapRow(ResultSet rst, int arg1)
					throws SQLException {
				FormFilterSection beanObj = new FormFilterSection();

				beanObj.setSectionId(rst.getString("bfs_section_id"));
				beanObj.setSectionName(rst.getString("bfs_section_name"));

				return beanObj;
			}
		};

		detailDtos = getJdbcTemplate().query(query, param, mapper);
		//LOGGER.info("--------------------" + query);
		return detailDtos;
	}

	@Override
	public List<FormFilterSection> stepDetail(FormFilterSection jsonObject,
			String query) {
		List<FormFilterSection> detailDtos = new ArrayList<FormFilterSection>();
		final Object[] param = new Object[1];
		param[0] = Integer.parseInt(jsonObject.getSectionId());

		RowMapper<FormFilterSection> mapper = new RowMapper<FormFilterSection>() {

			@Override
			public FormFilterSection mapRow(ResultSet rst, int arg1)
					throws SQLException {
				FormFilterSection beanObj = new FormFilterSection();

				beanObj.setStepId(rst.getString("bfs_step_id"));
				beanObj.setStepName(rst.getString("bfs_step_name"));

				return beanObj;
			}
		};

		detailDtos = getJdbcTemplate().query(query, param, mapper);
		//LOGGER.info("--------------------" + query);
		return detailDtos;
	}

	@Override
	public List<FormFilterSection> quesDetail(FormFilterSection jsonObject,
			String query) {
		List<FormFilterSection> detailDtos = new ArrayList<FormFilterSection>();
		final Object[] param = new Object[1];
		param[0] = Integer.parseInt(jsonObject.getStepId());

		RowMapper<FormFilterSection> mapper = new RowMapper<FormFilterSection>() {

			@Override
			public FormFilterSection mapRow(ResultSet rst, int arg1)
					throws SQLException {
				FormFilterSection beanObj = new FormFilterSection();

				beanObj.setQuestionId(rst.getString("bfs_ques_id"));
				beanObj.setQuestionName(rst.getString("ques_desc"));

				return beanObj;
			}
		};

		detailDtos = getJdbcTemplate().query(query, param, mapper);
		//LOGGER.info("--------------------" + query);
		return detailDtos;
	}

	/* public String saveFormImagesinActualFolderAndUpdateImagePath(final Integer languageId, final ChecklistFormDto jsonObject,
			final HashMap<String, Object> genericObj) {

		final Object[] param = new Object[2];
		param[0] = Integer.parseInt("1");
		param[1] = "Form";

		return jdbcTemplate.query(genericObj.get("getFormTempImagePath").toString(), param, new ResultSetExtractor<String>() {
			@Override
			public String extractData(ResultSet rs) throws SQLException, DataAccessException {
				
				int count = 0;
				while (rs.next()) {

					String image_desc = rs.getString(1);
					String imagePath = rs.getString(2);
					String helpTextLevel = rs.getString(3);

					String seqStr = "_" + count;

					try {
						File srcFile = new File(imagePath);
						if (srcFile.exists()) {
							String destFilePath = HostPropertyFileReader.getInstance().getProperty("imagePath") + "/" + genericObj.get("formId");
							String imageName = genericObj.get("formId")	+ seqStr + ".PNG";
							File destFile = ChecklistUtility.getDirectory(destFilePath, destFilePath);

							copyImageToActualFolder(srcFile, destFile, imageName);
							srcFile.delete();

							String finalimagePath = destFile.getAbsolutePath() + "/" + imageName;
							String insertmetadataimagesquery = genericObj.get("insertmetadataimages").toString();
							insertImageDetailinMainTable(languageId, image_desc,helpTextLevel, finalimagePath,genericObj.get("formId").toString(),
									jsonObject.getSubmittedBy(), insertmetadataimagesquery);

						}
					}/*
					 * catch(IOException ex){ ex.printStackTrace(); }
					 catch (Exception ex) {
						//ex.printStackTrace();
						LOGGER.info(ex.getMessage());
					}
					
					count++;
				}
				return null;
			}
		});

	}
	
	private List<Images> getTempImageDetails(Integer tempSectionId, HashMap<String, Object> genericObj) {

		String queryString = genericObj.get("getSectionTempImagePath").toString();
		List<Images> detailDtos = new ArrayList<Images>();
		Object[] param = new Object[3];
		param[0] = Integer.parseInt("1");
		param[1] = tempSectionId;
		param[2] = "Section";
		
		RowMapper<Images> mapper = new  RowMapper<Images>() {
			
			@Override
			public Images mapRow(ResultSet rs, int arg1) throws SQLException {	
				
				Images images = new Images();
				images.setImagesDesc(rs.getString(1));
				images.setImageUrl(rs.getString(2));
				images.setImageName(rs.getString(3));
				return images;
			}
		};
		
		detailDtos = getJdbcTemplate().query(queryString, param, mapper);
		return detailDtos;
	}

	public void saveSectionImagesinActualFolderAndUpdateImagePath(Integer tempSectionId, ChecklistFormDto jsonObject, HashMap<String, Object> genericObj) {
		
		List<Images> result = getTempImageDetails(tempSectionId, genericObj);
		int count = 0;
		for (Images images : result) {
			
			String image_desc = images.getImagesDesc();
			String imagePath = images.getImageUrl();
			String helpTextLevel = images.getImageName();

			String seqStr = "_" + count;
			
			try {
				File srcFile = new File(imagePath);
				if (srcFile.exists()) {
					String destFilePath = HostPropertyFileReader.getInstance().getProperty("imagePath") + "/" + genericObj.get("formId");
					String imageName = genericObj.get("sectionId")	+ seqStr + ".PNG";
					File destFile = ChecklistUtility.getDirectory(destFilePath, destFilePath);
					copyImageToActualFolder(srcFile, destFile, imageName);
					srcFile.delete();

					String finalimagePath = destFile.getAbsolutePath()+ "/" + imageName;
					String insertmetadataimagesquery = genericObj.get("insertmetadataimages").toString();
					insertImageDetailinMainTable(Integer.parseInt(genericObj.get("formLanguageId").toString()), image_desc,helpTextLevel, finalimagePath,genericObj.get("sectionId").toString(),
							jsonObject.getSubmittedBy(), insertmetadataimagesquery);

				}
			} catch (Exception ex) {
				LOGGER.info(ex.getMessage());
			}			
			count++;			
		}
	}

	public String saveStepImagesinActualFolderAndUpdateImagePath(final Integer tempSectioneId, final Integer tempStepId, final ChecklistFormDto jsonObject,
			final HashMap<String, Object> genericObj) {

		final Object[] param = new Object[4];
		param[0] = Integer.parseInt("1");
		param[1] = tempSectioneId;
		param[2] = tempStepId;
		param[3] = "Step";
		
		return jdbcTemplate.query(genericObj.get("getStepTempImagePath").toString(), param, new ResultSetExtractor<String>() {
			@Override
			public String extractData(ResultSet rs) throws SQLException, DataAccessException {

				int count = 0;
				while (rs.next()) {

					String image_desc = rs.getString(1);
					String imagePath = rs.getString(2);
					String helpTextLevel = rs.getString(3);

					String seqStr = "_" + count;
					
					try {
						File srcFile = new File(imagePath);
						if (srcFile.exists()) {
							String destFilePath = HostPropertyFileReader.getInstance().getProperty("imagePath") + "/" + genericObj.get("formId");
							String imageName = genericObj.get("stepId")	+ seqStr + ".PNG";
							File destFile = ChecklistUtility.getDirectory(destFilePath, destFilePath);

							copyImageToActualFolder(srcFile, destFile, imageName);
							srcFile.delete();

							String finalimagePath = destFile.getAbsolutePath() + "/" + imageName;
							String insertmetadataimagesquery = genericObj.get("insertmetadataimages").toString();
							insertImageDetailinMainTable(Integer.parseInt(genericObj.get("formLanguageId").toString()), image_desc,helpTextLevel, finalimagePath,genericObj.get("stepId").toString(),
									jsonObject.getSubmittedBy(), insertmetadataimagesquery);

						}
					} catch (Exception ex) {
						//ex.printStackTrace();
						LOGGER.info(ex.getMessage());
					}
					
					count++;

				}
				return null;
			}
		});

	}

	public String saveQuestionImagesinActualFolderAndUpdateImagePath(final Integer tempQuestionId, final Integer tempSectioneId, final Integer tempStepId, final ChecklistFormDto jsonObject,
			final HashMap<String, Object> genericObj) {

		final Object[] param = new Object[4];
		param[0] = Integer.parseInt("1");
		param[1] = tempSectioneId;
		param[2] = tempStepId;
		param[3] = tempQuestionId;

		return jdbcTemplate.query(genericObj.get("getQuestionTempImagePath").toString(), param, new ResultSetExtractor<String>() {
			@Override
			public String extractData(ResultSet rs) throws SQLException, DataAccessException {

				int count = 0;
				while (rs.next()) {

					String image_desc = rs.getString(1);
					String imagePath = rs.getString(2);
					String helpTextLevel = rs.getString(3);
					
					String seqStr = "_" + count;
					if (imagePath.contains("_")) {
						seqStr = imagePath.substring(imagePath.indexOf("_"),
								(imagePath.indexOf("_") + 1));
					}

					try {
						File srcFile = new File(imagePath);
						if (srcFile.exists()) {
							String destFilePath = HostPropertyFileReader.getInstance().getProperty("imagePath") + "/" + genericObj.get("formId");
							//String destFilePath = "C:\\Users\\KD822422\\Documents\\Userdata\\" + genericObj.get("formId") + "\\HelpImages";
							String imageName = genericObj.get("questionId")	+ seqStr + ".PNG";
							File destFile = ChecklistUtility.getDirectory(destFilePath, destFilePath);

							copyImageToActualFolder(srcFile, destFile, imageName);
							// srcFile.renameTo(new File(destFilePath));
							srcFile.delete();

							String finalimagePath = destFile.getAbsolutePath() + "/" + imageName;
							String insertmetadataimagesquery = genericObj.get("insertmetadataimages").toString();
							insertImageDetailinMainTable(Integer.parseInt(genericObj.get("formLanguageId").toString()), image_desc,helpTextLevel, finalimagePath,genericObj.get("questionId").toString(),
									jsonObject.getSubmittedBy(), insertmetadataimagesquery);

						}
					}
					 * catch(IOException ex){ ex.printStackTrace(); }
					 catch (Exception ex) {
						//ex.printStackTrace();
						LOGGER.info(ex.getMessage());
					}
					
					count++;
				}
				return null;
			}
		});

	}*/

	
	public void copyImageToActualFolder(File source, File dest, String imageName) throws IOException {
		InputStream input = null;
		OutputStream output = null;
		try {

			String imagePath = dest.getAbsolutePath() + "/" + imageName;
			input = new FileInputStream(source);
			output = new FileOutputStream(new File(imagePath));
			if(input != null && output != null){
				byte[] buf = new byte[1024];
				int bytesRead;
				while ((bytesRead = input.read(buf)) > 0) {
					output.write(buf, 0, bytesRead);
				}
			}
		} catch(IOException e){
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
		}catch(Exception e){
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
		} finally {
			if(input != null){
				input.close();
			}
			if(output != null){
				output.close();
			}
		}
	}

	public String insertImageDetailinMainTable(final Integer formLangId, final String helpDescription,final String helpTextLevel, final String finalimagePath, final String formId, final String submittedBy, String query){
		
		int rownum = getJdbcTemplate().update(query, new PreparedStatementSetter() {
		      public void setValues(PreparedStatement ps) throws SQLException {
		    	  ps.setInt(1, 19);
		          ps.setInt(2, formLangId);
		          ps.setString(3, helpDescription);
		          ps.setString(4, finalimagePath);
		          ps.setString(5, helpTextLevel);
		          ps.setInt(6, Integer.parseInt(formId));
		          ps.setInt(7, Integer.parseInt(submittedBy));
		        }
		      });
		
		return null;
	}
	

	@Override
	public ChecklistDetailDto getChecklistFormDetailfromId(String formId, String query) {

		List<ChecklistDetailDto> detailDtos = null;
		Object[] param = new Object[1];
		param[0] = Integer.parseInt(formId);
		
		RowMapper<ChecklistDetailDto> mapper = new  RowMapper<ChecklistDetailDto>() {
			
			@Override
			public ChecklistDetailDto mapRow(ResultSet rst, int arg1) throws SQLException {
				ChecklistDetailDto beanObj = new ChecklistDetailDto();
				beanObj.setFormId(rst.getString("bfd_form_id"));
				beanObj.setFormName(rst.getString("bfd_name"));
				beanObj.setFormHelpTextDetail(rst.getString("form_helptext"));
				beanObj.setAttributeCount(rst.getString("section_count"));
				beanObj.setFormStatus(rst.getString("form_status"));
				beanObj.setFunctionName(rst.getString("function_name"));
				beanObj.setSubFunctionName(rst.getString("sub_function_name"));
				beanObj.setGroupName(rst.getString("group_name"));
				beanObj.setPublishVersion(rst.getString("publish_version"));
				beanObj.setDraftVersion(rst.getString("draft_version"));
				beanObj.setBaseFormId(rst.getString("base_form_id"));
				beanObj.setGroupId(rst.getString("group_id"));
				beanObj.setAssignedToProject(rst.getString("project_applicability"));
				
				return beanObj;
			}
		};
		
		detailDtos = getJdbcTemplate().query(query, param, mapper);
		
		return detailDtos.get(0);
	
	}

	@Override
	public List<ChecklistDetailDto> getChecklistMetadataForEdit(String formId, String query) {
		List<ChecklistDetailDto> detailDtos = new ArrayList<ChecklistDetailDto>();
		Object[] param = new Object[1];
		param[0] = Integer.parseInt(formId);
		
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
	
	public Integer removeImageTempPathDetail(HashMap<String, Object> genericObj)  throws SQLException {
		
		Object[] param = new Object[1];
		param[0] = genericObj.get("submittedBy");
		String deleteQuery = genericObj.get("removeTempImagePath").toString();
		Integer rowNum = getJdbcTemplate().update(deleteQuery, param);
		return rowNum;		
	}

	@Override
	public List<String> getImagePathListforDelete(String formId, String languageName, String query) {
		List<String> imagepathList = null;
		try {
			Object[] param = new Object[2];
			param[0] = Integer.parseInt(formId);
			param[1] = languageName;
			imagepathList = jdbcTemplate.queryForList(query, param, String.class);
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
		}
		return imagepathList;
	}

	@Override
	public String checklistPublishment(String formId, String query) {

		try {
			
			Object[] param = new Object[1];
			param[0] = formId;
			getJdbcTemplate().update(query, param);
			return formId;
		} catch (Exception e) {			
			LOGGER.info(e.getMessage());
			return null;
		}
	}

	@Override
	public String checklistAuditTrail(ChecklistFormDto dto, String json, String query) {
		
		try {
			
			PGobject pg = new PGobject();
			pg.setType("json");
			pg.setValue(json);

			Object[] param = new Object[9];
			param[0] = dto.getFormId();
			param[1] = dto.getFormName();
			param[2] = dto.getFormStatus();
			param[3] = pg;
			param[4] = dto.getSubmittedBy();
			param[5] = dto.getCreatedDate();
			param[6] = dto.getFormAction();
			param[7] = dto.getDraftVersion();
			param[8] = dto.getPublishVersion();
			
			getJdbcTemplate().update(query, param);
			return dto.getFormId();
		} catch (Exception e) {			
			LOGGER.info(e.getMessage());
			return null;
		}
	}

	@Override
	public List<String> getChecklistNames(String ssoId, String role, String query) {
		
		List<String> detailDtos = new ArrayList<String>();
		Object[] param = new Object[2];		
		param[0] = ssoId;
		param[1] = role;
		
		RowMapper<String> mapper = new  RowMapper<String>() {
			
			@Override
			public String mapRow(ResultSet rst, int arg1) throws SQLException {
				return rst.getString("formname");
			}
		};
		
		detailDtos = getJdbcTemplate().query(query, param, mapper);		
		return detailDtos;
	}

	@Override
	public List<String> getChecklistVersion(String formname, String ssoId, String query, String rolename) {
		
		List<String> detailDtos = new ArrayList<String>();
		Object[] param = new Object[3];
		param[0] = ssoId;
		param[1] = rolename;
		param[2] = formname;
		
		RowMapper<String> mapper = new  RowMapper<String>() {
			
			@Override
			public String mapRow(ResultSet rst, int arg1) throws SQLException {				
				return rst.getString("publish_version");
			}
		};
		
		detailDtos = getJdbcTemplate().query(query, param, mapper);		
		return detailDtos;
	}

	@Override
	public List<RecordDTO> searchRecords(ChecklistFormDto dto, String query) {
		
		String formId = getFormId(dto);
		List<SearchRecordDTO> records = getRecords(formId,dto);
		List<SectionElement> sections = getSections(formId, dto);
		List<StepElement> steps = getSteps(formId, dto);
		List<QuestionAnswerElement> ques = getQues(formId, dto);
		List<SearchRecordComment> comments = getRecordComments(formId, dto);
		
		ArrayList<String> dummSections = new ArrayList<String>();
		List<RecordDTO> resultDTO = new ArrayList<RecordDTO>();
				
		for (SearchRecordDTO searchRecordDTO : records) {
			
			dummSections = new ArrayList<String>();
			RecordDTO recordDTO = new RecordDTO();
			recordDTO.setProjectName(searchRecordDTO.getProjectName());
			recordDTO.setRecordDate(searchRecordDTO.getRecordDate());
			recordDTO.setRecordStatus(searchRecordDTO.getRecordStatus());
			recordDTO.setRecordVersioNo(searchRecordDTO.getRecordVersioNo());
			recordDTO.setRecordName(searchRecordDTO.getRecordName());
			
			List<SearchSectionDetails> selements = new ArrayList<SearchSectionDetails>();
			for (SectionElement sectionElement : sections) {
				
				SearchSectionDetails searchSectionDetails = new SearchSectionDetails();
				if (!dummSections.contains(sectionElement.getSectionId())) {
					
					if (sectionElement.getSectionTempId().equals(searchRecordDTO.getRecordId())) {
						
						searchSectionDetails.setSectionId(sectionElement.getSectionId());
						searchSectionDetails.setSectionName(sectionElement.getSectionName());
						ArrayList<SearchStepDetails> dumy = new ArrayList<SearchStepDetails>();
						
						for (StepElement stepElement : steps) {
							
							SearchStepDetails searchStepDetails = new SearchStepDetails();
							if (sectionElement.getSectionId().equals(stepElement.getStepTempId())) {
								
								ArrayList<SearchQuestDetails> qelement = new ArrayList<SearchQuestDetails>();
								
								for (QuestionAnswerElement quesAnsElement : ques) {
									
									SearchQuestDetails searchQuestDetails = new SearchQuestDetails();
									if (quesAnsElement.getQuestionClientUid().equals(stepElement.getStepId())) {	
										
										searchQuestDetails.setQuestionId(quesAnsElement.getQuestionId());
										searchQuestDetails.setQuestionName(quesAnsElement.getQuestionName());
										searchQuestDetails.setAnswerId(quesAnsElement.getAnswerId());
										searchQuestDetails.setQuestionOrder(quesAnsElement.getQuestionOrder());
										
										StringBuilder commentString= new StringBuilder();
										StringBuilder ansDesc= new StringBuilder();
										
										for (SearchRecordComment comment : comments) {
											
											if (comment.getRecordId().equals(searchRecordDTO.getRecordId())) {
												if (comment.getQuestionId().equals(quesAnsElement.getQuestionId())) {
													
													String fg = "".equals(comment.getAnsDesc()) ? "" : comment.getAnsDesc();
													
													if("comments".equals(comment.getOrigComments())) {
														
														if (!"".equals(fg)) {
															commentString.append(comment.getAnsDesc()).append(",");
														}
													} else {
														
														if (!"".equals(fg)) {
															ansDesc.append(comment.getAnsDesc()).append(",");
														}
													}
												}
											}
										}
										searchQuestDetails.setAnswerName(quesAnsElement.getAnswerName());
										searchQuestDetails.setComments(quesAnsElement.getAnswerDescription());
										String ansDescription = ansDesc.toString();
										ansDescription = ansDescription.length() > 0 ? ansDescription.substring(0, ansDescription.length()-1) : "";
										searchQuestDetails.setAnswerName(ansDescription);
										String commDescription = commentString.toString();
										commDescription = commDescription.length() > 0 ? commDescription.substring(0, commDescription.length()-1) : "";
										searchQuestDetails.setComments(commDescription);
										qelement.add(searchQuestDetails);
									}
								}
								
								searchStepDetails.setStepId(stepElement.getStepId());
								searchStepDetails.setStepName(stepElement.getStepName());
								searchStepDetails.setSearchQuestDetails(qelement);
								dumy.add(searchStepDetails);
							}
						}
						
						searchSectionDetails.setSearchStepDetails(dumy);
						dummSections.add(sectionElement.getSectionId());
						selements.add(searchSectionDetails);
					}
				}
			}		
			
			recordDTO.setSearchSectionDetails(selements);
			resultDTO.add(recordDTO);
		}
						
		return resultDTO;
	}

	private List<SearchRecordComment> getRecordComments(String formId,
			ChecklistFormDto dto) {
		
		String query = PropertyFileReader.getInstance().getProperty("recordcomments");
		List<SearchRecordComment> detailDtos = new ArrayList<SearchRecordComment>();
		Object[] param = new Object[4];		
		param[0] = formId;
		param[1] = dto.getFormLanguage();
		param[2] = dto.getFromDate();
		param[3] = dto.getToDate();
		
		RowMapper<SearchRecordComment> mapper = new  RowMapper<SearchRecordComment>() {
			
			@Override
			public SearchRecordComment mapRow(ResultSet rst, int arg1) throws SQLException {
				
				SearchRecordComment dto = new SearchRecordComment();				
				dto.setRecordId(rst.getString(1));
				dto.setQuestionId(rst.getString(2));
				dto.setAnswerId(rst.getString(3));
				dto.setAnsDesc(rst.getString(4));
				dto.setComments(rst.getString(5));
				dto.setOrigComments(rst.getString(6));
				
				return dto;
			}
		};
		
		detailDtos = getJdbcTemplate().query(query, param, mapper);		
		return detailDtos;
	}

	private List<SearchRecordDTO> getRecords(String formId, ChecklistFormDto dto) {
		
		String query = "";
		
		List<SearchRecordDTO> detailDtos = new ArrayList<SearchRecordDTO>();
		Object[] param = new Object[4];		
		param[0] = formId;
		param[1] = dto.getFormLanguage();
		param[2] = dto.getFromDate();
		param[3] = dto.getToDate();
		
		RowMapper<SearchRecordDTO> mapper = new  RowMapper<SearchRecordDTO>() {
			
			@Override
			public SearchRecordDTO mapRow(ResultSet rst, int arg1) throws SQLException {
				
				SearchRecordDTO dto = new SearchRecordDTO();
				dto.setRecordId(rst.getString("record_id"));
				dto.setRecordDate(rst.getString("updated_date"));
				dto.setProjectName(rst.getString("project_name"));
				dto.setRecordDate(rst.getString("created_date"));
				dto.setRecordVersioNo(String.valueOf(rst.getDouble("record_version_no")));				
				dto.setRecordStatus(rst.getString("recordstatus"));
				dto.setRecordName(rst.getString("created_by_name"));
				return dto;
			}
		};
		
		if (dto.getProjectId() != null && !"".equals(dto.getProjectId())) {
			
			query = PropertyFileReader.getInstance().getProperty("records_1");
			param = new Object[5];		
			param[0] = formId;
			param[1] = dto.getFormLanguage();
			param[2] = dto.getFromDate();
			param[3] = dto.getToDate();
			param[4] = dto.getProjectId();
			
			detailDtos = getJdbcTemplate().query(query, param, mapper);		
		} else {
			query = PropertyFileReader.getInstance().getProperty("records");
			detailDtos = getJdbcTemplate().query(query, param, mapper);
		}
		
		return detailDtos;
	}

	private List<QuestionAnswerElement> getQues(String formId,
			ChecklistFormDto dto) {
		
		List<QuestionAnswerElement> detailDtos = new ArrayList<QuestionAnswerElement>();
		Object[] param = new Object[4];		
		param[0] = formId;
		param[1] = dto.getFormLanguage();
		param[2] = dto.getFromDate();
		param[3] = dto.getToDate();

		
		RowMapper<QuestionAnswerElement> mapper = new  RowMapper<QuestionAnswerElement>() {
			
			@Override
			public QuestionAnswerElement mapRow(ResultSet rst, int arg1) throws SQLException {
				
				QuestionAnswerElement dto = new QuestionAnswerElement();
				dto.setQuestionClientUid(rst.getString(1));
				dto.setQuestionId(rst.getString(2));
				dto.setQuestionName(rst.getString(3));
				dto.setAnswerId(rst.getString(4));
				dto.setAnswerName(rst.getString(5));
				dto.setQuestionOrder(rst.getString(6));
				return dto;
			}
		};
		
		detailDtos = getJdbcTemplate().query(PropertyFileReader.getInstance().getProperty("recordques"), param, mapper);
		return detailDtos;
	}

	private List<StepElement> getSteps(String formId, ChecklistFormDto dto) {
		
		List<StepElement> detailDtos = new ArrayList<StepElement>();
		Object[] param = new Object[4];		
		param[0] = formId;
		param[1] = dto.getFormLanguage();
		param[2] = dto.getFromDate();
		param[3] = dto.getToDate();

		
		RowMapper<StepElement> mapper = new  RowMapper<StepElement>() {
			
			@Override
			public StepElement mapRow(ResultSet rst, int arg1) throws SQLException {
				
				StepElement dto = new StepElement();
				dto.setStepTempId(rst.getString(1));
				dto.setStepId(rst.getString(2));
				dto.setStepName(rst.getString(3));
				return dto;
			}
		};
		
		detailDtos = getJdbcTemplate().query(PropertyFileReader.getInstance().getProperty("recordsteps"), param, mapper);
		return detailDtos;
	}

	private List<SectionElement> getSections(String formId, ChecklistFormDto dto) {
		
		List<SectionElement> detailDtos = new ArrayList<SectionElement>();
		Object[] param = new Object[4];		
		param[0] = formId;
		param[1] = dto.getFormLanguage();
		param[2] = dto.getFromDate();
		param[3] = dto.getToDate();

		
		RowMapper<SectionElement> mapper = new  RowMapper<SectionElement>() {
			
			@Override
			public SectionElement mapRow(ResultSet rst, int arg1) throws SQLException {
				
				SectionElement dto = new SectionElement();
				dto.setSectionTempId(rst.getString(1));
				dto.setSectionId(rst.getString(2));
				dto.setSectionName(rst.getString(3));
				return dto;
			}
		};
		
		detailDtos = getJdbcTemplate().query(PropertyFileReader.getInstance().getProperty("recordsections"), param, mapper);
		return detailDtos;
	}

	private String getFormId(ChecklistFormDto dto) {
		
		String query = PropertyFileReader.getInstance().getProperty("recordformid");
		String query1 = PropertyFileReader.getInstance().getProperty("recordformid_1");
		
		Object[] param = new Object[2];
		param[0] = dto.getFormName();
		param[1] = dto.getFormVersionNo();
		
		
		RowMapper<String> row = new RowMapper<String>() {
			
			@Override
			public String mapRow(ResultSet arg0, int arg1) throws SQLException {
				return arg0.getString(1);
			}
		};
		
		List<String> result = null;
		
		if (dto.getFormVersionNo().contains("d")) {
			result = getJdbcTemplate().query(query1, param, row);	
		} else {
			result = getJdbcTemplate().query(query, param, row);
		}		
		return result.get(0);
	}

	@Override
	public List<String> getSectionDetails(String formname,
			String ssoId, String version) {
		
		ChecklistFormDto dto = new ChecklistFormDto();
		dto.setFormName(formname);
		dto.setFormVersionNo(version);
		String query = PropertyFileReader.getInstance().getProperty("recordsectiondetails");
		String formId = getFormId(dto);	
		Object[] param = new Object[1];
		param[0] = formId;
		List<String> detailDtos = new ArrayList<String>();
		
		RowMapper<String> mapper = new  RowMapper<String>() {
			
			@Override
			public String mapRow(ResultSet rst, int arg1) throws SQLException {				
				return rst.getString(1);
			}
		};
		
		detailDtos = getJdbcTemplate().query(query, param, mapper);		
		return detailDtos;
	}

	@Override
	public List<EDSRDetailDTO> getChecklistProjects(String formname, String ssoId) {
		
		String applicable = getProjectApplicability("recordprojectapplicability", formname);
		
		if ("f".equals(applicable)) {
			return new ArrayList<EDSRDetailDTO>();
		}
		
		String query = PropertyFileReader.getInstance().getProperty("selectProjectNames");
		List<EDSRDetailDTO> detailDtos = new ArrayList<EDSRDetailDTO>();
		
		RowMapper<EDSRDetailDTO> mapper = new  RowMapper<EDSRDetailDTO>() {
			
			@Override
			public EDSRDetailDTO mapRow(ResultSet rst, int arg1) throws SQLException {
				
				EDSRDetailDTO dto = new EDSRDetailDTO();
				dto.setProjectId(rst.getString(2));
				dto.setProjectName(rst.getString(3));
				return dto;
			}
		};
		
		detailDtos = getJdbcTemplate().query(query, mapper);		
		return detailDtos;
	}

	private String getProjectApplicability(String query, String formname) {

		String queryString = PropertyFileReader.getInstance().getProperty(query);
		List<String> detailDtos = new ArrayList<String>();
		Object[] param = new Object[1];
		param[0] = formname;
		
		RowMapper<String> mapper = new  RowMapper<String>() {
			
			@Override
			public String mapRow(ResultSet rst, int arg1) throws SQLException {				
				return rst.getString(1);
			}
		};
		
		detailDtos = getJdbcTemplate().query(queryString, param, mapper);
		return detailDtos.get(0);
	}

	@Override
	public Map<String, List<String>> checkFormForEdit(ChecklistFormDto dto) {
		
		String queryString = PropertyFileReader.getInstance().getProperty("checkformforedit");
		String queryString1 = PropertyFileReader.getInstance().getProperty("checkformforedit_1");
		Object[] param = new Object[3];
		param[0] = dto.getSubmittedBy();
		param[1] = dto.getGroup();
		param[2] = dto.getFormName();
		
		List<String> detailDtos = new ArrayList<String>();
		RowMapper<String> mapper = new  RowMapper<String>() {
			
			@Override
			public String mapRow(ResultSet rst, int arg1) throws SQLException {				
				return rst.getString(1);
			}
		};
		
		detailDtos = getJdbcTemplate().query(queryString, param, mapper);
		
		List<String> formids = getVersionDetails(param, queryString1);
		Map<String, List<String>> result = new HashMap<String, List<String>>();
		result.put("draftCount", detailDtos);
		result.put("formIds", formids);
		return result;
	}

	private List<String> getVersionDetails(Object[] param, String queryString) {
		
		List<String> detailDtos = new ArrayList<String>();
		RowMapper<String> mapper = new  RowMapper<String>() {
			
			@Override
			public String mapRow(ResultSet rst, int arg1) throws SQLException {				
				return rst.getString(1);
			}
		};
		
		detailDtos = getJdbcTemplate().query(queryString, param, mapper);
		return detailDtos;
	}

	@Override
	public String uploadHelpImages(List<ImageDTO> dtos) {
		
		String queryString = "INSERT INTO ckschema.checklist_help_image_details(bfs_form_lang_id, association_id, help_img_url, help_text_level, help_img_thumbnail, created_by, updated_by, created_date) VALUES (?, ?, ?, ?, ?, ?, ?, now())";
		String queryString1 = "INSERT INTO ckschema.checklist_help_text_details_1(bfs_form_lang_id, help_desc, help_text_level, association_id, created_by, created_date) VALUES(?, ?, ?, ?, ?, now())";
		String deleteQuery = "delete from ckschema.checklist_help_image_details where bfs_form_lang_id=? and association_id=? and help_text_level=? and help_img_id=?";
		//String selectQuery = "select help_img_id from ckschema.checklist_help_image_details where bfs_form_lang_id=? and association_id=? and help_text_level=? limit ?";
		String selectQuery = "select a.help_img_id from (select help_img_id, ROW_NUMBER() OVER(order by help_img_id) as row_number from ckschema.checklist_help_image_details where bfs_form_lang_id=? and association_id=? and help_text_level=?) a where a.row_number=?";
		String updateQuery = "update ckschema.checklist_help_image_details set updated_by='delete' where bfs_form_lang_id=? and association_id=? and help_text_level=? and help_img_id=?";
		try {
			
			List<ImageDTO> dto = new ArrayList<ImageDTO>();
			String seqids = "";
			for (ImageDTO imageDTO : dtos) {
				
				if ("delete".equals(imageDTO.getOperation())) {					
					seqids += imageDTO.getSequanceNo() + ",";					
				} else {
					
					if (imageDTO.getThumbnailData() != null) {
						
						Object[] param = new Object[7];
						param[0] = new Long(imageDTO.getFormId());
						param[1] = new Long(imageDTO.getAssociationId());
						param[2] = imageDTO.getHelpImageUrl();
						param[3] = imageDTO.getHelpTextLevel();
						param[4] = imageDTO.getThumbnailData();
						param[5] = imageDTO.getUserSSOId();
						if ("14".equals(imageDTO.getFormStatus())) {
							param[6] = imageDTO.getOperation();
						} else {
							param[6] = "";
						}
						getJdbcTemplate().update(queryString, param);
					}
				}				
			}
			
			if (!"".equals(seqids)) {
				
				seqids = seqids.substring(0, seqids.length() - 1);
				
				String[] seqArr = seqids.split(",");
				List<String> ids = new ArrayList<String>();
				
				ImageDTO imageDTO = dtos.get(0);
				
				for (String string : seqArr) {
					
					String result = getImageIds(selectQuery,imageDTO, string);
					if (result != null) ids.add(result);					
				}
				
				for (String string : ids) {
					
					if ("14".equals(imageDTO.getFormStatus())) {
						deleteQuery = updateQuery;
					}
					Object[] param = new Object[4];
					param[0] = new Long(imageDTO.getFormId());
					
					if ("Form".equals(imageDTO.getHelpTextLevel())) {
						param[1] = new Long(imageDTO.getFormId());			
					} else {
						param[1] = new Long(imageDTO.getAssociationId());
					}

					param[2] = imageDTO.getHelpTextLevel();
					if (ids != null) {
						param[3] = new Integer(string);
						getJdbcTemplate().update(deleteQuery, param);
					}					
				}
			}
			
			updateHelpImageDescription(queryString1, dtos.get(0));			
			return "success";
		} catch (Exception e) {			
			LOGGER.info(e.getMessage());
			return null;
		}
	}

	private String getImageIds(String selectQuery, ImageDTO imageDTO, String ids) {
		
		List<String> detailDtos = new ArrayList<String>();
		
		Object[] param = new Object[4];
		param[0] = new Long(imageDTO.getFormId());
		if ("Form".equals(imageDTO.getHelpTextLevel())) {
			param[1] = new Long(imageDTO.getFormId());			
		} else {
			param[1] = new Long(imageDTO.getAssociationId());
		}
		param[2] = imageDTO.getHelpTextLevel();
		param[3] = Integer.parseInt(ids);

		RowMapper<String> mapper = new  RowMapper<String>() {
			
			@Override
			public String mapRow(ResultSet rst, int arg1) throws SQLException {				
				return rst.getString(1);
			}
		};
		
		detailDtos = getJdbcTemplate().query(selectQuery, param, mapper);
		if (detailDtos.size() == 0) {
			return null;
		}
		return detailDtos.get(0);
	}

	private void updateHelpImageDescription(String queryString,
			ImageDTO imageDTO) {
		
		String updateQuery = "update ckschema.checklist_help_text_details_1 set help_desc=? where bfs_form_lang_id=? and help_text_level=? and association_id=?";
		
		if ("update".equals(imageDTO.getImageDescFlag())) {
			
			if ("14".equals(imageDTO.getFormStatus())) {
				
				Object[] param = new Object[4];
				param[0] = imageDTO.getHelpDescription();
				param[1] = new Long(imageDTO.getFormId());
				param[2] = imageDTO.getHelpTextLevel();
				String desc = "";
				
				if ("Form".equals(imageDTO.getHelpTextLevel())) {
					param[3] = new Long(imageDTO.getFormId());	
					desc = fecthSectionLevelDesc(imageDTO.getFormId(), imageDTO.getFormId(), imageDTO.getHelpTextLevel(), imageDTO.getFormId());
				} else {
					param[3] = new Long(imageDTO.getAssociationId());
					desc = fecthSectionLevelDesc(imageDTO.getFormId(), imageDTO.getFormId(), imageDTO.getHelpTextLevel(), imageDTO.getAssociationId());
				}
				
				if (desc == null) {
					
					Object[] param1 = new Object[5];
					param1[0] = new Long(imageDTO.getFormId());
					param1[1] = imageDTO.getHelpDescription();
					param1[2] = imageDTO.getHelpTextLevel();
					if ("Form".equals(imageDTO.getHelpTextLevel())) {
						param1[3] = new Long(imageDTO.getFormId());			
					} else {
						param1[3] = new Long(imageDTO.getAssociationId());
					}
					param1[4] = imageDTO.getUserSSOId();
					getJdbcTemplate().update(queryString, param1);
				} else {
					getJdbcTemplate().update(updateQuery, param);				
				}
			} else {
			
				Object[] param = new Object[4];
				param[0] = imageDTO.getHelpDescription();
				param[1] = new Long(imageDTO.getFormId());
				param[2] = imageDTO.getHelpTextLevel();
				String desc = "";
				if ("Form".equals(imageDTO.getHelpTextLevel())) {
					param[3] = new Long(imageDTO.getFormId());			
					desc = fecthSectionLevelDesc(imageDTO.getFormId(), imageDTO.getFormId(), imageDTO.getHelpTextLevel(), imageDTO.getFormId());
				} else {
					param[3] = new Long(imageDTO.getAssociationId());
					desc = fecthSectionLevelDesc(imageDTO.getFormId(), imageDTO.getFormId(), imageDTO.getHelpTextLevel(), imageDTO.getAssociationId());
				}
				if (desc == null) {
					
					Object[] param1 = new Object[5];
					param1[0] = new Long(imageDTO.getFormId());
					param1[1] = imageDTO.getHelpDescription();
					param1[2] = imageDTO.getHelpTextLevel();
					if ("Form".equals(imageDTO.getHelpTextLevel())) {
						param1[3] = new Long(imageDTO.getFormId());			
					} else {
						param1[3] = new Long(imageDTO.getAssociationId());
					}
					param1[4] = imageDTO.getUserSSOId();
					getJdbcTemplate().update(queryString, param1);
				} else {
					getJdbcTemplate().update(updateQuery, param);				
				}
			}
		} else {
			
			Object[] param = new Object[5];
			param[0] = new Long(imageDTO.getFormId());
			param[1] = imageDTO.getHelpDescription();
			param[2] = imageDTO.getHelpTextLevel();
			if ("Form".equals(imageDTO.getHelpTextLevel())) {
				param[3] = new Long(imageDTO.getFormId());			
			} else {
				param[3] = new Long(imageDTO.getAssociationId());
			}
			param[4] = imageDTO.getUserSSOId();
			getJdbcTemplate().update(queryString, param);
		}
	}

	@Override
	public Map<String, Object> downloadHelpImages(ChecklistFormDto dto) {
		
		String query = "select help_img_thumbnail from ckschema.checklist_help_image_details where bfs_form_lang_id=? and association_id=? and help_text_level=? order by help_img_id";
		String query1 = "select help_desc from ckschema.checklist_help_text_details_1 where bfs_form_lang_id=? and association_id=? and help_text_level=?";
		
		List<String> detailDtos = new ArrayList<String>();
		
		RowMapper<String> mapper = new  RowMapper<String>() {
			
			@Override
			public String mapRow(ResultSet rst, int arg1) throws SQLException {				
				return rst.getString(1);
			}
		};
		
		Object[] param = new Object[3];
		param[0] = new Long(dto.getFormId());
		param[1] = new Long(dto.getAssociationId());
		param[2] = dto.getHelpTextLevel();
		
		detailDtos = getJdbcTemplate().query(query, param, mapper);
		List<String> descs = new ArrayList<String>();
		descs = getJdbcTemplate().query(query1, param, mapper);
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("images", detailDtos);
		if (descs.size() > 0) result.put("helpDescription", descs.get(0));
		return result;
	}

	@Override
	public String ischecklistnameexists(ChecklistFormDto dto) {
		
		
		String query = "select count(bfd_form_id) from ckschema.checklist_form_details where bfd_name=?";
		Object[] param = new Object[1];
		param[0] = dto.getFormName();
		
		List<String> detailDtos = new ArrayList<String>();
		RowMapper<String> mapper = new  RowMapper<String>() {
			
			@Override
			public String mapRow(ResultSet rst, int arg1) throws SQLException {				
				return rst.getString(1);
			}
		};
		
		detailDtos = getJdbcTemplate().query(query, param, mapper);
		return detailDtos.get(0);
	}
}
