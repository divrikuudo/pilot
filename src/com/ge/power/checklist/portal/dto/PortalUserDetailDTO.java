package com.ge.power.checklist.portal.dto;

import org.codehaus.jackson.map.annotate.JsonSerialize;

@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)

public class PortalUserDetailDTO {
	
	private String userId;
	private String lastName;
	private String firstName;
	private String ssoId;
	private String emailId;
	private String roleName;
	private String isChecklistAppUser;
	private String isAdminPortalUser;
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getSsoId() {
		return ssoId;
	}
	public void setSsoId(String ssoId) {
		this.ssoId = ssoId;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getIsChecklistAppUser() {
		return isChecklistAppUser;
	}
	public void setIsChecklistAppUser(String isChecklistAppUser) {
		this.isChecklistAppUser = isChecklistAppUser;
	}
	public String getIsAdminPortalUser() {
		return isAdminPortalUser;
	}
	public void setIsAdminPortalUser(String isAdminPortalUser) {
		this.isAdminPortalUser = isAdminPortalUser;
	}
	
}
