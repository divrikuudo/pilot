package com.ge.power.checklist.portal.util;

import java.io.File;
import java.nio.charset.Charset;
import java.security.NoSuchAlgorithmException;
import java.util.StringTokenizer;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.apache.commons.codec.binary.Base64;

import com.ge.power.checklist.mobile.dto.ChecklistRecordDTO;


public class ChecklistUtility {
	//private static Cipher cipher;

	/**
	 * @param args
	 */
	public static void main(String[] args) throws Exception {

		
		getValidData1("");
		
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
			String convertedStr = subStr.replace("\\\\", "/");
			convertedStr = convertedStr.replace("\\", "");
			String str1 = new String("\",\"");
			String []str = convertedStr.split(str1);
			return str;
		} 	else{
			String []arr = {""};
			arr[0] = "(\"\",\"\",\"\",\"\")";
			return arr;
		}
	}
	
	public static String[] getValidData1(String data){
		if(data != null && !"".equals(data)){
			String subStr = data.substring(2, (data.length()-2));
			String convertedStr = subStr.replace("\\\\", "/");
			convertedStr = convertedStr.replace("\\", "");
			convertedStr = convertedStr.replace("\"", "");
			String str1 = new String("\\)\\,\\(");
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
	
}
