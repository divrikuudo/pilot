package com.ge.power.checklist.portal.util;


import java.util.HashMap;
import java.util.Iterator;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;

public class JSONParseService
{
	static final Logger LOGGER = Logger.getLogger(JSONParseService.class);

	public JSONArray parseArrJSONValues(JSONObject jsonRecords)
			throws Exception
			{
		LOGGER.info("Start JSONParseService.java :: parseArrJSONValues() method.");
		JSONArray jsonObjectArray = new JSONArray();
		try
		{
			jsonObjectArray = jsonRecords.getJSONArray("arrInv");
		}
		catch (Exception e)
		{
			throw new Exception("In JSONParseService.java :: in parseArrJSONValues() method :: " + e);
		}
		LOGGER.info("End JSONParseService.java :: parseArrJSONValues() method.");
		return jsonObjectArray;
			}

	public HashMap<String, Object> parseMapJSONValues(JSONObject jsonRecords)
			throws Exception
			{
		LOGGER.info("Start JSONParseService.java :: parseMapJSONValues() method.");
		HashMap<String, Object> map = new HashMap<String, Object>();
		try
		{
			Iterator<?> iter = jsonRecords.keys();
			while (iter.hasNext())
			{
				String tempJsonKey = iter.next().toString();

				if (tempJsonKey.equalsIgnoreCase("ssoID")) {
					map.put("ssoID", jsonRecords.get(tempJsonKey).toString());
				} else if (tempJsonKey.equalsIgnoreCase("password")) {
					map.put("password", jsonRecords.get(tempJsonKey).toString());
				}else if (tempJsonKey.equalsIgnoreCase("uFname"))
				{
					if (jsonRecords.get(tempJsonKey).toString().equalsIgnoreCase("-1")) {
						map.put("uFname", "");
					} else {
						map.put("uFname", jsonRecords.get(tempJsonKey).toString());
					}
				}
				else if (tempJsonKey.equalsIgnoreCase("uLname"))
				{
					if (jsonRecords.get(tempJsonKey).toString().equalsIgnoreCase("-1")) {
						map.put("uLname", "");
					} else {
						map.put("uLname", jsonRecords.get(tempJsonKey).toString());
					}
				} else if (tempJsonKey.equalsIgnoreCase("fName")) {
					map.put("fName", jsonRecords.get(tempJsonKey).toString());
				} else if (tempJsonKey.equalsIgnoreCase("lName")) {
					map.put("lName", jsonRecords.get(tempJsonKey).toString());
				} else if (tempJsonKey.equalsIgnoreCase("uSsoId")) {
					map.put("uSsoId", jsonRecords.get(tempJsonKey).toString());
				}  else if (tempJsonKey.equalsIgnoreCase("email")) {
					map.put("email", jsonRecords.get(tempJsonKey).toString());
				} else if (tempJsonKey.equalsIgnoreCase("role")) {
					map.put("role", jsonRecords.get(tempJsonKey).toString());
				}else if (tempJsonKey.equalsIgnoreCase("statusFlg")) {
					map.put("statusFlg", jsonRecords.get(tempJsonKey).toString());
				} else if (tempJsonKey.equalsIgnoreCase("roleId")) {
					map.put("roleId", jsonRecords.get(tempJsonKey).toString());
				}else if (tempJsonKey.equalsIgnoreCase("miscLineName")) {
					map.put("miscLineName", jsonRecords.get(tempJsonKey).toString());
				}else if (tempJsonKey.equalsIgnoreCase("miscLineNameId")) {
					map.put("miscLineNameId", jsonRecords.get(tempJsonKey).toString());
				}else if (tempJsonKey.equalsIgnoreCase("miscClassification")){
					map.put("miscClassification", jsonRecords.get(tempJsonKey).toString());
				}else if (tempJsonKey.equalsIgnoreCase("miscClassificationId")){
					map.put("miscClassificationId", jsonRecords.get(tempJsonKey).toString());
				}else if (tempJsonKey.equalsIgnoreCase("miscServiceType")) {
					map.put("miscServiceType", jsonRecords.get(tempJsonKey).toString());
				}else if (tempJsonKey.equalsIgnoreCase("miscServiceTypeId")) {
					map.put("miscServiceTypeId", jsonRecords.get(tempJsonKey).toString());
				}else if (tempJsonKey.equalsIgnoreCase("miscProjPl")) {
					map.put("miscProjPl", jsonRecords.get(tempJsonKey).toString());
				}else if (tempJsonKey.equalsIgnoreCase("miscProjPlId")) {
					map.put("miscProjPlId", jsonRecords.get(tempJsonKey).toString());
				}else if (tempJsonKey.equalsIgnoreCase("miscSubPl")) {
					map.put("miscSubPl", jsonRecords.get(tempJsonKey).toString());
				}else if (tempJsonKey.equalsIgnoreCase("miscSubPlId")) {
					map.put("miscSubPlId", jsonRecords.get(tempJsonKey).toString());
				}else if (tempJsonKey.equalsIgnoreCase("miscQtr")) {
					map.put("miscQtr", jsonRecords.get(tempJsonKey).toString());
				}else if (tempJsonKey.equalsIgnoreCase("miscYear")) {
					map.put("miscYear", jsonRecords.get(tempJsonKey).toString());
				}else if (tempJsonKey.equalsIgnoreCase("miscCmAmt")) {
					map.put("miscCmAmt", jsonRecords.get(tempJsonKey).toString());
				} else if (tempJsonKey.equalsIgnoreCase("miscSalesAmt")) {
					map.put("miscSalesAmt", jsonRecords.get(tempJsonKey).toString());
				} else if (tempJsonKey.equalsIgnoreCase("miscCmPerc")) {
					map.put("miscCmPerc", jsonRecords.get(tempJsonKey).toString());
				} else if (tempJsonKey.equalsIgnoreCase("isNew")) {
					map.put("isNew", jsonRecords.get(tempJsonKey).toString());
				} else if (tempJsonKey.equalsIgnoreCase("miscStatusFlg")) {
					map.put("miscStatusFlg", jsonRecords.get(tempJsonKey).toString());
				}else if (tempJsonKey.equalsIgnoreCase("miscLineId")) {
					map.put("miscLineId", jsonRecords.get(tempJsonKey).toString());
				}else if (tempJsonKey.equalsIgnoreCase("roleId")) {
					map.put("roleId", jsonRecords.get(tempJsonKey).toString());
				}else if (tempJsonKey.equalsIgnoreCase("miscItemName")) {
					map.put("miscItemName", jsonRecords.get(tempJsonKey).toString());
				} 
			}
		}
		catch (Exception e)
		{
			throw new Exception("In JSONParseService.java :: in parseMapJSONValues() method :: " + e);
		}
		LOGGER.info("End JSONParseService.java :: parseMapJSONValues() method.");
		return map;
			}
}
