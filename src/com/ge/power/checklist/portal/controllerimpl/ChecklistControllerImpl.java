package com.ge.power.checklist.portal.controllerimpl;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.Set;

import javax.crypto.SecretKey;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;


//import org.json.JSONObject;
//import org.json.JSONArray;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.web.bind.annotation.ResponseBody;


//import org.codehaus.jettison.json.JSONArray;
import com.ge.power.checklist.framework.SpringApplicationContext;
import com.ge.power.checklist.mobile.dto.ChecklistDetailDto;
import com.ge.power.checklist.mobile.dto.ChecklistHelpTextDTO;
import com.ge.power.checklist.mobile.dto.ChecklistRecordDTO;
import com.ge.power.checklist.mobile.dto.EDSRDetailDTO;
import com.ge.power.checklist.mobile.exceptions.ChecklistMobileExceptions;
import com.ge.power.checklist.mobile.service.ChecklistFormMgmtService;
import com.ge.power.checklist.mobile.util.ChecklistImageUtility;
import com.ge.power.checklist.portal.controller.ChecklistController;
import com.ge.power.checklist.portal.dto.BusinessHierarchyDto;
import com.ge.power.checklist.portal.dto.ChecklistComponentDto;
import com.ge.power.checklist.portal.dto.ChecklistFormDto;
import com.ge.power.checklist.portal.dto.ChecklistImages;
import com.ge.power.checklist.portal.dto.ChecklistPortalDto;
import com.ge.power.checklist.portal.dto.ChecklistPortalResponse;
import com.ge.power.checklist.portal.dto.ChecklistRequestStatus;
import com.ge.power.checklist.portal.dto.ElementArributuesProp;
import com.ge.power.checklist.portal.dto.FormDTO;
import com.ge.power.checklist.portal.dto.FormFilterSection;
import com.ge.power.checklist.portal.dto.ImageDTO;
import com.ge.power.checklist.portal.dto.PortalUserDetailDTO;
import com.ge.power.checklist.portal.dto.RecordDTO;
import com.ge.power.checklist.portal.dto.SearchQuestDetails;
import com.ge.power.checklist.portal.dto.SearchRecordDTO;
import com.ge.power.checklist.portal.dto.SearchSectionDetails;
import com.ge.power.checklist.portal.dto.SearchStepDetails;
import com.ge.power.checklist.portal.exceptions.ChecklistPortalExceptions;
import com.ge.power.checklist.portal.service.ChecklistUserService;
import com.ge.power.checklist.portal.util.ChecklistUtility;
import com.ge.power.checklist.portal.util.CommonValidation;
import com.ge.power.checklist.portal.util.HostPropertyFileReader;
import com.ge.power.checklist.portal.util.ImageUtils;

public class ChecklistControllerImpl implements ChecklistController {

	static final Logger LOGGER = Logger.getLogger(ChecklistControllerImpl.class);
	static final ResourceBundle BUNDLE = ResourceBundle.getBundle("com.ge.power.checklist.resources.config");
	
	private ChecklistUserService checklistUserService;
	private ChecklistFormMgmtService checklistFormMgmtService;

