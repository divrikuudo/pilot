package com.ge.power.checklist.mobile.util;

import java.awt.image.BufferedImage;
import java.awt.image.ColorConvertOp;
import java.io.File;
import java.io.FileOutputStream;
import javax.imageio.ImageIO;
import org.apache.commons.codec.binary.Base64;


public class ChecklistImageUtility {

	public static String imageToBase64String(File imageFile) throws Exception {

		String image = null;
		BufferedImage buffImage = ImageIO.read(imageFile);

		if (buffImage != null) {
			java.io.ByteArrayOutputStream os = new java.io.ByteArrayOutputStream();
			
			BufferedImage rgbImage = new BufferedImage(buffImage.getWidth(), buffImage.getHeight(), BufferedImage.TYPE_3BYTE_BGR);
			ColorConvertOp op = new ColorConvertOp(null);
			op.filter(buffImage, rgbImage);
			ImageIO.write(rgbImage, "PNG", os);
			byte[] data = os.toByteArray();
			image = ImageConverter.encode(data);
		}// if
		return image;
	}
 
	public static String base64StringToImage(String imageName, String imageData, File file) throws Exception {
		String path = "";
		try{
			byte[] imgBytes = ImageConverter.decode(imageData);
			/*BufferedImage bufImg = ImageIO.read(new ByteArrayInputStream(imgBytes));
			File imgOutFile = new File(imagePath+"/"+imageName+"."+imageType);
			ImageIO.write(bufImg, imageType, imgOutFile);*/
	
		//	File of = new File(imagePath+"/"+imageName+"."+imageType);
			String imagePath = file.getAbsolutePath()+"/"+imageName;
			FileOutputStream osf = new FileOutputStream(new File(imagePath));
			osf.write(imgBytes);
			osf.flush();
			osf.close();
			return imagePath;
		}catch(Exception e){
			e.printStackTrace();
			return path;
		}
		// return image;
	}
	
	public static String getBase64String(String data){
		
		byte[] authEncBytes = Base64.encodeBase64(data.getBytes());
		
		String authStringEnc = new String(authEncBytes);
		return authStringEnc;
	} 
}
