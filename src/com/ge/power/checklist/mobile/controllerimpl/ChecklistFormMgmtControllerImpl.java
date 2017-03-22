package com.ge.power.checklist.mobile.controllerimpl;

import java.awt.Color;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.Set;

import javax.crypto.SecretKey;
import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MultivaluedMap;

import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ge.power.checklist.framework.SpringApplicationContext;
import com.ge.power.checklist.mobile.controller.ChecklistFormMgmtController;
import com.ge.power.checklist.mobile.dto.ChecklistDetailDto;
import com.ge.power.checklist.mobile.dto.ChecklistFormDto;
import com.ge.power.checklist.mobile.dto.ChecklistHelpTextDTO;
import com.ge.power.checklist.mobile.dto.ChecklistImageDTO;
import com.ge.power.checklist.mobile.dto.ChecklistParamDto;
import com.ge.power.checklist.mobile.dto.ChecklistRecordDTO;
import com.ge.power.checklist.mobile.dto.ChecklistRequestStatus;
import com.ge.power.checklist.mobile.dto.ChecklistResponse;
import com.ge.power.checklist.mobile.dto.ChecklistVersionDTO;
import com.ge.power.checklist.mobile.dto.UserDetailDTO;
import com.ge.power.checklist.mobile.exceptions.ChecklistMobileExceptions;
import com.ge.power.checklist.mobile.service.ChecklistFormMgmtService;
import com.ge.power.checklist.mobile.util.ChecklistImageUtility;
import com.ge.power.checklist.mobile.util.ChecklistUtility;
import com.ge.power.checklist.mobile.util.CommonValidation;
import com.ge.power.checklist.portal.util.ImageUtils;

public class ChecklistFormMgmtControllerImpl implements ChecklistFormMgmtController{
	
	static final Logger LOGGER = Logger.getLogger(ChecklistFormMgmtControllerImpl.class);
	static final ResourceBundle BUNDLE = ResourceBundle.getBundle("com.ge.power.checklist.resources.config");
	private ChecklistFormMgmtService checklistFormMgmtService;
	
	@Override
	public String authenticateUser(String ssoId) {
		checklistFormMgmtService = (ChecklistFormMgmtService)SpringApplicationContext.getBean("checklistFormMgmtServiceImpl");
		return checklistFormMgmtService.authenticateUser(ssoId);
	}

