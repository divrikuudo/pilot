package com.ge.power.enterexit.mobile.controller;


import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;

import com.ge.power.enterexit.mobile.dto.TurbineDTO;


@Path("service")
public interface EnterExitController {

	@POST
	@Path("getlasttenjobs")
	@Consumes({"application/json"})
	@Produces({"application/json"})
	public List<TurbineDTO> getLastTenJobDetails(TurbineDTO jsonObject, @Context HttpHeaders headers) throws Exception;
	
	@POST
	@Path("createjob")
	@Consumes({"application/json"})
	@Produces({"application/json"})
	public String createJob(TurbineDTO jsonObject, @Context HttpHeaders headers) throws Exception;
	
}
