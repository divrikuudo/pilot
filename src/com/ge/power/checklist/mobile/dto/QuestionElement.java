package com.ge.power.checklist.mobile.dto;

import java.util.ArrayList;
import java.util.HashMap;

public class QuestionElement
{
    private String Comments;

    private String questionId;
    private ArrayList<HashMap<String, Object>> answerValue;
    private ArrayList<String> answerImages = null;

    //private String[] answerImages;

    public String getComments ()
    {
        return Comments;
    }

    public void setComments (String Comments)
    {
        this.Comments = Comments;
    }

    public String getQuestionId ()
    {
        return questionId;
    }

    public void setQuestionId (String questionId)
    {
        this.questionId = questionId;
    }

    public ArrayList<HashMap<String, Object>> getAnswerValue ()
    {
        return answerValue;
    }

    public void setAnswerValue (ArrayList<HashMap<String, Object>> answerValue)
    {
        this.answerValue = answerValue;
    }

	public ArrayList<String> getAnswerImages() {
		return answerImages;
	}

	public void setAnswerImages(ArrayList<String> answerImages) {
		this.answerImages = answerImages;
	}


	
   }

