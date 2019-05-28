function cleanPhotoURL(photoURL)
{
	if (photoURL)
	{
		var http = new XMLHttpRequest();
	    http.open('HEAD', photoURL, false);
	    http.send();
	    if (http.status <400)
	    	return photoURL;
	    else 
	    	return "https://upload.wikimedia.org/wikipedia/commons/b/b1/Missing-image-232x150.png";
	}
	else 
	    return "https://upload.wikimedia.org/wikipedia/commons/b/b1/Missing-image-232x150.png";
}