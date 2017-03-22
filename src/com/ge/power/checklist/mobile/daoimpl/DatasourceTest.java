package com.ge.power.checklist.mobile.daoimpl;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

public class DatasourceTest {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		InitialContext cxt;
		try {
			cxt = new InitialContext();
			if ( cxt == null ) {
				   throw new Exception("Uh oh -- no context!");
				}
				DataSource ds = (DataSource) cxt.lookup( "java:/comp/env/jdbc/postgres" );

				if ( ds == null ) {
				   throw new Exception("Data source not found!");
				}
		} catch (NamingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		

	}

}
