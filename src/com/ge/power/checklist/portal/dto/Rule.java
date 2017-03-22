package com.ge.power.checklist.portal.dto;

import java.util.ArrayList;

public class Rule {
	
	private String ruleName;

    private String ruleId;

    private String formulaData;

    //private AddAction[] addAction;
    
    private ArrayList<AddAction> addAction = null;

    private String isDeleted;

    private String formula;
    private String ansRuleMapId;

	public String getRuleName() {
		return ruleName;
	}

	public void setRuleName(String ruleName) {
		this.ruleName = ruleName;
	}

	public String getRuleId() {
		return ruleId;
	}

	public void setRuleId(String ruleId) {
		this.ruleId = ruleId;
	}

	public String getFormulaData() {
		return formulaData;
	}

	public void setFormulaData(String formulaData) {
		this.formulaData = formulaData;
	}

	public ArrayList<AddAction> getAddAction() {
		return addAction;
	}

	public void setAddAction(ArrayList<AddAction> addAction) {
		this.addAction = addAction;
	}

	public String getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(String isDeleted) {
		this.isDeleted = isDeleted;
	}

	public String getFormula() {
		return formula;
	}

	public void setFormula(String formula) {
		this.formula = formula;
	}

	public String getAnsRuleMapId() {
		return ansRuleMapId;
	}

	public void setAnsRuleMapId(String ansRuleMapId) {
		this.ansRuleMapId = ansRuleMapId;
	}

}
