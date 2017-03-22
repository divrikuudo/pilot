package com.ge.power.checklist.mobile.dto;

import java.util.ArrayList;

public class SectionElement
{
    private String sectionId;
    private ArrayList<StepElements> stepElements = null;
    private String sectionName;

   // private StepElements[] stepElements;

    public String getSectionId ()
    {
        return sectionId;
    }

    public void setSectionId (String sectionId)
    {
        this.sectionId = sectionId;
    }

	public ArrayList<StepElements> getStepElements() {
		return stepElements;
	}

	public void setStepElements(ArrayList<StepElements> stepElements) {
		this.stepElements = stepElements;
	}

	public String getSectionName() {
		return sectionName;
	}

	public void setSectionName(String sectionName) {
		this.sectionName = sectionName;
	}

   /* public StepElements[] getStepElements ()
    {
        return stepElements;
    }

    public void setStepElements (StepElements[] stepElements)
    {
        this.stepElements = stepElements;
    }*/

    
}

