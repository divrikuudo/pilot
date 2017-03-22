package com.ge.power.checklist.portal.dto;

import java.util.ArrayList;

public class Element {
	
	private String elementId;

    private String elementName;
    private String clientUid;
    private String clientClass;
    private String imageTempId;
    private String imageTempUrl;
    private String elementType;
    private String elementMapId;
    private String isDeleted;
    private String elementNameDescription;

    //private Rule[] Rule;
    
    private ArrayList<Rule> rule = null;

    //private ElementArributuesVal[] elementArributuesVal;
    
    private ArrayList<ElementArributuesVal> elementArributuesVal = null;

    //private ElementArributuesProp[] elementArributuesProp;
    
    private ArrayList<ElementArributuesProp> elementArributuesProp = null;

    private String elementNameDesc;
    private String elementOrder;

	public String getElementId() {
		return elementId;
	}

	public void setElementId(String elementId) {
		this.elementId = elementId;
	}

	public String getElementName() {
		return elementName;
	}

	public void setElementName(String elementName) {
		this.elementName = elementName;
	}

	

	public ArrayList<ElementArributuesVal> getElementArributuesVal() {
		return elementArributuesVal;
	}

	public void setElementArributuesVal(
			ArrayList<ElementArributuesVal> elementArributuesVal) {
		this.elementArributuesVal = elementArributuesVal;
	}

	public ArrayList<ElementArributuesProp> getElementArributuesProp() {
		return elementArributuesProp;
	}

	public void setElementArributuesProp(
			ArrayList<ElementArributuesProp> elementArributuesProp) {
		this.elementArributuesProp = elementArributuesProp;
	}

	public String getElementNameDesc() {
		return elementNameDesc;
	}

	public void setElementNameDesc(String elementNameDesc) {
		this.elementNameDesc = elementNameDesc;
	}

	public String getElementOrder() {
		return elementOrder;
	}

	public void setElementOrder(String elementOrder) {
		this.elementOrder = elementOrder;
	}

	public String getClientUid() {
		return clientUid;
	}

	public void setClientUid(String clientUid) {
		this.clientUid = clientUid;
	}

	public String getClientClass() {
		return clientClass;
	}

	public void setClientClass(String clientClass) {
		this.clientClass = clientClass;
	}

	public String getImageTempId() {
		return imageTempId;
	}

	public void setImageTempId(String imageTempId) {
		this.imageTempId = imageTempId;
	}

	public String getImageTempUrl() {
		return imageTempUrl;
	}

	public void setImageTempUrl(String imageTempUrl) {
		this.imageTempUrl = imageTempUrl;
	}

	public String getElementType() {
		return elementType;
	}

	public void setElementType(String elementType) {
		this.elementType = elementType;
	}

	public String getElementMapId() {
		return elementMapId;
	}

	public void setElementMapId(String elementMapId) {
		this.elementMapId = elementMapId;
	}

	public ArrayList<Rule> getRule() {
		return rule;
	}

	public void setRule(ArrayList<Rule> rule) {
		this.rule = rule;
	}

	public String getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(String isDeleted) {
		this.isDeleted = isDeleted;
	}

	public String getElementNameDescription() {
		return elementNameDescription;
	}

	public void setElementNameDescription(String elementNameDescription) {
		this.elementNameDescription = elementNameDescription;
	}

}
