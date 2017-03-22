package com.ge.power.checklist.mobile.util;

import java.io.File;
import java.nio.charset.Charset;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.apache.commons.codec.binary.Base64;

import com.ge.power.checklist.mobile.dto.ChecklistFormDto;
import com.ge.power.checklist.mobile.dto.ChecklistRecordDTO;
import com.ge.power.checklist.mobile.dto.QuestionElement;
import com.ge.power.checklist.mobile.dto.QuestionElements;
import com.ge.power.checklist.mobile.dto.RecordElements;
import com.ge.power.checklist.mobile.dto.SectionElement;
import com.ge.power.checklist.mobile.dto.SectionElements;
import com.ge.power.checklist.mobile.dto.StepElements;
import com.ge.power.checklist.mobile.exceptions.ChecklistMobileExceptions;


public class ChecklistUtility {
	//private static Cipher cipher;

	/**
	 * @param args
	 */
	public static void main(String[] args) throws Exception {

	}
	
	public static SecretKey getKey(){
		KeyGenerator keyGenerator;
		SecretKey secretKey = null;
		try {
			keyGenerator = KeyGenerator.getInstance("AES");
			keyGenerator.init(128);
			if(secretKey == null){
				secretKey = keyGenerator.generateKey();
			}
			
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	return 	secretKey;
		
	}
	
	public static String encrypt(String plainText, SecretKey secretKey)
			throws Exception {
		Cipher cipher = Cipher.getInstance("AES");
		byte[] plainTextByte = plainText.getBytes();
		cipher.init(Cipher.ENCRYPT_MODE, secretKey);
		byte[] encryptedByte = cipher.doFinal(plainTextByte);
		//Base64.Encoder encoder = Base64.encodeBase64(binaryData)
		byte[] encodedBytes = Base64.encodeBase64(encryptedByte);
		String encryptedText = new String(encodedBytes, Charset.forName("UTF-8"));
		return encryptedText;
	}

	public static String decrypt(String encryptedText, SecretKey secretKey)
			throws Exception {
		//Base64.Decoder decoder = Base64.getDecoder();
		Cipher cipher = Cipher.getInstance("AES");
		byte[] encryptedTextByte = Base64.decodeBase64(encryptedText.getBytes());
		cipher.init(Cipher.DECRYPT_MODE, secretKey);
		byte[] decryptedByte = cipher.doFinal(encryptedTextByte);
		String decryptedText = new String(decryptedByte);
		return decryptedText;
	}
	
	public static String[] getValidData(String data){
		if(data != null && !"".equals(data)){
			String subStr = data.substring(2, (data.length()-2));
			String convertedStr = subStr.replace("\\", "");
			String str1 = new String("\",\"");
			String []str = convertedStr.split(str1);
			return str;
		} 	else{
			String []arr = {""};
			arr[0] = "(\"\",\"\",\"\",\"\")";
			return arr;
		}
	}
	
	public static String[] getValidDataWithSpace(String data){
		if(data != null && !"".equals(data)){
			String subStr = data.substring(2, (data.length()-2));
			String convertedStr = subStr.replace("\\", "");
			String str1 = new String("\\)\",\"");
			String []str = convertedStr.split(str1);
			return str;
		} 	else{
			String []arr = {""};
			arr[0] = "(\"\",\"\",\"\",\"\")";
			return arr;
		}
	}
	
	public static String[] getConvertedString(String data){
		if(data != null && !"".equals(data)){
			String subStr = data.substring(2, (data.length()-2));
			String convertedStr = subStr.replace("\\", "");
			String str1 = new String("\"#,\"");
			String []str = convertedStr.split(str1);
			return str;
		} 	else{
			String []arr = {""};
			arr[0] = "(\"\",\"\",\"\")";
			return arr;
		}
	}
	
	public static String getSubString(String data, String str1, String str2){
		String mainString = "";
		if(data != null && !"".equals(data)){
			mainString = data.replace(str1, str2);
			mainString = mainString.replaceAll("\"", "");
			if(mainString.startsWith(",")){
				mainString = mainString.substring(1);
			}
		}
		return mainString.trim();
		
	}
	
	public static String replaceCharToString(String data, String str1, String str2){
		String mainString = "";
		if(data != null && !"".equals(data)){
			mainString = data.replace(str1, str2);
			mainString = mainString.replaceAll("\"", "");
			mainString = mainString.replaceAll(",", "");
		}
		return mainString.trim();
		
	}
	
	 public static File getDirectory(String imagePath, String destination) {
	        File directory = new File(destination);
	        //check if the location exists
	        if (!directory.exists()) {
	            try {
	                directory.mkdirs();
	            } catch (SecurityException secEx) {
	                secEx.printStackTrace(System.out);
	                directory = null;
	            }
	        }
	        return directory;
	    }
	 
	 public static List<String> validateRecordJsonData(ChecklistFormDto jsonObject){
		 List<String> errorList = new ArrayList<String>();
		 if(jsonObject != null){
			 if((jsonObject.getFormId() == null || "".equals(jsonObject.getFormId()))){
				 errorList.add("Invalid Input for Form Id.");
			 } else if(!CommonValidation.isNumeric(jsonObject.getFormId())){
				 errorList.add("Please enter only numeric value for From Id.");
			 } else if(!CommonValidation.isMaxLength(jsonObject.getFormId(), 14)){
				 errorList.add("Invalid Input for Form Id.");
			 }			 
			 if((jsonObject.getServerRecordId() == null)){
				 errorList.add("Invalid Input for Server record Id.");
			 } else if(!CommonValidation.isNumeric(!"".equals(jsonObject.getServerRecordId()) ? jsonObject.getServerRecordId() : "0")){
				 errorList.add("Please enter only numeric value for Server record Id.");
			 } else if(!CommonValidation.isMaxLength((!"".equals(jsonObject.getServerRecordId()) ? jsonObject.getServerRecordId() : "0"), 14)){
				 errorList.add("Invalid Input for Server record Id.");
			 }
			 if((jsonObject.getLocalRecordId() == null)){
				 errorList.add("Invalid Input for Local Record Id.");
			 } else if(!CommonValidation.isNumeric(jsonObject.getLocalRecordId())){
				 errorList.add("Please enter only numeric value for Local Record Id.");
			 } else if(!CommonValidation.isMaxLength((jsonObject.getLocalRecordId()), 25)){
				 errorList.add("Invalid Input for Local Record Id.");
			 }
			 if((jsonObject.getTurbineId() == null || "".equals(jsonObject.getTurbineId()))){
				 errorList.add("Invalid Input for Turbine Id.");
			 } else if(!CommonValidation.isMaxLength(jsonObject.getTurbineId(), 50)){
				 errorList.add("Invalid Input for Turbine Id.");
			 }			 
			 if((jsonObject.getProjectId() == null || "".equals(jsonObject.getProjectId()))){
				 errorList.add("Invalid Input for Project Id.");
			 } else if(!CommonValidation.isMaxLength(jsonObject.getProjectId(), 50)){
				 errorList.add("Invalid Input for Project Id.");
			 }			 
			 if((jsonObject.getRecordStatus() == null || "".equals(jsonObject.getRecordStatus()))){
				 errorList.add("Invalid Input for Record Status.");
			 } else if(!CommonValidation.isMaxLength(jsonObject.getRecordStatus(), 100)){
				 errorList.add("Invalid Input for Record Status.");
			 }
			 if((jsonObject.getSyncStatus() == null || "".equals(jsonObject.getSyncStatus()))){
				 errorList.add("Invalid Input for Sync Status.");
			 } else if(!CommonValidation.isMaxLength(jsonObject.getSyncStatus(), 10)){
				 errorList.add("Invalid Input for Sync Status.");
			 }
			 if((jsonObject.getLanguage() == null || "".equals(jsonObject.getLanguage()))){
				 errorList.add("Invalid Input for Language.");
			 } else if(!CommonValidation.isMaxLength(jsonObject.getLanguage(), 100)){
				 errorList.add("Invalid Input for Language.");
			 }
			 if((jsonObject.getSubmittedBy() == null || "".equals(jsonObject.getSubmittedBy()))){
				 errorList.add("Invalid Input for Submitted By.");
			 } else if(!CommonValidation.isMaxLength(jsonObject.getSubmittedBy(), 15)){
				 errorList.add("Invalid Input for Submitted By.");
			 } else if(!CommonValidation.isNumeric(jsonObject.getSubmittedBy())){
				 errorList.add("Please enter only numeric value for Submitted By.");
			 }
			 
			 ArrayList<SectionElements> objse=jsonObject.getRecordElements().get(0).getSectionElements();           
	         for(int i=0;i<objse.size();i++){
	        	ArrayList<SectionElement> obj1=objse.get(i).getSectionElement();
	        	for(int j=0;j<obj1.size();j++){
	        		
	        		if((obj1.get(j).getSectionId() == null || "".equals(obj1.get(j).getSectionId()))){
	   				    errorList.add("Invalid Input for Section Id.");
	   			    } else if(!CommonValidation.isMaxLength(obj1.get(j).getSectionId(), 15)){
	   				    errorList.add("Invalid Input for Section Id.");
	   			    } else if(!CommonValidation.isNumeric(obj1.get(j).getSectionId())){
	   				    errorList.add("Please enter only numeric value for Section Id.");
	   			    }
	        		
	        		ArrayList<StepElements> objstep=obj1.get(j).getStepElements();
        		    for(int k=0;k<objstep.size();k++){
	        	      	StepElements objse1=objstep.get(k); 
	        	      	if((objse1.getStepId() == null || "".equals(objse1.getStepId()))){
		   				    errorList.add("Invalid Input for Step Id.");
		   			    } else if(!CommonValidation.isMaxLength(objse1.getStepId(), 15)){
		   				    errorList.add("Invalid Input for Step Id.");
		   			    } else if(!CommonValidation.isNumeric(objse1.getStepId())){
		   				    errorList.add("Please enter only numeric value for Step Id.");
		   			    }
        	      	  
	        	      	ArrayList<QuestionElements> objqe=objse1.getQuestionElements();
	        	           for(int l=0;l<objqe.size();l++){
	        	          	ArrayList<QuestionElement> objQE1=objqe.get(l).getQuestionElement();
	        	          	
	        	          	if((objQE1.get(0).getQuestionId() == null || "".equals(objQE1.get(0).getQuestionId()))){
			   				    errorList.add("Invalid Input for Question Id.");
			   			    } else if(!CommonValidation.isMaxLength(objQE1.get(0).getQuestionId(), 15)){
			   				    errorList.add("Invalid Input for Question Id.");
			   			    } else if(!CommonValidation.isNumeric(objQE1.get(0).getQuestionId())){
			   				    errorList.add("Please enter only numeric value for Question Id.");
			   			    }
	        	          	
        	           		ArrayList<HashMap<String, Object>> ansValues = objQE1.get(0).getAnswerValue();
        	           		for(int n=0; n < ansValues.size(); n++){
        	    				
        	    				HashMap<String, Object> elemDetails = ansValues.get(n);
        	    				
        	    				
        	    				if(elemDetails.get("answerElementValue") == null){
    			   				    errorList.add("Invalid Input for answer Element Value.");
    			   			    } else {
    			   			    	if(!"".equals(elemDetails.get("answerElementValue"))){
    			   			    		if(!CommonValidation.isMaxLength(elemDetails.get("answerElementValue").toString(), 2000)){
    	    			   				    errorList.add("Invalid Input for answer Element Value.");
    	    			   			    } 
    			   			    	}
    			   			    } 
        	    				
        	    				if((elemDetails.get("answerInputElementId") == null || "".equals(elemDetails.get("answerInputElementId")))){
    			   				    errorList.add("Invalid Input for answer Input Element Id.");
    			   			    } else if(!CommonValidation.isMaxLength((String)elemDetails.get("answerInputElementId"), 15)){
    			   				    errorList.add("Invalid Input for answer Input Element Id.");
    			   			    } else if(!CommonValidation.isNumeric((String)elemDetails.get("answerInputElementId"))){
    			   				    errorList.add("Please enter only numeric value for answer Input Element Id.");
    			   			    }
        	    				
        	    				if((elemDetails.get("sequesnceId") == null || "".equals(elemDetails.get("sequesnceId")))){
    			   				    errorList.add("Invalid Input for Sequence Number.");
    			   			    } else if(!CommonValidation.isMaxLength((String)elemDetails.get("sequesnceId"), 15)){
    			   				    errorList.add("Invalid Input for Sequence Number.");
    			   			    } else if(!CommonValidation.isNumeric((String)elemDetails.get("sequesnceId"))){
    			   				    errorList.add("Please enter only numeric value for Sequence Number.");
    			   			    }
        	    				
        	           		}
	        	           }
        		    }
	        	 }                	
	        }                 
			 
		 }
		 return errorList;
		 
	 }
	 
}
