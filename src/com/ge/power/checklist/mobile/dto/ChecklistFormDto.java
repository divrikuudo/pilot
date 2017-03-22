package com.ge.power.checklist.mobile.dto;

import java.util.ArrayList;

public class ChecklistFormDto {	
	private ArrayList<RecordElements> recordElements = null;	
	
	//private RecordElements[] recordElements;

   // private String recordStatus;

	
	    private String serverRecordId;
	    private String formId;
	    private String localRecordId;
	    //private RecordElements[] recordElements;
	    private String syncStatus;
	    private String isDeleted;
	    private String submittedBy;
	    private String createdDate;
	    private String modifiedDate;
	    private String recordStatus;
	    private String language;
	    private String languageId;
	    private String qaassocid;
	    private String projectId;
	    private String turbineId;
	    private String versionNo;

	    public String getServerRecordId ()
	    {
	        return serverRecordId;
	    }

	    public void setServerRecordId (String serverRecordId)
	    {
	        this.serverRecordId = serverRecordId;
	    }

	    public String getFormId ()
	    {
	        return formId;
	    }

	    public void setFormId (String formId)
	    {
	        this.formId = formId;
	    }

	    public String getLocalRecordId ()
	    {
	        return localRecordId;
	    }

	    public void setLocalRecordId (String localRecordId)
	    {
	        this.localRecordId = localRecordId;
	    }

	  /*  public RecordElements[] getRecordElements ()
	    {
	        return recordElements;
	    }

	    public void setRecordElements (RecordElements[] recordElements)
	    {
	        this.recordElements = recordElements;
	    }*/

	    public String getSyncStatus ()
	    {
	        return syncStatus;
	    }

	    public void setSyncStatus (String syncStatus)
	    {
	        this.syncStatus = syncStatus;
	    }

	    public String getIsDeleted ()
	    {
	        return isDeleted;
	    }

	    public void setIsDeleted (String isDeleted)
	    {
	        this.isDeleted = isDeleted;
	    }

	    public String getSubmittedBy ()
	    {
	        return submittedBy;
	    }

	    public void setSubmittedBy (String submittedBy)
	    {
	        this.submittedBy = submittedBy;
	    }

	    public String getCreatedDate ()
	    {
	        return createdDate;
	    }

	    public void setCreatedDate (String createdDate)
	    {
	        this.createdDate = createdDate;
	    }

	    public String getModifiedDate ()
	    {
	        return modifiedDate;
	    }

	    public void setModifiedDate (String modifiedDate)
	    {
	        this.modifiedDate = modifiedDate;
	    }

	    public String getRecordStatus ()
	    {
	        return recordStatus;
	    }

	    public void setRecordStatus (String recordStatus)
	    {
	        this.recordStatus = recordStatus;
	    }

		public ArrayList<RecordElements> getRecordElements() {
			return recordElements;
		}

		public void setRecordElements(ArrayList<RecordElements> recordElements) {
			this.recordElements = recordElements;
		}

		public String getLanguage() {
			return language;
		}

		public void setLanguage(String language) {
			this.language = language;
		}

		public String getLanguageId() {
			return languageId;
		}

		public void setLanguageId(String languageId) {
			this.languageId = languageId;
		}

		public String getQaassocid() {
			return qaassocid;
		}

		public void setQaassocid(String qaassocid) {
			this.qaassocid = qaassocid;
		}

		public String getProjectId() {
			return projectId;
		}

		public void setProjectId(String projectId) {
			this.projectId = projectId;
		}

		public String getTurbineId() {
			return turbineId;
		}

		public void setTurbineId(String turbineId) {
			this.turbineId = turbineId;
		}

		public String getVersionNo() {
			return versionNo;
		}

		public void setVersionNo(String versionNo) {
			this.versionNo = versionNo;
		}
	   
	}

