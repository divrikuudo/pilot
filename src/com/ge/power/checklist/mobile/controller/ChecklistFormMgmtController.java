package com.ge.power.checklist.mobile.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ge.power.checklist.mobile.dto.ChecklistFormDto;
import com.ge.power.checklist.mobile.dto.ChecklistImageDTO;
import com.ge.power.checklist.mobile.dto.ChecklistParamDto;
import com.ge.power.checklist.mobile.dto.ChecklistVersionDTO;



@Path("service")
public interface ChecklistFormMgmtController {
	
	@GET
	@Path("authenticateUser/{ssoid}")
	@Produces({"application/json"})
	public String authenticateUser(@PathParam("ssoid") String ssoId);
	
	@GET
	@Path("getchecklistdetail/{ssoid}/{groupid}")
	@Produces({"application/json; charset=UTF-8"})
	public String getChecklistDetail(@PathParam("ssoid") String ssoId, @PathParam("groupid") String groupid, @Context HttpHeaders headers);
	
	@GET
	@Path("getchecklistmeatdata/{ssoid}/{formid}/{language}/{baseformid}/{versionno}")
	//@RequestMapping(method=RequestMethod.GET, produces={"application/json; charset=UTF-8"})
	@Produces({"application/json; charset=UTF-8"})
	public String getChecklistMetadata(@PathParam("ssoid") String ssoId, @PathParam("formid") String formId, @PathParam("language") String languageName, @PathParam("baseformid") String baseFormId, @PathParam("versionno") String versionNo, @Context HttpHeaders headers);
	
	@POST
	@Path("getlasttenrecords")
	@Produces({"application/json; charset=UTF-8"})
	public String getChecklistlatestRecords(ChecklistParamDto paramDto, @Context HttpHeaders headers);
	
	@POST
	@Path("uploadimages")
	@Consumes({"application/json"})
	@Produces({"application/json"})
	public String uploadChecklistImages(ChecklistImageDTO jsonObject, @Context HttpHeaders headers);
	
	@POST
	@Path("uploadimagesinbulk")
	@Consumes({"application/json"})
	@Produces({"application/json"})
	public String uploadImagesinBulk(ChecklistImageDTO jsonObject, @Context HttpHeaders headers);
	
	@POST
	@Path("downloadimages")
	@Consumes({"application/json"})
	@Produces({"application/json"})
	public String downloadChecklistImages(ChecklistImageDTO jsonObject, @Context HttpHeaders headers);
	
	@POST
	@Path("deleteimages")
	@Consumes({"application/json"})
	@Produces({"application/json"})
	public String deleteChecklistImages(ChecklistImageDTO jsonObject, @Context HttpHeaders headers);
	
	@POST
	@Path("downloadbulkimages")
	@Consumes({"application/json"})
	@Produces({"application/json"})
	public String downloadChecklistImagesinBulk(ChecklistImageDTO jsonObject, @Context HttpHeaders headers);
	
	@POST
	@Path("getuserroleandpermission/{ssoid}")
	@Produces({"application/json; charset=UTF-8"})
	//public Map<String, ChecklistResponse> getChecklistDetail(@QueryParam("ssoid") String ssoId, @QueryParam("tokan") String token);
	public @ResponseBody String getUserRoleAndPermission(@PathParam("ssoid") String ssoId, @Context HttpHeaders headers);
	
	@POST
	@Path("insertrecord")	
	@Consumes({"application/json"})
	@Produces({"application/json"})
	public @ResponseBody String recordDetail(ChecklistFormDto jsonObject, @Context HttpHeaders headers);

	@GET
	@Path("getprojectturbinedetail")
	@RequestMapping(method=RequestMethod.GET)
	@Produces({"application/json; charset=UTF-8"})
	public String getEDSRProjectTurbineDetail(@Context HttpHeaders headers);
	
	@GET
	@Path("getrecordlatestdetail/{recordid}")	
	@Consumes({"application/json"})
	@Produces({"application/json; charset=UTF-8"})
	public @ResponseBody String getRecordLatestDetail(@PathParam("recordid") String recordId, @Context HttpHeaders headers);
	
	@POST
	@Path("uploadimagesbyportal")
	@Consumes({"application/json"})
	@Produces({"application/json"})
	public String uploadChecklistImagesByPortal(ChecklistImageDTO jsonObject, @Context HttpHeaders headers);
	
	@POST
	@Path("getchecklistlatestversion")
	@Consumes({"application/json"})
	@Produces({"application/json"})
	public String getChecklistLatestVersion(ChecklistVersionDTO jsonObject, @Context HttpHeaders headers);
	
	@POST
	@Path("getrecordsynchistory")
	@Consumes({"application/json"})
	@Produces({"application/json"})
	public String getChecklistRecordSyncHistory(ChecklistParamDto paramDto, @Context HttpHeaders headers);


}
