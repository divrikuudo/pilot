package com.ge.power.checklist.portal.util;

import java.util.MissingResourceException;
import java.util.PropertyResourceBundle;
import java.util.ResourceBundle;
import org.apache.log4j.Logger;

public final class PropertyFileReader
{
	private static PropertyFileReader propertyFileReader = null;
	private PropertyResourceBundle propertiesBundle;
	private static final Logger LOGGER = Logger.getLogger(PropertyFileReader.class);

	private PropertyFileReader()
	{
		try
		{
			this.propertiesBundle = ((PropertyResourceBundle)ResourceBundle.getBundle("com.ge.power.checklist.resources.DBQueries"));
		}
		catch (MissingResourceException mre)
		{
			LOGGER.error("***** Property file could not be read " + mre.getMessage());
		}
		catch (Exception ex)
		{
			LOGGER.error("***** Property file could not be read " + ex.getMessage());
		}
	}

	public static PropertyFileReader getInstance()
	{
		synchronized (PropertyFileReader.class)
		{
			if (propertyFileReader == null) {
				propertyFileReader = new PropertyFileReader();
			}
		}
		return propertyFileReader;
	}

	public String getProperty(String aKey)
	{
		try
		{
			return this.propertiesBundle.getString(aKey);
		}
		catch (MissingResourceException mre)
		{
			LOGGER.error("*****Key Not Found In Property File " + mre.getMessage());
		}
		return null;
	}
}

