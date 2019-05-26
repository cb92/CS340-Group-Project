function filterValues()
{
	var searchEl = document.getElementById("partner-search-string");
	console.log(searchEl);
	var searchVal = searchEl.value.toUpperCase();
	console.log(searchVal);
	var partners = document.body.querySelectorAll(".partner-li");
	console.log(partners);

	for (let i=0; i<partners.length; i++)
	{
		if (partners[i].innerText.toUpperCase().indexOf(searchVal)> -1 || searchVal.length==0){
			partners[i].style.display = "block";

		} else 
		{
			partners[i].style.display = "none";
			console.log(searchVal+" not in "+partners[i].innerText+"\n");
		}
	}
}