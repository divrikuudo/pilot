package com.ge.power.enterexit.mobile.dao;

import java.util.List;

import com.ge.power.enterexit.mobile.dto.TurbineDTO;


public interface EnterExitDao {

	public List<TurbineDTO> getLastTenJobs(String query,TurbineDTO turbineDTO);

	public String createJob(String query, TurbineDTO turbineDTO);	
	
	
}
