package com.ge.power.enterexit.mobile.serviceimpl;

import java.util.List;

import com.ge.power.checklist.framework.SpringApplicationContext;
import com.ge.power.enterexit.mobile.dao.EnterExitDao;
import com.ge.power.enterexit.mobile.dto.TurbineDTO;
import com.ge.power.enterexit.mobile.service.EnterExitService;
import com.ge.power.checklist.portal.util.PropertyFileReader;


public class EnterExitServiceImpl implements EnterExitService{

	EnterExitDao enterExitdao = null;
	@Override
	public List<TurbineDTO> getLastTenJobs(TurbineDTO turbineDTO) {
		enterExitdao = (EnterExitDao)SpringApplicationContext.getBean("enterExitDaoImpl");
		String query = PropertyFileReader.getInstance().getProperty("turbinetenjobs");
		List<TurbineDTO> jobDetails = enterExitdao.getLastTenJobs(query,turbineDTO);
		return jobDetails;
	}
	
	
	@Override
	public String createJob(TurbineDTO turbineDTO) {
		enterExitdao = (EnterExitDao)SpringApplicationContext.getBean("enterExitDaoImpl");
		String query = PropertyFileReader.getInstance().getProperty("createjob");
	    String createJob = enterExitdao.createJob(query,turbineDTO);
		return createJob;
	}

}