	@Override
	public String userRoleAndPermission(String ssoId, HttpHeaders headers) {
		ChecklistPortalResponse checklistPortalResponse = null;
		String result = "";
		String responseString = "";

		MultivaluedMap<String, String> headersMap = headers.getRequestHeaders();
		Set<String> headerKeys = headersMap.keySet();
		for (String key : headerKeys) {
			LOGGER.info(key + " ------ " + headers.getRequestHeader(key));
		}

		try {
			if ((ssoId == null || "".equals(ssoId))) {
				throw new ChecklistPortalExceptions("3001",
						"Invalid Input for SSo Id.");
			} /*else if (!CommonValidation.isNumeric(ssoId)) {
				throw new ChecklistPortalExceptions("3003",
						"Please enter only numeric value for SSO Id.");
			}*/

			checklistUserService = (ChecklistUserService) SpringApplicationContext
					.getBean("checklistUserServiceImpl");
			List<PortalUserDetailDTO> detailmap = checklistUserService
					.getUserRoleAndPermission(ssoId);
			
			if(detailmap == null || detailmap.size() == 0){
				throw new ChecklistPortalExceptions("3005","No Record found to display.");
				}else{

			PortalUserDetailDTO userDto = detailmap.get(0);
			Map<String, Object> jsonObject = new HashMap<String, Object>();

			jsonObject.put("ssoid", userDto.getSsoId());
			jsonObject.put("firstName", userDto.getFirstName());
			jsonObject.put("lastName", userDto.getLastName());
			jsonObject.put("roleName", userDto.getRoleName());
			jsonObject.put("isAdminPortalUser", "t".equalsIgnoreCase(userDto.getIsAdminPortalUser()) ? "TRUE" : "FALSE");
			
			checklistPortalResponse = new ChecklistPortalResponse();
			checklistPortalResponse.setResultSet(jsonObject);
			checklistPortalResponse
					.setRequestStatus(new ChecklistRequestStatus("3000",
							"SUCCESS"));
			// checklistPortalResponse.setStatusCode("200");
			// checklistPortalResponse.setErrorMsg("");
				}
		} catch (ChecklistPortalExceptions e) {
			//e.printStackTrace();
			LOGGER.info(e.getErrorMessage());
			checklistPortalResponse = new ChecklistPortalResponse();
			checklistPortalResponse.setResultSet(new HashMap<String, Object>());
			checklistPortalResponse
					.setRequestStatus(new ChecklistRequestStatus(e
							.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
			checklistPortalResponse = new ChecklistPortalResponse();
			checklistPortalResponse.setResultSet(new HashMap<String, Object>());
			checklistPortalResponse
					.setRequestStatus(new ChecklistRequestStatus("1001",
							e.getMessage()));
		}

		try {
			ObjectMapper mapper = new ObjectMapper();
			result = mapper.writeValueAsString(checklistPortalResponse);
		} catch (JsonGenerationException e) {
			LOGGER.info(e.getMessage());
		} catch (JsonMappingException e) {
			LOGGER.info(e.getMessage());
		} catch (IOException e) {
			LOGGER.info(e.getMessage());
		}
		return result;
	}

	/*@Override
	public @ResponseBody String checklistComponent() {
	ChecklistPortalResponse checklistPortalResponse = null;
	String checklistcpmponent = ""; 
	String responseString = "";
	try { 
	checklistUserService = (ChecklistUserService) SpringApplicationContext.getBean("checklistUserServiceImpl");
	List<ChecklistComponentDto> portalList = checklistUserService.checklistComponent();
	if(portalList == null || portalList.size() == 0){
	throw new ChecklistPortalExceptions("3005","No Record found to display.");
	}else{
	List<Map<String, Object>> componentList = new ArrayList<Map<String, Object>>();
	Map<String, Object> componentListJson = new HashMap<String, Object>();
	Map<String, Object> componentJson = null;
	for(ChecklistComponentDto componentDTO : portalList){
	if(componentDTO != null){
	componentJson = new HashMap<String, Object>();
	componentJson.put("elementId", componentDTO.getElementId());
	componentJson.put("elementName", componentDTO.getElementName());
	componentJson.put("elementType", componentDTO.getElementType());
	componentJson.put("elementValue", componentDTO.getElementValue());
	componentJson.put("iconName", componentDTO.getIconName());
	componentJson.put("iconImage", componentDTO.getIconImage());
	componentList.add(componentJson);
	}
	}
	componentListJson.put("componentList", componentList) ;
	checklistPortalResponse = new ChecklistPortalResponse();
	checklistPortalResponse.setResultSet(componentListJson);
	checklistPortalResponse.setRequestStatus(new ChecklistRequestStatus("3000","SUCCESS"));
	}
	} catch (ChecklistPortalExceptions e) {
	e.printStackTrace();
	checklistPortalResponse = new ChecklistPortalResponse();
	checklistPortalResponse.setResultSet(new HashMap<String, Object>());
	checklistPortalResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
	} catch (Exception e) {
	e.printStackTrace();
	checklistPortalResponse = new ChecklistPortalResponse();
	checklistPortalResponse.setResultSet(new HashMap<String, Object>());
	checklistPortalResponse.setRequestStatus(new ChecklistRequestStatus("1001","Not Able to connect with database, Please try again after some time."));
	}
	try{
	ObjectMapper mapper = new ObjectMapper();
	SecretKey secretKey = ChecklistUtility.getKey();
	checklistcpmponent = mapper.writeValueAsString(checklistPortalResponse);
	responseString = ChecklistUtility.encrypt(checklistcpmponent, secretKey);
	} catch (JsonGenerationException e) {
	e.printStackTrace();
	} catch (JsonMappingException e) {
	e.printStackTrace();
	} catch (IOException e) {
	e.printStackTrace();
	} catch (Exception e) {
	e.printStackTrace();
	}
	return checklistcpmponent;
	}*/

	
	@Override
	public List<ChecklistComponentDto> checklistComponent() {
		checklistUserService = (ChecklistUserService) SpringApplicationContext
				.getBean("checklistUserServiceImpl");
		List<ChecklistComponentDto> portalList = checklistUserService
				.checklistComponent();

		ChecklistComponentDto portalDto = portalList.get(0);
		Map<String, Object> jsonObject = new HashMap<String, Object>();

		jsonObject.put("elementId", portalDto.getElementId());
		jsonObject.put("elementName", portalDto.getElementName());
		jsonObject.put("elementType", portalDto.getElementType());
		jsonObject.put("elementValue", portalDto.getElementValue());
		jsonObject.put("iconName", portalDto.getIconName());
		jsonObject.put("iconImage", portalDto.getIconImage());

		ChecklistPortalResponse checklistPortalResponse = new ChecklistPortalResponse();
		checklistPortalResponse.setResultSet(jsonObject);
		checklistPortalResponse.setRequestStatus(new ChecklistRequestStatus(
				"3000", "SUCCESS"));
		// checklistPortalResponse.setStatusCode("200");
		// checklistPortalResponse.setErrorMsg("");

		ObjectMapper mapper = new ObjectMapper();
		String checklistcpmponent = "";
		try {
			checklistcpmponent = mapper
					.writeValueAsString(checklistPortalResponse);
		} catch (JsonGenerationException e) {
			LOGGER.info(e.getMessage());
		} catch (JsonMappingException e) {
			LOGGER.info(e.getMessage());
		} catch (IOException e) {
			LOGGER.info(e.getMessage());
		}

		return portalList;
	}
	
	
	@Override
	public List<ChecklistPortalDto> pagenationChecklist(String ssoId,
			String roleName) {

		checklistUserService = (ChecklistUserService) SpringApplicationContext
				.getBean("checklistUserServiceImpl");
		List<ChecklistPortalDto> pagelist = checklistUserService
				.pagenationChecklist(ssoId, roleName);

		ChecklistPortalDto portalDto = pagelist.get(0);

		// Map<String, Object> jsonObject = new HashMap<String, Object>();

		JSONArray respJson = new JSONArray();

		JSONObject responseDetailsJson = new JSONObject();
		for (int i = 1; i < pagelist.size(); i++) {
			
			responseDetailsJson.put("formId", portalDto.getFormId());
			responseDetailsJson.put("formName", portalDto.getFormName());
			responseDetailsJson
					.put("formLanguage", portalDto.getFormLanguage());
			responseDetailsJson
					.put("functionName", portalDto.getFunctionName());
			if (portalDto.getPublishVersion() != null) {
				responseDetailsJson.put("versionNo", portalDto.getPublishVersion());
				
			} else {
				responseDetailsJson.put("versionNo", portalDto.getDraftVersion());
			}
			responseDetailsJson.put("formStatus", portalDto.getFormStatus());
			responseDetailsJson.put("createDate", portalDto.getCreateDate());
			responseDetailsJson.put("authorname", portalDto.getAuthorname());

		}
		respJson.add(responseDetailsJson);

		// }
		respJson.toString();

		for (int i = 0; i < responseDetailsJson.size(); i++) {
			ChecklistPortalResponse checklistPortalResponse = new ChecklistPortalResponse();
			checklistPortalResponse.setResultSet(responseDetailsJson);
			checklistPortalResponse
					.setRequestStatus(new ChecklistRequestStatus("3000",
							"SUCCESS"));
			// checklistPortalResponse.setStatusCode("200");
			// checklistPortalResponse.setErrorMsg("");

			ObjectMapper mapper = new ObjectMapper();

			// String loadchecklist = "";

			try {
				String loadchecklistValue = "";
				loadchecklistValue = mapper
						.writeValueAsString(checklistPortalResponse);

			} catch (JsonGenerationException e) {
				LOGGER.info(e.getMessage());
			} catch (JsonMappingException e) {
				LOGGER.info(e.getMessage());
			} catch (IOException e) {
				LOGGER.info(e.getMessage());
			}

		}

		return pagelist;

	}
	
	
	@Override
	public List<ChecklistPortalDto> loadChecklist(String ssoId,
			String roleName, String recordCount, String pageLimit) {
		ChecklistPortalDto checklistPortalResponse = null;
		List<ChecklistPortalDto> loadchecklist = null;
		// String loadchecklistValue = "";
		try {
			if ((ssoId == null || "".equals(ssoId))) {
				throw new ChecklistPortalExceptions("3001",
						"Invalid Input for SSo Id.");
			} /*else if (!CommonValidation.isNumeric(ssoId)) {
				throw new ChecklistPortalExceptions("3003",
						"Please enter only numeric value for SSO Id.");
			} */
			if ((roleName == null || "".equals(roleName))) {
				throw new ChecklistPortalExceptions("3006",
						"Invalid Input for Role Name.");
			}
			checklistUserService = (ChecklistUserService) SpringApplicationContext
					.getBean("checklistUserServiceImpl");
			loadchecklist = checklistUserService.loadChecklist(ssoId, roleName,
					recordCount, pageLimit);
			ChecklistPortalDto portalDto = loadchecklist.get(0);
			// Map<String, Object> jsonObject = new HashMap<String, Object>();

			JSONArray respJson = new JSONArray();

			JSONObject responseDetailsJson = new JSONObject();
			for (int i = 1; i < loadchecklist.size(); i++) {
				
				responseDetailsJson.put("formId", portalDto.getFormId());
				responseDetailsJson.put("formName", portalDto.getFormName());
				responseDetailsJson.put("formLanguage",
						portalDto.getFormLanguage());
				responseDetailsJson.put("functionName",
						portalDto.getFunctionName());
				if (portalDto.getPublishVersion() != null) {
					responseDetailsJson.put("versionNo", portalDto.getPublishVersion());
					
				} else {
					responseDetailsJson.put("versionNo", portalDto.getDraftVersion());
				}
				responseDetailsJson
						.put("formStatus", portalDto.getFormStatus());
				responseDetailsJson
						.put("createDate", portalDto.getCreateDate());
				responseDetailsJson
						.put("authorname", portalDto.getAuthorname());
				responseDetailsJson.put("rownum", portalDto.getRownum());

			}
			respJson.add(responseDetailsJson);
			respJson.toString();
			checklistPortalResponse = new ChecklistPortalDto();
			checklistPortalResponse.setResultSet(responseDetailsJson);
			checklistPortalResponse
					.setRequestStatus(new ChecklistRequestStatus("3000",
							"SUCCESS"));
		} catch (ChecklistPortalExceptions e) {
			//e.printStackTrace();
			LOGGER.info(e.getErrorMessage());
			checklistPortalResponse = new ChecklistPortalDto();
			checklistPortalResponse.setResultSet(new HashMap<String, Object>());
			checklistPortalResponse
					.setRequestStatus(new ChecklistRequestStatus(e
							.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
			//e.printStackTrace();
			checklistPortalResponse = new ChecklistPortalDto();
			checklistPortalResponse.setResultSet(new HashMap<String, Object>());
			checklistPortalResponse
					.setRequestStatus(new ChecklistRequestStatus("1001",
							e.getMessage()));
		}

		try {
			ObjectMapper mapper = new ObjectMapper();
			String loadchecklistValue = "";
			loadchecklistValue = mapper
					.writeValueAsString(checklistPortalResponse);

		} catch (JsonGenerationException e) {
			LOGGER.info(e.getMessage());
		} catch (JsonMappingException e) {
			LOGGER.info(e.getMessage());
		} catch (IOException e) {
			LOGGER.info(e.getMessage());
		}

		return loadchecklist;
	}
	
	
	/*@Override
	public String loadChecklist(String ssoId,
	String roleName, String recordCount, String pageLimit) {
	ChecklistPortalResponse checklistPortalResponse = null;	
	String loadchecklistValue = "";
	String responseString = "";
	try {
	LOGGER.info("inside rest call");
	if ((ssoId == null || "".equals(ssoId))) {
	throw new ChecklistPortalExceptions("3001",
	"Invalid Input for SSo Id.");
	} else if (!CommonValidation.isNumeric(ssoId)) {
	throw new ChecklistPortalExceptions("3003",
	"Please enter only numeric value for SSO Id.");
	}
	if ((roleName == null || "".equals(roleName))) {
	throw new ChecklistPortalExceptions("3006",
	"Invalid Input for Role Name.");
	}
	LOGGER.info("inside rest call before load bean");
	checklistUserService = (ChecklistUserService) SpringApplicationContext.getBean("checklistUserServiceImpl");
	LOGGER.info("inside rest call before call db");
	List<ChecklistPortalDto> portalList = checklistUserService.loadChecklist(ssoId, roleName, recordCount, pageLimit);
	LOGGER.info("inside rest call after call db");	
	
	if(portalList == null || portalList.size() == 0){
	throw new ChecklistPortalExceptions("3005","No Record found to display.");
	}else{
	List<Map<String, Object>> loadchecklist = new ArrayList<Map<String, Object>>();
	Map<String, Object> loadListJson = new HashMap<String, Object>();
	Map<String, Object> loadJson = null;
	for(ChecklistPortalDto portalDto : portalList){
	if(portalDto != null){
	loadJson = new HashMap<String, Object>();
	loadJson.put("formName", portalDto.getFormName());
	loadJson.put("formLanguage", portalDto.getFormLanguage());
	loadJson.put("functionName", portalDto.getFunctionName());
	loadJson.put("versionNo", portalDto.getVersionNo());
	loadJson.put("formStatus", portalDto.getFormStatus());
	loadJson.put("createDate", portalDto.getCreateDate());
	loadJson.put("authorname", portalDto.getAuthorname());
	loadJson.put("rownum", portalDto.getRownum());
	loadchecklist.add(loadJson);
	}
	}
	loadListJson.put("checkList", loadchecklist) ;
	checklistPortalResponse = new ChecklistPortalResponse();
	checklistPortalResponse.setResultSet(loadListJson);
	checklistPortalResponse.setRequestStatus(new ChecklistRequestStatus("3000","SUCCESS"));
	}
	} catch (ChecklistPortalExceptions e) {
	e.printStackTrace();
	checklistPortalResponse = new ChecklistPortalResponse();
	checklistPortalResponse.setResultSet(new HashMap<String, Object>());
	checklistPortalResponse
	.setRequestStatus(new ChecklistRequestStatus(e
	.getErrorCode(), e.getErrorMessage()));
	} catch (Exception e) {
	e.printStackTrace();
	checklistPortalResponse = new ChecklistPortalResponse();
	checklistPortalResponse.setResultSet(new HashMap<String, Object>());
	checklistPortalResponse
	.setRequestStatus(new ChecklistRequestStatus("1001",
	"Not Able to connect with database, Please try again after some time."));
	}


	try {
	ObjectMapper mapper = new ObjectMapper();
	SecretKey secretKey = ChecklistUtility.getKey();	
	loadchecklistValue = mapper.writeValueAsString(checklistPortalResponse);
	responseString = ChecklistUtility.encrypt(loadchecklistValue, secretKey);


	} catch (JsonGenerationException e) {
	e.printStackTrace();
	} catch (JsonMappingException e) {
	e.printStackTrace();
	} catch (IOException e) {
	e.printStackTrace();
	} catch (Exception e) {
	e.printStackTrace();
	}


	return loadchecklistValue;
	}*/

	

	@Override
	public String deleteChecklist(String formId) {
		ChecklistPortalResponse checklistPortalResponse = null;
		// String responseString = "";
		String deletechecklist = "";
		try {
			if ((formId == null || "".equals(formId))) {
				throw new ChecklistPortalExceptions("3001","Invalid Input for formId.");
			}
			checklistUserService = (ChecklistUserService) SpringApplicationContext.getBean("checklistUserServiceImpl");
			List<ChecklistPortalDto> deletechecklistmap = checklistUserService.deleteChecklist(formId,"English");
			if(deletechecklistmap == null || deletechecklistmap.size() == 0){
				throw new ChecklistPortalExceptions("3005","No Record found to display.");
			}else{

				ChecklistPortalDto portalDto = deletechecklistmap.get(0);
				Map<String, Object> jsonObject = new HashMap<String, Object>();
	
				jsonObject.put("formStatus", portalDto.getFormStatus());
	
				checklistPortalResponse = new ChecklistPortalResponse();
				checklistPortalResponse.setResultSet(jsonObject);
				checklistPortalResponse.setRequestStatus(new ChecklistRequestStatus("3000","SUCCESS"));
			}

		} catch (ChecklistPortalExceptions e) {
			//e.printStackTrace();
			LOGGER.info(e.getErrorMessage());
			checklistPortalResponse = new ChecklistPortalResponse();
			checklistPortalResponse.setResultSet(new HashMap<String, Object>());
			checklistPortalResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
			checklistPortalResponse = new ChecklistPortalResponse();
			checklistPortalResponse.setResultSet(new HashMap<String, Object>());
			checklistPortalResponse.setRequestStatus(new ChecklistRequestStatus("1001",e.getMessage()));
		}
		try {
			ObjectMapper mapper = new ObjectMapper();
			deletechecklist = mapper
					.writeValueAsString(checklistPortalResponse);
		} catch (JsonGenerationException e) {
			LOGGER.info(e.getMessage());
		} catch (JsonMappingException e) {
			LOGGER.info(e.getMessage());
		} catch (IOException e) {
			LOGGER.info(e.getMessage());
		}

		return deletechecklist;
	}

	

	@Override
	//
	public String businessHierarchyDetail(String ssoId, String roleName, String groupId, String dropValue,HttpHeaders headers) {
		ChecklistPortalResponse checklistPortalResponse = null;
		//List<BusinessHierarchyDto> subfunctionlist = null;
		String result = "";
		String responseString = "";
		MultivaluedMap<String, String> headersMap = headers.getRequestHeaders();
		Set<String> headerKeys = headersMap.keySet();
		for (String key : headerKeys) {
			LOGGER.info(key + " ------ " + headers.getRequestHeader(key));
		}
		try {
			if ((ssoId == null || "".equals(ssoId))) {
				throw new ChecklistPortalExceptions("3001","Invalid Input for SSo Id.");
			}
			/*if (!CommonValidation.isNumeric(ssoId)) {
				throw new ChecklistPortalExceptions("3003","Please enter only numeric value for SSO Id.");
			} */
			if ((roleName == null || "".equals(roleName))) {
				throw new ChecklistPortalExceptions("3001","Invalid Input for Role Name.");
			}
			//
			if ("GroupAdmin".equals(roleName) ) {
				/*checklistUserService = (ChecklistUserService) SpringApplicationContext.getBean("checklistUserServiceImpl");
				
				List<BusinessHierarchyDto> busHierarchy = checklistUserService.businessHierarchyDetail(ssoId, roleName);
				if ((busHierarchy != null && busHierarchy.size() > 0)) {
	
					Map<String, Object> checklistObj = null;
					Map<String, Object> functionObj = null;
					Map<String, Object> subFunctionObj = null;
					List<Map<String, Object>> functionElement = new ArrayList<Map<String, Object>>();
					List<Map<String, Object>> subFunctionElement = new ArrayList<Map<String, Object>>();
	
					for (int i = 0; i < busHierarchy.size(); i++) {
						BusinessHierarchyDto dto = busHierarchy.get(i);
						subFunctionObj = new HashMap<String, Object>();
	
					for (int k = 0; k < busHierarchy.size(); k++) {
						BusinessHierarchyDto dtoGroup = busHierarchy.get(k);
						subFunctionObj = new HashMap<String, Object>();
						
						String finalGroupId = "";
						List<BusinessHierarchyDto> group = null;
						if("function".equalsIgnoreCase(dropValue)){
							finalGroupId = dtoGroup.getFunctionId();
							group = checklistUserService.subFunctionChecklist(finalGroupId, ssoId, "subfunction");
						}else{
							finalGroupId = groupId;
							group = checklistUserService.subFunctionChecklist(finalGroupId, "subfunction");
						}
						
						if((group != null && group.size() > 0)){
							for (int ind = 0; ind < group.size(); ind++) {
								BusinessHierarchyDto checkdto = group.get(ind);
								checklistObj = new HashMap<String, Object>();
								checklistObj.put("groupId", checkdto.getSubFunctionId());
								//LOGGER.info("In Last loop----------" + checkdto.getSubFunctionId());
								checklistObj.put("groupName",checkdto.getSubFunctionName());
								//LOGGER.info("In Last loop----------"+ checkdto.getSubFunctionName());
								subFunctionElement.add(checklistObj);
							}
						}
						
					}
					
					functionObj = new HashMap<String, Object>();
					BusinessHierarchyDto dtoGroup = busHierarchy.get(0);
					subFunctionObj.put("FunctionId",dtoGroup.getFunctionId());
					subFunctionObj.put("FunctionName",dtoGroup.getFunctionName());
					subFunctionObj.put("subFunctionElement",subFunctionElement);
					functionElement.add(subFunctionObj);
					functionObj.put("functionElement", functionElement);
					checklistPortalResponse = new ChecklistPortalResponse();
					checklistPortalResponse.setResultSet(functionObj);
					checklistPortalResponse.setRequestStatus(new ChecklistRequestStatus("3000", "SUCCESS"));
	
				}
				else {
					throw new ChecklistPortalExceptions("3005","No Record found to display.");
				}*/
				Map<String, Object> checklistObj = null;
				Map<String, Object> subFunctionObj = null;
				List<Map<String, Object>> subFunctionElement = new ArrayList<Map<String, Object>>();
				checklistUserService = (ChecklistUserService) SpringApplicationContext.getBean("checklistUserServiceImpl");
				//LOGGER.info("inside rest call before call db");
				List<BusinessHierarchyDto> subfunctionlist = checklistUserService.subFunctionChecklist(groupId, dropValue);
				//LOGGER.info("inside rest call after call db");				
			
				subFunctionObj = new HashMap<String, Object>();				
				if((subfunctionlist != null && subfunctionlist.size() > 0)){

				for (int ind = 0; ind < subfunctionlist.size(); ind++) {
					BusinessHierarchyDto checkdto = subfunctionlist.get(ind);
					checklistObj = new HashMap<String, Object>();
					checklistObj.put("groupId",	checkdto.getSubFunctionId());
					checklistObj.put("groupName", checkdto.getSubFunctionName());
					subFunctionElement.add(checklistObj);
				}
				}
				subFunctionObj.put("subFunctionElement", subFunctionElement);

				checklistPortalResponse = new ChecklistPortalResponse();
				checklistPortalResponse.setResultSet(subFunctionObj);
				checklistPortalResponse.setRequestStatus(new ChecklistRequestStatus("3000", "SUCCESS"));
			
			}
			else {
				//LOGGER.info("groupId--- "+groupId+" dropValue----- "+dropValue);
				Map<String, Object> checklistObj = null;
				Map<String, Object> subFunctionObj = null;
				List<Map<String, Object>> subFunctionElement = new ArrayList<Map<String, Object>>();
				checklistUserService = (ChecklistUserService) SpringApplicationContext.getBean("checklistUserServiceImpl");
				//LOGGER.info("inside rest call before call db");
				List<BusinessHierarchyDto> subfunctionlist = checklistUserService.subFunctionChecklist(groupId, dropValue);
				//LOGGER.info("inside rest call after call db");				
			
				subFunctionObj = new HashMap<String, Object>();				
				if((subfunctionlist != null && subfunctionlist.size() > 0)){

				for (int ind = 0; ind < subfunctionlist.size(); ind++) {
					BusinessHierarchyDto checkdto = subfunctionlist.get(ind);
					checklistObj = new HashMap<String, Object>();
					checklistObj.put("groupId",	checkdto.getSubFunctionId());
					checklistObj.put("groupName", checkdto.getSubFunctionName());
					subFunctionElement.add(checklistObj);
				}
				}
				subFunctionObj.put("subFunctionElement", subFunctionElement);

				checklistPortalResponse = new ChecklistPortalResponse();
				checklistPortalResponse.setResultSet(subFunctionObj);
				checklistPortalResponse.setRequestStatus(new ChecklistRequestStatus("3000", "SUCCESS"));
		}
			//Super User*****************************************************************
			
			
		
			
			
			

		} catch (ChecklistPortalExceptions e) {
			//e.printStackTrace();
			LOGGER.info(e.getErrorMessage());
			checklistPortalResponse = new ChecklistPortalResponse();
			checklistPortalResponse.setResultSet(new HashMap<String, Object>());
			checklistPortalResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
			checklistPortalResponse = new ChecklistPortalResponse();
			checklistPortalResponse.setResultSet(new HashMap<String, Object>());
			checklistPortalResponse.setRequestStatus(new ChecklistRequestStatus("1001",e.getMessage()));
		}		
		
		try {
			ObjectMapper mapper = new ObjectMapper();
			SecretKey secretKey = ChecklistUtility.getKey();
			result = mapper.writeValueAsString(checklistPortalResponse);
			responseString = ChecklistUtility.encrypt(result, secretKey);
		} catch (JsonGenerationException e) {
			LOGGER.info(e.getMessage());
		} catch (JsonMappingException e) {
			LOGGER.info(e.getMessage());
		} catch (IOException e) {
			LOGGER.info(e.getMessage());
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
		}
		return result;
	}
	

	@Override
	public List<ChecklistPortalDto> searchChecklistForm(String ssoId,
			String roleName, String checklistName, String checklistTitle) {		

		ChecklistPortalDto checklistPortalResponse = null;
		List<ChecklistPortalDto> searchform = null;
		// String loadchecklistValue = "";
		try {
			if ((ssoId == null || "".equals(ssoId))) {
				throw new ChecklistPortalExceptions("3001",
						"Invalid Input for SSo Id.");
			} /*else if (!CommonValidation.isNumeric(ssoId)) {
				throw new ChecklistPortalExceptions("3003",
						"Please enter only numeric value for SSO Id.");
			}*/
			if ((roleName == null || "".equals(roleName))) {
				throw new ChecklistPortalExceptions("3006",
						"Invalid Input for Role Name.");
			}
			
			if ("%2E".equals(checklistName)) {
				checklistName = ".";
			}
			
			checklistUserService = (ChecklistUserService) SpringApplicationContext
					.getBean("checklistUserServiceImpl");
			searchform = checklistUserService.searchChecklistForm(ssoId,
					roleName, checklistName, checklistTitle);
			
			if(searchform == null || searchform.size() == 0){
				throw new ChecklistPortalExceptions("3005","No Record found to display.");
				}else{
			
			ChecklistPortalDto portalDto = searchform.get(0);
			// Map<String, Object> jsonObject = new HashMap<String, Object>();

			JSONArray respJson = new JSONArray();

			JSONObject responseDetailsJson = new JSONObject();
			for (int i = 1; i < searchform.size(); i++) {
				// for (ChecklistPortalDto formVal : loadchecklistmap){
				responseDetailsJson.put("formName", portalDto.getFormName());
				responseDetailsJson.put("formLanguage",
						portalDto.getFormLanguage());
				responseDetailsJson.put("functionName",
						portalDto.getFunctionName());
				responseDetailsJson.put("versionNo", portalDto.getVersionNo());
				responseDetailsJson
						.put("formStatus", portalDto.getFormStatus());
				responseDetailsJson
						.put("createDate", portalDto.getCreateDate());
				responseDetailsJson
						.put("authorname", portalDto.getAuthorname());
				//responseDetailsJson.put("rownum", portalDto.getRownum());

			}
			respJson.add(responseDetailsJson);
			respJson.toString();
			checklistPortalResponse = new ChecklistPortalDto();
			checklistPortalResponse.setResultSet(responseDetailsJson);
			checklistPortalResponse
					.setRequestStatus(new ChecklistRequestStatus("3000",
							"SUCCESS"));
				}
		} catch (ChecklistPortalExceptions e) {
			LOGGER.info(e.getErrorMessage());
			checklistPortalResponse = new ChecklistPortalDto();
			checklistPortalResponse.setResultSet(new HashMap<String, Object>());
			checklistPortalResponse
					.setRequestStatus(new ChecklistRequestStatus(e
							.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
			checklistPortalResponse = new ChecklistPortalDto();
			checklistPortalResponse.setResultSet(new HashMap<String, Object>());
			checklistPortalResponse
					.setRequestStatus(new ChecklistRequestStatus("1001",
							e.getMessage()));
		}

		try {
			ObjectMapper mapper = new ObjectMapper();
			String loadchecklistValue = "";
			loadchecklistValue = mapper
					.writeValueAsString(checklistPortalResponse);

		} catch (JsonGenerationException e) {
			LOGGER.info(e.getMessage());
		} catch (JsonMappingException e) {
			LOGGER.info(e.getMessage());
		} catch (IOException e) {
			LOGGER.info(e.getMessage());
		}

		return searchform;

	}	
	
	@Override
	public @ResponseBody String validationRuleList(HttpHeaders headers) {
		ChecklistPortalDto checklistResponse = null;
		String result=""; 
		String responseString = "";
		
		MultivaluedMap<String, String> headersMap = headers.getRequestHeaders();
		Set<String>headerKeys = headersMap.keySet();
		for(String key:headerKeys){
			LOGGER.info(key +" ------ "+headers.getRequestHeader(key));
		}
		try {
			/*if((elementId == null || "".equals(elementId))){
				throw new ChecklistPortalExceptions("3001","Invalid Input for element Id.");
			} else if(!CommonValidation.isNumeric(elementId)){
				throw new ChecklistPortalExceptions("3003","Please enter only numeric value for element Id.");
			}
			else{*/
			checklistUserService = (ChecklistUserService) SpringApplicationContext.getBean("checklistUserServiceImpl");
			Map<String, Object> checklistmap = checklistUserService.getValidationRuleList("");
			
			if(checklistmap == null || checklistmap.size() == 0){
				throw new ChecklistPortalExceptions("3005","No Record found to display.");
			}else{
				
				/*List<Map<String, Object>> ruleList = new ArrayList<Map<String, Object>>();
				Map<String, Object> ruleListJson = new HashMap<String, Object>();
				Map<String, Object> ruleJson = null;
				for(ChecklistValidationRuleDTO ruleDTO : checklistmap){
					if(ruleDTO != null){
						ruleJson = new HashMap<String, Object>();
						ruleJson.put("ruleId", ruleDTO.getRuleId());
						ruleJson.put("ruleName", ruleDTO.getRuleName());
						ruleJson.put("ruleDesc", ruleDTO.getRuleDescription());
						ruleJson.put("ruleCategory", ruleDTO.getRuleCategory());
						ruleList.add(ruleJson);
					}
				}
				
				ruleListJson.put("ruleList", ruleList)	;*/
			checklistResponse = new ChecklistPortalDto();
			checklistResponse.setResultSet(checklistmap);
			checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000","SUCCESS"));
		}
			
		//}
		
	} catch (ChecklistPortalExceptions e) {
		//e.printStackTrace();
		LOGGER.info(e.getErrorMessage());
		checklistResponse = new ChecklistPortalDto();
		checklistResponse.setResultSet(new HashMap<String, Object>());
		checklistResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
	} catch (Exception e) {
		//e.printStackTrace();
		LOGGER.info(e.getMessage());
		checklistResponse = new ChecklistPortalDto();
		checklistResponse.setResultSet(new HashMap<String, Object>());
		checklistResponse.setRequestStatus(new ChecklistRequestStatus("1001",e.getMessage()));
	}
	
	try{
		ObjectMapper mapper = new ObjectMapper();
		SecretKey secretKey = ChecklistUtility.getKey();
		result=mapper.writeValueAsString(checklistResponse);
		responseString = ChecklistUtility.encrypt(result, secretKey);
	} catch (JsonGenerationException e) {
		LOGGER.info(e.getMessage());
	} catch (JsonMappingException e) {
		LOGGER.info(e.getMessage());
	} catch (IOException e) {
		LOGGER.info(e.getMessage());
	} catch (Exception e) {
		LOGGER.info(e.getMessage());
	}
	
	return result;
	}

	
	
	@Override
	public @ResponseBody String propertiesList(String elementId,	HttpHeaders headers) {
		ChecklistPortalDto checklistResponse = null;
		String result=""; 
		String responseString = "";
		
		MultivaluedMap<String, String> headersMap = headers.getRequestHeaders();
		Set<String>headerKeys = headersMap.keySet();
		for(String key:headerKeys){			
			LOGGER.info(key +" ------ "+headers.getRequestHeader(key));
		}
		try {
			if((elementId == null || "".equals(elementId))){
				throw new ChecklistPortalExceptions("3001","Invalid Input for element Id.");
			} else if(!CommonValidation.isNumeric(elementId)){
				throw new ChecklistPortalExceptions("3003","Please enter only numeric value for element Id.");
			}
			else{
				checklistUserService = (ChecklistUserService) SpringApplicationContext.getBean("checklistUserServiceImpl");
				List<ElementArributuesProp> checklistmap = checklistUserService.getPropertiesList(elementId);
				
				if(checklistmap == null || checklistmap.size() == 0){
					throw new ChecklistPortalExceptions("3005","No Record found to display.");
				}else{
					
					List<Map<String, Object>> propertiesList = new ArrayList<Map<String, Object>>();
					Map<String, Object> propertiesListJson = new HashMap<String, Object>();
					Map<String, Object> propertiesJson = null;
					for(ElementArributuesProp proDTO : checklistmap){
						if(proDTO != null){
							propertiesJson = new HashMap<String, Object>();
							propertiesJson.put("attributeId", proDTO.getAttributeId());
							propertiesJson.put("attributeName", proDTO.getAttributeName());	
							propertiesJson.put("isMendatory", proDTO.getIsMendatory());
							propertiesJson.put("defaultValues", proDTO.getDefaultValue());
							propertiesList.add(propertiesJson);
						}
					}
					
					propertiesListJson.put("propertiesList", propertiesList)	;
				checklistResponse = new ChecklistPortalDto();
				checklistResponse.setResultSet(propertiesListJson);
				checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000","SUCCESS"));
			}
			
		}
		
	} catch (ChecklistPortalExceptions e) {
		//e.printStackTrace();
		LOGGER.info(e.getErrorMessage());
		checklistResponse = new ChecklistPortalDto();
		checklistResponse.setResultSet(new HashMap<String, Object>());
		checklistResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
	} catch (Exception e) {
		//e.printStackTrace();
		LOGGER.info(e.getMessage());
		checklistResponse = new ChecklistPortalDto();
		checklistResponse.setResultSet(new HashMap<String, Object>());
		checklistResponse.setRequestStatus(new ChecklistRequestStatus("1001",e.getMessage()));
	}
	
	try{
		ObjectMapper mapper = new ObjectMapper();
		SecretKey secretKey = ChecklistUtility.getKey();
		result=mapper.writeValueAsString(checklistResponse);
		responseString = ChecklistUtility.encrypt(result, secretKey);
	} catch (JsonGenerationException e) {
		LOGGER.info(e.getMessage());
	} catch (JsonMappingException e) {
		LOGGER.info(e.getMessage());
	} catch (IOException e) {
		LOGGER.info(e.getMessage());
	} catch (Exception e) {
		LOGGER.info(e.getMessage());
	}
	
	return result;
	}
	
	
	@Override
	public @ResponseBody String saveMetadata(ChecklistFormDto jsonObject, HttpHeaders headers) {
		ChecklistPortalDto checklistResponse = null;
		String result=""; 
		String responseString = "";
		String oldFormId = jsonObject.getFormId();
		MultivaluedMap<String, String> headersMap = headers.getRequestHeaders();
		Set<String>headerKeys = headersMap.keySet();
		for(String key:headerKeys){			
			LOGGER.info(key +" ------ "+headers.getRequestHeader(key));
		}
		try {	
			long s=System.currentTimeMillis();
				checklistUserService = (ChecklistUserService) SpringApplicationContext.getBean("checklistUserServiceImpl");
				Map<String, Object> saveMetadata = checklistUserService.saveMetadata(jsonObject);
				String action = "Created";
				
				if (jsonObject.getFormId() != null && jsonObject.getBaseFormId() == null) {
					
					action = "Updated";
					checklistUserService.deleteChecklist(oldFormId, jsonObject.getFormLanguage());
				}
				
				String formId = ((ChecklistFormDto)saveMetadata.get("result")).getFormId();
				/*String json = checklistMetadataForEdit(formId, headers);
				ObjectMapper mapper = new ObjectMapper();
				Map<String, Object>  obj = mapper.readValue(json, Map.class);
				Map<String, Object> json1 = (Map) obj.get("resultSet");
				jsonObject.setFormAction(action);
				jsonObject.setDraftVersion(json1.get("draftVersion") == null ? null : json1.get("draftVersion").toString());
				jsonObject.setPublishVersion(json1.get("publishVersion") == null ? null : json1.get("publishVersion").toString());
				jsonObject.setFormStatus(json1.get("formStatus") == null ? null : json1.get("formStatus").toString());
				jsonObject.setFormId(formId);
				checklistUserService.checklistAuditTrail(jsonObject, json);*/
					
				long t=System.currentTimeMillis()-s;
				
				Map<String, Object> responseMetadata = new HashMap<String, Object>();
				responseMetadata.put("FormId",formId);
				//responseMetadata.put("originalIds",saveMetadata.get("original"));
				//responseMetadata.put("tempIds", saveMetadata.get("temp"));
						
				checklistResponse = new ChecklistPortalDto();
				checklistResponse.setResultSet(responseMetadata);
				checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000","SUCCESS"));			
		
		
	} catch (ChecklistPortalExceptions e) {
		LOGGER.info(e.getErrorMessage());
		checklistResponse = new ChecklistPortalDto();
		checklistResponse.setResultSet(new HashMap<String, Object>());
		checklistResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
	} catch (Exception e) {
		LOGGER.info(e.getMessage());
		checklistResponse = new ChecklistPortalDto();
		checklistResponse.setResultSet(new HashMap<String, Object>());
		checklistResponse.setRequestStatus(new ChecklistRequestStatus("1006","Error in insert metadata"));
	}
	
	try{
		ObjectMapper mapper = new ObjectMapper();
		SecretKey secretKey = ChecklistUtility.getKey();
		result=mapper.writeValueAsString(checklistResponse);
		responseString = ChecklistUtility.encrypt(result, secretKey);
	} catch (JsonGenerationException e) {
		LOGGER.info(e.getMessage());
	} catch (JsonMappingException e) {
		LOGGER.info(e.getMessage());
	} catch (IOException e) {
		LOGGER.info(e.getMessage());
	} catch (Exception e) {
		LOGGER.info(e.getMessage());
	}
	
	return result;
	}
	

	
	@Override	
	public String filterSectionStepQues(FormFilterSection jsonObject, HttpHeaders headers) {
		
		ChecklistPortalResponse checklistPortalResponse = null;		
		String result = "";
		String responseString = "";		
		try {
			checklistUserService = (ChecklistUserService) SpringApplicationContext.getBean("checklistUserServiceImpl");
			Map<String, Object> checklistObj = null;
			Map<String, Object> sectionObj = null;			
			List<Map<String, Object>> sectionElement = new ArrayList<Map<String, Object>>();			 
			checklistObj = new HashMap<String, Object>();
			sectionObj = new HashMap<String, Object>();
			
			if("Sections".equals(jsonObject.getDropValue())){
						
			List<FormFilterSection> fetchSection = checklistUserService.sectionDetail(jsonObject);		
						
			for(FormFilterSection dtoQues : fetchSection){
				if(dtoQues != null){
					sectionObj = new HashMap<String, Object>();					
					sectionObj.put("sectionId", dtoQues.getSectionId());
					sectionObj.put("sectionName", dtoQues.getSectionName());
					sectionElement.add(sectionObj);
				}
				
			}
			checklistObj.put("sectionElement", sectionElement);
			}else if("Steps".equals(jsonObject.getDropValue())){
				
					List<FormFilterSection> fetchStep = checklistUserService.stepDetail(jsonObject);					
					
					for(FormFilterSection dtoQues : fetchStep){
						if(dtoQues != null){
						sectionObj = new HashMap<String, Object>();						
						sectionObj.put("stepId", dtoQues.getStepId());
						sectionObj.put("stepName", dtoQues.getStepName());
						sectionElement.add(sectionObj);
						}
						
					}
				checklistObj.put("stepElement", sectionElement);
			}else if("Questions".equals(jsonObject.getDropValue())){		
				
						List<FormFilterSection> fetchQues = checklistUserService.quesDetail(jsonObject);	
						
						for(FormFilterSection dtoQues : fetchQues){
							if(dtoQues != null){
								sectionObj = new HashMap<String, Object>();
								sectionObj.put("questionId", dtoQues.getQuestionId());
								sectionObj.put("questionName", dtoQues.getQuestionName());	
								sectionElement.add(sectionObj);
								
							}
						}
						
						checklistObj.put("questionElement", sectionElement);
			}
			else {
				throw new ChecklistPortalExceptions("3005",
						"No Record found to display.");
			}						
				checklistPortalResponse = new ChecklistPortalResponse();
				checklistPortalResponse.setResultSet(checklistObj);
				checklistPortalResponse.setRequestStatus(new ChecklistRequestStatus("3000", "SUCCESS"));

		

		} catch (ChecklistPortalExceptions e) {
			LOGGER.info(e.getErrorMessage());
			checklistPortalResponse = new ChecklistPortalResponse();
			checklistPortalResponse.setResultSet(new HashMap<String, Object>());
			checklistPortalResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
			checklistPortalResponse = new ChecklistPortalResponse();
			checklistPortalResponse.setResultSet(new HashMap<String, Object>());
			checklistPortalResponse.setRequestStatus(new ChecklistRequestStatus("1001",	"Not Able to connect with database, Please try again after some time."));
		}		
		
		try {
			ObjectMapper mapper = new ObjectMapper();
			SecretKey secretKey = ChecklistUtility.getKey();
			result = mapper.writeValueAsString(checklistPortalResponse);
			responseString = ChecklistUtility.encrypt(result, secretKey);
		} catch (JsonGenerationException e) {
			LOGGER.info(e.getMessage());
		} catch (JsonMappingException e) {
			LOGGER.info(e.getMessage());
		} catch (IOException e) {
			LOGGER.info(e.getMessage());
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
		}
		return result;
	}

	@Override
	public @ResponseBody String checklistMetadataForEdit(String formId, @Context HttpHeaders headers) {

		ChecklistPortalResponse checklistResponse = null;
		String result=""; 
		String responseString = "";
		
		MultivaluedMap<String, String> headersMap = headers.getRequestHeaders();
		Set<String>headerKeys = headersMap.keySet();
		for(String key:headerKeys){
			LOGGER.info(key +" ------ "+headers.getRequestHeader(key));
		}
		try {
			
			if((formId == null || "".equals(formId))){
				throw new ChecklistMobileExceptions("3001","Invalid Input for Form Id.");
			} else if(!CommonValidation.isNumeric(formId)){
				throw new ChecklistMobileExceptions("3003","Please enter only numeric value for From Id.");
			} else{
				checklistUserService = (ChecklistUserService) SpringApplicationContext.getBean("checklistUserServiceImpl");

				ChecklistDetailDto fromDtail = checklistUserService.getChecklistFormDetailfromId(formId);
				List<ChecklistDetailDto> checklistmap = checklistUserService.getChecklistMetadataForEdit(formId);
				
				if(checklistmap == null || checklistmap.size() == 0){
					throw new ChecklistMobileExceptions("3005","No Record found to display.");
				}else{
					
					Map<String, Object> formJson = new HashMap<String, Object>();
					List<Map<String, Object>> formElement = new ArrayList<Map<String, Object>>();
					List<Map<String, Object>> sectionElement = null;
					List<Map<String, Object>> stepElement = null;
					List<Map<String, Object>> ruleList = null;
					List<Map<String, Object>> helpTextList = null;
					List<Map<String, Object>> sectionHelpTextList = null;
					List<Map<String, Object>> stepHelpTextList = null;
					List<Map<String, Object>> queElementList = null;
					List<Map<String, Object>> ansElementList = null;
					List<Map<String, Object>> elemAttribList = null;
					
					Map<String, Object> helpTextObject = null;
					
					formJson.put("formId", formId);
					formJson.put("formName", fromDtail.getFormName());
					formJson.put("sectionCount", fromDtail.getAttributeCount());
					formJson.put("formStatus", fromDtail.getFormStatus());
					formJson.put("functionName", fromDtail.getFunctionName());
					formJson.put("subFunctionName", fromDtail.getSubFunctionName());
					formJson.put("groupName", fromDtail.getGroupName());
					formJson.put("publishVersion", fromDtail.getPublishVersion());
					formJson.put("draftVersion", fromDtail.getDraftVersion());
					formJson.put("baseFormId", fromDtail.getBaseFormId());
					formJson.put("groupId", fromDtail.getGroupId());
					formJson.put("assignedToProject", fromDtail.getAssignedToProject());
					
					String []formHelpStr = ChecklistUtility.getValidData(fromDtail.getFormHelpTextDetail());
					helpTextList = new ArrayList<Map<String, Object>>();
					if(formHelpStr != null && !"".equals(formHelpStr) && formHelpStr.length >0){
						for(int ind=0; ind < formHelpStr.length; ind++){
							String []elemArray = formHelpStr[ind].split("#");
							if(elemArray != null && elemArray.length >=3){
								helpTextObject = new HashMap<String, Object>();
								String helpTextId = ChecklistUtility.getSubString(elemArray[0], "(", "");
								String helpTextDesc = ChecklistUtility.getSubString(elemArray[1], "(", "");
								String helpImageUrl = ChecklistUtility.replaceCharToString(elemArray[2], ")", "");
								helpTextObject.put("helpTextId", helpTextId);
								helpTextObject.put("helpTextDesc", helpTextDesc);
								helpTextObject.put("imageUrl", helpImageUrl);
								helpTextList.add(helpTextObject);
							}
						}
					} else{
						helpTextList.add(new HashMap<String, Object>());
					}
					
					formJson.put("formHelpText", helpTextList);
					
					for(ChecklistDetailDto detailDto : checklistmap){
						if(detailDto != null){
							String []convertedStr = ChecklistUtility.getValidDataWithSpace(detailDto.getStepLabel());
							sectionElement = new ArrayList<Map<String, Object>>();
							Map<String, Object> jsonObject = new HashMap<String, Object>();
							
							jsonObject.put("sectionId", detailDto.getSectionId() != null ? detailDto.getSectionId() : "");
							jsonObject.put("sectionName", detailDto.getSectionName() != null ? detailDto.getSectionName() : "");
							jsonObject.put("sectionlabel", detailDto.getSectionLabel() != null ? detailDto.getSectionLabel() : "");
							jsonObject.put("stepCount", convertedStr.length+"");
							
							String []sectionHelpStr = ChecklistUtility.getValidData(detailDto.getSectionHelpTextDetail());
							sectionHelpTextList = new ArrayList<Map<String, Object>>();
							if(sectionHelpStr != null && !"".equals(sectionHelpStr) && sectionHelpStr.length >0){
								for(int ind=0; ind < sectionHelpStr.length; ind++){
									String []elemArray = sectionHelpStr[ind].split("#");
									if(elemArray != null && elemArray.length >=3){
										helpTextObject = new HashMap<String, Object>();
										String helpTextId = ChecklistUtility.getSubString(elemArray[0], "(", "");
										String helpTextDesc = ChecklistUtility.getSubString(elemArray[1], "(", "");
										String helpImageUrl = ChecklistUtility.replaceCharToString(elemArray[2], ")", "");
										helpTextObject.put("helpTextId", helpTextId);
										helpTextObject.put("helpTextDesc", helpTextDesc);
										helpTextObject.put("imageUrl", helpImageUrl);
										sectionHelpTextList.add(helpTextObject);
									}
								}
							} else{
								sectionHelpTextList.add(new HashMap<String, Object>());
							}
							jsonObject.put("sectionHelpText", sectionHelpTextList);
							if(convertedStr != null && !"".equals(convertedStr) && convertedStr.length >0){
								
								for(int i=0;i<convertedStr.length; i++){
									Map<String, Object> stepJson = new HashMap<String, Object>();
									
									String []stepArray = convertedStr[i].split(",");
									String stepId1 = ChecklistUtility.getSubString(stepArray[0], "(", "");
									String stepId = ChecklistUtility.getSubString(stepId1, "{", "");
									String stepLabel = "";
									stepHelpTextList = new ArrayList<Map<String, Object>>();
									if (stepArray.length >= 3) {
										//ArrayList<Map<String, Object>> stepHelpImageList = null;
										stepLabel = stepArray[1];
										for(int m = 2; m<stepArray.length; m++){
											String stepHelp = ChecklistUtility.getSubString(stepArray[m], ")", "");
											//String []stepHelpStr = ChecklistUtility.getValidData(stepHelp);
											//stepHelpImageList = new ArrayList<Map<String, Object>>();
											if(stepHelp != null && !"".equals(stepHelp)){
												//for(int ind=0; ind < stepHelpStr.length; ind++){
												String []elemArray = stepHelp.split("#");
												if(elemArray != null && elemArray.length >=3){
													helpTextObject = new HashMap<String, Object>();
													String helpTextId1 = ChecklistUtility.getSubString(elemArray[0], "(", "");
													String helpTextId = ChecklistUtility.getSubString(helpTextId1, "{", "");
													String helpTextDesc = ChecklistUtility.getSubString(elemArray[1], "(", "");
													String helpImageUrl1 = ChecklistUtility.replaceCharToString(elemArray[2], ")", "");
													String helpImageUrl = ChecklistUtility.replaceCharToString(helpImageUrl1, "}", "");
													helpTextObject.put("helpTextId", helpTextId);
													helpTextObject.put("helpTextDesc", helpTextDesc);
													helpTextObject.put("imageUrl", helpImageUrl);
													stepHelpTextList.add(helpTextObject);
												}
												//}
											} else{
												stepHelpTextList.add(new HashMap<String, Object>());
											}
										}
										
										
									} else {
										stepHelpTextList.add(new HashMap<String, Object>());
									}
									
									List<ChecklistRecordDTO> stepDetailList = null;
									if(stepId != null && !"".equals(stepId) && !"\"\"".equals(stepId)){
										stepDetailList = checklistUserService.getStepDetailFromStepid(stepId);
									}
									stepJson.put("stepId", stepId);
									stepJson.put("stepName", stepArray[1]);
									stepJson.put("stepLabel", stepLabel);
									stepJson.put("stepHelpText", stepHelpTextList);
									
									// Iterate the stepDetailList and add element in json object as question: start
									if(stepDetailList != null && stepDetailList.size() >0){
										stepElement = new ArrayList<Map<String, Object>>();
										for(ChecklistRecordDTO dto : stepDetailList){
											if(dto != null){
												Map<String, Object> mainJson = new HashMap<String, Object>();
												Map<String, Object> questionJson = new HashMap<String, Object>();
												Map<String, Object> answerJson = new HashMap<String, Object>();
												Map<String, Object> queElements = null;
												Map<String, Object> ansElements = null;
												Map<String, Object> elemAttribute = null;
												Map<String, Object> ruleJson = null;
												
												ruleList = new ArrayList<Map<String, Object>>();
												helpTextList = new ArrayList<Map<String, Object>>();
												queElementList = new ArrayList<Map<String, Object>>();
												ansElementList = new ArrayList<Map<String, Object>>();
												
												String []queElemStr = ChecklistUtility.getValidData(dto.getQuestionInputElement());
												
												if(queElemStr != null && !"".equals(queElemStr) && queElemStr.length >0){
													for(int ind=0; ind < queElemStr.length; ind++){
														String []elemArray = queElemStr[ind].split(",");
														if(elemArray != null && elemArray.length >=2){
															queElements = new HashMap<String, Object>();
															String ruleId = ChecklistUtility.getSubString(elemArray[0], "(", "");
															String ruleName = ChecklistUtility.getSubString(elemArray[1], ")", "");
															queElements.put("elementSequence", ruleId);
															queElements.put("elementName", ruleName);
															queElementList.add(queElements);
														}
													}
												}
												String []helpTextStr = ChecklistUtility.getValidData(dto.getHelpText());
												
												if(helpTextStr != null && !"".equals(helpTextStr) && helpTextStr.length >0){
													for(int ind=0; ind < helpTextStr.length; ind++){
														String []elemArray = helpTextStr[ind].split("#");
														if(elemArray != null && elemArray.length >=3){
															queElements = new HashMap<String, Object>();
															String helpTextId = ChecklistUtility.getSubString(elemArray[0], "(", "");
															String helpTextDesc = ChecklistUtility.getSubString(elemArray[1], "(", "");
															String helpImageUrl = ChecklistUtility.replaceCharToString(elemArray[2], ")", "");
															queElements.put("helpTextId", helpTextId);
															queElements.put("helpTextDesc", helpTextDesc);
															queElements.put("imageUrl", helpImageUrl);
															helpTextList.add(queElements);
														}
													}
												} else{
													helpTextList.add(new HashMap<String, Object>());
												}
												
												questionJson.put("questionId", dto.getQuestionId());
												questionJson.put("questionTitle", dto.getQuestionLabel());
												questionJson.put("questionHelp", helpTextList);
												//questionJson.put("questionSequence", dto.getSequenceNo());
												questionJson.put("questionInputElement", queElementList);

												String []ansElemStr = ChecklistUtility.getValidData(dto.getAnswerInputElement());
												String []elemAttrStr = ChecklistUtility.getValidData(dto.getElementAttribute());
												String []validationStr = ChecklistUtility.getValidDataWithSpace(dto.getValidationRules());
												
												if(ansElemStr != null && !"".equals(ansElemStr) && ansElemStr.length >0){
													for(int ind=0; ind < ansElemStr.length; ind++){
														String []elemArray = ansElemStr[ind].split(",");
														if(elemArray != null && elemArray.length >=3){
															ansElements = new HashMap<String, Object>();
															elemAttribList = new ArrayList<Map<String, Object>>();
															String elementId = ChecklistUtility.getSubString(elemArray[0], "(", "");
															String elementSequence = ChecklistUtility.getSubString(elemArray[1], "", "");
															String elementName = ChecklistUtility.getSubString(elemArray[2], ")", "");
															ansElements.put("elementId", elementId);
															ansElements.put("elementSequence", elementSequence);
															ansElements.put("elementName", elementName);
															if(elemAttrStr != null && !"".equals(elemAttrStr) && elemAttrStr.length >0){
																elemAttribute = new HashMap<String, Object>();
																for(int index=0; index < elemAttrStr.length; index++){
																	String []elemAttribArray = elemAttrStr[index].split(",");
																	if(elemAttribArray != null && elemAttribArray.length >=5){
																		String elemId = ChecklistUtility.getSubString(elemAttribArray[0], "(", "");
																		String attribName = ChecklistUtility.getSubString(elemAttribArray[2], "", "");
																		String attribValue = ChecklistUtility.getSubString(elemAttribArray[3], "", "");
																		String attribSeq = ChecklistUtility.getSubString(elemAttribArray[4], ")", "");
																		String attribid = ChecklistUtility.getSubString(elemAttribArray[1], "", "");
																		if(elemId.equals(elementId) && attribSeq.equals(elementSequence)){
																			elemAttribute.put(attribName, attribid + "~" + attribValue);
																		}
																}
															}
																elemAttribList.add(elemAttribute);
																ansElements.put("elementAttribute", elemAttribList);
															}
														
															if(validationStr != null && !"".equals(validationStr) && validationStr.length >0){
																for(int ind1=0; ind1 < validationStr.length; ind1++){
																	String []ruleArray = validationStr[ind1].split(",");
																	ruleJson = new HashMap<String, Object>();
																	if(ruleArray != null && ruleArray.length >=8){
																		String ruleId = ChecklistUtility.getSubString(ruleArray[0], "(", "");
																		String elementIdforRule = ChecklistUtility.getSubString(ruleArray[6], "", "");
																		String elemSequance = ChecklistUtility.getSubString(ruleArray[4], ")", "");
																		if(elementIdforRule.equals(elementId) && elemSequance.equals(elementSequence)){
																			ruleJson.put("ruleId", ruleId);
																			ruleJson.put("ruleName", ChecklistUtility.getSubString(ruleArray[1], "", ""));
																			ruleJson.put("ruleFormula", ChecklistUtility.getSubString(ruleArray[5], "", ""));
																			ruleJson.put("formulaData", ChecklistUtility.getSubString(ruleArray[2], "", ""));
																			ruleJson.put("elementId", ChecklistUtility.getSubString(ruleArray[3], "", ""));
																			ruleJson.put("elementOrder", ChecklistUtility.getSubString(ruleArray[4], ")", ""));
																			String []ruleActionStr = null;
																			
																			if (validationStr[ind1].indexOf("{") >= 0) {
																				
																				String actionStr = validationStr[ind1].substring(validationStr[ind1].indexOf("{"));
																				ruleActionStr = ChecklistUtility.getValidData1(actionStr);
																			}

																			Map<String, Object> ruleActionObj = null;
																			ArrayList<Map<String, Object>> ruleActionList = new ArrayList<Map<String, Object>>();
																			if(ruleActionStr != null && !"".equals(ruleActionStr) && ruleActionStr.length >0){
																				for(int n=0; n < ruleActionStr.length; n++){
																					String []ruleActionArray = ruleActionStr[n].split(",");
																					if(ruleActionArray != null && ruleActionArray.length == 6){
																						ruleActionObj = new HashMap<String, Object>();
																						String ruleActionId = ChecklistUtility.getSubString(ruleActionArray[0], "(", "");
																						String ruleActionDesc = ChecklistUtility.getSubString(ruleActionArray[1], "(", "");
																						String ruleActionOutputValue = ChecklistUtility.replaceCharToString(ruleActionArray[4], ")", "");
																						String noOfElement1 = ChecklistUtility.getSubString(ruleActionArray[5], ")", "");
																						String noOfElement = ChecklistUtility.replaceCharToString(noOfElement1, "}", "");
																						
																						ruleActionObj.put("ruleAction", ChecklistUtility.getSubString(ruleActionArray[2], "", ""));
																						ruleActionObj.put("ruleActionOutput", ChecklistUtility.getSubString(ruleActionArray[3], "", ""));
																						ruleActionObj.put("ruleActionOutputValue", ruleActionOutputValue);
																						ruleActionObj.put("noOfElement",noOfElement);
																						ruleActionObj.put("ruleActionId", ruleActionId);
																						ruleActionObj.put("ruleActionDesc", ruleActionDesc);
																						ruleActionList.add(ruleActionObj);
																					}else if(ruleActionArray != null && ruleActionArray.length >=7){
																						ruleActionObj = new HashMap<String, Object>();
																						String ruleActionId = ChecklistUtility.getSubString(ruleActionArray[0], "(", "");
																						String ruleActionDesc = ChecklistUtility.getSubString(ruleActionArray[1], "(", "");
																						String ruleActionOutputValue = ChecklistUtility.replaceCharToString(ruleActionArray[4]+","+ruleActionArray[5], ")", "");
																						String noOfElement1 = ChecklistUtility.getSubString(ruleActionArray[6], ")", "");
																						String noOfElement = ChecklistUtility.replaceCharToString(noOfElement1, "}", "");
																						
																						ruleActionObj.put("ruleAction", ChecklistUtility.getSubString(ruleActionArray[2], "", ""));
																						ruleActionObj.put("ruleActionOutput", ChecklistUtility.getSubString(ruleActionArray[3], "", ""));
																						ruleActionObj.put("ruleActionOutputValue", ruleActionOutputValue);
																						ruleActionObj.put("noOfElement",noOfElement);
																						ruleActionObj.put("ruleActionId", ruleActionId);
																						ruleActionObj.put("ruleActionDesc", ruleActionDesc);
																						ruleActionList.add(ruleActionObj);
																					}
																				}
																				
																			} else{
																				ruleActionList.add(new HashMap<String, Object>());
																			}
																			
																			ruleJson.put("actionList", ruleActionList);	
																			
																			
																			ruleList.add(ruleJson);
																		}
																	} else if(ruleArray.length < 8 && ruleArray.length >= 6){
																		String ruleId = ChecklistUtility.getSubString(ruleArray[0], "(", "");
																		String noOfElement = ChecklistUtility.getSubString(ruleArray[3], "", "");
																		String elementIdforRule = ChecklistUtility.getSubString(ruleArray[4], "", "");
																		String elemSequance = ChecklistUtility.getSubString(ruleArray[5], ")", "");
																		if(elementIdforRule.equals(elementId) && elemSequance.equals(elementSequence)){
																			ruleJson.put("ruleId", ruleId);
																			ruleJson.put("ruleName", ChecklistUtility.getSubString(ruleArray[1], "", ""));
																			ruleJson.put("ruleFormula", ChecklistUtility.getSubString(ruleArray[2], "", ""));
																			ruleJson.put("noOfElement", noOfElement);
																		}
																		//ruleList.add(ruleJson);
																	}else if(ruleArray.length < 6 && ruleArray.length >= 5){
																		String ruleId = ChecklistUtility.getSubString(ruleArray[0], "(", "");
																		String noOfElement = ChecklistUtility.getSubString(ruleArray[2], "", "");
																		String elementIdforRule = ChecklistUtility.getSubString(ruleArray[3], "", "");
																		String elemSequance = ChecklistUtility.getSubString(ruleArray[4], ")", "");
																		if(elementIdforRule.equals(elementId) && elemSequance.equals(elementSequence)){
																			ruleJson.put("ruleId", ruleId);
																			ruleJson.put("ruleName", ChecklistUtility.getSubString(ruleArray[1], "", ""));
																			ruleJson.put("ruleFormula", ChecklistUtility.getSubString(ruleArray[2], "", ""));
																			ruleJson.put("noOfElement", noOfElement);
																		}
																	} else{
																		
																		if (ruleArray != null) {
																			String ruleId = ChecklistUtility.getSubString((ruleArray.length >= 1) ? ruleArray[0] : "", "(", "");
																			String noOfElement = ChecklistUtility.getSubString((ruleArray.length >= 2) ? ruleArray[1] : "", "", "");
																			String elementIdforRule = ChecklistUtility.getSubString((ruleArray.length >= 3) ? ruleArray[2] : "", "", "");
																			String elemSequance = ChecklistUtility.getSubString((ruleArray.length >= 4) ? ruleArray[3] : "", ")", "");
																			if(elementIdforRule.equals(elementId) && elemSequance.equals(elementSequence)){
																				ruleJson.put("ruleId", ruleId);
																				ruleJson.put("ruleName", noOfElement);
																				ruleList.add(ruleJson);
																			}
																		}
																	}
																}
																ansElements.put("validations", ruleList);
															}
															
															if(dto.getAnswerValue() != null && !"".equals(dto.getAnswerValue())){
																String [] ansValues = dto.getAnswerValue().split(",");
																if(ansValues != null && !"".equals(ansValues) && ansValues.length > 0){
																	ansElements.put("values", ansValues);
																}
															}
															ansElementList.add(ansElements);
														}
													}
												}
												
												answerJson.put("answerId", dto.getAnswerId());
												answerJson.put("answerInputElement", ansElementList);
												if(dto.getElementTag()!= null && !"".equals(dto.getElementTag())){
													answerJson.put("elementTag", dto.getElementTag());
												}
												mainJson.put("questionDetail", questionJson);
												mainJson.put("answerDetail", answerJson);
												stepElement.add(mainJson);
											}
										}
										stepJson.put("stepElements", stepElement);
									}
									sectionElement.add(stepJson);
								}
								jsonObject.put("sectionElements", sectionElement);
								formElement.add(jsonObject);
							} else{
								continue;
							}
						}
					}
					
					formJson.put("formElements", formElement);
					
					checklistResponse = new ChecklistPortalResponse();
					checklistResponse.setResultSet(formJson);
					checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000", "SUCCESS"));
					
				}
			}
		} catch (ChecklistMobileExceptions e) {
			LOGGER.info(e.getErrorMessage());
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse.setRequestStatus(new ChecklistRequestStatus("1001",e.getMessage()));
		}
		
		try{
			ObjectMapper mapper = new ObjectMapper();
			SecretKey secretKey = ChecklistUtility.getKey();
			result=mapper.writeValueAsString(checklistResponse);
			responseString = ChecklistUtility.encrypt(result, secretKey);
		} catch (JsonGenerationException e) {
			LOGGER.info(e.getMessage());
		} catch (JsonMappingException e) {
			LOGGER.info(e.getMessage());
		} catch (IOException e) {
			LOGGER.info(e.getMessage());
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
		}
		
		return result;
	
	}

	@Override
	public String checklistPublishment(ChecklistFormDto dto, HttpHeaders headers) {

		ChecklistPortalResponse checklistResponse = null;
		String result = ""; 
		
		MultivaluedMap<String, String> headersMap = headers.getRequestHeaders();
		Set<String>headerKeys = headersMap.keySet();
		for(String key:headerKeys){
			LOGGER.info(key +" ------ "+headers.getRequestHeader(key));
		}
		
		try {
			
			if((dto.getFormId() == null || "".equals(dto.getFormId()))){
				throw new ChecklistMobileExceptions("3001","Invalid Input for Form Id.");
			} else if(!CommonValidation.isNumeric(dto.getFormId())){
				throw new ChecklistMobileExceptions("3003","Please enter only numeric value for From Id.");
			} else{
				checklistUserService = (ChecklistUserService) SpringApplicationContext.getBean("checklistUserServiceImpl");
				result = checklistUserService.checklistPublishment(dto.getFormId());
				
				Map<String, Object> formJson = new HashMap<String, Object>();
				formJson.put("formId", result);
				checklistResponse = new ChecklistPortalResponse();
				checklistResponse.setResultSet(formJson);
				checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000", "SUCCESS"));
			}
		} catch (ChecklistMobileExceptions e) {
			LOGGER.info(e.getErrorMessage());
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse.setRequestStatus(new ChecklistRequestStatus("1001","Not Able to connect with database, Please try again after some time."));
		}
		
		try {
			ObjectMapper mapper = new ObjectMapper();
			SecretKey secretKey = ChecklistUtility.getKey();
			result=mapper.writeValueAsString(checklistResponse);
			ChecklistUtility.encrypt(result, secretKey);
		} catch (JsonGenerationException e) {
			LOGGER.info(e.getMessage());
		} catch (JsonMappingException e) {
			LOGGER.info(e.getMessage());
		} catch (IOException e) {
			LOGGER.info(e.getMessage());
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
		}
		
		return result;
	}

	private HSSFWorkbook generateXLS(List<RecordDTO> results) throws Exception {
		
		HSSFWorkbook workbook = new HSSFWorkbook ();
		 
		//Get first sheet from the workbook
		HSSFSheet sheet = workbook.createSheet("Records");
		int rownum = 0;
		Row row = sheet.createRow(rownum++);
		Cell cell = row.createCell(0);
		cell.setCellValue("Name");
		cell = row.createCell(1);
		cell.setCellValue("Date");
		cell = row.createCell(2);
		cell.setCellValue("Version");
		cell = row.createCell(3);
		cell.setCellValue("Project Name");
		cell = row.createCell(4);
		cell.setCellValue("Status");
		
		for (RecordDTO recordDTO : results) {
			
			Row row1 = sheet.createRow(rownum++);
			Cell cell1 = row1.createCell(0);
			cell1.setCellValue(recordDTO.getRecordName());
			cell1 = row1.createCell(1);
			cell1.setCellValue(recordDTO.getRecordDate());
			cell1 = row1.createCell(2);
			cell1.setCellValue(recordDTO.getRecordVersioNo());
			cell1 = row1.createCell(3);
			cell1.setCellValue(recordDTO.getProjectName());
			cell1 = row1.createCell(4);
			cell1.setCellValue(recordDTO.getRecordStatus());
			rownum = createSections(sheet, workbook, recordDTO, rownum);
		} 
		return workbook;
	}
	
	private int createSections(HSSFSheet sheet, HSSFWorkbook workbook, RecordDTO recordDTO, int rownum) {
		
		HSSFFont font = workbook.createFont();
		font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		HSSFCellStyle style = workbook.createCellStyle();
		style.setFont(font);
		style.setFillBackgroundColor(IndexedColors.AQUA.getIndex());
		style.setFillForegroundColor(IndexedColors.ORANGE.getIndex());
		
		Row row = sheet.createRow(rownum);
		Cell cell = row.createCell(0);
		cell.setCellValue("");
		cell = row.createCell(1);
		cell.setCellValue("Section Name");
		cell.setCellStyle(style);
		cell = row.createCell(2);
		cell.setCellValue("Step Name");
		cell.setCellStyle(style);
		cell = row.createCell(3);
		cell.setCellValue("Q.No");
		cell.setCellStyle(style);
		cell = row.createCell(4);
		cell.setCellValue("Question");
		cell.setCellStyle(style);
		cell = row.createCell(5);
		cell.setCellValue("Answers");
		cell.setCellStyle(style);
		cell = row.createCell(6);
		cell.setCellValue("Comments");
		cell.setCellStyle(style);
		List<SearchSectionDetails> list = recordDTO.getSearchSectionDetails();
		for (SearchSectionDetails searchSectionDetails : list) {
						
			List<SearchStepDetails> steps = searchSectionDetails.getSearchStepDetails();
			String section = searchSectionDetails.getSectionName();
			
			for (SearchStepDetails searchStepDetails : steps) {

				String step = searchStepDetails.getStepName();
				List<SearchQuestDetails> ques = searchStepDetails.getSearchQuestDetails();
				
				for (SearchQuestDetails searchQuestDetails : ques) {
					
					Row row11 = sheet.createRow(++rownum);
					Cell cell1 = row11.createCell(0);
					cell1.setCellValue("");
					cell1 = row11.createCell(1);
					cell1.setCellValue(section);					
					cell1 = row11.createCell(2);
					cell1.setCellValue(step);
					cell1 = row11.createCell(3);
					cell1.setCellValue(searchQuestDetails.getQuestionOrder());
					cell1 = row11.createCell(4);
					cell1.setCellValue(searchQuestDetails.getQuestionName());
					cell1 = row11.createCell(5);
					cell1.setCellValue(searchQuestDetails.getAnswerName());
					cell1 = row11.createCell(6);
					cell1.setCellValue(searchQuestDetails.getComments());
				}
			}
		}
		
		return rownum;
	}
	
	public static void main(String[] args) throws Exception {
		
		List<SearchRecordDTO> result = new ArrayList<SearchRecordDTO>();
		SearchRecordDTO dto = new SearchRecordDTO();
		dto.setRecordName("Mariselvam");
		dto.setRecordDate("2016-01-09");
		dto.setRecordStatus("Draft");
		dto.setProjectName("");
		dto.setRecordVersioNo("1.0");
		dto.setSectionArray("{\"(321#,\"Root inspection (inspeção da raíz)#\",417#,Step2#,#,977#,\"Hole 66 Outer / Furo 66 Externo:#\",671#)"
				+"," +"(321#,\"Root inspection (inspeção da raíz)#\",417#,Step2#,#,994#,\"Hole 35 Inner / Furo 35 Interno: #\",688#)\"}");
		result.add(dto);
		List<RecordDTO> results = new ChecklistControllerImpl().getSearchRecords(result);
		HSSFWorkbook workbook = new ChecklistControllerImpl().generateXLS(results);
		FileOutputStream file = new FileOutputStream(new File("C:\\Users\\mr836436\\836436\\test.xlsx"));
		workbook.write(file);
		file.close();
	}

	@Override
	public String fileInfo(ChecklistFormDto jsonObject, HttpHeaders headers, HttpServletRequest req) {
		
		FileOutputStream file = null;
		File catalinaBase = null;
		try {
			
			String fileName = HostPropertyFileReader.getInstance().getProperty("xlsPath") + "/" + jsonObject.getSubmittedBy() + ".xls";
			
			catalinaBase = new File(fileName).getAbsoluteFile();
			
			checklistUserService = (ChecklistUserService) SpringApplicationContext
					.getBean("checklistUserServiceImpl");
			
			List<RecordDTO> result = checklistUserService.searchRecords(jsonObject);
			HSSFWorkbook workbook = generateXLS(result);
			file = new FileOutputStream(catalinaBase);
			workbook.write(file);
			file.close();

		} catch (Exception e) {
			
			LOGGER.info(e.getMessage());
			if (file != null) {
				
				try {
					file.close();
				} catch (Exception e1) {
					LOGGER.info(e1.getMessage());
				}
			}
		}
		
		String result = "";
		ChecklistPortalResponse checklistResponse = null;
		checklistResponse = new ChecklistPortalResponse();
		checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000", "SUCCESS"));
		try {
			ObjectMapper mapper = new ObjectMapper();
			SecretKey secretKey = ChecklistUtility.getKey();
			result=mapper.writeValueAsString(checklistResponse);
			ChecklistUtility.encrypt(result, secretKey);
		} catch (JsonGenerationException e) {
			LOGGER.info(e.getMessage());
		} catch (JsonMappingException e) {
			LOGGER.info(e.getMessage());
		} catch (IOException e) {
			LOGGER.info(e.getMessage());
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
		}
		
		return result;		
	}

	@Override
	public String checklistNames(String ssoId, String roleName,
			HttpHeaders headers) {
		
		List<String> result = null;
		String loadchecklistValue = null;
		ChecklistPortalResponse checklistResponse = null;
		try {
			if ((ssoId == null || "".equals(ssoId))) {
				throw new ChecklistPortalExceptions("3001",
						"Invalid Input for SSo Id.");
			} /*else if (!CommonValidation.isNumeric(ssoId)) {
				throw new ChecklistPortalExceptions("3003",
						"Please enter only numeric value for SSO Id.");
			}*/
			if ((roleName == null || "".equals(roleName))) {
				throw new ChecklistPortalExceptions("3006",
						"Invalid Input for Role Name.");
			}
			checklistUserService = (ChecklistUserService) SpringApplicationContext
					.getBean("checklistUserServiceImpl");
			result = checklistUserService.getChecklistNames(ssoId, roleName);
			Map<String, Object> formJson = new HashMap<String, Object>();
			formJson.put("checklistname", result);
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(formJson);
			checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000", "SUCCESS"));

		} catch (ChecklistPortalExceptions e) {
			LOGGER.info(e.getErrorMessage());
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse
					.setRequestStatus(new ChecklistRequestStatus(e
							.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse
					.setRequestStatus(new ChecklistRequestStatus("1001",
							"Not Able to connect with database, Please try again after some time."));
		}

		try {
			ObjectMapper mapper = new ObjectMapper();
			loadchecklistValue = mapper
					.writeValueAsString(checklistResponse);

		} catch (JsonGenerationException e) {
			LOGGER.info(e.getMessage());
		} catch (JsonMappingException e) {
			LOGGER.info(e.getMessage());
		} catch (IOException e) {
			LOGGER.info(e.getMessage());
		}

		return loadchecklistValue;
	}

	@Override
	public String checklistVersion(String formname, String ssoId, String rolename,
			HttpHeaders headers) {
		
		List<String> result = null;
		String loadchecklistValue = null;
		ChecklistPortalResponse checklistResponse = null;
		try {
			if ((ssoId == null || "".equals(ssoId))) {
				throw new ChecklistPortalExceptions("3001",
						"Invalid Input for SSo Id.");
			} /*else if (!CommonValidation.isNumeric(ssoId)) {
				throw new ChecklistPortalExceptions("3003",
						"Please enter only numeric value for SSO Id.");
			}*/
			if ((formname == null || "".equals(formname))) {
				throw new ChecklistPortalExceptions("3006",
						"Invalid Input for form Name.");
			}
			checklistUserService = (ChecklistUserService) SpringApplicationContext
					.getBean("checklistUserServiceImpl");
			result = checklistUserService.getChecklistVersion(formname, ssoId, rolename);
			Map<String, Object> formJson = new HashMap<String, Object>();
			formJson.put("versions", result);
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(formJson);
			checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000", "SUCCESS"));

		} catch (ChecklistPortalExceptions e) {
			LOGGER.info(e.getErrorMessage());
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse
					.setRequestStatus(new ChecklistRequestStatus(e
							.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse
					.setRequestStatus(new ChecklistRequestStatus("1001",
							"Not Able to connect with database, Please try again after some time."));
		}

		try {
			ObjectMapper mapper = new ObjectMapper();
			loadchecklistValue = mapper
					.writeValueAsString(checklistResponse);

		} catch (JsonGenerationException e) {
			LOGGER.info(e.getMessage());
		} catch (JsonMappingException e) {
			LOGGER.info(e.getMessage());
		} catch (IOException e) {
			LOGGER.info(e.getMessage());
		}

		return loadchecklistValue;
	}

	private List<RecordDTO> getSearchRecords(List<SearchRecordDTO> result) {
	
		return null;
	}
	
	@Override
	public String searchRecords(ChecklistFormDto jsonObject,
			HttpHeaders headers) {
		
		List<RecordDTO> result = null;
		String loadchecklistValue = null;
		ChecklistPortalResponse checklistResponse = null;
		try {
			
			checklistUserService = (ChecklistUserService) SpringApplicationContext
					.getBean("checklistUserServiceImpl");
			
			result = checklistUserService.searchRecords(jsonObject);
			Map<String, Object> formJson = new HashMap<String, Object>();
			formJson.put("records", result);
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(formJson);
			checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000", "SUCCESS"));

		} catch (ChecklistPortalExceptions e) {
			LOGGER.info(e.getErrorMessage());
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse
					.setRequestStatus(new ChecklistRequestStatus(e
							.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse
					.setRequestStatus(new ChecklistRequestStatus("1001",
							"Not Able to connect with database, Please try again after some time."));
		}

		try {
			ObjectMapper mapper = new ObjectMapper();
			loadchecklistValue = mapper
					.writeValueAsString(checklistResponse);

		} catch (JsonGenerationException e) {
			LOGGER.info(e.getMessage());
		} catch (JsonMappingException e) {
			LOGGER.info(e.getMessage());
		} catch (IOException e) {
			LOGGER.info(e.getMessage());
		}

		return loadchecklistValue;
	}

	@Override
	public Response exportXLS(String ssoId, HttpHeaders headers,
			HttpServletRequest req) {
		
		File catalinaBase = null;
		ResponseBuilder response = null;
		try {
			
			String fileName = HostPropertyFileReader.getInstance().getProperty("xlsPath") + "/" + ssoId + ".xls";
			
			catalinaBase = new File(fileName).getAbsoluteFile();
			response = Response.ok((Object) catalinaBase);
			response.header("Content-Disposition",
					"attachment; filename=new-excel-file.xls");
			return response.build();
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
		}
		
		return null;
	}

	@Override
	public String populatesections(String formId, String role, String version,
			HttpHeaders headers) {
		
		List<String> result = null;
		String loadchecklistValue = null;
		ChecklistPortalResponse checklistResponse = null;
		try {
			
			checklistUserService = (ChecklistUserService) SpringApplicationContext
					.getBean("checklistUserServiceImpl");
			
			result = checklistUserService.getSectionDetails(formId, role, version);
			Map<Integer, List<SearchStepDetails>> dummy = new HashMap<Integer, List<SearchStepDetails>>();
			Map<Integer, String> dummySteps = new HashMap<Integer, String>();
			List<SearchStepDetails> listStep = new ArrayList<SearchStepDetails>();
			List<SearchSectionDetails> listSections = new ArrayList<SearchSectionDetails>();
			for (String string : result) {
				
				String []sectionArr = ChecklistUtility.getValidData(string);
				for (String string2 : sectionArr) {
					
					String s = string2.substring(1);
					s = s.substring(0, s.length()-1);
					String[] splittedString = s.split(",");

					
					SearchSectionDetails searchSectionDetails = new SearchSectionDetails();
					String sectionId = splittedString[0];
					sectionId = sectionId.substring(0, sectionId.length()-1);
					
					if(!dummy.containsKey(Integer.parseInt(sectionId))) {
						
						listStep = new ArrayList<SearchStepDetails>();
						String sectionName = splittedString[1];
						sectionName = sectionName.substring(0, sectionName.length()-1);
						
						searchSectionDetails.setSectionId(sectionId);
						searchSectionDetails.setSectionName(sectionName);
						
						
						String stepId = splittedString[2];
						stepId = stepId.substring(0, stepId.length()-1);
						String stepName = splittedString[3];
						stepName = stepName.substring(0, stepName.length()-1);

						SearchStepDetails searchStepDetails = new SearchStepDetails();
						searchStepDetails.setStepId(stepId);
						searchStepDetails.setStepName(stepName);
						listStep.add(searchStepDetails);
						
						searchSectionDetails.setSearchStepDetails(listStep);
						listSections.add(searchSectionDetails);
						dummySteps.put(Integer.parseInt(stepId), stepName);
						dummy.put(Integer.parseInt(sectionId), listStep);
					} else {
						
						List<SearchStepDetails> details = dummy.get(Integer.parseInt(sectionId));
						SearchStepDetails searchStepDetails = new SearchStepDetails();
						String stepId = splittedString[2];
						stepId = stepId.substring(0, stepId.length()-1);
						String stepName = splittedString[3];
						stepName = stepName.substring(0, stepName.length()-1);

						searchStepDetails.setStepId(stepId);
						searchStepDetails.setStepName(stepName);
						if (!dummySteps.containsKey(Integer.parseInt(stepId))) {
							details.add(searchStepDetails);
							dummy.put(Integer.parseInt(sectionId), details);
						}
					}					
				}
			}
			
			List<SearchSectionDetails> listSectionDetails = new ArrayList<SearchSectionDetails>();
			
			for (SearchSectionDetails searchSectionDetails : listSections) {
				searchSectionDetails.setSearchStepDetails(dummy.get(Integer.parseInt(searchSectionDetails.getSectionId())));
				listSectionDetails.add(searchSectionDetails);
			}
			
			Map<String, Object> formJson = new HashMap<String, Object>();
			formJson.put("sections", listSectionDetails);
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(formJson);
			checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000", "SUCCESS"));

		} catch (ChecklistPortalExceptions e) {
			LOGGER.info(e.getErrorMessage());
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse
					.setRequestStatus(new ChecklistRequestStatus(e
							.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse
					.setRequestStatus(new ChecklistRequestStatus("1001",e.getMessage()));
		}

		try {
			ObjectMapper mapper = new ObjectMapper();
			loadchecklistValue = mapper
					.writeValueAsString(checklistResponse);

		} catch (JsonGenerationException e) {
			LOGGER.info(e.getMessage());
		} catch (JsonMappingException e) {
			LOGGER.info(e.getMessage());
		} catch (IOException e) {
			LOGGER.info(e.getMessage());
		}

		return loadchecklistValue;
	}

	@Override
	public String populateProjects(String formname, String ssoId, HttpHeaders headers) {
		
		ChecklistPortalResponse checklistResponse = null;
		String loadchecklistValue = null;
		
		try {
			
			checklistUserService = (ChecklistUserService) SpringApplicationContext
					.getBean("checklistUserServiceImpl");
			List<EDSRDetailDTO> result = checklistUserService.getChecklistProjects(formname, ssoId);
			Map<String, Object> formJson = new HashMap<String, Object>();
			formJson.put("projects", result);
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(formJson);
			checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000", "SUCCESS"));

		} catch (ChecklistPortalExceptions e) {
			LOGGER.info(e.getErrorMessage());
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse
					.setRequestStatus(new ChecklistRequestStatus(e
							.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse
					.setRequestStatus(new ChecklistRequestStatus("1001",e.getMessage()));
		}
		
		try {
			ObjectMapper mapper = new ObjectMapper();
			loadchecklistValue = mapper
					.writeValueAsString(checklistResponse);

		} catch (JsonGenerationException e) {
			LOGGER.info(e.getMessage());
		} catch (JsonMappingException e) {
			LOGGER.info(e.getMessage());
		} catch (IOException e) {
			LOGGER.info(e.getMessage());
		}

		return loadchecklistValue;		
	}

	@Override
	public String checkformforedit(ChecklistFormDto jsonObject,
			HttpHeaders headers) {
		
		ChecklistPortalResponse checklistResponse = null;
		String loadchecklistValue = null;
		
		try {
			
			checklistUserService = (ChecklistUserService) SpringApplicationContext.getBean("checklistUserServiceImpl");
			Map<String, List<String>> result = checklistUserService.checkFormForEdit(jsonObject);
			List<String> draftVersion = result.get("draftCount");
			List<String> formIds = result.get("formIds");
			FormDTO resultObj = new FormDTO();
			String count = "0";
			if (draftVersion.size() != 0) {
				count = draftVersion.get(0);
			}
			
			if ("0".equals(count)) {
			
				if (formIds.size() == 1) {
					
					resultObj.setIsEditable("true");
					resultObj.setIsHasMutliple("false");
				} else {
					if (jsonObject.getFormId().equals(formIds.get(formIds.size() -1))) {
						resultObj.setIsEditable("true");
						resultObj.setIsHasMutliple("false");
					} else {
						resultObj.setIsEditable("false");
						resultObj.setIsHasMutliple("true");
					}
				}
			} else {
				
				
				if (formIds.size() == 1) {
					resultObj.setIsEditable("false");
					resultObj.setIsHasMutliple("false");
				} else {
					
					if (jsonObject.getFormId().equals(formIds.get(formIds.size() -1))) {
						resultObj.setIsEditable("false");
						resultObj.setIsHasMutliple("true");
					} else {
						resultObj.setIsEditable("false");
						resultObj.setIsHasMutliple("true");
					}
				}
			}
			
			Map<String, Object> formJson = new HashMap<String, Object>();
			formJson.put("editable", resultObj);
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(formJson);
			checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000", "SUCCESS"));

		} catch (ChecklistPortalExceptions e) {
			LOGGER.info(e.getErrorMessage());
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse
					.setRequestStatus(new ChecklistRequestStatus(e
							.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse
					.setRequestStatus(new ChecklistRequestStatus("1001",e.getMessage()));
		}
		
		try {
			ObjectMapper mapper = new ObjectMapper();
			loadchecklistValue = mapper.writeValueAsString(checklistResponse);

		} catch (JsonGenerationException e) {
			LOGGER.info(e.getMessage());
		} catch (JsonMappingException e) {
			LOGGER.info(e.getMessage());
		} catch (IOException e) {
			LOGGER.info(e.getMessage());
		}

		return loadchecklistValue;
	}

	@Override
	public @ResponseBody String uploadBulkImagesFromPortal(ChecklistImages jsonObject, HttpHeaders headers) {
		String result=""; 
		String responseString = "";
		ChecklistPortalResponse checklistResponse = null;
		
		checklistFormMgmtService = (ChecklistFormMgmtService)SpringApplicationContext.getBean("checklistFormMgmtServiceImpl");
		checklistUserService = (ChecklistUserService) SpringApplicationContext.getBean("checklistUserServiceImpl");
		//String imageName = jsonObject.getImageName();
		String imagePath = BUNDLE.getString("imagePath");
		String imageType = BUNDLE.getString("imageType");
		
		List<ChecklistImages> files = jsonObject.getImagesList();
		ArrayList<Map<String, Object>> resultList = null;
		try{
			if(files != null && files.size() > 0){
			Map<String, Object> resultMap = null;
			resultList = new ArrayList<Map<String, Object>>();
			for(ChecklistImages imageFile : files){
				resultMap = new HashMap<String, Object>();
				String formId = imageFile.getFormId();
				String userId = imageFile.getUserSSOId();
				String token = imageFile.getOperation();
				String imageSequance = imageFile.getSequanceNo();
				//String questionId = imageFile.getQuestionId() != "" ? imageFile.getQuestionId() : "0";
				String imageData = imageFile.getImageData();
				String imageFor = imageFile.getImageType();
				String helpDescription = imageFile.getHelpDescription();
				String helpTextLevel = imageFile.getHelpTextLevel();
				String associationId = imageFile.getAssociationId();

				if (imageSequance != null && !"".equals(imageSequance)) {
					imageSequance = "_" + imageSequance;
				}
				
				String imagefinalPath = imagePath;
				if(imageFor != null && !"".equals(imageFor)){
					imagefinalPath = imagePath+"/"+formId+"/"+imageFor;
				}
				
				File file1 = ChecklistUtility.getDirectory(imagePath,imagefinalPath);

				if (file1.exists()) {
					String imageNewName = "";
					imageNewName = associationId + imageSequance + "."+ imageType;
					String path = ChecklistImageUtility.base64StringToImage(imageNewName, imageData,file1);

					if (path != null && !"".equals(path)) {

						ChecklistHelpTextDTO helpTextDTO = new ChecklistHelpTextDTO();
						if ("Add".equalsIgnoreCase(token)) {
							helpTextDTO.setFormId(formId);
							/*helpTextDTO.setSectionId(sectionId);
							helpTextDTO.setStepId(stepId);
							helpTextDTO.setQuestionId(questionId);*/
							helpTextDTO.setAssociationId(associationId);
							helpTextDTO.setImageUrl(path);
							helpTextDTO.setUserSSOId(userId);
							helpTextDTO.setHelpDescription(helpDescription);
							helpTextDTO.setHelpTextLevel(helpTextLevel);
						}
						 String status = checklistFormMgmtService.updateImagePathByPortal(helpTextDTO, token, imageFor);
						 
						 String []imgStatus = null;
						if(status != null && !"".equals(status)){
							imgStatus = status.split("#");
						}
					 	resultMap.put("imagePath", path);
						resultMap.put("helpImageId", imgStatus[0]);
						resultMap.put("message", imgStatus[1]);
						resultMap.put("associationId", associationId);
						resultMap.put("sequanceNo", imageSequance);
						/*resultMap.put("elementId", elementId);
						resultMap.put("sequanceNo", imageObj.getSequanceNo());
						resultMap.put("elementSequenceNo", sequanceNo);*/
						 
						 
					} else {
						throw new ChecklistMobileExceptions("3004","Image Not Saved Successfully.");
					}
				}
				resultList.add(resultMap);
			}
			
			/*String json = checklistMetadataForEdit(formId, headers);
			ObjectMapper mapper = new ObjectMapper();
			Map<String, Object>  obj = mapper.readValue(json, Map.class);
			Map<String, Object> json1 = (Map) obj.get("resultSet");
			jsonObject.setFormAction(action);
			jsonObject.setDraftVersion(json1.get("draftVersion") == null ? null : json1.get("draftVersion").toString());
			jsonObject.setPublishVersion(json1.get("publishVersion") == null ? null : json1.get("publishVersion").toString());
			jsonObject.setFormStatus(json1.get("formStatus") == null ? null : json1.get("formStatus").toString());
			jsonObject.setFormId(formId);
			checklistUserService.checklistAuditTrail(jsonObject, json);*/
		}
		Map<String, Object> resObject= new HashMap<String, Object>();
		resObject.put("Result", resultList);
		
		checklistResponse = new ChecklistPortalResponse();
		checklistResponse.setResultSet(resObject);
		checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000", "Image Uploaded Successfully."));
		}catch (ChecklistMobileExceptions e) {
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse.setRequestStatus(new ChecklistRequestStatus("1001",e.getMessage()));
		}
		
		try{
			ObjectMapper mapper = new ObjectMapper();
			SecretKey secretKey = ChecklistUtility.getKey();
			result=mapper.writeValueAsString(checklistResponse);
			responseString = ChecklistUtility.encrypt(result, secretKey);
		} catch (JsonGenerationException e) {
			LOGGER.info(e.getMessage());
		} catch (JsonMappingException e) {
			LOGGER.info(e.getMessage());
		} catch (IOException e) {
			LOGGER.info(e.getMessage());
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
		}
		
		return result; 
	}

	@Override
	public String uploadHelpImages(ImageDTO imageDTO, HttpHeaders headers) {
		
		String result=""; 
		ChecklistPortalResponse checklistResponse = null;
		
		checklistUserService = (ChecklistUserService) SpringApplicationContext.getBean("checklistUserServiceImpl");
		try {
			
			List<ImageDTO> imageContent = new ArrayList<ImageDTO>();
			String imagePath = BUNDLE.getString("imagePath");
			String imageTempPath = BUNDLE.getString("imageTempPath");
			
			for (ImageDTO dto : imageDTO.getImagesList()) {
				
				ImageDTO newDTO = null;
				if (!"".equals(dto.getImageData())) {
					newDTO  = createThumbnailImages(dto, imagePath, imageTempPath, dto.getFormStatus());
				} else {
					newDTO = dto;
				}
				newDTO.setHelpDescription(imageDTO.getHelpDescription());
				newDTO.setImageDescFlag(imageDTO.getImageDescFlag());
				imageContent.add(newDTO);
			}
			checklistUserService.uploadHelpImages(imageContent);
			Map<String, Object> resObject= new HashMap<String, Object>();
			resObject.put("Result", null);
			
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(resObject);
			checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000", "Image Uploaded Successfully."));

		} catch (ChecklistMobileExceptions e) {
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse.setRequestStatus(new ChecklistRequestStatus("1001",e.getMessage()));
		}
		
		try {
			ObjectMapper mapper = new ObjectMapper();
			result = mapper.writeValueAsString(checklistResponse);
		} catch (JsonGenerationException e) {
			LOGGER.info(e.getMessage());
		} catch (JsonMappingException e) {
			LOGGER.info(e.getMessage());
		} catch (IOException e) {
			LOGGER.info(e.getMessage());
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
		}
		return result;
	}

	private ImageDTO createThumbnailImages(ImageDTO dto, String path, String tempPath, String formStatus) throws Exception {
		
		String imagefinalPath = path + "/" + dto.getFormId();
		if ("14".equals(formStatus)) {
			imagefinalPath = path + "/" + dto.getFormId() + "/image";
		}
		
		File file1 = ChecklistUtility.getDirectory(path, imagefinalPath);
		String imageNewName = System.currentTimeMillis() + ".png";
		String originalPath = ChecklistImageUtility.base64StringToImage(imageNewName, dto.getImageData(), file1);
		
		BufferedImage img = ImageUtils.resizeImage(originalPath, 1, 77, 57);
		
		String imagefinalTempPath = tempPath + "/" + dto.getFormId();
		ChecklistUtility.getDirectory(tempPath, imagefinalTempPath);
		String originalFile = imagefinalTempPath + "/" + System.currentTimeMillis() + ".png";
		ImageUtils.saveImage(img, originalFile, 1);
		
		String imageData = ChecklistImageUtility.imageToBase64String(new File(originalFile));
		dto.setThumbnailData(imageData);
		dto.setHelpImageUrl(originalPath);
		return dto;
	}

	@Override
	public String downloadHelpImages(ChecklistFormDto jsonObject,
			HttpHeaders headers) {
		
		String result=""; 
		ChecklistPortalResponse checklistResponse = null;
		
		checklistUserService = (ChecklistUserService) SpringApplicationContext.getBean("checklistUserServiceImpl");
		try {
			
			Map<String, Object> results = checklistUserService.downloadHelpImages(jsonObject);
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(results);
			checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000", "Image Download Successfully."));

		} catch (ChecklistMobileExceptions e) {
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse.setRequestStatus(new ChecklistRequestStatus("1001",e.getMessage()));
		}
		
		try {
			ObjectMapper mapper = new ObjectMapper();
			result = mapper.writeValueAsString(checklistResponse);
		} catch (JsonGenerationException e) {
			LOGGER.info(e.getMessage());
		} catch (JsonMappingException e) {
			LOGGER.info(e.getMessage());
		} catch (IOException e) {
			LOGGER.info(e.getMessage());
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
		}
		return result;
	}

	@Override
	public String ischecklistnameexists(ChecklistFormDto jsonObject,
			HttpHeaders headers) {
		
		String result=""; 
		ChecklistPortalResponse checklistResponse = null;
		
		checklistUserService = (ChecklistUserService) SpringApplicationContext.getBean("checklistUserServiceImpl");
		try {
			
			String results = checklistUserService.ischecklistnameexists(jsonObject);
			if (!"0".equals(results)) {
				results = "Checklist name already exists.";
			} else {
				results = "Checklist name not exists.";
			}
			Map<String, Object> resObject= new HashMap<String, Object>();
			resObject.put("Result", results);
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(resObject);
			checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000", "Success"));

		} catch (ChecklistMobileExceptions e) {
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistPortalResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse.setRequestStatus(new ChecklistRequestStatus("1001",e.getMessage()));
		}

		try {
			ObjectMapper mapper = new ObjectMapper();
			result = mapper.writeValueAsString(checklistResponse);
		} catch (JsonGenerationException e) {
			LOGGER.info(e.getMessage());
		} catch (JsonMappingException e) {
			LOGGER.info(e.getMessage());
		} catch (IOException e) {
			LOGGER.info(e.getMessage());
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
		}
		return result;
	}
}
