function cleanPhotoURL(photoURL)
{
	if (photoURL && photoURL!="null" && photoURL!="")
		return photoURL;
	else 
	{
	    return "https://upload.wikimedia.org/wikipedia/commons/b/b1/Missing-image-232x150.png";
	}
}