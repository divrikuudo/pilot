package com.ge.power.checklist.mobile.dto;

import java.util.ArrayList;

public class StepElements
{
	private String stepId;

    private ArrayList<QuestionElements> questionElements = null;    

	//private ArrayList<StepElement> stepElement = null;
	/*private StepElement[] stepElement;

    public StepElement[] getStepElement ()
    {
        return stepElement;
    }

    public void setStepElement (StepElement[] stepElement)
    {
        this.stepElement = stepElement;
    }*/

	/*public ArrayList<StepElement> getStepElement() {
		return stepElement;
	}

	public void setStepElement(ArrayList<StepElement> stepElement) {
		this.stepElement = stepElement;
	}*/

	public ArrayList<QuestionElements> getQuestionElements() {
		return questionElements;
	}

	public void setQuestionElements(ArrayList<QuestionElements> questionElements) {
		this.questionElements = questionElements;
	}

	public String getStepId() {
		return stepId;
	}

	public void setStepId(String stepId) {
		this.stepId = stepId;
	}

    
}

