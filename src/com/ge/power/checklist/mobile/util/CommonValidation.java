package com.ge.power.checklist.mobile.util;
/**
 * This class provides methods for server side validation. 
 * @author CC
 * @modified by Gaurav Misra (inf51594) Dated : May 11 2009.
 * new methods are customized according to need of SFA business
 */
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CommonValidation
{
	public static boolean isValidDate(String ddmmyyyy){
		//date in formate dd/mm/yyyy
		Pattern pattern =Pattern.compile( "(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[012])/((19|20)\\d\\d)");
		Matcher matcher=pattern.matcher(ddmmyyyy);
		if(matcher.matches()){
			 
			 matcher.reset();
		 
			 if(matcher.find()){
		 
		             String day = matcher.group(1);
			     String month = matcher.group(2);
			     int year = Integer.parseInt(matcher.group(3));
		 
			     if (day.equals("31") && 
				  (month.equals("4") || month .equals("6") || month.equals("9") ||
		                  month.equals("11") || month.equals("04") || month .equals("06") ||
		                  month.equals("09"))) {
					return false; // only 1,3,5,7,8,10,12 has 31 days
			     } else if (month.equals("2") || month.equals("02")) {
		                  //leap year
				  if(year % 4==0){
					  if(day.equals("30") || day.equals("31")){
						  return false;
					  }else{
						  return true;
					  }
				  }else{
				         if(day.equals("29")||day.equals("30")||day.equals("31")){
						  return false;
				         }else{
						  return true;
					  }
				  }
			      }else{				 
				return true;				 
			      }
			   }else{
		    	      return false;
			   }		  
		     }else{
			  return false;
		     }			  
	}
    
	public static boolean isNumeric(String data)
	{
		boolean flag=false;
		for(int i=0;i<data.length();i++){
			if((int)data.charAt(i)>=48 && (int)data.charAt(i)<=57)
				flag= true;
			else {
				flag = false;
				break;
			}
			
		}
		return flag;
	}
	

	public static boolean isAlphaNumeric(String data)
	{
		boolean flag=false;
		for(int i=0;i<data.length();i++)
		{
			if(((int)data.charAt(i)>=48 && (int)data.charAt(i)<=57)|| ((int)data.charAt(i)>=65 && (int)data.charAt(i)<=90) || ((int)data.charAt(i)>=97 && (int)data.charAt(i)<=122) || (int)data.charAt(i)==32)
				flag=true;
			else
				return false;
		}
		return flag;
	}

	public static boolean isAlpha(String data)
	{
		boolean flag=false;
		for(int i=0;i<data.length();i++)
		{
			if(((int)data.charAt(i)>=65 && (int)data.charAt(i)<=90) 
					|| ((int)data.charAt(i)>=97 && (int)data.charAt(i)<=122) ||((int)data.charAt(i)==32))
				flag=true;
			else
				return false;
		}
		return flag;
	}

	public static int compareTwoDates(String d1,String  d2)
	{
		try
		{
			Date d11=new Date(d1);
			Date d12=new Date(d2);
			return d11.compareTo(d12);
		}
		catch(Exception e)
		{
			return 10;
		}
		

		
	}
	
	/**
	 *
	 * Checks for the number of days in between two dates if 
	 * more than <code>days</code> return true else false.
	 * **To date  shouls always be greater than from date
	 * ** check for parse exception
	 * @version 3.0.1
	 * @param dateTo : From date
	 * @param dateFrom : To Date
	 * @param days : number of days in between
	 * @return boolean : flag then true else false 
	 * @author INF51594
	 
	 * 
	*/
    public static boolean isDateMore(String dateToStr, String dateFromStr,int days)  throws ParseException{
        boolean flag = false;
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");  
        Date dateFrom = df.parse(dateFromStr);
		Date dateTo =  df.parse(dateToStr);
        df.setLenient(false);  // this is important!
	   if ((dateTo.getTime()-dateFrom.getTime())/(1000*60*60*24)>days) ///////////////////////////////////cal date diff
	       flag = true;
	   
	   return flag;

    }
    public static boolean compareGreaterDate(String date){
    	boolean flag = true;
    	try{
			DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
			//Date dateFrom = df.parse("19/07/2011");
		    Calendar calendar = Calendar.getInstance();

		    calendar.setTime( new Date() );
		    calendar.set(Calendar.HOUR_OF_DAY, 0);
		    calendar.set(Calendar.MINUTE, 0);
		    calendar.set(Calendar.SECOND, 0);
		    calendar.set(Calendar.MILLISECOND, 0);

		    Date dateFrom1 = df.parse(date);
		    Calendar calendar1 = Calendar.getInstance();

		    calendar1.setTime( dateFrom1 );
		    calendar1.set(Calendar.HOUR_OF_DAY, 0);
		    calendar1.set(Calendar.MINUTE, 0);
		    calendar1.set(Calendar.SECOND, 0);
		    calendar1.set(Calendar.MILLISECOND, 0);
		    
		    if(calendar.compareTo(calendar1)==-1)
		    	flag = false;
		    else
		    	flag = true;
		}catch (Exception e){}

		return flag;
    }
	public static boolean validDate(String d1)
	{
		try
		{
			DateFormat f1 = new SimpleDateFormat("dd/MM/yyyy");  
			Date date = f1.parse(d1);    
			DateFormat f2 = new SimpleDateFormat("MM/dd/yyyy");  
			String result = f2.format(date);
			
			DateFormat df = DateFormat.getDateInstance(DateFormat.SHORT);
            df.setLenient(false);  // this is important!
            Date dt2 = df.parse(result);
            return true;
		}
		catch (ParseException e)
        {
                return false;
        }
        catch (IllegalArgumentException e)
        {
                return false;
        }
		catch(Exception e)
		{
			return false;
		}
		
	}

	public static boolean validAddress(String data)
	{
		boolean flag=false;
		
		for(int i=0;i<data.length();i++)
		{
			if(((int)data.charAt(i)>=48 && (int)data.charAt(i)<=57)|| ((int)data.charAt(i)>=65 && (int)data.charAt(i)<=90) || ((int)data.charAt(i)>=97 && (int)data.charAt(i)<=122) ||((int)data.charAt(i)==32) ||((int)data.charAt(i)==45)||((int)data.charAt(i)==44)||((int)data.charAt(i)==95)||((int)data.charAt(i)==35)||((int)data.charAt(i)==47))
				flag=true;
			else
				return false;
		}
		return flag;

	}
	
	public static boolean check18Year(String d1)
	  {
		boolean flag = false;
		try 
		{
		DateFormat df = new SimpleDateFormat("dd/MM/yyyy");  
	    Date dateFrom = df.parse(d1);
		Date dateTo =  new Date();
	    df.setLenient(false);  // this is important!
		   if ((dateTo.getTime()-dateFrom.getTime())/(1000*60*60*24)>18*365) ///////////////////////////////////cal date diff
		   { 
			    flag = true;
		   }else
		   {	flag = false;
		   }
		  
		} catch(Exception e)
		{
			flag = false;
		}
		 return flag;
		}
	
	
	public static  boolean isValidEmail( String email )
	{
		try
		{
		 
		if((int) email.charAt(0)>47 && (int) email.charAt(0)<58)
			return false;

		 //String sp = "\\!\\#\\$\\%\\&\\'\\*\\+\\-\\/\\=\\?\\^\\_\\`\\{\\|\\}\\~"; 
		 String sp = "\\-\\.\\_";
		 String atext = "[a-zA-Z0-9" + sp + "]";
		 String atom = atext + "+"; //one or more atext chars 
		 String dotAtom = "\\." + atom;
		 String localPart = atom + "(" + dotAtom + ")*"; //one atom followed by 0 or more dotAtoms. //RFC 1035 tokens for domain names: 
		 String letter = "[a-zA-Z]";
		 String letDig = "[a-zA-Z0-9]"; 
		 String letDigHyp = "[a-zA-Z0-9-]"; 
		 String rfcLabel = letDig + "(" + letDigHyp + "{0,61}" + letDig + ")?";
		 String domain = rfcLabel + "(\\." + rfcLabel + ")*\\." + letter + "{2,6}"; //Combined together, these form the allowed email regexp allowed by RFC 2822: 
		 String addrSpec = "^" + localPart + "@" + domain + "$"; 
		 Pattern VALID_PATTERN = Pattern.compile(addrSpec);

		 return VALID_PATTERN.matcher(email).matches();
		}
		catch(Exception e)
		{
			
		}
		return false;
		
		 
	}
	
	
	public static boolean isMaxLength(String data,int maxNo)
	{
		if(data.length()<= maxNo)
			return true;
		else
			return false;
	}
	public static boolean isMinLength(String data,int minNo)
	{
		if(data.length()>= minNo)
			return true;
		else
			return false;
	}
	
	public static boolean checkURL(String data)
	{
		if(data.indexOf(">")>0||data.indexOf("<")>0)
				return false;
		else
				return true;
		
	}
	public static boolean isDecimal(String data)
	{
		boolean isDecimal = false;
	    try
		{
		    Float.parseFloat(data);
		    isDecimal=true;
		}catch(Exception e){
		}
		return isDecimal;
	}
	public static boolean validVisaCard(String cardNo)
	{
		if(cardNo.substring(0,1).equals("4") && (cardNo.length()==13 || cardNo.length()==16))
		{
			
				int vis_15digit=0;
				int x,y;
				
				for(int i=0;i<15;i++)
				{
					if(i%2== 0)
					{
						x=(charToInt(cardNo.charAt(i)))*2;
						if(x>9)
						{
							String p =""+x;
							vis_15digit=vis_15digit+(charToInt(p.charAt(0)))+(charToInt(p.charAt(1)));
						}
						else
						{
							vis_15digit=vis_15digit+(x);
						}
					}
					else
					{
						y=(charToInt(cardNo.charAt(i)))*1;
						if(y>9)
						{
							String q =""+y;
							vis_15digit=vis_15digit+(charToInt(q.charAt(0)))+(charToInt(q.charAt(1)));
							
						}
						else
						{
							vis_15digit=vis_15digit+y;
						}
						
					}
					
				}
				if(charToInt(cardNo.charAt(15))!=((10-vis_15digit%10)%10))
				{
				    return false;
				}
			}
		else
		{
	       return false;
		}
		return true;
	}
	public static int charToInt(char a)
	{	
		
		Character c= new Character(a);
	     String  s=c.toString();
		return Integer.parseInt(s);
		
	}
	
	/*These method are specific to SFA */
	/**
	 * @version 3.0.1
	 * @param masterName : String to be validated
	 * @param charAllowed : This defines char allowed other than alphaNumeric,&,- and _ if masterName is not null.
	 * if some special char is to be send then use \\in front eg \\.
	 * @return boolean : isValid then true else false 
	 * @author INF51594
	*/
	public static boolean checkMasterName(String masterName,String charAllowed){	
		boolean isValid = false;
		Pattern pattern  = Pattern.compile("^[a-zA-Z0-9]([a-zA-Z0-9\\s\\-_.&"+charAllowed+"]*[a-zA-Z0-9\\s\\-_.&"+charAllowed+"])?$");
		if (masterName!=null){
		Matcher matcher=pattern.matcher(masterName);
		if (matcher.matches() && !isNumberOnly(masterName,charAllowed))//numeric check is there
			isValid = true;
		}
		return isValid;	
	}
	public static boolean checkLoginName(String masterName){	
		boolean isValid = false;
		Pattern pattern  = Pattern.compile("^[a-zA-Z0-9]([a-zA-Z0-9\\-_]*[a-zA-Z0-9])?$");
		if (masterName!=null){
		Matcher matcher=pattern.matcher(masterName);
		if (matcher.matches())//numeric check is there
			isValid = true;
		}
		return isValid;	
	}
	public static boolean checkMasterValue(String masterName,String charAllowed){	
		boolean isValid = false;
		Pattern pattern  = Pattern.compile("^[a-zA-Z0-9]([a-zA-Z0-9\\s\\-_.\\&"+charAllowed+"]*[a-zA-Z0-9\\s\\-_.\\&"+charAllowed+"])?$");
		if (masterName!=null){
		Matcher matcher=pattern.matcher(masterName);
		if (matcher.matches())//numeric check is there
			isValid = true;
		}
		return isValid;	
	}
	public static boolean isFName(String masterName,String charAllowed){	
		boolean isValid = false;
		Pattern pattern  = Pattern.compile("^[a-zA-Z0-9]([a-zA-Z0-9\\s ."+charAllowed+"]*[a-zA-Z0-9\\s ."+charAllowed+"])?$");
		if (masterName!=null){
		Matcher matcher=pattern.matcher(masterName);
		if (matcher.matches() && !isNumberOnly(masterName,charAllowed))//numeric check is there
			isValid = true;
		}
		return isValid;	
	}
	public static boolean checkMasterId(String masterName,String charAllowed){	
		boolean isValid = false;
		Pattern pattern  = Pattern.compile("^[a-zA-Z0-9]([a-zA-Z0-9"+charAllowed+"]*[a-zA-Z0-9])?$");
		if (masterName!=null){
		Matcher matcher=pattern.matcher(masterName);
		if (matcher.matches() && !isNumberOnly(masterName,charAllowed))//numeric check is there
			isValid = true;
		}
		return isValid;	
	}

	
	public static boolean checkCurrency(String masterName){	
		boolean isValid = false;
		Pattern pattern  = Pattern.compile("^[0-9]*[ .,]?{1}([0-9]*[0-9])?$");
		if (masterName!=null){
		Matcher matcher=pattern.matcher(masterName);
		if (matcher.matches())//numeric check is there
			isValid = true;
		}
		return isValid;	
	}
	/**
	 * @version 3.0.1
	 * @param masterName : String to be validated
	 * if some special char is to be send then use \\in front eg \\.
	 * @return boolean : isValid then true else false 
	 * no numeric check
	 * @author INF51594
	*/
	public static boolean checkMasterName(String masterName){	
		boolean isValid = false;
		Pattern pattern  = Pattern.compile("^[a-zA-Z0-9]([a-zA-Z0-9\\s-_.&]*[a-zA-Z0-9])?$");
		if (masterName!=null){
		Matcher matcher=pattern.matcher(masterName);
		if (matcher.matches())
			isValid = true;
		}
		return isValid;	
	}
	/**
	 * @version 3.0.1
	 * @param masterName : String to be validated
	 * @param charAllowed : This defines char allowed other than alphaNumeric if masterName is not null.
	 * if some special char is to be send then use \\in front eg \\.
	 * @return boolean : isValid then true else false 
	 * @author INF51594
	*/
	public static boolean isNumberOnly(String masterName,String charAllowed){	
		boolean isValid = false;
		Pattern pattern  = Pattern.compile("^[0-9]([0-9\\s-_&"+charAllowed+"]*[0-9])?$");
		if (masterName!=null){
		Matcher matcher=pattern.matcher(masterName);
		if (matcher.matches())
			isValid = true;
		}
		return isValid;	
	}
	
	/**
	 * @version 3.0.1
	 * @param number : String  to be validated
	 * @param value : int against which validation is to be made 
	 * @return boolean : isValid then true else false 
	 * @author INF51594
	*/
	public static boolean lessThan(String  number , int value ){	
		boolean isValid = false;
		if (number !=null && !"".equalsIgnoreCase(number.trim())){
			try{
				int no = Integer.parseInt(number);
				if (no < value)
					isValid = true;
			}catch(NumberFormatException nfe){
				isValid = false;
			}
			
		}
		return isValid;	
	}
	
	/**
	 * @version 3.0.1
	 * @param number : String  to be validated
	 * @param value : int against which validation is to be made 
	 * @return boolean : isValid then true else false 
	 * @author INF51594
	*/
	public static boolean greaterThanEqual(String  number , int value ){	
		boolean isValid = false;
		if (number !=null && !"".equalsIgnoreCase(number.trim())){
			try{
				int no = Integer.parseInt(number);
				if (no >= value)
					isValid = true;
			}catch(NumberFormatException nfe){
				isValid = false;
			}
			
		}
		return isValid;	
	}
	/**
	 * @version 3.0.1
	 * @param number : String  to be validated
	 * @param min (inclusive): int against which min length validation is to be made 
	 * @param max (inclusive): int against which max length validation is to be made 
	 * @return boolean : isValid then true else false 
	 * @author INF51594
	*/
	public static boolean isRange(String data,int min,int max)	{
		boolean isValid = false;
		if(data.length()>= min && data.length()<= max)
			isValid = true;
		return isValid;
	}
	/**
	 * @version 3.0.2
	 * @param number : String  to be validated
	 * @param min (inclusive): int against which min validation is to be made 
	 * @param max (inclusive): int against which max validation is to be made 
	 * @return boolean : isValid then true else false 
	 * @author INF51594
	*/
	public static boolean isInNumericRange(String number,int min,int max)	{
		boolean isValid = false;
		int data = 0;
		try{
			data  = Integer.parseInt(number);
			if(data >= min && data<= max)
				isValid = true;
		}catch(NumberFormatException nfe){
		}
		return isValid;
	}
	/**
	 * @version 3.0.2
	 * @param pan : String  to be validated
	 * @return boolean : isValid then true else false 
	 * @author INF51594
	*/
	public static boolean isPAN(String pan)	{
		boolean isValid = false;
		Pattern pattern  = Pattern.compile("[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}");
		Matcher matcher=pattern.matcher(pan);
		if (matcher.matches())
			isValid = true;	
		return isValid;
	}
	/**
	 * @version 3.0.2
	 * @param pin : String  to be validated
	 * @return boolean : isValid then true else false 
	 * @author INF51594
	*/
	public static boolean isPIN(String pin)	{
		boolean isValid = false;
		Pattern pattern  = Pattern.compile("\\d{6}");
		Matcher matcher=pattern.matcher(pin);
		if (matcher.matches())
			isValid = true;	
		return isValid;
	}
	/**
	 * @version 3.0.2
	 * @param phone : String  to be validated
	 * @return boolean : isValid then true else false 
	 * @author INF51594
	*/
	public static boolean isPhone(String phone)	{
		boolean isValid = false;
		Pattern pattern  = Pattern.compile("[1-9]\\d{5,7}");
		Matcher matcher=pattern.matcher(phone);
		if (matcher.matches())
			isValid = true;	
		return isValid;
	}
	/**
	 * @version 3.0.2
	 * @param std : String  to be validated
	 * @return boolean : isValid then true else false 
	 * @author INF51594
	*/
	public static boolean isStd(String std){
		boolean isValid = false;
		Pattern pattern  = Pattern.compile("[0][1-9]\\d{1,3}");
		Matcher matcher=pattern.matcher(std);
		if (matcher.matches())
			isValid = true;	
		return isValid;
	}
	/**
	 * @version 3.0.2
	 * @param pan : String  to be validated
	 * @return boolean : isValid then true else false 
	 * @author INF51594
	*/
	public static boolean isStdPhone(String std , String phone){
		boolean isValid = false;
		Pattern stdPattern  = Pattern.compile("[0][1-9]\\d{1,3}");
		Matcher stdMatcher=stdPattern.matcher(std);
		Pattern phonePattern  = Pattern.compile("[1-9]\\d{5,7}");
		Matcher phoneMatcher=phonePattern.matcher(phone);
		if (stdMatcher.matches() && phoneMatcher.matches())
			isValid = true;	
		return isValid;
	}
	/**
	 * @version 3.0.2
	 * @param mobile : String  to be validated
	 * @return boolean : isValid then true else false 
	 * @author INF51594
	*/
	public static boolean isMobile(String mobile){
		boolean isValid = false;
		//Pattern pattern  = Pattern.compile("[9]\\d{9}");
		Pattern pattern  = Pattern.compile("[0-9]\\d{9}");
		Matcher matcher=pattern.matcher(mobile);
		if (matcher.matches())
			isValid = true;	
		return isValid;
	}
	public static boolean isMobileNo(String mobile){
		boolean isValid = false;
		//Pattern pattern  = Pattern.compile("[9]\\d{9}");
		Pattern pattern  = Pattern.compile("^([+]?{1})([0-9]*[0-9])$");
		Matcher matcher=pattern.matcher(mobile);
		if (matcher.matches())
			isValid = true;	
		return isValid;
	}
	/**Checks fot <> if present returns false
	 * @version 3.0.4
	 * @param mobile : String  to be validated
	 * @return boolean : isValid then true else false 
	 * @author INF51594
	*/
	public static boolean isComment(String comment){
	    boolean flag = true;
	    Pattern pattern = Pattern.compile("[<>]");
	    Matcher matcher= pattern.matcher(comment);
	    if (matcher.find())
	        flag = false;
	    return flag;
	}
	
	/**Checks fot valid name
	 * @version 3.0.4
	 * @param name : String  to be validated
	 * @param charAllowed : String  to be allowed
	 * @return boolean : isValid then true else false 
	 * @author INF51594
	*/
	public static boolean isName(String name , String charAllowed){
	    boolean flag = false;
	    Pattern pattern = Pattern.compile("^[a-zA-Z0-9]([a-zA-Z0-9."+ charAllowed + "]*[a-zA-Z0-9." + charAllowed + "])?$");	    
	    Matcher matcher= pattern.matcher(name);
	    if (matcher.find()){
	        flag = true;
	        
	    }
	    
	    return flag;
	}
	
	
	public static boolean isValidateName(String str)
	{
	    boolean flag = true;
		String pattern="^\"`~'|%#@!$^&*()+-=!{}[]?><,";
		int i=0;
		do
		{
		    for(int j=0; j<pattern.length() ; j++)
			{
		      if(str.charAt(i)==pattern.charAt(j))
					flag = false;
					
			 }
			 i++;
		 }
		while(i<str.length());
		if(!flag){
			
				for( i=0;i< str.length();i++)
				{
					 int s = (int)str.charAt(i);
					if((s > 126) )
					 {
						flag= false;
						break;
					}
				}
		}
	 return flag;
	}
	public static boolean specialCharacterCheck(String str)
	{
	    boolean flag = true;
		int i=0;
		for( i=0;i< str.length();i++)
		{
		    int s = (int)str.charAt(i);
			if((s > 126) )
			 {
				flag= false;
				break;
			}
		}
	 return flag;
	}
	
	public static boolean isValidPassword(String str){
		boolean flag = true;
		boolean flag1 = true;
		String pattern="~!@#$%&*^_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		String pattern1="~!@#$%&*^_1234567890";
		
		
		int i=0;
		//String str = "pg134542!@$$%3534657(sdfp";
		do
		{
		    for(int j=0; j<pattern.length() ; j++)
			{
		    	
	    	if(flag)
		    	  flag=false;
	    	
		      if(str.charAt(i)==pattern.charAt(j)){
					flag = true;
					break;
					
		      }
		      
			 }
		    if(!flag)
		    	break;
		    
			 i++;
		 }
		while(i<str.length());
		
		
			i=0;
		
			//String str = "pg134542!@$$%3534657(sdfp";
			do
			{
			    for(int j=0; j<pattern1.length() ; j++)
				{
			    	
		    	if(flag1)
		    		flag1=false;
		    	
			      if(str.charAt(i)==pattern1.charAt(j)){
			    	  flag1 = true;
						break;
						
			      }
			      
				 }
			    if(!flag1)
			    	break;
			    
				 i++;
			 }
			while(i<str.length());
	if(!flag && ! flag1)
		flag = true;
	else
		flag = false;	
		return flag;
	}
	
	public static boolean isValidRemarks(String Address){	
		boolean isValid = false; 
		
		Pattern pattern  =  Pattern.compile("([a-zA-Z0-9\\s&()-.,_:/<>!#%@$=!|?+*]*)?$");
		if (Address!=null){                    
			Matcher matcher=pattern.matcher(Address);
			if (matcher.matches())
				isValid = true;
		}
		return isValid;	
	}
	    
	public static boolean checkMasterCompanyName(String masterName){	
		boolean isValid = false;
		Pattern pattern  = Pattern.compile("^[a-zA-Z0-9]([a-zA-Z0-9\\s-_&.()]*[a-zA-Z0-9\\s-_&.()])?$");
		if (masterName!=null){
		Matcher matcher=pattern.matcher(masterName);
		if (matcher.matches())
			isValid = true;
		}
		return isValid;	
	}
	
	public static boolean isValidLocationType(String masterName,String charAllowed){	
		boolean isValid = false;
		Pattern pattern  = Pattern.compile("^[a-zA-Z]([a-zA-Z\\s"+charAllowed+"]*[a-zA-Z\\s"+charAllowed+"])?$");
		if (masterName!=null){
		Matcher matcher=pattern.matcher(masterName);
		if (matcher.matches() && !isNumberOnly(masterName,charAllowed))//numeric check is there
			isValid = true;
		}
		return isValid;	
	}  
	
	
	public static boolean isValidAddress(String Address){	
		boolean isValid = false;   //allow chracters   &()-.,_:'/
 		Pattern pattern  = Pattern.compile("^[a-zA-Z0-9]([a-zA-Z0-9\\s&()\\-.,_':/!@#$\\&()_\\-\\',.]*[a-zA-Z0-9\\s&()\\-.,_:'/!@#$\\&()_\\-\\',.])?$");
		if (Address!=null){                    
		Matcher matcher=pattern.matcher(Address);
		if (matcher.matches())
			isValid = true;
		}
		return isValid;	
	}
	
	public static boolean isValidState(String stateName){	
		boolean isValid = false;
		//Pattern pattern  = Pattern.compile("^[a-zA-Z]([&]{1}[a-zA-Z\\s])?$");
		Pattern pattern  = Pattern.compile("^[a-zA-Z]*[ &.-]?{1}(([a-zA-Z]*[a-zA-Z][ &.-]?{1}?)*[a-zA-Z]*[a-zA-Z])?$");
		
		if (stateName!=null){
			Matcher matcher=pattern.matcher(stateName);
			if (matcher.matches())
				isValid = true;
		}
		/*else 
		{ 
			Pattern pattern1  = Pattern.compile("[a-zA-Z]{1}[.]{1}[a-zA-Z]{1}[.]{1}");
			Matcher matcher1=pattern1.matcher(stateName);
			if (matcher1.matches())
				isValid = true;	
		}
		if(!isValid)
			{Pattern pattern2  = Pattern.compile("[a-zA-Z]*[.]{1}[a-zA-Z\\s]*");
		    Matcher matcher2=pattern2.matcher(stateName);
		    if (matcher2.matches())
			isValid = true;	
			}
		if(!isValid)
		{
			Pattern pattern3  = Pattern.compile("[a-zA-Z\\s]*");
			Matcher matcher3=pattern3.matcher(stateName);
			if (matcher3.matches())
				isValid = true;	
		}
		
		if(!isValid)
		{
			Pattern pattern4  = Pattern.compile("[a-zA-Z\\s]*[&]{1}[a-zA-Z\\s]*");
			Matcher matcher4=pattern4.matcher(stateName);
			if (matcher4.matches())
				isValid = true;	
		}
		
		}*/
	return isValid;	 
	}
	
	
	public static boolean checkProductName(String masterName){	
		boolean isValid = false; //allow  @%_-+&  a-z 0-9
		Pattern pattern  = Pattern.compile("^[a-zA-Z0-9]([a-zA-Z0-9\\s&+@%._-]*[a-zA-Z0-9\\s&+@%._-])?$");
		if (masterName!=null){
		Matcher matcher=pattern.matcher(masterName); 
		if (matcher.matches())
			isValid = true;
		}
		return isValid;	
	}
	public static boolean isValidCloneProductName(String masterName){	
		boolean isValid = false; //allow  @%_-+  a-z 0-9 
		Pattern pattern  = Pattern.compile("^[a-zA-Z0-9]([a-zA-Z0-9\\s+@%_-&]*[a-zA-Z0-9\\s+@%_-&])?$");
		if (masterName!=null){
		Matcher matcher=pattern.matcher(masterName);
		if (matcher.matches())
			isValid = true;
		}
		return isValid;	
	}
	
	
	public static boolean isValidSubProductName(String masterName){	
		boolean isValid = false; //allow  @%_-+&  a-z 0-9 
		Pattern pattern  = Pattern.compile("^[a-zA-Z0-9]([a-zA-Z0-9\\s+@%_-&]*[a-zA-Z0-9\\s+@%_-&])?$");
		if (masterName!=null){
		Matcher matcher=pattern.matcher(masterName);
		if (matcher.matches())
			isValid = true;
		}
		return isValid;	
	}
	public static  boolean isValidEmailID(String email){
		boolean flag=false;
		  Pattern p = Pattern.compile("^\\.|^\\@|^\\-|^\\_|\\.$|\\_$|\\-$|\\@$");
	      Matcher m = p.matcher(email);
	      if (m.find())
	    	  {
	    	  flag=false;
	    	  //System.err.println("Email addresses don't start with dots or @ signs.");
	    	  }
	      else
	      {
			  p = Pattern.compile("^[A-Za-z0-9-_]+(\\.[_A-Za-z0-9-_]+)*@[A-Za-z0-9_-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
			  m = p.matcher(email);
			  flag= m.matches();
		  }
		  return flag;
	  }
	public static boolean isValidRemarksORComments(String Address){	
		boolean isValid = false; 
		       // allow &()-.,_:'/<>!#%@$=!|?+* and alphanumeric
				Pattern pattern  =  Pattern.compile("([a-zA-Z0-9\\s&()-.,_:/<>!#%@$=!|?+*]*)?$");
				if (Address!=null){                    
				Matcher matcher=pattern.matcher(Address);
				if (matcher.matches())
					isValid = true;
				}
	    return isValid;	
	}
	
	public static boolean isValidIP(String Address){	
		boolean isValid = false;   //allow chracters   &()-.,_:'/
 		Pattern pattern  = Pattern.compile("(1\\d{0,2}|2(?:[0-4]\\d{0,1}|[6789]|5[0-5]?)?|" + 
 				"[3-9]\\d?|0)\\.(1\\d{0,2}|2(?:[0-4]\\d{0,1}|[6789]|5[0-5]?)?|[3-9]\\d?|0)" +
 				"\\.(1\\d{0,2}|2(?:[0-4]\\d{0,1}|[6789]|5[0-5]?)?|[3-9]\\d?|0)\\.(1\\d{0,2}" + 
 				"|2(?:[0-4]\\d{0,1}|[6789]|5[0-5]?)?|[3-9]\\d?|0)(\\/(?:[012]\\d?|3[012]?" +
 				")){0,1}$");
		if (Address!=null){                    
		Matcher matcher=pattern.matcher(Address);
		if (matcher.matches())
			isValid = true;
		}
		return isValid;	
	}
	
}
