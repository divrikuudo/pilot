package com.ge.power.checklist.portal.util;

import java.io.File;
import java.util.Date;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

public class EmailUtil {
	
	public static boolean sendEmail(String host, String port,
			final String fromAddress, String toAddress,
			String subject, String message, File file)
			throws AddressException, MessagingException {
		
		Properties properties = new Properties();
		properties.put("mail.smtp.host", host);
		properties.put("mail.smtp.port", port);
		properties.put("mail.smtp.auth", "false");
		properties.put("mail.smtp.starttls.enable", "true");

		Session session = Session.getInstance(properties);

		Message msg = new MimeMessage(session);

		msg.setFrom(new InternetAddress(fromAddress));
		InternetAddress[] toAddresses = { new InternetAddress(toAddress) };
		msg.setRecipients(Message.RecipientType.TO, toAddresses);
		msg.setSubject(subject);
		msg.setSentDate(new Date());

		MimeBodyPart messageBodyPart = new MimeBodyPart();
		messageBodyPart.setContent(message, "text/html");

		Multipart multipart = new MimeMultipart();
		multipart.addBodyPart(messageBodyPart);
		
		try {
			MimeBodyPart attachPart = new MimeBodyPart();
			attachPart.setDataHandler(new DataHandler(new FileDataSource(file)));
			//attachPart.attachFile(file);
			attachPart.setFileName(file.getName());
			multipart.addBodyPart(attachPart);			

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

		msg.setContent(multipart);
		
		Transport.send(msg);
		return true;

	}
}
