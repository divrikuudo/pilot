package com.ge.power.checklist.portal.dto;

import org.codehaus.jackson.map.annotate.JsonSerialize;

@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
public class ChecklistValidationRuleDTO {
	private String ruleId;
	private String ruleName;
	private String ruleDescription;
	private String ruleCategory;
	private String ruleApplicability;
	private String ruleFormula;
	private String ruleActionId;
	private String ruleActionTag;
	private String ruleActionDesc;
	
	
	public String getRuleId() {
		return ruleId;
	}
	public void setRuleId(String ruleId) {
		this.ruleId = ruleId;
	}
	public String getRuleName() {
		return ruleName;
	}
	public void setRuleName(String ruleName) {
		this.ruleName = ruleName;
	}
	public String getRuleDescription() {
		return ruleDescription;
	}
	public void setRuleDescription(String ruleDescription) {
		this.ruleDescription = ruleDescription;
	}
	public String getRuleCategory() {
		return ruleCategory;
	}
	public void setRuleCategory(String ruleCategory) {
		this.ruleCategory = ruleCategory;
	}
	public String getRuleApplicability() {
		return ruleApplicability;
	}
	public void setRuleApplicability(String ruleApplicability) {
		this.ruleApplicability = ruleApplicability;
	}
	public String getRuleFormula() {
		return ruleFormula;
	}
	public void setRuleFormula(String ruleFormula) {
		this.ruleFormula = ruleFormula;
	}
	public String getRuleActionId() {
		return ruleActionId;
	}
	public void setRuleActionId(String ruleActionId) {
		this.ruleActionId = ruleActionId;
	}
	public String getRuleActionTag() {
		return ruleActionTag;
	}
	public void setRuleActionTag(String ruleActionTag) {
		this.ruleActionTag = ruleActionTag;
	}
	public String getRuleActionDesc() {
		return ruleActionDesc;
	}
	public void setRuleActionDesc(String ruleActionDesc) {
		this.ruleActionDesc = ruleActionDesc;
	}

}
