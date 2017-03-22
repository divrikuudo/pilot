package com.ge.power.checklist.portal.dto;

public class Images {
	
	private String imageId;

    private String imageName;

    private String isDeleted;
    
    private String imageUrl;
    private String imagesDesc;
    private String imageTempId;
    private String imageTempUrl;

    public String getImageId ()
    {
        return imageId;
    }

    public void setImageId (String imageId)
    {
        this.imageId = imageId;
    }

    public String getImageName ()
    {
        return imageName;
    }

    public void setImageName (String imageName)
    {
        this.imageName = imageName;
    }

    public String getIsDeleted ()
    {
        return isDeleted;
    }

    public void setIsDeleted (String isDeleted)
    {
        this.isDeleted = isDeleted;
    }	

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getImagesDesc() {
		return imagesDesc;
	}

	public void setImagesDesc(String imagesDesc) {
		this.imagesDesc = imagesDesc;
	}

	public String getImageTempId() {
		return imageTempId;
	}

	public void setImageTempId(String imageTempId) {
		this.imageTempId = imageTempId;
	}

	public String getImageTempUrl() {
		return imageTempUrl;
	}

	public void setImageTempUrl(String imageTempUrl) {
		this.imageTempUrl = imageTempUrl;
	}

}
