package com.ge.power.checklist.portal.servlets;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.ResourceBundle;

import javax.net.ssl.X509TrustManager;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.codehaus.jettison.json.JSONObject;

import com.ge.power.checklist.portal.exceptions.ChecklistPortalExceptions;
import com.ge.power.checklist.portal.util.ChecklistPortalConstants;

/**
 * ============================================================
 * File : AdminPortalHandelerServlet.java
 * Description : 
 * 
 * Package : 
 * Author : iGATE
 * Last Edited By :
 * Version : 1.0
 * Created on : Aug 2, 2013
 * History
 * Modified By : Initial Release
 * Classification : GE Confidential
 * Copyright (C) 2013 General Electric Company. All rights reserved
 *
 * ============================================================
 */
/*******************************************************************************
 *
 * @Author 		: iGATE
 * @Version 	: 1.0
 * @Date Created: Aug 2, 2013
 * @Date Modified : 
 * @Modified By : 
 * @Contact 	:
 * @Description : 
 * @History		:
 *
 ******************************************************************************/
@SuppressWarnings("serial")
public class AdminPortalHandelerServlet extends HttpServlet {
	static final Logger LOGGER = Logger.getLogger(AdminPortalHandelerServlet.class);
	static final ResourceBundle BUNDLE = ResourceBundle.getBundle("com.ge.power.checklist.resources.config");

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String strServiceOutput;
		StringBuffer sbOutput = new StringBuffer();
		String strOutput = "";
		String strUrl = "" ;
		String accessToken = "";
		
		try {
			//strServiceName should be the name of web services for RCOF app.
			/*Enumeration headerNames = request.getHeaderNames();
			while (headerNames.hasMoreElements()) {
				String key = (String) headerNames.nextElement();
				String value = request.getHeader(key);
				
				if("Authorization".equalsIgnoreCase(key)){
					if(request.getHeader(key) != null && !"".equals(request.getHeader(key))){
					accessToken = request.getHeader(key);
					} else{
						throw new Exception("User does not authorized to access the service.");
					}
				}
			}*/

			
			StringBuilder sb = new StringBuilder();
		    /*BufferedReader br1 = request.getReader();
		    String str;
		    while( (str = br1.readLine()) != null ){
		        sb.append(str);
		    } */ 
		    JSONObject jObj = new JSONObject(sb.toString());
		    
		    
		    
		    String strServiceName = (String)jObj.get("serviceName");
		    String serviceParam = (String)jObj.get("serviceParam");
		    String environmentVar = (String)jObj.get("environmentVar");
		    String strMethod = (String)jObj.get("method");
		  
		    JSONObject jObj1 = jObj.getJSONObject("postdata");
		    

			if (null!=strServiceName && !strServiceName.isEmpty()) {
				//  rcof/services in below path is configured in web.xml
				if(environmentVar != null && !"".equals(environmentVar) && "DEV".equals(environmentVar)){
					//strUrl = "https://dev.api.ge.com/gecorp/wind/bladeinspection/v1/"+strServiceName;
					strUrl = BUNDLE.getString(ChecklistPortalConstants.DEV_HOST_URL)+strServiceName+serviceParam;
				} else if(environmentVar != null && !"".equals(environmentVar) && "STAGE".equals(environmentVar)){
					//strUrl = "https://dev.api.ge.com/gecorp/wind/bladeinspection/v1/"+strServiceName;
					strUrl = BUNDLE.getString(ChecklistPortalConstants.STAGE_HOST_URL)+strServiceName+serviceParam;
				} else if(environmentVar != null && !"".equals(environmentVar) && "PRODUCTION".equals(environmentVar)){
					//strUrl = "https://dev.api.ge.com/gecorp/wind/bladeinspection/v1/"+strServiceName;
					strUrl = BUNDLE.getString(ChecklistPortalConstants.PROD_HOST_URL)+strServiceName+serviceParam;
				}
			}
			
			/*LOGGER.info("URL ---- "+strUrl);
			PostMethod post = new PostMethod(strUrl);
			
			post.setRequestHeader("Content-type","text/xml; charset=ISO-8859-1");
	    	//post.setRequestHeader("Authorization", accessToken);
	    	post.setRequestHeader("Accept", "application/json");
	        HttpClient httpclient = new HttpClient();
	        int result=0;
	        try{
		        SSLContext ctx = SSLContext.getInstance("TLS");
		        ctx.init(new KeyManager[0], new TrustManager[] {new DefaultTrustManager()}, new SecureRandom());
		        SSLContext.setDefault(ctx);  
		        
		        result = httpclient.executeMethod(post);
	        }catch(Exception e){
	        	e.printStackTrace();
	        }
	        strOutput = post.getResponseBodyAsString();
	        byte[] output = post.getResponseBody();*/
			URL url = new URL(strUrl);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestProperty("Authorization", accessToken);
			
			conn.setRequestMethod(strMethod);
			conn.setRequestProperty("Accept", "application/json");
			/*BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
			while ((strServiceOutput = br.readLine()) != null) {
				sbOutput.append(strServiceOutput);
			}*/
			strOutput = sbOutput.toString();
			//LOGGER.info("strOutput - "+strOutput);
	        /*String finalResult1 = new String((output), "UTF-8");
			LOGGER.info("getResponseBody - "+finalResult1);*/
	        
			String finalResult = new String((strOutput.getBytes()), "UTF-8");
			response.setCharacterEncoding("UTF-8");
			response.getOutputStream().print(finalResult);
		}
		catch (ChecklistPortalExceptions e) {
			e.printStackTrace();
			String errorMsg = new String((e.getErrorMessage().getBytes()), "UTF-8");
			response.getOutputStream().print(errorMsg);
		} catch (Exception e) {
			e.printStackTrace();
			//String errorMsg = new String((e.getLocalizedMessage().getBytes()), "UTF-8");
			response.getOutputStream().print(e.getLocalizedMessage());
		}
	}
		
		private static class DefaultTrustManager implements X509TrustManager {
	        @Override
	        public void checkClientTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {}
	        @Override
	        public void checkServerTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {}
	        @Override
	        public X509Certificate[] getAcceptedIssuers() {
	            return null;
	        }
	    }
}
