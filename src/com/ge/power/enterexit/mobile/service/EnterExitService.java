package com.ge.power.enterexit.mobile.service;

import java.util.List;
import com.ge.power.enterexit.mobile.dto.TurbineDTO;



public interface EnterExitService {

	public List<TurbineDTO> getLastTenJobs(TurbineDTO turbineDTO);

	 public String createJob(TurbineDTO turbineDTO);
	
	
}
