package com.ge.power.checklist.mobile.dto;

import java.util.ArrayList;

public class StepElement
{
    private String stepId;
    private ArrayList<QuestionElements> questionElements = null;
    //private QuestionElements[] questionElements;

    public String getStepId ()
    {
        return stepId;
    }

    public void setStepId (String stepId)
    {
        this.stepId = stepId;
    }

	public ArrayList<QuestionElements> getQuestionElements() {
		return questionElements;
	}

	public void setQuestionElements(ArrayList<QuestionElements> questionElements) {
		this.questionElements = questionElements;
	}

    /*public QuestionElements[] getQuestionElements ()
    {
        return questionElements;
    }

    public void setQuestionElements (QuestionElements[] questionElements)
    {
        this.questionElements = questionElements;
    }*/

    
}

