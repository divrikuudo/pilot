package com.ge.power.checklist.portal.dto;

public class AddAction {

	private String actionTag;

    private String actionDescription;

    private String actionOutput;

    private String actionOutputValue;

    private String numberOfFields;

    private String actionId;

    private String isDeleted;

    public String getActionTag ()
    {
        return actionTag;
    }

    public void setActionTag (String actionTag)
    {
        this.actionTag = actionTag;
    }

    public String getActionDescription ()
    {
        return actionDescription;
    }

    public void setActionDescription (String actionDescription)
    {
        this.actionDescription = actionDescription;
    }

    public String getActionOutput ()
    {
        return actionOutput;
    }

    public void setActionOutput (String actionOutput)
    {
        this.actionOutput = actionOutput;
    }

    public String getActionOutputValue ()
    {
        return actionOutputValue;
    }

    public void setActionOutputValue (String actionOutputValue)
    {
        this.actionOutputValue = actionOutputValue;
    }

    public String getNumberOfFields ()
    {
        return numberOfFields;
    }

    public void setNumberOfFields (String numberOfFields)
    {
        this.numberOfFields = numberOfFields;
    }

    public String getActionId ()
    {
        return actionId;
    }

    public void setActionId (String actionId)
    {
        this.actionId = actionId;
    }

    public String getIsDeleted ()
    {
        return isDeleted;
    }

    public void setIsDeleted (String isDeleted)
    {
        this.isDeleted = isDeleted;
    }
}
