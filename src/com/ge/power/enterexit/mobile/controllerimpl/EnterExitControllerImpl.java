package com.ge.power.enterexit.mobile.controllerimpl;

import java.util.List;
import javax.ws.rs.core.HttpHeaders;
import com.ge.power.enterexit.mobile.controller.EnterExitController;
import com.ge.power.enterexit.mobile.dto.TurbineDTO;
import com.ge.power.checklist.framework.SpringApplicationContext;
import com.ge.power.enterexit.mobile.service.EnterExitService;

public class EnterExitControllerImpl implements EnterExitController{

EnterExitService enterexitService = null;
	
	@Override
	public List<TurbineDTO> getLastTenJobDetails(TurbineDTO jsonObject, HttpHeaders headers) throws Exception {
		enterexitService = (EnterExitService)SpringApplicationContext.getBean("enterExitServiceImpl");
		return enterexitService.getLastTenJobs(jsonObject);
		
	}

	@Override
	public String createJob(TurbineDTO jsonObject, HttpHeaders headers)	throws Exception {
		enterexitService = (EnterExitService)SpringApplicationContext.getBean("enterExitServiceImpl");	
		return enterexitService.createJob(jsonObject);
	}

	

}
