package com.ge.power.checklist.portal.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonAutoDetect.Visibility;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.ge.power.checklist.mobile.dto.ChecklistImageDTO;
import com.ge.power.checklist.portal.dto.ChecklistComponentDto;
import com.ge.power.checklist.portal.dto.ChecklistFormDto;
import com.ge.power.checklist.portal.dto.ChecklistImages;
import com.ge.power.checklist.portal.dto.ChecklistPortalDto;
import com.ge.power.checklist.portal.dto.FormFilterSection;
import com.ge.power.checklist.portal.dto.ImageDTO;

@Path("service")
@JsonAutoDetect(fieldVisibility = Visibility.ANY)
public interface ChecklistController {

	@POST
	@Path("getportaluserroleandpermission/{ssoid}")
	@Produces({ "application/json" })
	public @ResponseBody
	String userRoleAndPermission(@PathParam("ssoid") String ssoId,
			@Context HttpHeaders headers);

	@POST
	@Path("checklistComponent")
	@Produces({ "application/json" })	 
	public List<ChecklistComponentDto> checklistComponent();

	@POST
	@Path("loadChecklist/{ssoId}/{roleName}/{recordCount}/{pageLimit}")
	@Produces({ "application/json" })
	public @ResponseBody
	List<ChecklistPortalDto> loadChecklist(@PathParam("ssoId") String ssoId,
			@PathParam("roleName") String roleName,			 
			 @PathParam("recordCount") String recordCount,
			 @PathParam("pageLimit") String pageLimit);

	@POST
	@Path("pageChecklist/{ssoId}/{roleName}")
	@Produces({ "application/json" })
	public @ResponseBody
	List<ChecklistPortalDto> pagenationChecklist(
			@PathParam("ssoId") String ssoId,
			@PathParam("roleName") String roleName);
	
	@POST
	@Path("deleteChecklist/{formId}")
	@Produces({"application/json"})
	public String deleteChecklist(@PathParam("formId") String formId);
	
	@POST
	@Path("businessHierarchyDetail/{ssoId}/{roleName}/{groupId}/{dropValue}")
	@Produces({"application/json"})
	public String businessHierarchyDetail(@PathParam("ssoId") String ssoId,
			@PathParam("roleName") String roleName,
			@PathParam("groupId")String groupId, 
			@PathParam("dropValue")String dropValue,
			@Context HttpHeaders headers);
	
	
	@POST
	@Path("searchChecklistForm/{ssoId}/{roleName}/{checklistName}/{checklistTitle}")
	@Produces({"application/json"})
	public List<ChecklistPortalDto> searchChecklistForm(@PathParam("ssoId") String ssoId,
			@PathParam("roleName") String roleName, 
			@PathParam("checklistName") String checklistName,
			@PathParam("checklistTitle") String checklistTitle);	
	
	@POST
	@Path("getvalidationrulelist")
	@Produces({"application/json"})
	public @ResponseBody String validationRuleList(@Context HttpHeaders headers);
	
	@GET
	@Path("getelementproperties/{elementId}")
	@Produces({"application/json"})
	public @ResponseBody String propertiesList(@PathParam("elementId") String elementId, @Context HttpHeaders headers);
	
	@POST
	@Path("saveMetadata")	
	@Consumes({"application/json"})
	@Produces({"application/json"})
	public @ResponseBody String saveMetadata(ChecklistFormDto jsonObject, @Context HttpHeaders headers);
	
	@POST
	@Path("filterSectionStepQues")
	@Produces({"application/json"})
	public String filterSectionStepQues(FormFilterSection jsonObject, @Context HttpHeaders headers);
	
	@POST
	@Path("getchecklistmetadataforedit/{formId}")	
	@Produces({"application/json"})
	public @ResponseBody String checklistMetadataForEdit(@PathParam("formId") String formId, @Context HttpHeaders headers);
	
	@POST
	@Path("publishchecklist")	
	@Consumes({"application/json"})
	@Produces({"application/json"})	
	public @ResponseBody String checklistPublishment(ChecklistFormDto jsonObject, @Context HttpHeaders headers);
	
	@POST
	@Path("/export")
	@Consumes({"application/json"})
	public @ResponseBody String fileInfo(ChecklistFormDto jsonObject, @Context HttpHeaders headers, @Context HttpServletRequest res);
	
	@POST
	@Path("/checklistnames/{sso}/{role}")
	@Produces({"application/json"})
	public @ResponseBody String checklistNames(@PathParam("sso") String formId, @PathParam("role") String role, @Context HttpHeaders headers);
	
	@POST
	@Path("/checklistversions/{formname}/{sso}/{role}")
	@Produces({"application/json"})
	public @ResponseBody String checklistVersion(@PathParam("formname") String formId, @PathParam("sso") String sso, @PathParam("role") String role, @Context HttpHeaders headers);
	
	@POST
	@Path("/populatesections/{formname}/{sso}/{version}")
	@Produces({"application/json"})
	public @ResponseBody String populatesections(@PathParam("formname") String formId, @PathParam("sso") String role,@PathParam("version") String version, 
			@Context HttpHeaders headers);
	
	@POST
	@Path("/populateprojects/{formname}/{sso}")
	@Produces({"application/json"})
	public @ResponseBody String populateProjects(@PathParam("formname") String formId, @PathParam("sso") String sso, @Context HttpHeaders headers);

		
	@POST
	@Path("/searchrecords")
	@Consumes({"application/json"})
	@Produces({"application/json"})	
	public @ResponseBody String searchRecords(ChecklistFormDto jsonObject, @Context HttpHeaders headers);
	
	@GET
	@Path("/exportxls/{sso}")
	@Produces("application/vnd.ms-excel")
	public @ResponseBody Response exportXLS(@PathParam("sso") String ssoId, @Context HttpHeaders headers, @Context HttpServletRequest res);
	
	@POST
	@Path("/checkformforedit")
	@Produces({"application/json"})
	public @ResponseBody String checkformforedit(ChecklistFormDto jsonObject, @Context HttpHeaders headers);
	
	@POST
	@Path("/uploadbulkimages")
	@Consumes({"application/json"})
	@Produces({"application/json"})
	public @ResponseBody String uploadBulkImagesFromPortal(@ModelAttribute("uploadForm") ChecklistImages uploadForm, @Context HttpHeaders headers);
	
	@POST
	@Path("/uploadhelpimages")
	@Consumes({"application/json"})
	@Produces({"application/json"})
	public @ResponseBody String uploadHelpImages(@ModelAttribute("uploadForm") ImageDTO imageDTO, @Context HttpHeaders headers);
	
	@POST
	@Path("downloadhelpimages")
	@Consumes({"application/json"})
	@Produces({"application/json"})
	public String downloadHelpImages(ChecklistFormDto jsonObject, @Context HttpHeaders headers);
	
	@POST
	@Path("checklistnameexists")
	@Consumes({"application/json"})
	@Produces({"application/json"})
	public String ischecklistnameexists(ChecklistFormDto jsonObject, @Context HttpHeaders headers);	

}
