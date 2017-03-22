package com.ge.power.checklist.portal.servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;


public class ChecklistMainServlet extends HttpServlet {

	private Logger logger = Logger.getLogger(ChecklistMainServlet.class);

	public void doGet(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {

		res.setContentType("text/html");// setting the content type
		// PrintWriter pw=res.getWriter();//get the stream to write the data

		/*Enumeration headerNames = req.getHeaderNames();
		while (headerNames.hasMoreElements()) {
			String key = (String) headerNames.nextElement();
			String value = req.getHeader(key);
			logger.info("Header Name: " + key + " ------- Value: " + value);

			res.addHeader(key, value);

		}*/
		RequestDispatcher dispatcher = req
				.getRequestDispatcher("/dashboard.html");
		dispatcher.forward(req, res);

	}

	

}
