package com.ge.power.checklist.framework;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class SpringApplicationContext implements ApplicationContextAware
{
	private static ApplicationContext appContext;

	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException
	{
		appContext = applicationContext;
	}

	public static Object getBean(String beanName)
	{
		return appContext.getBean(beanName);
	}
}
