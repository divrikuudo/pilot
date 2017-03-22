package com.ge.power.checklist.mobile.dto;

import java.util.ArrayList;

public class RecordElements
{
	private ArrayList<SectionElements> sectionElements = null;
	
	/*private SectionElements[] sectionElements;

    public SectionElements[] getSectionElements ()
    {
        return sectionElements;
    }

    public void setSectionElements (SectionElements[] sectionElements)
    {
        this.sectionElements = sectionElements;
    }*/

	public ArrayList<SectionElements> getSectionElements() {
		return sectionElements;
	}

	public void setSectionElements(ArrayList<SectionElements> sectionElements) {
		this.sectionElements = sectionElements;
	}
  
}
