<% 
	  String urlString = "";
	  if (request.getRequestURL().toString().contains("dev-wfservices")) {	  
		   urlString = "https://ssologin.qagen2.corporate.ge.com/logoff/logoff.jsp"; 
	  } else if (request.getRequestURL().toString().contains("st-wfservices")) {
		  urlString = "https://ssologin.qagen2.corporate.ge.com/logoff/logoff.jsp";
	  } else {
		  urlString = "https://ssologin.ssogen2.corporate.ge.com/logoff/logoff.jsp";
	  }
	  
      HttpSession newsession = request.getSession(false);
      if (newsession != null) 
      {
         newsession.invalidate();

      }	  
	  response.sendRedirect(urlString);
%>