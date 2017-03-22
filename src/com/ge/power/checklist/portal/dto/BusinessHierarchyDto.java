package com.ge.power.checklist.portal.dto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.codehaus.jackson.map.annotate.JsonSerialize;

@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
public class BusinessHierarchyDto {
	
	private String functionId;
	private String subFunctionId;
	private String groupId;
	private String groupParentId;		
	private String functionName;
	private String subFunctionName;
	private String groupName;
		
	
	public String getFunctionId() {
		return functionId;
	}
	public void setFunctionId(String functionId) {
		this.functionId = functionId;
	}
	public String getSubFunctionId() {
		return subFunctionId;
	}
	public void setSubFunctionId(String subFunctionId) {
		this.subFunctionId = subFunctionId;
	}
	public String getGroupId() {
		return groupId;
	}
	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}
	public String getGroupParentId() {
		return groupParentId;
	}
	public void setGroupParentId(String groupParentId) {
		this.groupParentId = groupParentId;
	}
	public String getFunctionName() {
		return functionName;
	}
	public void setFunctionName(String functionName) {
		this.functionName = functionName;
	}
	public String getSubFunctionName() {
		return subFunctionName;
	}
	public void setSubFunctionName(String subFunctionName) {
		this.subFunctionName = subFunctionName;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	

}
