package com.ge.power.enterexit.mobile.daoimpl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.sql.DataSource;
import org.apache.log4j.Logger;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import com.ge.power.enterexit.mobile.dao.EnterExitDao;
import com.ge.power.enterexit.mobile.dto.TurbineDTO;




public class EnterExitDaoImpl implements EnterExitDao{
	
	
	private JdbcTemplate jdbcTemplate;
	private DataSource dataSource;
	
	
	
	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}



	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}



	public DataSource getDataSource() {
		return dataSource;
	}



	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}



	@Override
	public List<TurbineDTO> getLastTenJobs(String query,TurbineDTO turbineDTO) {
		
		List<TurbineDTO> jobDetails = new ArrayList<TurbineDTO>();	
		/*RowMapper<TurbineDTO> mapper = new RowMapper<TurbineDTO>(){

			@Override
			public TurbineDTO mapRow(ResultSet rst, int arg1) throws SQLException {
				TurbineDTO obj = new TurbineDTO();
				
				obj.setId(rst.getString("id"));
				obj.setTurbineId(rst.getString("turbineId"));
				obj.setTurbine(rst.getString("turbine"));
				obj.setRequestorName(rst.getString("requestorname"));
				obj.setRequestorPhone(rst.getString("requestorphone"));
				obj.setDate(rst.getString("date"));
				obj.setCreatedBy(rst.getString("createdby"));
				obj.setCreatedDate(rst.getString("createddate"));
				obj.setCheckoutDate(rst.getString("checkoutdate"));
				obj.setStatus(rst.getString("status"));
				obj.setEserviceRequestNumber(rst.getString("eservicerequestnumber"));
				obj.seteServiceRequest(rst.getString("eservicerequest"));
				obj.setWorkOrderNumber(rst.getString("workordernumber"));
				obj.setOtNumber(rst.getString("otnumber"));
				obj.setRequestSourceId(rst.getString("requestsourceid"));
				obj.setRequestorRoleId(rst.getString("requestorroleid"));
				obj.setReasonForAttendenceId(rst.getString("reasonforattendenceid"));
				obj.setNotificationActivityCode(rst.getString("notificationactivitycode"));
				obj.setOthersReasonDesc(rst.getString("othersreasondesc"));
				obj.setEditor(rst.getString("editor"));
				obj.setCheckoutEditor(rst.getString("checkouteditor"));
				obj.setActCreatedDt(rst.getString("actcreateddate"));
				obj.setSiteId(rst.getString("siteid"));
				obj.setSite(rst.getString("site"));
				obj.setServiceRequest(rst.getString("servicerequest"));
				obj.setTask(rst.getString("task"));	
				
				return obj;
			}
			
		};
		Object[] param = new Object[1];
		param[0] = turbineDTO.getId();
		
		jobDetails = getJdbcTemplate().query(query, param, mapper);*/
		
		TurbineDTO obj = new TurbineDTO();
		
		obj.setId(turbineDTO.getId());
		obj.setTurbineId(turbineDTO.getTurbineId());
		obj.setTurbine(turbineDTO.getTurbine());
		obj.setRequestorName(turbineDTO.getRequestorName());
		obj.setRequestorPhone(turbineDTO.getRequestorPhone());
		obj.setDate(turbineDTO.getDate());
		obj.setCreatedBy(turbineDTO.getCreatedBy());
		obj.setCreatedDate(turbineDTO.getCreatedDate());
		obj.setCheckoutDate(turbineDTO.getCheckoutDate());
		obj.setStatus(turbineDTO.getStatus());
		obj.setEserviceRequestNumber(turbineDTO.getEserviceRequestNumber());
		obj.seteServiceRequest(turbineDTO.geteServiceRequest());
		obj.setWorkOrderNumber(turbineDTO.getWorkOrderNumber());
		obj.setOtNumber(turbineDTO.getOtNumber());
		obj.setRequestSourceId(turbineDTO.getRequestorRoleId());
		obj.setRequestorRoleId(turbineDTO.getRequestorRoleId());
		obj.setReasonForAttendenceId(turbineDTO.getReasonForAttendenceId());
		obj.setNotificationActivityCode(turbineDTO.getNotificationActivityCode());
		obj.setOthersReasonDesc(turbineDTO.getOthersReasonDesc());
		obj.setEditor(turbineDTO.getEditor());
		obj.setCheckoutEditor(turbineDTO.getCheckoutEditor());
		obj.setActCreatedDt(turbineDTO.getActCreatedDt());
		obj.setSiteId(turbineDTO.getSiteId());
		obj.setSite(turbineDTO.getSite());
		obj.setServiceRequest(turbineDTO.getServiceRequest());
		obj.setTask(turbineDTO.getTask());
		
		jobDetails.add(obj);
				
	
		return jobDetails;
	}



	@Override
	public String createJob(String query, TurbineDTO turbineDTO) {
		
			
		int newJob = 0;
		String message = null;
		
		Object[] param = new Object[10];
		param[0] = turbineDTO.getId();
		param[1] = turbineDTO.getCheckoutDate();
		param[2] = turbineDTO.geteServiceRequest();
		param[3] = turbineDTO.getOthersReasonDesc();
		param[4] = turbineDTO.getEditor();
		param[5] = turbineDTO.getDate();
		param[6] = turbineDTO.getCreatedDate();
		param[7] = turbineDTO.getCreatedBy();
		param[8] = turbineDTO.getRequestorName();
		param[9] = turbineDTO.getRequestorRoleId();
	
		
		newJob = getJdbcTemplate().update(query, param);
		
		if(newJob>0){
			message = "Job successfully created for" +turbineDTO.getId()+", "+turbineDTO.getDate()+", "+turbineDTO.getCreatedDate();
		}else{
			message = "Sorry, there was some error. Try again later";
		}
		
		return message;
	}



	
}