	@Override
	//public Map<String, ChecklistResponse> getChecklistDetail(String ssoId, String token) {
	public String getChecklistDetail(String ssoId, String groupId, HttpHeaders headers) {	
	
		ChecklistResponse checklistResponse = null;
		String result=""; 
		String responseString = "";
		MultivaluedMap<String, String> headersMap = headers.getRequestHeaders();
		Set<String>headerKeys = headersMap.keySet();
		for(String key:headerKeys){
			LOGGER.info(key +" ------ "+headers.getRequestHeader(key));
		}
		try {
			if((ssoId == null || "".equals(ssoId))){
				throw new ChecklistMobileExceptions("3001","Invalid Input for SSO Id.");
			} /*else if(!CommonValidation.isAlphaNumeric(ssoId)){
				throw new ChecklistMobileExceptions("3003","Please enter only alpha numeric value for SSO Id.");
			}*/ if((groupId == null || "".equals(groupId))){
				throw new ChecklistMobileExceptions("3001","Invalid Input for Group Id.");
			} else if(!CommonValidation.isNumeric(groupId)){
				throw new ChecklistMobileExceptions("3003","Please enter only numeric value for Group Id.");
			} else{
			checklistFormMgmtService = (ChecklistFormMgmtService)SpringApplicationContext.getBean("checklistFormMgmtServiceImpl");
			String groupIdStr = "";
			List<Integer> groupIds = checklistFormMgmtService.getGroupIdsBySSOId(ssoId);
			if(groupIds != null && groupIds.size() > 0){
				Iterator<Integer> groupIdItr = groupIds.iterator();
				while(groupIdItr.hasNext()){
					Integer groupId1 = groupIdItr.next();
					if(groupIdItr.hasNext()){
						groupIdStr = groupIdStr+groupId1+",";
					} else{
						groupIdStr = groupIdStr+groupId1;
					}
				}
			}
			List<ChecklistDetailDto> busHierarchy = checklistFormMgmtService.getBusinessHierarchyDetail(groupIdStr);
			List<ChecklistDetailDto> checklistDetail = checklistFormMgmtService.getChecklistDetail(groupIdStr,"14");
			
			if((busHierarchy != null && busHierarchy.size() > 0) && (checklistDetail != null && checklistDetail.size() >0)){
				Map<String, Object> checklistObj = null;
				Map<String, Object> functionObj = null;
				Map<String, Object> subFunctionObj = null;
				Map<String, Object> groupObj = null;
				
				List<Map<String, Object>> functionElementList = new ArrayList<Map<String, Object>>();
				
				List<Map<String, Object>> functionElement = new ArrayList<Map<String, Object>>();
				List<Map<String, Object>> subFunctionElement = null;
				List<Map<String, Object>> groupElement = null;
				
				List<ChecklistDetailDto> functionList = new ArrayList<ChecklistDetailDto>();
				List<ChecklistDetailDto> subFunctionList = new ArrayList<ChecklistDetailDto>();
				List<ChecklistDetailDto> groupList = new ArrayList<ChecklistDetailDto>();
				
				String functionIds = "";
				String subFunctionIds = "";
				
				//Creating saperate list of functions
				for(int i=0; i<busHierarchy.size();i++){
					ChecklistDetailDto dto = busHierarchy.get(i);
					if(dto.getGroupParentId().equals("0")){
						functionIds = functionIds+dto.getFunctionId()+",";
						functionList.add(dto);
					}
				}
				//Creating saperate list of sub functions
				for(int i=0; i<busHierarchy.size();i++){
					ChecklistDetailDto dto = busHierarchy.get(i);
					if(functionIds.contains(dto.getGroupParentId())){
						subFunctionIds = subFunctionIds+dto.getFunctionId()+",";
						subFunctionList.add(dto);
					}
				}
				//Creating saperate list of groups
				String []subFunIds = subFunctionIds.split(",");
				for(int i=0; i<busHierarchy.size();i++){
					ChecklistDetailDto dto = busHierarchy.get(i);
					for(String sId : subFunIds){
						if(dto.getGroupParentId().equals(sId)){
							groupList.add(dto);
						}
					}
				}
				
				
				for(int i=0; i<functionList.size();i++){
					ChecklistDetailDto dto = functionList.get(i);
					functionObj = new HashMap<String, Object>();
					functionObj.put("functionId", dto.getFunctionId());
					functionObj.put("functionName", dto.getFunctionName());
					subFunctionObj = null;
					groupObj = null;
					groupElement = null;
					//subFunctionElement = null;
					for(int j=0; j<subFunctionList.size();j++){
						ChecklistDetailDto subdto = subFunctionList.get(j);
						if(dto.getFunctionId().equals(subdto.getGroupParentId())){
							subFunctionObj = new HashMap<String, Object>();
							subFunctionElement = new ArrayList<Map<String, Object>>();
							subFunctionObj.put("subFunctionId", subdto.getFunctionId());
							subFunctionObj.put("subFunctionName", subdto.getFunctionName());
							groupObj = null;
							for(int k=0; k<groupList.size();k++){
								ChecklistDetailDto grdto = groupList.get(k);
								if(subdto.getFunctionId().equals(grdto.getGroupParentId())){
									groupObj = new HashMap<String, Object>();
									groupObj.put("groupId", grdto.getFunctionId());
									groupObj.put("groupName", grdto.getFunctionName());
									groupElement = new ArrayList<Map<String, Object>>();
									for(int ind = 0; ind< checklistDetail.size(); ind ++){
										ChecklistDetailDto checkdto = checklistDetail.get(ind); 
										if(grdto.getFunctionId().equals(checkdto.getGroupId())){
											checklistObj = new HashMap<String, Object>();
											checklistObj.put("checklistId", checkdto.getFormId());
											checklistObj.put("baseFormId", checkdto.getBaseFormId());
											checklistObj.put("checklistName", checkdto.getFormName());
											checklistObj.put("language", checkdto.getFormLanguage());
											checklistObj.put("status", checkdto.getFormStatus());
											checklistObj.put("versionNo", checkdto.getVersionNo());
											checklistObj.put("createdDate", checkdto.getFormConfigured());
											groupElement.add(checklistObj);
											checklistObj = null;
										}
									}
									if(groupElement.size() > 0){
										groupObj.put("groupElement", groupElement);
										groupElement = null;
									}
								}
								if(groupObj != null){
									subFunctionElement.add(groupObj);
									groupObj = null;
								}
							}
							
							if(subFunctionElement.size() > 0){
								subFunctionObj.put("subFunctionElement", subFunctionElement);
							}
							//subFunctionElement.clear();
							//subFunctionElement = null;
						}
						if(subFunctionObj != null){
							functionElement.add(subFunctionObj);
							subFunctionObj = null;
						}
					}
				
					if(functionElement.size() > 0){
						functionObj.put("functionElement", functionElement);
					}
					
					if(functionObj != null){
						functionElementList.add(functionObj);
						functionObj = null;
					}
					
				}
				
				checklistResponse = new ChecklistResponse();
				checklistResponse.setResultSet(functionElementList);
				checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000","SUCCESS"));
			} else{
				throw new ChecklistMobileExceptions("3005","No Record found to display.");
			}
		}
		
		  /*catch(CannotGetJdbcConnectionException){
			  
		  }	*/
		} catch (ChecklistMobileExceptions e) {
			//e.printStackTrace();
			LOGGER.info(e.getErrorMessage());
			checklistResponse = new ChecklistResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			//checklistResponse.setRequestStatus(new ChecklistRequestStatus("1001","Not Able to connect with database, Please try again after some time."));
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
		//return responseString;
	}
	
	@Override
	public String getUserRoleAndPermission(String ssoId, HttpHeaders headers) {
		ChecklistResponse checklistResponse = null;
		checklistFormMgmtService = (ChecklistFormMgmtService)SpringApplicationContext.getBean("checklistFormMgmtServiceImpl");
		MultivaluedMap<String, String> headersMap = headers.getRequestHeaders();
		Set<String>headerKeys = headersMap.keySet();
		for(String key:headerKeys){
			LOGGER.info(key +" ------ "+headers.getRequestHeader(key));
		}
		String result=""; 
		try {
			if((ssoId == null || "".equals(ssoId))){
				throw new ChecklistMobileExceptions("3001","Invalid Input for SSo Id.");
			} /*else if(!CommonValidation.isAlphaNumeric(ssoId)){
				throw new ChecklistMobileExceptions("3003","Please enter only alpha numeric value for SSO Id.");
			}*/ else{
				checklistFormMgmtService = (ChecklistFormMgmtService)SpringApplicationContext.getBean("checklistFormMgmtServiceImpl");
				List<UserDetailDTO> checklistmap = checklistFormMgmtService.getUserRoleAndPermission(ssoId);
				
				if(checklistmap != null && checklistmap.size() > 0){
					UserDetailDTO detailDTO = checklistmap.get(0);	
					
					Map<String, Object> jsonObject = new HashMap<String, Object>();
					
					jsonObject.put("ssoid", detailDTO.getSsoId());
					jsonObject.put("firstName", detailDTO.getFirstName());
					jsonObject.put("lastName", detailDTO.getLastName());
					jsonObject.put("roleName", detailDTO.getRoleName());
					jsonObject.put("groupId", detailDTO.getGroupId());
					jsonObject.put("isChecklistAppUser", "t".equalsIgnoreCase(detailDTO.getIsChecklistAppUser()) ? "TRUE" : "FALSE");
					//jsonObject.put("headerMap", headersMap);
					
					checklistResponse = new ChecklistResponse();
					checklistResponse.setResultSet(jsonObject);
					checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000","SUCCESS"));
				} else{
					throw new ChecklistMobileExceptions("3005","No Record found to display.");
				}
			}
		}
				
		catch (ChecklistMobileExceptions e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			//checklistResponse.setRequestStatus(new ChecklistRequestStatus("1001","Not Able to connect with database, Please try again after some time."));
			checklistResponse.setRequestStatus(new ChecklistRequestStatus("1001",e.getMessage()));
		}
				
		try{		
				ObjectMapper mapper = new ObjectMapper();
				result=mapper.writeValueAsString(checklistResponse);
		} catch (JsonGenerationException e) {
			LOGGER.info(e.getMessage());
		} catch (JsonMappingException e) {
			LOGGER.info(e.getMessage());
		} catch (IOException e) {
			LOGGER.info(e.getMessage());
		} 
		
		return result;
	}

	@Override
	public String getChecklistMetadata(String ssoId, String formId, String languageName,  String baseFormId,  String versionNo, HttpHeaders headers) {
		ChecklistResponse checklistResponse = null;
		String result=""; 
		String responseString = "";
		
		MultivaluedMap<String, String> headersMap = headers.getRequestHeaders();
		Set<String>headerKeys = headersMap.keySet();
		for(String key:headerKeys){
			LOGGER.info(key +" ------ "+headers.getRequestHeader(key));
		}
		try {
			if((ssoId == null || "".equals(ssoId))){
				throw new ChecklistMobileExceptions("3001","Invalid Input for SSo Id.");
			}/*else if(!CommonValidation.isAlphaNumeric(ssoId)){
				throw new ChecklistMobileExceptions("3003","Please enter only alpha numeric value for SSO Id.");
			}*/
			if((formId == null || "".equals(formId))){
				throw new ChecklistMobileExceptions("3001","Invalid Input for Form Id.");
			} else if(!CommonValidation.isNumeric(formId)){
				throw new ChecklistMobileExceptions("3003","Please enter only numeric value for From Id.");
			}
			if((baseFormId == null || "".equals(baseFormId))){
				throw new ChecklistMobileExceptions("3001","Invalid Input for Base Form Id.");
			} else if(!CommonValidation.isNumeric(baseFormId)){
				throw new ChecklistMobileExceptions("3003","Please enter only numeric value for Base From Id.");
			}
			if((versionNo == null || "".equals(versionNo))){
				throw new ChecklistMobileExceptions("3001","Invalid Input for Version No.");
			} else if(!CommonValidation.isDecimal(versionNo)){
				throw new ChecklistMobileExceptions("3003","Please enter only numeric value for Version No.");
			} else{
				checklistFormMgmtService = (ChecklistFormMgmtService)SpringApplicationContext.getBean("checklistFormMgmtServiceImpl");
				
				ChecklistDetailDto detailDto1 = new ChecklistDetailDto();
				detailDto1.setFormId(formId);
				detailDto1.setBaseFormId(baseFormId);
				detailDto1.setFormLanguage(languageName);
				detailDto1.setVersionNo(versionNo);
				
				List<ChecklistDetailDto> checklistmap = checklistFormMgmtService.getChecklistMetadata(detailDto1);
				
				ChecklistDetailDto fromDtail = checklistFormMgmtService.getChecklistFormDetailfromId(detailDto1);
				
				//List<ChecklistDetailDto> stepDetailList = checklistFormMgmtService.getStepDetailFromStepid(stepId);
				
				if(checklistmap == null || checklistmap.size() == 0){
					throw new ChecklistMobileExceptions("3005","No Record found to display.");
				}else{
					
					Map<String, Object> formJson = new HashMap<String, Object>();
					List<Map<String, Object>> formElement = new ArrayList<Map<String, Object>>();
					List<Map<String, Object>> sectionElement = null;
					List<Map<String, Object>> stepElement = null;
					List<Map<String, Object>> ruleList = null;
					List<Map<String, Object>> helpTextList = null;
					List<Map<String, Object>> queElementList = null;
					List<Map<String, Object>> ansElementList = null;
					List<Map<String, Object>> elemAttribList = null;
					
					Map<String, Object> helpTextObject = null;
					
					formJson.put("formId", formId);
					formJson.put("formName", fromDtail.getFormName());
					formJson.put("versionNo", fromDtail.getPublishVersion());
					formJson.put("sectionCount", fromDtail.getAttributeCount());
					formJson.put("projectApplicability", fromDtail.getAssignedToProject());
					
					String []formHelpStr = ChecklistUtility.getValidData(fromDtail.getFormHelpTextDetail());
					helpTextList = new ArrayList<Map<String, Object>>();
					if(formHelpStr != null && !"".equals(formHelpStr) && formHelpStr.length >0){
						for(int ind=0; ind < formHelpStr.length; ind++){
							String []elemArray = formHelpStr[ind].split("#");
							if(elemArray != null && elemArray.length >=3){
								helpTextObject = new HashMap<String, Object>();
								String helpTextId1 = ChecklistUtility.getSubString(elemArray[0], "(", "");
								String helpTextId = ChecklistUtility.getSubString(helpTextId1, "{", "");
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
							helpTextList = new ArrayList<Map<String, Object>>();
							if(sectionHelpStr != null && !"".equals(sectionHelpStr) && sectionHelpStr.length >0){
								for(int ind=0; ind < sectionHelpStr.length; ind++){
									String []elemArray = sectionHelpStr[ind].split("#");
									if(elemArray != null && elemArray.length >=3){
										helpTextObject = new HashMap<String, Object>();
										String helpTextId1 = ChecklistUtility.getSubString(elemArray[0], "(", "");
										String helpTextId = ChecklistUtility.getSubString(helpTextId1, "{", "");
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
							jsonObject.put("sectionHelpText", helpTextList);
							if(convertedStr != null && !"".equals(convertedStr) && convertedStr.length >0){
								
								for(int i=0;i<convertedStr.length; i++){
									Map<String, Object> stepJson = new HashMap<String, Object>();
									String []stepArray = convertedStr[i].split(",");
									String stepId = "";
									String stepLabel = "";
									String stepHelp = "";
									if (stepArray.length >= 4) {
										
										stepId = ChecklistUtility.getSubString(stepArray[0], "(", "");
										stepLabel = stepArray[2];
										
										helpTextList = new ArrayList<Map<String, Object>>();
										for (int ind=3; ind < stepArray.length; ind++) {
											
											stepHelp = ChecklistUtility.getSubString(stepArray[ind], ")", "");
											if(stepHelp != null && !"".equals(stepHelp)){
												
												String []elemArray = stepHelp.split("#");
												if(elemArray != null && elemArray.length >=3){
													helpTextObject = new HashMap<String, Object>();
													String helpTextId1 = ChecklistUtility.getSubString(elemArray[0], "(", "");
													String helpTextId = ChecklistUtility.getSubString(helpTextId1, "{", "");
													String helpTextDesc = ChecklistUtility.getSubString(elemArray[1], "(", "");
													String helpImageUrl = ChecklistUtility.replaceCharToString(elemArray[2], ")", "");
													helpImageUrl = ChecklistUtility.replaceCharToString(helpImageUrl, "}", "");
													helpTextObject.put("helpTextId", helpTextId);
													helpTextObject.put("helpTextDesc", helpTextDesc);
													helpTextObject.put("imageUrl", helpImageUrl);
													helpTextList.add(helpTextObject);
												}
											} else{
												helpTextList.add(new HashMap<String, Object>());
											}
										}
									} else {
										stepId = ChecklistUtility.getSubString(stepArray[0], "(", "");
										stepLabel = stepArray[2];
									}
									List<ChecklistRecordDTO> stepDetailList = null;
									if(stepId != null && !"".equals(stepId) && !"\"\"".equals(stepId)){
										stepDetailList = checklistFormMgmtService.getStepDetailFromStepid(stepId);
									}
									stepJson.put("stepId", stepId);
									stepJson.put("stepName", stepArray[1]);
									stepJson.put("stepLabel", stepLabel);
									stepJson.put("stepHelpText", helpTextList);
									
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
												//String []helpTextStr = ChecklistUtility.getConvertedString(dto.getHelpText());
												String []helpTextStr = ChecklistUtility.getValidData(dto.getHelpText());
												if(helpTextStr != null && !"".equals(helpTextStr) && helpTextStr.length >0){
													for(int ind=0; ind < helpTextStr.length; ind++){
														String []elemArray = helpTextStr[ind].split("#");
														if(elemArray != null && elemArray.length >=3){
															queElements = new HashMap<String, Object>();
															String helpTextId1 = ChecklistUtility.getSubString(elemArray[0], "(", "");
															String helpTextId = ChecklistUtility.getSubString(helpTextId1, "{", "");
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
												//LOGGER.info(dto.getValidationRules());
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
																		if(elemId.equals(elementId) && attribSeq.equals(elementSequence)){
																			elemAttribute.put(attribName, attribValue);
																		}
																}
															}
																elemAttribList.add(elemAttribute);
																ansElements.put("elementAttribute", elemAttribList);
															}
														
															if(validationStr != null && !"".equals(validationStr) && validationStr.length >0){
																for(int ind1=0; ind1 < validationStr.length; ind1++){
																	//LOGGER.info("------ "+validationStr[ind1]);
																	String []ruleArray = validationStr[ind1].split(",");
																	//LOGGER.info(ruleArray);
																	ruleJson = new HashMap<String, Object>();
																	if(ruleArray != null && ruleArray.length >=8){
																		String ruleId = ChecklistUtility.getSubString(ruleArray[0], "(", "");
																		String noOfElement = ChecklistUtility.getSubString(ruleArray[5], "", "");
																		String elementIdforRule = ChecklistUtility.getSubString(ruleArray[6], "", "");
																		String elemSequance = ChecklistUtility.getSubString(ruleArray[7], ")", "");
																		if(elementIdforRule.equals(elementId) && elemSequance.equals(elementSequence)){
																			ruleJson.put("ruleId", ruleId);
																			ruleJson.put("ruleName", ChecklistUtility.getSubString(ruleArray[1], "", ""));
																			ruleJson.put("ruleFormula", ChecklistUtility.getSubString(ruleArray[2], "", ""));
																			ruleJson.put("ruleAction", ChecklistUtility.getSubString(ruleArray[3], "", ""));
																			ruleJson.put("ruleActionOutput", ChecklistUtility.getSubString(ruleArray[4], "", ""));
																			ruleJson.put("noOfElement", noOfElement);
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
																		//ruleList.add(ruleJson);
																	} else{
																		//LOGGER.info("ruleArray : "+ruleArray.length);
																		String ruleId = ChecklistUtility.getSubString(ruleArray[0], "(", "");
																		String noOfElement = ChecklistUtility.getSubString(ruleArray[1], "", "");
																		String elementIdforRule = ChecklistUtility.getSubString(ruleArray[2], "", "");
																		String elemSequance = ChecklistUtility.getSubString(ruleArray[3], ")", "");
																		if(elementIdforRule.equals(elementId) && elemSequance.equals(elementSequence)){
																			ruleJson.put("ruleId", ruleId);
																			ruleJson.put("ruleName", noOfElement);
																			ruleList.add(ruleJson);
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
												//answerJson.put("commentsInputType", "Textarea");
												//answerJson.put("validations", ruleList);
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
					
					checklistResponse = new ChecklistResponse();
					checklistResponse.setResultSet(formJson);
					checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000","SUCCESS"));
					
					
				}
			}
			
			
			
			
			
		} catch (ChecklistMobileExceptions e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			//checklistResponse.setRequestStatus(new ChecklistRequestStatus("1001","Not Able to connect with database, Please try again after some time."));
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
	public String getChecklistlatestRecords(ChecklistParamDto paramDto, HttpHeaders headers) {
		ChecklistResponse checklistResponse = null;
		String result=""; 
		String responseString = "";
		
		MultivaluedMap<String, String> headersMap = headers.getRequestHeaders();
		Set<String>headerKeys = headersMap.keySet();
		for(String key:headerKeys){
			LOGGER.info(key +" ------ "+headers.getRequestHeader(key));
		}
		try {
			if((paramDto.getSsoId() == null || "".equals(paramDto.getSsoId()))){
				throw new ChecklistMobileExceptions("3001","Invalid Input for SSo Id.");
			} /*else if(!CommonValidation.isAlphaNumeric(ssoId)){
				throw new ChecklistMobileExceptions("3003","Please enter only alpha numeric value for SSO Id.");
			}*/
			if((paramDto.getFormId() == null || "".equals(paramDto.getFormId()))){
				throw new ChecklistMobileExceptions("3001","Invalid Input for Form Id.");
			} else if(!CommonValidation.isNumeric(paramDto.getFormId())){
				throw new ChecklistMobileExceptions("3003","Please enter only numeric value for From Id.");
			} if((paramDto.getProjectId() == null || "".equals(paramDto.getProjectId()))){
				throw new ChecklistMobileExceptions("3001","Invalid Input for Project Id.");
			} else{
				checklistFormMgmtService = (ChecklistFormMgmtService)SpringApplicationContext.getBean("checklistFormMgmtServiceImpl");
				List<ChecklistRecordDTO> checklistmap = checklistFormMgmtService.getChecklistlatestRecords(paramDto.getSsoId(), paramDto.getFormId(), paramDto.getLanguage(), paramDto.getProjectId(),paramDto.getCountOfTheRecords(),paramDto.getIndexOfTheRecords());
				
				Integer recordCount = checklistFormMgmtService.getChecklistRecordCount(paramDto.getSsoId(), paramDto.getFormId(), paramDto.getLanguage(), paramDto.getProjectId());
				
				if(checklistmap == null || checklistmap.size() == 0){
					throw new ChecklistMobileExceptions("3005","No Record found to display.");
				}else{
					
					
					List<Map<String, Object>> recordElement = null;
					List<Map<String, Object>> recordElements = new ArrayList<Map<String, Object>>();
					List<Map<String, Object>> sectionElement = null;
					List<Map<String, Object>> stepElement = null;
					List<Map<String, Object>> answerElementsList = null;
					Map<String, Object> recordJson = null;
					Map<String, Object> recordListJson = new HashMap<String, Object>();
					String recordId = "";
					String sectionId = "";
					String stepId = "";
					List<ChecklistRecordDTO> queAnsDetailList = null;
					Map<String, Object> sectionJson = null;
					Map<String, Object> stepJson = null;
					List<Map<String,Object>> imageList = null;
					List<Map<String,Object>> ruleImageList = null;
					List<Map<String,Object>> ansRuleList = null;
					Map<String, Object> elementJson = null;
					Map<String, Object> answerElementJson = null;
					ChecklistRecordDTO nextRecordDTO = null;
					
					//for(ChecklistRecordDTO recordDTO : checklistmap){
					for(int i=0; i < checklistmap.size(); i++){
						ChecklistRecordDTO recordDTO = checklistmap.get(i);
						if(i < (checklistmap.size()-1)){
							nextRecordDTO = checklistmap.get(i+1);
						}
						if(recordDTO != null){
							if(!recordId.equals(recordDTO.getRecordId())){
								recordId = recordDTO.getRecordId();
								recordElement = new ArrayList<Map<String, Object>>();
								recordJson = new HashMap<String, Object>();
								recordJson.put("recordId", recordId);
								recordJson.put("formId", recordDTO.getChecklistId());
								recordJson.put("recordStatus", recordDTO.getRecordStatus());
								recordJson.put("syncStatus", recordDTO.getSyncStatus());
								recordJson.put("projectId", recordDTO.getProjectId());
								recordJson.put("projectName", recordDTO.getProjectName());
								recordJson.put("turbineId", recordDTO.getTurbineId());
								recordJson.put("createdBy", recordDTO.getCreatedBySSO() != null ? recordDTO.getCreatedBySSO() : "");
								recordJson.put("createdByName", recordDTO.getCreatedByName() != null ? recordDTO.getCreatedByName() : "");
								recordJson.put("createdDate", recordDTO.getCreatedDate() != null ? recordDTO.getCreatedDate() : "");
								recordJson.put("modifiedBy", recordDTO.getModifiedBySSO() != null ? recordDTO.getModifiedBySSO() : "");
								recordJson.put("modifiedByName", recordDTO.getModifiedByName() != null ? recordDTO.getModifiedByName() : "");
								recordJson.put("modifiedDate", recordDTO.getModifiedDate() != null ? recordDTO.getModifiedDate() : "");
								recordJson.put("versionNo", recordDTO.getVersionNo() != null ? recordDTO.getVersionNo() : "");
								sectionId = "";
								stepId = "";
								queAnsDetailList = checklistFormMgmtService.getRecordDetailbyRecordIdStepId(recordId, recordDTO.getStepId());
								
								if(queAnsDetailList != null && queAnsDetailList.size()>0){
									int currRecQuesId = 0;
									int preRecQuesId = 0;
									for(ChecklistRecordDTO dto : queAnsDetailList){
										
										//if("".equals(recordId) || recordId.equals(recordDTO.getRecordId())){
											if("".equals(sectionId) || !sectionId.equals(dto.getSectionId())){
												sectionJson = new HashMap<String, Object>();
												sectionElement = new ArrayList<Map<String,Object>>();
												sectionId = dto.getSectionId();
												sectionJson.put("sectionId", sectionId);
												
												sectionJson.put("sectionElements", sectionElement);
												recordElement.add(sectionJson);
											}
											if("".equals(stepId) || !stepId.equals(dto.getStepId())){
												stepJson = new HashMap<String, Object>();
												stepElement = new ArrayList<Map<String,Object>>();
												stepId = dto.getStepId();
												stepJson.put("stepId", stepId);
												
												stepJson.put("stepElements", stepElement);
												sectionElement.add(stepJson);
											}
											
											//	if(queAnsDetailList != null && queAnsDetailList.size() > 0){
												Map<String, Object> imageElements = null;
										//		for(ChecklistRecordDTO queAnsDetail : queAnsDetailList){
												imageList = new ArrayList<Map<String,Object>>();
												
												currRecQuesId = Integer.parseInt(dto.getQuestionId());
												
												if(currRecQuesId != preRecQuesId){
													preRecQuesId = currRecQuesId;
													
													answerElementsList = new ArrayList<Map<String,Object>>();
													
													elementJson = new HashMap<String, Object>();
													elementJson.put("questionId", dto.getQuestionId());
													elementJson.put("answerId", dto.getAnswerId());
													elementJson.put("answerValue", answerElementsList);
													elementJson.put("comments", dto.getComments());
													elementJson.put("answerImages", imageList);
													stepElement.add(elementJson);
												}
												
												ruleImageList = new ArrayList<Map<String,Object>>();
												ansRuleList = new ArrayList<Map<String,Object>>();
												answerElementJson = new HashMap<String, Object>();
												answerElementJson.put("answerElementValue", dto.getAnswerValue());
												answerElementJson.put("answerInputElementId", dto.getElementId());
												answerElementJson.put("answerInputElementName", dto.getElementName());
												answerElementJson.put("elementAttributeName", dto.getNameAttribValue());
												answerElementJson.put("sequesnceId", dto.getElementSequense());
												
												String []additionalParamStr = ChecklistUtility.getValidData(dto.getAdditionalFields());
												if(additionalParamStr != null && !"".equals(additionalParamStr) && additionalParamStr.length >0){
													imageElements = new HashMap<String, Object>();
													for(int ind=0; ind < additionalParamStr.length; ind++){
														String []elemArray = additionalParamStr[ind].split(",");
														if(elemArray != null && elemArray.length <=2){
															
															String fieldType = ChecklistUtility.getSubString(elemArray[0], "(", "");
															String fieldValue = ChecklistUtility.getSubString(elemArray[1], ")", "");
															if(!imageElements.containsKey(fieldType)){
																imageElements.put(fieldType, fieldValue);
															}
														}
													}
													ansRuleList.add(imageElements);
												}
												answerElementJson.put("rulesAnswerValues", ansRuleList);
												String []ruleImageStr = ChecklistUtility.getValidData(dto.getRuleImages());
												if(ruleImageStr != null && !"".equals(ruleImageStr) && ruleImageStr.length >0){
													for(int ind=0; ind < ruleImageStr.length; ind++){
														String []elemArray = ruleImageStr[ind].split(",");
														if(elemArray != null && elemArray.length >=4){
															imageElements = new HashMap<String, Object>();
															String imageId = ChecklistUtility.getSubString(elemArray[0], "(", "");
															String imageLocation = ChecklistUtility.getSubString(elemArray[1], ")", "");
															String imageDesc = ChecklistUtility.getSubString(elemArray[2], ")", "");
															String imageThumbnailData = ChecklistUtility.getSubString(elemArray[3], ")", "");
															imageElements.put("imageId", imageId);
															imageElements.put("imageLocation", imageLocation);
															imageElements.put("imageDescription", imageDesc);
															imageElements.put("thumbnailData", imageThumbnailData);
															ruleImageList.add(imageElements);
														}
													}
												}
												answerElementJson.put("rulesAnswerImages", ruleImageList);
												
												String []ansImageStr = ChecklistUtility.getValidData(dto.getAnswerImages());
												if(ansImageStr != null && !"".equals(ansImageStr) && ansImageStr.length >0){
													for(int ind=0; ind < ansImageStr.length; ind++){
														String []elemArray = ansImageStr[ind].split(",");
														if(elemArray != null && elemArray.length >=4){
															imageElements = new HashMap<String, Object>();
															String imageId = ChecklistUtility.getSubString(elemArray[0], "(", "");
															String imageLocation = ChecklistUtility.getSubString(elemArray[1], ")", "");
															String imageDesc = ChecklistUtility.getSubString(elemArray[2], ")", "");
															String imageThumbnailData = ChecklistUtility.getSubString(elemArray[3], ")", "");
															imageElements.put("imageId", imageId);
															imageElements.put("imageLocation", imageLocation);
															imageElements.put("imageDescription", imageDesc);
															imageElements.put("thumbnailData", imageThumbnailData);
															imageList.add(imageElements);
														}
													}
												}
												answerElementsList.add(answerElementJson);
											}
											
										}
										
										if(i == (checklistmap.size()-1) || (nextRecordDTO != null && !recordDTO.getRecordId().equals(nextRecordDTO.getRecordId()))){
											recordJson.put("recordElements", recordElement);
											recordElements.add(recordJson);
										}
									}
								}
							}
					
					recordListJson.put("recordCount",String.valueOf(recordCount));
					recordListJson.put("recordList", recordElements);
					recordListJson.put("baseFormId", paramDto.getFormId());
					checklistResponse = new ChecklistResponse();
					checklistResponse.setResultSet(recordListJson);
					checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000","SUCCESS"));
				}
				
			}
			
		} catch (ChecklistMobileExceptions e) {
			//e.printStackTrace();
			LOGGER.info(e.getErrorMessage());
			checklistResponse = new ChecklistResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			//checklistResponse.setRequestStatus(new ChecklistRequestStatus("1001","Not Able to connect with database, Please try again after some time."));
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
	
	/*
	 * Insert Record and Edit Record by Field Engineer 
	 * @param ChecklistRecordDTO
	 * @param headers
	 * @return
	 */
	
	@Override	
	public String recordDetail(ChecklistFormDto jsonObject, HttpHeaders headers){	
	
		ChecklistResponse checklistResponse = null;
		String result="";
		String actionFLG="";
		String responseString="";
		String recordHeaderKey="";
		String recordHeaderVal="";
		MultivaluedMap<String, String> headersMap = headers.getRequestHeaders();
		Set<String>headerKeys = headersMap.keySet();
		
		for(String key:headerKeys){
			if("recordType".equalsIgnoreCase(key)){
				recordHeaderVal=headersMap.getFirst(key);
			}			
			//recordHeaderKey=key;
			//recordHeaderVal=headersMap.getFirst(key);
			LOGGER.info(key +" ------ "+headers.getRequestHeader(key));
			//actionFLG=(String)headers.getRequestHeader("ACTIONFLG");
		}		
		//recordHeaderVal="editRecord";//updateRecord
		try {
			List<String> errorList = ChecklistUtility.validateRecordJsonData(jsonObject);
			
			if(errorList != null && errorList.size() > 0){
				HashMap<String, Object> errorMap = new HashMap<String, Object>();
				errorMap.put("errorList", errorList);
				throw new ChecklistMobileExceptions(errorMap,"3010","Input Validation Failed");
			} else{
				if("newRecord".equals(recordHeaderVal)){
					checklistFormMgmtService = (ChecklistFormMgmtService)SpringApplicationContext.getBean("checklistFormMgmtServiceImpl");
					Map<String, Object> insertRecord = checklistFormMgmtService.insertRecordDetail(jsonObject);
					
					Set<String>recordKeys = insertRecord.keySet();
					for(String key:recordKeys){			
						LOGGER.info(" record key "+ key +" record val "+insertRecord.get(key));
						
					}
					Map<String, Object> responseRecord = new HashMap<String, Object>();
					List <ChecklistFormDto> res = new ArrayList<ChecklistFormDto>();
					//-----------------------------			
					responseRecord.put("serverRecordId",jsonObject.getServerRecordId());
					responseRecord.put("syncStatus",jsonObject.getSyncStatus());
					responseRecord.put("recordStatus",jsonObject.getRecordStatus());
					responseRecord.put("formId",jsonObject.getFormId());
					responseRecord.put("localRecordId",jsonObject.getLocalRecordId());
					responseRecord.put("submittedBy",jsonObject.getSubmittedBy());
					//res.add(responseRecord);
					//---------------------------------
						checklistResponse = new ChecklistResponse();
						//checklistResponse.setResultSet(insertRecord);
						checklistResponse.setResultSet(responseRecord);
						checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000","SUCCESS"));
					}
					if("editRecord".equals(recordHeaderVal)){
						checklistFormMgmtService = (ChecklistFormMgmtService)SpringApplicationContext.getBean("checklistFormMgmtServiceImpl");
						Map<String, Object> editRecord = checklistFormMgmtService.editRecordDetail(jsonObject);
						
						Set<String>recordKeys1 = editRecord.keySet();
						for(String key:recordKeys1){			
							LOGGER.info(" record key "+ key +" record val "+editRecord.get(key));
						}
						Map<String, Object> responseRecord = new HashMap<String, Object>();
						//List <ChecklistFormDto> res = new ArrayList<ChecklistFormDto>();
						//-----------------------------			
						responseRecord.put("serverRecordId",jsonObject.getServerRecordId());
						responseRecord.put("syncStatus",jsonObject.getSyncStatus());
						responseRecord.put("recordStatus",jsonObject.getRecordStatus());
						responseRecord.put("formId",jsonObject.getFormId());
						responseRecord.put("localRecordId",jsonObject.getLocalRecordId());
						responseRecord.put("submittedBy",jsonObject.getSubmittedBy());
						//res.add(responseRecord);
						//---------------------------------
						
							checklistResponse = new ChecklistResponse();
							//checklistResponse.setResultSet(editRecord);
							checklistResponse.setResultSet(responseRecord);
							checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000","SUCCESS"));
						}
			}
		  
		} catch (ChecklistMobileExceptions e) {
			//e.printStackTrace();
			LOGGER.info(e.getErrorMessage());
			checklistResponse = new ChecklistResponse();
			checklistResponse.setResultSet(e.getErrorMap());
			checklistResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			//checklistResponse.setRequestStatus(new ChecklistRequestStatus("1001","Not Able to connect with database, Please try again after some time."));
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
		//return responseString;
	}

	//


	
	
	@Override
	//public String uploadChecklistImages(String recordId, String imageId, MultipartFile file, HttpServletRequest req) {
	public String uploadChecklistImages(ChecklistImageDTO jsonObject, HttpHeaders headers) {	
		ChecklistResponse checklistResponse = null;
		String result=""; 
		String responseString = "";
		
		MultivaluedMap<String, String> headersMap = headers.getRequestHeaders();
		Set<String>headerKeys = headersMap.keySet();
		for(String key:headerKeys){
			LOGGER.info(key +" ------ "+headers.getRequestHeader(key));
		}
		
		try {
			checklistFormMgmtService = (ChecklistFormMgmtService)SpringApplicationContext.getBean("checklistFormMgmtServiceImpl");
			
			String token = jsonObject.getOperation();
			//String imageName = jsonObject.getImageName();
			String imageSequance = jsonObject.getSequanceNo();
			String questionId = jsonObject.getQuestionId();
			String imageData = jsonObject.getImageData();
			String formId = jsonObject.getFormId();
			String recordId = jsonObject.getRecordId();
			String imageFor = jsonObject.getImageType();
			String userId = jsonObject.getUserSSOId();
			String helpDescription =jsonObject.getHelpDescription();
			String helpTextLevel = jsonObject.getHelpTextLevel();
			String elementId =jsonObject.getElementId();
			String sequanceNo = jsonObject.getElementSequenceNo();
			
			String imagePath = BUNDLE.getString("imagePath");
			String imageType = BUNDLE.getString("imageType");
			
			if(imageSequance != null && !"".equals(imageSequance)){
				imageSequance = "_"+imageSequance;
			}
			String imagefinalPath = "";
			if(imageFor != null && !"".equals(imageFor) && "RuleImages".equals(imageFor)){
				imagefinalPath = imagePath+"/"+formId+"/RecordImages/"+imageFor;
			} else if(imageFor != null && !"".equals(imageFor)){
				imagefinalPath = imagePath+"/"+formId+"/"+imageFor;
			}
			if(helpTextLevel != null && !"".equals(helpTextLevel) && "SignatureImages".equals(helpTextLevel)){
				imagefinalPath = imagefinalPath+"/"+helpTextLevel;
			}
			
			File file1 = ChecklistUtility.getDirectory(imagePath,imagefinalPath);
			
			if(file1.exists()){
				String imageNewName = "";
				if("RecordImages".equalsIgnoreCase(imageFor) || "RuleImages".equals(imageFor)){
					imageNewName = recordId+"_"+questionId+imageSequance+"."+imageType;
				} else{
					imageNewName = questionId+imageSequance+"."+imageType;
				}
				String path = ChecklistImageUtility.base64StringToImage(imageNewName, imageData, file1);	
				if(path != null && !"".equals(path)){
					
					ChecklistHelpTextDTO helpTextDTO = new ChecklistHelpTextDTO();
					if("Add".equals(token)){
						if("RecordImages".equalsIgnoreCase(imageFor)){
							helpTextDTO.setFormId(formId);
							helpTextDTO.setRecordId(recordId);
							helpTextDTO.setQuestionId(questionId);
							helpTextDTO.setImageUrl(path);
							helpTextDTO.setUserSSOId(userId);
							helpTextDTO.setHelpDescription(helpDescription);
						}else if("RuleImages".equalsIgnoreCase(imageFor)){
							helpTextDTO.setFormId(formId);
							helpTextDTO.setRecordId(recordId);
							helpTextDTO.setQuestionId(questionId);
							helpTextDTO.setImageUrl(path);
							helpTextDTO.setUserSSOId(userId);
							helpTextDTO.setHelpDescription(helpDescription);
							helpTextDTO.setElementId(elementId);
							helpTextDTO.setSequanceNo(sequanceNo);
						} else {
							helpTextDTO.setFormId(formId);
							helpTextDTO.setQuestionId(questionId);
							helpTextDTO.setImageUrl(path);
							helpTextDTO.setUserSSOId(userId);
							helpTextDTO.setHelpDescription(helpDescription);
							helpTextDTO.setHelpTextLevel(helpTextLevel);
						}
						
					} else{
						if("RecordImages".equalsIgnoreCase(imageFor)){
							helpTextDTO.setFormId(formId);
							helpTextDTO.setRecordId(recordId);
							helpTextDTO.setQuestionId(questionId);
							helpTextDTO.setImageUrl(path);
							helpTextDTO.setUserSSOId(userId);
							helpTextDTO.setHelpDescription(helpDescription);
						} else if("RuleImages".equalsIgnoreCase(imageFor)){
							helpTextDTO.setFormId(formId);
							helpTextDTO.setRecordId(recordId);
							helpTextDTO.setQuestionId(questionId);
							helpTextDTO.setImageUrl(path);
							helpTextDTO.setUserSSOId(userId);
							helpTextDTO.setHelpDescription(helpDescription);
							helpTextDTO.setElementId(elementId);
							helpTextDTO.setSequanceNo(sequanceNo);
						} else{
							helpTextDTO.setFormId(formId);
							helpTextDTO.setQuestionId(questionId);
							helpTextDTO.setImageUrl(path);
							helpTextDTO.setUserSSOId(userId);
							helpTextDTO.setHelpDescription(helpDescription);
							helpTextDTO.setHelpTextLevel(helpTextLevel);
						}
						
					}
					if("RuleImages".equalsIgnoreCase(imageFor)){
						String status = checklistFormMgmtService.updateRulesImagePath(helpTextDTO, token);
					} else{
						String status = checklistFormMgmtService.updateImagePath(helpTextDTO, token, imageFor);
					}
				} else{
					throw new ChecklistMobileExceptions("3004","Image Not Saved Successfully.");
				}
			}
			
			checklistResponse = new ChecklistResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000","Image Uploaded Successfully."));
			
			}catch (ChecklistMobileExceptions e) {
					//e.printStackTrace();
				LOGGER.info(e.getErrorMessage());
					checklistResponse = new ChecklistResponse();
					checklistResponse.setResultSet(new HashMap<String, Object>());
					checklistResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
				} catch (Exception e) {
					//e.printStackTrace();
					LOGGER.info(e.getMessage());
					checklistResponse = new ChecklistResponse();
					checklistResponse.setResultSet(new HashMap<String, Object>());
					//checklistResponse.setRequestStatus(new ChecklistRequestStatus("1001","Not Able to connect with database, Please try again after some time."));
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
	public String uploadImagesinBulk(ChecklistImageDTO jsonObject, HttpHeaders headers) {	
		ChecklistResponse checklistResponse = null;
		String result=""; 
		String responseString = "";
		
		MultivaluedMap<String, String> headersMap = headers.getRequestHeaders();
		Set<String>headerKeys = headersMap.keySet();
		for(String key:headerKeys){
			LOGGER.info(key +" ------ "+headers.getRequestHeader(key));
		}
		
		try {
			checklistFormMgmtService = (ChecklistFormMgmtService)SpringApplicationContext.getBean("checklistFormMgmtServiceImpl");
			
			ArrayList<ChecklistImageDTO> imagesList = jsonObject.getImagesList();
			ArrayList<Map<String, Object>> resultList = null;
			String formId = jsonObject.getFormId();
			String recordId = jsonObject.getRecordId();
			String userId = jsonObject.getUserSSOId();
			
			if(imagesList != null && imagesList.size() > 0){
				ChecklistImageDTO imageObj = null; 
				Map<String, Object> resultMap = null;
				resultList = new ArrayList<Map<String, Object>>();
				for(int i=0; i < imagesList.size(); i++){
					imageObj = imagesList.get(i);
					resultMap = new HashMap<String, Object>();
					String token = imageObj.getOperation();
					resultMap.put("operation", token);
					if("Add".equals(token) || "Edit".equals(token)){
						String imageSequance = imageObj.getSequanceNo();
						String questionId = imageObj.getQuestionId();
						String imageData = imageObj.getImageData();
						String imageFor = imageObj.getImageType();
						String helpDescription =imageObj.getHelpDescription();
						String helpTextLevel = imageObj.getHelpTextLevel();
						String elementId =imageObj.getElementId();
						String sequanceNo = imageObj.getElementSequenceNo();
						String thumbnailData = imageObj.getThumbnailData();
						String serverImageId = imageObj.getServerImageId() != null ? imageObj.getServerImageId() : "0";
						
						String imagePath = BUNDLE.getString("imagePath");
						String imageType = BUNDLE.getString("imageType");
						
						if(imageSequance != null && !"".equals(imageSequance)){
							imageSequance = "_"+imageSequance;
						}
						String imagefinalPath = "";
						if(imageFor != null && !"".equals(imageFor) && "RuleImages".equals(imageFor)){
							imagefinalPath = imagePath+"/"+formId+"/RecordImages/"+imageFor;
						} else if(imageFor != null && !"".equals(imageFor)){
							imagefinalPath = imagePath+"/"+formId+"/"+imageFor;
						}
						if(helpTextLevel != null && !"".equals(helpTextLevel) && "SignatureImages".equals(helpTextLevel)){
							imagefinalPath = imagefinalPath+"/"+helpTextLevel;
						}
						
						File file1 = ChecklistUtility.getDirectory(imagePath,imagefinalPath);
						
						if(file1.exists()){
							String imageNewName = "";
							if("RecordImages".equalsIgnoreCase(imageFor) || "RuleImages".equals(imageFor)){
								imageNewName = recordId+"_"+questionId+imageSequance+"."+imageType;
							} else{
								imageNewName = questionId+imageSequance+"."+imageType;
							}
							String path = ChecklistImageUtility.base64StringToImage(imageNewName, imageData, file1);	
							if(path != null && !"".equals(path)){
								ChecklistHelpTextDTO helpTextDTO = new ChecklistHelpTextDTO();
								if("Add".equals(token)){
									if("RecordImages".equalsIgnoreCase(imageFor)){
										helpTextDTO.setFormId(formId);
										helpTextDTO.setRecordId(recordId);
										helpTextDTO.setQuestionId(questionId);
										helpTextDTO.setImageUrl(path);
										helpTextDTO.setUserSSOId(userId);
										helpTextDTO.setHelpDescription(helpDescription);
										helpTextDTO.setElementId(elementId);
										helpTextDTO.setSequanceNo(sequanceNo);
										helpTextDTO.setThumbnailData(thumbnailData);
									}else if("RuleImages".equalsIgnoreCase(imageFor)){
										helpTextDTO.setFormId(formId);
										helpTextDTO.setRecordId(recordId);
										helpTextDTO.setQuestionId(questionId);
										helpTextDTO.setImageUrl(path);
										helpTextDTO.setUserSSOId(userId);
										helpTextDTO.setHelpDescription(helpDescription);
										helpTextDTO.setElementId(elementId);
										helpTextDTO.setSequanceNo(sequanceNo);
										helpTextDTO.setThumbnailData(thumbnailData);
									} else {
										helpTextDTO.setFormId(formId);
										helpTextDTO.setQuestionId(questionId);
										helpTextDTO.setImageUrl(path);
										helpTextDTO.setUserSSOId(userId);
										helpTextDTO.setHelpDescription(helpDescription);
										helpTextDTO.setHelpTextLevel(helpTextLevel);
									}
									
								} else{
									if("RecordImages".equalsIgnoreCase(imageFor)){
										helpTextDTO.setFormId(formId);
										helpTextDTO.setRecordId(recordId);
										helpTextDTO.setQuestionId(questionId);
										helpTextDTO.setImageUrl(path);
										helpTextDTO.setUserSSOId(userId);
										helpTextDTO.setHelpDescription(helpDescription);
										helpTextDTO.setElementId(elementId);
										helpTextDTO.setSequanceNo(sequanceNo);
										helpTextDTO.setThumbnailData(thumbnailData);
										helpTextDTO.setServerImageId(serverImageId);
									} else if("RuleImages".equalsIgnoreCase(imageFor)){
										helpTextDTO.setFormId(formId);
										helpTextDTO.setRecordId(recordId);
										helpTextDTO.setQuestionId(questionId);
										helpTextDTO.setImageUrl(path);
										helpTextDTO.setUserSSOId(userId);
										helpTextDTO.setHelpDescription(helpDescription);
										helpTextDTO.setElementId(elementId);
										helpTextDTO.setSequanceNo(sequanceNo);
										helpTextDTO.setThumbnailData(thumbnailData);
										helpTextDTO.setServerImageId(serverImageId);
									} else{
										helpTextDTO.setFormId(formId);
										helpTextDTO.setQuestionId(questionId);
										helpTextDTO.setImageUrl(path);
										helpTextDTO.setUserSSOId(userId);
										helpTextDTO.setHelpDescription(helpDescription);
										helpTextDTO.setHelpTextLevel(helpTextLevel);
										helpTextDTO.setServerImageId(serverImageId);
									}
									
								}
								String status = "";
								if("RuleImages".equals(imageFor)){
									status = checklistFormMgmtService.updateRulesImagePath(helpTextDTO, token);
								} else{
									status = checklistFormMgmtService.updateImagePath(helpTextDTO, token, imageFor);
								}
								
								String []imgStatus = null;
								if(status != null && !"".equals(status)){
									imgStatus = status.split("#");
								}
								
								resultMap.put("imagePath", path);
								resultMap.put("serverImageId", imgStatus[0]);
								resultMap.put("message", imgStatus[1]);
								resultMap.put("questionId", questionId);
								resultMap.put("elementId", elementId);
								resultMap.put("sequanceNo", imageObj.getSequanceNo());
								resultMap.put("elementSequenceNo", sequanceNo);
							} else{
								throw new ChecklistMobileExceptions("3004","Image Not Saved Successfully.");
							}
						}
					} else if("Delete".equalsIgnoreCase(token)){
						ArrayList<Map<String, Object>> imageUrls = imageObj.getImageUrls();
						if((imageUrls == null || imageUrls.size() == 0)){
							throw new ChecklistMobileExceptions("3001","Invalid Input for Image URL.");
						} else{
							ArrayList<String>pathList = new ArrayList<String>();
							ArrayList<Map<String, Object>>resPathList = new ArrayList<Map<String, Object>>();
							String imageId = "";
							String imageUrl = "";
							for(int ind=0; ind < imageUrls.size(); ind++){
								
								Map<String, Object> imageJson = imageUrls.get(ind);
								imageId = imageJson.get("imageId").toString();
								imageUrl = imageJson.get("imageUrl").toString();
								
								File file = new File(imageUrl);
					    		if(file.exists()){
					    			if(file.delete()){
					    				pathList.add(imageId);
					    				resPathList.add(imageJson);
					    				LOGGER.info(file.getName() + " is deleted!");
						    		}else{
						    			LOGGER.info("Delete operation is failed.");
						    		}
					    		}
							}
							checklistFormMgmtService.deleteChecklistImages(recordId, pathList);
							resultMap.put("message", "Images Deleted Successfully.");
							resultMap.put("deletedFileList", resPathList);
						}	
					}
					resultList.add(resultMap);
				}
			}
			Map<String, Object> resObject= new HashMap<String, Object>();
			resObject.put("Result", resultList);
			
			checklistResponse = new ChecklistResponse();
			checklistResponse.setResultSet(resObject);
			checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000","Image Uploaded Successfully."));
			
			}catch (ChecklistMobileExceptions e) {
				//e.printStackTrace();
				LOGGER.info(e.getErrorMessage());
				checklistResponse = new ChecklistResponse();
				checklistResponse.setResultSet(new HashMap<String, Object>());
				checklistResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
			} catch (Exception e) {
				//e.printStackTrace();
				LOGGER.info(e.getMessage());
				checklistResponse = new ChecklistResponse();
				checklistResponse.setResultSet(new HashMap<String, Object>());
				//checklistResponse.setRequestStatus(new ChecklistRequestStatus("1001","Not Able to connect with database, Please try again after some time."));
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
	public String downloadChecklistImages(ChecklistImageDTO jsonObject, HttpHeaders headers) {
		ChecklistResponse checklistResponse = null;
		String result=""; 
		String responseString = "";
		
		MultivaluedMap<String, String> headersMap = headers.getRequestHeaders();
		Set<String>headerKeys = headersMap.keySet();
		for(String key:headerKeys){
			LOGGER.info(key +" ------ "+headers.getRequestHeader(key));
		}
		try {
			String imageId = jsonObject.getImageId();
			String imageName = jsonObject.getImageName();
			//String imageSequance = jsonObject.getSequanceNo();
			String questionId = jsonObject.getQuestionId();
			String recordId = jsonObject.getRecordId();
			String formId = jsonObject.getFormId();
			//String imageType = jsonObject.getImageType();
			
			/*if((formId == null || "".equals(formId))){
				throw new ChecklistMobileExceptions("3001","Invalid Input for Form Id.");
			} else if(!CommonValidation.isNumeric(formId)){
				throw new ChecklistMobileExceptions("3003","Please enter only numeric value for Form Id.");
			}*/
			/*if((recordId == null || "".equals(recordId))){
				throw new ChecklistMobileExceptions("3001","Invalid Input for Record Id.");
			} else if(!CommonValidation.isNumeric(recordId)){
				throw new ChecklistMobileExceptions("3003","Please enter only numeric value for Record Id.");
			}*/
			if((imageName == null || "".equals(imageName))){
				throw new ChecklistMobileExceptions("3001","Invalid Input for Image URL.");
			} else{
				
				File imageFile = new File(imageName);
				String imageData = ChecklistImageUtility.imageToBase64String(imageFile);
				
				Map<String, Object> imageJson = new HashMap<String, Object>();
				
				imageJson.put("formId", formId);
				imageJson.put("imageId", imageId);
				imageJson.put("recordId", recordId);
				imageJson.put("questionId", questionId);
				imageJson.put("imageData", imageData);
				
				checklistResponse = new ChecklistResponse();
				checklistResponse.setResultSet(imageJson);
				checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000","SUCCESS"));
				
			}
			}catch (ChecklistMobileExceptions e) {
					//e.printStackTrace();
				LOGGER.info(e.getErrorMessage());
					checklistResponse = new ChecklistResponse();
					checklistResponse.setResultSet(new HashMap<String, Object>());
					checklistResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
				} catch (Exception e) {
					//e.printStackTrace();
					LOGGER.info(e.getMessage());
					checklistResponse = new ChecklistResponse();
					checklistResponse.setResultSet(new HashMap<String, Object>());
					//checklistResponse.setRequestStatus(new ChecklistRequestStatus("1001","Not Able to connect with database, Please try again after some time."));
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
	public String downloadChecklistImagesinBulk(ChecklistImageDTO jsonObject, HttpHeaders headers) {
		ChecklistResponse checklistResponse = null;
		String result=""; 
		String responseString = "";
		
		MultivaluedMap<String, String> headersMap = headers.getRequestHeaders();
		Set<String>headerKeys = headersMap.keySet();
		for(String key:headerKeys){
			LOGGER.info(key +" ------ "+headers.getRequestHeader(key));
		}
		try {
			List<Map<String, Object>> rcrdEiseImageList = new ArrayList<Map<String, Object>>();
			List<Map<String, Object>> imageList = null;
			String formId = jsonObject.getFormId();
			ArrayList<ChecklistImageDTO> recordWiseImagesList = jsonObject.getRecordWiseImagesList();
			if(recordWiseImagesList != null && recordWiseImagesList.size() > 0){
				ArrayList<Map<String, Object>> imageDetailList = null;
				Map<String, Object> imageListJson = null;
				for(ChecklistImageDTO imageDTO :  recordWiseImagesList){
					if(imageDTO != null){
						imageList = new ArrayList<Map<String, Object>>();
						imageListJson = new HashMap<String, Object>();
						String recordId = imageDTO.getRecordId();
						imageDetailList = imageDTO.getImageDetailList();
						if(imageDetailList != null && imageDetailList.size() > 0){
							
							String questionId = null;
							String imageId = null;
							String elementId = null;
							String elementSequenceNo = null;
							String helpDescription = null;
							ArrayList<String> imageUrls = null;
							Map<String, Object> imageJson = null;
							
							for(Map<String, Object> imageDetailJson :  imageDetailList){
								if(imageDetailJson != null){
									questionId = (String)imageDetailJson.get("questionId");
									imageId = (String)imageDetailJson.get("imageId");
									elementId = (String)imageDetailJson.get("elementId");
									elementSequenceNo = (String)imageDetailJson.get("elementSequenceNo");
									helpDescription = (String)imageDetailJson.get("helpDescription");
									imageUrls = (ArrayList<String>)imageDetailJson.get("imageUrls");
									if(imageUrls != null && imageUrls.size() > 0){
										for(String imagePath : imageUrls){
											if((imagePath == null || "".equals(imagePath))){
												throw new ChecklistMobileExceptions("3001","Invalid Input for Image URL.");
											} else{
												
												File imageFile = new File(imagePath);
												
												/*String imageTempPath = BUNDLE.getString("imageTempPath") + "/" + imageFile.getName();
												File originalFile = new File(imageTempPath);*/
												
												/*if (!originalFile.exists()) {
													
													BufferedImage img = null;
													if (imagePath.toLowerCase().contains(".jpg") || imagePath.toLowerCase().contains(".jpeg")) {
														
														img = ImageUtils.resizeImage(imagePath, 0, 100, 100);
														ImageUtils.saveImage(img, imageTempPath, 0);
													} else {
														
														img = ImageUtils.resizeImage(imagePath, 1, 100, 100);
														ImageUtils.saveImage(img, imageTempPath, 1);
													}													
												}*/
												
												String imageData = ChecklistImageUtility.imageToBase64String(imageFile);
												
												imageJson = new HashMap<String, Object>();
												
												imageJson.put("formId", formId);
												imageJson.put("imageId", imageId);
												imageJson.put("recordId", recordId);
												imageJson.put("questionId", questionId);
												imageJson.put("elementId", elementId);
												imageJson.put("elementSequenceNo", elementSequenceNo);
												imageJson.put("helpDescription", helpDescription);
												imageJson.put("imageData", imageData);
												
												imageList.add(imageJson);
											}
										}
									}
								}
							}
						}
						imageListJson.put("recordId", recordId);
						imageListJson.put("imagesDetailList", imageList);
					} 
					rcrdEiseImageList.add(imageListJson);
				}
				checklistResponse = new ChecklistResponse();
				checklistResponse.setResultSet(rcrdEiseImageList);
				checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000","SUCCESS"));
			}
			}catch (ChecklistMobileExceptions e) {
				//e.printStackTrace();
				LOGGER.info(e.getErrorMessage());
				checklistResponse = new ChecklistResponse();
				checklistResponse.setResultSet(new HashMap<String, Object>());
				checklistResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
			} catch (Exception e) {
				//e.printStackTrace();
				LOGGER.info(e.getMessage());
				checklistResponse = new ChecklistResponse();
				checklistResponse.setResultSet(new HashMap<String, Object>());
				//checklistResponse.setRequestStatus(new ChecklistRequestStatus("1001","Not Able to connect with database, Please try again after some time."));
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

	private File convertToJPG(File imageFile) throws Exception {
		
		BufferedImage bufferedImage;
		
		  //read image file
		  bufferedImage = ImageIO.read(imageFile);
		
		  // create a blank, RGB, same width and height, and a white background
		  BufferedImage newBufferedImage = new BufferedImage(bufferedImage.getWidth(),
				bufferedImage.getHeight(), BufferedImage.TYPE_INT_RGB);
		  newBufferedImage.createGraphics().drawImage(bufferedImage, 0, 0, Color.WHITE, null);
		
		  // write to jpeg file
		  File newFile = new File(imageFile.getName());
		  ImageIO.write(newBufferedImage, "jpg", newFile);		  
		  return newFile;		
	}
	private File imageCompress(File imageFile) throws Exception {
		
		String imageTempPath = BUNDLE.getString("imagePath");
		File compressedImageFile = new File(imageTempPath + "/" + imageFile.getName());

		InputStream inputStream = new FileInputStream(imageFile);
		OutputStream outputStream = new FileOutputStream(compressedImageFile);

		float imageQuality = 0.3f;

		//Create the buffered image
		BufferedImage bufferedImage = ImageIO.read(inputStream);

		//Get image writers
		Iterator<ImageWriter> imageWriters = ImageIO.getImageWritersByFormatName("png");

		if (!imageWriters.hasNext())
			throw new IllegalStateException("Writers Not Found!!");

		ImageWriter imageWriter = (ImageWriter) imageWriters.next();
		ImageOutputStream imageOutputStream = ImageIO.createImageOutputStream(outputStream);
		imageWriter.setOutput(imageOutputStream);

		ImageWriteParam imageWriteParam = imageWriter.getDefaultWriteParam();

		//Set the compress quality metrics
		imageWriteParam.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
		imageWriteParam.setCompressionType("PackBits");
		imageWriteParam.setCompressionQuality(imageQuality);

		//Created image
		imageWriter.write(null, new IIOImage(bufferedImage, null, null), imageWriteParam);

		// close all streams
		inputStream.close();
		outputStream.close();
		imageOutputStream.close();
		imageWriter.dispose();
		
		return compressedImageFile;
		
	}

	public String getEDSRProjectTurbineDetail(@Context HttpHeaders headers) {
		ChecklistResponse checklistResponse = null;
		String result=""; 
		String responseString = "";
		
		MultivaluedMap<String, String> headersMap = headers.getRequestHeaders();
		Set<String>headerKeys = headersMap.keySet();
		for(String key:headerKeys){
			LOGGER.info(key +" ------ "+headers.getRequestHeader(key));
		}
		
		try {
			checklistFormMgmtService = (ChecklistFormMgmtService)SpringApplicationContext.getBean("checklistFormMgmtServiceImpl");
			Map<String, Object> edsrMap =  checklistFormMgmtService.getEDSRProjectTurbineDetail();
			//List<EDSRDetailDTO>
			
			checklistResponse = new ChecklistResponse();
			checklistResponse.setResultSet(edsrMap);
			checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000","SUCCESS"));
			
			
		}catch (ChecklistMobileExceptions e) {
		//	e.printStackTrace();
			LOGGER.info(e.getErrorMessage());
			checklistResponse = new ChecklistResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			//checklistResponse.setRequestStatus(new ChecklistRequestStatus("1001","Not Able to connect with database, Please try again after some time."));
			checklistResponse.setRequestStatus(new ChecklistRequestStatus("1001",e.getMessage()));
		}
		
		try{
			ObjectMapper mapper = new ObjectMapper();
			SecretKey secretKey = ChecklistUtility.getKey();
			result=mapper.writeValueAsString(checklistResponse);
			responseString = ChecklistUtility.encrypt(result, secretKey);
		} catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}

	
	public String deleteChecklistImages(ChecklistImageDTO jsonObject, @Context HttpHeaders headers) {
		ChecklistResponse checklistResponse = null;
		String result=""; 
		String responseString = "";
		
		MultivaluedMap<String, String> headersMap = headers.getRequestHeaders();
		Set<String>headerKeys = headersMap.keySet();
		for(String key:headerKeys){
			LOGGER.info(key +" ------ "+headers.getRequestHeader(key));
		}
		
		try {
			checklistFormMgmtService = (ChecklistFormMgmtService)SpringApplicationContext.getBean("checklistFormMgmtServiceImpl");
			
			ArrayList<Map<String, Object>> imageUrls = jsonObject.getImageUrls();
			String recordId = jsonObject.getRecordId();
			Map<String, Object> resultMap = new HashMap<String, Object>();
			if((imageUrls == null || imageUrls.size() == 0)){
				throw new ChecklistMobileExceptions("3001","Invalid Input for Image URL.");
			} else{
				ArrayList<String>pathList = new ArrayList<String>();
				String imageId = "";
				String imageUrl = "";
				for(int ind=0; ind < imageUrls.size(); ind++){
					
					Map<String, Object> imageJson = imageUrls.get(ind);
					imageId = imageJson.get("imageId").toString();
					imageUrl = imageJson.get("imageUrl").toString();
					File file = new File(imageUrl);
		    		if(file.exists()){
		    			if(file.delete()){
		    				pathList.add(imageId);
		    				LOGGER.info(file.getName() + " is deleted!");
			    		}else{
			    			LOGGER.info("Delete operation is failed.");
			    		}
		    		}
				}
				checklistFormMgmtService.deleteChecklistImages(recordId, pathList);
				resultMap.put("deletedFileList", pathList);
			}	
    	   
			checklistResponse = new ChecklistResponse();
			checklistResponse.setResultSet(resultMap);
			checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000","SUCCESS"));
			
		}catch (ChecklistMobileExceptions e) {
			//e.printStackTrace();
			LOGGER.info(e.getErrorMessage());
			checklistResponse = new ChecklistResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			//checklistResponse.setRequestStatus(new ChecklistRequestStatus("1001","Not Able to connect with database, Please try again after some time."));
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
	public String uploadChecklistImagesByPortal(ChecklistImageDTO jsonObject,@Context HttpHeaders headers) {	
		ChecklistResponse checklistResponse = null;
		String result=""; 
		String responseString = "";
		
		/*MultivaluedMap<String, String> headersMap = headers.getRequestHeaders();
		Set<String>headerKeys = headersMap.keySet();
		for(String key:headerKeys){
			LOGGER.info(key +" ------ "+headers.getRequestHeader(key));
		}*/
		
		try {
			checklistFormMgmtService = (ChecklistFormMgmtService)SpringApplicationContext.getBean("checklistFormMgmtServiceImpl");

			String token = jsonObject.getOperation();
			//String imageName = jsonObject.getImageName();
			String imageSequance = jsonObject.getSequanceNo();
			String questionId = jsonObject.getQuestionId() != "" ? jsonObject.getQuestionId() : "0";
			String imageData = jsonObject.getImageData();
			String formId = null!=jsonObject.getFormId() && jsonObject.getFormId() != "" ? jsonObject.getFormId() : "0";
			String imageFor = jsonObject.getImageType();
			String userId = jsonObject.getUserSSOId();
			String helpDescription =jsonObject.getHelpDescription();
			String helpTextLevel = jsonObject.getHelpTextLevel();
			String sectionId = jsonObject.getSectionId() != "" ? jsonObject.getSectionId() : "0";
			String stepId = jsonObject.getStepId() != "" ? jsonObject.getStepId() : "0";
			
			String imagePath = BUNDLE.getString("imageTempPath");
			String imageType = BUNDLE.getString("imageType");
			
			if(imageSequance != null && !"".equals(imageSequance)){
				imageSequance = "_"+imageSequance;
			}
			String imagefinalPath = imagePath;
			/*if(imageFor != null && !"".equals(imageFor)){
				
				imagefinalPath = imagePath+"/"+formId+"/"+imageFor;
			}
			if(helpTextLevel != null && !"".equals(helpTextLevel)){
				
				imagefinalPath = imagefinalPath+"/"+helpTextLevel;
			} */
			File file1 = ChecklistUtility.getDirectory(imagePath,imagefinalPath);
			
			if(file1.exists()){
				String imageNewName = "";
				imageNewName = questionId+imageSequance+"."+imageType;
				String path = ChecklistImageUtility.base64StringToImage(imageNewName, imageData, file1);	

				if(path != null && !"".equals(path)){
					
					ChecklistHelpTextDTO helpTextDTO = new ChecklistHelpTextDTO();
					if("Add".equalsIgnoreCase(token)){
							helpTextDTO.setFormId(formId);
							helpTextDTO.setSectionId(sectionId);
							helpTextDTO.setStepId(stepId);
							helpTextDTO.setQuestionId(questionId);
							helpTextDTO.setImageUrl(path);
							helpTextDTO.setUserSSOId(userId);
							helpTextDTO.setHelpDescription(helpDescription);
							helpTextDTO.setHelpTextLevel(helpTextLevel);
					} else{
						/*if("RecordImages".equalsIgnoreCase(imageFor)){
							helpTextDTO.setFormId(formId);
							helpTextDTO.setRecordId(recordId);
							helpTextDTO.setQuestionId(questionId);
							helpTextDTO.setImageUrl(path);
							helpTextDTO.setUserSSOId(userId);
							helpTextDTO.setHelpDescription(helpDescription);
						}else{
							helpTextDTO.setFormId(formId);
							helpTextDTO.setQuestionId(questionId);
							helpTextDTO.setImageUrl(path);
							helpTextDTO.setUserSSOId(userId);
							helpTextDTO.setHelpDescription(helpDescription);
							helpTextDTO.setHelpTextLevel(helpTextLevel);
						}*/
						
					}
					String status = checklistFormMgmtService.updateImagePathByPortal(helpTextDTO, token, imageFor);
				} else{
					throw new ChecklistMobileExceptions("3004","Image Not Saved Successfully.");
				}
			}
			
			checklistResponse = new ChecklistResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000","Image Uploaded Successfully."));
			
			}catch (ChecklistMobileExceptions e) {
					//e.printStackTrace();
					LOGGER.info(e.getMessage());
					checklistResponse = new ChecklistResponse();
					checklistResponse.setResultSet(new HashMap<String, Object>());
					checklistResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
				} catch (Exception e) {
					//e.printStackTrace();
					LOGGER.info(e.getMessage());
					checklistResponse = new ChecklistResponse();
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
	public @ResponseBody String getRecordLatestDetail(String recordId1, @Context HttpHeaders headers) {

		ChecklistResponse checklistResponse = null;
		String result=""; 
		String responseString = "";
		
		MultivaluedMap<String, String> headersMap = headers.getRequestHeaders();
		Set<String>headerKeys = headersMap.keySet();
		for(String key:headerKeys){
			LOGGER.info(key +" ------ "+headers.getRequestHeader(key));
		}
		
		try {
			checklistFormMgmtService = (ChecklistFormMgmtService)SpringApplicationContext.getBean("checklistFormMgmtServiceImpl");
			
			Map<String, Object> resultMap = new HashMap<String, Object>();
			if((recordId1 == null || "".equals(recordId1))){
				throw new ChecklistMobileExceptions("3001","Invalid Input for Record Id.");
			} else if(!CommonValidation.isNumeric(recordId1)){
				throw new ChecklistMobileExceptions("3003","Please enter only numeric value for Record Id.");
			} else{
				
				List<Map<String, Object>> recordElement = null;
				List<Map<String, Object>> recordElements = new ArrayList<Map<String, Object>>();
				List<Map<String, Object>> sectionElement = null;
				List<Map<String, Object>> stepElement = null;
				List<Map<String, Object>> answerElementsList = null;
				Map<String, Object> recordJson = null;
				Map<String, Object> recordListJson = new HashMap<String, Object>();
				String recordId = "";
				String sectionId = "";
				String stepId = "";
				List<ChecklistRecordDTO> queAnsDetailList = null;
				Map<String, Object> sectionJson = null;
				Map<String, Object> stepJson = null;
				List<Map<String,Object>> imageList = null;
				List<Map<String,Object>> ruleImageList = null;
				List<Map<String,Object>> ansRuleList = null;
				Map<String, Object> elementJson = null;
				Map<String, Object> answerElementJson = null;
				
				
				List<ChecklistRecordDTO> recordList =  checklistFormMgmtService.getSingleRecordDetail(recordId1);
				if(recordList != null && recordList.size() > 0){
				
					ChecklistRecordDTO recordDTO = recordList.get(0);
					recordElement = new ArrayList<Map<String, Object>>();
					recordJson = new HashMap<String, Object>();
					recordJson.put("recordId", recordId1);
					recordJson.put("recordStatus", recordDTO.getRecordStatus());
					recordJson.put("syncStatus", recordDTO.getSyncStatus());
					recordJson.put("projectId", recordDTO.getProjectId());
					recordJson.put("projectName", recordDTO.getProjectName());
					recordJson.put("turbineId", recordDTO.getTurbineId());
					recordJson.put("createdBy", recordDTO.getCreatedBySSO() != null ? recordDTO.getCreatedBySSO() : "");
					recordJson.put("createdByName", recordDTO.getCreatedByName() != null ? recordDTO.getCreatedByName() : "");
					recordJson.put("createdDate", recordDTO.getCreatedDate() != null ? recordDTO.getCreatedDate() : "");
					recordJson.put("modifiedBy", recordDTO.getModifiedBySSO() != null ? recordDTO.getModifiedBySSO() : "");
					recordJson.put("modifiedByName", recordDTO.getModifiedByName() != null ? recordDTO.getModifiedByName() : "");
					recordJson.put("modifiedDate", recordDTO.getModifiedDate() != null ? recordDTO.getModifiedDate() : "");
					recordJson.put("versionNo", recordDTO.getVersionNo() != null ? recordDTO.getVersionNo() : "");
					sectionId = "";
					queAnsDetailList = checklistFormMgmtService.getRecordDetailbyRecordIdStepId(recordId1, "0");
					
					if(queAnsDetailList != null && queAnsDetailList.size()>0){
						int currRecQuesId = 0;
						int preRecQuesId = 0;
						for(ChecklistRecordDTO dto : queAnsDetailList){
							
							//if("".equals(recordId) || recordId.equals(recordDTO.getRecordId())){
								if("".equals(sectionId) || !sectionId.equals(dto.getSectionId())){
									sectionJson = new HashMap<String, Object>();
									sectionElement = new ArrayList<Map<String,Object>>();
									sectionId = dto.getSectionId();
									sectionJson.put("sectionId", sectionId);
									
									sectionJson.put("sectionElements", sectionElement);
									recordElement.add(sectionJson);
								}
								if("".equals(stepId) || !stepId.equals(dto.getStepId())){
									stepJson = new HashMap<String, Object>();
									stepElement = new ArrayList<Map<String,Object>>();
									stepId = dto.getStepId();
									stepJson.put("stepId", stepId);
									
									stepJson.put("stepElements", stepElement);
									sectionElement.add(stepJson);
								}
								
								//	if(queAnsDetailList != null && queAnsDetailList.size() > 0){
									Map<String, Object> imageElements = null;
							//		for(ChecklistRecordDTO queAnsDetail : queAnsDetailList){
									imageList = new ArrayList<Map<String,Object>>();
									
									currRecQuesId = Integer.parseInt(dto.getQuestionId());
									
									if(currRecQuesId != preRecQuesId){
										preRecQuesId = currRecQuesId;
										
										answerElementsList = new ArrayList<Map<String,Object>>();
										
										elementJson = new HashMap<String, Object>();
										elementJson.put("questionId", dto.getQuestionId());
										elementJson.put("answerId", dto.getAnswerId());
										elementJson.put("answerValue", answerElementsList);
										elementJson.put("comments", dto.getComments());
										elementJson.put("answerImages", imageList);
										stepElement.add(elementJson);
									}
									
									ruleImageList = new ArrayList<Map<String,Object>>();
									ansRuleList = new ArrayList<Map<String,Object>>();
									answerElementJson = new HashMap<String, Object>();
									answerElementJson.put("answerElementValue", dto.getAnswerValue());
									answerElementJson.put("answerInputElementId", dto.getElementId());
									answerElementJson.put("answerInputElementName", dto.getElementName());
									answerElementJson.put("elementAttributeName", dto.getNameAttribValue());
									answerElementJson.put("sequesnceId", dto.getElementSequense());
									
									String []additionalParamStr = ChecklistUtility.getValidData(dto.getAdditionalFields());
									if(additionalParamStr != null && !"".equals(additionalParamStr) && additionalParamStr.length >0){
										imageElements = new HashMap<String, Object>();
										for(int ind=0; ind < additionalParamStr.length; ind++){
											String []elemArray = additionalParamStr[ind].split(",");
											if(elemArray != null && elemArray.length <=2){
												
												String fieldType = ChecklistUtility.getSubString(elemArray[0], "(", "");
												String fieldValue = ChecklistUtility.getSubString(elemArray[1], ")", "");
												if(!imageElements.containsKey(fieldType)){
													imageElements.put(fieldType, fieldValue);
												}
											}
										}
										ansRuleList.add(imageElements);
									}
									answerElementJson.put("rulesAnswerValues", ansRuleList);
									String []ruleImageStr = ChecklistUtility.getValidData(dto.getRuleImages());
									if(ruleImageStr != null && !"".equals(ruleImageStr) && ruleImageStr.length >0){
										for(int ind=0; ind < ruleImageStr.length; ind++){
											String []elemArray = ruleImageStr[ind].split(",");
											if(elemArray != null && elemArray.length >=4){
												imageElements = new HashMap<String, Object>();
												String imageId = ChecklistUtility.getSubString(elemArray[0], "(", "");
												String imageLocation = ChecklistUtility.getSubString(elemArray[1], ")", "");
												String imageDesc = ChecklistUtility.getSubString(elemArray[2], ")", "");
												String thumbnailData = ChecklistUtility.getSubString(elemArray[3], ")", "");
												imageElements.put("imageId", imageId);
												imageElements.put("imageLocation", imageLocation);
												imageElements.put("imageDescription", imageDesc);
												imageElements.put("thumbnailData", thumbnailData);
												ruleImageList.add(imageElements);
											}
										}
									}
									answerElementJson.put("rulesAnswerImages", ruleImageList);
									
									String []ansImageStr = ChecklistUtility.getValidData(dto.getAnswerImages());
									if(ansImageStr != null && !"".equals(ansImageStr) && ansImageStr.length >0){
										for(int ind=0; ind < ansImageStr.length; ind++){
											String []elemArray = ansImageStr[ind].split(",");
											if(elemArray != null && elemArray.length >=4){
												imageElements = new HashMap<String, Object>();
												String imageId = ChecklistUtility.getSubString(elemArray[0], "(", "");
												String imageLocation = ChecklistUtility.getSubString(elemArray[1], ")", "");
												String imageDesc = ChecklistUtility.getSubString(elemArray[2], ")", "");
												String thumbnailData = ChecklistUtility.getSubString(elemArray[3], ")", "");
												imageElements.put("imageId", imageId);
												imageElements.put("imageLocation", imageLocation);
												imageElements.put("imageDescription", imageDesc);
												imageElements.put("thumbnailData", thumbnailData);
												imageList.add(imageElements);
											}
										}
									}
									answerElementsList.add(answerElementJson);
								}
								
							}
					
					recordJson.put("recordElement", recordElement);
					checklistResponse = new ChecklistResponse();
					checklistResponse.setResultSet(recordJson);
					checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000","SUCCESS"));
				}
			}	
			
		}catch (ChecklistMobileExceptions e) {
			//e.printStackTrace();
			LOGGER.info(e.getErrorMessage());
			checklistResponse = new ChecklistResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			//checklistResponse.setRequestStatus(new ChecklistRequestStatus("1001","Not Able to connect with database, Please try again after some time."));
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
	public String getChecklistLatestVersion(ChecklistVersionDTO jsonObject,	@Context HttpHeaders headers) {
		ChecklistResponse checklistResponse = null;
		String result=""; 
		String responseString = "";
		
		MultivaluedMap<String, String> headersMap = headers.getRequestHeaders();
		Set<String>headerKeys = headersMap.keySet();
		for(String key:headerKeys){
			LOGGER.info(key +" ------ "+headers.getRequestHeader(key));
		}
		
		try {
			checklistFormMgmtService = (ChecklistFormMgmtService)SpringApplicationContext.getBean("checklistFormMgmtServiceImpl");
			
			Map<String, Object> resultMap = new HashMap<String, Object>();
			List<ChecklistVersionDTO> formsList = jsonObject.getFormsList();
			if((formsList == null || formsList.size() == 0)){
				throw new ChecklistMobileExceptions("3001","Invalid Input for Version Checking.");
			}  else{
				List<ChecklistVersionDTO> formList = checklistFormMgmtService.getChecklistLatestVersion(formsList);
				resultMap.put("formsList", formList);
				checklistResponse = new ChecklistResponse();
				checklistResponse.setResultSet(resultMap);
				checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000","SUCCESS"));
			}
		}catch (ChecklistMobileExceptions e) {
			//e.printStackTrace();
			LOGGER.info(e.getErrorMessage());
			checklistResponse = new ChecklistResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			//checklistResponse.setRequestStatus(new ChecklistRequestStatus("1001","Not Able to connect with database, Please try again after some time."));
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
	public String getChecklistRecordSyncHistory(ChecklistParamDto paramDto,	@Context HttpHeaders headers) {

		ChecklistResponse checklistResponse = null;
		String result=""; 
		String responseString = "";
		ArrayList<Map<String,Object>> recHistoryList = null;
		MultivaluedMap<String, String> headersMap = headers.getRequestHeaders();
		Set<String>headerKeys = headersMap.keySet();
		for(String key:headerKeys){
			LOGGER.info(key +" ------ "+headers.getRequestHeader(key));
		}
		
		try {
			checklistFormMgmtService = (ChecklistFormMgmtService)SpringApplicationContext.getBean("checklistFormMgmtServiceImpl");
			Map<String, Object> resultMap = new HashMap<String, Object>();
			String recordId = paramDto.getRecordId();
			String versionNo = paramDto.getVersionNo();
			String ssoId = paramDto.getSsoId();
			if((recordId == null || "".equals(recordId))){
				throw new ChecklistMobileExceptions("3001","Invalid Input for Record Id.");
			} else if(!CommonValidation.isNumeric(recordId)){
				throw new ChecklistMobileExceptions("3003","Please enter only numeric value for Record Id.");
			} if((versionNo == null || "".equals(versionNo))){
				throw new ChecklistMobileExceptions("3001","Invalid Input for version no.");
			} else if(!CommonValidation.isDecimal(versionNo)){
				throw new ChecklistMobileExceptions("3003","Please enter only numeric value for version no.");
			} else{
				List<ChecklistRecordDTO> historyList = checklistFormMgmtService.getChecklistRecordSyncHistory(paramDto);
				
				if(historyList != null && historyList.size()>0){
					recHistoryList = new ArrayList<Map<String,Object>>();
					Map<String, Object> recordMap = null;
					for (ChecklistRecordDTO dto : historyList){
						recordMap = new HashMap<String, Object>();
						recordMap.put("recordId", dto.getRecordId());
						recordMap.put("versionNo", dto.getVersionNo());
						recordMap.put("modifiedDate", dto.getCreatedDate());
						recordMap.put("modifiedBy", dto.getCreatedBySSO());
						recordMap.put("modifiedByName", dto.getModifiedByName());
						recordMap.put("syncStatus", dto.getSyncStatus());
						recordMap.put("recordStatus", dto.getRecordStatus());
						recordMap.put("projectName", dto.getProjectName());
						recordMap.put("turbineId", dto.getTurbineId());
						recordMap.put("recordAction", dto.getComments());
						recordMap.put("syncStartTime", dto.getSyncStartTime());
						recordMap.put("syncEndTime", dto.getSyncEndTime());
						recHistoryList.add(recordMap);
					}
					
					resultMap.put("syncHistoryList", recHistoryList);
					checklistResponse = new ChecklistResponse();
					checklistResponse.setResultSet(resultMap);
					checklistResponse.setRequestStatus(new ChecklistRequestStatus("3000","SUCCESS"));
				} else{
					throw new ChecklistMobileExceptions("3005","No Record found to display.");
				}
				
				
				
				
				
			}
		}catch (ChecklistMobileExceptions e) {
			//e.printStackTrace();
			LOGGER.info(e.getErrorMessage());
			checklistResponse = new ChecklistResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			checklistResponse.setRequestStatus(new ChecklistRequestStatus(e.getErrorCode(), e.getErrorMessage()));
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info(e.getMessage());
			checklistResponse = new ChecklistResponse();
			checklistResponse.setResultSet(new HashMap<String, Object>());
			//checklistResponse.setRequestStatus(new ChecklistRequestStatus("1001","Not Able to connect with database, Please try again after some time."));
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

	
	
}
